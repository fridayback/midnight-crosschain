/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-06-20 17:15:35
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-06-22 12:56:21
 * @FilePath: /midnight-crosschain/sdk/src/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { encodeCoinInfo, EncodedCoinInfo, type ContractAddress } from '@midnight-ntwrk/compact-runtime';
import { CrossChain, type CrossChainPrivateState, witnesses, createCrossChainPrivateState} from "@midnight-crosschain/contract-interface";
import { type CoinInfo, createCoinInfo, nativeToken, tokenType, TokenType, Transaction, type TransactionId } from '@midnight-ntwrk/ledger';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import {
  type BalancedTransaction,
  createBalancedTx,
  type FinalizedTxData,
  type MidnightProvider,
  type UnbalancedTransaction,
  type WalletProvider,
} from '@midnight-ntwrk/midnight-js-types';
import { type Resource, WalletBuilder} from '@midnight-ntwrk/wallet';
import {type Wallet} from '@midnight-ntwrk/wallet-api';
import { Transaction as ZswapTransaction } from '@midnight-ntwrk/zswap';
import { webcrypto } from 'crypto';
import { type Logger } from 'pino';
import * as Rx from 'rxjs';
import { WebSocket } from 'ws';
import {
  type CrossChainCircuits,
  type CrossChainContract,
  type CrossChainProviders,
  type DeployedCrossChainContract,
} from './common-types.js';
import { type Config, contractConfig } from './config.js';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { assertIsContractAddress, toHex } from '@midnight-ntwrk/midnight-js-utils';
import { getLedgerNetworkId, getZswapNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import * as fsAsync from 'node:fs/promises';
import * as fs from 'node:fs';


let logger: Logger;
// Instead of setting globalThis.crypto which is read-only, we'll ensure crypto is available
// but won't try to overwrite the global property
// @ts-expect-error: It's needed to enable WebSocket usage through apollo
globalThis.WebSocket = WebSocket;

export const getCrossChainLedgerState = async (
  providers: CrossChainProviders,
  contractAddress: ContractAddress,
): Promise<bigint | null> => {
  assertIsContractAddress(contractAddress);
  logger.info('Checking contract ledger state...');
  const state = await providers.publicDataProvider
    .queryContractState(contractAddress)
    .then((contractState) => (contractState != null ? CrossChain.ledger(contractState.data).round : null));
  logger.info(`Ledger state: ${state}`);
  return state;
};

export const counterContractInstance: CrossChainContract = new CrossChain.Contract(witnesses);

export const joinContract = async (
  providers: CrossChainProviders,
  contractAddress: string,
  privateState: CrossChainPrivateState,
): Promise<DeployedCrossChainContract> => {
  const counterContract = await findDeployedContract(providers, {
    contractAddress,
    contract: counterContractInstance,
    privateStateId: 'counterPrivateState',
    initialPrivateState: privateState,
  });
  logger.debug(`Joined contract at address: ${counterContract.deployTxData.public.contractAddress}`);
  return counterContract;
};

export const deploy = async (
  providers: CrossChainProviders,
  privateState: CrossChainPrivateState,
): Promise<DeployedCrossChainContract> => {
  logger.info('Deploying counter contract...');
  const counterContract = await deployContract(providers, {
    contract: counterContractInstance,
    privateStateId: 'counterPrivateState',
    initialPrivateState: privateState,
  });
  logger.info(`Deployed contract at address: ${counterContract.deployTxData.public.contractAddress}`);
  return counterContract;
};


const coinInfo = (token: TokenType, value: bigint): EncodedCoinInfo => encodeCoinInfo(createCoinInfo(token, value));
export const deposit = async (counterContract: DeployedCrossChainContract): Promise<FinalizedTxData> => {
  const coin = coinInfo(nativeToken(),12345678n);
  logger.info('depositing...111111',nativeToken(),Buffer.from(coin.color).toString('hex'),Buffer.from(coin.nonce).toString('hex'),coin.value);
  console.log('depositing...111111',nativeToken(),Buffer.from(coin.color).toString('hex'),Buffer.from(coin.nonce).toString('hex'),coin.value);
  const finalizedTxData = await counterContract.callTx.deposit(coin);
  logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
  return finalizedTxData.public;
};

export const withdraw = async (counterContract: DeployedCrossChainContract): Promise<FinalizedTxData> => {
  logger.info('withdrawing...');
  const finalizedTxData = await counterContract.callTx.withdraw();
  logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
  return finalizedTxData.public;
};

const tokenName = Buffer.from('ETH','ascii').toString('hex').padEnd(64,'0');
export const mint = async (counterContract: DeployedCrossChainContract): Promise<FinalizedTxData> => {
  
  const to = {bytes: Buffer.alloc(32,0)
    //MidnightBech32m.parse('mn_shield-addr_test1kh6uwh96xq09ek9p85jnjhqwzvcru6rmsk4nexkpf30tkne567msxq8e8q40v4wycfxn8dcvhejpqh0sz6hu2llum595aqp9rc3wx4x6gyj0r632').data
  };
  const amount = 5000005n;
  logger.info(`mint amount ${amount} ${tokenName} to ${to}`);
  const finalizedTxData = await counterContract.callTx.mint(Buffer.from(tokenName,'hex'),amount,to);
  logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
  return finalizedTxData.public;
};

export const burn = async (counterContract: DeployedCrossChainContract): Promise<FinalizedTxData> => {
  logger.info('withdrawing...');
  const coin = coinInfo(tokenType(Buffer.from(tokenName,'hex'),counterContract.deployTxData.public.contractAddress),5000005n);
  const finalizedTxData = await counterContract.callTx.burn(coin);
  logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
  return finalizedTxData.public;
};

export const displayCounterValue = async (
  providers: CrossChainProviders,
  counterContract: DeployedCrossChainContract,
): Promise<{ counterValue: bigint | null; contractAddress: string }> => {
  const contractAddress = counterContract.deployTxData.public.contractAddress;
  const counterValue = await getCrossChainLedgerState(providers, contractAddress);
  if (counterValue === null) {
    logger.info(`There is no counter contract deployed at ${contractAddress}.`);
  } else {
    logger.info(`Current counter value: ${(counterValue)}`);
  }
  return { contractAddress, counterValue };
};

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


export const configureProviders = async (wallet: Wallet & Resource, config: Config) => {
  const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
  return {
    privateStateProvider: levelPrivateStateProvider<CrossChainCircuits>({
      privateStateStoreName: contractConfig.privateStateStoreName,
    }),
    publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
    zkConfigProvider: new NodeZkConfigProvider<CrossChainCircuits>(contractConfig.zkConfigPath),
    proofProvider: httpClientProofProvider(config.proofServer),
    walletProvider: walletAndMidnightProvider,
    midnightProvider: walletAndMidnightProvider,
  };
};

export function setLogger(_logger: Logger) {
  logger = _logger;
}
