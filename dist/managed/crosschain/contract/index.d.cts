import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type ClaimCoinInfo = { receiver: ZswapCoinPublicKey;
                              coin: QualifiedCoinInfo
                            };

export type ClaimMappingTokenInfo = { receiver: ZswapCoinPublicKey;
                                      domainSep: Uint8Array;
                                      amount: bigint
                                    };

export enum ProposalType { AddAdmin = 0,
                           RemoveAdmin = 1,
                           UpdateFeeReceiver = 2,
                           UpdateTokenManager = 3,
                           UpdateAdminThreshold = 4,
                           UpdateSMGPKThreshold = 5,
                           UpdateFeeCommonConfig = 6,
                           SetSmgPKS = 7
}

export type ReserveOfToken = { total: bigint; isMappingToken: boolean };

export type FeeConfig = { chainId: bigint; fee: bigint };

export type Proposal = { type: ProposalType;
                         addr: ZswapCoinPublicKey;
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
                              amount: bigint;
                              fee: bigint;
                              nonce: bigint
                            };

export type CrossProposal = { smgId: Uint8Array;
                              token: Uint8Array;
                              tokenPairId: bigint;
                              isMappingToken: boolean;
                              amount: bigint;
                              fee: bigint;
                              toAddr: ZswapCoinPublicKey;
                              ttl: bigint
                            };

export type ExecuteCrossProposalInfo = { uniqueId: Uint8Array; coinIndex: bigint
                                       };

export type CoinInfo = { nonce: Uint8Array; color: Uint8Array; value: bigint };

export type QualifiedCoinInfo = { nonce: Uint8Array;
                                  color: Uint8Array;
                                  value: bigint;
                                  mt_index: bigint
                                };

export type CurvePoint = { x: bigint; y: bigint };

export type ZswapCoinPublicKey = { bytes: Uint8Array };

export type Witnesses<T> = {
}

