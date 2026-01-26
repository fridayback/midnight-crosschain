import { MidnightWalletSDK } from './WalletSDK.cjs';
import { CrossChainPrivateState } from './witnesses.cjs';
import * as _midnight_ntwrk_midnight_js_types from '@midnight-ntwrk/midnight-js-types';
import { ImpureCircuitId, MidnightProviders, WalletProvider, MidnightProvider } from '@midnight-ntwrk/midnight-js-types';
import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
import { SigningKey, ContractAddress, ShieldedTokenType, RawTokenType } from '@midnight-ntwrk/compact-runtime';
import { DeployedContract, FoundContract, FinalizedCallTxData } from '@midnight-ntwrk/midnight-js-contracts';
import { UserAddress as UserAddress$1, TokenType } from '@midnight-ntwrk/ledger-v7';
import '@midnight-ntwrk/wallet-sdk-unshielded-wallet/dist/v1/UnshieldedState';
import '@midnight-ntwrk/wallet-sdk-shielded/dist/v1/CoinsAndBalances';
import '@midnight-ntwrk/wallet-sdk-dust-wallet';
import '@midnight-ntwrk/wallet-sdk-abstractions';
import '@midnight-ntwrk/wallet-sdk-facade';
import '@midnight-ntwrk/wallet-sdk-shielded/dist/v1';
import '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import 'buffer';

type ClaimCoinInfo = { receiver: ZswapCoinPublicKey;
                              coin: QualifiedShieldedCoinInfo
                            };

type ClaimMappingTokenInfo = { receiver: ZswapCoinPublicKey;
                                      domainSep: Uint8Array;
                                      amount: bigint
                                    };

declare enum ProposalType { AddAdmin = 0,
                           RemoveAdmin = 1,
                           UpdateFeeShieldedReceiver = 2,
                           UpdateFeeUnshieldedReceiver = 3,
                           UpdateTokenManager = 4,
                           UpdateAdminThreshold = 5,
                           UpdateSMGPKThreshold = 6,
                           UpdateFeeCommonConfig = 7,
                           SetSmgPKS = 8
}

type ReserveOfToken = { total: bigint; isMappingToken: boolean };

type FeeConfig = { chainId: bigint; fee: bigint };

type Proposal = { type: ProposalType;
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
                              isShielded: boolean;
                              fee: bigint
                            };

type CrossOutBound = { smgId: Uint8Array;
                              fromAddr: ZswapCoinPublicKey;
                              toAddr: string;
                              tokenPairId: bigint;
                              tokenAccount: Uint8Array;
                              amount: bigint;
                              fee: bigint;
                              nonce: bigint
                            };

type CrossProposal = { smgId: Uint8Array;
                              token: Uint8Array;
                              tokenPairId: bigint;
                              isMappingToken: boolean;
                              isShielded: boolean;
                              amount: bigint;
                              fee: bigint;
                              toAddr: ZswapCoinPublicKey;
                              ttl: bigint
                            };

type SmgEvent = { uniqueId: Uint8Array; crossProposal: CrossProposal };

type VoteForCrossPropasal = { uniqueId: Uint8Array; ttl: bigint };

type ExecuteCrossProposalInfo = { uniqueId: Uint8Array; coinIndex: bigint
                                       };

type ShieldedCoinInfo = { nonce: Uint8Array;
                                 color: Uint8Array;
                                 value: bigint
                               };

type QualifiedShieldedCoinInfo = { nonce: Uint8Array;
                                          color: Uint8Array;
                                          value: bigint;
                                          mt_index: bigint
                                        };

type ZswapCoinPublicKey = { bytes: Uint8Array };

type UserAddress = { bytes: Uint8Array };

type Witnesses<PS> = {
}

