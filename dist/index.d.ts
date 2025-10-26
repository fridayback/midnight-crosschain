import * as CrossChain from "./managed/crosschain/contract/index.cjs";
import { type ImpureCircuitId, type MidnightProvider, type MidnightProviders, type WalletProvider, type FinalizedTxData } from '@midnight-ntwrk/midnight-js-types';
import { FinalizedCallTxData, type DeployedContract, type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { Address, Wallet } from '@midnight-ntwrk/wallet-api';
import { TokenType } from '@midnight-ntwrk/zswap';
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
    readonly indexer: string;
    readonly indexerWS: string;
    readonly node: string;
    readonly proofServer: string;
    readonly zkConfigPath: string;
}
export declare const crosschainContractInstance: CrossChainContract;
export declare const createWalletAndMidnightProvider: (wallet: Wallet) => Promise<WalletProvider & MidnightProvider>;
export declare const waitForSync: (wallet: Wallet) => Promise<import("@midnight-ntwrk/wallet-api").WalletState>;
export declare const waitForSyncProgress: (wallet: Wallet) => Promise<import("@midnight-ntwrk/wallet-api").WalletState>;
export declare const waitForFunds: (wallet: Wallet) => Promise<Record<string, bigint>>;
export declare const buildWalletAndWaitForFunds: ({ indexer, indexerWS, node, proofServer }: Config, seed: string, serializedState: string | undefined) => Promise<Wallet & Resource>;
export declare const isAnotherChain: (wallet: Wallet, offset: number) => Promise<boolean>;
export declare const getSerializeWalletState: (wallet: Wallet) => Promise<string>;
export declare const walletAddress: (wallet: Wallet) => Promise<string>;
export declare const walletBalance: (wallet: Wallet) => Promise<Record<string, bigint>>;
export declare class CrossChainApi {
    providers: CrossChainProviders;
    crossChainContract: DeployedCrossChainContract;
    MaxSmgSignators: number;
    MaxMergeCoins: number;
    constructor();
    init(config: Config, wallet: Wallet): Promise<void>;
    setWallet(wallet: Wallet): Promise<void>;
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
    getTokenPairInfo(tokenPairId: bigint | string | number): Promise<CrossChain.TokenPairInfo | undefined>;
    getTokensTotalSupply(tokens: string[]): Promise<{
        token: string;
        totalSupply: string;
    }[]>;
    static getCrossTxInfo(ledger: CrossChain.Ledger, uniqueId: string): {
        smgId: string;
        token: string;
        tokenPairId: string;
        amount: string;
        fee: string;
        toAddr: CrossChain.ZswapCoinPublicKey;
        ttl: string;
    } | undefined;
    static parseContractState(stateHex: string): CrossChain.Ledger | undefined;
    static currentExecuteCrossProposal(ledger: CrossChain.Ledger): {
        smgId: string;
        uniqueId: string;
        token: string;
        tokenPairId: string;
        isMappingToken: boolean;
        amount: string;
        fee: string;
        toAddr: string;
        ttl: string;
    }[];
    static latestOutBoundCrosstxInfo(ledger: CrossChain.Ledger): {
        smgId: string;
        fromAddr: string;
        toAddr: string;
        tokenPairId: string;
        tokenAccount: Uint8Array<ArrayBufferLike>;
        amount: string;
        fee: string;
        nonce: string;
    } | undefined;
    getUnVotedCrossProposal(ledger: CrossChain.Ledger, voter: Address | undefined): Promise<({
        smgId: string;
        token: string;
        tokenPairId: string;
        amount: string;
        fee: string;
        toAddr: CrossChain.ZswapCoinPublicKey;
        ttl: string;
    } | undefined)[]>;
    getUnExecuteCrossProposal(ledger: CrossChain.Ledger): Promise<{
        uniqueId: string;
        smgId: string;
        tokenPairId: string;
        amount: string;
        fee: string;
        toAddr: string;
        ttl: string;
    }[]>;
    userLock(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint): Promise<void>;
    smgRelease(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint, fee: string | number | bigint, toAddr: string, ttl: number): Promise<void>;
    smgMint(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint, fee: string | number | bigint, toAddr: string, ttl: number): Promise<FinalizedCallTxData<CrossChainContract, "smgMint">>;
    userBurn(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "userBurn">>;
    voteCrossProposal(uniqueId: string, ttl: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "voteCrossProposal">>;
    voteMultiCrossProposal(uniqueIds: {
        uniqueId: string;
        ttl: string | number | bigint;
    }[]): Promise<FinalizedCallTxData<CrossChainContract, "voteMultiCrossProposal">>;
    executeCrossProposal(uniqueId: string, coinIndex: string | number | bigint | undefined): Promise<void>;
    executeMultiCrossProposal(uniqueIds: ({
        uniqueId: string;
        coinIndex: string | number | bigint | undefined;
    })[]): Promise<FinalizedCallTxData<CrossChainContract, "executeMultiCrossProposal">>;
    userRechargeForFee(amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "userRechargeForFee">>;
    approveUserWithdrawFee(user: Address, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "approveUserWithdrawFee">>;
    userClaim(uniqueId: string, isMappingToken: boolean): Promise<FinalizedCallTxData<CrossChainContract, "userClaimMappingToken">>;
    userClaimCoin(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "userClaimCoin">>;
    userClaimMappingToken(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "userClaimMappingToken">>;
    addReserve(token: TokenType, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addReserve">>;
    withdrawReserveOfNativeToken(token: TokenType, coinIndex: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfNativeToken">>;
    withdrawReserveOfMappingToken(domainSep: string): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfMappingToken">>;
    getLedgerState(): Promise<CrossChain.Ledger | null>;
    transferOwner(newOwner: Address): Promise<FinalizedCallTxData<CrossChainContract, "transferOwner">>;
    acceptOwner(): Promise<FinalizedCallTxData<CrossChainContract, "acceptOwner">>;
    updateSmgPk(newVoter: Address): Promise<FinalizedCallTxData<CrossChainContract, "updateSmgPk">>;
    setFeeReceiver(feeReceiver: Address): Promise<FinalizedCallTxData<CrossChainContract, "setFeeReceiver">>;
    setTokenManager(tokenManager: Address): Promise<FinalizedCallTxData<CrossChainContract, "setTokenManager">>;
    setMegerWorker(mergeWorker: Address): Promise<FinalizedCallTxData<CrossChainContract, "setMegerWorker">>;
    addAdmin(admin: Address): Promise<FinalizedCallTxData<CrossChainContract, "addAdmin">>;
    removeAdmin(admin: Address): Promise<FinalizedCallTxData<CrossChainContract, "removeAdmin">>;
    setAdminThreshold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setAdminThreshold">>;
    setSmgPksks(voters: Address[]): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPksks">>;
    setSmgPKThreold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPKThreold">>;
    setFeeCommonConfig(chainId: number | string | bigint, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setFeeCommonConfig">>;
    addTokenPair(tokenPairId: number | string | bigint, fromChainId: number | string | bigint, toChainId: number | string | bigint, midnigthTokenAccount: TokenType, domainSep: string, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addTokenPair">>;
    removeTokenPair(tokenPairId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "removeTokenPair">>;
    newProposal(proposal: CrossChain.Proposal): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    addAdminProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    removeAdminProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateFeeReceiverProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateTokenManagerProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateAdminThresholdProposal(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    defaultProsal(): CrossChain.Proposal;
    updateSMGPKThresholdProposal(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateFeeCommonConfigProposal(chainId: number | string | bigint, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    voteProposal(proposalId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "voteProposal">>;
    executeProposal(proposalId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "executeProposal">>;
    removeExpiredHisTxs(txs: string[]): Promise<FinalizedCallTxData<CrossChainContract, "removeExpiredHisTxs">>;
    updateContractAuthority(newKey: SigningKey): Promise<FinalizedTxData>;
    upgradeContract(circuit: CrossChainCircuits, newCircuit: string | undefined): Promise<FinalizedTxData>;
}
export declare const getTreasuryCoinsFromState: (state: CrossChain.Ledger) => Map<string, Map<bigint, CrossChain.QualifiedCoinInfo>>;
export declare const genSigningKey: () => string;
export declare const genRandomBigint: () => bigint;
export declare const configureProviders: (wallet: Wallet & Resource, config: Config) => Promise<{
    privateStateProvider: import("@midnight-ntwrk/midnight-js-types").PrivateStateProvider<"crossChainPrivateState", any>;
    publicDataProvider: import("@midnight-ntwrk/midnight-js-types").PublicDataProvider;
    zkConfigProvider: NodeZkConfigProvider<CrossChainCircuits>;
    proofProvider: import("@midnight-ntwrk/midnight-js-types").ProofProvider<string>;
    walletProvider: WalletProvider & MidnightProvider;
    midnightProvider: WalletProvider & MidnightProvider;
}>;
export declare const getCoinPublicKeyFromShieldAddress: (shieldAddr: string) => Buffer<ArrayBufferLike>;
export declare const initNetwork: (networkId: number) => void;
export interface WalletStore {
    (walletState: string): Promise<void>;
}
export declare class MidnightWalletSDK {
    readonly config: Config;
    private walletObj?;
    private walletAddress;
    private bActiveFlag;
    private storeTimer?;
    constructor(config: Config);
    initWallet(strSeed: string, store: WalletStore, strSerializedState?: string, saveInterval?: number): Promise<void>;
    getAccountAddress(): string;
    getBalances(): Promise<any[]>;
    getAvailableCoins(): Promise<import("@midnight-ntwrk/zswap").QualifiedCoinInfo[]>;
    uninitWallet(): void;
    getWalletInstance(): (Wallet & Resource) | undefined;
    getSerializedWalletState(): Promise<string> | "";
}
