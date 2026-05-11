import * as ledger from '@midnight-ntwrk/ledger-v8';
import { NetworkId, WalletState } from '@midnight-ntwrk/wallet-sdk-abstractions';
import { DustWallet } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import { type CombinedSwapOutputs, type DefaultConfiguration, type FacadeState, WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
import { HDWallet, Roles } from '@midnight-ntwrk/wallet-sdk-hd';
import { ShieldedWallet } from '@midnight-ntwrk/wallet-sdk-shielded';

import {logger, Semaphore} from './utils';
import { fromHex} from '@midnight-ntwrk/midnight-js-utils';
// import type { DefaultV1Configuration as ShieldedConfiguration } from '@midnight-ntwrk/wallet-sdk-shielded/dist/v1';
import {
    createKeystore,
    PublicKey,
    // InMemoryTransactionHistoryStorage,
    NoOpTransactionHistoryStorage,
    type UnshieldedKeystore,
    UnshieldedWallet,
} from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { Buffer } from 'buffer';
import * as Rx from 'rxjs';
import { ShieldedAddress, ShieldedCoinPublicKey, ShieldedEncryptionPublicKey, UnshieldedAddress, DustAddress } from "@midnight-ntwrk/wallet-sdk-address-format"
import assert from 'node:assert';
import { type UnboundTransaction } from '@midnight-ntwrk/midnight-js-types';


export type Configuration = DefaultConfiguration;//ShieldedConfiguration & DustConfiguration & { indexerUrl: string };
// export const defaultConfiguration: Configuration = {
//     networkId: 'preview',
//     costParameters: {
//         additionalFeeOverhead: 300_000_000_000_000n,
//         feeBlocksMargin: 5,
//     },
//     relayURL: new URL(`wss://rpc.preview.midnight.network`),
//     provingServerUrl: new URL(`http://localhost:${PROOF_SERVER_PORT}`),
//     indexerClientConnection: {
//         indexerHttpUrl: INDEXER_HTTP_URL,
//         indexerWsUrl: INDEXER_WS_URL,
//     },
//     indexerUrl: INDEXER_WS_URL,
// };

export const configuration = function (indexerHttpUrl: string, indexerWsUrl: string, provingServerUrl: string, node: string
    , network: NetworkId.NetworkId = 'preview'
    , costParameters = {
        additionalFeeOverhead: 300_000_000_000_000n,
        feeBlocksMargin: 5,
    }): Configuration {
    return {
        networkId: network,
        costParameters: costParameters,
        relayURL: new URL(node.replace(/^http/, 'ws')),
        provingServerUrl: new URL(provingServerUrl),
        indexerClientConnection: {
            indexerHttpUrl: indexerHttpUrl,
            indexerWsUrl: indexerWsUrl,
        },
        indexerUrl: indexerWsUrl,
        batchSize: 1
    };
}

export const createWalletKeys = (seed: Buffer,configuration: Configuration
): {
    shieldedSecretKeys: ledger.ZswapSecretKeys;
    dustSecretKey: ledger.DustSecretKey;
    unshieldedKeystore: UnshieldedKeystore;
} => {
    const hdWallet = HDWallet.fromSeed(seed);

    if (hdWallet.type !== 'seedOk') {
        throw new WalletSDKError('Failed to initialize HDWallet');
    }

    const derivationResult = hdWallet.hdWallet
        .selectAccount(0)
        .selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust])
        .deriveKeysAt(0);

    if (derivationResult.type !== 'keysDerived') {
        throw new WalletSDKError('Failed to derive keys');
    }

    hdWallet.hdWallet.clear();

    const shieldedSecretKeys = ledger.ZswapSecretKeys.fromSeed(derivationResult.keys[Roles.Zswap]);
    const dustSecretKey = ledger.DustSecretKey.fromSeed(derivationResult.keys[Roles.Dust]);
    const unshieldedKeystore = createKeystore(derivationResult.keys[Roles.NightExternal], configuration.networkId);

    return { shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
}

