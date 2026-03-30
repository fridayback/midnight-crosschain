import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type ReserveOfToken = { total: bigint; isMappingToken: boolean };

export enum ProposalType { AddAdmin = 0,
                           RemoveAdmin = 1,
                           UpdateFeeReceiver = 2,
                           UpdateTokenManager = 3,
                           UpdateAdminThreshold = 4,
                           UpdateSMGPKThreshold = 5,
                           UpdateFeeCommonConfig = 6,
                           SetSmgPKS = 7
}

export type FeeConfig = { chainId: bigint; fee: bigint };

export type Proposal = { pType: ProposalType;
                         addr: ZswapCoinPublicKey;
                         addrUnshielded: UserAddress;
                         threshold: bigint;
                         feeConfig: FeeConfig;
                         smgPubkeys: ZswapCoinPublicKey[]
                       };

export type TokenPairInfo = { fromChainId: bigint;
                              toChainId: bigint;
                              midnigthTokenAccount: Uint8Array;
                              domainSep: Uint8Array;
                              fee: bigint
                            };

export type CrossOutBound = { smgId: Uint8Array;
                              fromAddr: ZswapCoinPublicKey;
                              toAddr: string;
                              tokenPairId: bigint;
                              tokenAccount: Uint8Array;
                              amount: bigint;
                              fee: bigint
                            };

export type CrossProposal = { smgId: Uint8Array;
                              token: Uint8Array;
                              tokenPairId: bigint;
                              isMappingToken: boolean;
                              amount: bigint;
                              fee: bigint;
                              toAddr: UserAddress;
                              ttl: bigint
                            };

export type SmgEvent = { uniqueId: Uint8Array; crossProposal: CrossProposal };

export type VoteForCrossPropasal = { uniqueId: Uint8Array; ttl: bigint };

export type ShieldedCoinInfo = { nonce: Uint8Array;
                                 color: Uint8Array;
                                 value: bigint
                               };

export type QualifiedShieldedCoinInfo = { nonce: Uint8Array;
                                          color: Uint8Array;
                                          value: bigint;
                                          mt_index: bigint
                                        };

export type ZswapCoinPublicKey = { bytes: Uint8Array };

export type UserAddress = { bytes: Uint8Array };

export type Witnesses<PS> = {
}

export type ImpureCircuits<PS> = {
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

export type ProvableCircuits<PS> = {
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

export type PureCircuits = {
}

export type Circuits<PS> = {
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

export type Ledger = {
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

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
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

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
