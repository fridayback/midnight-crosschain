/*
 * @Author: liulin 
 * @Date: 2025-06-20 12:02:08
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-10-13 15:55:12
 * @FilePath: /midnight-crosschain/contract/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// export * as CrossChain from "./managed/crosschain/contract/index.cjs";
// export * from "./witnesses.js";

import path from 'node:path';


// import { witnesses, type CrossChainPrivateState } from './witnesses.js';
import * as CrossChain from "./managed/crosschain/contract/index.cjs";

import { createBalancedTx, type BalancedTransaction, type ImpureCircuitId, type MidnightProvider, type MidnightProviders, type UnbalancedTransaction, type WalletProvider, type FinalizedTxData, SucceedEntirely, getImpureCircuitIds } from '@midnight-ntwrk/midnight-js-types';
import { deployContract, FinalizedCallTxData, findDeployedContract, type DeployedContract, type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { Address, CoinPublicKey, Wallet } from '@midnight-ntwrk/wallet-api';
import { CoinInfo, decodeTokenType, encodeTokenType, Transaction, TransactionId, tokenType, communicationCommitmentRandomness, sampleCoinPublicKey, encodeCoinInfo, createCoinInfo, ContractState, nativeToken } from '@midnight-ntwrk/ledger';
import { TokenType, Transaction as ZswapTransaction } from '@midnight-ntwrk/zswap';
import { getLedgerNetworkId, getZswapNetworkId, NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { assertIsContractAddress, fromHex, parseCoinPublicKeyToHex, toHex } from '@midnight-ntwrk/midnight-js-utils';
import { MidnightBech32m, ShieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
import * as Rx from 'rxjs';
import { addField, CompactTypeBytes, CompactTypeCurvePoint, CompactTypeOpaqueString, CompactTypeOpaqueUint8Array, CompactTypeUnsignedInteger, CompactTypeVector, ContractAddress, convert_Uint8Array_to_bigint, degradeToTransient, ecAdd, ecMul, ecMulGenerator, EncodedCoinInfo, mulField, persistentHash, sampleSigningKey, SigningKey, transientHash } from '@midnight-ntwrk/compact-runtime';
import { Resource, WalletBuilder } from '@midnight-ntwrk/wallet';
import {createVerifierKey, type VerifierKey} from '@midnight-ntwrk/midnight-js-types';
import assert from 'node:assert';

export type CrossChainCircuits = ImpureCircuitId<CrossChain.Contract<CrossChainPrivateState>>;

export const CrossChainPrivateStateId = 'crossChainPrivateState';

export type CrossChainProviders = MidnightProviders<CrossChainCircuits, typeof CrossChainPrivateStateId, CrossChainPrivateState>;

export type CrossChainContract = CrossChain.Contract<CrossChainPrivateState>;

export type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;

// export const currentDir = path.resolve(new URL(__dirname).pathname, '..');
export const currentDir = path.resolve(new URL(import.meta.url).pathname, '..');

export const ZKConfig = {
  privateStateStoreName: 'crosschain-private-state',
  zkConfigPath: path.resolve(currentDir, 'managed', 'crosschain'),
};


export type CrossChainPrivateState = {

}

export const createCrossChainPrivateState = () => ({
});

export const witnesses = {
  // TODO: Add witnesses
}
const coinInfo = (token: TokenType, value: bigint): EncodedCoinInfo => encodeCoinInfo(createCoinInfo(token, value));

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


export const createWalletAndMidnightProvider = async (wallet: Wallet): Promise<WalletProvider & MidnightProvider> => {
  const state = await Rx.firstValueFrom(wallet.state());
  return {
    coinPublicKey: state.coinPublicKey,
    encryptionPublicKey: state.encryptionPublicKey,
    balanceTx(tx: UnbalancedTransaction, newCoins: CoinInfo[]): Promise<BalancedTransaction> {
      return wallet
        .balanceTransaction(
          ZswapTransaction.deserialize(tx.serialize(getLedgerNetworkId()), getZswapNetworkId()),
          newCoins,
        )
        .then((tx) => wallet.proveTransaction(tx))
        .then((zswapTx) => Transaction.deserialize(zswapTx.serialize(getZswapNetworkId()), getLedgerNetworkId()))
        .then(createBalancedTx);
    },
    submitTx(tx: BalancedTransaction): Promise<TransactionId> {
      return wallet.submitTransaction(tx);
    },
  };
};

export const waitForSync = (wallet: Wallet) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(1_000),
      Rx.tap((state) => {
        const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
        const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
      }),
      Rx.filter((state) => {
        // Let's allow progress only if wallet is synced fully
        return state.syncProgress !== undefined && state.syncProgress.synced;
      }),
    ),
  );

export const waitForSyncProgress = async (wallet: Wallet) =>
  await Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(1_000),
      Rx.tap((state) => {
        const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
        const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
      }),
      Rx.filter((state) => {
        // Let's allow progress only if syncProgress is defined
        return state.syncProgress !== undefined;
      }),
    ),
  );

export const waitForFunds = (wallet: Wallet) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(10_000),
      Rx.tap((state) => {
        const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
        const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
      }),
      Rx.filter((state) => {
        // Let's allow progress only if wallet is synced
        for( const token in state.balances){
          console.log('*******',token, state.balances[token])
        }
        return state.syncProgress?.synced === true;
      }),
      Rx.map((s) => s.balances),
      // Rx.filter((balance) => balance.balance > 0n),
    ),
  );

export const buildWalletAndWaitForFunds = async (
  { indexer, indexerWS, node, proofServer }: Config,
  seed: string,
  serializedState: string | undefined
): Promise<Wallet & Resource> => {
  let wallet: Wallet & Resource;

  if (serializedState) {
    wallet = await WalletBuilder.restore(indexer, indexerWS, proofServer, node, seed, serializedState, 'info');
    wallet.start();
    const stateObject = JSON.parse(serializedState);
    if ((await isAnotherChain(wallet, Number(stateObject.offset))) === true) {
      console.warn('The chain was reset, building wallet from scratch');
      wallet = await WalletBuilder.build(
        indexer,
        indexerWS,
        proofServer,
        node,
        seed,
        getZswapNetworkId(),
        'info',
      );
      wallet.start();
      console.log('Wallet was built from scratch 1');
    }
  } else {
    console.log('Wallet save file not found, building wallet from scratch');
    wallet = await WalletBuilder.build(
      indexer,
      indexerWS,
      proofServer,
      node,
      seed,
      getZswapNetworkId(),
      'info',
    );
    wallet.start();
    console.log('Wallet was built from scratch 2');
  }

  {
    const newState = await waitForSync(wallet);
    // allow for situations when there's no new index in the network between runs
    if (newState.syncProgress?.synced) {
      console.info('Wallet was able to sync from restored state');
    } else {
      throw new Error('Wallet was not able to sync from restored state');
    }
  }
  const state = await Rx.firstValueFrom(wallet.state());
  console.info(`Your wallet address is: ${state.address}`);
  let balance = state.balances[nativeToken()];
  if (balance === undefined || balance === 0n) {
    console.info(`Your wallet balance is: 0`);
    console.info(`Waiting to receive tokens...`);
    balance = (await waitForFunds(wallet))[nativeToken()];
  }
  console.info(`Your wallet balance is: ${balance}`);
  return wallet;
};

export const isAnotherChain = async (wallet: Wallet, offset: number) => {
  await waitForSyncProgress(wallet);
  // Here wallet does not expose the offset block it is synced to, that is why this workaround
  const walletOffset = Number(JSON.parse(await wallet.serializeState()).offset);
  if (walletOffset < offset - 1) {
    console.info(`Your offset offset is: ${walletOffset} restored offset: ${offset} so it is another chain`);
    return true;
  } else {
    console.info(`Your offset offset is: ${walletOffset} restored offset: ${offset} ok`);
    return false;
  }
};

export const getSerializeWalletState = async (wallet: Wallet): Promise<string> => {
  return await wallet.serializeState();
};

export const walletAddress = async (wallet: Wallet): Promise<string> => {
  const state = await Rx.firstValueFrom(wallet.state());
  return state.address;
}

export const walletBalance = async (wallet: Wallet): Promise<Record<string, bigint>> => {
  const state = await Rx.firstValueFrom(wallet.state());
  return state.balances;
}

export class CrossChainApi {
  providers!: CrossChainProviders;
  crossChainContract!: DeployedCrossChainContract;
  MaxSmgSignators = 29;
  MaxMergeCoins = 4;
  constructor() {
    // setNetworkId(networkId);
  }

  async init(config: Config, wallet: Wallet) {
    const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
    this.providers = {
      privateStateProvider: levelPrivateStateProvider<typeof CrossChainPrivateStateId>({
        privateStateStoreName: 'CCPSSN',
      }),
      publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
      zkConfigProvider: new NodeZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath),
      proofProvider: httpClientProofProvider(config.proofServer),
      walletProvider: walletAndMidnightProvider,
      midnightProvider: walletAndMidnightProvider,
    };
  }

  async deployContract(adminThreshold: number | string | bigint, smgPkThreshold: number | string | bigint, signingKey: SigningKey): Promise<ContractAddress> {
    this.crossChainContract = await deployContract(this.providers, {
      contract: crosschainContractInstance,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {},
      signingKey: signingKey,
      args: [BigInt(adminThreshold), BigInt(smgPkThreshold)]
    });
    // // logger.info(`Deployed contract at address: ${this.crossChainContract.deployTxData.public.contractAddress}`);
    return this.crossChainContract.deployTxData.public.contractAddress;
  }

  async join(contractAddress: ContractAddress): Promise<void> {
    this.crossChainContract = await findDeployedContract(this.providers, {
      contractAddress,
      contract: crosschainContractInstance,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {},
    });
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
    const toAddr_0 = { bytes: getCoinPublicKeyFromShieldAddress(toAddr) };

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

  static parseContractState(stateHex: string): CrossChain.Ledger | undefined {
    const state = ContractState.deserialize(fromHex(stateHex), getZswapNetworkId());
    return CrossChain.ledger(state.data);
  }

  static currentExecuteCrossProposal(ledger: CrossChain.Ledger): string {
    return toHex(ledger.currentExecuteCrossProposal);
  }

  static latestOutBoundCrosstxInfo(ledger: CrossChain.Ledger) {
    return {
      smgId: toHex(ledger.latestOutBoundCrosstxInfo.smgId),
      fromAddr: toHex(ledger.latestOutBoundCrosstxInfo.fromAddr.bytes),
      toAddr: ledger.latestOutBoundCrosstxInfo.toAddr,
      tokenPairId: ledger.latestOutBoundCrosstxInfo.tokenPairId.toString(10),
      amount: ledger.latestOutBoundCrosstxInfo.amount.toString(10),
      fee: ledger.latestOutBoundCrosstxInfo.fee.toString(10),
      nonce: ledger.latestOutBoundCrosstxInfo.nonce.toString(10),
    }
  }

  async getUnVotedCrossProposal(ledger: CrossChain.Ledger): Promise<string[]> {
    const selfPk = this.providers.walletProvider.coinPublicKey;
    const voterIndex = ledger.smgTxSigners.lookup({ bytes: fromHex(selfPk) });
    let res = [];
    for (const [uniquId, _] of ledger.crossProposal) {
      const voters = ledger.crossProposalVoters.lookup(uniquId);
      if (voters.member(voterIndex)) continue;
      else {
        res.push(toHex(uniquId));
      }
    }
    return res;
  }

  async getUnExecuteCrossProposal(ledger: CrossChain.Ledger) {
    const selfPk = this.providers.walletProvider.coinPublicKey;
    const voterIndex = ledger.smgTxSigners.lookup({ bytes: fromHex(selfPk) });
    let res = [];
    for (const [uniquId, crossProposal] of ledger.crossProposal) {
      const voters = ledger.crossProposalVoters.lookup(uniquId);
      if (voters.size() >= ledger.smgPKThreshold) {
        res.push({
          uniqueId: toHex(uniquId),
          smgId: toHex(crossProposal.smgId),
          tokenPairId: toHex(crossProposal.token),
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
  async userLock(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "userLock">
  > {
    const smgId_0 = Buffer.from(smgId, 'hex');
    assert(smgId_0.length === 32, `smgId must be 32 bytes long`);

    const tokenPair_0 = BigInt(tokenPair);
    const pairInfo = await this.getTokenPairInfo(tokenPair_0);
    assert(pairInfo, `tokenPairId ${tokenPair} not found`);
    const amount_0 = BigInt(amount);
    const token = decodeTokenType(pairInfo.midnigthTokenAccount);
    const coin_0 = coinInfo(token, amount_0);
    const finalizedTxData = await this.crossChainContract.callTx.userLock(smgId_0, toAddress, tokenPair_0, coin_0);
    return finalizedTxData;
  }

  async smgRelease(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint
    , fee: string | number | bigint, toAddr: string
    , ttl: number): Promise<FinalizedCallTxData<CrossChainContract, "smgRelease">> {

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
    const token = decodeTokenType(pairInfo.midnigthTokenAccount);
    const coin_0 = coinInfo(token, amount_0);
    const finalizedTxData = await this.crossChainContract.callTx.userBurn(smgId_0, toAddress, tokenPair_0, coin_0);
    return finalizedTxData;
  }

  async voteCrossProposal(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "voteCrossProposal">> {
    const uniqueId_0 = Buffer.from(uniqueId, 'hex');
    assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);

    const finalizedTxData = await this.crossChainContract.callTx.voteCrossProposal(uniqueId_0);
    return finalizedTxData;
  }

  async voteMultiCrossProposal(uniqueIds: string[]): Promise<FinalizedCallTxData<CrossChainContract, "voteMultiCrossProposal">> {
    const uniqueIds_0 = uniqueIds.map((uniqueId) => {
      const ret = Buffer.from(uniqueId, 'hex');
      assert(ret.length === 32, `uniqueId(${uniqueId}) must be 32 bytes long`);
      return ret;
    });
    assert(uniqueIds_0.length <= 5 && uniqueIds_0.length > 0, `uniqueIds must be between 1 and 5`);
    for (let index = uniqueIds_0.length - 1; index < 5; index++) {
      uniqueIds_0.push(Buffer.alloc(32));
    }

    const finalizedTxData = await this.crossChainContract.callTx.voteMultiCrossProposal(uniqueIds_0);
    return finalizedTxData;
  }


  async executeCrossProposal(uniqueId: string, coinIndex: string | number | bigint | undefined): Promise<FinalizedCallTxData<CrossChainContract, "executeCrossProposal">> {
    const uniqueId_0 = Buffer.from(uniqueId, 'hex');
    assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    let coinIndex_0 = BigInt(0);
    if (coinIndex) {
      coinIndex_0 = BigInt(coinIndex);
    }
    const finalizedTxData = await this.crossChainContract.callTx.executeCrossProposal(uniqueId_0, coinIndex_0);
    return finalizedTxData;
  }

  async executeMultiCrossProposal(uniqueIds: ({ uniqueId: string, coinIndex: string | number | bigint | undefined })[]): Promise<FinalizedCallTxData<CrossChainContract, "executeMultiCrossProposal">> {
    const uniqueIds_0 = uniqueIds.map((item) => {
      const uniqueId_0 = Buffer.from(item.uniqueId, 'hex');
      assert(uniqueId_0.length === 32, `uniqueId(${item.uniqueId}) must be 32 bytes long`);
      let coinIndex_0 = BigInt(0);
      if (item.coinIndex) {
        coinIndex_0 = BigInt(item.coinIndex);
      }
      return { uniqueId: uniqueId_0, coinIndex: coinIndex_0 };
    });
    assert(uniqueIds_0.length <= 5 && uniqueIds_0.length > 0, `uniqueIds must be between 1 and 5`);
    for (let index = uniqueIds_0.length - 1; index < 5; index++) {
      uniqueIds_0.push({ uniqueId: Buffer.alloc(32), coinIndex: BigInt(0) });
    }

    const finalizedTxData = await this.crossChainContract.callTx.executeMultiCrossProposal(uniqueIds_0);
    return finalizedTxData;
  }

  async userRechargeForFee(amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "userRechargeForFee">> {
    const amount_0 = BigInt(amount);
    const coin_0 = coinInfo(nativeToken(), amount_0);
    const finalizedTxData = await this.crossChainContract.callTx.userRechargeForFee(coin_0);
    return finalizedTxData;
  }

  async approveUserWithdrawFee(user: Address, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "approveUserWithdrawFee">> {
    const key_0 = { bytes: getCoinPublicKeyFromShieldAddress(user) };
    const ledgerState = await this.getLedgerState();
    assert(ledgerState != null, `ledgerState is null`);

    const amount_0 = BigInt(amount);
    const balance_0 = ledgerState.userFeeBalance.lookup(key_0);
    assert(balance_0 >= amount_0, `user ${user} has not enough fee balance real (${balance_0}) vs withdraw ${amount_0}`);

    const coin_0 = coinInfo(nativeToken(), BigInt(amount));
    const finalizedTxData = await this.crossChainContract.callTx.approveUserWithdrawFee(key_0, coin_0);
    return finalizedTxData;
  }

  async userClaim(uniqueId: string, isMappingToken: boolean) {
    if (isMappingToken) {
      return this.userClaimMappingToken(uniqueId);
    } else {
      return this.userClaimCoin(uniqueId);
    }
  }

  async userClaimCoin(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "userClaimCoin">> {
    const uniqueId_0 = Buffer.from(uniqueId, 'hex');
    assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);

    const finalizedTxData = await this.crossChainContract.callTx.userClaimCoin(uniqueId_0);
    return finalizedTxData;
  }

  async userClaimMappingToken(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "userClaimMappingToken">> {
    const uniqueId_0 = Buffer.from(uniqueId, 'hex');
    assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);

    const finalizedTxData = await this.crossChainContract.callTx.userClaimMappingToken(uniqueId_0);
    return finalizedTxData;
  }


  async addReserve(token: TokenType, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addReserve">> {
    const amount_0 = BigInt(amount);
    const coin_0 = coinInfo(token, amount_0);
    const finalizedTxData = await this.crossChainContract.callTx.addReserve(coin_0);
    return finalizedTxData;
  }

  async withdrawReserveOfNativeToken(token: TokenType, coinIndex: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfNativeToken">> {
    const coinIndex_0 = BigInt(coinIndex);
    const token_0 = encodeTokenType(token);
    const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfNativeToken(token_0, coinIndex_0);
    return finalizedTxData;
  }

  async withdrawReserveOfMappingToken(domainSep: string): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfMappingToken">> {
    const token_0 = pad(domainSep, 32);
    const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfMappingToken(token_0);
    return finalizedTxData;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async getLedgerState(): Promise<CrossChain.Ledger | null> {
    assertIsContractAddress(this.crossChainContract?.deployTxData.public.contractAddress);
    const state = await this.providers.publicDataProvider
      .queryContractState(this.crossChainContract?.deployTxData.public.contractAddress)
      .then((contractState) => (contractState != null ? CrossChain.ledger(contractState.data) : null));
    return state;
  }

  ///////////////////////////////////////////////        management      ////////////////////////////////////////////////////////
  async transferOwner(newOwner: Address): Promise<FinalizedCallTxData<CrossChainContract, "transferOwner">> {
    const newOwner_0 = { bytes: getCoinPublicKeyFromShieldAddress(newOwner) };
    const finalizedTxData = await this.crossChainContract.callTx.transferOwner(newOwner_0);
    return finalizedTxData;
  }

  async acceptOwner(): Promise<FinalizedCallTxData<CrossChainContract, "acceptOwner">> {
    const finalizedTxData = await this.crossChainContract.callTx.acceptOwner();
    return finalizedTxData;
  }

  async updateSmgPk(newVoter: Address): Promise<FinalizedCallTxData<CrossChainContract, "updateSmgPk">> {
    const newVoter_0 = { bytes: getCoinPublicKeyFromShieldAddress(newVoter) };
    const finalizedTxData = await this.crossChainContract.callTx.updateSmgPk(newVoter_0);
    return finalizedTxData;
  }

  async setFeeReceiver(feeReceiver: Address): Promise<FinalizedCallTxData<CrossChainContract, "setFeeReceiver">> {
    const feeReceiver_0 = { bytes: getCoinPublicKeyFromShieldAddress(feeReceiver) };
    const finalizedTxData = await this.crossChainContract.callTx.setFeeReceiver(feeReceiver_0);
    return finalizedTxData;
  }

  async setTokenManager(tokenManager: Address): Promise<FinalizedCallTxData<CrossChainContract, "setTokenManager">> {
    const tokenManager_0 = { bytes: getCoinPublicKeyFromShieldAddress(tokenManager) };
    const finalizedTxData = await this.crossChainContract.callTx.setTokenManager(tokenManager_0);
    return finalizedTxData;
  }

  async setMegerWorker(mergeWorker: Address): Promise<FinalizedCallTxData<CrossChainContract, "setMegerWorker">> {
    const megerWorker_0 = { bytes: getCoinPublicKeyFromShieldAddress(mergeWorker) };
    const finalizedTxData = await this.crossChainContract.callTx.setMegerWorker(megerWorker_0);
    return finalizedTxData;
  }

  // async mergeTreasuryCoin(coins: bigint[] | number[] | string[]): Promise<FinalizedCallTxData<CrossChainContract, "mergeTreasuryCoin">>{
  //   if (coins.length != 2) throw 'can only merge 2 coins';
  //   const coins_0 = coins.map(coin => BigInt(coin));
  //   const finalizedTxData = await this.crossChainContract.callTx.mergeTreasuryCoin(coins_0);
  //   return finalizedTxData;
  // }


  async addAdmin(admin: Address): Promise<FinalizedCallTxData<CrossChainContract, "addAdmin">> {
    const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
    const finalizedTxData = await this.crossChainContract.callTx.addAdmin(admin_0);
    return finalizedTxData;
  }

  async removeAdmin(admin: Address): Promise<FinalizedCallTxData<CrossChainContract, "removeAdmin">> {
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

  async setSmgPksks(voters: Address[]): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPksks">> {
    assert(voters.length > 0, 'voters must not be empty');
    const voters_0 = voters.map(voter => {
      return { bytes: getCoinPublicKeyFromShieldAddress(voter) }
      // return { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(voter, getZswapNetworkId())) } 
    });
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
    , toChainId: number | string | bigint, midnigthTokenAccount: TokenType
    , domainSep: string, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addTokenPair">> {
    const tokenPairId_0 = BigInt(tokenPairId);
    const fromChainId_0 = BigInt(fromChainId);
    const toChainId_0 = BigInt(toChainId);
    const midnigtAccount_0 = encodeTokenType(midnigthTokenAccount);
    const domainSep_0 = pad(domainSep, 32);
    if (domainSep == '') {
      const expectedTokenType = tokenType(domainSep_0, this.crossChainContract.deployTxData.public.contractAddress);
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

  async addAdminProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">> {
    // const addr_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(addr, getZswapNetworkId())) };
    const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.type = CrossChain.ProposalType.AddAdmin;
    proposal.addr = addr_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  async removeAdminProposal(addr: Address) {
    const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.type = CrossChain.ProposalType.RemoveAdmin;
    proposal.addr = addr_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  async updateFeeReceiverProposal(addr: Address) {
    const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.type = CrossChain.ProposalType.UpdateFeeReceiver;
    proposal.addr = addr_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  async updateTokenManagerProposal(addr: Address) {
    const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.type = CrossChain.ProposalType.UpdateTokenManager;
    proposal.addr = addr_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  async updateAdminThresholdProposal(threshold: number | string | bigint) {
    const threshold_0 = BigInt(threshold);
    let proposal = this.defaultProsal();
    proposal.type = CrossChain.ProposalType.UpdateAdminThreshold;
    proposal.threshold = threshold_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  defaultProsal(): CrossChain.Proposal {
    return {
      type: CrossChain.ProposalType.UpdateAdminThreshold,
      addr: { bytes: fromHexWithOrNoPrefix("") },
      threshold: BigInt(0),
      feeConfig: { fee: BigInt(0), chainId: BigInt(0) },
      smgPubkeys: new Array(this.MaxSmgSignators).fill({ x: 0n, y: 0n })
    };
  }
  async updateSMGPKThresholdProposal(threshold: number | string | bigint) {
    const threshold_0 = BigInt(threshold);
    let proposal = this.defaultProsal();
    proposal.type = CrossChain.ProposalType.UpdateSMGPKThreshold;
    proposal.threshold = threshold_0;

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  async updateFeeCommonConfigProposal(chainId: number | string | bigint, fee: number | string | bigint) {
    const chainId_0 = BigInt(chainId);
    const fee_0 = BigInt(fee);

    let proposal = this.defaultProsal();
    proposal.type = CrossChain.ProposalType.UpdateFeeCommonConfig;
    proposal.feeConfig = { fee: fee_0, chainId: chainId_0 };

    return await this.crossChainContract.callTx.newProposal(proposal);
  }

  //////////////////////////////////////////////////////////////////////////////////////////
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

  async updateContractAuthority(newKey: SigningKey) {
    return await this.crossChainContract.contractMaintenanceTx.replaceAuthority(newKey);
  }

  async upgradeContract(circuit: CrossChainCircuits, newCircuit: string | undefined) {
    let newVK;
    if(newCircuit){
      newVK = createVerifierKey(fromHex(newCircuit));
    }else{
      newVK = await this.providers.zkConfigProvider.getVerifierKey(circuit);
    }
    
    const res1 = await this.crossChainContract.circuitMaintenanceTx[circuit].removeVerifierKey();
    const res2 = await this.crossChainContract.circuitMaintenanceTx[circuit].insertVerifierKey(newVK);
    return res2;
  }

}

export const getTreasuryCoinsFromState = (state: CrossChain.Ledger) => {
  let treasuryCoins = new Map<TokenType, Map<bigint, CrossChain.QualifiedCoinInfo>>();
  console.log('treasuryCoins size:', state.treasuryCoins.size());
  for (const [coinId, coin] of state.treasuryCoins) {
    const tokenType = decodeTokenType(coin.color);
    if (!treasuryCoins.has(tokenType)) {
      treasuryCoins.set(tokenType, new Map<bigint, CrossChain.QualifiedCoinInfo>());
    }
    treasuryCoins.get(tokenType)?.set(coinId, coin);
    //   {
    //   treasuryCoins.set(tokenType, new Map<bigint, CrossChain.QualifiedCoinInfo>());
    //   treasuryCoins.get(tokenType)?.set(coinId, coin);
    // }
  }
  return treasuryCoins;
}

export const genSigningKey = () => {
  return sampleSigningKey();
}

export const genRandomBigint = () => {
  const r = transientHash<SigningKey>(new CompactTypeOpaqueString(), sampleCoinPublicKey());
  return r;
}

export const configureProviders = async (wallet: Wallet & Resource, config: Config) => {
  const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
  // console.log('^^^^^^^^^^^^^^',ZKConfig.zkConfigPath)
  return {
    privateStateProvider: levelPrivateStateProvider<typeof CrossChainPrivateStateId>({
      privateStateStoreName: ZKConfig.privateStateStoreName,
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider: new NodeZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath),
    proofProvider: httpClientProofProvider(config.proofServer),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };
};

export const getCoinPublicKeyFromShieldAddress = (shieldAddr: string) => {
  const tmp1 = MidnightBech32m.parse(shieldAddr);
  // const tmp1 = MidnightBech32m.parse('mn_shield-addr_test10th0dtqgnpanzwmqj236zccpkmj9xxpkl7r7e7cr5e3v7k0stm5qxqxa9m6z5f4603nyuu4kw9c65ektu48hhyrtu2f07h42ycppkvw9ccyry600');
  const tmp2 = ShieldedAddress.codec.decode(tmp1.network, tmp1);
  // console.log('coinPublicKeyString:', toHex(tmp2.coinPublicKey.data));
  return tmp2.coinPublicKey.data;
}

//only support 0-MainNet, 1-TestNet, 2-DevNet, 3-Undeployed
export const initNetwork = (networkId: number) => {
  let network = NetworkId.TestNet;
  switch (networkId) {
    case 0:
      network = NetworkId.Undeployed;
      break;
    case 1:
      network = NetworkId.DevNet;
      break;
    case 2:
      network = NetworkId.TestNet;
      break;
    case 3:
      network = NetworkId.MainNet;
      break;
    default:
      throw new Error('Unknown networkId, only support 0-Undeployed, 1-DevNet, 2-TestNet, 3-MainNet');
  }
  setNetworkId(network);
}

export interface WalletStore {
  (walletState: string): Promise<void>;
}
export class MidnightWalletSDK {
  readonly config: Config;
  // private NetWorkId: NetworkId;
  private walletObj?: Wallet & Resource;
  private walletAddress: string;
  private bActiveFlag: boolean;
  private storeTimer?: NodeJS.Timeout;
  constructor(config: Config) {
    this.config = config;
    this.walletAddress = '';
    this.bActiveFlag = false;
  }

  //////////////////////////////////////////
  // to generate a wallet instance
  //////////////////////////////////////////
  async initWallet(strSeed: string, store: WalletStore, strSerializedState?: string, saveInterval: number = 600000) {

    this.walletObj = await buildWalletAndWaitForFunds(this.config, strSeed, strSerializedState);
    const selfWallet = this.walletObj;
    const state = await Rx.firstValueFrom(this.walletObj.state());
    this.walletAddress = state.address;

    const callBack = async () => {
      const ret = await selfWallet.serializeState();
      await store(ret);
      console.log('wallet state saved!');
      clearTimeout(this.storeTimer);
      this.storeTimer = setTimeout(callBack, saveInterval);
    }
    this.storeTimer = setTimeout(async () => {
      await callBack();
    }, saveInterval);

  }

  // to get the wallet address
  getAccountAddress() {
    return this.walletAddress;
  }


  async getBalances() {
    assert(this.walletObj, "walletObj is not initialized!");
    let curState = await Rx.firstValueFrom(this.walletObj.state());
    // console.log("\n\n...getAccountBalance...curState: ", curState);

    // balances: Record<TokenType, bigint>;
    let aryBalance = new Array();

    let curBalance = curState.balances;
    // console.log("\n\n...getAccountBalance...curBalance: ", curBalance);

    // in case the balances is an object instance
    for (const coinType in curBalance) {
      if (curBalance.hasOwnProperty(coinType)) {
        // console.log("\n\n...getAccountBalance...coinType: ", coinType);
        let coinAmount = curBalance[coinType];
        // console.log("\n\n...getAccountBalance...amount : ", coinAmount);

        let item = {
          "coinType": coinType,
          "amount": coinAmount
        }
        aryBalance.push(item);
      }
    }

    return aryBalance;
  }


  async getAvailableCoins() {
    assert(this.walletObj, "walletObj is not initialized!");
    let curState = await Rx.firstValueFrom(this.walletObj.state());
    // console.log("\n\n...getAvailableCoins...curState: ", curState);

    //QualifiedCoinInfo = { type: TokenType, nonce: Nonce, value: bigint, mt_index: bigint };
    let availableCoins = curState.availableCoins;
    // console.log("\n\n...getAvailableCoins...curBalance: ", availableCoins);

    return availableCoins;
  }

  uninitWallet() {
    if (this.storeTimer) {
      clearTimeout(this.storeTimer);
    }

    if (true === this.bActiveFlag) {
      this.walletObj?.close();
    }
    this.bActiveFlag = false;
    console.log("\n\n...wallet close done!");
  }

  getWalletInstance() {
    return this.walletObj;
  }

  getSerializedWalletState() {
    if (!this.walletObj) return '';
    return getSerializeWalletState(this.walletObj);
  }

}