// TODO: 为了防止hd wallet 的意外变更,是否应该不依赖hd wallet生成三个私钥
export const initFacadeWallet = async (
    seed: Buffer,
    configuration: Configuration,// = defaultConfiguration,
    strSerializedState?: FacadeSerializedState
): Promise<{
    wallet: WalletFacade;
    shieldedSecretKeys: ledger.ZswapSecretKeys;
    dustSecretKey: ledger.DustSecretKey;
    unshieldedKeystore: UnshieldedKeystore;
}> => {
    // const hdWallet = HDWallet.fromSeed(seed);

    // if (hdWallet.type !== 'seedOk') {
    //     throw new WalletSDKError('Failed to initialize HDWallet');
    // }

    // const derivationResult = hdWallet.hdWallet
    //     .selectAccount(0)
    //     .selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust])
    //     .deriveKeysAt(0);

    // if (derivationResult.type !== 'keysDerived') {
    //     throw new WalletSDKError('Failed to derive keys');
    // }

    // hdWallet.hdWallet.clear();

    // const shieldedSecretKeys = ledger.ZswapSecretKeys.fromSeed(derivationResult.keys[Roles.Zswap]);
    // const dustSecretKey = ledger.DustSecretKey.fromSeed(derivationResult.keys[Roles.Dust]);
    // const unshieldedKeystore = createKeystore(derivationResult.keys[Roles.NightExternal], configuration.networkId);
    const { shieldedSecretKeys, dustSecretKey, unshieldedKeystore } = createWalletKeys(seed, configuration);

    const shieldedWallet = strSerializedState && strSerializedState.shieldedWalletState ?
        ShieldedWallet(configuration).restore(strSerializedState.shieldedWalletState)
        : ShieldedWallet(configuration).startWithSecretKeys(shieldedSecretKeys);

    const dustWallet = strSerializedState && strSerializedState.dustWalletState ?
        DustWallet(configuration).restore(strSerializedState.dustWalletState)
        : DustWallet(configuration).startWithSecretKey(dustSecretKey, ledger.LedgerParameters.initialParameters().dust);
    const unshieldedWallet = strSerializedState && strSerializedState.unshieldedWalletState ?
        UnshieldedWallet({
            ...configuration,
            txHistoryStorage: new NoOpTransactionHistoryStorage(), //此处不对交易历史进行保留
        }).restore(strSerializedState.unshieldedWalletState)
        : UnshieldedWallet({
            ...configuration,
            txHistoryStorage: new NoOpTransactionHistoryStorage(), //此处不对交易历史进行保留
        }).startWithPublicKey(PublicKey.fromKeyStore(unshieldedKeystore));

    const initParams = {
        configuration: {
            ...configuration,
            txHistoryStorage: new NoOpTransactionHistoryStorage()
        },
        // submissionService?: (config: TConfig) => MaybePromise<SubmissionService<ledger.FinalizedTransaction>>;
        // pendingTransactionsService?: (config: TConfig) => MaybePromise<PendingTransactionsService<ledger.FinalizedTransaction>>;
        // provingService?: (config: TConfig) => MaybePromise<ProvingService<UnboundTransaction>>;
        shielded: (config: DefaultConfiguration) => ShieldedWallet(config).startWithSecretKeys(shieldedSecretKeys),
        unshielded: (config: DefaultConfiguration) => UnshieldedWallet(config).startWithPublicKey(PublicKey.fromKeyStore(unshieldedKeystore)),
        dust: (config: DefaultConfiguration) => DustWallet(config).startWithSecretKey(dustSecretKey, ledger.LedgerParameters.initialParameters().dust),
    };
    const wallet = await WalletFacade.init(initParams);
    await wallet.start(shieldedSecretKeys, dustSecretKey);
    return { wallet, shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
};


export const waitForFullySynced = async (facade: WalletFacade, timeoutMs: number = 0, storeFn: WalletStore | undefined = undefined): Promise<FacadeState> => {
    try {
        let timeCur = Date.now();
        const timeStart = timeCur;
        let state;
        if(timeoutMs > 0) {
            state = await Rx.firstValueFrom(facade.state().pipe(Rx.throttleTime(5_000),Rx.filter((s) => {
                // logger.debug(`[${new Date().toUTCString()}:] wallet is syncing...`);
                logger.debug("waitForFullySynced_sync_dust appliedIndex:", s.dust.progress.appliedIndex, ",highestRelevantWalletIndex:", s.dust.progress.highestRelevantWalletIndex, ",isSynced", s.isSynced);

                if(Date.now() - timeCur > 60_000 && storeFn) {
                    // Store the wallet state periodically
                    storeFn({ shieldedWalletState: s.shielded.serialize(), unshieldedWalletState: s.unshielded.serialize(), dustWalletState: s.dust.serialize() });
                    timeCur = Date.now();
                }
                return s.isSynced;
            }),Rx.timeout(timeoutMs)));
       
        }else {
            state = await Rx.firstValueFrom(facade.state().pipe(Rx.throttleTime(5_000),Rx.filter((s) => {
                // logger.debug(`[${new Date().toUTCString()}:] wallet is syncing...`);
                logger.debug("waitForFullySynced_sync_dust appliedIndex:", s.dust.progress.appliedIndex, ",highestRelevantWalletIndex:", s.dust.progress.highestRelevantWalletIndex, ",isSynced", s.isSynced);
                if(Date.now() - timeCur > 60_000 && storeFn) {
                    // Store the wallet state periodically
                    storeFn({ shieldedWalletState: s.shielded.serialize(), unshieldedWalletState: s.unshielded.serialize(), dustWalletState: s.dust.serialize() });
                    timeCur = Date.now();
                }
                return s.isSynced;
            })));
        }
        logger.debug(`Wallet synced in ${(Date.now() - timeStart) / 1000} seconds`);
        return state!;
    } catch (error) {
        throw new WalletSDKError('Wallet sync timed out: ' + (error instanceof Error ? error.message : String(error)));
    }
    
    
};

export class WalletSDKError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "WalletSDKError";
    }
}