export type ImpureCircuits<T> = {
  smgMint(context: __compactRuntime.CircuitContext<T>,
          uniqueId_0: Uint8Array,
          smgId_0: Uint8Array,
          tokenPairId_0: bigint,
          amount_0: bigint,
          fee_0: bigint,
          toAddr_0: ZswapCoinPublicKey,
          ttl_0: bigint): __compactRuntime.CircuitResults<T, []>;
  userBurn(context: __compactRuntime.CircuitContext<T>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  voteMultiCrossProposal(context: __compactRuntime.CircuitContext<T>,
                         uniqueIds_0: Uint8Array[]): __compactRuntime.CircuitResults<T, []>;
  voteCrossProposal(context: __compactRuntime.CircuitContext<T>,
                    uniqueId_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  executeMultiCrossProposal(context: __compactRuntime.CircuitContext<T>,
                            mutiEx_0: ExecuteCrossProposalInfo[]): __compactRuntime.CircuitResults<T, []>;
  userRechargeForFee(context: __compactRuntime.CircuitContext<T>,
                     coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  userClaimCoin(context: __compactRuntime.CircuitContext<T>, id_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  userClaimMappingToken(context: __compactRuntime.CircuitContext<T>,
                        id_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  addReserve(context: __compactRuntime.CircuitContext<T>, coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  approveUserWithdrawFee(context: __compactRuntime.CircuitContext<T>,
                         user_0: ZswapCoinPublicKey,
                         coinApprove_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  withdrawReserveOfNativeToken(context: __compactRuntime.CircuitContext<T>,
                               token_0: Uint8Array,
                               coinIndex_0: bigint): __compactRuntime.CircuitResults<T, []>;
  withdrawReserveOfMappingToken(context: __compactRuntime.CircuitContext<T>,
                                domainSep_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  transferOwner(context: __compactRuntime.CircuitContext<T>,
                newOwner_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  acceptOwner(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  setFeeReceiver(context: __compactRuntime.CircuitContext<T>,
                 newFeeReceiver_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setTokenManager(context: __compactRuntime.CircuitContext<T>,
                  newTokenManager_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setMegerWorker(context: __compactRuntime.CircuitContext<T>,
                 newMergeWorker_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
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

export type PureCircuits = {
  userLock(smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           coin_0: CoinInfo): [];
  smgRelease(uniqueId_0: Uint8Array,
             smgId_0: Uint8Array,
             tokenPairId_0: bigint,
             amount_0: bigint,
             toAddr_0: ZswapCoinPublicKey,
             fee_0: bigint,
             ttl_0: bigint): [];
  mergeTreasuryCoin(coins_0: bigint[]): [];
}

export type Circuits<T> = {
  userLock(context: __compactRuntime.CircuitContext<T>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  smgRelease(context: __compactRuntime.CircuitContext<T>,
             uniqueId_0: Uint8Array,
             smgId_0: Uint8Array,
             tokenPairId_0: bigint,
             amount_0: bigint,
             toAddr_0: ZswapCoinPublicKey,
             fee_0: bigint,
             ttl_0: bigint): __compactRuntime.CircuitResults<T, []>;
  smgMint(context: __compactRuntime.CircuitContext<T>,
          uniqueId_0: Uint8Array,
          smgId_0: Uint8Array,
          tokenPairId_0: bigint,
          amount_0: bigint,
          fee_0: bigint,
          toAddr_0: ZswapCoinPublicKey,
          ttl_0: bigint): __compactRuntime.CircuitResults<T, []>;
  userBurn(context: __compactRuntime.CircuitContext<T>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  voteMultiCrossProposal(context: __compactRuntime.CircuitContext<T>,
                         uniqueIds_0: Uint8Array[]): __compactRuntime.CircuitResults<T, []>;
  voteCrossProposal(context: __compactRuntime.CircuitContext<T>,
                    uniqueId_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  executeMultiCrossProposal(context: __compactRuntime.CircuitContext<T>,
                            mutiEx_0: ExecuteCrossProposalInfo[]): __compactRuntime.CircuitResults<T, []>;
  userRechargeForFee(context: __compactRuntime.CircuitContext<T>,
                     coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  userClaimCoin(context: __compactRuntime.CircuitContext<T>, id_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  userClaimMappingToken(context: __compactRuntime.CircuitContext<T>,
                        id_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  addReserve(context: __compactRuntime.CircuitContext<T>, coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  approveUserWithdrawFee(context: __compactRuntime.CircuitContext<T>,
                         user_0: ZswapCoinPublicKey,
                         coinApprove_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  withdrawReserveOfNativeToken(context: __compactRuntime.CircuitContext<T>,
                               token_0: Uint8Array,
                               coinIndex_0: bigint): __compactRuntime.CircuitResults<T, []>;
  withdrawReserveOfMappingToken(context: __compactRuntime.CircuitContext<T>,
                                domainSep_0: Uint8Array): __compactRuntime.CircuitResults<T, []>;
  transferOwner(context: __compactRuntime.CircuitContext<T>,
                newOwner_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  acceptOwner(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  setFeeReceiver(context: __compactRuntime.CircuitContext<T>,
                 newFeeReceiver_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setTokenManager(context: __compactRuntime.CircuitContext<T>,
                  newTokenManager_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setMegerWorker(context: __compactRuntime.CircuitContext<T>,
                 newMergeWorker_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
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

export type Ledger = {
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
  currentExecuteCrossProposal: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: Uint8Array): boolean;
    [Symbol.iterator](): Iterator<Uint8Array>
  };
  treasuryCoins: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): QualifiedCoinInfo;
    [Symbol.iterator](): Iterator<[bigint, QualifiedCoinInfo]>
  };
  readonly treasuryCoinCounter: bigint;
  reserveOfAllToken: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): ReserveOfToken;
    [Symbol.iterator](): Iterator<[Uint8Array, ReserveOfToken]>
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
  crossProposalHis: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  userFeeBalance: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: ZswapCoinPublicKey): boolean;
    lookup(key_0: ZswapCoinPublicKey): bigint;
    [Symbol.iterator](): Iterator<[ZswapCoinPublicKey, bigint]>
  };
  coinToBeClaimed: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): ClaimCoinInfo;
    [Symbol.iterator](): Iterator<[Uint8Array, ClaimCoinInfo]>
  };
  mappingTokenToBeClaim: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): ClaimMappingTokenInfo;
    [Symbol.iterator](): Iterator<[Uint8Array, ClaimMappingTokenInfo]>
  };
  readonly maxRemainedHisOfTtl: bigint;
  readonly owner: ZswapCoinPublicKey;
  readonly pendingOwner: ZswapCoinPublicKey;
  readonly mergeWorker: ZswapCoinPublicKey;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>,
               adminThresholdInit_0: bigint,
               smgPKThresholdInit_0: bigint): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
