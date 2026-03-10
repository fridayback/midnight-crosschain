import * as _midnight_ntwrk_wallet_sdk_unshielded_wallet_dist_v1_UnshieldedState_js from '@midnight-ntwrk/wallet-sdk-unshielded-wallet/dist/v1/UnshieldedState.js';
import * as _midnight_ntwrk_wallet_sdk_shielded_dist_v1_CoinsAndBalances_js from '@midnight-ntwrk/wallet-sdk-shielded/dist/v1/CoinsAndBalances.js';
import * as _midnight_ntwrk_wallet_sdk_dust_wallet from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import { DefaultV1Configuration as DefaultV1Configuration$1, TotalCostParameters } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import * as ledger from '@midnight-ntwrk/ledger-v7';
import { NetworkId } from '@midnight-ntwrk/wallet-sdk-abstractions';
import { WalletFacade, CombinedSwapOutputs, FacadeState } from '@midnight-ntwrk/wallet-sdk-facade';
import { DefaultV1Configuration } from '@midnight-ntwrk/wallet-sdk-shielded/dist/v1';
import { UnshieldedKeystore } from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { Buffer as Buffer$1 } from 'buffer';
import * as _midnight_ntwrk_midnight_js_types from '@midnight-ntwrk/midnight-js-types';
import { UnboundTransaction, MidnightProviders, WalletProvider, MidnightProvider } from '@midnight-ntwrk/midnight-js-types';
import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
import { SigningKey, ContractAddress, RawTokenType } from '@midnight-ntwrk/compact-runtime';
import { CompiledContract, ImpureCircuitId } from '@midnight-ntwrk/compact-js';
import { DeployedContract, FoundContract, FinalizedCallTxData } from '@midnight-ntwrk/midnight-js-contracts';

