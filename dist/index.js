/*
 * @Author: liulin
 * @Date: 2025-06-20 12:02:08
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-07-30 10:11:56
 * @FilePath: /midnight-crosschain/contract/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// export * as CrossChain from "./managed/crosschain/contract/index.cjs";
// export * from "./witnesses.js";
import path from 'node:path';
import { witnesses } from './witnesses.js';
import * as CrossChain from "./managed/crosschain/contract/index.cjs";
import { createBalancedTx } from '@midnight-ntwrk/midnight-js-types';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { decodeTokenType, encodeTokenType, Transaction, sampleCoinPublicKey } from '@midnight-ntwrk/ledger';
import { Transaction as ZswapTransaction } from '@midnight-ntwrk/zswap';
import { getLedgerNetworkId, getZswapNetworkId, NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { assertIsContractAddress, fromHex, parseCoinPublicKeyToHex } from '@midnight-ntwrk/midnight-js-utils';
import * as Rx from 'rxjs';
import { addField, CompactTypeBytes, CompactTypeCurvePoint, CompactTypeOpaqueString, CompactTypeUnsignedInteger, CompactTypeVector, degradeToTransient, ecAdd, ecMul, ecMulGenerator, mulField, persistentHash, sampleSigningKey, transientHash } from '@midnight-ntwrk/compact-runtime';
export const CrossChainPrivateStateId = 'crossChainPrivateState';
export const currentDir = path.resolve(new URL(import.meta.url).pathname, '..');
export const ZKConfig = {
    privateStateStoreName: 'crosschain-private-state',
    zkConfigPath: path.resolve(currentDir, 'managed', 'crosschain'),
};
const fromHexWithOrNoPrefix = (hex) => {
    if (hex.startsWith('0x')) {
        return fromHex(hex.slice(2));
    }
    return fromHex(hex);
};
export function pad(s, n) {
    const encoder = new TextEncoder();
    const utf8Bytes = encoder.encode(s);
    if (n < utf8Bytes.length) {
        throw new Error(`The padded length n must be at least ${utf8Bytes.length}`);
    }
    const paddedArray = new Uint8Array(n);
    paddedArray.set(utf8Bytes);
    return paddedArray;
}
export const crosschainContractInstance = new CrossChain.Contract(witnesses);
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
export class CrossChainApi {
    providers;
    crossChainContract;
    MaxSmgSignators = 29;
    MaxMergeCoins = 4;
    constructor(networkId = NetworkId.TestNet) {
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
        const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
        this.providers = {
            privateStateProvider: levelPrivateStateProvider({
                privateStateStoreName: 'CCPSSN',
            }),
            publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
            zkConfigProvider: new NodeZkConfigProvider(ZKConfig.zkConfigPath),
            proofProvider: httpClientProofProvider(config.proofServer),
            walletProvider: walletAndMidnightProvider,
            midnightProvider: walletAndMidnightProvider,
        };
    }
    async deployContract(adminThreshold, smgPkThreshold, smgPKCount, signingKey) {
        this.crossChainContract = await deployContract(this.providers, {
            contract: crosschainContractInstance,
            privateStateId: CrossChainPrivateStateId,
            initialPrivateState: {},
            signingKey: signingKey,
            args: [BigInt(adminThreshold), BigInt(smgPkThreshold), BigInt(smgPKCount)]
        });
        // logger.info(`Deployed contract at address: ${this.crossChainContract.deployTxData.public.contractAddress}`);
        return this.crossChainContract.deployTxData.public.contractAddress;
    }
    async join(contractAddress) {
        this.crossChainContract = await findDeployedContract(this.providers, {
            contractAddress,
            contract: crosschainContractInstance,
            privateStateId: CrossChainPrivateStateId,
            initialPrivateState: {},
        });
    }
    caculateHashOfProofData(proof) {
        const tokenPairIdHash = persistentHash(new CompactTypeUnsignedInteger(4294967295n, 4), proof.tokenPairId);
        const amountHash = persistentHash(new CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16), proof.amount);
        const feeHash = persistentHash(new CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16), proof.fee);
        // const toAddrHash = persistentHash<ZswapCoinPublicKey>(proof.toAddr);
        const coinsHash = persistentHash(new CompactTypeVector(this.MaxMergeCoins, new CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16)), proof.coins.value);
        const signersHash = persistentHash(new CompactTypeVector(this.MaxSmgSignators, new CompactTypeUnsignedInteger(255n, 1)), proof.signers);
        const ttlHash = persistentHash(new CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16), proof.ttl);
        // return [tokenPairIdHash, amountHash, feeHash, coinsHash, signersHash, ttlHash];
        return degradeToTransient(persistentHash(new CompactTypeVector(9, new CompactTypeBytes(32)), [proof.smgId,
            proof.uniqueId,
            tokenPairIdHash,
            amountHash,
            feeHash,
            proof.toAddr.bytes,
            coinsHash,
            signersHash,
            ttlHash]));
    }
    /////////////////////////////////////////////////  Cross Tx  /////////////////////////////////////////////////////////////
    async userLock(smgID, toAddress, tokenPair, amount) {
        const smgId_0 = pad(smgID, 32);
        const tokenPair_0 = BigInt(tokenPair);
        const amount_0 = BigInt(amount);
        const finalizedTxData = await this.crossChainContract.callTx.userLock(smgId_0, toAddress, tokenPair_0, amount_0);
        return finalizedTxData;
    }
    async smgRelease(uniqueId, smgId, tokenPair, amount, fee, toAddr, coins, signers, ttl, R, s) {
        const uniqueId_0 = pad(uniqueId, 32);
        const smgId_0 = pad(smgId, 32);
        const tokenPair_0 = BigInt(tokenPair);
        const amount_0 = BigInt(amount);
        const fee_0 = BigInt(fee);
        const toAddr_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(toAddr, getZswapNetworkId())) };
        const coins_0 = coins.map(coin => BigInt(coin));
        const signers_0 = signers.map(signer => BigInt(signer));
        const ttl_0 = BigInt(ttl);
        const s_0 = BigInt(s);
        const finalizedTxData = await this.crossChainContract.callTx.smgRelease(uniqueId_0, smgId_0, tokenPair_0, amount_0, fee_0, toAddr_0, coins_0, signers_0, ttl_0, R, s_0);
        return finalizedTxData;
    }
    async smgMint(uniqueId, smgId, tokenPair, amount, fee, toAddr, signers, ttl, R, s) {
        const uniqueId_0 = pad(uniqueId, 32);
        const smgId_0 = pad(smgId, 32);
        const tokenPair_0 = BigInt(tokenPair);
        const amount_0 = BigInt(amount);
        const fee_0 = BigInt(fee);
        const toAddr_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(toAddr, getZswapNetworkId())) };
        const signers_0 = signers.map(signer => BigInt(signer));
        const ttl_0 = BigInt(ttl);
        const s_0 = BigInt(s);
        const finalizedTxData = await this.crossChainContract.callTx.smgMint(uniqueId_0, smgId_0, tokenPair_0, amount_0, fee_0, toAddr_0, signers_0, ttl_0, R, s_0);
        return finalizedTxData;
    }
    async userBurn(smgID, toAddress, tokenPair, amount) {
        const smgId_0 = pad(smgID, 32);
        const tokenPair_0 = BigInt(tokenPair);
        const amount_0 = BigInt(amount);
        const finalizedTxData = await this.crossChainContract.callTx.userBurn(smgId_0, toAddress, tokenPair_0, amount_0);
        return finalizedTxData;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async getLedgerState() {
        assertIsContractAddress(this.crossChainContract?.deployTxData.public.contractAddress);
        const state = await this.providers.publicDataProvider
            .queryContractState(this.crossChainContract?.deployTxData.public.contractAddress)
            .then((contractState) => (contractState != null ? CrossChain.ledger(contractState.data) : null));
        return state;
    }
    ///////////////////////////////////////////////        management      ////////////////////////////////////////////////////////
    async transferOwner(newOwner) {
        const newOwner_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(newOwner, getZswapNetworkId())) };
        const finalizedTxData = await this.crossChainContract.callTx.transferOwner(newOwner_0);
        return finalizedTxData;
    }
    async acceptOwner() {
        const finalizedTxData = await this.crossChainContract.callTx.acceptOwner();
        return finalizedTxData;
    }
    async updateSmgPk(id, smgPk, privateKey) {
        const id_0 = BigInt(id);
        const smgPk_0 = smgPk;
        const hash = persistentHash(new CompactTypeCurvePoint(), smgPk);
        const { R, s } = signData(degradeToTransient(hash), privateKey);
        // const R_0 = R;
        // const s_0 = BigInt(s);
        const finalizedTxData = await this.crossChainContract.callTx.updateSmgPk(id_0, smgPk_0, R, s);
        return finalizedTxData;
    }
    async setFeeReceiver(feeReceiver) {
        const feeReceiver_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(feeReceiver, getZswapNetworkId())) };
        const finalizedTxData = await this.crossChainContract.callTx.setFeeReceiver(feeReceiver_0);
        return finalizedTxData;
    }
    async setTokenManager(tokenManager) {
        const tokenManager_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(tokenManager, getZswapNetworkId())) };
        const finalizedTxData = await this.crossChainContract.callTx.setTokenManager(tokenManager_0);
        return finalizedTxData;
    }
    async setMegerWorker(megerWorker) {
        const megerWorker_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(megerWorker, getZswapNetworkId())) };
        const finalizedTxData = await this.crossChainContract.callTx.setMegerWorker(megerWorker_0);
        return finalizedTxData;
    }
    async mergeTreasuryCoin(tokenType, coins) {
        const tokenType_0 = encodeTokenType(tokenType);
        const coins_0 = coins.map(coin => BigInt(coin));
        const finalizedTxData = await this.crossChainContract.callTx.mergeTreasuryCoin(tokenType_0, coins_0);
        return finalizedTxData;
    }
    async addAdmin(admin) {
        const admin_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(admin, getZswapNetworkId())) };
        const finalizedTxData = await this.crossChainContract.callTx.addAdmin(admin_0);
        return finalizedTxData;
    }
    async removeAdmin(admin) {
        const admin_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(admin, getZswapNetworkId())) };
        const finalizedTxData = await this.crossChainContract.callTx.removeAdmin(admin_0);
        return finalizedTxData;
    }
    async setAdminThreshold(threshold) {
        const threshold_0 = BigInt(threshold);
        const finalizedTxData = await this.crossChainContract.callTx.setAdminThreshold(threshold_0);
        return finalizedTxData;
    }
    async setSmgPksks(pks) {
        const finalizedTxData = await this.crossChainContract.callTx.setSmgPksks(pks);
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
        const midnigtAccount_0 = fromHexWithOrNoPrefix(midnigthTokenAccount);
        const fee_0 = BigInt(fee);
        const finalizedTxData = await this.crossChainContract.callTx.addTokenPair(tokenPairId_0, {
            fromChainId: fromChainId_0,
            toChainId: toChainId_0,
            midnigthTokenAccount: midnigtAccount_0,
            fee: fee_0
        });
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
        const addr_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(addr, getZswapNetworkId())) };
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.AddAdmin;
        proposal.addr = addr_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async removeAdminProposal(addr) {
        const addr_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(addr, getZswapNetworkId())) };
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.RemoveAdmin;
        proposal.addr = addr_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async updateFeeReceiverProposal(addr) {
        const addr_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(addr, getZswapNetworkId())) };
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.UpdateFeeReceiver;
        proposal.addr = addr_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async updateTokenManagerProposal(addr) {
        const addr_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(addr, getZswapNetworkId())) };
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
export const getTreasuryCoinsFromState = (state) => {
    let treasuryCoins = new Map();
    if (state?.tokenPairs) {
        for (const [tokenPairId, tokenPair] of state?.tokenPairs) {
            const color = tokenPair.midnigthTokenAccount;
            const tokenType = decodeTokenType(color);
            treasuryCoins.set(tokenType, new Map());
            if (state.treasuryCoins.member(color)) {
                for (const [coinId, coin] of state.treasuryCoins.lookup(color)) {
                    treasuryCoins.get(tokenType)?.set(coinId, coin);
                }
            }
        }
    }
};
export const genSigningKey = () => {
    return sampleSigningKey();
};
export const genRandomBigint = () => {
    const r = transientHash(new CompactTypeOpaqueString(), sampleCoinPublicKey());
    return r;
};
export const signData = (hash, privateKey) => {
    const k = BigInt(privateKey);
    const r = genRandomBigint();
    const R = ecMulGenerator(r);
    const P = ecMulGenerator(k);
    const m = BigInt(hash);
    const tmp = mulField(k, m);
    const s = addField(r, tmp);
    return { R, s, P };
};
export const verifySignature = (hash, R, s, P) => {
    const m = BigInt(hash);
    const expectM = ecAdd(R, ecMul(P, m));
    const realM = ecMulGenerator(s);
    return expectM.x === realM.x && expectM.y === realM.y;
};
//# sourceMappingURL=index.js.map