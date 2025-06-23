"use strict";
/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-06-20 17:15:35
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-06-23 14:33:25
 * @FilePath: /midnight-crosschain/sdk/src/api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureProviders = exports.createWalletAndMidnightProvider = exports.displayCounterValue = exports.burn = exports.mint = exports.withdraw = exports.deposit = exports.deploy = exports.joinContract = exports.counterContractInstance = exports.getCrossChainLedgerState = void 0;
exports.setLogger = setLogger;
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const compact_runtime_1 = require("@midnight-ntwrk/compact-runtime");
const ledger_1 = require("@midnight-ntwrk/ledger");
const midnight_js_contracts_1 = require("@midnight-ntwrk/midnight-js-contracts");
const midnight_js_http_client_proof_provider_1 = require("@midnight-ntwrk/midnight-js-http-client-proof-provider");
const midnight_js_indexer_public_data_provider_1 = require("@midnight-ntwrk/midnight-js-indexer-public-data-provider");
const midnight_js_node_zk_config_provider_1 = require("@midnight-ntwrk/midnight-js-node-zk-config-provider");
const midnight_js_types_1 = require("@midnight-ntwrk/midnight-js-types");
const zswap_1 = require("@midnight-ntwrk/zswap");
const Rx = __importStar(require("rxjs"));
const ws_1 = require("ws");
const config_js_1 = require("./config.js");
const midnight_js_level_private_state_provider_1 = require("@midnight-ntwrk/midnight-js-level-private-state-provider");
const midnight_js_utils_1 = require("@midnight-ntwrk/midnight-js-utils");
const midnight_js_network_id_1 = require("@midnight-ntwrk/midnight-js-network-id");
const contract_1 = require("../contract");
let logger;
// Instead of setting globalThis.crypto which is read-only, we'll ensure crypto is available
// but won't try to overwrite the global property
// @ts-expect-error: It's needed to enable WebSocket usage through apollo
globalThis.WebSocket = ws_1.WebSocket;
const getCrossChainLedgerState = async (providers, contractAddress) => {
    (0, midnight_js_utils_1.assertIsContractAddress)(contractAddress);
    logger.info('Checking contract ledger state...');
    const state = await providers.publicDataProvider
        .queryContractState(contractAddress)
        .then((contractState) => (contractState != null ? contract_1.CrossChain.ledger(contractState.data).round : null));
    logger.info(`Ledger state: ${state}`);
    return state;
};
exports.getCrossChainLedgerState = getCrossChainLedgerState;
exports.counterContractInstance = new contract_1.CrossChain.Contract(contract_1.witnesses);
const joinContract = async (providers, contractAddress, privateState) => {
    const counterContract = await (0, midnight_js_contracts_1.findDeployedContract)(providers, {
        contractAddress,
        contract: exports.counterContractInstance,
        privateStateId: 'counterPrivateState',
        initialPrivateState: privateState,
    });
    logger.debug(`Joined contract at address: ${counterContract.deployTxData.public.contractAddress}`);
    return counterContract;
};
exports.joinContract = joinContract;
const deploy = async (providers, privateState) => {
    logger.info('Deploying counter contract...');
    const counterContract = await (0, midnight_js_contracts_1.deployContract)(providers, {
        contract: exports.counterContractInstance,
        privateStateId: 'counterPrivateState',
        initialPrivateState: privateState,
    });
    logger.info(`Deployed contract at address: ${counterContract.deployTxData.public.contractAddress}`);
    return counterContract;
};
exports.deploy = deploy;
const coinInfo = (token, value) => (0, compact_runtime_1.encodeCoinInfo)((0, ledger_1.createCoinInfo)(token, value));
const deposit = async (counterContract) => {
    const coin = coinInfo((0, ledger_1.nativeToken)(), 12345678n);
    logger.info('depositing...111111', (0, ledger_1.nativeToken)(), Buffer.from(coin.color).toString('hex'), Buffer.from(coin.nonce).toString('hex'), coin.value);
    console.log('depositing...111111', (0, ledger_1.nativeToken)(), Buffer.from(coin.color).toString('hex'), Buffer.from(coin.nonce).toString('hex'), coin.value);
    const finalizedTxData = await counterContract.callTx.deposit(coin);
    logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
    return finalizedTxData.public;
};
exports.deposit = deposit;
const withdraw = async (counterContract) => {
    logger.info('withdrawing...');
    const finalizedTxData = await counterContract.callTx.withdraw();
    logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
    return finalizedTxData.public;
};
exports.withdraw = withdraw;
const tokenName = Buffer.from('ETH', 'ascii').toString('hex').padEnd(64, '0');
const mint = async (counterContract) => {
    const to = { bytes: Buffer.alloc(32, 0)
        //MidnightBech32m.parse('mn_shield-addr_test1kh6uwh96xq09ek9p85jnjhqwzvcru6rmsk4nexkpf30tkne567msxq8e8q40v4wycfxn8dcvhejpqh0sz6hu2llum595aqp9rc3wx4x6gyj0r632').data
    };
    const amount = 5000005n;
    logger.info(`mint amount ${amount} ${tokenName} to ${to}`);
    const finalizedTxData = await counterContract.callTx.mint(Buffer.from(tokenName, 'hex'), amount, to);
    logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
    return finalizedTxData.public;
};
exports.mint = mint;
const burn = async (counterContract) => {
    logger.info('withdrawing...');
    const coin = coinInfo((0, ledger_1.tokenType)(Buffer.from(tokenName, 'hex'), counterContract.deployTxData.public.contractAddress), 5000005n);
    const finalizedTxData = await counterContract.callTx.burn(coin);
    logger.info(`Transaction ${finalizedTxData.public.txId} added in block ${finalizedTxData.public.blockHeight}`);
    return finalizedTxData.public;
};
exports.burn = burn;
const displayCounterValue = async (providers, counterContract) => {
    const contractAddress = counterContract.deployTxData.public.contractAddress;
    const counterValue = await (0, exports.getCrossChainLedgerState)(providers, contractAddress);
    if (counterValue === null) {
        logger.info(`There is no counter contract deployed at ${contractAddress}.`);
    }
    else {
        logger.info(`Current counter value: ${(counterValue)}`);
    }
    return { contractAddress, counterValue };
};
exports.displayCounterValue = displayCounterValue;
const createWalletAndMidnightProvider = async (wallet) => {
    const state = await Rx.firstValueFrom(wallet.state());
    return {
        coinPublicKey: state.coinPublicKey,
        encryptionPublicKey: state.encryptionPublicKey,
        balanceTx(tx, newCoins) {
            return wallet
                .balanceTransaction(zswap_1.Transaction.deserialize(tx.serialize((0, midnight_js_network_id_1.getLedgerNetworkId)()), (0, midnight_js_network_id_1.getZswapNetworkId)()), newCoins)
                .then((tx) => wallet.proveTransaction(tx))
                .then((zswapTx) => ledger_1.Transaction.deserialize(zswapTx.serialize((0, midnight_js_network_id_1.getZswapNetworkId)()), (0, midnight_js_network_id_1.getLedgerNetworkId)()))
                .then(midnight_js_types_1.createBalancedTx);
        },
        submitTx(tx) {
            return wallet.submitTransaction(tx);
        },
    };
};
exports.createWalletAndMidnightProvider = createWalletAndMidnightProvider;
const configureProviders = async (wallet, config) => {
    const walletAndMidnightProvider = await (0, exports.createWalletAndMidnightProvider)(wallet);
    return {
        privateStateProvider: (0, midnight_js_level_private_state_provider_1.levelPrivateStateProvider)({
            privateStateStoreName: config_js_1.contractConfig.privateStateStoreName,
        }),
        publicDataProvider: (0, midnight_js_indexer_public_data_provider_1.indexerPublicDataProvider)(config.indexer, config.indexerWS),
        zkConfigProvider: new midnight_js_node_zk_config_provider_1.NodeZkConfigProvider(config_js_1.contractConfig.zkConfigPath),
        proofProvider: (0, midnight_js_http_client_proof_provider_1.httpClientProofProvider)(config.proofServer),
        walletProvider: walletAndMidnightProvider,
        midnightProvider: walletAndMidnightProvider,
    };
};
exports.configureProviders = configureProviders;
function setLogger(_logger) {
    logger = _logger;
}
//# sourceMappingURL=api.js.map