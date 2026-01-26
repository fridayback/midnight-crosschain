import * as ledger from '@midnight-ntwrk/ledger-v7';
import { DustWallet } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import { WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
import { HDWallet, Roles } from '@midnight-ntwrk/wallet-sdk-hd';
import { ShieldedWallet } from '@midnight-ntwrk/wallet-sdk-shielded';
import { createKeystore, PublicKey, 
// InMemoryTransactionHistoryStorage,
NoOpTransactionHistoryStorage, UnshieldedWallet, } from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { Buffer } from 'buffer';
import * as Rx from 'rxjs';
import { ShieldedAddress, UnshieldedAddress } from "@midnight-ntwrk/wallet-sdk-address-format";
import assert from 'node:assert';
const PROOF_SERVER_PORT = Number.parseInt(globalThis.process?.env?.['PROOF_SERVER_PORT'] ?? '6300', 10);
const INDEXER_HTTP_URL = `https://indexer.preview.midnight.network/api/v3/graphql`;
const INDEXER_WS_URL = `wss://indexer.preview.midnight.network/api/v3/graphql/ws`;
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
export const configuration = function (indexerHttpUrl, indexerWsUrl, provingServerUrl, network = 'preview', costParameters = {
    additionalFeeOverhead: 300000000000000n,
    feeBlocksMargin: 5,
}) {
    return {
        networkId: network,
        costParameters: costParameters,
        relayURL: new URL(indexerWsUrl),
        provingServerUrl: new URL(provingServerUrl),
        indexerClientConnection: {
            indexerHttpUrl: indexerHttpUrl,
            indexerWsUrl: indexerWsUrl,
        },
        indexerUrl: indexerWsUrl,
    };
};
// TODO: 为了防止hd wallet 的意外变更,是否应该不依赖hd wallet生成三个私钥
export const initFacadeWallet = async (seed, configuration, // = defaultConfiguration,
strSerializedState) => {
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
    const shieldedWallet = strSerializedState ?
        ShieldedWallet(configuration).restore(strSerializedState.shieldedWalletState)
        : ShieldedWallet(configuration).startWithSecretKeys(shieldedSecretKeys);
    const dustWallet = strSerializedState ?
        DustWallet(configuration).restore(strSerializedState.dustWalletState)
        : DustWallet(configuration).startWithSecretKey(dustSecretKey, ledger.LedgerParameters.initialParameters().dust);
    const unshieldedWallet = strSerializedState ?
        UnshieldedWallet({
            ...configuration,
            txHistoryStorage: new NoOpTransactionHistoryStorage(), //此处不对交易历史进行保留
        }).restore(strSerializedState.unshieldedWalletState)
        : UnshieldedWallet({
            ...configuration,
            txHistoryStorage: new NoOpTransactionHistoryStorage(), //此处不对交易历史进行保留
        }).startWithPublicKey(PublicKey.fromKeyStore(unshieldedKeystore));
    const wallet = new WalletFacade(shieldedWallet, unshieldedWallet, dustWallet);
    await wallet.start(shieldedSecretKeys, dustSecretKey);
    return { wallet, shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
};
export class MidnightWalletSDK {
    config;
    // private NetWorkId: NetworkId;
    walletObj;
    shieldedSecretKeys;
    dustSecretKey;
    unshieldedKeystore;
    walletAddress;
    bActiveFlag;
    storeTimer;
    constructor(config) {
        this.config = config;
        this.walletAddress = { shieldedAddress: '', unshieldedAddress: '', dustAddress: '' };
        this.bActiveFlag = false;
    }
    //////////////////////////////////////////
    // to generate a wallet instance
    //////////////////////////////////////////
    async initWallet(strSeed, store, strSerializedState, saveInterval = 600000) {
        const seed = Buffer.from(strSeed, 'hex');
        if (seed.toString('hex').toLowerCase() != strSeed.toLowerCase())
            throw 'bad seed';
        let oldState;
        const ret = (await initFacadeWallet(seed, this.config, strSerializedState));
        this.walletObj = ret.wallet;
        this.shieldedSecretKeys = ret.shieldedSecretKeys;
        this.unshieldedKeystore = ret.unshieldedKeystore;
        this.dustSecretKey = ret.dustSecretKey;
        const selfWallet = this.walletObj;
        const state = await Rx.firstValueFrom(this.walletObj.state());
        this.walletAddress = {
            shieldedAddress: ShieldedAddress.codec.encode(this.config.networkId, state.shielded.address).asString(),
            unshieldedAddress: UnshieldedAddress.codec.encode(this.config.networkId, state.unshielded.address).asString(),
            dustAddress: state.dust.dustAddress
        };
        const callBack = async () => {
            const state = await Rx.firstValueFrom(selfWallet.state());
            await store({ shieldedWalletState: state.shielded.serialize(), unshieldedWalletState: state.unshielded.serialize(), dustWalletState: state.dust.serialize() });
            console.log('wallet state saved!');
            clearTimeout(this.storeTimer);
            this.storeTimer = setTimeout(callBack, saveInterval);
        };
        this.storeTimer = setTimeout(async () => {
            await callBack();
        }, saveInterval);
    }
    // to get the wallet address
    getAccountAddress() {
        return this.walletAddress;
    }
    async getBalances() {
        assert(this.walletObj, "walletObj is not initialized!");
        let curState = await Rx.firstValueFrom(this.walletObj.state());
        // console.log("\n\n...getAccountBalance...curState: ", curState);
        // balances: Record<TokenType, bigint>;
        let aryBalance = new Array();
        const dustBalance = curState.dust.walletBalance(new Date());
        const shieldedBlance = curState.shielded.balances;
        const unshieldedBlance = curState.unshielded.balances;
        return { dustBalance, shieldedBlance, unshieldedBlance };
    }
    async getAvailableCoins() {
        assert(this.walletObj, "walletObj is not initialized!");
        let curState = await Rx.firstValueFrom(this.walletObj.state());
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
        if (!this.walletObj)
            return '';
        let curState = await Rx.firstValueFrom(this.walletObj.state());
        const dustWalletState = curState.dust.serialize();
        const shieldedWalletState = curState.shielded.serialize();
        const unshieldedWalletState = curState.unshielded.serialize();
        return { dustWalletState, shieldedWalletState, unshieldedWalletState };
    }
    async transferTo(transferInfo, ttl) {
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
        const unprovenTxRecipe = await this.walletObj?.transferTransaction(this.shieldedSecretKeys, this.dustSecretKey, transferInfo, ttl);
        const finalizedTx = await this.walletObj.finalizeTransaction(unprovenTxRecipe);
        const submittedTxHash = await this.walletObj.submitTransaction(finalizedTx);
        return submittedTxHash;
    }
}
//# sourceMappingURL=WalletSDK.js.map