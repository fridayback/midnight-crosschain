import * as _midnight_ntwrk_midnight_js_types from '@midnight-ntwrk/midnight-js-types';
import { MidnightProviders, PublicDataProvider } from '@midnight-ntwrk/midnight-js-types';
import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
import { SigningKey, ContractAddress, RawTokenType } from '@midnight-ntwrk/compact-runtime';
import { CompiledContract, ProvableCircuitId } from '@midnight-ntwrk/compact-js';
import { DeployedContract, FoundContract, FinalizedCallTxData } from '@midnight-ntwrk/midnight-js-contracts';
import { UserAddress as UserAddress$1 } from '@midnight-ntwrk/ledger-v8';
import * as ledgerV8 from '@midnight-ntwrk/ledger-v8';
export { ledgerV8 };
import * as midnightJsUtils from '@midnight-ntwrk/midnight-js-utils';
export { midnightJsUtils as midnightjsutils };

type CrossChainPrivateState = {};
declare const createPrivateState: (privateCounter: number) => CrossChainPrivateState;
declare const createInitialPrivateState: (privateCounter: number) => CrossChainPrivateState;
declare const witnesses: {};

type ReserveOfToken = { total: bigint; isMappingToken: boolean };

declare enum ProposalType { AddAdmin = 0,
                           RemoveAdmin = 1,
                           UpdateFeeReceiver = 2,
                           UpdateTokenManager = 3,
                           UpdateAdminThreshold = 4,
                           UpdateSMGPKThreshold = 5,
                           UpdateFeeCommonConfig = 6,
                           SetSmgPKS = 7
}

type FeeConfig = { chainId: bigint; fee: bigint };

type Proposal = { pType: ProposalType;
                         addr: ZswapCoinPublicKey;
                         addrUnshielded: UserAddress;
                         threshold: bigint;
                         feeConfig: FeeConfig;
                         smgPubkeys: ZswapCoinPublicKey[]
                       };

type TokenPairInfo = { fromChainId: bigint;
                              toChainId: bigint;
                              midnigthTokenAccount: Uint8Array;
                              domainSep: Uint8Array;
                              fee: bigint
                            };

type CrossOutBound = { smgId: Uint8Array;
                              fromAddr: ZswapCoinPublicKey;
                              toAddr: string;
                              tokenPairId: bigint;
                              tokenAccount: Uint8Array;
                              amount: bigint;
                              fee: bigint
                            };

type CrossProposal = { smgId: Uint8Array;
                              token: Uint8Array;
                              tokenPairId: bigint;
                              isMappingToken: boolean;
                              amount: bigint;
                              fee: bigint;
                              toAddr: UserAddress;
                              ttl: bigint
                            };

type SmgEvent = { uniqueId: Uint8Array; crossProposal: CrossProposal };

type VoteForCrossPropasal = { uniqueId: Uint8Array; ttl: bigint };

type ZswapCoinPublicKey = { bytes: Uint8Array };

type UserAddress = { bytes: Uint8Array };

type Witnesses<PS> = {
}

