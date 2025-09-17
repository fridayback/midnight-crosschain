/*
 * @Author: liulin
 * @Date: 2025-06-20 12:02:08
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-09-17 15:22:31
 * @FilePath: /midnight-crosschain/contract/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// export * as CrossChain from "./managed/crosschain/contract/index.cjs";
// export * from "./witnesses.js";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinPublicKeyFromShieldAddress = exports.configureProviders = exports.verifySignature = exports.signData = exports.genRandomBigint = exports.genSigningKey = exports.getTreasuryCoinsFromState = exports.CrossChainApi = exports.waitForSyncProgress = exports.waitForSync = exports.waitForFunds = exports.buildWalletAndWaitForFunds = exports.createWalletAndMidnightProvider = exports.crosschainContractInstance = exports.witnesses = exports.createCrossChainPrivateState = exports.ZKConfig = exports.currentDir = exports.CrossChainPrivateStateId = void 0;
exports.pad = pad;
const tslib_1 = require("tslib");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
// import { witnesses, type CrossChainPrivateState } from './witnesses';
const CrossChain = tslib_1.__importStar(require("./managed/crosschain/contract/index.cjs"));
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
const Rx = tslib_1.__importStar(require("rxjs"));
const compact_runtime_1 = require("@midnight-ntwrk/compact-runtime");
const wallet_1 = require("@midnight-ntwrk/wallet");
const node_assert_1 = tslib_1.__importDefault(require("node:assert"));
exports.CrossChainPrivateStateId = 'crossChainPrivateState';
// export const currentDir = path.resolve(new URL(import.meta.url).pathname, '..');
exports.currentDir = node_path_1.default.resolve(new URL(__dirname).pathname, '..');
exports.ZKConfig = {
    privateStateStoreName: 'crosschain-private-state',
    zkConfigPath: node_path_1.default.resolve(exports.currentDir, 'managed', 'crosschain'),
};
const createCrossChainPrivateState = () => ({});
exports.createCrossChainPrivateState = createCrossChainPrivateState;
exports.witnesses = {
// TODO: Add witnesses
};
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
const buildWalletAndWaitForFunds = async ({ indexer, indexerWS, node, proofServer }, seed, filename) => {
    process.env.SYNC_CACHE;
    let wallet;
    wallet = await wallet_1.WalletBuilder.build(indexer, indexerWS, proofServer, node, seed, (0, midnight_js_network_id_1.getZswapNetworkId)(), 'info');
    wallet.start();
    const state = await Rx.firstValueFrom(wallet.state());
    // logger.info(`Your wallet seed is: ${seed}`);
    // logger.info(`Your wallet address is: ${state.address}`);
    console.log(`Your wallet address is: ${state.address}`);
    let balance = state.balances;
    // let balance = state.balances;
    // if (balance === undefined || balance === 0n) {
    if (Object.keys(balance).length === 0) {
        // logger.info(`Your wallet balance is: 0`);
        // logger.info(`Waiting to receive tokens...`);
        balance = await (0, exports.waitForFunds)(wallet);
    }
    return wallet;
};
exports.buildWalletAndWaitForFunds = buildWalletAndWaitForFunds;
const waitForFunds = (wallet) => Rx.firstValueFrom(wallet.state().pipe(Rx.throttleTime(10_000), Rx.tap((state) => {
    state.syncProgress?.lag.applyGap ?? 0n;
    state.syncProgress?.lag.sourceGap ?? 0n;
    // logger.info(`Waiting for funds. Backend lag: ${sourceGap}, wallet lag: ${applyGap}, transactions=${state.transactionHistory.length}`,);
}), Rx.filter((state) => {
    // Let's allow progress only if wallet is synced
    // logger.info(`wallet ZswapCoinPublicKey: ${parseCoinPublicKeyToHex(state.coinPublicKey, getLedgerNetworkId())},${state.coinPublicKey}`);
    return state.syncProgress?.synced === true;
}), 
// Rx.map((s) => s.balances[nativeToken()] ?? 0n),
Rx.map((s) => s.balances), Rx.filter((balance) => balance ? true : false)));
exports.waitForFunds = waitForFunds;
const waitForSync = (wallet) => Rx.firstValueFrom(wallet.state().pipe(Rx.throttleTime(5_000), Rx.tap((state) => {
    state.syncProgress?.lag.applyGap ?? 0n;
    state.syncProgress?.lag.sourceGap ?? 0n;
    // logger.info(`Waiting for funds. Backend lag: ${sourceGap}, wallet lag: ${applyGap}, transactions=${state.transactionHistory.length}`,);
}), Rx.filter((state) => {
    // Let's allow progress only if wallet is synced fully
    return state.syncProgress !== undefined && state.syncProgress.synced;
})));
exports.waitForSync = waitForSync;
const waitForSyncProgress = async (wallet) => await Rx.firstValueFrom(wallet.state().pipe(Rx.throttleTime(5_000), Rx.tap((state) => {
    state.syncProgress?.lag.applyGap ?? 0n;
    state.syncProgress?.lag.sourceGap ?? 0n;
    // logger.info(`Waiting for funds. Backend lag: ${sourceGap}, wallet lag: ${applyGap}, transactions=${state.transactionHistory.length}`,);
}), Rx.filter((state) => {
    // Let's allow progress only if syncProgress is defined
    return state.syncProgress !== undefined;
})));
exports.waitForSyncProgress = waitForSyncProgress;
class CrossChainApi {
    providers;
    crossChainContract;
    MaxSmgSignators = 29;
    MaxMergeCoins = 4;
    constructor(networkId = midnight_js_network_id_1.NetworkId.TestNet) {
        (0, midnight_js_network_id_1.setNetworkId)(networkId);
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
    toMergerCoins(coins) {
        if (coins === undefined) {
            return this.defaultNoneMergeCoins();
        }
        return {
            is_some: true,
            value: coins.map((c) => BigInt(c)),
        };
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
        let coins_0 = this.defaultNoneMergeCoins();
        if (coins && coins.length > coins_0.value.length) {
            throw new Error(`Too many coins`);
        }
        else {
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
        };
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
    /////////////////////////////////////////////////  Cross Tx  /////////////////////////////////////////////////////////////
    async userLock(smgId, toAddress, tokenPair, amount) {
        const smgId_0 = Buffer.from(smgId, 'hex');
        (0, node_assert_1.default)(smgId_0.length === 32, `smgId must be 32 bytes long`);
        const tokenPair_0 = BigInt(tokenPair);
        const amount_0 = BigInt(amount);
        const finalizedTxData = await this.crossChainContract.callTx.userLock(smgId_0, toAddress, tokenPair_0, amount_0);
        return finalizedTxData;
    }
    async smgRelease(uniqueId, smgId, tokenPair, amount, fee, toAddr, ttl) {
        const proof = this.checkCrossData(uniqueId, smgId, tokenPair, amount, fee, toAddr, undefined, ttl);
        const finalizedTxData = await this.crossChainContract.callTx.smgRelease(proof.uniqueId, proof.smgId, proof.tokenPairId, proof.amount, proof.toAddr, proof.fee, proof.ttl);
        return finalizedTxData;
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
        const amount_0 = BigInt(amount);
        const finalizedTxData = await this.crossChainContract.callTx.userBurn(smgId_0, toAddress, tokenPair_0, amount_0);
        return finalizedTxData;
    }
    async voteCrossProposal(uniqueId) {
        const uniqueId_0 = Buffer.from(uniqueId, 'hex');
        (0, node_assert_1.default)(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
        const finalizedTxData = await this.crossChainContract.callTx.voteCrossProposal(uniqueId_0);
        return finalizedTxData;
    }
    async executeCrossProposal(uniqueId, coinIndex) {
        const uniqueId_0 = Buffer.from(uniqueId, 'hex');
        (0, node_assert_1.default)(uniqueId_0.length === 32, `uniqueId must be 32 bytes long, actually ${uniqueId_0.length}, ${uniqueId}`);
        if (coinIndex === undefined) {
            const finalizedTxData = await this.crossChainContract.callTx.executeCrossProposalOfMappingToken(uniqueId_0);
            return finalizedTxData;
        }
        else {
            const coinIndex_0 = BigInt(coinIndex);
            const finalizedTxData = await this.crossChainContract.callTx.executeCrossProposalOfNativeToken(uniqueId_0, coinIndex_0);
            return finalizedTxData;
        }
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
    async mergeTreasuryCoin(coins) {
        if (coins.length != 2)
            throw 'can only merge 2 coins';
        const coins_0 = coins.map(coin => BigInt(coin));
        const finalizedTxData = await this.crossChainContract.callTx.mergeTreasuryCoin(coins_0);
        return finalizedTxData;
    }
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
        const finalizedTxData = await this.crossChainContract.callTx.setAdminThreshold(threshold_0);
        return finalizedTxData;
    }
    async setSmgPksks(voters) {
        const voters_0 = voters.map(voter => {
            return { bytes: (0, exports.getCoinPublicKeyFromShieldAddress)(voter) };
            // return { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(voter, getZswapNetworkId())) } 
        });
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
    async addTokenPair(tokenPairId, fromChainId, toChainId, midnigthTokenAccount, fee) {
        const tokenPairId_0 = BigInt(tokenPairId);
        const fromChainId_0 = BigInt(fromChainId);
        const toChainId_0 = BigInt(toChainId);
        let midnigtAccount_0;
        try {
            midnigtAccount_0 = (0, ledger_1.encodeTokenType)(midnigthTokenAccount);
        }
        catch (error) {
            midnigtAccount_0 = pad(midnigthTokenAccount, 32);
        }
        const fee_0 = BigInt(fee);
        const tokenPair = {
            fromChainId: fromChainId_0,
            toChainId: toChainId_0,
            midnigthTokenAccount: midnigtAccount_0,
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
    async updateContractAuthority(newKey) {
        return await this.crossChainContract.contractMaintenanceTx.replaceAuthority(newKey);
    }
    async upgradeContract() {
        // return await this.crossChainContract.circuitMaintenanceTx.setFeeReceiver.insertVerifierKey(newVK);
        // await this.crossChainContract.circuitMaintenanceTx.newProposal.removeVerifierKey();
        // const newVK = 
        // return await this.crossChainContract.circuitMaintenanceTx.newProposal.insertVerifierKey();
    }
}
exports.CrossChainApi = CrossChainApi;
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
const signData = (hash, privateKey) => {
    const k = BigInt(privateKey);
    const r = (0, exports.genRandomBigint)();
    const R = (0, compact_runtime_1.ecMulGenerator)(r);
    const P = (0, compact_runtime_1.ecMulGenerator)(k);
    const m = BigInt(hash);
    const tmp = (0, compact_runtime_1.mulField)(k, m);
    const s = (0, compact_runtime_1.addField)(r, tmp);
    return { R, s, P };
};
exports.signData = signData;
const verifySignature = (hash, R, s, P) => {
    const m = BigInt(hash);
    const expectM = (0, compact_runtime_1.ecAdd)(R, (0, compact_runtime_1.ecMul)(P, m));
    const realM = (0, compact_runtime_1.ecMulGenerator)(s);
    return expectM.x === realM.x && expectM.y === realM.y;
};
exports.verifySignature = verifySignature;
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
