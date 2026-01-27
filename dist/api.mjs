import path from "node:path";
import { witnesses } from "./witnesses";
import * as CrossChain from "./managed/crosschain/contract/index.js";
import { deployContract, findDeployedContract, submitInsertVerifierKeyTx, submitRemoveVerifierKeyTx } from "@midnight-ntwrk/midnight-js-contracts";
import { levelPrivateStateProvider } from "@midnight-ntwrk/midnight-js-level-private-state-provider";
import { indexerPublicDataProvider } from "@midnight-ntwrk/midnight-js-indexer-public-data-provider";
import { NodeZkConfigProvider } from "@midnight-ntwrk/midnight-js-node-zk-config-provider";
import { httpClientProofProvider } from "@midnight-ntwrk/midnight-js-http-client-proof-provider";
import { encodeRawTokenType, decodeRawTokenType, createShieldedCoinInfo } from "@midnight-ntwrk/ledger-v7";
import { setNetworkId } from "@midnight-ntwrk/midnight-js-network-id";
import { assertIsContractAddress, fromHex, toHex } from "@midnight-ntwrk/midnight-js-utils";
import { MidnightBech32m, ShieldedAddress } from "@midnight-ntwrk/wallet-sdk-address-format";
import { ContractState, sampleSigningKey, encodeShieldedCoinInfo, encodeUserAddress, rawTokenType } from "@midnight-ntwrk/compact-runtime";
import { createVerifierKey } from "@midnight-ntwrk/midnight-js-types";
import assert from "node:assert";
const CrossChainPrivateStateId = "crossChainPrivateState";
const currentDir = path.resolve(new URL(__dirname).pathname, "..");
const ZKConfig = {
  privateStateStoreName: "crosschain-private-state",
  zkConfigPath: path.resolve(currentDir, "managed", "crosschain")
};
const shieldedCoinInfo = (token, value) => encodeShieldedCoinInfo(createShieldedCoinInfo(token, value));
const fromHexWithOrNoPrefix = (hex) => {
  if (hex.startsWith("0x")) {
    return fromHex(hex.slice(2));
  }
  return fromHex(hex);
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
const crosschainContractInstance = new CrossChain.Contract(witnesses);
const createWalletAndMidnightProvider = async (wallet) => {
  const walletFacade = wallet.getWalletInstance();
  assert(walletFacade, "wallet not initialized");
  return {
    getCoinPublicKey: () => wallet.getShieldedSecretKeys().coinPublicKey,
    //() => state.shielded.coinPublicKey.toHexString(),
    getEncryptionPublicKey: () => wallet.getShieldedSecretKeys().encryptionPublicKey,
    balanceTx(tx, newCoins, ttl) {
      return walletFacade.balanceTransaction(wallet.getShieldedSecretKeys(), wallet.getDustSecretKey(), tx, ttl ? ttl : new Date(Date.now() + 1800 * 1e3));
    },
    submitTx(tx) {
      return walletFacade.submitTransaction(tx);
    }
  };
};
const MAX_SIGNER_COUNT = 29;
class CrossChainApi {
  providers;
  crossChainContract;
  MaxSmgSignators = 29;
  MaxMergeCoins = 4;
  constructor() {
  }
  async init(config, wallet) {
    const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
    const zkConfigProvider = new NodeZkConfigProvider(ZKConfig.zkConfigPath);
    this.providers = {
      privateStateProvider: levelPrivateStateProvider({
        privateStateStoreName: "CCPSSN",
        walletProvider: walletAndMidnightProvider
      }),
      publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
      zkConfigProvider: new NodeZkConfigProvider(ZKConfig.zkConfigPath),
      proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
      walletProvider: walletAndMidnightProvider,
      midnightProvider: walletAndMidnightProvider
    };
  }
  async setWallet(wallet) {
    const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
    this.providers = {
      ...this.providers,
      walletProvider: walletAndMidnightProvider,
      midnightProvider: walletAndMidnightProvider
    };
  }
  async deployContract(adminThreshold, smgPkThreshold, signingKey) {
    this.crossChainContract = await deployContract(this.providers, {
      contract: crosschainContractInstance,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {},
      signingKey,
      args: [BigInt(adminThreshold), BigInt(smgPkThreshold)]
    });
    return this.crossChainContract.deployTxData.public.contractAddress;
  }
  async join(contractAddress) {
    this.crossChainContract = await findDeployedContract(this.providers, {
      contractAddress,
      contract: crosschainContractInstance,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {}
    });
  }
  checkCrossData(uniqueId, smgId, tokenPairId, amount, fee, toAddr, coins, ttl) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const smgId_0 = Buffer.from(smgId, "hex");
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
      ttl: ttl_0
    };
  }
  async getTokenPairInfo(tokenPairId) {
    const ledger = await this.getLedgerState();
    return ledger?.tokenPairs.lookup(BigInt(tokenPairId));
  }
  async getTokensTotalSupply(tokens) {
    const ledger = await this.getLedgerState();
    const tokensTotalSupply = tokens.map((token) => {
      const token_0 = Buffer.from(token, "hex");
      const totalSupply = ledger?.mappintTokenTotalSupply.member(token_0) ? ledger?.mappintTokenTotalSupply.lookup(token_0).toString(10) : "0";
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
    const uniquId_0 = Buffer.from(uniqueId, "hex");
    if (ledger.crossProposal.member(uniquId_0)) {
      const crossTxInfo = ledger.crossProposal.lookup(uniquId_0);
      return {
        smgId: toHex(crossTxInfo.smgId),
        token: toHex(crossTxInfo.token),
        tokenPairId: crossTxInfo.tokenPairId.toString(10),
        amount: crossTxInfo.amount.toString(10),
        fee: crossTxInfo.fee.toString(10),
        toAddr: crossTxInfo.toAddr,
        ttl: crossTxInfo.ttl.toString(10)
      };
    }
  }
  static parseContractState(stateHex) {
    const state = ContractState.deserialize(Buffer.from(stateHex, "hex"));
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
    } else {
      return {
        smgId: toHex(ledger.latestOutBoundCrosstxInfo.smgId),
        fromAddr: toHex(ledger.latestOutBoundCrosstxInfo.fromAddr.bytes),
        toAddr: ledger.latestOutBoundCrosstxInfo.toAddr,
        tokenPairId: ledger.latestOutBoundCrosstxInfo.tokenPairId.toString(10),
        tokenAccount: ledger.latestOutBoundCrosstxInfo.tokenAccount,
        amount: ledger.latestOutBoundCrosstxInfo.amount.toString(10),
        fee: ledger.latestOutBoundCrosstxInfo.fee.toString(10),
        nonce: ledger.latestOutBoundCrosstxInfo.nonce.toString(10)
      };
    }
  }
  async isVoter(ledger, voter) {
    let voterPK;
    if (voter) {
      voterPK = getCoinPublicKeyFromShieldAddress(voter);
    } else {
      voterPK = fromHex(this.providers.walletProvider.getCoinPublicKey());
    }
    return ledger.smgTxSigners.member({ bytes: voterPK });
  }
  async getUnVotedCrossProposal(ledger, voter) {
    let voterPK;
    if (voter) {
      voterPK = getCoinPublicKeyFromShieldAddress(voter);
    } else {
      voterPK = fromHex(this.providers.walletProvider.getCoinPublicKey());
    }
    if (!this.isVoter(ledger, voter)) return [];
    const voterIndex = ledger.smgTxSigners.lookup({ bytes: voterPK });
    let res = [];
    for (const [uniquId, _] of ledger.crossProposal) {
      const voters = ledger.crossProposalVoters.lookup(uniquId);
      if (voters.size() >= ledger.smgPKThreshold) continue;
      if (voters.member(voterIndex)) continue;
      else {
        const crossTxInfo = CrossChainApi.getCrossTxInfo(ledger, toHex(uniquId));
        res.push(crossTxInfo);
      }
    }
    return res;
  }
  async getUnExecuteCrossProposal(ledger) {
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
  }
  async smgRelease(uniqueId, smgId, tokenPair, amount, fee, toAddr, ttl) {
  }
  async smgMint(uniqueId, smgId, tokenPair, amount, fee, toAddr, ttl) {
    const proof = this.checkCrossData(uniqueId, smgId, tokenPair, amount, fee, toAddr, void 0, ttl);
    const finalizedTxData = await this.crossChainContract.callTx.smgMint(proof.uniqueId, proof.smgId, proof.tokenPairId, proof.amount, proof.fee, proof.toAddr, proof.ttl);
    return finalizedTxData;
  }
  async userBurn(smgId, toAddress, tokenPair, amount) {
    const smgId_0 = Buffer.from(smgId, "hex");
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
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    const ttl_0 = BigInt(ttl);
    assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const finalizedTxData = await this.crossChainContract.callTx.voteCrossProposal({ uniqueId: uniqueId_0, ttl: ttl_0 });
    return finalizedTxData;
  }
  async voteMultiCrossProposal(uniqueIds) {
    const uniqueIds_0 = uniqueIds.map((item) => {
      const uniqueId_0 = Buffer.from(item.uniqueId, "hex");
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
  }
  async executeMultiCrossProposal(uniqueIds) {
    const uniqueIds_0 = uniqueIds.map((item) => {
      const uniqueId_0 = Buffer.from(item.uniqueId, "hex");
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
  async approveUserWithdrawFee(user) {
    const key_0 = { bytes: getCoinPublicKeyFromShieldAddress(user) };
    const ledgerState = await this.getLedgerState();
    assert(ledgerState != null, `ledgerState is null`);
    const finalizedTxData = await this.crossChainContract.callTx.approveUserWithdrawFee(key_0);
    return finalizedTxData;
  }
  async userClaim(uniqueId, isMappingToken) {
    if (isMappingToken) {
      return this.userClaimMappingToken(uniqueId);
    } else {
      return this.userClaimCoin(uniqueId);
    }
  }
  async userFeeWithdrawRequest(receiptor) {
    const receiptor_0 = { bytes: encodeUserAddress(receiptor) };
    const finalizedTxData = await this.crossChainContract.callTx.userFeeWithdrawRequest(receiptor_0);
    return finalizedTxData;
  }
  async userClaimCoin(uniqueId) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const finalizedTxData = await this.crossChainContract.callTx.userClaimCoin(uniqueId_0);
    return finalizedTxData;
  }
  async userClaimMappingToken(uniqueId) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
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
    assert(token.tag == "shielded", "not shielded token");
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
    assert(token.tag == "unshielded", "not shielded token");
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
    const state = await this.providers.publicDataProvider.queryContractState(this.crossChainContract?.deployTxData.public.contractAddress).then((contractState) => contractState != null ? CrossChain.ledger(contractState.data) : null);
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
    if (threshold_0 < 1n) throw "threshold must be greater than 0";
    const finalizedTxData = await this.crossChainContract.callTx.setAdminThreshold(threshold_0);
    return finalizedTxData;
  }
  async setSmgPksks(voters) {
    assert(voters.length > 0, "voters must not be empty");
    const voters_0 = voters.map((voter) => {
      return { bytes: getCoinPublicKeyFromShieldAddress(voter) };
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
      isShielded,
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
    assert(txs.length <= 20, "txs length should be less than 20");
    const txs_0 = txs.map((tx) => Buffer.from(tx, "hex"));
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
    } else {
      newVK = await this.providers.zkConfigProvider.getVerifierKey(circuitId);
    }
    const res1 = await this.crossChainContract.circuitMaintenanceTx[circuitId].removeVerifierKey();
    const res2 = await this.crossChainContract.circuitMaintenanceTx[circuitId].insertVerifierKey(newVK);
    return res2;
  }
}
const upgradeContractCircuit = async (providers, contractAddress, circuitId, newVkHex) => {
  assertIsContractAddress(contractAddress);
  let newVk;
  if (newVkHex) {
    newVk = createVerifierKey(fromHex(newVkHex));
  } else {
    newVk = await providers.zkConfigProvider.getVerifierKey(circuitId);
  }
  return await submitInsertVerifierKeyTx(providers, contractAddress, circuitId, newVk);
};
const removeContractCircuit = async (providers, contractAddress, circuitId) => {
  assertIsContractAddress(contractAddress);
  return await submitRemoveVerifierKeyTx(providers, contractAddress, circuitId);
};
const getTreasuryCoinsFromState = (state) => {
  let treasuryCoins = /* @__PURE__ */ new Map();
  console.log("treasuryCoins size:", state.treasuryCoins.size());
  for (const [coinId, coin] of state.treasuryCoins) {
    const tokenType = decodeRawTokenType(coin.color);
    if (!treasuryCoins.has(tokenType)) {
      treasuryCoins.set(tokenType, /* @__PURE__ */ new Map());
    }
    treasuryCoins.get(tokenType)?.set(coinId, coin);
  }
  return treasuryCoins;
};
const genSigningKey = () => {
  return sampleSigningKey();
};
const getCoinPublicKeyFromShieldAddress = (shieldAddr) => {
  const tmp1 = MidnightBech32m.parse(shieldAddr);
  const tmp2 = ShieldedAddress.codec.decode(tmp1.network, tmp1);
  return tmp2.coinPublicKey.data;
};
const initNetwork = (network) => {
  setNetworkId(network);
};
export {
  CrossChainApi,
  CrossChainPrivateStateId,
  ZKConfig,
  createWalletAndMidnightProvider,
  crosschainContractInstance,
  currentDir,
  genSigningKey,
  getCoinPublicKeyFromShieldAddress,
  getTreasuryCoinsFromState,
  initNetwork,
  pad,
  removeContractCircuit,
  upgradeContractCircuit
};
//# sourceMappingURL=api.mjs.map