export const wallet_timeout = (ms: number, errmsg: string) => new Promise((resolve, reject) => {
    setTimeout(() => reject(new WalletSDKError(errmsg)), ms);
});

export const sleep = (ms: number) => new Promise((resolve) => {
    setTimeout(resolve, ms);
});

export interface FacadeSerializedState {
    readonly shieldedWalletState: string;
    readonly unshieldedWalletState: string;
    readonly dustWalletState: string;
}

export interface WalletStore {
    (walletState: FacadeSerializedState): Promise<void>;
}

export class MidnightWalletSDK {
    private config: Configuration;
    private isGenerating: boolean = false;
    private isUnGenerating: boolean = false;
    // private NetWorkId: NetworkId;
    private walletObj?: WalletFacade;
    private shieldedSecretKeys: ledger.ZswapSecretKeys;
    private dustSecretKey: ledger.DustSecretKey;
    private unshieldedKeystore: UnshieldedKeystore;
    private walletAddress: { shieldedAddress: string, unshieldedAddress: string, dustAddress: string , coinPublicKey: string, encryptionPublicKey: string, userPublicKey: string};
    private bActiveFlag: boolean = false;// to indicate whether the wallet is active, which is set to true after wallet is initialized successfully, and set to false after wallet is uninitialized, to prevent the submission of transaction when the wallet is not active.
    private storeTimer?: NodeJS.Timeout;
    private seed: Buffer;
    private dustBalance: bigint = 0n;
    private state: FacadeSerializedState | null = null;
    private storeCallback?: (walletState: FacadeSerializedState) => Promise<void> = (WalletState: FacadeSerializedState) => Promise.resolve();
    private storeInterval: number = 600000; // default to 10 minutes
    private pendingTxCount: number = 0; 
    private submitTimeout: number = 300 * 1000; // default to 60 seconds
    private concurrency: number = 0; // 
    private lastStateSaveTime: number = 0; // to record the last time when wallet state is saved, to prevent saving wallet state too frequently when there are many pending transactions.
    private forceReInitTime: number = 30 * 60 * 1000; // if there are pending transactions for a long time (default to 30 minutes), which may indicate that there is something wrong with the wallet or the pending transactions, try to reinitialize the wallet to see if it can recover from the abnormal state.
    // private syncMutex: Boolean = false;
    constructor(config: Configuration,strSeed: string, submitTimeout?: number, forceReInitTime?: number) {
        this.config = config;
        if (submitTimeout !== undefined) {
            this.submitTimeout = submitTimeout;
        }
        if (forceReInitTime !== undefined) {
            this.forceReInitTime = forceReInitTime;
        }
        this.walletAddress = { shieldedAddress: '', unshieldedAddress: '', dustAddress: '' ,coinPublicKey: '',encryptionPublicKey:'', userPublicKey: ''};
        // this.bActiveFlag = false;

        this.seed = Buffer.from(strSeed, 'hex');;
        if (this.seed.toString('hex').toLowerCase() != strSeed.toLowerCase()) throw 'bad seed';

        const { shieldedSecretKeys, dustSecretKey, unshieldedKeystore } = createWalletKeys(this.seed, this.config);

        const coinPublicKey =shieldedSecretKeys.coinPublicKey;
        const encryptionPublicKey = shieldedSecretKeys.encryptionPublicKey;
        const shieldedAddress = new ShieldedAddress(ShieldedCoinPublicKey.fromHexString(coinPublicKey),ShieldedEncryptionPublicKey.fromHexString(encryptionPublicKey));

        const unshieldedAddress = new UnshieldedAddress(Buffer.from(PublicKey.fromKeyStore(unshieldedKeystore).addressHex, 'hex'));

        this.walletAddress.shieldedAddress = ShieldedAddress.codec.encode(this.config.networkId, shieldedAddress).asString();
        this.walletAddress.unshieldedAddress = UnshieldedAddress.codec.encode(this.config.networkId, unshieldedAddress).asString();
        this.walletAddress.dustAddress = DustAddress.codec.encode(this.config.networkId, new DustAddress(dustSecretKey.publicKey)).asString();
        this.walletAddress.coinPublicKey = coinPublicKey;
        this.walletAddress.encryptionPublicKey = encryptionPublicKey;
        this.walletAddress.userPublicKey = PublicKey.fromKeyStore(unshieldedKeystore).addressHex;

        this.shieldedSecretKeys = shieldedSecretKeys;
        this.unshieldedKeystore = unshieldedKeystore;
        this.dustSecretKey = dustSecretKey;
        
    }

