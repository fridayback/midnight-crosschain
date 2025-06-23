/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-06-20 17:15:35
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-06-23 14:33:25
 * @FilePath: /midnight-crosschain/sdk/src/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { encodeCoinInfo } from '@midnight-ntwrk/compact-runtime';
import { createCoinInfo, nativeToken, tokenType, Transaction } from '@midnight-ntwrk/ledger';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { createBalancedTx, } from '@midnight-ntwrk/midnight-js-types';
import { Transaction as ZswapTransaction } from '@midnight-ntwrk/zswap';
import * as Rx from 'rxjs';
import { WebSocket } from 'ws';
import { contractConfig } from './config.js';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { assertIsContractAddress } from '@midnight-ntwrk/midnight-js-utils';
import { getLedgerNetworkId, getZswapNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { CrossChain, witnesses } from "../contract";
let logger;
// Instead of setting globalThis.crypto which is read-only, we'll ensure crypto is available
// but won't try to overwrite the global property
// @ts-expect-error: It's needed to enable WebSocket usage through apollo
globalThis.WebSocket = WebSocket;
export const getCrossChainLedgerState = async (providers, contractAddress) => {
    assertIsContractAddress(contractAddress);
    logger.info('Checking contract ledger state...');
    const state = await providers.publicDataProvider
        .queryContractState(contractAddress)
        .then((contractState) => (contractState != null ? CrossChain.ledger(contractState.data).round : null));
    logger.info(`Ledger state: ${state}`);
    return state;
};
export const counterContractInstance = new CrossChain.Contract(witnesses);
export const joinContract = async (providers, contractAddress, privateState) => {
    const counterContract = await findDeployedContract(providers, {
        contractAddress,
        contract: counterContractInstance,
        privateStateId: 'counterPrivateState',
        initialPrivateState: privateState,
    });
    logger.debug(`Joined contract at address: ${counterContract.deployTxData.public.contractAddress}`);
    return counterContract;
};
export const deploy = async (providers, privateState) => {
    logger.info('Deploying counter contract...');
    const counterContract = await deployContract(providers, {
        contract: counterContractInstance,
        privateStateId: 'counterPrivateState',
        initialPrivateState: privateState,
    });
    logger.info(`Deployed contract at address: ${counterContract.deployTxData.public.contractAddress}`);
    return counterContract;
};
const coinInfo = (token, value) => encodeCoinInfo(createCoinInfo(token, value));
export const deposit = async (counterContract) => {
    const coin = coinInfo(nativeToken(), 12345678n);
    logger.info('depositing...111111', nativeToken(), Buffer.from(coin.color).toString('hex'), Buffer.from(coin.nonce).toString('hex'), coin.value);
    console.log('depositing...111111', nativeToken(), Buffer.from(coin.color).toString('hex'), Buffer.from(coin.nonce).toString('hex'), coin.value);
    const finalizedTxData = await counterContract.callTx.deposit(coin);
    logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
    return finalizedTxData.public;
};
export const withdraw = async (counterContract) => {
    logger.info('withdrawing...');
    const finalizedTxData = await counterContract.callTx.withdraw();
    logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
    return finalizedTxData.public;
};
const tokenName = Buffer.from('ETH', 'ascii').toString('hex').padEnd(64, '0');
export const mint = async (counterContract) => {
    const to = { bytes: Buffer.alloc(32, 0)
        //MidnightBech32m.parse('mn_shield-addr_test1kh6uwh96xq09ek9p85jnjhqwzvcru6rmsk4nexkpf30tkne567msxq8e8q40v4wycfxn8dcvhejpqh0sz6hu2llum595aqp9rc3wx4x6gyj0r632').data
    };
    const amount = 5000005n;
    logger.info(`mint amount ${amount} ${tokenName} to ${to}`);
    const finalizedTxData = await counterContract.callTx.mint(Buffer.from(tokenName, 'hex'), amount, to);
    logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
    return finalizedTxData.public;
};
export const burn = async (counterContract) => {
    logger.info('withdrawing...');
    const coin = coinInfo(tokenType(Buffer.from(tokenName, 'hex'), counterContract.deployTxData.public.contractAddress), 5000005n);
    const finalizedTxData = await counterContract.callTx.burn(coin);
    logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
    return finalizedTxData.public;
};
export const displayCounterValue = async (providers, counterContract) => {
    const contractAddress = counterContract.deployTxData.public.contractAddress;
    const counterValue = await getCrossChainLedgerState(providers, contractAddress);
    if (counterValue === null) {
        logger.info(`There is no counter contract deployed at ${contractAddress}.`);
    }
    else {
        logger.info(`Current counter value: ${(counterValue)}`);
    }
    return { contractAddress, counterValue };
};
export const createWalletAndMidnightProvider = async (wallet) => {
    const state = await Rx.firstValueFrom(wallet.state());
    return {
        coinPublicKey: state.coinPublicKey,
        encryptionPublicKey: state.encryptionPublicKey,
        balanceTx(tx, newCoins) {
            return wallet
                .balanceTransaction(ZswapTransaction.deserialize(tx.serialize(getLedgerNetworkId()), getZswapNetworkId()), newCoins)
                .then((tx) => wallet.proveTransaction(tx))
                .then((zswapTx) => Transaction.deserialize(zswapTx.serialize(getZswapNetworkId()), getLedgerNetworkId()))
                .then(createBalancedTx);
        },
        submitTx(tx) {
            return wallet.submitTransaction(tx);
        },
    };
};
export const configureProviders = async (wallet, config) => {
    const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
    return {
        privateStateProvider: levelPrivateStateProvider({
            privateStateStoreName: contractConfig.privateStateStoreName,
        }),
        publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
        zkConfigProvider: new NodeZkConfigProvider(contractConfig.zkConfigPath),
        proofProvider: httpClientProofProvider(config.proofServer),
        walletProvider: walletAndMidnightProvider,
        midnightProvider: walletAndMidnightProvider,
    };
};
export function setLogger(_logger) {
    logger = _logger;
}
//# sourceMappingURL=api.js.map