type Configuration = DefaultV1Configuration & DefaultV1Configuration$1 & {
    indexerUrl: string;
};
declare const configuration: (indexerHttpUrl: string, indexerWsUrl: string, provingServerUrl: string, node: string, network?: NetworkId.NetworkId, costParameters?: TotalCostParameters) => Configuration;
declare const initFacadeWallet: (seed: Buffer$1, configuration: Configuration, // = defaultConfiguration,
strSerializedState?: FacadeSerializedState) => Promise<{
    wallet: WalletFacade;
    shieldedSecretKeys: ledger.ZswapSecretKeys;
    dustSecretKey: ledger.DustSecretKey;
    unshieldedKeystore: UnshieldedKeystore;
}>;
declare const waitForFullySynced: (facade: WalletFacade) => Promise<FacadeState>;
interface FacadeSerializedState {
    readonly shieldedWalletState: string;
    readonly unshieldedWalletState: string;
    readonly dustWalletState: string;
}
interface WalletStore {
    (walletState: FacadeSerializedState): Promise<void>;
}
declare class MidnightWalletSDK {
    private config;
    private isGenerating;
    private isUnGenerating;
    private walletObj?;
    private shieldedSecretKeys?;
    private dustSecretKey?;
    private unshieldedKeystore?;
    private walletAddress;
    private bActiveFlag;
    private storeTimer?;
    readonly ISMimic: boolean;
    constructor(config: Configuration, mimic?: boolean);
    initWallet(strSeed: string, store: WalletStore, strSerializedState?: FacadeSerializedState, saveInterval?: number): Promise<void>;
    getAccountAddress(): {
        shieldedAddress: string;
        unshieldedAddress: string;
        dustAddress: string;
    };
    registerNightUtxosForDustGeneration(): Promise<void>;
    deregisterFromDustGeneration(): Promise<void>;
    submitTx(tx: ledger.FinalizedTransaction): Promise<string>;
    getBalances(): Promise<{
        dustBalance: bigint;
        shieldedBlance: any;
        unshieldedBlance: any;
    }>;
    getAvailableCoins(): Promise<{
        dustAvailableCoins: readonly _midnight_ntwrk_wallet_sdk_dust_wallet.DustToken[];
        shieldedAvailableCoins: readonly _midnight_ntwrk_wallet_sdk_shielded_dist_v1_CoinsAndBalances_js.AvailableCoin[];
        unshieldedAvailableCoins: readonly _midnight_ntwrk_wallet_sdk_unshielded_wallet_dist_v1_UnshieldedState_js.UtxoWithMeta[];
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
    balanceTx(tx: UnboundTransaction, ttl?: Date): Promise<ledger.FinalizedTransaction>;
}
/**
 * Sign all unshielded offers in a transaction's intents, using the correct
 * proof marker for Intent.deserialize. This works around a bug in the wallet
 * SDK where signRecipe hardcodes 'pre-proof', which fails for proven
 * (UnboundTransaction) intents that contain 'proof' data.
 */
declare const signTransactionIntents: (tx: {
    intents?: Map<number, any>;
}, signFn: (payload: Uint8Array) => ledger.Signature, proofMarker: "proof" | "pre-proof") => void;

type CrossChainPrivateState = {};
declare const createPrivateState: (privateCounter: number) => CrossChainPrivateState;
declare const createInitialPrivateState: (privateCounter: number) => CrossChainPrivateState;
declare const witnesses: {};

type ClaimTokenInfo = { receiver: UserAddress;
                               token: Uint8Array;
                               isMappingToken: boolean;
                               amount: bigint
                             };

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
  executeMultiCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                            mutiEx_0: Uint8Array[]): __compactRuntime.CircuitResults<PS, []>;
  userClaim(context: __compactRuntime.CircuitContext<PS>, id_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  setFeeReceiver(context: __compactRuntime.CircuitContext<PS>,
                 newFeeReceiver_0: UserAddress): __compactRuntime.CircuitResults<PS, []>;
  setSmgPksks(context: __compactRuntime.CircuitContext<PS>,
              voters_0: ZswapCoinPublicKey[]): __compactRuntime.CircuitResults<PS, []>;
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
  executeMultiCrossProposal(context: __compactRuntime.CircuitContext<PS>,
                            mutiEx_0: Uint8Array[]): __compactRuntime.CircuitResults<PS, []>;
  userClaim(context: __compactRuntime.CircuitContext<PS>, id_0: Uint8Array): __compactRuntime.CircuitResults<PS, []>;
  setFeeReceiver(context: __compactRuntime.CircuitContext<PS>,
                 newFeeReceiver_0: UserAddress): __compactRuntime.CircuitResults<PS, []>;
  setSmgPksks(context: __compactRuntime.CircuitContext<PS>,
              voters_0: ZswapCoinPublicKey[]): __compactRuntime.CircuitResults<PS, []>;
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
  currentExecuteCrossProposal: {
    isEmpty(): boolean;
    size(): bigint;
    member(elem_0: SmgEvent): boolean;
    [Symbol.iterator](): Iterator<SmgEvent>
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
  tokenToBeClaimed: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): ClaimTokenInfo;
    [Symbol.iterator](): Iterator<[Uint8Array, ClaimTokenInfo]>
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
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>,
               adminThresholdInit_0: bigint,
               smgPKThresholdInit_0: bigint,
               feeReceiverInit_0: UserAddress): __compactRuntime.ConstructorResult<PS>;
}