type ImpureCircuits<PS> = {
  userLock(context: __compactRuntime.CircuitContext<PS>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  smgRelease(context: __compactRuntime.CircuitContext<PS>,
             uniqueId_0: Uint8Array,
             smgId_0: Uint8Array,
             tokenPairId_0: bigint,
             amount_0: bigint,
             toAddr_0: UserAddress,
             fee_0: bigint,
             ttl_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  smgMint(context: __compactRuntime.CircuitContext<PS>,
          uniqueId_0: Uint8Array,
          smgId_0: Uint8Array,
          tokenPairId_0: bigint,
          amount_0: bigint,
          fee_0: bigint,
          toAddr_0: UserAddress,
          ttl_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  userBurn(context: __compactRuntime.CircuitContext<PS>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  voteMultiCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                         uniqueIds_0: VoteForCrossPropasal[]): __compactRuntime.CircuitResults<PS, []>;
  executeCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                       uniqueId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  transferOwner(context: __compactRuntime.CircuitContext<PS>,
                newOwner_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  acceptOwner(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  setFeeReceiver(context: __compactRuntime.CircuitContext<PS>,
                 newFeeReceiver_0: UserAddress): __compactRuntime.CircuitResults<PS, []>;
  setTokenManager(context: __compactRuntime.CircuitContext<PS>,
                  newTokenManager_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  addAdmin(context: __compactRuntime.CircuitContext<PS>,
           admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  removeAdmin(context: __compactRuntime.CircuitContext<PS>,
              admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  setAdminThreshold(context: __compactRuntime.CircuitContext<PS>,
                    threshold_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  setSmgPksks(context: __compactRuntime.CircuitContext<PS>,
              voters_0: ZswapCoinPublicKey[]): __compactRuntime.CircuitResults<PS, []>;
  updateSmgPk(context: __compactRuntime.CircuitContext<PS>,
              newVoter_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  setSmgPKThreold(context: __compactRuntime.CircuitContext<PS>,
                  threshold_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  setFeeCommonConfig(context: __compactRuntime.CircuitContext<PS>,
                     chainId_0: bigint,
                     fee_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  addTokenPair(context: __compactRuntime.CircuitContext<PS>,
               tokenPairId_0: bigint,
               pairInfo_0: TokenPairInfo): __compactRuntime.CircuitResults<PS, []>;
  removeTokenPair(context: __compactRuntime.CircuitContext<PS>,
                  tokenPairId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  newProposal(context: __compactRuntime.CircuitContext<PS>,
              newProposal_0: Proposal): __compactRuntime.CircuitResults<PS, []>;
  voteProposal(context: __compactRuntime.CircuitContext<PS>,
               proposalId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeProposal(context: __compactRuntime.CircuitContext<PS>,
                  proposalId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  removeExpiredHisTxs(context: __compactRuntime.CircuitContext<PS>,
                      txs_0: Uint8Array[]): __compactRuntime.CircuitResults<PS, []>;
}

type ProvableCircuits<PS> = {
  userLock(context: __compactRuntime.CircuitContext<PS>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  smgRelease(context: __compactRuntime.CircuitContext<PS>,
             uniqueId_0: Uint8Array,
             smgId_0: Uint8Array,
             tokenPairId_0: bigint,
             amount_0: bigint,
             toAddr_0: UserAddress,
             fee_0: bigint,
             ttl_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  smgMint(context: __compactRuntime.CircuitContext<PS>,
          uniqueId_0: Uint8Array,
          smgId_0: Uint8Array,
          tokenPairId_0: bigint,
          amount_0: bigint,
          fee_0: bigint,
          toAddr_0: UserAddress,
          ttl_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  userBurn(context: __compactRuntime.CircuitContext<PS>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  voteMultiCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                         uniqueIds_0: VoteForCrossPropasal[]): __compactRuntime.CircuitResults<PS, []>;
  executeCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                       uniqueId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  transferOwner(context: __compactRuntime.CircuitContext<PS>,
                newOwner_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  acceptOwner(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  setFeeReceiver(context: __compactRuntime.CircuitContext<PS>,
                 newFeeReceiver_0: UserAddress): __compactRuntime.CircuitResults<PS, []>;
  setTokenManager(context: __compactRuntime.CircuitContext<PS>,
                  newTokenManager_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  addAdmin(context: __compactRuntime.CircuitContext<PS>,
           admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  removeAdmin(context: __compactRuntime.CircuitContext<PS>,
              admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  setAdminThreshold(context: __compactRuntime.CircuitContext<PS>,
                    threshold_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  setSmgPksks(context: __compactRuntime.CircuitContext<PS>,
              voters_0: ZswapCoinPublicKey[]): __compactRuntime.CircuitResults<PS, []>;
  updateSmgPk(context: __compactRuntime.CircuitContext<PS>,
              newVoter_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  setSmgPKThreold(context: __compactRuntime.CircuitContext<PS>,
                  threshold_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  setFeeCommonConfig(context: __compactRuntime.CircuitContext<PS>,
                     chainId_0: bigint,
                     fee_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  addTokenPair(context: __compactRuntime.CircuitContext<PS>,
               tokenPairId_0: bigint,
               pairInfo_0: TokenPairInfo): __compactRuntime.CircuitResults<PS, []>;
  removeTokenPair(context: __compactRuntime.CircuitContext<PS>,
                  tokenPairId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  newProposal(context: __compactRuntime.CircuitContext<PS>,
              newProposal_0: Proposal): __compactRuntime.CircuitResults<PS, []>;
  voteProposal(context: __compactRuntime.CircuitContext<PS>,
               proposalId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeProposal(context: __compactRuntime.CircuitContext<PS>,
                  proposalId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  removeExpiredHisTxs(context: __compactRuntime.CircuitContext<PS>,
                      txs_0: Uint8Array[]): __compactRuntime.CircuitResults<PS, []>;
}

type Circuits<PS> = {
  userLock(context: __compactRuntime.CircuitContext<PS>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  smgRelease(context: __compactRuntime.CircuitContext<PS>,
             uniqueId_0: Uint8Array,
             smgId_0: Uint8Array,
             tokenPairId_0: bigint,
             amount_0: bigint,
             toAddr_0: UserAddress,
             fee_0: bigint,
             ttl_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  smgMint(context: __compactRuntime.CircuitContext<PS>,
          uniqueId_0: Uint8Array,
          smgId_0: Uint8Array,
          tokenPairId_0: bigint,
          amount_0: bigint,
          fee_0: bigint,
          toAddr_0: UserAddress,
          ttl_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  userBurn(context: __compactRuntime.CircuitContext<PS>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  voteMultiCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                         uniqueIds_0: VoteForCrossPropasal[]): __compactRuntime.CircuitResults<PS, []>;
  executeCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                       uniqueId_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  transferOwner(context: __compactRuntime.CircuitContext<PS>,
                newOwner_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  acceptOwner(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  setFeeReceiver(context: __compactRuntime.CircuitContext<PS>,
                 newFeeReceiver_0: UserAddress): __compactRuntime.CircuitResults<PS, []>;
  setTokenManager(context: __compactRuntime.CircuitContext<PS>,
                  newTokenManager_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  addAdmin(context: __compactRuntime.CircuitContext<PS>,
           admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  removeAdmin(context: __compactRuntime.CircuitContext<PS>,
              admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  setAdminThreshold(context: __compactRuntime.CircuitContext<PS>,
                    threshold_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  setSmgPksks(context: __compactRuntime.CircuitContext<PS>,
              voters_0: ZswapCoinPublicKey[]): __compactRuntime.CircuitResults<PS, []>;
  updateSmgPk(context: __compactRuntime.CircuitContext<PS>,
              newVoter_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  setSmgPKThreold(context: __compactRuntime.CircuitContext<PS>,
                  threshold_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  setFeeCommonConfig(context: __compactRuntime.CircuitContext<PS>,
                     chainId_0: bigint,
                     fee_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  addTokenPair(context: __compactRuntime.CircuitContext<PS>,
               tokenPairId_0: bigint,
               pairInfo_0: TokenPairInfo): __compactRuntime.CircuitResults<PS, []>;
  removeTokenPair(context: __compactRuntime.CircuitContext<PS>,
                  tokenPairId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  newProposal(context: __compactRuntime.CircuitContext<PS>,
              newProposal_0: Proposal): __compactRuntime.CircuitResults<PS, []>;
  voteProposal(context: __compactRuntime.CircuitContext<PS>,
               proposalId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  executeProposal(context: __compactRuntime.CircuitContext<PS>,
                  proposalId_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  removeExpiredHisTxs(context: __compactRuntime.CircuitContext<PS>,
                      txs_0: Uint8Array[]): __compactRuntime.CircuitResults<PS, []>;
}

type Ledger = {
  smgTxSigners: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: ZswapCoinPublicKey): boolean;
    lookup(key_0: ZswapCoinPublicKey): bigint;
    [Symbol.iterator](): Iterator<[ZswapCoinPublicKey, bigint]>
  };
  readonly latestOutBoundCrosstxInfo: CrossOutBound;
  readonly currentExecuteCrossProposal: SmgEvent;
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
  readonly feeReceiver: UserAddress;
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
  crossProposalHis: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  reserveOfAllToken: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): ReserveOfToken;
    [Symbol.iterator](): Iterator<[Uint8Array, ReserveOfToken]>
  };
  mappingTokenTotalSupply: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  readonly round: bigint;
  readonly owner: ZswapCoinPublicKey;
  readonly pendingOwner: ZswapCoinPublicKey;
  readonly worker: ZswapCoinPublicKey;
}

declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               adminThresholdInit_0: bigint,
               smgPKThresholdInit_0: bigint,
               feeReceiverInit_0: UserAddress): __compactRuntime.ConstructorResult<PS>;
}

type CrossChainCircuits = ProvableCircuitId<Contract<CrossChainPrivateState>>;
declare const CrossChainPrivateStateId = "crossChainPrivateState";
type CrossChainProviders = MidnightProviders<CrossChainCircuits, typeof CrossChainPrivateStateId, CrossChainPrivateState>;
type CrossChainContract = Contract<CrossChainPrivateState>;
type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;
declare const ZKConfig: {
    privateStateStoreName: string;
    zkConfigPath: string;
};
declare function pad(s: string, n: number): Uint8Array;
interface Config {
    readonly indexer: string;
    readonly indexerWS: string;
    readonly node: string;
    readonly proofServer: string;
    readonly zkConfigPath: string;
}
declare const crosschainContractInstance: CrossChainContract;
declare const CompiledSimpleContract: CompiledContract.CompiledContract<Contract<any, any>, any, never>;
declare class CrossChainApi {
    providers: CrossChainProviders;
    crossChainContract: DeployedCrossChainContract;
    MaxSmgSignators: number;
    MaxMergeCoins: number;
    constructor();
    init(providers: CrossChainProviders): Promise<void>;
    deployContract(adminThreshold: number | string | bigint, smgPkThreshold: number | string | bigint, feeReceiver: string, signingKey: SigningKey): Promise<ContractAddress>;
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
    getTokenPairInfo(tokenPairId: bigint | string | number): Promise<TokenPairInfo | undefined>;
    getTokensTotalSupply(tokens: string[]): Promise<{
        token: string;
        totalSupply: string;
    }[]>;
    static getCrossTxInfo(ledger: Ledger, uniqueId: string): {
        smgId: string;
        token: string;
        tokenPairId: string;
        amount: string;
        fee: string;
        toAddr: UserAddress;
        ttl: string;
    } | undefined;
    static parseContractState(stateHex: string): Ledger | undefined;
    static currentExecuteCrossProposal(ledger: Ledger): {
        smgId: string;
        uniqueId: string;
        token: string;
        tokenPairId: string;
        isMappingToken: boolean;
        amount: string;
        fee: string;
        toAddr: string;
        ttl: string;
    };
    static latestOutBoundCrosstxInfo(ledger: Ledger): {
        smgId: string;
        fromAddr: string;
        toAddr: string;
        tokenPairId: string;
        tokenAccount: Uint8Array<ArrayBufferLike>;
        amount: string;
        fee: string;
    } | undefined;
    isVoter(ledger: Ledger, voter: string | undefined): Promise<boolean>;
    getUnVotedCrossProposal(ledger: Ledger, voter: string | undefined): Promise<{
        smgId?: string | undefined;
        token?: string | undefined;
        tokenPairId?: string | undefined;
        amount?: string | undefined;
        fee?: string | undefined;
        toAddr?: UserAddress | undefined;
        ttl?: string | undefined;
        uniqueId: string;
    }[]>;
    getUnExecuteCrossProposal(ledger: Ledger): Promise<{
        uniqueId: string;
        smgId: string;
        tokenPairId: string;
        token: string;
        amount: string;
        fee: string;
        toAddr: string;
        ttl: string;
    }[]>;
    userLock(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "userLock">>;
    smgRelease(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint, fee: string | number | bigint, toAddr: string, ttl: number): Promise<FinalizedCallTxData<CrossChainContract, "smgRelease">>;
    smgMint(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint, fee: string | number | bigint, toAddr: string, ttl: number): Promise<FinalizedCallTxData<CrossChainContract, "smgMint">>;
    userBurn(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "userBurn">>;
    voteCrossProposal(uniqueId: string, ttl: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "voteMultiCrossProposal">>;
    voteMultiCrossProposal(uniqueIds: {
        uniqueId: string;
        ttl: string | number | bigint;
    }[]): Promise<FinalizedCallTxData<CrossChainContract, "voteMultiCrossProposal">>;
    executeCrossProposal(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "executeCrossProposal">>;
    getLedgerState(): Promise<Ledger | null>;
    transferOwner(newOwner: string): Promise<FinalizedCallTxData<CrossChainContract, "transferOwner">>;
    acceptOwner(): Promise<FinalizedCallTxData<CrossChainContract, "acceptOwner">>;
    updateSmgPk(newVoter: string): Promise<FinalizedCallTxData<CrossChainContract, "updateSmgPk">>;
    setFeeReceiver(feeReceiver: UserAddress$1): Promise<FinalizedCallTxData<CrossChainContract, "setFeeReceiver">>;
    setTokenManager(tokenManager: string): Promise<FinalizedCallTxData<CrossChainContract, "setTokenManager">>;
    addAdmin(admin: string): Promise<FinalizedCallTxData<CrossChainContract, "addAdmin">>;
    removeAdmin(admin: string): Promise<FinalizedCallTxData<CrossChainContract, "removeAdmin">>;
    setAdminThreshold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setAdminThreshold">>;
    setSmgPksks(voters: string[]): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPksks">>;
    setSmgPKThreold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPKThreold">>;
    setFeeCommonConfig(chainId: number | string | bigint, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setFeeCommonConfig">>;
    addTokenPair(tokenPairId: number | string | bigint, fromChainId: number | string | bigint, toChainId: number | string | bigint, midnigthTokenAccount: RawTokenType, domainSep: string, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addTokenPair">>;
    removeTokenPair(tokenPairId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "removeTokenPair">>;
    newProposal(proposal: Proposal): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    addAdminProposal(addr: string): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    removeAdminProposal(addr: string): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateFeeReceiver(addr: string): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateTokenManagerProposal(addr: string): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateAdminThresholdProposal(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    defaultProsal(): Proposal;
    updateSMGPKThresholdProposal(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateFeeCommonConfigProposal(chainId: number | string | bigint, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    voteProposal(proposalId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "voteProposal">>;
    executeProposal(proposalId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "executeProposal">>;
    removeExpiredHisTxs(txs: string[]): Promise<FinalizedCallTxData<CrossChainContract, "removeExpiredHisTxs">>;
    updateContractAuthority(newKey: SigningKey): Promise<void>;
    upgradeContract(circuitId: CrossChainCircuits, newCircuitHex: string | undefined): Promise<void>;
}
declare const upgradeContractCircuit: (providers: MidnightProviders, contractAddress: string, circuitId: string, newVkHex: string | undefined) => Promise<_midnight_ntwrk_midnight_js_types.FinalizedTxData>;
declare const removeContractCircuit: (providers: MidnightProviders, contractAddress: string, circuitId: string) => Promise<_midnight_ntwrk_midnight_js_types.FinalizedTxData>;
declare const genSigningKey: () => string;
declare const getCoinPublicKeyFromShieldAddress: (shieldAddr: string) => Buffer<ArrayBufferLike>;
declare const getUserAddressFromUnshieldAddress: (unshieldAddr: string) => Buffer<ArrayBufferLike>;
declare const getUnshieldAddressFromUserAddress: (userAddrHex: string, networkId?: string) => string;

declare const initNetwork: (network: "mainnet" | "testnet-02" | "preview" | "devnet" | "undeployed") => void;
declare class CrossChainState {
    publicDataProvider: PublicDataProvider;
    contractAddress: string;
    MaxSmgSignators: number;
    MaxMergeCoins: number;
    constructor(indexer: string, indexerWS: string, contractAddress: string);
    getLedgerState(): Promise<Ledger | null>;
}
declare const getContractState: (config: Config, contractAddress: string) => Promise<Ledger | null>;

export { CompiledSimpleContract, type Config, CrossChainApi, type CrossChainCircuits, type CrossChainContract, type CrossChainPrivateState, CrossChainPrivateStateId, type CrossChainProviders, CrossChainState, type DeployedCrossChainContract, ZKConfig, createInitialPrivateState, createPrivateState, crosschainContractInstance, genSigningKey, getCoinPublicKeyFromShieldAddress, getContractState, getUnshieldAddressFromUserAddress, getUserAddressFromUnshieldAddress, initNetwork, pad, removeContractCircuit, upgradeContractCircuit, witnesses };
