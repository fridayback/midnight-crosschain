import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

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

export type Proposal = { type: ProposalType;
                         addr: ZswapCoinPublicKey;
                         threshold: bigint;
                         feeConfig: FeeConfig;
                         smgPubkeys: CurvePoint[]
                       };

export type TokenPairInfo = { fromChainId: bigint;
                              toChainId: bigint;
                              midnigthTokenAccount: Uint8Array;
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

export type ProofData = { smgId: Uint8Array;
                          uniqueId: Uint8Array;
                          tokenPairId: bigint;
                          amount: bigint;
                          fee: bigint;
                          toAddr: ZswapCoinPublicKey;
                          coins: { is_some: boolean, value: bigint[] };
                          signers: bigint[];
                          ttl: bigint
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
             fee_0: bigint,
             toAddr_0: ZswapCoinPublicKey,
             coins_0: bigint[],
             signers_0: bigint[],
             ttl_0: bigint,
             R_0: CurvePoint,
             s_0: bigint): __compactRuntime.CircuitResults<T, []>;
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
          signers_0: bigint[],
          ttl_0: bigint,
          R_0: CurvePoint,
          s_0: bigint): __compactRuntime.CircuitResults<T, []>;
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
                    token_0: Uint8Array,
                    coins_0: bigint[]): __compactRuntime.CircuitResults<T, []>;
  addAdmin(context: __compactRuntime.CircuitContext<T>,
           admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  removeAdmin(context: __compactRuntime.CircuitContext<T>,
              admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setAdminThreshold(context: __compactRuntime.CircuitContext<T>,
                    threshold_0: bigint): __compactRuntime.CircuitResults<T, []>;
  setSmgPksks(context: __compactRuntime.CircuitContext<T>, pks_0: CurvePoint[]): __compactRuntime.CircuitResults<T, []>;
  updateSmgPk(context: __compactRuntime.CircuitContext<T>,
              id_0: bigint,
              newPk_0: CurvePoint,
              R_0: CurvePoint,
              signature_0: bigint): __compactRuntime.CircuitResults<T, []>;
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
  verifySignature(hash_0: Uint8Array,
                  P_0: CurvePoint,
                  R_0: CurvePoint,
                  s_0: bigint): boolean;
  hashProof(proof_0: ProofData): Uint8Array;
}

export type Circuits<T> = {
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
             fee_0: bigint,
             toAddr_0: ZswapCoinPublicKey,
             coins_0: bigint[],
             signers_0: bigint[],
             ttl_0: bigint,
             R_0: CurvePoint,
             s_0: bigint): __compactRuntime.CircuitResults<T, []>;
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
          signers_0: bigint[],
          ttl_0: bigint,
          R_0: CurvePoint,
          s_0: bigint): __compactRuntime.CircuitResults<T, []>;
  verifySignature(context: __compactRuntime.CircuitContext<T>,
                  hash_0: Uint8Array,
                  P_0: CurvePoint,
                  R_0: CurvePoint,
                  s_0: bigint): __compactRuntime.CircuitResults<T, boolean>;
  hashProof(context: __compactRuntime.CircuitContext<T>, proof_0: ProofData): __compactRuntime.CircuitResults<T, Uint8Array>;
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
                    token_0: Uint8Array,
                    coins_0: bigint[]): __compactRuntime.CircuitResults<T, []>;
  addAdmin(context: __compactRuntime.CircuitContext<T>,
           admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  removeAdmin(context: __compactRuntime.CircuitContext<T>,
              admin_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<T, []>;
  setAdminThreshold(context: __compactRuntime.CircuitContext<T>,
                    threshold_0: bigint): __compactRuntime.CircuitResults<T, []>;
  setSmgPksks(context: __compactRuntime.CircuitContext<T>, pks_0: CurvePoint[]): __compactRuntime.CircuitResults<T, []>;
  updateSmgPk(context: __compactRuntime.CircuitContext<T>,
              id_0: bigint,
              newPk_0: CurvePoint,
              R_0: CurvePoint,
              signature_0: bigint): __compactRuntime.CircuitResults<T, []>;
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
  readonly outBoundCounter: bigint;
  readonly inBoundCounter: bigint;
  readonly nonce: Uint8Array;
  smgTxSigners: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: CurvePoint): boolean;
    [Symbol.iterator](): Iterator<CurvePoint>
  };
  readonly latestOutBoundCrosstxInfo: CrossOutBound;
  treasuryCoins: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): QualifiedCoinInfo;
    [Symbol.iterator](): Iterator<[bigint, QualifiedCoinInfo]>
  };
  readonly treasuryCoinCounter: bigint;
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
  readonly smgPKCount: bigint;
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
               smgPKThresholdInit_0: bigint,
               smgCount_0: bigint): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
