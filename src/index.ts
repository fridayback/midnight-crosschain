/*
 * @Author: liulin 
 * @Date: 2025-06-20 12:02:08
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-09-23 16:11:23
 * @FilePath: /midnight-crosschain/contract/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// export * as CrossChain from "./managed/crosschain/contract/index.cjs";
// export * from "./witnesses.js";

import path from 'node:path';


// import { witnesses, type CrossChainPrivateState } from './witnesses.js';
import * as CrossChain from "./managed/crosschain/contract/index.cjs";

import { createBalancedTx, type BalancedTransaction, type ImpureCircuitId, type MidnightProvider, type MidnightProviders, type UnbalancedTransaction, type WalletProvider, type FinalizedTxData, SucceedEntirely } from '@midnight-ntwrk/midnight-js-types';
import { deployContract, findDeployedContract, type DeployedContract, type FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { Address, CoinPublicKey, Wallet } from '@midnight-ntwrk/wallet-api';
import { CoinInfo, decodeTokenType, encodeTokenType, Transaction, TransactionId, tokenType, communicationCommitmentRandomness, sampleCoinPublicKey, encodeCoinInfo, createCoinInfo } from '@midnight-ntwrk/ledger';
import { TokenType, Transaction as ZswapTransaction } from '@midnight-ntwrk/zswap';
import { getLedgerNetworkId, getZswapNetworkId, NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { assertIsContractAddress, fromHex, parseCoinPublicKeyToHex, toHex } from '@midnight-ntwrk/midnight-js-utils';
import { MidnightBech32m, ShieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
import * as Rx from 'rxjs';
import { addField, CompactTypeBytes, CompactTypeCurvePoint, CompactTypeOpaqueString, CompactTypeOpaqueUint8Array, CompactTypeUnsignedInteger, CompactTypeVector, ContractAddress, convert_Uint8Array_to_bigint, degradeToTransient, ecAdd, ecMul, ecMulGenerator, EncodedCoinInfo, mulField, persistentHash, sampleSigningKey, SigningKey, transientHash } from '@midnight-ntwrk/compact-runtime';
import { Resource, WalletBuilder } from '@midnight-ntwrk/wallet';
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
  readonly logDir: string;
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

export const buildWalletAndWaitForFunds = async (
  { indexer, indexerWS, node, proofServer }: Config,
  seed: string,
  filename: string,
): Promise<Wallet & Resource> => {
  const directoryPath = process.env.SYNC_CACHE;
  let wallet: Wallet & Resource;
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

  const state = await Rx.firstValueFrom(wallet.state());
  // logger.info(`Your wallet seed is: ${seed}`);
  // logger.info(`Your wallet address is: ${state.address}`);
  console.log(`Your wallet address is: ${state.address}`)
  let balance = state.balances;
  // let balance = state.balances;
  // if (balance === undefined || balance === 0n) {
  if (Object.keys(balance).length === 0) {
    // logger.info(`Your wallet balance is: 0`);
    // logger.info(`Waiting to receive tokens...`);
    balance = await waitForFunds(wallet);
  } else {
    // logger.info(`length: ${Object.keys(balance).length}, ${balance}`);
  }

  return wallet;
};

export const waitForFunds = (wallet: Wallet) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(10_000),
      Rx.tap((state) => {
        const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
        const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
        // logger.info(`Waiting for funds. Backend lag: ${sourceGap}, wallet lag: ${applyGap}, transactions=${state.transactionHistory.length}`,);
      }),
      Rx.filter((state) => {
        // Let's allow progress only if wallet is synced
        // logger.info(`wallet ZswapCoinPublicKey: ${parseCoinPublicKeyToHex(state.coinPublicKey, getLedgerNetworkId())},${state.coinPublicKey}`);
        return state.syncProgress?.synced === true;
      }),
      // Rx.map((s) => s.balances[nativeToken()] ?? 0n),
      Rx.map((s) => s.balances),
      Rx.filter((balance) => balance ? true : false),
    ),
  );


export const waitForSync = (wallet: Wallet) =>
  Rx.firstValueFrom(
    wallet.state().pipe(
      Rx.throttleTime(5_000),
      Rx.tap((state) => {
        const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
        const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
        // logger.info(`Waiting for funds. Backend lag: ${sourceGap}, wallet lag: ${applyGap}, transactions=${state.transactionHistory.length}`,);
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
      Rx.throttleTime(5_000),
      Rx.tap((state) => {
        const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
        const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
        // logger.info(`Waiting for funds. Backend lag: ${sourceGap}, wallet lag: ${applyGap}, transactions=${state.transactionHistory.length}`,);
      }),
      Rx.filter((state) => {
        // Let's allow progress only if syncProgress is defined
        return state.syncProgress !== undefined;
      }),
    ),
  );

export class CrossChainApi {
  providers!: CrossChainProviders;
  crossChainContract!: DeployedCrossChainContract;
  MaxSmgSignators = 29;
  MaxMergeCoins = 4;
  constructor(networkId: NetworkId = NetworkId.TestNet) {
    setNetworkId(networkId);
  }

  defaultSmgSignators() {
    return Array.from({ length: this.MaxSmgSignators }, () => 0n);
  }

  defaultNoneMergeCoins() {
    return {
      is_some: false,
      value: Array.from({ length: this.MaxMergeCoins }, () => 0n),
    };
  }

  toMergerCoins(coins: string[] | number[] | bigint[] | undefined) {
    if (coins === undefined) {
      return this.defaultNoneMergeCoins();
    }
    return {
      is_some: true,
      value: coins.map((c) => BigInt(c)),
    };
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
    let coins_0 = this.defaultNoneMergeCoins();
    if (coins && coins.length > coins_0.value.length) {
      throw new Error(`Too many coins`);
    } else {
      coins?.map((c, i) => coins_0.value[i] = (BigInt(c)));
    }

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


  // caculateHashOfProofData(proof: CrossChain.ProofData): bigint {
  //   const tokenPairIdHash = persistentHash(new CompactTypeUnsignedInteger(4294967295n, 4), proof.tokenPairId);
  //   const amountHash = persistentHash(new CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16), proof.amount);
  //   const feeHash = persistentHash(new CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16), proof.fee);
  //   const coinsHash = persistentHash(new CompactTypeVector(this.MaxMergeCoins, new CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16)), proof.coins.value);
  //   const signersHash = persistentHash(new CompactTypeVector(this.MaxSmgSignators, new CompactTypeUnsignedInteger(255n, 1)), proof.signers);
  //   const ttlHash = persistentHash(new CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16), proof.ttl);

  //   return degradeToTransient(persistentHash(new CompactTypeVector(9, new CompactTypeBytes(32)),
  //     [proof.smgId, proof.uniqueId, tokenPairIdHash, amountHash, feeHash, proof.toAddr.bytes, coinsHash, signersHash, ttlHash]
  //   ));
  // }

  async getTokenPairInfo(tokenPairId: bigint | string | number): Promise<CrossChain.TokenPairInfo | undefined> {
    const ledger = await this.getLedgerState();
    return ledger?.tokenPairs.lookup(BigInt(tokenPairId));
  }

  /////////////////////////////////////////////////  Cross Tx  /////////////////////////////////////////////////////////////
  async userLock(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint) {
    const smgId_0 = Buffer.from(smgId, 'hex');
    assert(smgId_0.length === 32, `smgId must be 32 bytes long`);

    const tokenPair_0 = BigInt(tokenPair);
    const pairInfo = await this.getTokenPairInfo(tokenPair_0);
    assert(pairInfo, `tokenPairId ${tokenPair} not found`);
    const amount_0 = BigInt(amount);
    const token = decodeTokenType(pairInfo.midnigthTokenAccount);
    const coin_0 = coinInfo(token,amount_0);
    const finalizedTxData = await this.crossChainContract.callTx.userLock(smgId_0, toAddress, tokenPair_0, coin_0);
    return finalizedTxData;
  }

  async smgRelease(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint
    , fee: string | number | bigint, toAddr: string
    , ttl: number) {
    
    const proof = this.checkCrossData(uniqueId, smgId, tokenPair, amount, fee, toAddr, undefined, ttl);
    const finalizedTxData = await this.crossChainContract.callTx.smgRelease(
      proof.uniqueId, proof.smgId, proof.tokenPairId, proof.amount, proof.toAddr,proof.fee, proof.ttl);
    return finalizedTxData;
  }

  async smgMint(uniqueId: string, smgId: string, tokenPair: string | number | bigint, amount: string | number | bigint
    , fee: string | number | bigint, toAddr: string
    , ttl: number) {

    const proof = this.checkCrossData(uniqueId, smgId, tokenPair, amount, fee, toAddr, undefined, ttl);
    const finalizedTxData = await this.crossChainContract.callTx.smgMint(proof.uniqueId, proof.smgId, proof.tokenPairId, proof.amount, proof.fee, proof.toAddr, proof.ttl);
    return finalizedTxData;
  }

  async userBurn(smgId: string, toAddress: string, tokenPair: string | number | bigint, amount: string | number | bigint) {
    const smgId_0 = Buffer.from(smgId, 'hex');
    assert(smgId_0.length === 32, `smgId must be 32 bytes long`);
   
    const tokenPair_0 = BigInt(tokenPair);
    const pairInfo = await this.getTokenPairInfo(tokenPair_0);
    assert(pairInfo, `tokenPairId ${tokenPair} not found`);
    const amount_0 = BigInt(amount);
    const token = decodeTokenType(pairInfo.midnigthTokenAccount);
    const coin_0 = coinInfo(token,amount_0);
    const finalizedTxData = await this.crossChainContract.callTx.userBurn(smgId_0, toAddress, tokenPair_0, coin_0);
    return finalizedTxData;
  }

  async voteCrossProposal(uniqueId: string) {
    const uniqueId_0 = Buffer.from(uniqueId, 'hex');
    assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    
    const finalizedTxData = await this.crossChainContract.callTx.voteCrossProposal(uniqueId_0);
    return finalizedTxData;
  }

  
  async executeCrossProposal(uniqueId: string, coinIndex: string | number | bigint | undefined){
    const uniqueId_0 = Buffer.from(uniqueId, 'hex');
    assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    if(coinIndex === undefined){
      const finalizedTxData = await this.crossChainContract.callTx.executeCrossProposalOfMappingToken(uniqueId_0);
      return finalizedTxData;
    }else{
      const coinIndex_0 = BigInt(coinIndex);
      const finalizedTxData = await this.crossChainContract.callTx.executeCrossProposalOfNativeToken(uniqueId_0, coinIndex_0);
      return finalizedTxData;
    }
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
  async transferOwner(newOwner: Address) {
    const newOwner_0 = { bytes: getCoinPublicKeyFromShieldAddress(newOwner) };
    const finalizedTxData = await this.crossChainContract.callTx.transferOwner(newOwner_0);
    return finalizedTxData;
  }

  async acceptOwner() {
    const finalizedTxData = await this.crossChainContract.callTx.acceptOwner();
    return finalizedTxData;
  }

  async updateSmgPk(newVoter: Address) {
    const newVoter_0 = { bytes: getCoinPublicKeyFromShieldAddress(newVoter) };
    const finalizedTxData = await this.crossChainContract.callTx.updateSmgPk(newVoter_0);
    return finalizedTxData;
  }

  async setFeeReceiver(feeReceiver: Address) {
    const feeReceiver_0 = { bytes: getCoinPublicKeyFromShieldAddress(feeReceiver) };
    const finalizedTxData = await this.crossChainContract.callTx.setFeeReceiver(feeReceiver_0);
    return finalizedTxData;
  }

  async setTokenManager(tokenManager: Address) {
    const tokenManager_0 = { bytes: getCoinPublicKeyFromShieldAddress(tokenManager) };
    const finalizedTxData = await this.crossChainContract.callTx.setTokenManager(tokenManager_0);
    return finalizedTxData;
  }

  async setMegerWorker(mergeWorker: Address) {
    const megerWorker_0 = { bytes: getCoinPublicKeyFromShieldAddress(mergeWorker) };
    const finalizedTxData = await this.crossChainContract.callTx.setMegerWorker(megerWorker_0);
    return finalizedTxData;
  }

  async mergeTreasuryCoin(coins: bigint[] | number[] | string[]) {
    if(coins.length != 2) throw 'can only merge 2 coins';
    const coins_0 = coins.map(coin => BigInt(coin));
    const finalizedTxData = await this.crossChainContract.callTx.mergeTreasuryCoin(coins_0);
    return finalizedTxData;
  }


  async addAdmin(admin: Address) {
    const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
    const finalizedTxData = await this.crossChainContract.callTx.addAdmin(admin_0);
    return finalizedTxData;
  }

  async removeAdmin(admin: Address) {
    const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
    const finalizedTxData = await this.crossChainContract.callTx.removeAdmin(admin_0);
    return finalizedTxData;
  }

  async setAdminThreshold(threshold: number | string | bigint) {
    const threshold_0 = BigInt(threshold);
    const finalizedTxData = await this.crossChainContract.callTx.setAdminThreshold(threshold_0);
    return finalizedTxData;
  }

  async setSmgPksks(voters: Address[]) {
    const voters_0 = voters.map(voter => { 
      return { bytes: getCoinPublicKeyFromShieldAddress(voter) } 
      // return { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(voter, getZswapNetworkId())) } 
    });
    const finalizedTxData = await this.crossChainContract.callTx.setSmgPksks(voters_0);
    return finalizedTxData;
  }

  async setSmgPKThreold(threshold: number | string | bigint) {
    const threshold_0 = BigInt(threshold);
    const finalizedTxData = await this.crossChainContract.callTx.setSmgPKThreold(threshold_0);
    return finalizedTxData;
  }

  async setFeeCommonConfig(chainId: number | string | bigint, fee: number | string | bigint) {
    const chainId_0 = BigInt(chainId);
    const fee_0 = BigInt(fee);
    const finalizedTxData = await this.crossChainContract.callTx.setFeeCommonConfig(chainId_0, fee_0);
    return finalizedTxData;
  }

  async addTokenPair(tokenPairId: number | string | bigint, fromChainId: number | string | bigint, toChainId: number | string | bigint, midnigthTokenAccount: TokenType,domainSep:string, fee: number | string | bigint) {
    const tokenPairId_0 = BigInt(tokenPairId);
    const fromChainId_0 = BigInt(fromChainId);
    const toChainId_0 = BigInt(toChainId);
    const midnigtAccount_0 = encodeTokenType(midnigthTokenAccount);
    const domainSep_0 = pad(domainSep, 32);
    if(domainSep == '') {
      const expectedTokenType = tokenType(domainSep_0,this.crossChainContract.deployTxData.public.contractAddress);
      assert(expectedTokenType == midnigthTokenAccount,`token type not match ,${expectedTokenType} expected but got ${midnigthTokenAccount}`);
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

  async removeTokenPair(tokenPairId: number | string | bigint) {
    const tokenPairId_0 = BigInt(tokenPairId);
    const finalizedTxData = await this.crossChainContract.callTx.removeTokenPair(tokenPairId_0);
    return finalizedTxData;
  }

  async newProposal(proposal: CrossChain.Proposal) {
    const finalizedTxData = await this.crossChainContract.callTx.newProposal(proposal);
    return finalizedTxData;
  }

  async addAdminProposal(addr: Address) {
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

  async upgradeContract() {
    // return await this.crossChainContract.circuitMaintenanceTx.setFeeReceiver.insertVerifierKey(newVK);
    // await this.crossChainContract.circuitMaintenanceTx.newProposal.removeVerifierKey();
    // const newVK = 
    // return await this.crossChainContract.circuitMaintenanceTx.newProposal.insertVerifierKey();
  }

}

export const getTreasuryCoinsFromState = (state: CrossChain.Ledger) => {
  let treasuryCoins = new Map<TokenType, Map<bigint, CrossChain.QualifiedCoinInfo>>();
  console.log('treasuryCoins size:',state.treasuryCoins.size());
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

export const signData = (hash: bigint, privateKey: bigint) => {
  const k = BigInt(privateKey);
  const r = genRandomBigint();
  const R = ecMulGenerator(r);
  const P = ecMulGenerator(k);
  const m = BigInt(hash);

  const tmp = mulField(k, m);
  const s = addField(r, tmp);

  return { R, s, P };
}

export const verifySignature = (hash: bigint, R: CrossChain.CurvePoint, s: bigint, P: CrossChain.CurvePoint) => {
  const m = BigInt(hash);
  const expectM = ecAdd(R, ecMul(P, m));
  const realM = ecMulGenerator(s);
  return expectM.x === realM.x && expectM.y === realM.y;
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