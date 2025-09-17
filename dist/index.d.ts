import * as CrossChain from "./managed/crosschain/contract/index.cjs";
import { type ImpureCircuitId, type MidnightProvider, type MidnightProviders, type WalletProvider, type FinalizedTxData } from '@midnight-ntwrk/midnight-js-types';
import { type DeployedContract, type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { Wallet } from '@midnight-ntwrk/wallet-api';
import { NetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { ContractAddress, SigningKey } from '@midnight-ntwrk/compact-runtime';
import { Resource } from '@midnight-ntwrk/wallet';
export type CrossChainCircuits = ImpureCircuitId<CrossChain.Contract<CrossChainPrivateState>>;
export declare const CrossChainPrivateStateId = "crossChainPrivateState";
export type CrossChainProviders = MidnightProviders<CrossChainCircuits, typeof CrossChainPrivateStateId, CrossChainPrivateState>;
export type CrossChainContract = CrossChain.Contract<CrossChainPrivateState>;
export type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;
export declare const currentDir: string;
export declare const ZKConfig: {
    privateStateStoreName: string;
    zkConfigPath: string;
};
export type CrossChainPrivateState = {};
export declare const createCrossChainPrivateState: () => {};
export declare const witnesses: {};
export declare function pad(s: string, n: number): Uint8Array;
export interface Config {
    readonly logDir: string;
    readonly indexer: string;
    readonly indexerWS: string;
    readonly node: string;
    readonly proofServer: string;
    readonly zkConfigPath: string;
}
export declare const crosschainContractInstance: CrossChainContract;
export declare const createWalletAndMidnightProvider: (wallet: Wallet) => Promise<WalletProvider & MidnightProvider>;
export declare const buildWalletAndWaitForFunds: ({ indexer, indexerWS, node, proofServer }: Config, seed: string, filename: string) => Promise<Wallet & Resource>;
export declare const waitForFunds: (wallet: Wallet) => Promise<Record<string, bigint>>;
export declare const waitForSync: (wallet: Wallet) => Promise<import("@midnight-ntwrk/wallet-api").WalletState>;
export declare const waitForSyncProgress: (wallet: Wallet) => Promise<import("@midnight-ntwrk/wallet-api").WalletState>;
export declare class CrossChainApi {
    providers: CrossChainProviders;
    crossChainContract: DeployedCrossChainContract;
    MaxSmgSignators: number;
    MaxMergeCoins: number;
    constructor(networkId?: NetworkId);
    defaultSmgSignators(): bigint[];
    defaultNoneMergeCoins(): {
        is_some: boolean;
        value: bigint[];
    };
    toMergerCoins(coins: string[] | number[] | bigint[] | undefined): {
        is_some: boolean;
        value: bigint[];
    };
    init(config: Config, wallet: Wallet): Promise<void>;
    deployContract(adminThreshold: number | string | bigint, smgPkThreshold: number | string | bigint, signingKey: SigningKey): Promise<ContractAddress>;
    join(contractAddress: ContractAddress): Promise<void>;
    checkCrossData(uniqueId: string, smgId: string, tokenPairId: string | number | bigint, amount: string | number | bigint, fee: string | number | bigint, toAddr: string, coins: string[] | number[] | bigint[] | undefined, ttl: string | number | bigint): {
        uniqueId: Buffer<ArrayBuffer>;
        smgId: Buffer<ArrayBuffer>;
        tokenPairId: bigint;
        amount: bigint;
        fee: bigint;
        toAddr: {
            bytes: Buffer<ArrayBufferLike>;
        };
        ttl: bigint;
    };
    userLock(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "userLock">>;
    smgRelease(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint, fee: string | number | bigint, toAddr: string, ttl: number): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "smgRelease">>;
    smgMint(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint, fee: string | number | bigint, toAddr: string, ttl: number): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "smgMint">>;
    userBurn(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "userBurn">>;
    voteCrossProposal(uniqueId: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "voteCrossProposal">>;
    executeCrossProposal(uniqueId: string, coinIndex: string | number | bigint | undefined): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "executeCrossProposalOfMappingToken">>;
    getLedgerState(): Promise<CrossChain.Ledger | null>;
    transferOwner(newOwner: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "transferOwner">>;
    acceptOwner(): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "acceptOwner">>;
    updateSmgPk(newVoter: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "updateSmgPk">>;
    setFeeReceiver(feeReceiver: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "setFeeReceiver">>;
    setTokenManager(tokenManager: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "setTokenManager">>;
    setMegerWorker(mergeWorker: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "setMegerWorker">>;
    mergeTreasuryCoin(coins: bigint[] | number[] | string[]): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "mergeTreasuryCoin">>;
    addAdmin(admin: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "addAdmin">>;
    removeAdmin(admin: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "removeAdmin">>;
    setAdminThreshold(threshold: number | string | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "setAdminThreshold">>;
    setSmgPksks(voters: string[]): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "setSmgPksks">>;
    setSmgPKThreold(threshold: number | string | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "setSmgPKThreold">>;
    setFeeCommonConfig(chainId: number | string | bigint, fee: number | string | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "setFeeCommonConfig">>;
    addTokenPair(tokenPairId: number | string | bigint, fromChainId: number | string | bigint, toChainId: number | string | bigint, midnigthTokenAccount: string, fee: number | string | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "addTokenPair">>;
    removeTokenPair(tokenPairId: number | string | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "removeTokenPair">>;
    newProposal(proposal: CrossChain.Proposal): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "newProposal">>;
    addAdminProposal(addr: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "newProposal">>;
    removeAdminProposal(addr: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateFeeReceiverProposal(addr: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateTokenManagerProposal(addr: string): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateAdminThresholdProposal(threshold: number | string | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "newProposal">>;
    defaultProsal(): CrossChain.Proposal;
    updateSMGPKThresholdProposal(threshold: number | string | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateFeeCommonConfigProposal(chainId: number | string | bigint, fee: number | string | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "newProposal">>;
    voteProposal(proposalId: number | string | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "voteProposal">>;
    executeProposal(proposalId: number | string | bigint): Promise<import("@midnight-ntwrk/midnight-js-contracts").FinalizedCallTxData<CrossChainContract, "executeProposal">>;
    updateContractAuthority(newKey: SigningKey): Promise<FinalizedTxData>;
    upgradeContract(): Promise<void>;
}
export declare const getTreasuryCoinsFromState: (state: CrossChain.Ledger) => Map<string, Map<bigint, CrossChain.QualifiedCoinInfo>>;
export declare const genSigningKey: () => string;
export declare const genRandomBigint: () => bigint;
export declare const signData: (hash: bigint, privateKey: bigint) => {
    R: import("@midnight-ntwrk/compact-runtime").CurvePoint;
    s: bigint;
    P: import("@midnight-ntwrk/compact-runtime").CurvePoint;
};
export declare const verifySignature: (hash: bigint, R: CrossChain.CurvePoint, s: bigint, P: CrossChain.CurvePoint) => boolean;
export declare const configureProviders: (wallet: Wallet & Resource, config: Config) => Promise<{
    privateStateProvider: import("@midnight-ntwrk/midnight-js-types").PrivateStateProvider<"crossChainPrivateState", any>;
    publicDataProvider: import("@midnight-ntwrk/midnight-js-types").PublicDataProvider;
    zkConfigProvider: NodeZkConfigProvider<CrossChainCircuits>;
    proofProvider: import("@midnight-ntwrk/midnight-js-types").ProofProvider<string>;
    walletProvider: WalletProvider & MidnightProvider;
    midnightProvider: WalletProvider & MidnightProvider;
}>;
export declare const getCoinPublicKeyFromShieldAddress: (shieldAddr: string) => Buffer<ArrayBufferLike>;
