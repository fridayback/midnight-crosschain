import * as ledger from '@midnight-ntwrk/ledger-v7';
import { NetworkId } from '@midnight-ntwrk/wallet-sdk-abstractions';
import type { DefaultV1Configuration as DustConfiguration, TotalCostParameters } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import { DustWallet } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import { CombinedSwapOutputs, FacadeState, WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
import { HDWallet, Roles } from '@midnight-ntwrk/wallet-sdk-hd';
import { ShieldedWallet } from '@midnight-ntwrk/wallet-sdk-shielded';

import type { DefaultV1Configuration as ShieldedConfiguration } from '@midnight-ntwrk/wallet-sdk-shielded/dist/v1';
import {
    createKeystore,
    PublicKey,
    // InMemoryTransactionHistoryStorage,
    NoOpTransactionHistoryStorage,
    UnshieldedKeystore,
    UnshieldedWallet,
} from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { Buffer } from 'buffer';
import * as Rx from 'rxjs';
import { ShieldedAddress, UnshieldedAddress, DustAddress } from "@midnight-ntwrk/wallet-sdk-address-format"
import assert from 'node:assert';
import { stat } from 'fs';
import { LedgerParameters } from '@midnight-ntwrk/ledger-v7';

import { ToolKitClient } from './utils.js';
import { UnboundTransaction } from '@midnight-ntwrk/midnight-js-types';

export type Configuration = ShieldedConfiguration & DustConfiguration & { indexerUrl: string };
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
    , costParameters: TotalCostParameters = {
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
    const hdWallet = HDWallet.fromSeed(seed);

    if (hdWallet.type !== 'seedOk') {
        throw new Error('Failed to initialize HDWallet');
    }

    const derivationResult = hdWallet.hdWallet
        .selectAccount(0)
        .selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust])
        .deriveKeysAt(0);

    if (derivationResult.type !== 'keysDerived') {
        throw new Error('Failed to derive keys');
    }

    hdWallet.hdWallet.clear();

    const shieldedSecretKeys = ledger.ZswapSecretKeys.fromSeed(derivationResult.keys[Roles.Zswap]);
    const dustSecretKey = ledger.DustSecretKey.fromSeed(derivationResult.keys[Roles.Dust]);
    const unshieldedKeystore = createKeystore(derivationResult.keys[Roles.NightExternal], configuration.networkId);

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

    const wallet: WalletFacade = new WalletFacade(shieldedWallet, unshieldedWallet, dustWallet);
    await wallet.start(shieldedSecretKeys, dustSecretKey);
    return { wallet, shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
};

