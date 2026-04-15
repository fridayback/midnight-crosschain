/*
 * @Author: liulin 
 * @Date: 2025-06-20 12:02:08
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-12-10 11:23:56
 * @FilePath: /midnight-crosschain/contract/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// Force msgpackr to use pure JS implementation to avoid native build issues
// process.env.MSGPACKR_NO_NATIVE = '1';

// // Force leveldown to build from source if needed
// process.env.LEVELDOWN_FORCE_BUILD_FROM_SOURCE = '1';

// export * as CrossChain from "./managed/crosschain/contract/index.cjs";
// export * from "./witnesses.js";

import path from 'node:path';


import { witnesses, type CrossChainPrivateState } from './witnesses';
import * as CrossChain from "./managed/crosschain/contract/index.js";
import { type ProvableCircuitId, CompiledContract } from '@midnight-ntwrk/compact-js';
import { UnboundTransaction, type MidnightProvider, type MidnightProviders, type WalletProvider, createVerifierKey, type VerifierKey, PublicDataProvider } from '@midnight-ntwrk/midnight-js-types';
import { deployContract, FinalizedCallTxData, findDeployedContract, type DeployedContract, submitInsertVerifierKeyTx, type FoundContract, submitRemoveVerifierKeyTx } from '@midnight-ntwrk/midnight-js-contracts';
// import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
// import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
// // import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
// import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
// import { Address, CoinPublicKey, WalletFacade } from '@midnight-ntwrk/wallet-api';
import { ShieldedCoinInfo, DustParameters, LedgerParameters, Transaction, TransactionId, type UnprovenTransaction, sampleCoinPublicKey, FinalizedTransaction, nativeToken, TokenType, encodeRawTokenType, decodeRawTokenType, createShieldedCoinInfo, dummyUserAddress, UnshieldedTokenType, UserAddress, decodeUserAddress } from '@midnight-ntwrk/ledger-v8';
// import { TokenType, Transaction as ZswapTransaction } from '@midnight-ntwrk/zswap';
import { getNetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { assertIsContractAddress, fromHex, parseCoinPublicKeyToHex, toHex } from '@midnight-ntwrk/midnight-js-utils';
import { MidnightBech32m, ShieldedAddress, UnshieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
import * as Rx from 'rxjs';
import { ContractState, ContractAddress, degradeToTransient, ecAdd, ecMul, ecMulGenerator, mulField, persistentHash, sampleSigningKey, SigningKey, transientHash, encodeShieldedCoinInfo, ShieldedTokenType, RawTokenType, encodeUserAddress, rawTokenType } from '@midnight-ntwrk/compact-runtime';
import assert from 'node:assert';
import { fileURLToPath, pathToFileURL } from 'url';
// import { MidnightWalletSDK, signTransactionIntents } from './wallet-sdk';
// import { FinalizedTransaction } from '@midnight-ntwrk/ledger-v7';



export type CrossChainCircuits = ProvableCircuitId<CrossChain.Contract<CrossChainPrivateState>>;

export const CrossChainPrivateStateId = 'crossChainPrivateState';

export type CrossChainProviders = MidnightProviders<CrossChainCircuits, typeof CrossChainPrivateStateId, CrossChainPrivateState>;

export type CrossChainContract = CrossChain.Contract<CrossChainPrivateState>;

export type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;

// export function getDirname(): string {
//   // ES Module 环境
//   if (typeof import.meta?.url === 'string') {
//     // const url = require('url')
//     // const path = require('path')
//     // return path.dirname(url.fileURLToPath(import.meta.url))
//     // return import.meta.url;
//     return path.dirname(fileURLToPath(import.meta.url));
//   }

//   // CommonJS 环境
//   return __dirname
// }

// export const currentDir = path.resolve(new URL(getDirname()).pathname, '..');
function getDirname() {
  if (typeof import.meta?.url === "string") {
    // console.log('import.meta.url===>', import.meta.url);
    // console.log('fileURLToPath(import.meta.url)===>', fileURLToPath(import.meta.url));
    // console.log('path.dirname(fileURLToPath(import.meta.url))===>', path.dirname(fileURLToPath(import.meta.url)));
    const ret = path.resolve(fileURLToPath(import.meta.url), "..");
    // return pathToFileURL(ret).href;
    return ret;
  }
  return path.resolve(__dirname, '..');
}
var currentDir = getDirname();//path.resolve(new URL(getDirname()).pathname, "..");
console.log('currentDir===>', currentDir);
// export const currentDir = path.resolve(new URL(import.meta.url).pathname, '..');
// export const currentDir = path.dirname(fileURLToPath(import.meta.url));
// export type Address = string;
export const ZKConfig = {
  privateStateStoreName: 'crosschain-private-state',
  zkConfigPath: path.resolve(currentDir, 'managed', 'crosschain'),
};


const fromHexWithOrNoPrefix = (hex: string) => {
  if (hex.startsWith('0x')) {
    return fromHex(hex.slice(2));
  }
  return fromHex(hex);
}
export function pad(s: string, n: number): Uint8Array {
  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(s);
  if (n < utf8Bytes.length) {
    throw new Error(`The padded length n must be at least ${utf8Bytes.length}`);
  }
  const paddedArray = new Uint8Array(n);
  paddedArray.set(utf8Bytes);
  return paddedArray;
}

export interface Config {
  // readonly logDir: string;
  readonly indexer: string;
  readonly indexerWS: string;
  readonly node: string;
  readonly proofServer: string;
  readonly zkConfigPath: string;
}

export const crosschainContractInstance: CrossChainContract = new CrossChain.Contract(witnesses);

export const CompiledSimpleContract =
  CompiledContract.make('CrossChain', CrossChain.Contract).pipe(
    CompiledContract.withWitnesses(witnesses),
    CompiledContract.withCompiledFileAssets(path.resolve(currentDir, 'managed', 'crosschain'))
  );


// export const createWalletAndMidnightProvider = async (wallet: MidnightWalletSDK): Promise<WalletProvider & MidnightProvider> => {
//   const walletFacade = wallet.getWalletInstance();
//   assert(walletFacade, "wallet not initialized");
//   const state = await Rx.firstValueFrom(walletFacade.state().pipe(Rx.filter((s) => s.isSynced)));
//   return {
//     getCoinPublicKey: () => state.shielded.coinPublicKey.toHexString(),
//     getEncryptionPublicKey: () => state.shielded.encryptionPublicKey.toHexString(),
//     async balanceTx(tx: UnboundTransaction, ttl?: Date): Promise<FinalizedTransaction> {
//       // return await wallet.balanceTx(tx, ttl);
//       // return walletFacade.balanceUnboundTransaction(tx,{shieldedSecretKeys: wallet.getShieldedSecretKeys(), dustSecretKey: wallet.getDustSecretKey()}, { ttl: ttl ?? new Date(Date.now() + 60 * 60 * 1000) })
//       //   .then((tx) => walletFacade.finalizeRecipe(tx));
//       const recipe = await walletFacade.balanceUnboundTransaction(
//         tx,
//         { shieldedSecretKeys: wallet.getShieldedSecretKeys(), dustSecretKey: wallet.getDustSecretKey() },
//         { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1000) },
//       );

//       // Work around wallet SDK bug: signRecipe uses hardcoded 'pre-proof'
//       // marker when cloning intents, but proven (UnboundTransaction) intents
//       // have 'proof' data, causing "Failed to clone intent". We sign manually
//       // with the correct proof markers.
//       const signFn = (payload: Uint8Array) => wallet.getUnshieldedKeystore().signData(payload);
//       signTransactionIntents(recipe.baseTransaction, signFn, 'proof');
//       if (recipe.balancingTransaction) {
//         signTransactionIntents(recipe.balancingTransaction, signFn, 'pre-proof');
//       }

//       // const recipeFinalized = await ctx.wallet.signRecipe(recipe, (payload) => ctx.unshieldedKeystore.signData(payload));

//       return walletFacade.finalizeRecipe(recipe);

//     },
//     submitTx(tx: FinalizedTransaction): Promise<TransactionId> {
//       // return walletFacade.submitTransaction(tx);
//       return wallet.submitTx(tx);
//     },
//   };
// };

// export const waitForSync = (wallet: WalletFacade) =>
//   Rx.firstValueFrom(
//     wallet.state().pipe(
//       Rx.throttleTime(1_000),
//       Rx.tap((state) => {
//         const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
//         const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
//       }),
//       Rx.filter((state) => {
//         // Let's allow progress only if wallet is synced fully
//         return state.syncProgress !== undefined && state.syncProgress.synced;
//       }),
//     ),
//   );

// export const waitForSyncProgress = async (wallet: WalletFacade) =>
//   await Rx.firstValueFrom(
//     wallet.state().pipe(
//       Rx.throttleTime(1_000),
//       Rx.tap((state) => {
//         const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
//         const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
//       }),
//       Rx.filter((state) => {
//         // Let's allow progress only if syncProgress is defined
//         return state.syncProgress !== undefined;
//       }),
//     ),
//   );

// export const waitForFunds = (wallet: WalletFacade) =>
//   Rx.firstValueFrom(
//     wallet.state().pipe(
//       Rx.throttleTime(10_000),
//       Rx.tap((state) => {
//         const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
//         const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
//       }),
//       Rx.filter((state) => {
//         // Let's allow progress only if wallet is synced
//         // for( const token in state.balances){
//         //   console.log('*******',token, state.balances[token])
//         // }
//         return state.syncProgress?.synced === true;
//       }),
//       Rx.map((s) => s.balances),
//       // Rx.filter((balance) => balance.balance > 0n),
//     ),
//   );

// export const buildWalletAndWaitForFunds = (
//   { indexer, indexerWS, node, proofServer }: Config,
//   seed: string,
//   serializedState: string | undefined
// ): WalletFacade => {
//   let dustWallet;
//   if (serializedState) {
//     dustWallet = DustWallet({ networkId: 'preview', costParameters: { additionalFeeOverhead: 1n, feeBlocksMargin: 1 } }).restore(serializedState);
//   } else {
//     const dustParameters = LedgerParameters.initialParameters().dust;
//     dustWallet = DustWallet({ networkId: 'preview', costParameters: { additionalFeeOverhead: 1n, feeBlocksMargin: 1 } }).startWithSeed(Buffer.from(seed, 'hex'), dustParameters);
//   }

//   if (serializedState) {
//     dustWallet = await WalletBuilder.restore(indexer, indexerWS, proofServer, node, seed, serializedState, 'info', true);
//     dustWallet.start();
//     const stateObject = JSON.parse(serializedState);
//     if ((await isAnotherChain(dustWallet, Number(stateObject.offset))) === true) {
//       console.warn('The chain was reset, building wallet from scratch');
//       dustWallet = await WalletBuilder.build(
//         indexer,
//         indexerWS,
//         proofServer,
//         node,
//         seed,
//         getZswapNetworkId(),
//         'info',
//         true
//       );
//       dustWallet.start();
//       console.log('WalletFacade was built from scratch 1');
//     }
//   } else {
//     console.log('WalletFacade save file not found, building wallet from scratch');
//     dustWallet = await WalletBuilder.build(
//       indexer,
//       indexerWS,
//       proofServer,
//       node,
//       seed,
//       getZswapNetworkId(),
//       'info',
//       true
//     );
//     dustWallet.start();
//     console.log('WalletFacade was built from scratch 2');
//   }

//   {
//     const newState = await waitForSync(dustWallet);
//     // allow for situations when there's no new index in the network between runs
//     if (newState.syncProgress?.synced) {
//       console.info('WalletFacade was able to sync from restored state');
//     } else {
//       throw new Error('WalletFacade was not able to sync from restored state');
//     }
//   }
//   const state = await Rx.firstValueFrom(dustWallet.state());
//   console.info(`Your wallet address is: ${state.address}`);
//   let balance = state.balances[nativeToken()];
//   if (balance === undefined || balance === 0n) {
//     console.info(`Your wallet balance is: 0`);
//     console.info(`Waiting to receive tokens...`);
//     balance = (await waitForFunds(dustWallet))[nativeToken()];
//   }
//   console.info(`Your wallet balance is: ${balance}`);
//   return dustWallet;
// };

// export const isAnotherChain = async (wallet: WalletFacade, offset: number) => {
//   await waitForSyncProgress(wallet);
//   // Here wallet does not expose the offset block it is synced to, that is why this workaround
//   const walletOffset = Number(JSON.parse(await wallet.serializeState()).offset);
//   if (walletOffset < offset - 1) {
//     console.info(`Your offset offset is: ${walletOffset} restored offset: ${offset} so it is another chain`);
//     return true;
//   } else {
//     console.info(`Your offset offset is: ${walletOffset} restored offset: ${offset} ok`);
//     return false;
//   }
// };

// export const getSerializeWalletState = async (wallet: WalletFacade): Promise<string> => {
//   return await wallet.serializeState();
// };

// export const walletAddress = async (wallet: WalletFacade): Promise<string> => {
//   const state = await Rx.firstValueFrom(wallet.state());
//   return state.address;
// }

// export const walletBalance = async (wallet: WalletFacade): Promise<Record<string, bigint>> => {
//   const state = await Rx.firstValueFrom(wallet.state());
//   return state.balances;
// }

// only for node.js environment, in browser environment, the zk config should be fetched from server or embedded in the bundle
// export const createCrossChainProviders = async (config: Config, wallet: MidnightWalletSDK): Promise<CrossChainProviders> => {
//   const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
//   const zkConfigProvider = new NodeZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath);
//   return {
//     privateStateProvider: levelPrivateStateProvider<typeof CrossChainPrivateStateId>({
//       privateStateStoreName: 'CCPSSN',
//       walletProvider: walletAndMidnightProvider
//     }),
//     publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
//     zkConfigProvider: new NodeZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath),
//     proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
//     walletProvider: walletAndMidnightProvider,
//     midnightProvider: walletAndMidnightProvider,
//   };
// };

const MAX_SIGNER_COUNT = 29;
export class CrossChainApi {
  providers!: CrossChainProviders;
  crossChainContract!: DeployedCrossChainContract;
  MaxSmgSignators = 29;
  MaxMergeCoins = 4;
  constructor() {
    // setNetworkId(networkId);
  }

  async init(providers: CrossChainProviders) {
    this.providers = providers;
  }

  // async init(config: Config, wallet: MidnightWalletSDK) {
  //   const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
  //   const zkConfigProvider = new NodeZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath);
  //   this.providers = {
  //     privateStateProvider: levelPrivateStateProvider<typeof CrossChainPrivateStateId>({
  //       privateStateStoreName: 'CCPSSN',
  //       privateStoragePasswordProvider: () => 'Pwd_' + wallet.getUnshieldedKeystore().getSecretKey().toString('hex'),
  //       accountId: wallet.getUnshieldedKeystore().getPublicKey(),
  //     }),
  //     publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
  //     zkConfigProvider: new NodeZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath),
  //     proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
  //     walletProvider: walletAndMidnightProvider,
  //     midnightProvider: walletAndMidnightProvider,
  //   };
  // }

  // async init(config: Config, wallet: MidnightWalletSDK) {
  //   const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
  //   const zkConfigProvider = new NodeZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath);
  //   this.providers = {
  //     privateStateProvider: levelPrivateStateProvider<typeof CrossChainPrivateStateId>({
  //       privateStateStoreName: 'CCPSSN',
  //       walletProvider: walletAndMidnightProvider
  //     }),
  //     publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
  //     zkConfigProvider: new NodeZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath),
  //     proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
  //     walletProvider: walletAndMidnightProvider,
  //     midnightProvider: walletAndMidnightProvider,
  //   };
  // }

  // async setWallet(wallet: MidnightWalletSDK) {
  //   const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
  //   this.providers = {
  //     ...this.providers,
  //     walletProvider: walletAndMidnightProvider,
  //     midnightProvider: walletAndMidnightProvider,
  //   };
  // }

  async deployContract(adminThreshold: number | string | bigint, smgPkThreshold: number | string | bigint, feeReceiver: string, signingKey: SigningKey): Promise<ContractAddress> {
    const feeReceiver_0 = { bytes: getUserAddressFromUnshieldAddress(feeReceiver) };
    this.crossChainContract = (await deployContract(this.providers, {
      compiledContract: CompiledSimpleContract,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {},
      signingKey: signingKey,
      args: [BigInt(adminThreshold), BigInt(smgPkThreshold), feeReceiver_0]
    })) as DeployedCrossChainContract;
    // // logger.info(`Deployed contract at address: ${this.crossChainContract.deployTxData.public.contractAddress}`);
    return this.crossChainContract.deployTxData.public.contractAddress;
  }

  async join(contractAddress: ContractAddress): Promise<void> {
    this.crossChainContract = (await findDeployedContract(this.providers, {
      contractAddress,
      compiledContract: CompiledSimpleContract,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {},
    })) as DeployedCrossChainContract;
  }

  checkCrossData(
    uniqueId: string,
    smgId: string,
    tokenPairId: string | number | bigint,
    amount: string | number | bigint,
    fee: string | number | bigint,
    toAddr: string,
    coins: string[] | number[] | bigint[] | undefined,
    ttl: string | number | bigint) {
    const uniqueId_0 = Buffer.from(uniqueId, 'hex');
    assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const smgId_0 = Buffer.from(smgId, 'hex');
    assert(smgId_0.length === 32, `smgId must be 32 bytes long`);
    const tokenPairId_0 = BigInt(tokenPairId);
    const amount_0 = BigInt(amount);
    const fee_0 = BigInt(fee);
    const toAddr_0 = toAddr.includes('mn_shield') ? { bytes: getCoinPublicKeyFromShieldAddress(toAddr) } : { bytes: getUserAddressFromUnshieldAddress(toAddr) };

    const ttl_0 = BigInt(ttl);
    return {
      uniqueId: uniqueId_0,
      smgId: smgId_0,
      tokenPairId: tokenPairId_0,
      amount: amount_0,
      fee: fee_0,
      toAddr: toAddr_0,
      ttl: ttl_0,
    }

  }

  async getTokenPairInfo(tokenPairId: bigint | string | number): Promise<CrossChain.TokenPairInfo | undefined> {
    const ledger = await this.getLedgerState();
    return ledger?.tokenPairs.lookup(BigInt(tokenPairId));
  }

  async getTokensTotalSupply(tokens: string[]) {
    const ledger = await this.getLedgerState();
    const tokensTotalSupply = tokens.map((token) => {
      const token_0 = Buffer.from(token, 'hex');
      const totalSupply = ledger?.mappingTokenTotalSupply.member(token_0) ? ledger?.mappingTokenTotalSupply.lookup(token_0).toString(10) : '0';
      return { token, totalSupply };
    });
    return tokensTotalSupply;
  }


  // static getCurrentInBoundCrossTxs(ledger: CrossChain.Ledger) {
  //   let res = [];
  //   for (const smgEvent of ledger.currentExecuteCrossProposal) {
  //     res.push({
  //       smgId: toHex(smgEvent.crossProposal.smgId)
  //     , uniqueId: toHex(smgEvent.uniqueId)
  //     , token: toHex(smgEvent.crossProposal.token)
  //     , tokenPairId: smgEvent.crossProposal.tokenPairId.toString(10)
  //     , isMappingToken: smgEvent.crossProposal.isMappingToken
  //     , amount: smgEvent.crossProposal.amount.toString(10)
  //     , fee: smgEvent.crossProposal.fee.toString(10)
  //     , toAddr: toHex(smgEvent.crossProposal.toAddr.bytes)
  //     , ttl: smgEvent.crossProposal.ttl.toString(10)
  //     });
  //   }
  //   return res;
  // }

  static getCrossTxInfo(ledger: CrossChain.Ledger, uniqueId: string) {
    const uniquId_0 = Buffer.from(uniqueId, 'hex');
    if (ledger.crossProposal.member(uniquId_0)) {
      const crossTxInfo = ledger.crossProposal.lookup(uniquId_0);
      return {
        smgId: toHex(crossTxInfo.smgId),
        token: toHex(crossTxInfo.token),
        tokenPairId: crossTxInfo.tokenPairId.toString(10),
        amount: crossTxInfo.amount.toString(10),
        fee: crossTxInfo.fee.toString(10),
        toAddr: crossTxInfo.toAddr,
        ttl: crossTxInfo.ttl.toString(10),
      }
    }
  }

  static parseContractState(stateHex: string): CrossChain.Ledger | undefined {
    const state = ContractState.deserialize(Buffer.from(stateHex, 'hex'));
    return CrossChain.ledger(state.data);
  }

  static currentExecuteCrossProposal(ledger: CrossChain.Ledger) {
    const smgEvent = ledger.currentExecuteCrossProposal;
    return {
      smgId: toHex(smgEvent.crossProposal.smgId)
      , uniqueId: toHex(smgEvent.uniqueId)
      , token: toHex(smgEvent.crossProposal.token)
      , tokenPairId: smgEvent.crossProposal.tokenPairId.toString(10)
      , isMappingToken: smgEvent.crossProposal.isMappingToken
      , amount: smgEvent.crossProposal.amount.toString(10)
      , fee: smgEvent.crossProposal.fee.toString(10)
      , toAddr: toHex(smgEvent.crossProposal.toAddr.bytes)
      , ttl: smgEvent.crossProposal.ttl.toString(10)
    };
  }

  static latestOutBoundCrosstxInfo(ledger: CrossChain.Ledger) {
    if (ledger.latestOutBoundCrosstxInfo.tokenPairId === 0n) { return }
    else {
      return {
        smgId: toHex(ledger.latestOutBoundCrosstxInfo.smgId),
        fromAddr: toHex(ledger.latestOutBoundCrosstxInfo.fromAddr.bytes),
        toAddr: ledger.latestOutBoundCrosstxInfo.toAddr,
        tokenPairId: ledger.latestOutBoundCrosstxInfo.tokenPairId.toString(10),
        tokenAccount: ledger.latestOutBoundCrosstxInfo.tokenAccount,
        amount: ledger.latestOutBoundCrosstxInfo.amount.toString(10),
        fee: ledger.latestOutBoundCrosstxInfo.fee.toString(10),
        // nonce: ledger.latestOutBoundCrosstxInfo.nonce.toString(10),
      }
    }
  }

  async isVoter(ledger: CrossChain.Ledger, voter: string | undefined) {
    let voterPK;
    if (voter) {
      voterPK = getCoinPublicKeyFromShieldAddress(voter);
    } else {
      voterPK = fromHex(this.providers.walletProvider.getCoinPublicKey());
    }
    return ledger.smgTxSigners.member({ bytes: voterPK });
  }

  async getUnVotedCrossProposal(ledger: CrossChain.Ledger, voter: string | undefined) {
    let voterPK;
    if (voter) {
      voterPK = getCoinPublicKeyFromShieldAddress(voter);
    } else {
      voterPK = fromHex(this.providers.walletProvider.getCoinPublicKey());
    }
    if (!this.isVoter(ledger, voter)) return [];
    const voterIndex = ledger.smgTxSigners.lookup({ bytes: voterPK });
    let res = [];
    for (const [uniqueId, _] of ledger.crossProposal) {
      const voters = ledger.crossProposalVoters.lookup(uniqueId);
      if (voters.size() >= ledger.smgPKThreshold) continue;
      if (voters.member(voterIndex)) continue;
      else {
        const crossTxInfo = CrossChainApi.getCrossTxInfo(ledger, toHex(uniqueId));
        res.push({ uniqueId: toHex(uniqueId), ...crossTxInfo });
      }
    }
    return res;
  }

  async getUnExecuteCrossProposal(ledger: CrossChain.Ledger) {
    // const selfPk = this.providers.walletProvider.coinPublicKey;
    // const voterIndex = ledger.smgTxSigners.lookup({ bytes: fromHex(selfPk) });
    let res = [];
    for (const [uniqueId, crossProposal] of ledger.crossProposal) {
      const voters = ledger.crossProposalVoters.lookup(uniqueId);
      if (voters.size() >= ledger.smgPKThreshold) {
        res.push({
          uniqueId: toHex(uniqueId),
          smgId: toHex(crossProposal.smgId),
          tokenPairId: crossProposal.tokenPairId.toString(10),
          token: toHex(crossProposal.token),
          amount: crossProposal.amount.toString(10),
          fee: crossProposal.fee.toString(10),
          toAddr: toHex(crossProposal.toAddr.bytes),
          ttl: crossProposal.ttl.toString(10)
        })
      }
    }

    return res;
  }


  /////////////////////////////////////////////////  Cross Tx  /////////////////////////////////////////////////////////////
  async userLock(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint) {
    const smgId_0 = Buffer.from(smgId, 'hex');
    assert(smgId_0.length === 32, `smgId must be 32 bytes long`);

    const tokenPair_0 = BigInt(tokenPair);
    // const pairInfo = await this.getTokenPairInfo(tokenPair_0);
    // assert(pairInfo, `tokenPairId ${tokenPair} not found`);
    const amount_0 = BigInt(amount);
    // const token = pairInfo.midnigthTokenAccount;//encodeRawTokenType(
    // const coin_0 = coinInfo(token, amount_0);
    const finalizedTxData = await this.crossChainContract.callTx.userLock(smgId_0, toAddress, tokenPair_0, amount_0);
    return finalizedTxData;
  }

  async smgRelease(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint
    , fee: string | number | bigint, toAddr: string
    , ttl: number) {

    const proof = this.checkCrossData(uniqueId, smgId, tokenPair, amount, fee, toAddr, undefined, ttl);
    const finalizedTxData = await this.crossChainContract.callTx.smgRelease(
      proof.uniqueId, proof.smgId, proof.tokenPairId, proof.amount, proof.toAddr, proof.fee, proof.ttl);
    return finalizedTxData;
  }

  async smgMint(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint
    , fee: string | number | bigint, toAddr: string
    , ttl: number): Promise<FinalizedCallTxData<CrossChainContract, "smgMint">> {

    const proof = this.checkCrossData(uniqueId, smgId, tokenPair, amount, fee, toAddr, undefined, ttl);
    const finalizedTxData = await this.crossChainContract.callTx.smgMint(proof.uniqueId, proof.smgId, proof.tokenPairId, proof.amount, proof.fee, proof.toAddr, proof.ttl);
    return finalizedTxData;
  }

  async userBurn(smgId: string, toAddress: string, tokenPair: string | number | bigint
    , amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "userBurn">> {
    const smgId_0 = Buffer.from(smgId, 'hex');
    assert(smgId_0.length === 32, `smgId must be 32 bytes long`);

    const tokenPair_0 = BigInt(tokenPair);
    const pairInfo = await this.getTokenPairInfo(tokenPair_0);
    assert(pairInfo, `tokenPairId ${tokenPair} not found`);
    const amount_0 = BigInt(amount);
    const token = decodeRawTokenType(pairInfo.midnigthTokenAccount);
    // const coin_0 = shieldedCoinInfo(token, amount_0);

    const finalizedTxData = await this.crossChainContract.callTx.userBurn(smgId_0, toAddress, tokenPair_0, amount_0);
    return finalizedTxData;
  }

  async voteCrossProposal(uniqueId: string, ttl: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "voteMultiCrossProposal">> {
    const uniqueId_0 = Buffer.from(uniqueId, 'hex');
    const ttl_0 = BigInt(ttl);
    assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);

    const maxCount = 5;
    let items = [{ uniqueId: uniqueId_0, ttl: ttl_0 }];
    for (let index = 1; index < maxCount; index++) {
      items.push({ uniqueId: Buffer.alloc(32, 0), ttl: 0n });
    }
    const finalizedTxData = await this.crossChainContract.callTx.voteMultiCrossProposal(items);
    return finalizedTxData;
  }

  async voteMultiCrossProposal(uniqueIds: { uniqueId: string, ttl: string | number | bigint }[]): Promise<FinalizedCallTxData<CrossChainContract, "voteMultiCrossProposal">> {
    const uniqueIds_0 = uniqueIds.map((item) => {
      const uniqueId_0 = Buffer.from(item.uniqueId, 'hex');
      const ttl_0 = BigInt(item.ttl);
      assert(uniqueId_0.length === 32, `uniqueId(${uniqueId_0}) must be 32 bytes long`);
      return { uniqueId: uniqueId_0, ttl: ttl_0 };
    });

    const maxCount = 5;
    assert(uniqueIds_0.length <= maxCount && uniqueIds_0.length > 0, `uniqueIds length must be between 1 and ${maxCount}`);
    for (let index = uniqueIds_0.length; index < maxCount; index++) {
      uniqueIds_0.push({ uniqueId: Buffer.alloc(32), ttl: BigInt(0) });
    }

    const finalizedTxData = await this.crossChainContract.callTx.voteMultiCrossProposal(uniqueIds_0);
    return finalizedTxData;
  }

  async executeCrossProposal(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "executeCrossProposal">> {
    const uniqueId_0 = Buffer.from(uniqueId, 'hex');
    assert(uniqueId_0.length === 32, `uniqueId(${uniqueId_0}) must be 32 bytes long`);

    const finalizedTxData = await this.crossChainContract.callTx.executeCrossProposal(uniqueId_0);
    return finalizedTxData;
  }

  // async userRechargeForFee(amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "userRechargeForFee">> {
  //   const amount_0 = BigInt(amount);
  //   const finalizedTxData = await this.crossChainContract.callTx.userRechargeForFee(amount_0);
  //   return finalizedTxData;
  // }

  // async approveUserWithdrawFee(user: string): Promise<FinalizedCallTxData<CrossChainContract, "approveUserWithdrawFee">> {
  //   const key_0 = { bytes: getCoinPublicKeyFromShieldAddress(user) };
  //   const ledgerState = await this.getLedgerState();
  //   assert(ledgerState != null, `ledgerState is null`);

  //   // const amount_0 = BigInt(amount);
  //   // const balance_0 = ledgerState.userFeeBalance.lookup(key_0);
  //   // assert(balance_0 >= amount_0, `user ${user} has not enough fee balance real (${balance_0}) vs withdraw ${amount_0}`);

  //   const finalizedTxData = await this.crossChainContract.callTx.approveUserWithdrawFee(key_0);
  //   return finalizedTxData;
  // }

  // async userClaim(uniqueId: string) {
  //   const uniqueId_0 = Buffer.from(uniqueId, 'hex');
  //   assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);

  //   const finalizedTxData = await this.crossChainContract.callTx.userClaim(uniqueId_0);
  //   return finalizedTxData;
  // }

  // async userFeeWithdrawRequest(receiptor: UserAddress) {
  //   const receiptor_0 = { bytes: encodeUserAddress(receiptor) };
  //   const finalizedTxData = await this.crossChainContract.callTx.userFeeWithdrawRequest(receiptor_0);
  //   return finalizedTxData;
  // }

  // async userClaimCoin(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "userClaimCoin">> {
  //   const uniqueId_0 = Buffer.from(uniqueId, 'hex');
  //   assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);

  //   const finalizedTxData = await this.crossChainContract.callTx.userClaimCoin(uniqueId_0);
  //   return finalizedTxData;
  // }

  // async userClaimMappingToken(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "userClaimMappingToken">> {
  //   const uniqueId_0 = Buffer.from(uniqueId, 'hex');
  //   assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);

  //   const finalizedTxData = await this.crossChainContract.callTx.userClaimMappingToken(uniqueId_0);
  //   return finalizedTxData;
  // }


  // async addReserve(token: ShieldedTokenType, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addReserve">> {
  //   const amount_0 = BigInt(amount);
  //   const coin_0 = shieldedCoinInfo(token.raw, amount_0);
  //   const finalizedTxData = await this.crossChainContract.callTx.addReserve(coin_0);
  //   return finalizedTxData;
  // }

  // async withdrawReserveOfShieldedToken(token: TokenType, coinIndex: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfShieldedToken">> {
  //   assert(token.tag == 'shielded', "not shielded token");
  //   const coinIndex_0 = BigInt(coinIndex);
  //   const token_0 = encodeRawTokenType((token as ShieldedTokenType).raw);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfShieldedToken(token_0, coinIndex_0);
  //   return finalizedTxData;
  // }

  // async withdrawReserveOfShieldedMappingToken(domainSep: string): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfShieldedMappingToken">> {
  //   assert(domainSep.length <= 64, "domainsep length must <= 64");
  //   const token_0 = pad(domainSep, 32);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfShieldedMappingToken(token_0);
  //   return finalizedTxData;
  // }

  // async withdrawReserveOfUnshieldedToken(token: TokenType): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfUnshieldedToken">> {
  //   assert(token.tag == 'unshielded', "not shielded token");
  //   // const coinIndex_0 = BigInt(coinIndex);
  //   const token_0 = encodeRawTokenType((token as UnshieldedTokenType).raw);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfUnshieldedToken(token_0);
  //   return finalizedTxData;
  // }

  // async withdrawReserveOfUnshieldedMappingToken(domainSep: string): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfUnshieldedMappingToken">> {
  //   assert(domainSep.length <= 64, "domainsep length must <= 64");
  //   const token_0 = pad(domainSep, 32);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfUnshieldedMappingToken(token_0);
  //   return finalizedTxData;
  // }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async getLedgerState(): Promise<CrossChain.Ledger | null> {
    assertIsContractAddress(this.crossChainContract?.deployTxData.public.contractAddress);
    const state = await this.providers.publicDataProvider
      .queryContractState(this.crossChainContract?.deployTxData.public.contractAddress)
      .then((contractState) => (contractState != null ? CrossChain.ledger(contractState.data) : null));
    return state;
  }

  ///////////////////////////////////////////////        management      ////////////////////////////////////////////////////////
  async transferOwner(newOwner: string): Promise<FinalizedCallTxData<CrossChainContract, "transferOwner">> {
    const newOwner_0 = { bytes: getCoinPublicKeyFromShieldAddress(newOwner) };
    const finalizedTxData = await this.crossChainContract.callTx.transferOwner(newOwner_0);
    return finalizedTxData;
  }

  async acceptOwner(): Promise<FinalizedCallTxData<CrossChainContract, "acceptOwner">> {
    const finalizedTxData = await this.crossChainContract.callTx.acceptOwner();
    return finalizedTxData;
  }

  async updateSmgPk(newVoter: string): Promise<FinalizedCallTxData<CrossChainContract, "updateSmgPk">> {
    const newVoter_0 = { bytes: getCoinPublicKeyFromShieldAddress(newVoter) };
    const finalizedTxData = await this.crossChainContract.callTx.updateSmgPk(newVoter_0);
    return finalizedTxData;
  }

  async setFeeReceiver(feeReceiver: UserAddress): Promise<FinalizedCallTxData<CrossChainContract, "setFeeReceiver">> {
    const feeReceiver_0 = { bytes: getUserAddressFromUnshieldAddress(feeReceiver) };
    const finalizedTxData = await this.crossChainContract.callTx.setFeeReceiver(feeReceiver_0);
    return finalizedTxData;
  }

  async setTokenManager(tokenManager: string): Promise<FinalizedCallTxData<CrossChainContract, "setTokenManager">> {
    const tokenManager_0 = { bytes: getCoinPublicKeyFromShieldAddress(tokenManager) };
    const finalizedTxData = await this.crossChainContract.callTx.setTokenManager(tokenManager_0);
    return finalizedTxData;
  }


  async addAdmin(admin: string): Promise<FinalizedCallTxData<CrossChainContract, "addAdmin">> {
    const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
    const finalizedTxData = await this.crossChainContract.callTx.addAdmin(admin_0);
    return finalizedTxData;
  }

  async removeAdmin(admin: string): Promise<FinalizedCallTxData<CrossChainContract, "removeAdmin">> {
    const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
    const finalizedTxData = await this.crossChainContract.callTx.removeAdmin(admin_0);
    return finalizedTxData;
  }

  async setAdminThreshold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setAdminThreshold">> {
    const threshold_0 = BigInt(threshold);
    if (threshold_0 < 1n) throw 'threshold must be greater than 0';
    const finalizedTxData = await this.crossChainContract.callTx.setAdminThreshold(threshold_0);
    return finalizedTxData;
  }

  async setSmgPksks(voters: string[]): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPksks">> {
    assert(voters.length > 0, 'voters must not be empty');
    const voters_0 = voters.map(voter => {
      return { bytes: getCoinPublicKeyFromShieldAddress(voter) }
      // return { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(voter, getZswapNetworkId())) } 
    });
    for (let index = voters_0.length; index < MAX_SIGNER_COUNT; index++) {
      voters_0.push({ bytes: Buffer.alloc(32) });
    }
    const finalizedTxData = await this.crossChainContract.callTx.setSmgPksks(voters_0);
    return finalizedTxData;
  }

  async setSmgPKThreold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPKThreold">> {
    const threshold_0 = BigInt(threshold);
    const finalizedTxData = await this.crossChainContract.callTx.setSmgPKThreold(threshold_0);
    return finalizedTxData;
  }

  async setFeeCommonConfig(chainId: number | string | bigint, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setFeeCommonConfig">> {
    const chainId_0 = BigInt(chainId);
    const fee_0 = BigInt(fee);
    const finalizedTxData = await this.crossChainContract.callTx.setFeeCommonConfig(chainId_0, fee_0);
    return finalizedTxData;
  }

  async addTokenPair(tokenPairId: number | string | bigint, fromChainId: number | string | bigint
    , toChainId: number | string | bigint, midnigthTokenAccount: RawTokenType
    , domainSep: string, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addTokenPair">> {
    const tokenPairId_0 = BigInt(tokenPairId);
    const fromChainId_0 = BigInt(fromChainId);
    const toChainId_0 = BigInt(toChainId);
    const midnigtAccount_0 = Buffer.from(midnigthTokenAccount, 'hex');//encodeRawTokenType(midnigthTokenAccount);
    const domainSep_0 = pad(domainSep, 32);
    if (domainSep) {
      const expectedTokenType = rawTokenType(domainSep_0, this.crossChainContract.deployTxData.public.contractAddress);
      assert(expectedTokenType == midnigthTokenAccount, `token type not match ,${expectedTokenType} expected but got ${midnigthTokenAccount}`);
    }

    const fee_0 = BigInt(fee);
    const tokenPair: CrossChain.TokenPairInfo = {
      fromChainId: fromChainId_0,
      toChainId: toChainId_0,
      midnigthTokenAccount: midnigtAccount_0,
      domainSep: domainSep_0,
      fee: fee_0
    }
    const finalizedTxData = await this.crossChainContract.callTx.addTokenPair(tokenPairId_0, tokenPair);
    return finalizedTxData;
  }

  async removeTokenPair(tokenPairId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "removeTokenPair">> {
    const tokenPairId_0 = BigInt(tokenPairId);
    const finalizedTxData = await this.crossChainContract.callTx.removeTokenPair(tokenPairId_0);
    return finalizedTxData;
  }

  async newProposal(proposal: CrossChain.Proposal): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">> {
    const finalizedTxData = await this.crossChainContract.callTx.newProposal(proposal);
    return finalizedTxData;
  }

  async addAdminProposal(addr: string): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">> {
    // const addr_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(addr, getZswapNetworkId())) };
    const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.pType = CrossChain.ProposalType.AddAdmin;
    proposal.addr = addr_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  async removeAdminProposal(addr: string) {
    const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.pType = CrossChain.ProposalType.RemoveAdmin;
    proposal.addr = addr_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  async updateFeeReceiver(addr: string) {
    const addr_0 = { bytes: getUserAddressFromUnshieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.pType = CrossChain.ProposalType.UpdateFeeReceiver;
    proposal.addr = addr_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  async updateTokenManagerProposal(addr: string) {
    const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.pType = CrossChain.ProposalType.UpdateTokenManager;
    proposal.addr = addr_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  async updateAdminThresholdProposal(threshold: number | string | bigint) {
    const threshold_0 = BigInt(threshold);
    let proposal = this.defaultProsal();
    proposal.pType = CrossChain.ProposalType.UpdateAdminThreshold;
    proposal.threshold = threshold_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  defaultProsal(): CrossChain.Proposal {
    return {
      pType: CrossChain.ProposalType.UpdateAdminThreshold,
      addr: { bytes: fromHexWithOrNoPrefix("") },
      addrUnshielded: { bytes: fromHexWithOrNoPrefix("") },
      threshold: BigInt(0),
      feeConfig: { fee: BigInt(0), chainId: BigInt(0) },
      smgPubkeys: new Array(this.MaxSmgSignators).fill({ x: 0n, y: 0n })
    };
  }
  async updateSMGPKThresholdProposal(threshold: number | string | bigint) {
    const threshold_0 = BigInt(threshold);
    let proposal = this.defaultProsal();
    proposal.pType = CrossChain.ProposalType.UpdateSMGPKThreshold;
    proposal.threshold = threshold_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  async updateFeeCommonConfigProposal(chainId: number | string | bigint, fee: number | string | bigint) {
    const chainId_0 = BigInt(chainId);
    const fee_0 = BigInt(fee);

    let proposal = this.defaultProsal();
    proposal.pType = CrossChain.ProposalType.UpdateFeeCommonConfig;
    proposal.feeConfig = { fee: fee_0, chainId: chainId_0 };

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  // //////////////////////////////////////////////////////////////////////////////////////////
  async voteProposal(proposalId: number | string | bigint) {
    const proposalId_0 = BigInt(proposalId);
    const finalizedTxData = await this.crossChainContract.callTx.voteProposal(proposalId_0);
    return finalizedTxData;
  }

  async executeProposal(proposalId: number | string | bigint) {
    const proposalId_0 = BigInt(proposalId);
    const finalizedTxData = await this.crossChainContract.callTx.executeProposal(proposalId_0);
    return finalizedTxData;
  }

  async removeExpiredHisTxs(txs: string[]) {
    assert(txs.length <= 20, 'txs length should be less than 20');
    const txs_0 = txs.map((tx) => Buffer.from(tx, 'hex'));
    for (let index = txs_0.length; index < 20; index++) {
      txs_0.push(Buffer.alloc(32));
    }
    const finalizedTxData = await this.crossChainContract.callTx.removeExpiredHisTxs(txs_0);
    return finalizedTxData;
  }

  async updateContractAuthority(newKey: SigningKey) {
    // return await this.crossChainContract.contractMaintenanceTx.replaceAuthority(newKey);
  }

  async upgradeContract(circuitId: CrossChainCircuits, newCircuitHex: string | undefined) {
    let newVK;
    if (newCircuitHex) {
      newVK = createVerifierKey(fromHex(newCircuitHex));
    } else {
      newVK = await this.providers.zkConfigProvider.getVerifierKey(circuitId as CrossChainCircuits);
    }

    // const res1 = this.crossChainContract.circuitMaintenanceTx.removeVerifierKey();
    // const res2 = await this.crossChainContract.circuitMaintenanceTx[circuitId].insertVerifierKey(newVK);
    // return res2;
  }

  // async addCircuite(circuitId: CrossChainCircuits, newCircuitHex: string){
  //   const newVK = createVerifierKey(fromHex(newCircuitHex));
  //   return await this.crossChainContract.circuitMaintenanceTx.foo.insertVerifierKey(newVK);
  // }

}

export const upgradeContractCircuit = async (providers: MidnightProviders, contractAddress: string, circuitId: string, newVkHex: string | undefined) => {
  assertIsContractAddress(contractAddress);
  let newVk;
  if (newVkHex) {
    newVk = createVerifierKey(fromHex(newVkHex));
  } else {
    newVk = await providers.zkConfigProvider.getVerifierKey(circuitId as CrossChainCircuits);
  }
  const contractState = await providers.publicDataProvider.queryContractState(contractAddress);
  if (contractState?.operation(circuitId as CrossChainCircuits)) {
    const finalizedTxData = await submitRemoveVerifierKeyTx(providers, CompiledSimpleContract, contractAddress, circuitId as CrossChainCircuits);
    // logger.info(`remove old circuit Transaction ${finalizedTxData.txHash} added in block ${finalizedTxData.blockHeight}`);
  }

  const finalizedTxData = await submitInsertVerifierKeyTx(providers, CompiledSimpleContract, contractAddress, circuitId as CrossChainCircuits, newVk);
  // logger.info(`insert new circuit Transaction ${finalizedTxData.txHash} added in block ${finalizedTxData.blockHeight}`);
  return finalizedTxData;
}

// export const upgradeContractCircuit = async (providers: MidnightProviders, contractAddress: string, circuitId: string, newVkHex: string | undefined) => {
//   assertIsContractAddress(contractAddress);
//   let newVk;
//   if (newVkHex) {
//     newVk = createVerifierKey(fromHex(newVkHex));
//   } else {
//     newVk = await providers.zkConfigProvider.getVerifierKey(circuitId as CrossChainCircuits);
//   }
//   return await submitInsertVerifierKeyTx(providers, CompiledSimpleContract,contractAddress, circuitId as CrossChainCircuits, newVk);
// }

export const removeContractCircuit = async (providers: MidnightProviders, contractAddress: string, circuitId: string) => {
  assertIsContractAddress(contractAddress);
  const finalizedTxData = await submitRemoveVerifierKeyTx(providers, CompiledSimpleContract, contractAddress, circuitId as CrossChainCircuits);
  return finalizedTxData;
}

export const genSigningKey = () => {
  return sampleSigningKey();
}

// export const genRandomBigint = () => {
//   const r = transientHash<SigningKey>(new CompactTypeOpaqueString(), sampleCoinPublicKey());
//   return r;
// }

// export const configureProviders = async (wallet: WalletFacade & Resource, config: Config) => {
//   const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
//   // console.log('^^^^^^^^^^^^^^',ZKConfig.zkConfigPath)
//   return {
//     privateStateProvider: levelPrivateStateProvider<typeof CrossChainPrivateStateId>({
//       privateStateStoreName: ZKConfig.privateStateStoreName,
//     }),
//     publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
//     zkConfigProvider: new NodeZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath),
//     proofProvider: httpClientProofProvider(config.proofServer),
//     walletProvider: walletAndMidnightProvider,
//     midnightProvider: walletAndMidnightProvider,
//   };
// };

// export const getShieldAddressFromCoinPublicKey = (coinPublicKey: Buffer, networkId?: string) => {
//   const shieldAddr = ShieldedAddress.codec.encode(
//     networkId || getZswapNetworkId(),
//     {
//       coinPublicKey: { data: coinPublicKey },
//     }
//   );
//   return MidnightBech32m.stringify(shieldAddr);
// }

export const getCoinPublicKeyFromShieldAddress = (shieldAddr: string) => {
  const tmp1 = MidnightBech32m.parse(shieldAddr);
  // const tmp1 = MidnightBech32m.parse('mn_shield-addr_test10th0dtqgnpanzwmqj236zccpkmj9xxpkl7r7e7cr5e3v7k0stm5qxqxa9m6z5f4603nyuu4kw9c65ektu48hhyrtu2f07h42ycppkvw9ccyry600');
  const tmp2 = ShieldedAddress.codec.decode(tmp1.network, tmp1);
  // console.log('coinPublicKeyString:', toHex(tmp2.coinPublicKey.data));
  return tmp2.coinPublicKey.data;
}

export const getUserAddressFromUnshieldAddress = (unshieldAddr: string) => {
  const tmp1 = MidnightBech32m.parse(unshieldAddr);
  // const tmp1 = MidnightBech32m.parse('mn_shield-addr_test10th0dtqgnpanzwmqj236zccpkmj9xxpkl7r7e7cr5e3v7k0stm5qxqxa9m6z5f4603nyuu4kw9c65ektu48hhyrtu2f07h42ycppkvw9ccyry600');
  const tmp2 = UnshieldedAddress.codec.decode(tmp1.network, tmp1);
  // console.log('coinPublicKeyString:', toHex(tmp2.coinPublicKey.data));
  return tmp2.data;
}

export const getUnshieldAddressFromUserAddress = (userAddrHex: string, networkId?: string) => {
  const unshieldAddr = UnshieldedAddress.codec.encode(
    networkId || getNetworkId(),
    new UnshieldedAddress(fromHex(userAddrHex))
  );
  return unshieldAddr.asString();
}

export * as ledgerV8 from '@midnight-ntwrk/ledger-v8';
export * as midnightjsutils from '@midnight-ntwrk/midnight-js-utils';

//only support 
// • 'mainnet' — Production network
// • 'testnet-02' — Public testnet
// • 'preview' — Preview network
// • 'devnet' — Development network
// • 'undeployed' — Local testing
export const initNetwork = (network: 'mainnet' | 'testnet-02' | 'preview' | 'devnet' | 'undeployed') => {
  setNetworkId(network);
}


export class CrossChainState {
  publicDataProvider!: PublicDataProvider;
  contractAddress!: string;
  MaxSmgSignators = 29;
  MaxMergeCoins = 4;
  constructor(indexer: string, indexerWS: string, contractAddress: string) {
    assertIsContractAddress(contractAddress);
    this.publicDataProvider = indexerPublicDataProvider(indexer, indexerWS);
    this.contractAddress = contractAddress;
  }

  async getLedgerState(): Promise<CrossChain.Ledger | null> {
    const state = await this.publicDataProvider
      .queryContractState(this.contractAddress)
      .then((contractState) => (contractState != null ? CrossChain.ledger(contractState.data) : null));
    return state;
  }

}
export const getContractState = async (config:Config, contractAddress: string) => {
  assertIsContractAddress(contractAddress);
  const publicDataProvider = indexerPublicDataProvider(config.indexer, config.indexerWS);
  const state = await publicDataProvider
    .queryContractState(contractAddress)
    .then((contractState) => (contractState != null ? CrossChain.ledger(contractState.data) : null));
  return state;
}
