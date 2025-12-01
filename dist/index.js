/*
 * @Author: liulin
 * @Date: 2025-06-20 12:02:08
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-12-01 15:48:43
 * @FilePath: /midnight-crosschain/contract/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// export * as CrossChain from "./managed/crosschain/contract/index.cjs";
// export * from "./witnesses.js";
// import path from 'node:path';
// import { witnesses, type CrossChainPrivateState } from './witnesses.js';
import * as CrossChain from "./managed/crosschain/contract/index.cjs";
// import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { decodeTokenType, encodeTokenType, sampleCoinPublicKey, encodeCoinInfo, createCoinInfo } from '@midnight-ntwrk/ledger';
import { NetworkId, setNetworkId, getRuntimeNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { assertIsContractAddress, fromHex, toHex } from '@midnight-ntwrk/midnight-js-utils';
import { MidnightBech32m, ShieldedAddress } from '@midnight-ntwrk/wallet-sdk-address-format';
// import * as Rx from 'rxjs';
import { CompactTypeOpaqueString, ContractState, sampleSigningKey, transientHash } from '@midnight-ntwrk/compact-runtime';
export const createCrossChainPrivateState = () => ({});
export const witnesses = {};
export const CrossChainPrivateStateId = 'crossChainPrivateState';
const coinInfo = (token, value) => encodeCoinInfo(createCoinInfo(token, value));
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
// export const createWalletAndMidnightProvider = async (wallet: Wallet): Promise<WalletProvider & MidnightProvider> => {
//   const state = await Rx.firstValueFrom(wallet.state());
//   return {
//     coinPublicKey: state.coinPublicKey,
//     encryptionPublicKey: state.encryptionPublicKey,
//     balanceTx(tx: UnbalancedTransaction, newCoins: CoinInfo[]): Promise<BalancedTransaction> {
//       return wallet
//         .balanceTransaction(
//           ZswapTransaction.deserialize(tx.serialize(getLedgerNetworkId()), getZswapNetworkId()),
//           newCoins,
//         )
//         .then((tx) => wallet.proveTransaction(tx))
//         .then((zswapTx) => Transaction.deserialize(zswapTx.serialize(getZswapNetworkId()), getLedgerNetworkId()))
//         .then(createBalancedTx);
//     },
//     submitTx(tx: BalancedTransaction): Promise<TransactionId> {
//       return wallet.submitTransaction(tx);
//     },
//   };
// };
// export const waitForSync = (wallet: Wallet) =>
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
// export const waitForSyncProgress = async (wallet: Wallet) =>
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
// export const waitForFunds = (wallet: Wallet) =>
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
// export const buildWalletAndWaitForFunds = async (
//   { indexer, indexerWS, node, proofServer }: Config,
//   seed: string,
//   serializedState: string | undefined
// ): Promise<Wallet & Resource> => {
//   let wallet: Wallet & Resource;
//   if (serializedState) {
//     wallet = await WalletBuilder.restore(indexer, indexerWS, proofServer, node, seed, serializedState, 'info', true);
//     wallet.start();
//     const stateObject = JSON.parse(serializedState);
//     if ((await isAnotherChain(wallet, Number(stateObject.offset))) === true) {
//       console.warn('The chain was reset, building wallet from scratch');
//       wallet = await WalletBuilder.build(
//         indexer,
//         indexerWS,
//         proofServer,
//         node,
//         seed,
//         getZswapNetworkId(),
//         'info',
//         true
//       );
//       wallet.start();
//       console.log('Wallet was built from scratch 1');
//     }
//   } else {
//     console.log('Wallet save file not found, building wallet from scratch');
//     wallet = await WalletBuilder.build(
//       indexer,
//       indexerWS,
//       proofServer,
//       node,
//       seed,
//       getZswapNetworkId(),
//       'info',
//       true
//     );
//     wallet.start();
//     console.log('Wallet was built from scratch 2');
//   }
//   {
//     const newState = await waitForSync(wallet);
//     // allow for situations when there's no new index in the network between runs
//     if (newState.syncProgress?.synced) {
//       console.info('Wallet was able to sync from restored state');
//     } else {
//       throw new Error('Wallet was not able to sync from restored state');
//     }
//   }
//   const state = await Rx.firstValueFrom(wallet.state());
//   console.info(`Your wallet address is: ${state.address}`);
//   let balance = state.balances[nativeToken()];
//   if (balance === undefined || balance === 0n) {
//     console.info(`Your wallet balance is: 0`);
//     console.info(`Waiting to receive tokens...`);
//     balance = (await waitForFunds(wallet))[nativeToken()];
//   }
//   console.info(`Your wallet balance is: ${balance}`);
//   return wallet;
// };
// export const isAnotherChain = async (wallet: Wallet, offset: number) => {
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
// export const getSerializeWalletState = async (wallet: Wallet): Promise<string> => {
//   return await wallet.serializeState();
// };
// export const walletAddress = async (wallet: Wallet): Promise<string> => {
//   const state = await Rx.firstValueFrom(wallet.state());
//   return state.address;
// }
// export const walletBalance = async (wallet: Wallet): Promise<Record<string, bigint>> => {
//   const state = await Rx.firstValueFrom(wallet.state());
//   return state.balances;
// }
const MAX_SIGNER_COUNT = 29;
export class CrossChainStateApi {
    provider;
    crossChainContract;
    MaxSmgSignators = 29;
    MaxMergeCoins = 4;
    constructor() {
        // setNetworkId(networkId);
    }
    async init(config, contractAddress) {
        if (config.indexer && config.indexerWS) {
            if (this.provider)
                this.provider = undefined;
            this.provider = indexerPublicDataProvider(config.indexer, config.indexerWS);
        }
        assertIsContractAddress(contractAddress);
        this.crossChainContract = contractAddress;
    }
    async getTokenPairInfo(tokenPairId, targetLedger) {
        let ledger;
        if (targetLedger) {
            ledger = targetLedger;
        }
        else {
            ledger = await this.getLedgerState();
        }
        // return ledger?.tokenPairs.lookup(BigInt(tokenPairId));
        const ret = ledger?.tokenPairs.lookup(BigInt(tokenPairId));
        return ret ? {
            fromChainId: ret.fromChainId.toString(10),
            toChainId: ret.toChainId.toString(10),
            midnigthTokenAccount: decodeTokenType(ret.midnigthTokenAccount),
            domainSep: Buffer.from(ret.domainSep).toString('utf-8'),
            fee: ret.fee.toString(10),
        } : undefined;
    }
    async getTokensTotalSupply(tokens, targetLedger) {
        let ledger;
        if (targetLedger) {
            ledger = targetLedger;
        }
        else {
            ledger = await this.getLedgerState();
        }
        const tokensTotalSupply = tokens.map((token) => {
            const token_0 = encodeTokenType(token); //Buffer.from(token, 'hex');
            const totalSupply = ledger?.mappintTokenTotalSupply.member(token_0) ? ledger?.mappintTokenTotalSupply.lookup(token_0).toString(10) : '0';
            return { token, totalSupply };
        });
        return tokensTotalSupply;
    }
    async getFeeCommonConfig(chainId, targetLedger) {
        let ledger;
        if (targetLedger) {
            ledger = targetLedger;
        }
        else {
            ledger = await this.getLedgerState();
        }
        return ledger?.feeCommonConfig.lookup(BigInt(chainId)).toString(10);
    }
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
        const state = ContractState.deserialize(Buffer.from(stateHex, 'hex'), getRuntimeNetworkId());
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
    // async getUnVotedCrossProposal(ledger: CrossChain.Ledger, voter: Address | undefined) {
    //   let voterPK;
    //   if (voter) {
    //     voterPK = getCoinPublicKeyFromShieldAddress(voter);
    //   } else {
    //     voterPK = fromHex(this.providers.walletProvider.coinPublicKey);
    //   }
    //   const voterIndex = ledger.smgTxSigners.lookup({ bytes: voterPK });
    //   let res = [];
    //   for (const [uniquId, _] of ledger.crossProposal) {
    //     const voters = ledger.crossProposalVoters.lookup(uniquId);
    //     if (voters.size() >= ledger.smgPKThreshold) continue;
    //     if (voters.member(voterIndex)) continue;
    //     else {
    //       const crossTxInfo = CrossChainApi.getCrossTxInfo(ledger, toHex(uniquId));
    //       res.push(crossTxInfo);
    //     }
    //   }
    //   return res;
    // }
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
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async getLedgerState() {
        if (!this.provider)
            throw 'provider is null';
        if (!this.crossChainContract)
            throw 'crossChainContract is null';
        const state = await this.provider.queryContractState(this.crossChainContract)
            .then((contractState) => (contractState != null ? CrossChain.ledger(contractState.data) : null));
        return state;
    }
}
// export const upgradeContractCircuit = async (providers: MidnightProviders,contractAddress: Address, circuitId: string, newVkHex: string| undefined) => {
//   assertIsContractAddress(contractAddress);
//   let newVk;
//   if(newVkHex){
//     newVk = createVerifierKey(fromHex(newVkHex));
//   }else{
//     newVk = await providers.zkConfigProvider.getVerifierKey(circuitId as CrossChainCircuits);
//   }
//   return await submitInsertVerifierKeyTx(providers, contractAddress, circuitId, newVk);
// }
// export const removeContractCircuit = async (providers: MidnightProviders, contractAddress: Address, circuitId: string) => {
//     assertIsContractAddress(contractAddress);
//     return await submitRemoveVerifierKeyTx(providers, contractAddress, circuitId);
// }
export const getTreasuryCoinsFromState = (state) => {
    let treasuryCoins = new Map();
    console.log('treasuryCoins size:', state.treasuryCoins.size());
    for (const [coinId, coin] of state.treasuryCoins) {
        const tokenType = decodeTokenType(coin.color);
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
export const genSigningKey = () => {
    return sampleSigningKey();
};
export const genRandomBigint = () => {
    const r = transientHash(new CompactTypeOpaqueString(), sampleCoinPublicKey());
    return r;
};
// export const configureProviders = async (wallet: Wallet & Resource, config: Config) => {
//   const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
//   // console.log('^^^^^^^^^^^^^^',ZKConfig.zkConfigPath)
//   return {
//     privateStateProvider: levelPrivateStateProvider<typeof CrossChainPrivateStateId>({
//       privateStateStoreName: ZKConfig.privateStateStoreName,
//     }),
//     publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
//     zkConfigProvider: new FetchZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath),
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
//only support 0-MainNet, 1-TestNet, 2-DevNet, 3-Undeployed
export const initNetwork = (networkId) => {
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
};
//# sourceMappingURL=index.js.map