type ImpureCircuits<PS> = {
  smgMint(context: __compactRuntime.CircuitContext<PS>,
          uniqueId_0: Uint8Array,
          smgId_0: Uint8Array,
          tokenPairId_0: bigint,
          amount_0: bigint,
          fee_0: bigint,
          toAddr_0: ZswapCoinPublicKey,
          ttl_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  userBurn(context: __compactRuntime.CircuitContext<PS>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, []>;
  voteMultiCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                         uniqueIds_0: VoteForCrossPropasal[]): __compactRuntime.CircuitResults<PS, []>;
  voteCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                    target_0: VoteForCrossPropasal): __compactRuntime.CircuitResults<PS, []>;
  executeMultiCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                            mutiEx_0: ExecuteCrossProposalInfo[]): __compactRuntime.CircuitResults<PS, []>;
  userRechargeForFee(context: __compactRuntime.CircuitContext<PS>,
                     amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  userFeeWithdrawRequest(context: __compactRuntime.CircuitContext<PS>,
                         receiptor_0: UserAddress): __compactRuntime.CircuitResults<PS, []>;
  userClaimCoin(context: __compactRuntime.CircuitContext<PS>, id_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  userClaimMappingToken(context: __compactRuntime.CircuitContext<PS>,
                        id_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  addReserve(context: __compactRuntime.CircuitContext<PS>,
             coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, []>;
  approveUserWithdrawFee(context: __compactRuntime.CircuitContext<PS>,
                         user_0: ZswapCoinPublicKey,
                         amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  withdrawReserveOfShieldedToken(context: __compactRuntime.CircuitContext<PS>,
                                 token_0: Uint8Array,
                                 coinIndex_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  withdrawReserveOfShieldedMappingToken(context: __compactRuntime.CircuitContext<PS>,
                                        domainSep_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  withdrawReserveOfUnshieldedToken(context: __compactRuntime.CircuitContext<PS>,
                                   token_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  withdrawReserveOfUnshieldedMappingToken(context: __compactRuntime.CircuitContext<PS>,
                                          domainSep_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  transferOwner(context: __compactRuntime.CircuitContext<PS>,
                newOwner_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  acceptOwner(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  setFeeShieldedReceiver(context: __compactRuntime.CircuitContext<PS>,
                         newFeeReceiver_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  setFeeUnshieldedReceiver(context: __compactRuntime.CircuitContext<PS>,
                           newFeeReceiver_0: UserAddress): __compactRuntime.CircuitResults<PS, []>;
  setTokenManager(context: __compactRuntime.CircuitContext<PS>,
                  newTokenManager_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  setMegerWorker(context: __compactRuntime.CircuitContext<PS>,
                 newMergeWorker_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
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
           coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, []>;
  smgRelease(context: __compactRuntime.CircuitContext<PS>,
             uniqueId_0: Uint8Array,
             smgId_0: Uint8Array,
             tokenPairId_0: bigint,
             amount_0: bigint,
             toAddr_0: ZswapCoinPublicKey,
             fee_0: bigint,
             ttl_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  smgMint(context: __compactRuntime.CircuitContext<PS>,
          uniqueId_0: Uint8Array,
          smgId_0: Uint8Array,
          tokenPairId_0: bigint,
          amount_0: bigint,
          fee_0: bigint,
          toAddr_0: ZswapCoinPublicKey,
          ttl_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  userBurn(context: __compactRuntime.CircuitContext<PS>,
           smgId_0: Uint8Array,
           toAddr_0: string,
           tokenPairId_0: bigint,
           coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, []>;
  voteMultiCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                         uniqueIds_0: VoteForCrossPropasal[]): __compactRuntime.CircuitResults<PS, []>;
  voteCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                    target_0: VoteForCrossPropasal): __compactRuntime.CircuitResults<PS, []>;
  executeMultiCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                            mutiEx_0: ExecuteCrossProposalInfo[]): __compactRuntime.CircuitResults<PS, []>;
  userRechargeForFee(context: __compactRuntime.CircuitContext<PS>,
                     amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  userFeeWithdrawRequest(context: __compactRuntime.CircuitContext<PS>,
                         receiptor_0: UserAddress): __compactRuntime.CircuitResults<PS, []>;
  userClaimCoin(context: __compactRuntime.CircuitContext<PS>, id_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  userClaimMappingToken(context: __compactRuntime.CircuitContext<PS>,
                        id_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  addReserve(context: __compactRuntime.CircuitContext<PS>,
             coin_0: ShieldedCoinInfo): __compactRuntime.CircuitResults<PS, []>;
  approveUserWithdrawFee(context: __compactRuntime.CircuitContext<PS>,
                         user_0: ZswapCoinPublicKey,
                         amount_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  withdrawReserveOfShieldedToken(context: __compactRuntime.CircuitContext<PS>,
                                 token_0: Uint8Array,
                                 coinIndex_0: bigint): __compactRuntime.CircuitResults<PS, []>;
  withdrawReserveOfShieldedMappingToken(context: __compactRuntime.CircuitContext<PS>,
                                        domainSep_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  withdrawReserveOfUnshieldedToken(context: __compactRuntime.CircuitContext<PS>,
                                   token_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  withdrawReserveOfUnshieldedMappingToken(context: __compactRuntime.CircuitContext<PS>,
                                          domainSep_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  transferOwner(context: __compactRuntime.CircuitContext<PS>,
                newOwner_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  acceptOwner(context: __compactRuntime.CircuitContext<PS>): __compactRuntime.CircuitResults<PS, []>;
  setFeeShieldedReceiver(context: __compactRuntime.CircuitContext<PS>,
                         newFeeReceiver_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  setFeeUnshieldedReceiver(context: __compactRuntime.CircuitContext<PS>,
                           newFeeReceiver_0: UserAddress): __compactRuntime.CircuitResults<PS, []>;
  setTokenManager(context: __compactRuntime.CircuitContext<PS>,
                  newTokenManager_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  setMegerWorker(context: __compactRuntime.CircuitContext<PS>,
                 newMergeWorker_0: ZswapCoinPublicKey): __compactRuntime.CircuitResults<PS, []>;
  mergeTreasuryCoin(context: __compactRuntime.CircuitContext<PS>,
                    coins_0: bigint[]): __compactRuntime.CircuitResults<PS, []>;
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
    member(elem_0: SmgEvent): boolean;
    [Symbol.iterator](): Iterator<SmgEvent>
  };
  treasuryCoins: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): QualifiedShieldedCoinInfo;
    [Symbol.iterator](): Iterator<[bigint, QualifiedShieldedCoinInfo]>
  };
  readonly treasuryCoinCounter: bigint;
  reserveOfAllShieldedToken: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): ReserveOfToken;
    [Symbol.iterator](): Iterator<[Uint8Array, ReserveOfToken]>
  };
  reserveOfAllUnshieldedToken: {
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
  readonly feeShieldedReceiver: ZswapCoinPublicKey;
  readonly feeUnshieldedReceiver: UserAddress;
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
  userFeeWithdrawAddress: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: ZswapCoinPublicKey): boolean;
    lookup(key_0: ZswapCoinPublicKey): UserAddress;
    [Symbol.iterator](): Iterator<[ZswapCoinPublicKey, UserAddress]>
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
  mappintTokenTotalSupply: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): bigint;
    [Symbol.iterator](): Iterator<[Uint8Array, bigint]>
  };
  readonly owner: ZswapCoinPublicKey;
  readonly pendingOwner: ZswapCoinPublicKey;
  readonly mergeWorker: ZswapCoinPublicKey;
}

declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               adminThresholdInit_0: bigint,
               smgPKThresholdInit_0: bigint): __compactRuntime.ConstructorResult<PS>;
}

type CrossChainCircuits = ImpureCircuitId<Contract<CrossChainPrivateState>>;
declare const CrossChainPrivateStateId = "crossChainPrivateState";
type CrossChainProviders = MidnightProviders<CrossChainCircuits, typeof CrossChainPrivateStateId, CrossChainPrivateState>;
type CrossChainContract = Contract<CrossChainPrivateState>;
type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;
declare const currentDir: string;
type Address = string;
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
declare const createWalletAndMidnightProvider: (wallet: MidnightWalletSDK) => Promise<WalletProvider & MidnightProvider>;
declare class CrossChainApi {
    providers: CrossChainProviders;
    crossChainContract: DeployedCrossChainContract;
    MaxSmgSignators: number;
    MaxMergeCoins: number;
    constructor();
    init(config: Config, wallet: MidnightWalletSDK): Promise<void>;
    setWallet(wallet: MidnightWalletSDK): Promise<void>;
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
        toAddr: ZswapCoinPublicKey;
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
    }[];
    static latestOutBoundCrosstxInfo(ledger: Ledger): {
        smgId: string;
        fromAddr: string;
        toAddr: string;
        tokenPairId: string;
        tokenAccount: Uint8Array<ArrayBufferLike>;
        amount: string;
        fee: string;
        nonce: string;
    } | undefined;
    isVoter(ledger: Ledger, voter: Address | undefined): Promise<boolean>;
    getUnVotedCrossProposal(ledger: Ledger, voter: Address | undefined): Promise<({
        smgId: string;
        token: string;
        tokenPairId: string;
        amount: string;
        fee: string;
        toAddr: ZswapCoinPublicKey;
        ttl: string;
    } | undefined)[]>;
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
    userFeeWithdrawRequest(receiptor: UserAddress$1): Promise<FinalizedCallTxData<CrossChainContract, "userFeeWithdrawRequest">>;
    userClaimCoin(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "userClaimCoin">>;
    userClaimMappingToken(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "userClaimMappingToken">>;
    addReserve(token: ShieldedTokenType, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addReserve">>;
    withdrawReserveOfShieldedToken(token: TokenType, coinIndex: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfShieldedToken">>;
    withdrawReserveOfShieldedMappingToken(domainSep: string): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfShieldedMappingToken">>;
    withdrawReserveOfUnshieldedToken(token: TokenType): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfUnshieldedToken">>;
    withdrawReserveOfUnshieldedMappingToken(domainSep: string): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfUnshieldedMappingToken">>;
    getLedgerState(): Promise<Ledger | null>;
    transferOwner(newOwner: Address): Promise<FinalizedCallTxData<CrossChainContract, "transferOwner">>;
    acceptOwner(): Promise<FinalizedCallTxData<CrossChainContract, "acceptOwner">>;
    updateSmgPk(newVoter: Address): Promise<FinalizedCallTxData<CrossChainContract, "updateSmgPk">>;
    setFeeShieldedReceiver(feeReceiver: Address): Promise<FinalizedCallTxData<CrossChainContract, "setFeeShieldedReceiver">>;
    setFeeUnshieldedReceiver(feeReceiver: UserAddress$1): Promise<FinalizedCallTxData<CrossChainContract, "setFeeUnshieldedReceiver">>;
    setTokenManager(tokenManager: Address): Promise<FinalizedCallTxData<CrossChainContract, "setTokenManager">>;
    setMegerWorker(mergeWorker: Address): Promise<FinalizedCallTxData<CrossChainContract, "setMegerWorker">>;
    addAdmin(admin: Address): Promise<FinalizedCallTxData<CrossChainContract, "addAdmin">>;
    removeAdmin(admin: Address): Promise<FinalizedCallTxData<CrossChainContract, "removeAdmin">>;
    setAdminThreshold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setAdminThreshold">>;
    setSmgPksks(voters: Address[]): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPksks">>;
    setSmgPKThreold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPKThreold">>;
    setFeeCommonConfig(chainId: number | string | bigint, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setFeeCommonConfig">>;
    addTokenPair(tokenPairId: number | string | bigint, fromChainId: number | string | bigint, toChainId: number | string | bigint, midnigthTokenAccount: RawTokenType, isShielded: boolean, domainSep: string, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addTokenPair">>;
    removeTokenPair(tokenPairId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "removeTokenPair">>;
    newProposal(proposal: Proposal): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    addAdminProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    removeAdminProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateFeeShieldedReceiverProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateFeeUnshieldedReceiverProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateTokenManagerProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateAdminThresholdProposal(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    defaultProsal(): Proposal;
    updateSMGPKThresholdProposal(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    updateFeeCommonConfigProposal(chainId: number | string | bigint, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">>;
    voteProposal(proposalId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "voteProposal">>;
    executeProposal(proposalId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "executeProposal">>;
    removeExpiredHisTxs(txs: string[]): Promise<FinalizedCallTxData<CrossChainContract, "removeExpiredHisTxs">>;
    updateContractAuthority(newKey: SigningKey): Promise<_midnight_ntwrk_midnight_js_types.FinalizedTxData>;
    upgradeContract(circuitId: CrossChainCircuits, newCircuitHex: string | undefined): Promise<_midnight_ntwrk_midnight_js_types.FinalizedTxData>;
}
declare const upgradeContractCircuit: (providers: MidnightProviders, contractAddress: Address, circuitId: string, newVkHex: string | undefined) => Promise<_midnight_ntwrk_midnight_js_types.FinalizedTxData>;
declare const removeContractCircuit: (providers: MidnightProviders, contractAddress: Address, circuitId: string) => Promise<_midnight_ntwrk_midnight_js_types.FinalizedTxData>;
declare const getTreasuryCoinsFromState: (state: Ledger) => Map<string, Map<bigint, QualifiedShieldedCoinInfo>>;
declare const genSigningKey: () => string;
declare const getCoinPublicKeyFromShieldAddress: (shieldAddr: string) => Buffer<ArrayBufferLike>;
declare const initNetwork: (network: "mainnet" | "testnet-02" | "preview" | "devnet" | "undeployed") => void;

export { type Address, type Config, CrossChainApi, type CrossChainCircuits, type CrossChainContract, CrossChainPrivateStateId, type CrossChainProviders, type DeployedCrossChainContract, ZKConfig, createWalletAndMidnightProvider, crosschainContractInstance, currentDir, genSigningKey, getCoinPublicKeyFromShieldAddress, getTreasuryCoinsFromState, initNetwork, pad, removeContractCircuit, upgradeContractCircuit };
