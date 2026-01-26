/*
 * @Author: liulin
 * @Date: 2025-06-20 12:02:08
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-12-10 11:23:56
 * @FilePath: /midnight-crosschain/contract/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// export * as CrossChain from "./managed/crosschain/contract/index.cjs";
// export * from "./witnesses.js";
import path from 'node:path';
// import { witnesses, type CrossChainPrivateState } from './witnesses.js';
import * as CrossChain from "./managed/crosschain/contract/index.js";
import { deployContract, findDeployedContract, submitInsertVerifierKeyTx, submitRemoveVerifierKeyTx } from '@midnight-ntwrk/midnight-js-contracts';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { encodeRawTokenType, decodeRawTokenType, createShieldedCoinInfo } from '@midnight-ntwrk/ledger-v7';
// import { TokenType, Transaction as ZswapTransaction } from '@midnight-ntwrk/zswap';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { assertIsContractAddress, fromHex, toHex } from '@midnight-ntwrk/midnight-js-utils';
import { MidnightBech32m, ShieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
import { ContractState, sampleSigningKey, encodeShieldedCoinInfo, encodeUserAddress, rawTokenType } from '@midnight-ntwrk/compact-runtime';
// import { Resource } from '@midnight-ntwrk/wallet';
import { createVerifierKey } from '@midnight-ntwrk/midnight-js-types';
import assert from 'node:assert';
export * from './WalletSDK';
export const CrossChainPrivateStateId = 'crossChainPrivateState';
export const currentDir = path.resolve(new URL(__dirname).pathname, '..');
export const ZKConfig = {
    privateStateStoreName: 'crosschain-private-state',
    zkConfigPath: path.resolve(currentDir, 'managed', 'crosschain'),
};
export const createCrossChainPrivateState = () => ({});
export const witnesses = {
// TODO: Add witnesses
};
const shieldedCoinInfo = (token, value) => encodeShieldedCoinInfo(createShieldedCoinInfo(token, value));
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
    const walletFacade = wallet.getWalletInstance();
    assert(walletFacade, "wallet not initialized");
    return {
        getCoinPublicKey: () => wallet.getShieldedSecretKeys().coinPublicKey, //() => state.shielded.coinPublicKey.toHexString(),
        getEncryptionPublicKey: () => wallet.getShieldedSecretKeys().encryptionPublicKey,
        balanceTx(tx, newCoins, ttl) {
            return walletFacade.balanceTransaction(wallet.getShieldedSecretKeys(), wallet.getDustSecretKey(), tx, ttl ? ttl : new Date(Date.now() + 1800 * 1000));
            // .then((tx) => wallet.proveTransaction(tx))
            // .then((zswapTx) => Transaction.deserialize(zswapTx.serialize(getZswapNetworkId()), getLedgerNetworkId()))
            // .then(createBalancedTx);
        },
        submitTx(tx) {
            return walletFacade.submitTransaction(tx);
        },
    };
};
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
const MAX_SIGNER_COUNT = 29;
export class CrossChainApi {
    providers;
    crossChainContract;
    MaxSmgSignators = 29;
    MaxMergeCoins = 4;
    constructor() {
        // setNetworkId(networkId);
    }
    async init(config, wallet) {
        const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
        const zkConfigProvider = new NodeZkConfigProvider(ZKConfig.zkConfigPath);
        this.providers = {
            privateStateProvider: levelPrivateStateProvider({
                privateStateStoreName: 'CCPSSN',
                walletProvider: walletAndMidnightProvider
            }),
            publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
            zkConfigProvider: new NodeZkConfigProvider(ZKConfig.zkConfigPath),
            proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
            walletProvider: walletAndMidnightProvider,
            midnightProvider: walletAndMidnightProvider,
        };
    }
    async setWallet(wallet) {
        const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
        this.providers = {
            ...this.providers,
            walletProvider: walletAndMidnightProvider,
            midnightProvider: walletAndMidnightProvider,
        };
    }
    async deployContract(adminThreshold, smgPkThreshold, signingKey) {
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
    async join(contractAddress) {
        this.crossChainContract = await findDeployedContract(this.providers, {
            contractAddress,
            contract: crosschainContractInstance,
            privateStateId: CrossChainPrivateStateId,
            initialPrivateState: {},
        });
    }
    checkCrossData(uniqueId, smgId, tokenPairId, amount, fee, toAddr, coins, ttl) {
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
                smgId: toHex(crossTxInfo.smgId),
                token: toHex(crossTxInfo.token),
                tokenPairId: crossTxInfo.tokenPairId.toString(10),
                amount: crossTxInfo.amount.toString(10),
                fee: crossTxInfo.fee.toString(10),
                toAddr: crossTxInfo.toAddr,
                ttl: crossTxInfo.ttl.toString(10),
            };
        }
    }
    static parseContractState(stateHex) {
        const state = ContractState.deserialize(Buffer.from(stateHex, 'hex'));
        return CrossChain.ledger(state.data);
    }
    static currentExecuteCrossProposal(ledger) {
        let res = [];
        for (const smgEvent of ledger.currentExecuteCrossProposal) {
            res.push({
                smgId: toHex(smgEvent.crossProposal.smgId),
                uniqueId: toHex(smgEvent.uniqueId),
                token: toHex(smgEvent.crossProposal.token),
                tokenPairId: smgEvent.crossProposal.tokenPairId.toString(10),
                isMappingToken: smgEvent.crossProposal.isMappingToken,
                amount: smgEvent.crossProposal.amount.toString(10),
                fee: smgEvent.crossProposal.fee.toString(10),
                toAddr: toHex(smgEvent.crossProposal.toAddr.bytes),
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
                smgId: toHex(ledger.latestOutBoundCrosstxInfo.smgId),
                fromAddr: toHex(ledger.latestOutBoundCrosstxInfo.fromAddr.bytes),
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
            voterPK = getCoinPublicKeyFromShieldAddress(voter);
        }
        else {
            voterPK = fromHex(this.providers.walletProvider.getCoinPublicKey());
        }
        return ledger.smgTxSigners.member({ bytes: voterPK });
    }
    async getUnVotedCrossProposal(ledger, voter) {
        let voterPK;
        if (voter) {
            voterPK = getCoinPublicKeyFromShieldAddress(voter);
        }
        else {
            voterPK = fromHex(this.providers.walletProvider.getCoinPublicKey());
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
                const crossTxInfo = CrossChainApi.getCrossTxInfo(ledger, toHex(uniquId));
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
                    uniqueId: toHex(uniquId),
                    smgId: toHex(crossProposal.smgId),
                    tokenPairId: crossProposal.tokenPairId.toString(10),
                    token: toHex(crossProposal.token),
                    amount: crossProposal.amount.toString(10),
                    fee: crossProposal.fee.toString(10),
                    toAddr: toHex(crossProposal.toAddr.bytes),
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
        assert(smgId_0.length === 32, `smgId must be 32 bytes long`);
        const tokenPair_0 = BigInt(tokenPair);
        const pairInfo = await this.getTokenPairInfo(tokenPair_0);
        assert(pairInfo, `tokenPairId ${tokenPair} not found`);
        const amount_0 = BigInt(amount);
        const token = decodeRawTokenType(pairInfo.midnigthTokenAccount);
        const coin_0 = shieldedCoinInfo(token, amount_0);
        const finalizedTxData = await this.crossChainContract.callTx.userBurn(smgId_0, toAddress, tokenPair_0, coin_0);
        return finalizedTxData;
    }
    async voteCrossProposal(uniqueId, ttl) {
        const uniqueId_0 = Buffer.from(uniqueId, 'hex');
        const ttl_0 = BigInt(ttl);
        assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
        const finalizedTxData = await this.crossChainContract.callTx.voteCrossProposal({ uniqueId: uniqueId_0, ttl: ttl_0 });
        return finalizedTxData;
    }
    async voteMultiCrossProposal(uniqueIds) {
        const uniqueIds_0 = uniqueIds.map((item) => {
            const uniqueId_0 = Buffer.from(item.uniqueId, 'hex');
            const ttl_0 = BigInt(item.ttl);
            assert(uniqueId_0.length === 32, `uniqueId(${uniqueId_0}) must be 32 bytes long`);
            return { uniqueId: uniqueId_0, ttl: ttl_0 };
        });
        assert(uniqueIds_0.length <= 5 && uniqueIds_0.length > 0, `uniqueIds length must be between 1 and 5`);
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
            assert(uniqueId_0.length === 32, `uniqueId(${item.uniqueId}) must be 32 bytes long`);
            let coinIndex_0 = BigInt(0);
            if (item.coinIndex) {
                coinIndex_0 = BigInt(item.coinIndex);
            }
            return { uniqueId: uniqueId_0, coinIndex: coinIndex_0 };
        });
        assert(uniqueIds_0.length <= 5 && uniqueIds_0.length > 0, `uniqueIds must be between 1 and 5`);
        for (let index = uniqueIds_0.length; index < 5; index++) {
            uniqueIds_0.push({ uniqueId: Buffer.alloc(32), coinIndex: BigInt(0) });
        }
        const finalizedTxData = await this.crossChainContract.callTx.executeMultiCrossProposal(uniqueIds_0);
        return finalizedTxData;
    }
    async userRechargeForFee(amount) {
        const amount_0 = BigInt(amount);
        const finalizedTxData = await this.crossChainContract.callTx.userRechargeForFee(amount_0);
        return finalizedTxData;
    }
    async approveUserWithdrawFee(user, amount) {
        const key_0 = { bytes: getCoinPublicKeyFromShieldAddress(user) };
        const ledgerState = await this.getLedgerState();
        assert(ledgerState != null, `ledgerState is null`);
        const amount_0 = BigInt(amount);
        const balance_0 = ledgerState.userFeeBalance.lookup(key_0);
        assert(balance_0 >= amount_0, `user ${user} has not enough fee balance real (${balance_0}) vs withdraw ${amount_0}`);
        const finalizedTxData = await this.crossChainContract.callTx.approveUserWithdrawFee(key_0, amount_0);
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
    async userFeeWithdrawRequest(receiptor) {
        const receiptor_0 = { bytes: encodeUserAddress(receiptor) };
        const finalizedTxData = await this.crossChainContract.callTx.userFeeWithdrawRequest(receiptor_0);
        return finalizedTxData;
    }
    async userClaimCoin(uniqueId) {
        const uniqueId_0 = Buffer.from(uniqueId, 'hex');
        assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
        const finalizedTxData = await this.crossChainContract.callTx.userClaimCoin(uniqueId_0);
        return finalizedTxData;
    }
    async userClaimMappingToken(uniqueId) {
        const uniqueId_0 = Buffer.from(uniqueId, 'hex');
        assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
        const finalizedTxData = await this.crossChainContract.callTx.userClaimMappingToken(uniqueId_0);
        return finalizedTxData;
    }
    async addReserve(token, amount) {
        const amount_0 = BigInt(amount);
        const coin_0 = shieldedCoinInfo(token.raw, amount_0);
        const finalizedTxData = await this.crossChainContract.callTx.addReserve(coin_0);
        return finalizedTxData;
    }
    async withdrawReserveOfShieldedToken(token, coinIndex) {
        assert(token.tag == 'shielded', "not shielded token");
        const coinIndex_0 = BigInt(coinIndex);
        const token_0 = encodeRawTokenType(token.raw);
        const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfShieldedToken(token_0, coinIndex_0);
        return finalizedTxData;
    }
    async withdrawReserveOfShieldedMappingToken(domainSep) {
        assert(domainSep.length <= 64, "domainsep length must <= 64");
        const token_0 = pad(domainSep, 32);
        const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfShieldedMappingToken(token_0);
        return finalizedTxData;
    }
    async withdrawReserveOfUnshieldedToken(token) {
        assert(token.tag == 'unshielded', "not shielded token");
        // const coinIndex_0 = BigInt(coinIndex);
        const token_0 = encodeRawTokenType(token.raw);
        const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfUnshieldedToken(token_0);
        return finalizedTxData;
    }
    async withdrawReserveOfUnshieldedMappingToken(domainSep) {
        assert(domainSep.length <= 64, "domainsep length must <= 64");
        const token_0 = pad(domainSep, 32);
        const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfUnshieldedMappingToken(token_0);
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
        const newOwner_0 = { bytes: getCoinPublicKeyFromShieldAddress(newOwner) };
        const finalizedTxData = await this.crossChainContract.callTx.transferOwner(newOwner_0);
        return finalizedTxData;
    }
    async acceptOwner() {
        const finalizedTxData = await this.crossChainContract.callTx.acceptOwner();
        return finalizedTxData;
    }
    async updateSmgPk(newVoter) {
        const newVoter_0 = { bytes: getCoinPublicKeyFromShieldAddress(newVoter) };
        const finalizedTxData = await this.crossChainContract.callTx.updateSmgPk(newVoter_0);
        return finalizedTxData;
    }
    async setFeeShieldedReceiver(feeReceiver) {
        const feeReceiver_0 = { bytes: getCoinPublicKeyFromShieldAddress(feeReceiver) };
        const finalizedTxData = await this.crossChainContract.callTx.setFeeShieldedReceiver(feeReceiver_0);
        return finalizedTxData;
    }
    async setFeeUnshieldedReceiver(feeReceiver) {
        const feeReceiver_0 = { bytes: encodeUserAddress(feeReceiver) };
        const finalizedTxData = await this.crossChainContract.callTx.setFeeUnshieldedReceiver(feeReceiver_0);
        return finalizedTxData;
    }
    async setTokenManager(tokenManager) {
        const tokenManager_0 = { bytes: getCoinPublicKeyFromShieldAddress(tokenManager) };
        const finalizedTxData = await this.crossChainContract.callTx.setTokenManager(tokenManager_0);
        return finalizedTxData;
    }
    async setMegerWorker(mergeWorker) {
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
    async addAdmin(admin) {
        const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
        const finalizedTxData = await this.crossChainContract.callTx.addAdmin(admin_0);
        return finalizedTxData;
    }
    async removeAdmin(admin) {
        const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
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
        assert(voters.length > 0, 'voters must not be empty');
        const voters_0 = voters.map(voter => {
            return { bytes: getCoinPublicKeyFromShieldAddress(voter) };
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
    async addTokenPair(tokenPairId, fromChainId, toChainId, midnigthTokenAccount, isShielded, domainSep, fee) {
        const tokenPairId_0 = BigInt(tokenPairId);
        const fromChainId_0 = BigInt(fromChainId);
        const toChainId_0 = BigInt(toChainId);
        const midnigtAccount_0 = encodeRawTokenType(midnigthTokenAccount);
        const domainSep_0 = pad(domainSep, 32);
        if (domainSep) {
            const expectedTokenType = rawTokenType(domainSep_0, this.crossChainContract.deployTxData.public.contractAddress);
            assert(expectedTokenType == midnigthTokenAccount, `token type not match ,${expectedTokenType} expected but got ${midnigthTokenAccount}`);
        }
        const fee_0 = BigInt(fee);
        const tokenPair = {
            fromChainId: fromChainId_0,
            toChainId: toChainId_0,
            midnigthTokenAccount: midnigtAccount_0,
            isShielded: isShielded,
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
        const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.AddAdmin;
        proposal.addr = addr_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async removeAdminProposal(addr) {
        const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.RemoveAdmin;
        proposal.addr = addr_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async updateFeeShieldedReceiverProposal(addr) {
        const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.UpdateFeeShieldedReceiver;
        proposal.addr = addr_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async updateFeeUnshieldedReceiverProposal(addr) {
        const addr_0 = { bytes: encodeUserAddress(addr) };
        let proposal = this.defaultProsal();
        proposal.type = CrossChain.ProposalType.UpdateFeeUnshieldedReceiver;
        proposal.addr = addr_0;
        return await this.crossChainContract.callTx.newProposal(proposal);
    }
    async updateTokenManagerProposal(addr) {
        const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
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
            addrUnshielded: { bytes: fromHexWithOrNoPrefix("") },
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
        assert(txs.length <= 20, 'txs length should be less than 20');
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
            newVK = createVerifierKey(fromHex(newCircuitHex));
        }
        else {
            newVK = await this.providers.zkConfigProvider.getVerifierKey(circuitId);
        }
        const res1 = await this.crossChainContract.circuitMaintenanceTx[circuitId].removeVerifierKey();
        const res2 = await this.crossChainContract.circuitMaintenanceTx[circuitId].insertVerifierKey(newVK);
        return res2;
    }
}
export const upgradeContractCircuit = async (providers, contractAddress, circuitId, newVkHex) => {
    assertIsContractAddress(contractAddress);
    let newVk;
    if (newVkHex) {
        newVk = createVerifierKey(fromHex(newVkHex));
    }
    else {
        newVk = await providers.zkConfigProvider.getVerifierKey(circuitId);
    }
    return await submitInsertVerifierKeyTx(providers, contractAddress, circuitId, newVk);
};
export const removeContractCircuit = async (providers, contractAddress, circuitId) => {
    assertIsContractAddress(contractAddress);
    return await submitRemoveVerifierKeyTx(providers, contractAddress, circuitId);
};
export const getTreasuryCoinsFromState = (state) => {
    let treasuryCoins = new Map();
    console.log('treasuryCoins size:', state.treasuryCoins.size());
    for (const [coinId, coin] of state.treasuryCoins) {
        const tokenType = decodeRawTokenType(coin.color);
        if (!treasuryCoins.has(tokenType)) {
            treasuryCoins.set(tokenType, new Map());
        }
        treasuryCoins.get(tokenType)?.set(coinId, coin);
        //   {
        //   treasuryCoins.set(tokenType, new Map<bigint, CrossChain.QualifiedShieldedCoinInfo>());
        //   treasuryCoins.get(tokenType)?.set(coinId, coin);
        // }
    }
    return treasuryCoins;
};
export const genSigningKey = () => {
    return sampleSigningKey();
};
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
export const getCoinPublicKeyFromShieldAddress = (shieldAddr) => {
    const tmp1 = MidnightBech32m.parse(shieldAddr);
    // const tmp1 = MidnightBech32m.parse('mn_shield-addr_test10th0dtqgnpanzwmqj236zccpkmj9xxpkl7r7e7cr5e3v7k0stm5qxqxa9m6z5f4603nyuu4kw9c65ektu48hhyrtu2f07h42ycppkvw9ccyry600');
    const tmp2 = ShieldedAddress.codec.decode(tmp1.network, tmp1);
    // console.log('coinPublicKeyString:', toHex(tmp2.coinPublicKey.data));
    return tmp2.coinPublicKey.data;
};
//only support 
// • 'mainnet' — Production network
// • 'testnet-02' — Public testnet
// • 'preview' — Preview network
// • 'devnet' — Development network
// • 'undeployed' — Local testing
export const initNetwork = (network) => {
    setNetworkId(network);
};
//# sourceMappingURL=index.js.map