    static getDustBalanceFromDustState(strSerializedState: string): bigint {
        return ledger.DustLocalState.deserialize( fromHex(strSerializedState) ).walletBalance(new Date());
    }

    //////////////////////////////////////////
    // to generate a wallet instance
    //////////////////////////////////////////
    async initWallet(store: WalletStore, strSerializedState?: FacadeSerializedState, saveInterval: number = 600000) {
        // const seed = Buffer.from(strSeed, 'hex');
        // if (seed.toString('hex').toLowerCase() != strSeed.toLowerCase()) throw 'bad seed';
        // let oldState;

        logger.info("Initializing wallet...");

        // reset pending transaction count when initializing the wallet, 
        // which may be left uncleared due to unexpected errors in the previous wallet instance, 
        // to prevent the pending transaction count from being incorrect 
        // and causing the wallet state not being saved due to the incorrect pending transaction count.
        this.pendingTxCount = 0; 

        this.storeCallback = store;
        this.storeInterval = saveInterval;

        // const ret = (await initFacadeWallet(this.seed, this.config, strSerializedState));
        if(strSerializedState){
            this.state = strSerializedState;
            // this.dustBalance = MidnightWalletSDK.getDustBalanceFromDustState(JSON.parse(strSerializedState.dustWalletState).state);
            //  logger.info(`initial dust balance from serialized state: ${this.dustBalance}`);
        }

        const shieldedWallet = (configuration: DefaultConfiguration) => strSerializedState && strSerializedState.shieldedWalletState ?
        ShieldedWallet(configuration).restore(strSerializedState.shieldedWalletState)
        : ShieldedWallet(configuration).startWithSecretKeys(this.shieldedSecretKeys);
        
        const dustWallet = (configuration: DefaultConfiguration) => strSerializedState && strSerializedState.dustWalletState ?
        DustWallet(configuration).restore(strSerializedState.dustWalletState)
        : DustWallet(configuration).startWithSecretKey(this.dustSecretKey, ledger.LedgerParameters.initialParameters().dust);
        
        const unshieldedWallet = (configuration: DefaultConfiguration) => strSerializedState && strSerializedState.unshieldedWalletState ?
        UnshieldedWallet(configuration).restore(strSerializedState.unshieldedWalletState)
        : UnshieldedWallet(configuration).startWithPublicKey(PublicKey.fromKeyStore(this.unshieldedKeystore));

        const initParams = {
            configuration: {
                ...this.config,
                txHistoryStorage: new NoOpTransactionHistoryStorage()
            },
            // submissionService?: (config: TConfig) => MaybePromise<SubmissionService<ledger.FinalizedTransaction>>;
            // pendingTransactionsService?: (config: TConfig) => MaybePromise<PendingTransactionsService<ledger.FinalizedTransaction>>;
            // provingService?: (config: TConfig) => MaybePromise<ProvingService<UnboundTransaction>>;
            shielded: shieldedWallet,//(config: DefaultConfiguration) => ShieldedWallet(config).startWithSecretKeys(this.shieldedSecretKeys),
            unshielded: unshieldedWallet,//(config: DefaultConfiguration) => UnshieldedWallet(config).startWithPublicKey(PublicKey.fromKeyStore(this.unshieldedKeystore)),
            dust: dustWallet,//(config: DefaultConfiguration) => DustWallet(config).startWithSecretKey(this.dustSecretKey, ledger.LedgerParameters.initialParameters().dust),
        };
        const wallet = await WalletFacade.init(initParams);
        await wallet.start(this.shieldedSecretKeys, this.dustSecretKey);
    
        this.walletObj = wallet;

        const callBack = async () => {
            const state = await waitForFullySynced(this.walletObj!);
            const dustb = state.dust.balance(new Date());
            // if((this.dustBalance > 0n && dustb > 0n) || (this.dustBalance == 0n)){
            if(this.pendingTxCount <= 0) {
                // this.dustBalance = dustb;
                // this.state = { shieldedWalletState: state.shielded.serialize(), unshieldedWalletState: state.unshielded.serialize(), dustWalletState: state.dust.serialize() };
                // await this.storeCallback?.({ shieldedWalletState: state.shielded.serialize(), unshieldedWalletState: state.unshielded.serialize(), dustWalletState: state.dust.serialize() });
                // logger.info(`wallet state saved, dustBalance = ${this.dustBalance}`);
                if(this.storeCallback){
                    this.dustBalance = dustb;
                    this.state = { shieldedWalletState: state.shielded.serialize(), unshieldedWalletState: state.unshielded.serialize(), dustWalletState: state.dust.serialize() };
                        
                    await this.storeCallback?.({ shieldedWalletState: state.shielded.serialize(), unshieldedWalletState: state.unshielded.serialize(), dustWalletState: state.dust.serialize() });
                    logger.info(`wallet state saved, dustBalance = ${this.dustBalance}`);
                }else{
                    logger.info(`store callback is not set, ignore the backup of wallet state! this.dustBalance = ${this.dustBalance}`);
                }

                this.lastStateSaveTime = Date.now(); // update last state save time after wallet state is saved successfully or ignored due to store callback is not set.
                
            }else{
                // if there are pending transactions and it's been more than 30 minutes since the last time wallet state is saved, 
                // which may indicate that there is something wrong with the wallet or the pending transactions, 
                // try to reinitialize the wallet to see if it can recover from the abnormal state.
                if(Date.now() - this.lastStateSaveTime > this.forceReInitTime){ 
                    logger.warn(`there are pending transactions for a long time, pendingTxCount = ${this.pendingTxCount}, maybe due to wallet abnormality, reinitialize the wallet! this.dustBalance = ${this.dustBalance}, synced dustbalance = ${dustb}`);
                    await this.uninitWallet();
                    logger.info(`uninitWallet done, start to reinitialize the wallet!`);
                    await this.initWallet(this.storeCallback!, this.state!, this.storeInterval);
                    logger.info(`reinitWallet done!`);
                }else{
                    logger.info(`there are pending transactions, pendingTxCount = ${this.pendingTxCount}, maybe wallet is submitting transaction, skip the backup of wallet for now! this.dustBalance = ${this.dustBalance}, synced dustbalance = ${dustb}`);
                }
            }
            
            clearTimeout(this.storeTimer);
            
            this.registerNightUtxosForDustGeneration();

            this.storeTimer = setTimeout(callBack, this.storeInterval);
        }

        if(this.storeTimer) {
            clearTimeout(this.storeTimer);
        }
        const state = await waitForFullySynced(this.walletObj, 0, this.storeCallback);
        if(this.storeCallback){
            this.state = { shieldedWalletState: state.shielded.serialize(), unshieldedWalletState: state.unshielded.serialize(), dustWalletState: state.dust.serialize() };
            await this.storeCallback?.({ shieldedWalletState: state.shielded.serialize(), unshieldedWalletState: state.unshielded.serialize(), dustWalletState: state.dust.serialize() });
            logger.info(`wallet state saved for the first time after initialization, dustBalance = ${this.dustBalance}`);
            this.lastStateSaveTime = Date.now(); // update last state save time after wallet state is saved successfully for the first time after initialization.
        }else{
            logger.info(`store callback is not set, ignore the first time backup of wallet state after initialization! this.dustBalance = ${this.dustBalance}`);
        }

        this.concurrency = state.dust.availableCoins.length;
        this.bActiveFlag = true;// set active flag to true after wallet is initialized successfully
        this.storeTimer = setTimeout(async () => {
            await callBack();
        }, saveInterval);

    }

