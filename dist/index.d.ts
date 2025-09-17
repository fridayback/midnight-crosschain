import * as _midnight_ntwrk_midnight_js_types from '@midnight-ntwrk/midnight-js-types';
import { ImpureCircuitId, MidnightProviders, WalletProvider, MidnightProvider, FinalizedTxData } from '@midnight-ntwrk/midnight-js-types';
import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
import { SigningKey, ContractAddress } from '@midnight-ntwrk/compact-runtime';
import * as _midnight_ntwrk_midnight_js_contracts from '@midnight-ntwrk/midnight-js-contracts';
import { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import * as _midnight_ntwrk_wallet_api from '@midnight-ntwrk/wallet-api';
import { Wallet } from '@midnight-ntwrk/wallet-api';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { NetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { Resource } from '@midnight-ntwrk/wallet';

declare enum ProposalType { AddAdmin = 0,
                           RemoveAdmin = 1,
                           UpdateFeeReceiver = 2,
                           UpdateTokenManager = 3,
                           UpdateAdminThreshold = 4,
                           UpdateSMGPKThreshold = 5,
                           UpdateFeeCommonConfig = 6,
                           SetSmgPKS = 7
}

type AccFeeOfToken = { totalFee: bigint; isMappingToken: boolean };

type FeeConfig = { chainId: bigint; fee: bigint };

type Proposal = { type: ProposalType;
                         addr: ZswapCoinPublicKey;
                         threshold: bigint;
                         feeConfig: FeeConfig;
                         smgPubkeys: ZswapCoinPublicKey[]
                       };

type TokenPairInfo = { fromChainId: bigint;
                              toChainId: bigint;
                              midnigthTokenAccount: Uint8Array;
                              fee: bigint
                            };

type CrossOutBound = { smgId: Uint8Array;
                              fromAddr: ZswapCoinPublicKey;
                              toAddr: string;
                              tokenPairId: bigint;
                              amount: bigint;
                              fee: bigint;
                              nonce: bigint
                            };

type CrossProposal = { smgId: Uint8Array;
                              token: Uint8Array;
                              isMappingToken: boolean;
                              amount: bigint;
                              fee: bigint;
                              toAddr: ZswapCoinPublicKey;
                              ttl: bigint
                            };

type QualifiedCoinInfo = { nonce: Uint8Array;
                                  color: Uint8Array;
                                  value: bigint;
                                  mt_index: bigint
                                };

type CurvePoint = { x: bigint; y: bigint };

type ZswapCoinPublicKey = { bytes: Uint8Array };

type Witnesses<T> = {
}

type ImpureCircuits<T> = {
  userLock(context: __compactRuntime.CircuitContext<T>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  smgRelease(context: __compactRuntime.CircuitContext<T>,
             uniqueId_0: Uint8Array,
             smgId_0: Uint8Array,
             tokenPairId_0: bigint,
             amount_0: bigint,
             toAddr_0: ZswapCoinPublicKey,
             fee_0: bigint,
             ttl_0: bigint): __compactRuntime.CircuitResults<T, []>;
  userBurn(context: __compactRuntime.CircuitContext<T>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  smgMint(context: __compactRuntime.CircuitContext<T>,
          uniqueId_0: Uint8Array,
          smgId_0: Uint8Array,
          tokenPairId_0: bigint,
          amount_0: bigint,
          fee_0: bigint,
          toAddr_0: ZswapCoinPublicKey,
          ttl_0: bigint): __compactRuntime.CircuitResults<T, []>;
  voteMultiCrossProposal(context: __compactRuntime.CircuitContext<T>,
                         uniqueIds_0: Uint8Array[]): __compactRuntime.CircuitResults<T, []>;
  voteCrossProposal(context: __compactRuntime.CircuitContext<T>,
                    uniqueId_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  executeCrossProposalOfNativeToken(context: __compactRuntime.CircuitContext<T>,
                                    uniqueId_0: Uint8Array,
                                    coinIndex_0: bigint): __compactRuntime.CircuitResults<T, []>;
  executeCrossProposalOfMappingToken(context: __compactRuntime.CircuitContext<T>,
                                     uniqueId_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  transferFeeOfNativeToken(context: __compactRuntime.CircuitContext<T>,
                           token_0: Uint8Array,
                           coinIndex_0: bigint): __compactRuntime.CircuitResults<T, []>;
  transferOwner(context: __compactRuntime.CircuitContext<T>,
                newOwner_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  acceptOwner(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  setFeeReceiver(context: __compactRuntime.CircuitContext<T>,
                 newFeeReceiver_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setTokenManager(context: __compactRuntime.CircuitContext<T>,
                  newTokenManager_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setMegerWorker(context: __compactRuntime.CircuitContext<T>,
                 newMergeWorker_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  test(context: __compactRuntime.CircuitContext<T>,
       coin0_0: QualifiedCoinInfo,
       coin1_0: QualifiedCoinInfo): __compactRuntime.CircuitResults<T, []>;
  mergeTreasuryCoin(context: __compactRuntime.CircuitContext<T>,
                    coins_0: bigint[]): __compactRuntime.CircuitResults<T, []>;
  addAdmin(context: __compactRuntime.CircuitContext<T>,
           admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  removeAdmin(context: __compactRuntime.CircuitContext<T>,
              admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setAdminThreshold(context: __compactRuntime.CircuitContext<T>,
                    threshold_0: bigint): __compactRuntime.CircuitResults<T, []>;
  setSmgPksks(context: __compactRuntime.CircuitContext<T>,
              voters_0: ZswapCoinPublicKey[]): __compactRuntime.CircuitResults<T, []>;
  updateSmgPk(context: __compactRuntime.CircuitContext<T>,
              newVoter_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setSmgPKThreold(context: __compactRuntime.CircuitContext<T>,
                  threshold_0: bigint): __compactRuntime.CircuitResults<T, []>;
  setFeeCommonConfig(context: __compactRuntime.CircuitContext<T>,
                     chainId_0: bigint,
                     fee_0: bigint): __compactRuntime.CircuitResults<T, []>;
  addTokenPair(context: __compactRuntime.CircuitContext<T>,
               tokenPairId_0: bigint,
               pairInfo_0: TokenPairInfo): __compactRuntime.CircuitResults<T, []>;
  removeTokenPair(context: __compactRuntime.CircuitContext<T>,
                  tokenPairId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  newProposal(context: __compactRuntime.CircuitContext<T>,
              newProposal_0: Proposal): __compactRuntime.CircuitResults<T, []>;
  voteProposal(context: __compactRuntime.CircuitContext<T>, proposalId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  executeProposal(context: __compactRuntime.CircuitContext<T>,
                  proposalId_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

type Circuits<T> = {
  userLock(context: __compactRuntime.CircuitContext<T>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  smgRelease(context: __compactRuntime.CircuitContext<T>,
             uniqueId_0: Uint8Array,
             smgId_0: Uint8Array,
             tokenPairId_0: bigint,
             amount_0: bigint,
             toAddr_0: ZswapCoinPublicKey,
             fee_0: bigint,
             ttl_0: bigint): __compactRuntime.CircuitResults<T, []>;
  userBurn(context: __compactRuntime.CircuitContext<T>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<T, []>;
  smgMint(context: __compactRuntime.CircuitContext<T>,
          uniqueId_0: Uint8Array,
          smgId_0: Uint8Array,
          tokenPairId_0: bigint,
          amount_0: bigint,
          fee_0: bigint,
          toAddr_0: ZswapCoinPublicKey,
          ttl_0: bigint): __compactRuntime.CircuitResults<T, []>;
  voteMultiCrossProposal(context: __compactRuntime.CircuitContext<T>,
                         uniqueIds_0: Uint8Array[]): __compactRuntime.CircuitResults<T, []>;
  voteCrossProposal(context: __compactRuntime.CircuitContext<T>,
                    uniqueId_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  executeCrossProposalOfNativeToken(context: __compactRuntime.CircuitContext<T>,
                                    uniqueId_0: Uint8Array,
                                    coinIndex_0: bigint): __compactRuntime.CircuitResults<T, []>;
  executeCrossProposalOfMappingToken(context: __compactRuntime.CircuitContext<T>,
                                     uniqueId_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  transferFeeOfNativeToken(context: __compactRuntime.CircuitContext<T>,
                           token_0: Uint8Array,
                           coinIndex_0: bigint): __compactRuntime.CircuitResults<T, []>;
  transferOwner(context: __compactRuntime.CircuitContext<T>,
                newOwner_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  acceptOwner(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  setFeeReceiver(context: __compactRuntime.CircuitContext<T>,
                 newFeeReceiver_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setTokenManager(context: __compactRuntime.CircuitContext<T>,
                  newTokenManager_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setMegerWorker(context: __compactRuntime.CircuitContext<T>,
                 newMergeWorker_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  test(context: __compactRuntime.CircuitContext<T>,
       coin0_0: QualifiedCoinInfo,
       coin1_0: QualifiedCoinInfo): __compactRuntime.CircuitResults<T, []>;
  mergeTreasuryCoin(context: __compactRuntime.CircuitContext<T>,
                    coins_0: bigint[]): __compactRuntime.CircuitResults<T, []>;
  addAdmin(context: __compactRuntime.CircuitContext<T>,
           admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  removeAdmin(context: __compactRuntime.CircuitContext<T>,
              admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setAdminThreshold(context: __compactRuntime.CircuitContext<T>,
                    threshold_0: bigint): __compactRuntime.CircuitResults<T, []>;
  setSmgPksks(context: __compactRuntime.CircuitContext<T>,
              voters_0: ZswapCoinPublicKey[]): __compactRuntime.CircuitResults<T, []>;
  updateSmgPk(context: __compactRuntime.CircuitContext<T>,
              newVoter_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setSmgPKThreold(context: __compactRuntime.CircuitContext<T>,
                  threshold_0: bigint): __compactRuntime.CircuitResults<T, []>;
  setFeeCommonConfig(context: __compactRuntime.CircuitContext<T>,
                     chainId_0: bigint,
                     fee_0: bigint): __compactRuntime.CircuitResults<T, []>;
  addTokenPair(context: __compactRuntime.CircuitContext<T>,
               tokenPairId_0: bigint,
               pairInfo_0: TokenPairInfo): __compactRuntime.CircuitResults<T, []>;
  removeTokenPair(context: __compactRuntime.CircuitContext<T>,
                  tokenPairId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  newProposal(context: __compactRuntime.CircuitContext<T>,
              newProposal_0: Proposal): __compactRuntime.CircuitResults<T, []>;
  voteProposal(context: __compactRuntime.CircuitContext<T>, proposalId_0: bigint): __compactRuntime.CircuitResults<T, []>;
  executeProposal(context: __compactRuntime.CircuitContext<T>,
                  proposalId_0: bigint): __compactRuntime.CircuitResults<T, []>;
}

type Ledger = {
  readonly crossCounter: bigint;
  readonly nonce: Uint8Array;
  smgTxSigners: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: ZswapCoinPublicKey): boolean;
    lookup(key_0: ZswapCoinPublicKey): bigint;
    [Symbol.iterator](): Iterator<[ZswapCoinPublicKey, bigint]>
  };
  readonly latestOutBoundCrosstxInfo: CrossOutBound;
  crossProposalHis: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  readonly currentExecuteCrossProposal: Uint8Array;
  treasuryCoins: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): QualifiedCoinInfo;
    [Symbol.iterator](): Iterator<[bigint, QualifiedCoinInfo]>
  };
  readonly treasuryCoinCounter: bigint;
  accFeeOfAllToken: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): AccFeeOfToken;
    [Symbol.iterator](): Iterator<[Uint8Array, AccFeeOfToken]>
  };
  tokenPairs: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): TokenPairInfo;
    [Symbol.iterator](): Iterator<[bigint, TokenPairInfo]>
  };
  readonly tokenManager: ZswapCoinPublicKey;
  feeCommonConfig: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): bigint;
    [Symbol.iterator](): Iterator<[bigint, bigint]>
  };
  readonly feeReceiver: ZswapCoinPublicKey;
  smgPubkeys: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): CurvePoint;
    [Symbol.iterator](): Iterator<[bigint, CurvePoint]>
  };
  smgPubkeysToIndex: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: CurvePoint): boolean;
    lookup(key_0: CurvePoint): bigint;
    [Symbol.iterator](): Iterator<[CurvePoint, bigint]>
  };
  readonly smgPKThreshold: bigint;
  admins: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: ZswapCoinPublicKey): boolean;
    lookup(key_0: ZswapCoinPublicKey): boolean;
    [Symbol.iterator](): Iterator<[ZswapCoinPublicKey, boolean]>
  };
  readonly adminThreshold: bigint;
  readonly proposalId: bigint;
  proposals: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): Proposal;
    [Symbol.iterator](): Iterator<[bigint, Proposal]>
  };
  readonly currentExcuteProposalId: bigint;
  proposalVoters: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): {
      isEmpty(): boolean;
      size(): bigint;
      member(elem_0: ZswapCoinPublicKey): boolean;
      [Symbol.iterator](): Iterator<ZswapCoinPublicKey>
    }
  };
  crossProposal: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): CrossProposal;
    [Symbol.iterator](): Iterator<[Uint8Array, CrossProposal]>
  };
  crossProposalVoters: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): {
      isEmpty(): boolean;
      size(): bigint;
      member(elem_0: bigint): boolean;
      [Symbol.iterator](): Iterator<bigint>
    }
  };
  readonly nativeTokenReceived: bigint;
  readonly owner: ZswapCoinPublicKey;
  readonly pendingOwner: ZswapCoinPublicKey;
  readonly mergeWorker: ZswapCoinPublicKey;
}

declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>,
               adminThresholdInit_0: bigint,
               smgPKThresholdInit_0: bigint): __compactRuntime.ConstructorResult<T>;
}

type CrossChainCircuits = ImpureCircuitId<Contract<CrossChainPrivateState>>;
declare const CrossChainPrivateStateId = "crossChainPrivateState";
type CrossChainProviders = MidnightProviders<CrossChainCircuits, typeof CrossChainPrivateStateId, CrossChainPrivateState>;
type CrossChainContract = Contract<CrossChainPrivateState>;
type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;
declare const currentDir: string;
declare const ZKConfig: {
    privateStateStoreName: string;
    zkConfigPath: string;
};
type CrossChainPrivateState = {};
declare const createCrossChainPrivateState: () => {};
declare const witnesses: {};
declare function pad(s: string, n: number): Uint8Array;
interface Config {
    readonly logDir: string;
    readonly indexer: string;
    readonly indexerWS: string;
    readonly node: string;
    readonly proofServer: string;
    readonly zkConfigPath: string;
}
declare const crosschainContractInstance: CrossChainContract;
declare const createWalletAndMidnightProvider: (wallet: Wallet) => Promise<WalletProvider & MidnightProvider>;
declare const buildWalletAndWaitForFunds: ({ indexer, indexerWS, node, proofServer }: Config, seed: string, filename: string) => Promise<Wallet & Resource>;
declare const waitForFunds: (wallet: Wallet) => Promise<Record<string, bigint>>;
declare const waitForSync: (wallet: Wallet) => Promise<_midnight_ntwrk_wallet_api.WalletState>;
declare const waitForSyncProgress: (wallet: Wallet) => Promise<_midnight_ntwrk_wallet_api.WalletState>;
declare class CrossChainApi {
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
    userLock(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "userLock">>;
    smgRelease(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint, fee: string | number | bigint, toAddr: string, ttl: number): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "smgRelease">>;
    smgMint(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint, fee: string | number | bigint, toAddr: string, ttl: number): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "smgMint">>;
    userBurn(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "userBurn">>;
    voteCrossProposal(uniqueId: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "voteCrossProposal">>;
    executeCrossProposal(uniqueId: string, coinIndex: string | number | bigint | undefined): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "executeCrossProposalOfMappingToken">>;
    getLedgerState(): Promise<Ledger | null>;
    transferOwner(newOwner: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "transferOwner">>;
    acceptOwner(): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "acceptOwner">>;
    updateSmgPk(newVoter: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "updateSmgPk">>;
    setFeeReceiver(feeReceiver: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "setFeeReceiver">>;
    setTokenManager(tokenManager: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "setTokenManager">>;
    setMegerWorker(mergeWorker: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "setMegerWorker">>;
    mergeTreasuryCoin(coins: bigint[] | number[] | string[]): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "mergeTreasuryCoin">>;
    addAdmin(admin: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "addAdmin">>;
    removeAdmin(admin: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "removeAdmin">>;
    setAdminThreshold(threshold: number | string | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "setAdminThreshold">>;
    setSmgPksks(voters: string[]): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "setSmgPksks">>;
    setSmgPKThreold(threshold: number | string | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "setSmgPKThreold">>;
    setFeeCommonConfig(chainId: number | string | bigint, fee: number | string | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "setFeeCommonConfig">>;
    addTokenPair(tokenPairId: number | string | bigint, fromChainId: number | string | bigint, toChainId: number | string | bigint, midnigthTokenAccount: string, fee: number | string | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "addTokenPair">>;
    removeTokenPair(tokenPairId: number | string | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "removeTokenPair">>;
    newProposal(proposal: Proposal): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "newProposal">>;
    addAdminProposal(addr: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "newProposal">>;
    removeAdminProposal(addr: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateFeeReceiverProposal(addr: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateTokenManagerProposal(addr: string): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateAdminThresholdProposal(threshold: number | string | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "newProposal">>;
    defaultProsal(): Proposal;
    updateSMGPKThresholdProposal(threshold: number | string | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateFeeCommonConfigProposal(chainId: number | string | bigint, fee: number | string | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "newProposal">>;
    voteProposal(proposalId: number | string | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "voteProposal">>;
    executeProposal(proposalId: number | string | bigint): Promise<_midnight_ntwrk_midnight_js_contracts.FinalizedCallTxData<CrossChainContract, "executeProposal">>;
    updateContractAuthority(newKey: SigningKey): Promise<FinalizedTxData>;
    upgradeContract(): Promise<void>;
}
declare const getTreasuryCoinsFromState: (state: Ledger) => Map<string, Map<bigint, QualifiedCoinInfo>>;
declare const genSigningKey: () => string;
declare const genRandomBigint: () => bigint;
declare const signData: (hash: bigint, privateKey: bigint) => {
    R: __compactRuntime.CurvePoint;
    s: bigint;
    P: __compactRuntime.CurvePoint;
};
declare const verifySignature: (hash: bigint, R: CurvePoint, s: bigint, P: CurvePoint) => boolean;
declare const configureProviders: (wallet: Wallet & Resource, config: Config) => Promise<{
    privateStateProvider: _midnight_ntwrk_midnight_js_types.PrivateStateProvider<"crossChainPrivateState", any>;
    publicDataProvider: _midnight_ntwrk_midnight_js_types.PublicDataProvider;
    zkConfigProvider: NodeZkConfigProvider<CrossChainCircuits>;
    proofProvider: _midnight_ntwrk_midnight_js_types.ProofProvider<string>;
    walletProvider: WalletProvider & MidnightProvider;
    midnightProvider: WalletProvider & MidnightProvider;
}>;

export { CrossChainApi, CrossChainPrivateStateId, ZKConfig, buildWalletAndWaitForFunds, configureProviders, createCrossChainPrivateState, createWalletAndMidnightProvider, crosschainContractInstance, currentDir, genRandomBigint, genSigningKey, getTreasuryCoinsFromState, pad, signData, verifySignature, waitForFunds, waitForSync, waitForSyncProgress, witnesses };
export type { Config, CrossChainCircuits, CrossChainContract, CrossChainPrivateState, CrossChainProviders, DeployedCrossChainContract };
