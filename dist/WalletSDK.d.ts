import * as ledger from '@midnight-ntwrk/ledger-v7';
import { NetworkId } from '@midnight-ntwrk/wallet-sdk-abstractions';
import type { DefaultV1Configuration as DustConfiguration, TotalCostParameters } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import { CombinedSwapOutputs, WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
import type { DefaultV1Configuration as ShieldedConfiguration } from '@midnight-ntwrk/wallet-sdk-shielded/dist/v1';
import { UnshieldedKeystore } from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { Buffer } from 'buffer';
export type Configuration = ShieldedConfiguration & DustConfiguration & {
    indexerUrl: string;
};
export declare const configuration: (indexerHttpUrl: string, indexerWsUrl: string, provingServerUrl: string, network?: NetworkId.NetworkId, costParameters?: TotalCostParameters) => Configuration;
export declare const initFacadeWallet: (seed: Buffer, configuration: Configuration, // = defaultConfiguration,
strSerializedState?: FacadeSerializedState) => Promise<{
    wallet: WalletFacade;
    shieldedSecretKeys: ledger.ZswapSecretKeys;
    dustSecretKey: ledger.DustSecretKey;
    unshieldedKeystore: UnshieldedKeystore;
}>;
export interface FacadeSerializedState {
    readonly shieldedWalletState: string;
    readonly unshieldedWalletState: string;
    readonly dustWalletState: string;
}
export interface WalletStore {
    (walletState: FacadeSerializedState): Promise<void>;
}
export declare class MidnightWalletSDK {
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
        dustAvailableCoins: readonly import("@midnight-ntwrk/wallet-sdk-dust-wallet").DustToken[];
        shieldedAvailableCoins: readonly import("@midnight-ntwrk/wallet-sdk-shielded/dist/v1/CoinsAndBalances").AvailableCoin[];
        unshieldedAvailableCoins: readonly import("@midnight-ntwrk/wallet-sdk-unshielded-wallet/dist/v1/UnshieldedState").UtxoWithMeta[];
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
