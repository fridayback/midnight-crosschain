"use strict";
/*
 * @Author: liulin
 * @Date: 2025-06-20 12:02:08
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-12-03 21:52:00
 * @FilePath: /midnight-crosschain/contract/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// export * as CrossChain from "./managed/crosschain/contract/index.cjs";
// export * from "./witnesses.js";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidnightWalletSDK = exports.initNetwork = exports.getCoinPublicKeyFromShieldAddress = exports.configureProviders = exports.genRandomBigint = exports.genSigningKey = exports.getTreasuryCoinsFromState = exports.removeContractCircuit = exports.upgradeContractCircuit = exports.CrossChainApi = exports.walletBalance = exports.walletAddress = exports.getSerializeWalletState = exports.isAnotherChain = exports.buildWalletAndWaitForFunds = exports.waitForFunds = exports.waitForSyncProgress = exports.waitForSync = exports.createWalletAndMidnightProvider = exports.crosschainContractInstance = exports.witnesses = exports.createCrossChainPrivateState = exports.ZKConfig = exports.currentDir = exports.CrossChainPrivateStateId = void 0;
exports.pad = pad;
const node_path_1 = __importDefault(require("node:path"));
// import { witnesses, type CrossChainPrivateState } from './witnesses.js';
const CrossChain = __importStar(require("./managed/crosschain/contract/index.cjs"));
const midnight_js_types_1 = require("@midnight-ntwrk/midnight-js-types");
const midnight_js_contracts_1 = require("@midnight-ntwrk/midnight-js-contracts");
const midnight_js_level_private_state_provider_1 = require("@midnight-ntwrk/midnight-js-level-private-state-provider");
const midnight_js_indexer_public_data_provider_1 = require("@midnight-ntwrk/midnight-js-indexer-public-data-provider");
const midnight_js_node_zk_config_provider_1 = require("@midnight-ntwrk/midnight-js-node-zk-config-provider");
const midnight_js_http_client_proof_provider_1 = require("@midnight-ntwrk/midnight-js-http-client-proof-provider");
const ledger_1 = require("@midnight-ntwrk/ledger");
const zswap_1 = require("@midnight-ntwrk/zswap");
const midnight_js_network_id_1 = require("@midnight-ntwrk/midnight-js-network-id");
const midnight_js_utils_1 = require("@midnight-ntwrk/midnight-js-utils");
const wallet_sdk_address_format_1 = require("@midnight-ntwrk/wallet-sdk-address-format");
const Rx = __importStar(require("rxjs"));
const compact_runtime_1 = require("@midnight-ntwrk/compact-runtime");
const wallet_1 = require("@midnight-ntwrk/wallet");
const midnight_js_types_2 = require("@midnight-ntwrk/midnight-js-types");
const node_assert_1 = __importDefault(require("node:assert"));
exports.CrossChainPrivateStateId = 'crossChainPrivateState';
exports.currentDir = node_path_1.default.resolve(new URL(__dirname).pathname, '..');
// export const currentDir = path.resolve(new URL(import.meta.url).pathname, '..');
// export const currentDir = path.dirname(fileURLToPath(import.meta.url));
exports.ZKConfig = {
    privateStateStoreName: 'crosschain-private-state',
    zkConfigPath: node_path_1.default.resolve(exports.currentDir, 'managed', 'crosschain'),
};
const createCrossChainPrivateState = () => ({});
exports.createCrossChainPrivateState = createCrossChainPrivateState;
exports.witnesses = {
// TODO: Add witnesses
};
const coinInfo = (token, value) => (0, ledger_1.encodeCoinInfo)((0, ledger_1.createCoinInfo)(token, value));
const fromHexWithOrNoPrefix = (hex) => {
    if (hex.startsWith('0x')) {
        return (0, midnight_js_utils_1.fromHex)(hex.slice(2));
    }
    return (0, midnight_js_utils_1.fromHex)(hex);
};
function pad(s, n) {
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(s);
    if (n < utf8Bytes.length) {
        throw new Error(`The padded length n must be at least ${utf8Bytes.length}`);
    }
    const paddedArray = new Uint8Array(n);
    paddedArray.set(utf8Bytes);
    return paddedArray;
}
exports.crosschainContractInstance = new CrossChain.Contract(exports.witnesses);
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
const waitForSync = (wallet) => Rx.firstValueFrom(wallet.state().pipe(Rx.throttleTime(1_000), Rx.tap((state) => {
    const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
    const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
}), Rx.filter((state) => {
    // Let's allow progress only if wallet is synced fully
    return state.syncProgress !== undefined && state.syncProgress.synced;
})));
exports.waitForSync = waitForSync;
const waitForSyncProgress = async (wallet) => await Rx.firstValueFrom(wallet.state().pipe(Rx.throttleTime(1_000), Rx.tap((state) => {
    const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
    const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
}), Rx.filter((state) => {
    // Let's allow progress only if syncProgress is defined
    return state.syncProgress !== undefined;
})));
exports.waitForSyncProgress = waitForSyncProgress;
const waitForFunds = (wallet) => Rx.firstValueFrom(wallet.state().pipe(Rx.throttleTime(10_000), Rx.tap((state) => {
    const applyGap = state.syncProgress?.lag.applyGap ?? 0n;
    const sourceGap = state.syncProgress?.lag.sourceGap ?? 0n;
}), Rx.filter((state) => {
    // Let's allow progress only if wallet is synced
    // for( const token in state.balances){
    //   console.log('*******',token, state.balances[token])
    // }
    return state.syncProgress?.synced === true;
}), Rx.map((s) => s.balances)));
exports.waitForFunds = waitForFunds;
const buildWalletAndWaitForFunds = async ({ indexer, indexerWS, node, proofServer }, seed, serializedState) => {
    let wallet;
    if (serializedState) {
        wallet = await wallet_1.WalletBuilder.restore(indexer, indexerWS, proofServer, node, seed, serializedState, 'info', true);
        wallet.start();
        const stateObject = JSON.parse(serializedState);
        if ((await (0, exports.isAnotherChain)(wallet, Number(stateObject.offset))) === true) {
            console.warn('The chain was reset, building wallet from scratch');
            wallet = await wallet_1.WalletBuilder.build(indexer, indexerWS, proofServer, node, seed, (0, midnight_js_network_id_1.getZswapNetworkId)(), 'info', true);
            wallet.start();
            console.log('Wallet was built from scratch 1');
        }
    }
    else {
        console.log('Wallet save file not found, building wallet from scratch');
        wallet = await wallet_1.WalletBuilder.build(indexer, indexerWS, proofServer, node, seed, (0, midnight_js_network_id_1.getZswapNetworkId)(), 'info', true);
        wallet.start();
        console.log('Wallet was built from scratch 2');
    }
    {
        const newState = await (0, exports.waitForSync)(wallet);
        // allow for situations when there's no new index in the network between runs
        if (newState.syncProgress?.synced) {
            console.info('Wallet was able to sync from restored state');
        }
        else {
            throw new Error('Wallet was not able to sync from restored state');
        }
    }
    const state = await Rx.firstValueFrom(wallet.state());
    console.info(`Your wallet address is: ${state.address}`);
    let balance = state.balances[(0, ledger_1.nativeToken)()];
    if (balance === undefined || balance === 0n) {
        console.info(`Your wallet balance is: 0`);
        console.info(`Waiting to receive tokens...`);
        balance = (await (0, exports.waitForFunds)(wallet))[(0, ledger_1.nativeToken)()];
    }
    console.info(`Your wallet balance is: ${balance}`);
    return wallet;
};
exports.buildWalletAndWaitForFunds = buildWalletAndWaitForFunds;
const isAnotherChain = async (wallet, offset) => {
    await (0, exports.waitForSyncProgress)(wallet);
    // Here wallet does not expose the offset block it is synced to, that is why this workaround
    const walletOffset = Number(JSON.parse(await wallet.serializeState()).offset);
    if (walletOffset < offset - 1) {
        console.info(`Your offset offset is: ${walletOffset} restored offset: ${offset} so it is another chain`);
        return true;
    }
    else {
        console.info(`Your offset offset is: ${walletOffset} restored offset: ${offset} ok`);
        return false;
    }
};
exports.isAnotherChain = isAnotherChain;
const getSerializeWalletState = async (wallet) => {
    return await wallet.serializeState();
};
exports.getSerializeWalletState = getSerializeWalletState;
const walletAddress = async (wallet) => {
    const state = await Rx.firstValueFrom(wallet.state());
    return state.address;
};
exports.walletAddress = walletAddress;
const walletBalance = async (wallet) => {
    const state = await Rx.firstValueFrom(wallet.state());
    return state.balances;
};
exports.walletBalance = walletBalance;
const MAX_SIGNER_COUNT = 29;
class CrossChainApi {
    providers;
    crossChainContract;
    MaxSmgSignators = 29;
    MaxMergeCoins = 4;
    constructor() {
        // setNetworkId(networkId);
    }
    async init(config, wallet) {
        const walletAndMidnightProvider = await (0, exports.createWalletAndMidnightProvider)(wallet);
        this.providers = {
            privateStateProvider: (0, midnight_js_level_private_state_provider_1.levelPrivateStateProvider)({
                privateStateStoreName: 'CCPSSN',
            }),
            publicDataProvider: (0, midnight_js_indexer_public_data_provider_1.indexerPublicDataProvider)(config.indexer, config.indexerWS),
            zkConfigProvider: new midnight_js_node_zk_config_provider_1.NodeZkConfigProvider(exports.ZKConfig.zkConfigPath),
            proofProvider: (0, midnight_js_http_client_proof_provider_1.httpClientProofProvider)(config.proofServer),
            walletProvider: walletAndMidnightProvider,
            midnightProvider: walletAndMidnightProvider,
        };
    }
    async setWallet(wallet) {
        const walletAndMidnightProvider = await (0, exports.createWalletAndMidnightProvider)(wallet);
        this.providers = {
            ...this.providers,
            walletProvider: walletAndMidnightProvider,
            midnightProvider: walletAndMidnightProvider,
        };
    }
    async deployContract(adminThreshold, smgPkThreshold, signingKey) {
        this.crossChainContract = await (0, midnight_js_contracts_1.deployContract)(this.providers, {
            contract: exports.crosschainContractInstance,
            privateStateId: exports.CrossChainPrivateStateId,
            initialPrivateState: {},
            signingKey: signingKey,
            args: [BigInt(adminThreshold), BigInt(smgPkThreshold)]
        });
        // // logger.info(`Deployed contract at address: ${this.crossChainContract.deployTxData.public.contractAddress}`);
        return this.crossChainContract.deployTxData.public.contractAddress;
    }
    async join(contractAddress) {
        this.crossChainContract = await (0, midnight_js_contracts_1.findDeployedContract)(this.providers, {
            contractAddress,
            contract: exports.crosschainContractInstance,
            privateStateId: exports.CrossChainPrivateStateId,
            initialPrivateState: {},
        });
    }
    checkCrossData(uniqueId, smgId, tokenPairId, amount, fee, toAddr, coins, ttl) {
        const uniqueId_0 = Buffer.from(uniqueId, 'hex');
        (0, node_assert_1.default)(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
        const smgId_0 = Buffer.from(smgId, 'hex');
        (0, node_assert_1.default)(smgId_0.length === 32, `smgId must be 32 bytes long`);
        const tokenPairId_0 = BigInt(tokenPairId);
        const amount_0 = BigInt(amount);
        const fee_0 = BigInt(fee);
        const toAddr_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(toAddr) };
        const ttl_0 = BigInt(ttl);
        return {
            uniqueId: uniqueId_0,
            smgId: smgId_0,
            tokenPairId: tokenPairId_0,
            amount: amount_0,
            fee: fee_0,
            toAddr: toAddr_0,
            ttl: ttl_0,
        };
    }
    async getTokenPairInfo(tokenPairId) {
        const ledger = await this.getLedgerState();
        return ledger?.tokenPairs.lookup(BigInt(tokenPairId));
    }
    async getTokensTotalSupply(tokens) {
        const ledger = await this.getLedgerState();
        const tokensTotalSupply = tokens.map((token) => {
            const token_0 = Buffer.from(token, 'hex');
            const totalSupply = ledger?.mappintTokenTotalSupply.member(token_0) ? ledger?.mappintTokenTotalSupply.lookup(token_0).toString(10) : '0';
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
    static getCrossTxInfo(ledger, uniqueId) {
        const uniquId_0 = Buffer.from(uniqueId, 'hex');
        if (ledger.crossProposal.member(uniquId_0)) {
            const crossTxInfo = ledger.crossProposal.lookup(uniquId_0);
            return {
                smgId: (0, midnight_js_utils_1.toHex)(crossTxInfo.smgId),
                token: (0, midnight_js_utils_1.toHex)(crossTxInfo.token),
                tokenPairId: crossTxInfo.tokenPairId.toString(10),
                amount: crossTxInfo.amount.toString(10),
                fee: crossTxInfo.fee.toString(10),
                toAddr: crossTxInfo.toAddr,
                ttl: crossTxInfo.ttl.toString(10),
            };
        }
    }
    static parseContractState(stateHex) {
        const state = compact_runtime_1.ContractState.deserialize(Buffer.from(stateHex, 'hex'), (0, midnight_js_network_id_1.getRuntimeNetworkId)());
        return CrossChain.ledger(state.data);
    }
    static currentExecuteCrossProposal(ledger) {
        let res = [];
        for (const smgEvent of ledger.currentExecuteCrossProposal) {
            res.push({
                smgId: (0, midnight_js_utils_1.toHex)(smgEvent.crossProposal.smgId),
                uniqueId: (0, midnight_js_utils_1.toHex)(smgEvent.uniqueId),
                token: (0, midnight_js_utils_1.toHex)(smgEvent.crossProposal.token),
                tokenPairId: smgEvent.crossProposal.tokenPairId.toString(10),
                isMappingToken: smgEvent.crossProposal.isMappingToken,
                amount: smgEvent.crossProposal.amount.toString(10),
                fee: smgEvent.crossProposal.fee.toString(10),
                toAddr: (0, midnight_js_utils_1.toHex)(smgEvent.crossProposal.toAddr.bytes),
                ttl: smgEvent.crossProposal.ttl.toString(10)
            });
        }
        return res;
    }
    static latestOutBoundCrosstxInfo(ledger) {
        if (ledger.latestOutBoundCrosstxInfo.nonce === 0n) {
            return;
        }
        else {
            return {
                smgId: (0, midnight_js_utils_1.toHex)(ledger.latestOutBoundCrosstxInfo.smgId),
                fromAddr: (0, midnight_js_utils_1.toHex)(ledger.latestOutBoundCrosstxInfo.fromAddr.bytes),
                toAddr: ledger.latestOutBoundCrosstxInfo.toAddr,
                tokenPairId: ledger.latestOutBoundCrosstxInfo.tokenPairId.toString(10),
                tokenAccount: ledger.latestOutBoundCrosstxInfo.tokenAccount,
                amount: ledger.latestOutBoundCrosstxInfo.amount.toString(10),
                fee: ledger.latestOutBoundCrosstxInfo.fee.toString(10),
                nonce: ledger.latestOutBoundCrosstxInfo.nonce.toString(10),
            };
        }
    }
    async isVoter(ledger, voter) {
        let voterPK;
        if (voter) {
            voterPK = (0, exports.getCoinPublicKeyFromShieldAddress)(voter);
        }
        else {
            voterPK = (0, midnight_js_utils_1.fromHex)(this.providers.walletProvider.coinPublicKey);
        }
        return ledger.smgTxSigners.member({ bytes: voterPK });
    }
    async getUnVotedCrossProposal(ledger, voter) {
        let voterPK;
        if (voter) {
            voterPK = (0, exports.getCoinPublicKeyFromShieldAddress)(voter);
        }
        else {
            voterPK = (0, midnight_js_utils_1.fromHex)(this.providers.walletProvider.coinPublicKey);
        }
        if (!this.isVoter(ledger, voter))
            return [];
        const voterIndex = ledger.smgTxSigners.lookup({ bytes: voterPK });
        let res = [];
        for (const [uniquId, _] of ledger.crossProposal) {
            const voters = ledger.crossProposalVoters.lookup(uniquId);
            if (voters.size() >= ledger.smgPKThreshold)
                continue;
            if (voters.member(voterIndex))
                continue;
            else {
                const crossTxInfo = CrossChainApi.getCrossTxInfo(ledger, (0, midnight_js_utils_1.toHex)(uniquId));
                res.push(crossTxInfo);
            }
        }
        return res;
    }
    async getUnExecuteCrossProposal(ledger) {
        // const selfPk = this.providers.walletProvider.coinPublicKey;
        // const voterIndex = ledger.smgTxSigners.lookup({ bytes: fromHex(selfPk) });
        let res = [];
        for (const [uniquId, crossProposal] of ledger.crossProposal) {
            const voters = ledger.crossProposalVoters.lookup(uniquId);
            if (voters.size() >= ledger.smgPKThreshold) {
                res.push({
                    uniqueId: (0, midnight_js_utils_1.toHex)(uniquId),
                    smgId: (0, midnight_js_utils_1.toHex)(crossProposal.smgId),
                    tokenPairId: crossProposal.tokenPairId.toString(10),
                    token: (0, midnight_js_utils_1.toHex)(crossProposal.token),
                    amount: crossProposal.amount.toString(10),
                    fee: crossProposal.fee.toString(10),
                    toAddr: (0, midnight_js_utils_1.toHex)(crossProposal.toAddr.bytes),
                    ttl: crossProposal.ttl.toString(10)
                });
            }
        }
        return res;
    }
    /////////////////////////////////////////////////  Cross Tx  /////////////////////////////////////////////////////////////
    async userLock(smgId, toAddress, tokenPair, amount) {
        // const smgId_0 = Buffer.from(smgId, 'hex');
        // assert(smgId_0.length === 32, `smgId must be 32 bytes long`);
        // const tokenPair_0 = BigInt(tokenPair);
        // const pairInfo = await this.getTokenPairInfo(tokenPair_0);
        // assert(pairInfo, `tokenPairId ${tokenPair} not found`);
        // const amount_0 = BigInt(amount);
        // const token = decodeTokenType(pairInfo.midnigthTokenAccount);
        // const coin_0 = coinInfo(token, amount_0);
        // const finalizedTxData = await this.crossChainContract.callTx.userLock(smgId_0, toAddress, tokenPair_0, coin_0);
        // return finalizedTxData;
    }
    async smgRelease(uniqueId, smgId, tokenPair, amount, fee, toAddr, ttl) {
        // const proof = this.checkCrossData(uniqueId, smgId, tokenPair, amount, fee, toAddr, undefined, ttl);
        // const finalizedTxData = await this.crossChainContract.callTx.smgRelease(
        //   proof.uniqueId, proof.smgId, proof.tokenPairId, proof.amount, proof.toAddr, proof.fee, proof.ttl);
        // return finalizedTxData;
    }
    async smgMint(uniqueId, smgId, tokenPair, amount, fee, toAddr, ttl) {
        const proof = this.checkCrossData(uniqueId, smgId, tokenPair, amount, fee, toAddr, undefined, ttl);
        const finalizedTxData = await this.crossChainContract.callTx.smgMint(proof.uniqueId, proof.smgId, proof.tokenPairId, proof.amount, proof.fee, proof.toAddr, proof.ttl);
        return finalizedTxData;
    }
    async userBurn(smgId, toAddress, tokenPair, amount) {
        const smgId_0 = Buffer.from(smgId, 'hex');
        (0, node_assert_1.default)(smgId_0.length === 32, `smgId must be 32 bytes long`);
        const tokenPair_0 = BigInt(tokenPair);
        const pairInfo = await this.getTokenPairInfo(tokenPair_0);
        (0, node_assert_1.default)(pairInfo, `tokenPairId ${tokenPair} not found`);
        const amount_0 = BigInt(amount);
        const token = (0, ledger_1.decodeTokenType)(pairInfo.midnigthTokenAccount);
        const coin_0 = coinInfo(token, amount_0);
        const finalizedTxData = await this.crossChainContract.callTx.userBurn(smgId_0, toAddress, tokenPair_0, coin_0);
        return finalizedTxData;
    }
    async voteCrossProposal(uniqueId, ttl) {
        const uniqueId_0 = Buffer.from(uniqueId, 'hex');
        const ttl_0 = BigInt(ttl);
        (0, node_assert_1.default)(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
        const finalizedTxData = await this.crossChainContract.callTx.voteCrossProposal({ uniqueId: uniqueId_0, ttl: ttl_0 });
        return finalizedTxData;
    }
    async voteMultiCrossProposal(uniqueIds) {
        const uniqueIds_0 = uniqueIds.map((item) => {
            const uniqueId_0 = Buffer.from(item.uniqueId, 'hex');
            const ttl_0 = BigInt(item.ttl);
            (0, node_assert_1.default)(uniqueId_0.length === 32, `uniqueId(${uniqueId_0}) must be 32 bytes long`);
            return { uniqueId: uniqueId_0, ttl: ttl_0 };
        });
        (0, node_assert_1.default)(uniqueIds_0.length <= 5 && uniqueIds_0.length > 0, `uniqueIds length must be between 1 and 5`);
        for (let index = uniqueIds_0.length; index < 5; index++) {
            uniqueIds_0.push({ uniqueId: Buffer.alloc(32), ttl: BigInt(0) });
        }
        const finalizedTxData = await this.crossChainContract.callTx.voteMultiCrossProposal(uniqueIds_0);
        return finalizedTxData;
    }
    async executeCrossProposal(uniqueId, coinIndex) {
        // const uniqueId_0 = Buffer.from(uniqueId, 'hex');
        // assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
        // let coinIndex_0 = BigInt(0);
        // if (coinIndex) {
        //   coinIndex_0 = BigInt(coinIndex);
        // }
        // const finalizedTxData = await this.crossChainContract.callTx.executeCrossProposal(uniqueId_0, coinIndex_0);
        // return finalizedTxData;
    }
    async executeMultiCrossProposal(uniqueIds) {
        const uniqueIds_0 = uniqueIds.map((item) => {
            const uniqueId_0 = Buffer.from(item.uniqueId, 'hex');
            (0, node_assert_1.default)(uniqueId_0.length === 32, `uniqueId(${item.uniqueId}) must be 32 bytes long`);
            let coinIndex_0 = BigInt(0);
            if (item.coinIndex) {
                coinIndex_0 = BigInt(item.coinIndex);
            }
            return { uniqueId: uniqueId_0, coinIndex: coinIndex_0 };
        });
        (0, node_assert_1.default)(uniqueIds_0.length <= 5 && uniqueIds_0.length > 0, `uniqueIds must be between 1 and 5`);
        for (let index = uniqueIds_0.length; index < 5; index++) {
            uniqueIds_0.push({ uniqueId: Buffer.alloc(32), coinIndex: BigInt(0) });
        }
        const finalizedTxData = await this.crossChainContract.callTx.executeMultiCrossProposal(uniqueIds_0);
        return finalizedTxData;
    }
    async userRechargeForFee(amount) {
        const amount_0 = BigInt(amount);
        const coin_0 = coinInfo((0, ledger_1.nativeToken)(), amount_0);
        const finalizedTxData = await this.crossChainContract.callTx.userRechargeForFee(coin_0);
        return finalizedTxData;
    }
    async approveUserWithdrawFee(user, amount) {
        const key_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(user) };
        const ledgerState = await this.getLedgerState();
        (0, node_assert_1.default)(ledgerState != null, `ledgerState is null`);
        const amount_0 = BigInt(amount);
        const balance_0 = ledgerState.userFeeBalance.lookup(key_0);
        (0, node_assert_1.default)(balance_0 >= amount_0, `user ${user} has not enough fee balance real (${balance_0}) vs withdraw ${amount_0}`);
        const coin_0 = coinInfo((0, ledger_1.nativeToken)(), BigInt(amount));
        const finalizedTxData = await this.crossChainContract.callTx.approveUserWithdrawFee(key_0, coin_0);
        return finalizedTxData;
    }
    async userClaim(uniqueId, isMappingToken) {
        if (isMappingToken) {
            return this.userClaimMappingToken(uniqueId);
        }
        else {
            return this.userClaimCoin(uniqueId);
        }
    }
    async userClaimCoin(uniqueId) {
        const uniqueId_0 = Buffer.from(uniqueId, 'hex');
        (0, node_assert_1.default)(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
        const finalizedTxData = await this.crossChainContract.callTx.userClaimCoin(uniqueId_0);
        return finalizedTxData;
    }
    async userClaimMappingToken(uniqueId) {
        const uniqueId_0 = Buffer.from(uniqueId, 'hex');
        (0, node_assert_1.default)(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
        const finalizedTxData = await this.crossChainContract.callTx.userClaimMappingToken(uniqueId_0);
        return finalizedTxData;
    }
    async addReserve(token, amount) {
        const amount_0 = BigInt(amount);
        const coin_0 = coinInfo(token, amount_0);
        const finalizedTxData = await this.crossChainContract.callTx.addReserve(coin_0);
        return finalizedTxData;
    }
    async withdrawReserveOfNativeToken(token, coinIndex) {
        const coinIndex_0 = BigInt(coinIndex);
        const token_0 = (0, ledger_1.encodeTokenType)(token);
        const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfNativeToken(token_0, coinIndex_0);
        return finalizedTxData;
    }
    async withdrawReserveOfMappingToken(domainSep) {
        const token_0 = pad(domainSep, 32);
        const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfMappingToken(token_0);
        return finalizedTxData;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async getLedgerState() {
        (0, midnight_js_utils_1.assertIsContractAddress)(this.crossChainContract?.deployTxData.public.contractAddress);
        const state = await this.providers.publicDataProvider
            .queryContractState(this.crossChainContract?.deployTxData.public.contractAddress)
            .then((contractState) => (contractState != null ? CrossChain.ledger(contractState.data) : null));
        return state;
    }
    ///////////////////////////////////////////////        management      ////////////////////////////////////////////////////////
    async transferOwner(newOwner) {
        const newOwner_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(newOwner) };
        const finalizedTxData = await this.crossChainContract.callTx.transferOwner(newOwner_0);
        return finalizedTxData;
    }
    async acceptOwner() {
        const finalizedTxData = await this.crossChainContract.callTx.acceptOwner();
        return finalizedTxData;
    }
    async updateSmgPk(newVoter) {
        const newVoter_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(newVoter) };
        const finalizedTxData = await this.crossChainContract.callTx.updateSmgPk(newVoter_0);
        return finalizedTxData;
    }
    async setFeeReceiver(feeReceiver) {
        const feeReceiver_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(feeReceiver) };
        const finalizedTxData = await this.crossChainContract.callTx.setFeeReceiver(feeReceiver_0);
        return finalizedTxData;
    }
    async setTokenManager(tokenManager) {
        const tokenManager_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(tokenManager) };
        const finalizedTxData = await this.crossChainContract.callTx.setTokenManager(tokenManager_0);
        return finalizedTxData;
    }
    async setMegerWorker(mergeWorker) {
        const megerWorker_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(mergeWorker) };
        const finalizedTxData = await this.crossChainContract.callTx.setMegerWorker(megerWorker_0);
        return finalizedTxData;
    }
    // async mergeTreasuryCoin(coins: bigint[] | number[] | string[]): Promise<FinalizedCallTxData<CrossChainContract, "mergeTreasuryCoin">>{
    //   if (coins.length != 2) throw 'can only merge 2 coins';
    //   const coins_0 = coins.map(coin => BigInt(coin));
    //   const finalizedTxData = await this.crossChainContract.callTx.mergeTreasuryCoin(coins_0);
    //   return finalizedTxData;
    // }
    async addAdmin(admin) {
        const admin_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(admin) };
        const finalizedTxData = await this.crossChainContract.callTx.addAdmin(admin_0);
        return finalizedTxData;
    }
    async removeAdmin(admin) {
        const admin_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(admin) };
        const finalizedTxData = await this.crossChainContract.callTx.removeAdmin(admin_0);
        return finalizedTxData;
    }
    async setAdminThreshold(threshold) {
        const threshold_0 = BigInt(threshold);
        if (threshold_0 < 1n)
            throw 'threshold must be greater than 0';
        const finalizedTxData = await this.crossChainContract.callTx.setAdminThreshold(threshold_0);
        return finalizedTxData;
    }
    async setSmgPksks(voters) {
        (0, node_assert_1.default)(voters.length > 0, 'voters must not be empty');
        const voters_0 = voters.map(voter => {
            return { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(voter) };
            // return { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(voter, getZswapNetworkId())) } 
        });
        for (let index = voters_0.length; index < MAX_SIGNER_COUNT; index++) {
            voters_0.push({ bytes: Buffer.alloc(32) });
        }
        const finalizedTxData = await this.crossChainContract.callTx.setSmgPksks(voters_0);
        return finalizedTxData;
    }
    async setSmgPKThreold(threshold) {
        const threshold_0 = BigInt(threshold);
        const finalizedTxData = await this.crossChainContract.callTx.setSmgPKThreold(threshold_0);
        return finalizedTxData;
    }
    async setFeeCommonConfig(chainId, fee) {
        const chainId_0 = BigInt(chainId);
        const fee_0 = BigInt(fee);
        const finalizedTxData = await this.crossChainContract.callTx.setFeeCommonConfig(chainId_0, fee_0);
        return finalizedTxData;
    }
    async addTokenPair(tokenPairId, fromChainId, toChainId, midnigthTokenAccount, domainSep, fee) {
        const tokenPairId_0 = BigInt(tokenPairId);
        const fromChainId_0 = BigInt(fromChainId);
        const toChainId_0 = BigInt(toChainId);
        const midnigtAccount_0 = (0, ledger_1.encodeTokenType)(midnigthTokenAccount);
        const domainSep_0 = pad(domainSep, 32);
        if (domainSep == '') {
            const expectedTokenType = (0, ledger_1.tokenType)(domainSep_0, this.crossChainContract.deployTxData.public.contractAddress);
            (0, node_assert_1.default)(expectedTokenType == midnigthTokenAccount, `token type not match ,${expectedTokenType} expected but got ${midnigthTokenAccount}`);
        }
        const fee_0 = BigInt(fee);
        const tokenPair = {
            fromChainId: fromChainId_0,
            toChainId: toChainId_0,
            midnigthTokenAccount: midnigtAccount_0,
            domainSep: domainSep_0,
            fee: fee_0
        };
        const finalizedTxData = await this.crossChainContract.callTx.addTokenPair(tokenPairId_0, tokenPair);
        return finalizedTxData;
    }
    async removeTokenPair(tokenPairId) {
        const tokenPairId_0 = BigInt(tokenPairId);
        const finalizedTxData = await this.crossChainContract.callTx.removeTokenPair(tokenPairId_0);
        return finalizedTxData;
    }
    async newProposal(proposal) {
        const finalizedTxData = await this.crossChainContract.callTx.newProposal(proposal);
        return finalizedTxData;
    }
    async addAdminProposal(addr) {
        // const addr_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(addr, getZswapNetworkId())) };
        const addr_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(addr) };
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.AddAdmin;
        proposal.addr = addr_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async removeAdminProposal(addr) {
        const addr_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(addr) };
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.RemoveAdmin;
        proposal.addr = addr_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async updateFeeReceiverProposal(addr) {
        const addr_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(addr) };
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.UpdateFeeReceiver;
        proposal.addr = addr_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async updateTokenManagerProposal(addr) {
        const addr_0 = { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(addr) };
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.UpdateTokenManager;
        proposal.addr = addr_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async updateAdminThresholdProposal(threshold) {
        const threshold_0 = BigInt(threshold);
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.UpdateAdminThreshold;
        proposal.threshold = threshold_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    defaultProsal() {
        return {
            type: CrossChain.ProposalType.UpdateAdminThreshold,
            addr: { bytes: fromHexWithOrNoPrefix("") },
            threshold: BigInt(0),
            feeConfig: { fee: BigInt(0), chainId: BigInt(0) },
            smgPubkeys: new Array(this.MaxSmgSignators).fill({ x: 0n, y: 0n })
        };
    }
    async updateSMGPKThresholdProposal(threshold) {
        const threshold_0 = BigInt(threshold);
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.UpdateSMGPKThreshold;
        proposal.threshold = threshold_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async updateFeeCommonConfigProposal(chainId, fee) {
        const chainId_0 = BigInt(chainId);
        const fee_0 = BigInt(fee);
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.UpdateFeeCommonConfig;
        proposal.feeConfig = { fee: fee_0, chainId: chainId_0 };
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    //////////////////////////////////////////////////////////////////////////////////////////
    async voteProposal(proposalId) {
        const proposalId_0 = BigInt(proposalId);
        const finalizedTxData = await this.crossChainContract.callTx.voteProposal(proposalId_0);
        return finalizedTxData;
    }
    async executeProposal(proposalId) {
        const proposalId_0 = BigInt(proposalId);
        const finalizedTxData = await this.crossChainContract.callTx.executeProposal(proposalId_0);
        return finalizedTxData;
    }
    async removeExpiredHisTxs(txs) {
        (0, node_assert_1.default)(txs.length <= 20, 'txs length should be less than 20');
        const txs_0 = txs.map((tx) => Buffer.from(tx, 'hex'));
        for (let index = txs_0.length; index < 20; index++) {
            txs_0.push(Buffer.alloc(32));
        }
        const finalizedTxData = await this.crossChainContract.callTx.removeExpiredHisTxs(txs_0);
        return finalizedTxData;
    }
    async updateContractAuthority(newKey) {
        return await this.crossChainContract.contractMaintenanceTx.replaceAuthority(newKey);
    }
    async upgradeContract(circuitId, newCircuitHex) {
        let newVK;
        if (newCircuitHex) {
            newVK = (0, midnight_js_types_2.createVerifierKey)((0, midnight_js_utils_1.fromHex)(newCircuitHex));
        }
        else {
            newVK = await this.providers.zkConfigProvider.getVerifierKey(circuitId);
        }
        const res1 = await this.crossChainContract.circuitMaintenanceTx[circuitId].removeVerifierKey();
        const res2 = await this.crossChainContract.circuitMaintenanceTx[circuitId].insertVerifierKey(newVK);
        return res2;
    }
}
exports.CrossChainApi = CrossChainApi;
const upgradeContractCircuit = async (providers, contractAddress, circuitId, newVkHex) => {
    (0, midnight_js_utils_1.assertIsContractAddress)(contractAddress);
    let newVk;
    if (newVkHex) {
        newVk = (0, midnight_js_types_2.createVerifierKey)((0, midnight_js_utils_1.fromHex)(newVkHex));
    }
    else {
        newVk = await providers.zkConfigProvider.getVerifierKey(circuitId);
    }
    return await (0, midnight_js_contracts_1.submitInsertVerifierKeyTx)(providers, contractAddress, circuitId, newVk);
};
exports.upgradeContractCircuit = upgradeContractCircuit;
const removeContractCircuit = async (providers, contractAddress, circuitId) => {
    (0, midnight_js_utils_1.assertIsContractAddress)(contractAddress);
    return await (0, midnight_js_contracts_1.submitRemoveVerifierKeyTx)(providers, contractAddress, circuitId);
};
exports.removeContractCircuit = removeContractCircuit;
const getTreasuryCoinsFromState = (state) => {
    let treasuryCoins = new Map();
    console.log('treasuryCoins size:', state.treasuryCoins.size());
    for (const [coinId, coin] of state.treasuryCoins) {
        const tokenType = (0, ledger_1.decodeTokenType)(coin.color);
        if (!treasuryCoins.has(tokenType)) {
            treasuryCoins.set(tokenType, new Map());
        }
        treasuryCoins.get(tokenType)?.set(coinId, coin);
        //   {
        //   treasuryCoins.set(tokenType, new Map<bigint, CrossChain.QualifiedCoinInfo>());
        //   treasuryCoins.get(tokenType)?.set(coinId, coin);
        // }
    }
    return treasuryCoins;
};
exports.getTreasuryCoinsFromState = getTreasuryCoinsFromState;
const genSigningKey = () => {
    return (0, compact_runtime_1.sampleSigningKey)();
};
exports.genSigningKey = genSigningKey;
const genRandomBigint = () => {
    const r = (0, compact_runtime_1.transientHash)(new compact_runtime_1.CompactTypeOpaqueString(), (0, ledger_1.sampleCoinPublicKey)());
    return r;
};
exports.genRandomBigint = genRandomBigint;
const configureProviders = async (wallet, config) => {
    const walletAndMidnightProvider = await (0, exports.createWalletAndMidnightProvider)(wallet);
    // console.log('^^^^^^^^^^^^^^',ZKConfig.zkConfigPath)
    return {
        privateStateProvider: (0, midnight_js_level_private_state_provider_1.levelPrivateStateProvider)({
            privateStateStoreName: exports.ZKConfig.privateStateStoreName,
        }),
        publicDataProvider: (0, midnight_js_indexer_public_data_provider_1.indexerPublicDataProvider)(config.indexer, config.indexerWS),
        zkConfigProvider: new midnight_js_node_zk_config_provider_1.NodeZkConfigProvider(exports.ZKConfig.zkConfigPath),
        proofProvider: (0, midnight_js_http_client_proof_provider_1.httpClientProofProvider)(config.proofServer),
        walletProvider: walletAndMidnightProvider,
        midnightProvider: walletAndMidnightProvider,
    };
};
exports.configureProviders = configureProviders;
const getCoinPublicKeyFromShieldAddress = (shieldAddr) => {
    const tmp1 = wallet_sdk_address_format_1.MidnightBech32m.parse(shieldAddr);
    // const tmp1 = MidnightBech32m.parse('mn_shield-addr_test10th0dtqgnpanzwmqj236zccpkmj9xxpkl7r7e7cr5e3v7k0stm5qxqxa9m6z5f4603nyuu4kw9c65ektu48hhyrtu2f07h42ycppkvw9ccyry600');
    const tmp2 = wallet_sdk_address_format_1.ShieldedAddress.codec.decode(tmp1.network, tmp1);
    // console.log('coinPublicKeyString:', toHex(tmp2.coinPublicKey.data));
    return tmp2.coinPublicKey.data;
};
exports.getCoinPublicKeyFromShieldAddress = getCoinPublicKeyFromShieldAddress;
//only support 0-MainNet, 1-TestNet, 2-DevNet, 3-Undeployed
const initNetwork = (networkId) => {
    let network = midnight_js_network_id_1.NetworkId.TestNet;
    switch (networkId) {
        case 0:
            network = midnight_js_network_id_1.NetworkId.Undeployed;
            break;
        case 1:
            network = midnight_js_network_id_1.NetworkId.DevNet;
            break;
        case 2:
            network = midnight_js_network_id_1.NetworkId.TestNet;
            break;
        case 3:
            network = midnight_js_network_id_1.NetworkId.MainNet;
            break;
        default:
            throw new Error('Unknown networkId, only support 0-Undeployed, 1-DevNet, 2-TestNet, 3-MainNet');
    }
    (0, midnight_js_network_id_1.setNetworkId)(network);
};
exports.initNetwork = initNetwork;
class MidnightWalletSDK {
    config;
    // private NetWorkId: NetworkId;
    walletObj;
    walletAddress;
    bActiveFlag;
    storeTimer;
    constructor(config) {
        this.config = config;
        this.walletAddress = '';
        this.bActiveFlag = false;
    }
    //////////////////////////////////////////
    // to generate a wallet instance
    //////////////////////////////////////////
    async initWallet(strSeed, store, strSerializedState, saveInterval = 600000) {
        this.walletObj = await (0, exports.buildWalletAndWaitForFunds)(this.config, strSeed, strSerializedState);
        const selfWallet = this.walletObj;
        const state = await Rx.firstValueFrom(this.walletObj.state());
        this.walletAddress = state.address;
        const callBack = async () => {
            const ret = await selfWallet.serializeState();
            await store(ret);
            console.log('wallet state saved!');
            clearTimeout(this.storeTimer);
            this.storeTimer = setTimeout(callBack, saveInterval);
        };
        this.storeTimer = setTimeout(async () => {
            await callBack();
        }, saveInterval);
    }
    // to get the wallet address
    getAccountAddress() {
        return this.walletAddress;
    }
    async getBalances() {
        (0, node_assert_1.default)(this.walletObj, "walletObj is not initialized!");
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
                };
                aryBalance.push(item);
            }
        }
        return aryBalance;
    }
    async getAvailableCoins() {
        (0, node_assert_1.default)(this.walletObj, "walletObj is not initialized!");
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
        if (!this.walletObj)
            return '';
        return (0, exports.getSerializeWalletState)(this.walletObj);
    }
}
exports.MidnightWalletSDK = MidnightWalletSDK;