type CrossChainCircuits = ImpureCircuitId<Contract<CrossChainPrivateState>>;
declare const CrossChainPrivateStateId = "crossChainPrivateState";
type CrossChainProviders = MidnightProviders<CrossChainCircuits, typeof CrossChainPrivateStateId, CrossChainPrivateState>;
type CrossChainContract = Contract<CrossChainPrivateState>;
type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;
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
declare const CompiledSimpleContract: CompiledContract.CompiledContract<Contract<any, any>, any, never>;
declare const createWalletAndMidnightProvider: (wallet: MidnightWalletSDK) => Promise<WalletProvider & MidnightProvider>;
declare class CrossChainApi {
    providers: CrossChainProviders;
    crossChainContract: DeployedCrossChainContract;
    MaxSmgSignators: number;
    MaxMergeCoins: number;
    constructor();
    init(config: Config, wallet: MidnightWalletSDK): Promise<void>;
    setWallet(wallet: MidnightWalletSDK): Promise<void>;
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
    }[];
    static latestOutBoundCrosstxInfo(ledger: Ledger): {
        smgId: string;
        fromAddr: string;
        toAddr: string;
        tokenPairId: string;
        tokenAccount: Uint8Array<ArrayBufferLike>;
        amount: string;
        fee: string;
    } | undefined;
    isVoter(ledger: Ledger, voter: Address | undefined): Promise<boolean>;
    getUnVotedCrossProposal(ledger: Ledger, voter: Address | undefined): Promise<({
        smgId: string;
        token: string;
        tokenPairId: string;
        amount: string;
        fee: string;
        toAddr: UserAddress;
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
    userLock(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "userLock">>;
    smgRelease(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint, fee: string | number | bigint, toAddr: string, ttl: number): Promise<FinalizedCallTxData<CrossChainContract, "smgRelease">>;
    smgMint(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint, fee: string | number | bigint, toAddr: string, ttl: number): Promise<FinalizedCallTxData<CrossChainContract, "smgMint">>;
    userBurn(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "userBurn">>;
    voteCrossProposal(uniqueId: string, ttl: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "voteMultiCrossProposal">>;
    voteMultiCrossProposal(uniqueIds: {
        uniqueId: string;
        ttl: string | number | bigint;
    }[]): Promise<FinalizedCallTxData<CrossChainContract, "voteMultiCrossProposal">>;
    executeCrossProposal(uniqueId: string, coinIndex: string | number | bigint | undefined): Promise<void>;
    executeMultiCrossProposal(uniqueIds: string[]): Promise<FinalizedCallTxData<CrossChainContract, "executeMultiCrossProposal">>;
    userClaim(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "userClaim">>;
    getLedgerState(): Promise<Ledger | null>;
    setSmgPksks(voters: Address[]): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPksks">>;
    setSmgPKThreold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPKThreold">>;
    setFeeCommonConfig(chainId: number | string | bigint, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setFeeCommonConfig">>;
    addTokenPair(tokenPairId: number | string | bigint, fromChainId: number | string | bigint, toChainId: number | string | bigint, midnigthTokenAccount: RawTokenType, domainSep: string, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addTokenPair">>;
    removeTokenPair(tokenPairId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "removeTokenPair">>;
    defaultProsal(): Proposal;
    updateContractAuthority(newKey: SigningKey): Promise<void>;
    upgradeContract(circuitId: CrossChainCircuits, newCircuitHex: string | undefined): Promise<void>;
}
declare const upgradeContractCircuit: (providers: MidnightProviders, contractAddress: Address, circuitId: string, newVkHex: string | undefined) => Promise<_midnight_ntwrk_midnight_js_types.FinalizedTxData>;
declare const removeContractCircuit: (providers: MidnightProviders, contractAddress: Address, circuitId: string) => Promise<void>;
declare const genSigningKey: () => string;
declare const getCoinPublicKeyFromShieldAddress: (shieldAddr: string) => Buffer<ArrayBufferLike>;
declare const getUserAddressFromUnshieldAddress: (unshieldAddr: string) => Buffer<ArrayBufferLike>;
declare const initNetwork: (network: "mainnet" | "testnet-02" | "preview" | "devnet" | "undeployed") => void;

export { type Address, CompiledSimpleContract, type Config, type Configuration, CrossChainApi, type CrossChainCircuits, type CrossChainContract, type CrossChainPrivateState, CrossChainPrivateStateId, type CrossChainProviders, type DeployedCrossChainContract, type FacadeSerializedState, MidnightWalletSDK, type WalletStore, ZKConfig, configuration, createInitialPrivateState, createPrivateState, createWalletAndMidnightProvider, crosschainContractInstance, genSigningKey, getCoinPublicKeyFromShieldAddress, getUserAddressFromUnshieldAddress, initFacadeWallet, initNetwork, pad, removeContractCircuit, signTransactionIntents, upgradeContractCircuit, waitForFullySynced, witnesses };
