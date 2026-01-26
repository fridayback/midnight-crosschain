import * as _midnight_ntwrk_wallet_sdk_unshielded_wallet_dist_v1_UnshieldedState from '@midnight-ntwrk/wallet-sdk-unshielded-wallet/dist/v1/UnshieldedState';
import * as _midnight_ntwrk_wallet_sdk_shielded_dist_v1_CoinsAndBalances from '@midnight-ntwrk/wallet-sdk-shielded/dist/v1/CoinsAndBalances';
import * as _midnight_ntwrk_wallet_sdk_dust_wallet from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import { DefaultV1Configuration as DefaultV1Configuration$1, TotalCostParameters } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import * as ledger from '@midnight-ntwrk/ledger-v7';
import { NetworkId } from '@midnight-ntwrk/wallet-sdk-abstractions';
import { WalletFacade, CombinedSwapOutputs } from '@midnight-ntwrk/wallet-sdk-facade';
import { DefaultV1Configuration } from '@midnight-ntwrk/wallet-sdk-shielded/dist/v1';
import { UnshieldedKeystore } from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { Buffer } from 'buffer';

type Configuration = DefaultV1Configuration & DefaultV1Configuration$1 & {
    indexerUrl: string;
};
declare const configuration: (indexerHttpUrl: string, indexerWsUrl: string, provingServerUrl: string, network?: NetworkId.NetworkId, costParameters?: TotalCostParameters) => Configuration;
declare const initFacadeWallet: (seed: Buffer, configuration: Configuration, // = defaultConfiguration,
strSerializedState?: FacadeSerializedState) => Promise<{
    wallet: WalletFacade;
    shieldedSecretKeys: ledger.ZswapSecretKeys;
    dustSecretKey: ledger.DustSecretKey;
    unshieldedKeystore: UnshieldedKeystore;
}>;
interface FacadeSerializedState {
    readonly shieldedWalletState: string;
    readonly unshieldedWalletState: string;
    readonly dustWalletState: string;
}
interface WalletStore {
    (walletState: FacadeSerializedState): Promise<void>;
}
declare class MidnightWalletSDK {
    private config;
    private walletObj?;
    private shieldedSecretKeys?;
    private dustSecretKey?;
    private unshieldedKeystore?;
    private walletAddress;
    private bActiveFlag;
    private storeTimer?;
    constructor(config: Configuration);
    initWallet(strSeed: string, store: WalletStore, strSerializedState?: FacadeSerializedState, saveInterval?: number): Promise<void>;
    getAccountAddress(): {
        shieldedAddress: string;
        unshieldedAddress: string;
        dustAddress: string;
    };
    getBalances(): Promise<{
        dustBalance: bigint;
        shieldedBlance: Record<string, bigint>;
        unshieldedBlance: Record<string, bigint>;
    }>;
    getAvailableCoins(): Promise<{
        dustAvailableCoins: readonly _midnight_ntwrk_wallet_sdk_dust_wallet.DustToken[];
        shieldedAvailableCoins: readonly _midnight_ntwrk_wallet_sdk_shielded_dist_v1_CoinsAndBalances.AvailableCoin[];
        unshieldedAvailableCoins: readonly _midnight_ntwrk_wallet_sdk_unshielded_wallet_dist_v1_UnshieldedState.UtxoWithMeta[];
    }>;
    uninitWallet(): Promise<void>;
    getWalletInstance(): WalletFacade | undefined;
    getShieldedSecretKeys(): ledger.ZswapSecretKeys;
    getUnshieldedKeystore(): UnshieldedKeystore;
    getDustSecretKey(): ledger.DustSecretKey;
    getSerializedWalletState(): Promise<"" | {
        dustWalletState: string;
        shieldedWalletState: string;
        unshieldedWalletState: string;
    }>;
    transferTo(transferInfo: CombinedSwapOutputs[], ttl: Date): Promise<string>;
}

export { type Configuration, type FacadeSerializedState, MidnightWalletSDK, type WalletStore, configuration, initFacadeWallet };