    // to get the wallet address
    getAccountAddress() {
        return this.walletAddress;
    }

    async registerNightUtxosForDustGeneration() {
        if (this.isGenerating) return;
        this.isGenerating = true;
        assert(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
        const state = await waitForFullySynced(this.walletObj);

        const nightUtxos = state.unshielded.availableCoins.filter(
            (coin) => coin.meta.registeredForDustGeneration === false && coin.utxo.type === ledger.nativeToken().raw,
        );
        if (nightUtxos.length === 0) {
            this.isGenerating = false;
            return;
        }
        logger.info('registerNightUtxosForDustGeneration utxo begin');
        const signKeyStore = this.unshieldedKeystore;

        const dustRegistrationRecipe = await this.walletObj.registerNightUtxosForDustGeneration(
            nightUtxos,
            signKeyStore.getPublicKey(),
            (payload) => signKeyStore.signData(payload),
            // this.walletAddress.dustAddress
        );

        const finalizedDustTx = await this.walletObj.finalizeRecipe(dustRegistrationRecipe);
        // increase pendingTxCount for the pending transaction of dust generation, which usually takes a long time to be included in a block, 
        // to prevent wallet state from being saved during this period, which may cause the saved state to be out of sync with the actual 
        // wallet state on chain due to the delay of wallet state update after the transaction is included in a block.
        this.pendingTxCount++; 
        try {
            const dustRegistrationTxHash = await this.submitTx(finalizedDustTx);
        } catch (error) {
            this.pendingTxCount--; // if submit transaction failed, decrease the pendingTxCount immediately to allow wallet state to be saved in the future.
            logger.error('Failed to submit dust generation transaction:', error);
        }
        

        this.isGenerating = false;
        logger.info('registerNightUtxosForDustGeneration utxo end');
    }

    async deregisterFromDustGeneration() {
        if (this.isUnGenerating) return;
        this.isUnGenerating = true;
        assert(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
        const state = await waitForFullySynced(this.walletObj);

        const nightUtxos = state.unshielded.availableCoins.filter(
            (coin) => coin.meta.registeredForDustGeneration === true && coin.utxo.type === ledger.nativeToken().raw,
        );
        if (nightUtxos.length === 0) {
            this.isUnGenerating = false;
            return;
        }
        logger.info('deregisterFromDustGeneration utxo begin');
        const signKeyStore = this.unshieldedKeystore;

        const dustRegistrationRecipe = await this.walletObj.deregisterFromDustGeneration(
            nightUtxos,
            signKeyStore.getPublicKey(),
            (payload) => signKeyStore.signData(payload),
            // this.walletAddress.dustAddress
        );

        const unshieldedKeystore = this.unshieldedKeystore;
        const recipe = await this.walletObj?.signRecipe(dustRegistrationRecipe, (payload) => unshieldedKeystore.signData(payload));

        const finalizedDustTx = await this.walletObj.finalizeRecipe(recipe);

       
        this.pendingTxCount++; 
        try {
            const dustRegistrationTxHash = await this.submitTx(finalizedDustTx);
        } catch (error) {
            this.pendingTxCount--; // if submit transaction failed, decrease the pendingTxCount immediately to allow wallet state to be saved in the future.
            logger.error('Failed to submit dust deregister transaction:', error);
        }

        this.isUnGenerating = false;
        logger.info('deregisterFromDustGeneration utxo end');
    }

    async submitTx(tx: ledger.FinalizedTransaction) {
        assert(this.walletObj, "walletObj is not initialized!");
        assert(this.bActiveFlag,"wallet is not active, cannot submit transaction!");
        // const txHash = await this.walletObj.submitTransaction(tx);
        const time = Date.now();
        // logger.info(`[${time}] submitTx begin`)
        
        try {
            const {dustAvailableCoins} = await this.getAvailableCoins();
            logger.info(`submitTx...current available dust coins: ${dustAvailableCoins.length}, pendingTxCount = ${this.pendingTxCount}`);
            const ret = await Promise.race([
                this.walletObj.submitTransaction(tx),
                wallet_timeout(this.submitTimeout, 'Transaction submission timed out') // set timeout for transaction submission to prevent hanging
            ]);
            
            this.pendingTxCount--;// decrease pendingTxCount after transaction is submitted successfully, which will allow wallet state to be saved in the future if there is no pending transaction.
            logger.info(`submitTx success, pendingTxCount = ${this.pendingTxCount}, txHash = ${ret}`);
            return ret as string;
        } catch (error) {
            logger.error(`submitTx failed: ${error instanceof Error ? error.message : String(error)}, pendingTxCount = ${this.pendingTxCount}`);
            throw error;
        }
    }



    async getBalances() {
        assert(this.walletObj, "walletObj is not initialized!");
        let curState = await waitForFullySynced(this.walletObj);
        // logger.info("\n\n...getAccountBalance...curState: ", curState);

        // balances: Record<TokenType, bigint>;
        // let aryBalance = new Array();

        const dustBalance = curState.dust.balance(new Date());
        const shieldedBlance = curState.shielded.balances;
        const unshieldedBlance = curState.unshielded.balances;

        // if(this.dustBalance > 0n && dustBalance == 0n){
        //     logger.warn(`dust balance abnormal, maybe due to wallet abnormality, reinitialize the wallet! this.dustBalance = ${this.dustBalance}, synced dustbalance = ${dustBalance}`);
        //     await this.uninitWallet();
        //     logger.info(`uninitWallet done, start to reinitialize the wallet!`);
        //     await this.initWallet(this.storeCallback!, this.state!, this.storeInterval);
        //     logger.info(`reinitWallet done!`);
        //     throw new Error(`dust balance abnormal, maybe due to wallet abnormality, wallet has been reinitialized, please check the wallet status and try again later!`);
        // }



        // 使用 replacer 将 bigint 转换为字符串
        const replacer = (key: any, value: any) => typeof value === 'bigint' ? value.toString() : value;

        // 反序列化，使用 reviver 将字符串转换回 bigint
        const reviver = (key: any, value: any) => typeof value === 'string' && /^\d+$/.test(value) ? BigInt(value) : value;

        return { dustBalance, shieldedBlance: JSON.parse(JSON.stringify(shieldedBlance, replacer), reviver), unshieldedBlance: JSON.parse(JSON.stringify(unshieldedBlance, replacer), reviver) };
    }


    async getAvailableCoins() {
        assert(this.walletObj, "walletObj is not initialized!");
        let curState = await waitForFullySynced(this.walletObj);

        const dustAvailableCoins = curState.dust.availableCoins;
        const shieldedAvailableCoins = curState.shielded.availableCoins;
        const unshieldedAvailableCoins = curState.unshielded.availableCoins;
        // logger.info("\n\n...getAvailableCoins...curBalance: ", availableCoins);

        return { dustAvailableCoins, shieldedAvailableCoins, unshieldedAvailableCoins };
    }

    async uninitWallet() {
        if (this.storeTimer) {
            clearTimeout(this.storeTimer);
        }

        if (true === this.bActiveFlag) {
            this.bActiveFlag = false;
            await this.walletObj?.stop();
        }
        
        logger.info("...wallet close done!");
    }

    getWalletInstance() {
        return this.walletObj;
    }

    getShieldedSecretKeys() {
        assert(this.shieldedSecretKeys, "shieldedSecretKeys is undefined");
        return this.shieldedSecretKeys;
    }

    getUnshieldedKeystore() {
        assert(this.unshieldedKeystore, "unshieldedKeystore is undefined");
        return this.unshieldedKeystore;
    }

    getDustSecretKey() {
        assert(this.dustSecretKey, "dustSecretKey is undefined");
        return this.dustSecretKey;
    }


    async getSerializedWalletState() {
        if (!this.walletObj) return '';
        let curState = await waitForFullySynced(this.walletObj);
        const dustWalletState = curState.dust.serialize();
        const shieldedWalletState = curState.shielded.serialize();
        const unshieldedWalletState = curState.unshielded.serialize();
        return { dustWalletState, shieldedWalletState, unshieldedWalletState };
    }

    async transferTo(transferInfo: CombinedSwapOutputs[], ttl: Date) {
        // [
        //         {
        //             type: 'shielded',
        //             outputs: [
        //                 {
        //                     type: ledger.shieldedToken().raw,
        //                     receiverAddress: ledgerReceiverAddress,
        //                     amount: tokenValue(1n),
        //                 },
        //             ],
        //         },
        //     ]
        assert(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
        // UnprovenTransactionRecipe ;UnboundTransactionRecipe
        const recipe = await this.walletObj?.transferTransaction(
            transferInfo,
            {
                shieldedSecretKeys: this.shieldedSecretKeys,
                dustSecretKey: this.dustSecretKey
            },
            { ttl, payFees: true },
        );
        const unshieldedKeystore = this.unshieldedKeystore;
        const signedTransferTxRecipe = await this.walletObj?.signRecipe(recipe, (payload) => unshieldedKeystore.signData(payload));
        const finalizedTx = await this.walletObj.finalizeRecipe(signedTransferTxRecipe);

        const submittedTxHash = await this.submitTx(finalizedTx);
        return submittedTxHash;
    }

    async balanceTx(tx: UnboundTransaction, ttl?: Date): Promise<ledger.FinalizedTransaction> {
        const {dustAvailableCoins} = await this.getAvailableCoins();
        logger.info("balanceTx begin, current dust available coins: ", dustAvailableCoins.length);
        assert(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
        assert(this.bActiveFlag, "wallet is not active, cannot balance transaction!");
        try {
            this.pendingTxCount++;
            const recipe = await this.walletObj.balanceUnboundTransaction(
                tx,
                { shieldedSecretKeys: this.shieldedSecretKeys, dustSecretKey: this.dustSecretKey },
                { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1000) },
            );
            const unshieldedKeystore = this.unshieldedKeystore;
            const signFn = (payload: Uint8Array) => unshieldedKeystore.signData(payload);
            signTransactionIntents(recipe.baseTransaction, signFn, 'proof');
            if (recipe.balancingTransaction) {
                signTransactionIntents(recipe.balancingTransaction, signFn, 'pre-proof');
            }
            // increase pendingTxCount for the pending transaction of balancing, 
            // which usually takes a long time to be included in a block, to prevent wallet state from being saved during this period, which may cause the saved state to be out of sync with the actual wallet state on chain due to the delay of wallet state update after the transaction is included in a block.
            
            const finalizedTx = await this.walletObj.finalizeRecipe(recipe);
            const {dustAvailableCoins} = await this.getAvailableCoins();
            logger.info("balanceTx end, current dust available coins: ", dustAvailableCoins.length," pendingTxCount:",this.pendingTxCount);
            return finalizedTx;
        } catch (error) {
            this.pendingTxCount--;
            logger.error(`balanceTx failed: ${error instanceof Error ? error.message : String(error)}, pendingTxCount = ${this.pendingTxCount}`);
            throw error;
        }
    }

}

/**
 * Sign all unshielded offers in a transaction's intents, using the correct
 * proof marker for Intent.deserialize. This works around a bug in the wallet
 * SDK where signRecipe hardcodes 'pre-proof', which fails for proven
 * (UnboundTransaction) intents that contain 'proof' data.
 */
export const signTransactionIntents = (
    tx: { intents?: Map<number, any> },
    signFn: (payload: Uint8Array) => ledger.Signature,
    proofMarker: 'proof' | 'pre-proof',
): void => {
    if (!tx.intents || tx.intents.size === 0) return;
    let intents = tx.intents;
    for (const segment of intents.keys()) {
        const intent = intents.get(segment);
        if (!intent) continue;

        // Clone the intent with the correct proof marker.
        // The wallet SDK bug hardcodes 'pre-proof' here, which fails for
        // proven (UnboundTransaction) intents that use 'proof'.
        const cloned = ledger.Intent.deserialize<ledger.SignatureEnabled, ledger.Proofish, ledger.PreBinding>(
            'signature',
            proofMarker,
            'pre-binding',
            intent.serialize(),
        );

        const sigData = cloned.signatureData(segment);
        const signature = signFn(sigData);

        if (cloned.fallibleUnshieldedOffer) {
            const sigs = cloned.fallibleUnshieldedOffer.inputs.map(
                (_: ledger.UtxoSpend, i: number) => cloned.fallibleUnshieldedOffer!.signatures.at(i) ?? signature,
            );
            cloned.fallibleUnshieldedOffer = cloned.fallibleUnshieldedOffer.addSignatures(sigs);
        }

        if (cloned.guaranteedUnshieldedOffer) {
            const sigs = cloned.guaranteedUnshieldedOffer.inputs.map(
                (_: ledger.UtxoSpend, i: number) => cloned.guaranteedUnshieldedOffer!.signatures.at(i) ?? signature,
            );
            cloned.guaranteedUnshieldedOffer = cloned.guaranteedUnshieldedOffer.addSignatures(sigs);
        }

        intents.set(segment, cloned);
    }
    tx.intents = intents;
};

// {

    
// const seed = '1111111111111111111111111111111111111111111111111111111111111113';
// const networkId = 'preview';
// const { shieldedSecretKeys, dustSecretKey, unshieldedKeystore } = createWalletKeys(Buffer.from(seed, 'hex'), { networkId });

// const coinPublicKey = shieldedSecretKeys.coinPublicKey;
// const encryptionPublicKey = shieldedSecretKeys.encryptionPublicKey;
// const shieldedAddress = new ShieldedAddress(ShieldedCoinPublicKey.fromHexString(coinPublicKey), ShieldedEncryptionPublicKey.fromHexString(encryptionPublicKey));

// logger.info(PublicKey.fromKeyStore(unshieldedKeystore).address);
// logger.info(PublicKey.fromKeyStore(unshieldedKeystore).addressHex);
// logger.info(PublicKey.fromKeyStore(unshieldedKeystore).publicKey);
// const unshieldedAddress = new UnshieldedAddress(Buffer.from(PublicKey.fromKeyStore(unshieldedKeystore).addressHex, 'hex'));

// logger.info('Shielded Address: ' + ShieldedAddress.codec.encode(networkId, shieldedAddress).asString());
// logger.info('Unshielded Address: ' + UnshieldedAddress.codec.encode('mainnet', unshieldedAddress).asString());
// logger.info('Dust Address: ' + DustAddress.codec.encode(networkId, new DustAddress(dustSecretKey.publicKey)).asString());
// }