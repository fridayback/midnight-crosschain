import * as CrossChain from "./managed/crosschain/contract/index.cjs";
import { ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { PublicDataProvider } from '@midnight-ntwrk/midnight-js-types';
import { Contract, Witnesses } from './managed/crosschain/contract/index.cjs';
import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract, type DeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
export type CrossChainPrivateState = {};
export declare const createCrossChainPrivateState: () => {};
export declare const witnesses: {};
export declare const CrossChainPrivateStateId = "crossChainPrivateState";
export type PrivateStateId = typeof CrossChainPrivateStateId;
export type CrossChainContract = Contract<CrossChainPrivateState, Witnesses<CrossChainPrivateState>>;
export type CrossChainCircuitKeys = Exclude<keyof CrossChainContract['impureCircuits'], number | symbol>;
export type CrossChainProviders = MidnightProviders<CrossChainCircuitKeys, PrivateStateId, CrossChainPrivateState>;
export type CrossChainCircuits = Exclude<keyof CrossChainContract['impureCircuits'], number | symbol>;
export type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;
export declare function pad(s: string, n: number): Uint8Array;
export interface Config {
    readonly indexer?: string;
    readonly indexerWS?: string;
    readonly node?: string;
    readonly proofServer?: string;
    readonly zkConfigPath?: string;
}
export declare const crosschainContractInstance: CrossChainContract;
export declare class CrossChainStateApi {
    provider?: PublicDataProvider;
    crossChainContract?: ContractAddress;
    MaxSmgSignators: number;
    MaxMergeCoins: number;
    constructor();
    init(config: Config, contractAddress: ContractAddress): Promise<void>;
    getTokenPairInfo(tokenPairId: bigint | string | number, targetLedger: CrossChain.Ledger | undefined): Promise<CrossChain.TokenPairInfo | undefined>;
    getTokensTotalSupply(tokens: string[], targetLedger: CrossChain.Ledger | undefined): Promise<{
        token: string;
        totalSupply: string;
    }[]>;
    getFeeCommonConfig(chainId: bigint | string | number, targetLedger: CrossChain.Ledger | undefined): Promise<string | undefined>;
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
    getUnExecuteCrossProposal(ledger: CrossChain.Ledger): Promise<{
        uniqueId: string;
        smgId: string;
        tokenPairId: string;
        token: string;
        amount: string;
        fee: string;
        toAddr: string;
        ttl: string;
    }[]>;
    getLedgerState(): Promise<CrossChain.Ledger | null>;
}
export declare const getTreasuryCoinsFromState: (state: CrossChain.Ledger) => Map<string, Map<bigint, CrossChain.QualifiedCoinInfo>>;
export declare const genSigningKey: () => string;
export declare const genRandomBigint: () => bigint;
export declare const getCoinPublicKeyFromShieldAddress: (shieldAddr: string) => Buffer<ArrayBufferLike>;
export declare const initNetwork: (networkId: number) => void;