export const waitForFullySynced = async (facade: WalletFacade): Promise<FacadeState> => {
    const timeCur = Date.now();
    const state = await Rx.firstValueFrom(facade.state().pipe(Rx.filter((s) => s.isSynced)));
    console.log(`Wallet synced in ${(Date.now() - timeCur) / 1000} seconds`);
    return state;
};


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
    private shieldedSecretKeys?: ledger.ZswapSecretKeys;
    private dustSecretKey?: ledger.DustSecretKey;
    private unshieldedKeystore?: UnshieldedKeystore;
    private walletAddress: { shieldedAddress: string, unshieldedAddress: string, dustAddress: string };
    private bActiveFlag: boolean;
    private storeTimer?: NodeJS.Timeout;
    readonly ISMimic: boolean = false;
    constructor(config: Configuration, mimic: boolean = false) {
        this.config = config;
        this.walletAddress = { shieldedAddress: '', unshieldedAddress: '', dustAddress: '' };
        this.bActiveFlag = false;
        this.ISMimic = mimic;
    }

    //////////////////////////////////////////
    // to generate a wallet instance
    //////////////////////////////////////////
    async initWallet(strSeed: string, store: WalletStore, strSerializedState?: FacadeSerializedState, saveInterval: number = 600000) {
        const seed = Buffer.from(strSeed, 'hex');
        if (seed.toString('hex').toLowerCase() != strSeed.toLowerCase()) throw 'bad seed';
        let oldState;

        const ret = (await initFacadeWallet(seed, this.config, strSerializedState));
        this.walletObj = ret.wallet;
        this.shieldedSecretKeys = ret.shieldedSecretKeys;
        this.unshieldedKeystore = ret.unshieldedKeystore;
        this.dustSecretKey = ret.dustSecretKey;

        const selfWallet = this.walletObj;
        const state = await waitForFullySynced(this.walletObj);//await Rx.firstValueFrom(this.walletObj.state());
        this.walletAddress = {
            shieldedAddress: ShieldedAddress.codec.encode(this.config.networkId, state.shielded.address).asString()
            , unshieldedAddress: UnshieldedAddress.codec.encode(this.config.networkId, state.unshielded.address).asString()
            , dustAddress: state.dust.dustAddress
        };

        const callBack = async () => {
            const state = await waitForFullySynced(selfWallet);//await Rx.firstValueFrom(selfWallet.state());
            await store({ shieldedWalletState: state.shielded.serialize(), unshieldedWalletState: state.unshielded.serialize(), dustWalletState: state.dust.serialize() });
            console.log('wallet state saved!');
            clearTimeout(this.storeTimer);
            this.registerNightUtxosForDustGeneration();
            this.storeTimer = setTimeout(callBack, saveInterval);
        }
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
        const state = await waitForFullySynced(this.walletObj);//await Rx.firstValueFrom(this.walletObj.state());

        const nightUtxos = state.unshielded.availableCoins.filter(
            (coin) => coin.meta.registeredForDustGeneration === false && coin.utxo.type === ledger.nativeToken().raw,
        );
        if (nightUtxos.length === 0) {
            this.isGenerating = false;
            return;
        }

        const signKeyStore = this.unshieldedKeystore;

        const dustRegistrationRecipe = await this.walletObj.registerNightUtxosForDustGeneration(
            nightUtxos,
            signKeyStore.getPublicKey(),
            (payload) => signKeyStore.signData(payload),
            // this.walletAddress.dustAddress
        );

        const finalizedDustTx = await this.walletObj.finalizeRecipe(dustRegistrationRecipe);

        const dustRegistrationTxHash = await this.submitTx(finalizedDustTx);
        // const dustRegistrationTxHash = this.ISMimic ? await ToolKitClient.submitTXStringWithContext(finalizedDustTx) : await this.walletObj.submitTransaction(finalizedDustTx);

        this.isGenerating = false;
    }

    async deregisterFromDustGeneration() {
        if (this.isUnGenerating) return;
        this.isUnGenerating = true;
        assert(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
        const state = await waitForFullySynced(this.walletObj);//await Rx.firstValueFrom(this.walletObj.state());

        const nightUtxos = state.unshielded.availableCoins.filter(
            (coin) => coin.meta.registeredForDustGeneration === true && coin.utxo.type === ledger.nativeToken().raw,
        );
        if (nightUtxos.length === 0) {
            this.isUnGenerating = false;
            return;
        }

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

        // const dustRegistrationTxHash = await this.walletObj.submitTransaction(finalizedDustTx);
        // const dustRegistrationTxHash = this.ISMimic ? await ToolKitClient.submitTXStringWithContext(finalizedDustTx) : await this.walletObj.submitTransaction(finalizedDustTx);
        const dustRegistrationTxHash = await this.submitTx(finalizedDustTx);

        this.isUnGenerating = false;
    }

    async submitTx(tx: ledger.FinalizedTransaction) {
        assert(this.walletObj, "walletObj is not initialized!");
        // const txHash = await this.walletObj.submitTransaction(tx);
        const txHash = this.ISMimic ? await ToolKitClient.submitTXStringWithContext(tx) : await this.walletObj.submitTransaction(tx);
        return txHash;
    }


    async getBalances() {
        assert(this.walletObj, "walletObj is not initialized!");
        let curState = await waitForFullySynced(this.walletObj);//await Rx.firstValueFrom(this.walletObj.state());
        // console.log("\n\n...getAccountBalance...curState: ", curState);

        // balances: Record<TokenType, bigint>;
        // let aryBalance = new Array();

        const dustBalance = curState.dust.walletBalance(new Date());
        const shieldedBlance = curState.shielded.balances;
        const unshieldedBlance = curState.unshielded.balances;

        // 使用 replacer 将 bigint 转换为字符串
        const replacer = (key: any, value: any) => typeof value === 'bigint' ? value.toString() : value;

        // 反序列化，使用 reviver 将字符串转换回 bigint
        const reviver = (key: any, value: any) => typeof value === 'string' && /^\d+$/.test(value) ? BigInt(value) : value;

        return { dustBalance, shieldedBlance: JSON.parse(JSON.stringify(shieldedBlance, replacer), reviver), unshieldedBlance: JSON.parse(JSON.stringify(unshieldedBlance, replacer), reviver) };
    }


    async getAvailableCoins() {
        assert(this.walletObj, "walletObj is not initialized!");
        let curState = await waitForFullySynced(this.walletObj);//await Rx.firstValueFrom(this.walletObj.state());

        const dustAvailableCoins = curState.dust.availableCoins;
        const shieldedAvailableCoins = curState.shielded.availableCoins;
        const unshieldedAvailableCoins = curState.unshielded.availableCoins;
        // console.log("\n\n...getAvailableCoins...curBalance: ", availableCoins);

        return { dustAvailableCoins, shieldedAvailableCoins, unshieldedAvailableCoins };
    }

    async uninitWallet() {
        if (this.storeTimer) {
            clearTimeout(this.storeTimer);
        }

        if (true === this.bActiveFlag) {
            await this.walletObj?.stop();
        }
        this.bActiveFlag = false;
        console.log("\n\n...wallet close done!");
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
        let curState = await waitForFullySynced(this.walletObj);//await Rx.firstValueFrom(this.walletObj.state());
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
        // const submittedTxHash = this.ISMimic ? await ToolKitClient.submitTXStringWithContext(finalizedTx) : await this.walletObj.submitTransaction(finalizedTx);
        return submittedTxHash;
    }

    async balanceTx(tx: UnboundTransaction, ttl?: Date): Promise<ledger.FinalizedTransaction> {
        assert(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
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
        const finalizedTx = await this.walletObj.finalizeRecipe(recipe);
        return finalizedTx;
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

    for (const segment of tx.intents.keys()) {
        const intent = tx.intents.get(segment);
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

        tx.intents.set(segment, cloned);
    }
};