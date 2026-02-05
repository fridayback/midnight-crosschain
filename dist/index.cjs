'use strict';

var ledger = require('@midnight-ntwrk/ledger-v7');
var walletSdkDustWallet = require('@midnight-ntwrk/wallet-sdk-dust-wallet');
var walletSdkFacade = require('@midnight-ntwrk/wallet-sdk-facade');
var walletSdkHd = require('@midnight-ntwrk/wallet-sdk-hd');
var walletSdkShielded = require('@midnight-ntwrk/wallet-sdk-shielded');
var walletSdkUnshieldedWallet = require('@midnight-ntwrk/wallet-sdk-unshielded-wallet');
var buffer = require('buffer');
var Rx = require('rxjs');
var walletSdkAddressFormat = require('@midnight-ntwrk/wallet-sdk-address-format');
var assert3 = require('assert');
var graphHttp = require('graphql-http');
var axios = require('axios');
var path = require('path');
var __compactRuntime = require('@midnight-ntwrk/compact-runtime');
var compactJs = require('@midnight-ntwrk/compact-js');
var midnightJsTypes = require('@midnight-ntwrk/midnight-js-types');
var midnightJsContracts = require('@midnight-ntwrk/midnight-js-contracts');
var midnightJsLevelPrivateStateProvider = require('@midnight-ntwrk/midnight-js-level-private-state-provider');
var midnightJsIndexerPublicDataProvider = require('@midnight-ntwrk/midnight-js-indexer-public-data-provider');
var midnightJsNodeZkConfigProvider = require('@midnight-ntwrk/midnight-js-node-zk-config-provider');
var midnightJsHttpClientProofProvider = require('@midnight-ntwrk/midnight-js-http-client-proof-provider');
var midnightJsNetworkId = require('@midnight-ntwrk/midnight-js-network-id');
var midnightJsUtils = require('@midnight-ntwrk/midnight-js-utils');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var ledger__namespace = /*#__PURE__*/_interopNamespace(ledger);
var Rx__namespace = /*#__PURE__*/_interopNamespace(Rx);
var assert3__default = /*#__PURE__*/_interopDefault(assert3);
var graphHttp__namespace = /*#__PURE__*/_interopNamespace(graphHttp);
var axios__default = /*#__PURE__*/_interopDefault(axios);
var path__default = /*#__PURE__*/_interopDefault(path);
var __compactRuntime__namespace = /*#__PURE__*/_interopNamespace(__compactRuntime);

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
var indexerURL = (process.env.INDEXER_URL || "http://10.211.55.6:8088") + "/api/v3/graphql";
var txServerURL = (process.env.TX_SERVER_URL || "http://10.211.55.6:3000") + "/submit";
var client = graphHttp__namespace.createClient({ url: indexerURL });
var TXClient = class {
  static async post(apiURL, txStringWithContext) {
    try {
      const response = await axios__default.default.post(
        apiURL,
        txStringWithContext
      );
      console.log("\u2705 Post successfully!");
      return response.data;
    } catch (error) {
      if (axios__default.default.isAxiosError(error)) {
        console.error("\u274C Axios error:", error.message);
      } else {
        console.error("\u274C Unexpected error:", error);
      }
      throw error;
    }
  }
};
var ToolKitClient = class _ToolKitClient {
  static async getBlockNumberSync() {
    let qryOption = `{
            block {
                height
                hash
            }
        }`;
    const ret = await new Promise((resolve, reject) => {
      let result;
      client.subscribe(
        {
          query: qryOption
        },
        {
          next: (data) => result = data,
          error: reject,
          complete: () => resolve(result)
        }
      );
    });
    console.log("midnight getBlockNumberSync query result: ", ret);
    return ret;
  }
  static async prepareTXStringWithContext(txData) {
    let txBlock = await _ToolKitClient.getBlockNumberSync();
    let initialTX = {
      tx: [],
      block_context: {
        secondsSinceEpoch: 0,
        secondsSinceEpochErr: 30,
        parentBlockHash: ""
      }
    };
    const timestampSec = Math.floor(Date.now() / 1e3);
    initialTX.tx = Array.from(txData);
    initialTX.block_context.secondsSinceEpoch = timestampSec;
    initialTX.block_context.parentBlockHash = txBlock.data.block.hash;
    let txStringWithContext = {
      initial_tx: JSON.stringify(initialTX),
      batches: []
    };
    return txStringWithContext;
  }
  static async submitTXStringWithContext(tx) {
    const txStringWithContext = await _ToolKitClient.prepareTXStringWithContext(tx.serialize());
    const ret = await TXClient.post(txServerURL, txStringWithContext);
    return ret;
  }
};

// src/wallet-sdk.ts
var configuration = function(indexerHttpUrl, indexerWsUrl, provingServerUrl, node, network = "preview", costParameters = {
  additionalFeeOverhead: 300000000000000n,
  feeBlocksMargin: 5
}) {
  return {
    networkId: network,
    costParameters,
    relayURL: new URL(node.replace(/^http/, "ws")),
    provingServerUrl: new URL(provingServerUrl),
    indexerClientConnection: {
      indexerHttpUrl,
      indexerWsUrl
    },
    indexerUrl: indexerWsUrl,
    batchSize: 1
  };
};
var initFacadeWallet = async (seed, configuration2, strSerializedState) => {
  const hdWallet = walletSdkHd.HDWallet.fromSeed(seed);
  if (hdWallet.type !== "seedOk") {
    throw new Error("Failed to initialize HDWallet");
  }
  const derivationResult = hdWallet.hdWallet.selectAccount(0).selectRoles([walletSdkHd.Roles.Zswap, walletSdkHd.Roles.NightExternal, walletSdkHd.Roles.Dust]).deriveKeysAt(0);
  if (derivationResult.type !== "keysDerived") {
    throw new Error("Failed to derive keys");
  }
  hdWallet.hdWallet.clear();
  const shieldedSecretKeys = ledger__namespace.ZswapSecretKeys.fromSeed(derivationResult.keys[walletSdkHd.Roles.Zswap]);
  const dustSecretKey = ledger__namespace.DustSecretKey.fromSeed(derivationResult.keys[walletSdkHd.Roles.Dust]);
  const unshieldedKeystore = walletSdkUnshieldedWallet.createKeystore(derivationResult.keys[walletSdkHd.Roles.NightExternal], configuration2.networkId);
  const shieldedWallet = strSerializedState && strSerializedState.shieldedWalletState ? walletSdkShielded.ShieldedWallet(configuration2).restore(strSerializedState.shieldedWalletState) : walletSdkShielded.ShieldedWallet(configuration2).startWithSecretKeys(shieldedSecretKeys);
  const dustWallet = strSerializedState && strSerializedState.dustWalletState ? walletSdkDustWallet.DustWallet(configuration2).restore(strSerializedState.dustWalletState) : walletSdkDustWallet.DustWallet(configuration2).startWithSecretKey(dustSecretKey, ledger__namespace.LedgerParameters.initialParameters().dust);
  const unshieldedWallet = strSerializedState && strSerializedState.unshieldedWalletState ? walletSdkUnshieldedWallet.UnshieldedWallet({
    ...configuration2,
    txHistoryStorage: new walletSdkUnshieldedWallet.NoOpTransactionHistoryStorage()
    //此处不对交易历史进行保留
  }).restore(strSerializedState.unshieldedWalletState) : walletSdkUnshieldedWallet.UnshieldedWallet({
    ...configuration2,
    txHistoryStorage: new walletSdkUnshieldedWallet.NoOpTransactionHistoryStorage()
    //此处不对交易历史进行保留
  }).startWithPublicKey(walletSdkUnshieldedWallet.PublicKey.fromKeyStore(unshieldedKeystore));
  const wallet = new walletSdkFacade.WalletFacade(shieldedWallet, unshieldedWallet, dustWallet);
  await wallet.start(shieldedSecretKeys, dustSecretKey);
  return { wallet, shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
};
var waitForFullySynced = async (facade) => {
  const timeCur = Date.now();
  const state = await Rx__namespace.firstValueFrom(facade.state().pipe(Rx__namespace.filter((s) => s.isSynced)));
  console.log(`Wallet synced in ${(Date.now() - timeCur) / 1e3} seconds`);
  return state;
};
var MidnightWalletSDK = class {
  constructor(config, mimic = false) {
    this.isGenerating = false;
    this.isUnGenerating = false;
    this.ISMimic = false;
    this.config = config;
    this.walletAddress = { shieldedAddress: "", unshieldedAddress: "", dustAddress: "" };
    this.bActiveFlag = false;
    this.ISMimic = mimic;
  }
  //////////////////////////////////////////
  // to generate a wallet instance
  //////////////////////////////////////////
  async initWallet(strSeed, store, strSerializedState, saveInterval = 6e5) {
    const seed = buffer.Buffer.from(strSeed, "hex");
    if (seed.toString("hex").toLowerCase() != strSeed.toLowerCase()) throw "bad seed";
    const ret = await initFacadeWallet(seed, this.config, strSerializedState);
    this.walletObj = ret.wallet;
    this.shieldedSecretKeys = ret.shieldedSecretKeys;
    this.unshieldedKeystore = ret.unshieldedKeystore;
    this.dustSecretKey = ret.dustSecretKey;
    const selfWallet = this.walletObj;
    const state = await waitForFullySynced(this.walletObj);
    this.walletAddress = {
      shieldedAddress: walletSdkAddressFormat.ShieldedAddress.codec.encode(this.config.networkId, state.shielded.address).asString(),
      unshieldedAddress: walletSdkAddressFormat.UnshieldedAddress.codec.encode(this.config.networkId, state.unshielded.address).asString(),
      dustAddress: state.dust.dustAddress
    };
    const callBack = async () => {
      const state2 = await waitForFullySynced(selfWallet);
      await store({ shieldedWalletState: state2.shielded.serialize(), unshieldedWalletState: state2.unshielded.serialize(), dustWalletState: state2.dust.serialize() });
      console.log("wallet state saved!");
      clearTimeout(this.storeTimer);
      this.registerNightUtxosForDustGeneration();
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
  async registerNightUtxosForDustGeneration() {
    if (this.isGenerating) return;
    this.isGenerating = true;
    assert3__default.default(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
    const state = await waitForFullySynced(this.walletObj);
    const nightUtxos = state.unshielded.availableCoins.filter(
      (coin) => coin.meta.registeredForDustGeneration === false && coin.utxo.type === ledger__namespace.nativeToken().raw
    );
    if (nightUtxos.length === 0) {
      this.isGenerating = false;
      return;
    }
    const signKeyStore = this.unshieldedKeystore;
    const dustRegistrationRecipe = await this.walletObj.registerNightUtxosForDustGeneration(
      nightUtxos,
      signKeyStore.getPublicKey(),
      (payload) => signKeyStore.signData(payload)
      // this.walletAddress.dustAddress
    );
    const finalizedDustTx = await this.walletObj.finalizeRecipe(dustRegistrationRecipe);
    this.ISMimic ? await ToolKitClient.submitTXStringWithContext(finalizedDustTx) : await this.walletObj.submitTransaction(finalizedDustTx);
    this.isGenerating = false;
  }
  async deregisterFromDustGeneration() {
    if (this.isUnGenerating) return;
    this.isUnGenerating = true;
    assert3__default.default(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
    const state = await waitForFullySynced(this.walletObj);
    const nightUtxos = state.unshielded.availableCoins.filter(
      (coin) => coin.meta.registeredForDustGeneration === true && coin.utxo.type === ledger__namespace.nativeToken().raw
    );
    if (nightUtxos.length === 0) {
      this.isUnGenerating = false;
      return;
    }
    const signKeyStore = this.unshieldedKeystore;
    const dustRegistrationRecipe = await this.walletObj.deregisterFromDustGeneration(
      nightUtxos,
      signKeyStore.getPublicKey(),
      (payload) => signKeyStore.signData(payload)
      // this.walletAddress.dustAddress
    );
    const unshieldedKeystore = this.unshieldedKeystore;
    const recipe = await this.walletObj?.signRecipe(dustRegistrationRecipe, (payload) => unshieldedKeystore.signData(payload));
    const finalizedDustTx = await this.walletObj.finalizeRecipe(recipe);
    this.ISMimic ? await ToolKitClient.submitTXStringWithContext(finalizedDustTx) : await this.walletObj.submitTransaction(finalizedDustTx);
    this.isUnGenerating = false;
  }
  async getBalances() {
    assert3__default.default(this.walletObj, "walletObj is not initialized!");
    let curState = await waitForFullySynced(this.walletObj);
    const dustBalance = curState.dust.walletBalance(/* @__PURE__ */ new Date());
    const shieldedBlance = curState.shielded.balances;
    const unshieldedBlance = curState.unshielded.balances;
    const replacer = (key, value) => typeof value === "bigint" ? value.toString() : value;
    const reviver = (key, value) => typeof value === "string" && /^\d+$/.test(value) ? BigInt(value) : value;
    return { dustBalance, shieldedBlance: JSON.parse(JSON.stringify(shieldedBlance, replacer), reviver), unshieldedBlance: JSON.parse(JSON.stringify(unshieldedBlance, replacer), reviver) };
  }
  async getAvailableCoins() {
    assert3__default.default(this.walletObj, "walletObj is not initialized!");
    let curState = await waitForFullySynced(this.walletObj);
    const dustAvailableCoins = curState.dust.availableCoins;
    const shieldedAvailableCoins = curState.shielded.availableCoins;
    const unshieldedAvailableCoins = curState.unshielded.availableCoins;
    return { dustAvailableCoins, shieldedAvailableCoins, unshieldedAvailableCoins };
  }
  async uninitWallet() {
    if (this.storeTimer) {
      clearTimeout(this.storeTimer);
    }
    if (true === this.bActiveFlag) {
      await this.walletObj?.stop();
    }
    this.bActiveFlag = false;
    console.log("\n\n...wallet close done!");
  }
  getWalletInstance() {
    return this.walletObj;
  }
  getShieldedSecretKeys() {
    assert3__default.default(this.shieldedSecretKeys, "shieldedSecretKeys is undefined");
    return this.shieldedSecretKeys;
  }
  getUnshieldedKeystore() {
    assert3__default.default(this.unshieldedKeystore, "unshieldedKeystore is undefined");
    return this.unshieldedKeystore;
  }
  getDustSecretKey() {
    assert3__default.default(this.dustSecretKey, "dustSecretKey is undefined");
    return this.dustSecretKey;
  }
  async getSerializedWalletState() {
    if (!this.walletObj) return "";
    let curState = await waitForFullySynced(this.walletObj);
    const dustWalletState = curState.dust.serialize();
    const shieldedWalletState = curState.shielded.serialize();
    const unshieldedWalletState = curState.unshielded.serialize();
    return { dustWalletState, shieldedWalletState, unshieldedWalletState };
  }
  async transferTo(transferInfo, ttl) {
    assert3__default.default(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
    const recipe = await this.walletObj?.transferTransaction(
      transferInfo,
      {
        shieldedSecretKeys: this.shieldedSecretKeys,
        dustSecretKey: this.dustSecretKey
      },
      { ttl, payFees: true }
    );
    const unshieldedKeystore = this.unshieldedKeystore;
    const signedTransferTxRecipe = await this.walletObj?.signRecipe(recipe, (payload) => unshieldedKeystore.signData(payload));
    const finalizedTx = await this.walletObj.finalizeRecipe(signedTransferTxRecipe);
    const submittedTxHash = this.ISMimic ? await ToolKitClient.submitTXStringWithContext(finalizedTx) : await this.walletObj.submitTransaction(finalizedTx);
    return submittedTxHash;
  }
  async balanceTx(tx, ttl) {
    assert3__default.default(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
    const recipe = await this.walletObj.balanceUnboundTransaction(
      tx,
      { shieldedSecretKeys: this.shieldedSecretKeys, dustSecretKey: this.dustSecretKey },
      { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1e3) }
    );
    const unshieldedKeystore = this.unshieldedKeystore;
    const signFn = (payload) => unshieldedKeystore.signData(payload);
    signTransactionIntents(recipe.baseTransaction, signFn, "proof");
    if (recipe.balancingTransaction) {
      signTransactionIntents(recipe.balancingTransaction, signFn, "pre-proof");
    }
    const finalizedTx = await this.walletObj.finalizeRecipe(recipe);
    return finalizedTx;
  }
};
var signTransactionIntents = (tx, signFn, proofMarker) => {
  if (!tx.intents || tx.intents.size === 0) return;
  for (const segment of tx.intents.keys()) {
    const intent = tx.intents.get(segment);
    if (!intent) continue;
    const cloned = ledger__namespace.Intent.deserialize(
      "signature",
      proofMarker,
      "pre-binding",
      intent.serialize()
    );
    const sigData = cloned.signatureData(segment);
    const signature = signFn(sigData);
    if (cloned.fallibleUnshieldedOffer) {
      const sigs = cloned.fallibleUnshieldedOffer.inputs.map(
        (_, i) => cloned.fallibleUnshieldedOffer.signatures.at(i) ?? signature
      );
      cloned.fallibleUnshieldedOffer = cloned.fallibleUnshieldedOffer.addSignatures(sigs);
    }
    if (cloned.guaranteedUnshieldedOffer) {
      const sigs = cloned.guaranteedUnshieldedOffer.inputs.map(
        (_, i) => cloned.guaranteedUnshieldedOffer.signatures.at(i) ?? signature
      );
      cloned.guaranteedUnshieldedOffer = cloned.guaranteedUnshieldedOffer.addSignatures(sigs);
    }
    tx.intents.set(segment, cloned);
  }
};

// src/witnesses.ts
var createPrivateState = (privateCounter) => ({});
var createInitialPrivateState = (privateCounter) => createPrivateState();
var witnesses = {
  //   privateIncrement: ({ privateState }: WitnessContext<Ledger, CrossChainPrivateState>): [CrossChainPrivateState, []] => [
  //     { privateCounter: privateState.privateCounter + 1 },
  //     []
  //   ]
};
__compactRuntime__namespace.checkRuntimeVersion("0.14.0");
var ProposalType;
(function(ProposalType2) {
  ProposalType2[ProposalType2["AddAdmin"] = 0] = "AddAdmin";
  ProposalType2[ProposalType2["RemoveAdmin"] = 1] = "RemoveAdmin";
  ProposalType2[ProposalType2["UpdateFeeShieldedReceiver"] = 2] = "UpdateFeeShieldedReceiver";
  ProposalType2[ProposalType2["UpdateFeeUnshieldedReceiver"] = 3] = "UpdateFeeUnshieldedReceiver";
  ProposalType2[ProposalType2["UpdateTokenManager"] = 4] = "UpdateTokenManager";
  ProposalType2[ProposalType2["UpdateAdminThreshold"] = 5] = "UpdateAdminThreshold";
  ProposalType2[ProposalType2["UpdateSMGPKThreshold"] = 6] = "UpdateSMGPKThreshold";
  ProposalType2[ProposalType2["UpdateFeeCommonConfig"] = 7] = "UpdateFeeCommonConfig";
  ProposalType2[ProposalType2["SetSmgPKS"] = 8] = "SetSmgPKS";
})(ProposalType || (ProposalType = {}));
var _descriptor_0 = new __compactRuntime__namespace.CompactTypeBytes(32);
var _ContractAddress_0 = class {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
};
var _descriptor_1 = new _ContractAddress_0();
var _descriptor_2 = new __compactRuntime__namespace.CompactTypeUnsignedInteger(4294967295n, 4);
var _descriptor_3 = __compactRuntime__namespace.CompactTypeBoolean;
var _descriptor_4 = new __compactRuntime__namespace.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);
var _TokenPairInfo_0 = class {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment())))));
  }
  fromValue(value_0) {
    return {
      fromChainId: _descriptor_2.fromValue(value_0),
      toChainId: _descriptor_2.fromValue(value_0),
      midnigthTokenAccount: _descriptor_0.fromValue(value_0),
      domainSep: _descriptor_0.fromValue(value_0),
      isShielded: _descriptor_3.fromValue(value_0),
      fee: _descriptor_4.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.fromChainId).concat(_descriptor_2.toValue(value_0.toChainId).concat(_descriptor_0.toValue(value_0.midnigthTokenAccount).concat(_descriptor_0.toValue(value_0.domainSep).concat(_descriptor_3.toValue(value_0.isShielded).concat(_descriptor_4.toValue(value_0.fee))))));
  }
};
var _descriptor_5 = new _TokenPairInfo_0();
var _ZswapCoinPublicKey_0 = class {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
};
var _descriptor_6 = new _ZswapCoinPublicKey_0();
var _ReserveOfToken_0 = class {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_3.alignment());
  }
  fromValue(value_0) {
    return {
      total: _descriptor_4.fromValue(value_0),
      isMappingToken: _descriptor_3.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.total).concat(_descriptor_3.toValue(value_0.isMappingToken));
  }
};
var _descriptor_7 = new _ReserveOfToken_0();
var _ClaimMappingTokenInfo_0 = class {
  alignment() {
    return _descriptor_6.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment()));
  }
  fromValue(value_0) {
    return {
      receiver: _descriptor_6.fromValue(value_0),
      domainSep: _descriptor_0.fromValue(value_0),
      amount: _descriptor_4.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0.receiver).concat(_descriptor_0.toValue(value_0.domainSep).concat(_descriptor_4.toValue(value_0.amount)));
  }
};
var _descriptor_8 = new _ClaimMappingTokenInfo_0();
var _descriptor_9 = new __compactRuntime__namespace.CompactTypeUnsignedInteger(18446744073709551615n, 8);
var _UserAddress_0 = class {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
};
var _descriptor_10 = new _UserAddress_0();
var _QualifiedShieldedCoinInfo_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_9.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_4.fromValue(value_0),
      mt_index: _descriptor_9.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_4.toValue(value_0.value).concat(_descriptor_9.toValue(value_0.mt_index))));
  }
};
var _descriptor_11 = new _QualifiedShieldedCoinInfo_0();
var _ClaimCoinInfo_0 = class {
  alignment() {
    return _descriptor_6.alignment().concat(_descriptor_11.alignment());
  }
  fromValue(value_0) {
    return {
      receiver: _descriptor_6.fromValue(value_0),
      coin: _descriptor_11.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0.receiver).concat(_descriptor_11.toValue(value_0.coin));
  }
};
var _descriptor_12 = new _ClaimCoinInfo_0();
var _descriptor_13 = new __compactRuntime__namespace.CompactTypeUnsignedInteger(255n, 1);
var _CrossProposal_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_6.alignment().concat(_descriptor_9.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_0.fromValue(value_0),
      token: _descriptor_0.fromValue(value_0),
      tokenPairId: _descriptor_2.fromValue(value_0),
      isMappingToken: _descriptor_3.fromValue(value_0),
      isShielded: _descriptor_3.fromValue(value_0),
      amount: _descriptor_4.fromValue(value_0),
      fee: _descriptor_4.fromValue(value_0),
      toAddr: _descriptor_6.fromValue(value_0),
      ttl: _descriptor_9.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.smgId).concat(_descriptor_0.toValue(value_0.token).concat(_descriptor_2.toValue(value_0.tokenPairId).concat(_descriptor_3.toValue(value_0.isMappingToken).concat(_descriptor_3.toValue(value_0.isShielded).concat(_descriptor_4.toValue(value_0.amount).concat(_descriptor_4.toValue(value_0.fee).concat(_descriptor_6.toValue(value_0.toAddr).concat(_descriptor_9.toValue(value_0.ttl)))))))));
  }
};
var _descriptor_14 = new _CrossProposal_0();
var _SmgEvent_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_14.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_0.fromValue(value_0),
      crossProposal: _descriptor_14.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.uniqueId).concat(_descriptor_14.toValue(value_0.crossProposal));
  }
};
var _descriptor_15 = new _SmgEvent_0();
var _VoteForCrossPropasal_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_9.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_0.fromValue(value_0),
      ttl: _descriptor_9.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.uniqueId).concat(_descriptor_9.toValue(value_0.ttl));
  }
};
var _descriptor_16 = new _VoteForCrossPropasal_0();
var _ExecuteCrossProposalInfo_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_4.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_0.fromValue(value_0),
      coinIndex: _descriptor_4.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.uniqueId).concat(_descriptor_4.toValue(value_0.coinIndex));
  }
};
var _descriptor_17 = new _ExecuteCrossProposalInfo_0();
var _descriptor_18 = new __compactRuntime__namespace.CompactTypeVector(5, _descriptor_17);
var _descriptor_19 = new __compactRuntime__namespace.CompactTypeUnsignedInteger(65535n, 2);
var _descriptor_20 = new __compactRuntime__namespace.CompactTypeVector(5, _descriptor_16);
var _descriptor_21 = __compactRuntime__namespace.CompactTypeOpaqueString;
var _CrossOutBound_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_21.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment())))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_0.fromValue(value_0),
      fromAddr: _descriptor_6.fromValue(value_0),
      toAddr: _descriptor_21.fromValue(value_0),
      tokenPairId: _descriptor_2.fromValue(value_0),
      tokenAccount: _descriptor_0.fromValue(value_0),
      amount: _descriptor_4.fromValue(value_0),
      fee: _descriptor_4.fromValue(value_0),
      nonce: _descriptor_4.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.smgId).concat(_descriptor_6.toValue(value_0.fromAddr).concat(_descriptor_21.toValue(value_0.toAddr).concat(_descriptor_2.toValue(value_0.tokenPairId).concat(_descriptor_0.toValue(value_0.tokenAccount).concat(_descriptor_4.toValue(value_0.amount).concat(_descriptor_4.toValue(value_0.fee).concat(_descriptor_4.toValue(value_0.nonce))))))));
  }
};
var _descriptor_22 = new _CrossOutBound_0();
var _ShieldedCoinInfo_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_4.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_4.toValue(value_0.value)));
  }
};
var _descriptor_23 = new _ShieldedCoinInfo_0();
var _Either_0 = class {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_3.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
};
var _descriptor_24 = new _Either_0();
var _descriptor_28 = __compactRuntime__namespace.CompactTypeField;
var _descriptor_29 = new __compactRuntime__namespace.CompactTypeBytes(21);
var _CoinPreimage_0 = class {
  alignment() {
    return _descriptor_29.alignment().concat(_descriptor_23.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment())));
  }
  fromValue(value_0) {
    return {
      domain_sep: _descriptor_29.fromValue(value_0),
      info: _descriptor_23.fromValue(value_0),
      dataType: _descriptor_3.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_29.toValue(value_0.domain_sep).concat(_descriptor_23.toValue(value_0.info).concat(_descriptor_3.toValue(value_0.dataType).concat(_descriptor_0.toValue(value_0.data))));
  }
};
var _descriptor_30 = new _CoinPreimage_0();
var _descriptor_31 = new __compactRuntime__namespace.CompactTypeVector(2, _descriptor_0);
var _descriptor_32 = new __compactRuntime__namespace.CompactTypeVector(2, _descriptor_28);
var _descriptor_33 = new __compactRuntime__namespace.CompactTypeVector(3, _descriptor_28);
var _descriptor_34 = new __compactRuntime__namespace.CompactTypeEnum(8, 1);
var _FeeConfig_0 = class {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_4.alignment());
  }
  fromValue(value_0) {
    return {
      chainId: _descriptor_2.fromValue(value_0),
      fee: _descriptor_4.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.chainId).concat(_descriptor_4.toValue(value_0.fee));
  }
};
var _descriptor_35 = new _FeeConfig_0();
var _descriptor_36 = new __compactRuntime__namespace.CompactTypeVector(29, _descriptor_6);
var _Proposal_0 = class {
  alignment() {
    return _descriptor_34.alignment().concat(_descriptor_6.alignment().concat(_descriptor_10.alignment().concat(_descriptor_4.alignment().concat(_descriptor_35.alignment().concat(_descriptor_36.alignment())))));
  }
  fromValue(value_0) {
    return {
      pType: _descriptor_34.fromValue(value_0),
      addr: _descriptor_6.fromValue(value_0),
      addrUnshielded: _descriptor_10.fromValue(value_0),
      threshold: _descriptor_4.fromValue(value_0),
      feeConfig: _descriptor_35.fromValue(value_0),
      smgPubkeys: _descriptor_36.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_34.toValue(value_0.pType).concat(_descriptor_6.toValue(value_0.addr).concat(_descriptor_10.toValue(value_0.addrUnshielded).concat(_descriptor_4.toValue(value_0.threshold).concat(_descriptor_35.toValue(value_0.feeConfig).concat(_descriptor_36.toValue(value_0.smgPubkeys))))));
  }
};
var _descriptor_37 = new _Proposal_0();
var Contract = class {
  constructor(...args_0) {
    __publicField(this, "witnesses");
    if (args_0.length !== 1) {
      throw new __compactRuntime__namespace.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof witnesses_0 !== "object") {
      throw new __compactRuntime__namespace.CompactError("first (witnesses) argument to Contract constructor is not an object");
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      userLock(context, ...args_1) {
        return { result: pureCircuits.userLock(...args_1), context };
      },
      smgRelease(context, ...args_1) {
        return { result: pureCircuits.smgRelease(...args_1), context };
      },
      smgMint: (...args_1) => {
        if (args_1.length !== 8) {
          throw new __compactRuntime__namespace.CompactError(`smgMint: expected 8 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const uniqueId_0 = args_1[1];
        const smgId_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        const fee_0 = args_1[5];
        const toAddr_0 = args_1[6];
        const ttl_0 = args_1[7];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 239 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 239 char 1",
            "Bytes<32>",
            uniqueId_0
          );
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 2 (argument 3 as invoked from Typescript)",
            "crosschain.compact line 239 char 1",
            "Bytes<32>",
            smgId_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 3 (argument 4 as invoked from Typescript)",
            "crosschain.compact line 239 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        if (!(typeof amount_0 === "bigint" && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 4 (argument 5 as invoked from Typescript)",
            "crosschain.compact line 239 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            amount_0
          );
        }
        if (!(typeof fee_0 === "bigint" && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 5 (argument 6 as invoked from Typescript)",
            "crosschain.compact line 239 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            fee_0
          );
        }
        if (!(typeof toAddr_0 === "object" && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 6 (argument 7 as invoked from Typescript)",
            "crosschain.compact line 239 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            toAddr_0
          );
        }
        if (!(typeof ttl_0 === "bigint" && ttl_0 >= 0n && ttl_0 <= 18446744073709551615n)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 7 (argument 8 as invoked from Typescript)",
            "crosschain.compact line 239 char 1",
            "Uint<0..18446744073709551616>",
            ttl_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(uniqueId_0).concat(_descriptor_0.toValue(smgId_0).concat(_descriptor_2.toValue(tokenPairId_0).concat(_descriptor_4.toValue(amount_0).concat(_descriptor_4.toValue(fee_0).concat(_descriptor_6.toValue(toAddr_0).concat(_descriptor_9.toValue(ttl_0))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_6.alignment().concat(_descriptor_9.alignment()))))))
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._smgMint_0(
          context,
          partialProofData,
          uniqueId_0,
          smgId_0,
          tokenPairId_0,
          amount_0,
          fee_0,
          toAddr_0,
          ttl_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      userBurn: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime__namespace.CompactError(`userBurn: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const smgId_0 = args_1[1];
        const toAddr_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const coin_0 = args_1[4];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "userBurn",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 249 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "userBurn",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 249 char 1",
            "Bytes<32>",
            smgId_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "userBurn",
            "argument 3 (argument 4 as invoked from Typescript)",
            "crosschain.compact line 249 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        if (!(typeof coin_0 === "object" && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof coin_0.value === "bigint" && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "userBurn",
            "argument 4 (argument 5 as invoked from Typescript)",
            "crosschain.compact line 249 char 1",
            "struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>",
            coin_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(smgId_0).concat(_descriptor_21.toValue(toAddr_0).concat(_descriptor_2.toValue(tokenPairId_0).concat(_descriptor_23.toValue(coin_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_21.alignment().concat(_descriptor_2.alignment().concat(_descriptor_23.alignment())))
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userBurn_0(
          context,
          partialProofData,
          smgId_0,
          toAddr_0,
          tokenPairId_0,
          coin_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      voteMultiCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`voteMultiCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const uniqueIds_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "voteMultiCrossProposal",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 330 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(Array.isArray(uniqueIds_0) && uniqueIds_0.length === 5 && uniqueIds_0.every((t) => typeof t === "object" && t.uniqueId.buffer instanceof ArrayBuffer && t.uniqueId.BYTES_PER_ELEMENT === 1 && t.uniqueId.length === 32 && typeof t.ttl === "bigint" && t.ttl >= 0n && t.ttl <= 18446744073709551615n))) {
          __compactRuntime__namespace.typeError(
            "voteMultiCrossProposal",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 330 char 1",
            "Vector<5, struct VoteForCrossPropasal<uniqueId: Bytes<32>, ttl: Uint<0..18446744073709551616>>>",
            uniqueIds_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_20.toValue(uniqueIds_0),
            alignment: _descriptor_20.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._voteMultiCrossProposal_0(
          context,
          partialProofData,
          uniqueIds_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      voteCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`voteCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const target_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "voteCrossProposal",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 338 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof target_0 === "object" && target_0.uniqueId.buffer instanceof ArrayBuffer && target_0.uniqueId.BYTES_PER_ELEMENT === 1 && target_0.uniqueId.length === 32 && typeof target_0.ttl === "bigint" && target_0.ttl >= 0n && target_0.ttl <= 18446744073709551615n)) {
          __compactRuntime__namespace.typeError(
            "voteCrossProposal",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 338 char 1",
            "struct VoteForCrossPropasal<uniqueId: Bytes<32>, ttl: Uint<0..18446744073709551616>>",
            target_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_16.toValue(target_0),
            alignment: _descriptor_16.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._voteCrossProposal_0(
          context,
          partialProofData,
          target_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      executeMultiCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`executeMultiCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const mutiEx_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "executeMultiCrossProposal",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 369 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(Array.isArray(mutiEx_0) && mutiEx_0.length === 5 && mutiEx_0.every((t) => typeof t === "object" && t.uniqueId.buffer instanceof ArrayBuffer && t.uniqueId.BYTES_PER_ELEMENT === 1 && t.uniqueId.length === 32 && typeof t.coinIndex === "bigint" && t.coinIndex >= 0n && t.coinIndex <= 340282366920938463463374607431768211455n))) {
          __compactRuntime__namespace.typeError(
            "executeMultiCrossProposal",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 369 char 1",
            "Vector<5, struct ExecuteCrossProposalInfo<uniqueId: Bytes<32>, coinIndex: Uint<0..340282366920938463463374607431768211456>>>",
            mutiEx_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_18.toValue(mutiEx_0),
            alignment: _descriptor_18.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._executeMultiCrossProposal_0(
          context,
          partialProofData,
          mutiEx_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      userRechargeForFee: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`userRechargeForFee: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const amount_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "userRechargeForFee",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 446 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof amount_0 === "bigint" && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "userRechargeForFee",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 446 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            amount_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_4.toValue(amount_0),
            alignment: _descriptor_4.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userRechargeForFee_0(
          context,
          partialProofData,
          amount_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      userFeeWithdrawRequest: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`userFeeWithdrawRequest: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const receiptor_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "userFeeWithdrawRequest",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 452 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof receiptor_0 === "object" && receiptor_0.bytes.buffer instanceof ArrayBuffer && receiptor_0.bytes.BYTES_PER_ELEMENT === 1 && receiptor_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "userFeeWithdrawRequest",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 452 char 1",
            "struct UserAddress<bytes: Bytes<32>>",
            receiptor_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_10.toValue(receiptor_0),
            alignment: _descriptor_10.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userFeeWithdrawRequest_0(
          context,
          partialProofData,
          receiptor_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      userClaimCoin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`userClaimCoin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const id_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "userClaimCoin",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 457 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(id_0.buffer instanceof ArrayBuffer && id_0.BYTES_PER_ELEMENT === 1 && id_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "userClaimCoin",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 457 char 1",
            "Bytes<32>",
            id_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(id_0),
            alignment: _descriptor_0.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userClaimCoin_0(context, partialProofData, id_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      userClaimMappingToken: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`userClaimMappingToken: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const id_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "userClaimMappingToken",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 465 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(id_0.buffer instanceof ArrayBuffer && id_0.BYTES_PER_ELEMENT === 1 && id_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "userClaimMappingToken",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 465 char 1",
            "Bytes<32>",
            id_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(id_0),
            alignment: _descriptor_0.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userClaimMappingToken_0(
          context,
          partialProofData,
          id_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      addTokenPair: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime__namespace.CompactError(`addTokenPair: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenPairId_0 = args_1[1];
        const pairInfo_0 = args_1[2];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "addTokenPair",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 726 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "addTokenPair",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 726 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        if (!(typeof pairInfo_0 === "object" && typeof pairInfo_0.fromChainId === "bigint" && pairInfo_0.fromChainId >= 0n && pairInfo_0.fromChainId <= 4294967295n && typeof pairInfo_0.toChainId === "bigint" && pairInfo_0.toChainId >= 0n && pairInfo_0.toChainId <= 4294967295n && pairInfo_0.midnigthTokenAccount.buffer instanceof ArrayBuffer && pairInfo_0.midnigthTokenAccount.BYTES_PER_ELEMENT === 1 && pairInfo_0.midnigthTokenAccount.length === 32 && pairInfo_0.domainSep.buffer instanceof ArrayBuffer && pairInfo_0.domainSep.BYTES_PER_ELEMENT === 1 && pairInfo_0.domainSep.length === 32 && typeof pairInfo_0.isShielded === "boolean" && typeof pairInfo_0.fee === "bigint" && pairInfo_0.fee >= 0n && pairInfo_0.fee <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "addTokenPair",
            "argument 2 (argument 3 as invoked from Typescript)",
            "crosschain.compact line 726 char 1",
            "struct TokenPairInfo<fromChainId: Uint<0..4294967296>, toChainId: Uint<0..4294967296>, midnigthTokenAccount: Bytes<32>, domainSep: Bytes<32>, isShielded: Boolean, fee: Uint<0..340282366920938463463374607431768211456>>",
            pairInfo_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(tokenPairId_0).concat(_descriptor_5.toValue(pairInfo_0)),
            alignment: _descriptor_2.alignment().concat(_descriptor_5.alignment())
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addTokenPair_0(
          context,
          partialProofData,
          tokenPairId_0,
          pairInfo_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      smgMint: this.circuits.smgMint,
      userBurn: this.circuits.userBurn,
      voteMultiCrossProposal: this.circuits.voteMultiCrossProposal,
      voteCrossProposal: this.circuits.voteCrossProposal,
      executeMultiCrossProposal: this.circuits.executeMultiCrossProposal,
      userRechargeForFee: this.circuits.userRechargeForFee,
      userFeeWithdrawRequest: this.circuits.userFeeWithdrawRequest,
      userClaimCoin: this.circuits.userClaimCoin,
      userClaimMappingToken: this.circuits.userClaimMappingToken,
      addTokenPair: this.circuits.addTokenPair
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 3) {
      throw new __compactRuntime__namespace.CompactError(`Contract state constructor: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const adminThresholdInit_0 = args_0[1];
    const smgPKThresholdInit_0 = args_0[2];
    if (typeof constructorContext_0 !== "object") {
      throw new __compactRuntime__namespace.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!("initialZswapLocalState" in constructorContext_0)) {
      throw new __compactRuntime__namespace.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof constructorContext_0.initialZswapLocalState !== "object") {
      throw new __compactRuntime__namespace.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(typeof adminThresholdInit_0 === "bigint" && adminThresholdInit_0 >= 0n && adminThresholdInit_0 <= 255n)) {
      __compactRuntime__namespace.typeError(
        "Contract state constructor",
        "argument 1 (argument 2 as invoked from Typescript)",
        "crosschain.compact line 177 char 1",
        "Uint<0..256>",
        adminThresholdInit_0
      );
    }
    if (!(typeof smgPKThresholdInit_0 === "bigint" && smgPKThresholdInit_0 >= 0n && smgPKThresholdInit_0 <= 255n)) {
      __compactRuntime__namespace.typeError(
        "Contract state constructor",
        "argument 2 (argument 3 as invoked from Typescript)",
        "crosschain.compact line 177 char 1",
        "Uint<0..256>",
        smgPKThresholdInit_0
      );
    }
    const state_0 = new __compactRuntime__namespace.ContractState();
    let stateValue_0 = __compactRuntime__namespace.StateValue.newArray();
    let stateValue_3 = __compactRuntime__namespace.StateValue.newArray();
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_3);
    let stateValue_2 = __compactRuntime__namespace.StateValue.newArray();
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_2);
    let stateValue_1 = __compactRuntime__namespace.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_1);
    state_0.data = new __compactRuntime__namespace.ChargedState(stateValue_0);
    state_0.setOperation("smgMint", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("userBurn", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("voteMultiCrossProposal", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("voteCrossProposal", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("executeMultiCrossProposal", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("userRechargeForFee", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("userFeeWithdrawRequest", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("userClaimCoin", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("userClaimMappingToken", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("addTokenPair", new __compactRuntime__namespace.ContractOperation());
    const context = __compactRuntime__namespace.createCircuitContext(__compactRuntime__namespace.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: void 0,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(0n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(0n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_9.toValue(0n),
            alignment: _descriptor_9.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(0n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(1n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(new Uint8Array(32)),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(0n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(1n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_22.toValue({ smgId: new Uint8Array(32), fromAddr: { bytes: new Uint8Array(32) }, toAddr: "", tokenPairId: 0n, tokenAccount: new Uint8Array(32), amount: 0n, fee: 0n, nonce: 0n }),
            alignment: _descriptor_22.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(2n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(3n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(4n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_9.toValue(0n),
            alignment: _descriptor_9.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(5n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(6n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(7n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(8n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_6.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_6.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(9n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(10n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_6.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_6.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(11n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_10.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_10.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(12n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(0n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(13n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(14n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(0n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(0n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_9.toValue(0n),
            alignment: _descriptor_9.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(1n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(2n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_2.toValue(0n),
            alignment: _descriptor_2.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(3n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(4n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(5n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(6n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(7n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(8n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(9n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(10n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(11n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(12n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_6.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_6.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(13n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_6.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_6.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(14n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_6.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_6.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(12n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_6.toValue(tmp_0),
            alignment: _descriptor_6.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_1 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(14n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_6.toValue(tmp_1),
            alignment: _descriptor_6.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_2 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(8n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_6.toValue(tmp_2),
            alignment: _descriptor_6.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_3 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(10n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_6.toValue(tmp_3),
            alignment: _descriptor_6.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(14n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(adminThresholdInit_0),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(12n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(smgPKThresholdInit_0),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_4 = 1n;
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(0n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { addi: { immediate: parseInt(__compactRuntime__namespace.valueToBigInt(
          {
            value: _descriptor_19.toValue(tmp_4),
            alignment: _descriptor_19.alignment()
          }.value
        )) } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    state_0.data = new __compactRuntime__namespace.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    };
  }
  _some_0(value_0) {
    return { is_some: true, value: value_0 };
  }
  _none_0() {
    return {
      is_some: false,
      value: { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n }
    };
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: new Uint8Array(32) };
  }
  _left_1(value_0) {
    return { is_left: true, left: value_0, right: { bytes: new Uint8Array(32) } };
  }
  _right_0(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime__namespace.transientHash(_descriptor_32, value_0);
    return result_0;
  }
  _transientHash_1(value_0) {
    const result_0 = __compactRuntime__namespace.transientHash(_descriptor_33, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime__namespace.persistentHash(_descriptor_30, value_0);
    return result_0;
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = __compactRuntime__namespace.persistentCommit(
      _descriptor_31,
      value_0,
      rand_0
    );
    return result_0;
  }
  _degradeToTransient_0(x_0) {
    const result_0 = __compactRuntime__namespace.degradeToTransient(x_0);
    return result_0;
  }
  _upgradeFromTransient_0(x_0) {
    const result_0 = __compactRuntime__namespace.upgradeFromTransient(x_0);
    return result_0;
  }
  _nativeToken_0() {
    return new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime__namespace.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_6.toValue(result_0),
      alignment: _descriptor_6.alignment()
    });
    return result_0;
  }
  _createZswapInput_0(context, partialProofData, coin_0) {
    const result_0 = __compactRuntime__namespace.createZswapInput(context, coin_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _createZswapOutput_0(context, partialProofData, coin_0, recipient_0) {
    const result_0 = __compactRuntime__namespace.createZswapOutput(
      context,
      coin_0,
      recipient_0
    );
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _tokenType_0(domain_sep_0, contractAddress_0) {
    return this._persistentCommit_0(
      [domain_sep_0, contractAddress_0.bytes],
      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 100, 101, 114, 105, 118, 101, 95, 116, 111, 107, 101, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    );
  }
  _mintShieldedToken_0(context, partialProofData, domain_sep_0, value_0, nonce_0, recipient_0) {
    const coin_0 = {
      nonce: nonce_0,
      color: this._tokenType_0(
        domain_sep_0,
        _descriptor_1.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 2 } },
            { idx: {
              cached: true,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(0n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value)
      ),
      value: value_0
    };
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { swap: { n: 0 } },
        { idx: {
          cached: true,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(4n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(domain_sep_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_9.toValue(value_0),
            alignment: _descriptor_9.alignment()
          }).encode()
        } },
        { swap: { n: 0 } },
        "neg",
        { branch: { skip: 4 } },
        { dup: { n: 2 } },
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [{ tag: "stack" }]
        } },
        "add",
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const cm_0 = this._coinCommitment_0(coin_0, recipient_0);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { swap: { n: 0 } },
        { idx: {
          cached: true,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(cm_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newNull().encode()
        } },
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    return coin_0;
  }
  _evolveNonce_0(index_0, nonce_0) {
    return this._upgradeFromTransient_0(this._transientHash_1([
      __compactRuntime__namespace.convertBytesToField(
        28,
        new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
        "<standard library>"
      ),
      index_0,
      this._degradeToTransient_0(nonce_0)
    ]));
  }
  _shieldedBurnAddress_0() {
    return this._left_1({ bytes: new Uint8Array(32) });
  }
  _receiveShielded_0(context, partialProofData, coin_0) {
    const recipient_0 = this._right_0(_descriptor_1.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(0n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value));
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const tmp_0 = this._coinCommitment_0(coin_0, recipient_0);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { swap: { n: 0 } },
        { idx: {
          cached: true,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(tmp_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newNull().encode()
        } },
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    return [];
  }
  _sendShielded_0(context, partialProofData, input_0, recipient_0, value_0) {
    const selfAddr_0 = _descriptor_1.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(0n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value);
    this._createZswapInput_0(context, partialProofData, input_0);
    const tmp_0 = this._coinNullifier_0(
      this._downcastQualifiedCoin_0(input_0),
      selfAddr_0
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { swap: { n: 0 } },
        { idx: {
          cached: true,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(0n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(tmp_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newNull().encode()
        } },
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    let t_0;
    const change_0 = (t_0 = input_0.value, __compactRuntime__namespace.assert(
      t_0 >= value_0,
      "result of subtraction would be negative"
    ), t_0 - value_0);
    const output_0 = {
      nonce: this._upgradeFromTransient_0(this._transientHash_0([
        __compactRuntime__namespace.convertBytesToField(
          28,
          new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
          "<standard library>"
        ),
        this._degradeToTransient_0(input_0.nonce)
      ])),
      color: input_0.color,
      value: value_0
    };
    this._createZswapOutput_0(context, partialProofData, output_0, recipient_0);
    const tmp_1 = this._coinCommitment_0(output_0, recipient_0);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { swap: { n: 0 } },
        { idx: {
          cached: true,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(tmp_1),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newNull().encode()
        } },
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    if (this._equal_0(change_0, 0n)) {
      return { change: this._none_0(), sent: output_0 };
    } else {
      const changeCoin_0 = {
        nonce: this._upgradeFromTransient_0(this._transientHash_0([
          __compactRuntime__namespace.convertBytesToField(
            30,
            new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101, 47, 50]),
            "<standard library>"
          ),
          this._degradeToTransient_0(input_0.nonce)
        ])),
        color: input_0.color,
        value: change_0
      };
      this._createZswapOutput_0(
        context,
        partialProofData,
        changeCoin_0,
        this._right_0(selfAddr_0)
      );
      const cm_0 = this._coinCommitment_0(
        changeCoin_0,
        this._right_0(selfAddr_0)
      );
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { swap: { n: 0 } },
          { idx: {
            cached: true,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(cm_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newNull().encode()
          } },
          { ins: { cached: true, n: 2 } },
          { swap: { n: 0 } }
        ]
      );
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { swap: { n: 0 } },
          { idx: {
            cached: true,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(cm_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newNull().encode()
          } },
          { ins: { cached: true, n: 2 } },
          { swap: { n: 0 } }
        ]
      );
      return { change: this._some_0(changeCoin_0), sent: output_0 };
    }
  }
  _sendImmediateShielded_0(context, partialProofData, input_0, target_0, value_0) {
    return this._sendShielded_0(
      context,
      partialProofData,
      this._upcastQualifiedCoin_0(input_0),
      target_0,
      value_0
    );
  }
  _downcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce, color: coin_0.color, value: coin_0.value };
  }
  _upcastQualifiedCoin_0(coin_0) {
    return {
      nonce: coin_0.nonce,
      color: coin_0.color,
      value: coin_0.value,
      mt_index: 0n
    };
  }
  _coinCommitment_0(coin_0, recipient_0) {
    return this._persistentHash_0({
      domain_sep: new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 99, 91, 118, 49, 93]),
      info: coin_0,
      dataType: recipient_0.is_left,
      data: recipient_0.is_left ? recipient_0.left.bytes : recipient_0.right.bytes
    });
  }
  _coinNullifier_0(coin_0, addr_0) {
    return this._persistentHash_0({
      domain_sep: new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 122, 115, 119, 97, 112, 45, 99, 110, 91, 118, 49, 93]),
      info: coin_0,
      dataType: false,
      data: addr_0.bytes
    });
  }
  _blockTimeLt_0(context, partialProofData, time_0) {
    return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_9.toValue(time_0),
            alignment: _descriptor_9.alignment()
          }).encode()
        } },
        "lt",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value);
  }
  _blockTimeGte_0(context, partialProofData, time_0) {
    return !this._blockTimeLt_0(context, partialProofData, time_0);
  }
  _receiveUnshielded_0(context, partialProofData, color_0, amount_0) {
    const tmp_0 = this._left_0(color_0);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { swap: { n: 0 } },
        { idx: {
          cached: true,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(6n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_24.toValue(tmp_0),
            alignment: _descriptor_24.alignment()
          }).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_4.toValue(amount_0),
            alignment: _descriptor_4.alignment()
          }).encode()
        } },
        { swap: { n: 0 } },
        "neg",
        { branch: { skip: 4 } },
        { dup: { n: 2 } },
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [{ tag: "stack" }]
        } },
        "add",
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    return [];
  }
  _userLock_0(smgId_0, toAddr_0, tokenPairId_0, coin_0) {
    return [];
  }
  _smgRelease_0(uniqueId_0, smgId_0, tokenPairId_0, amount_0, toAddr_0, fee_0, ttl_0) {
    return [];
  }
  _smgMint_0(context, partialProofData, uniqueId_0, smgId_0, tokenPairId_0, amount_0, fee_0, toAddr_0, ttl_0) {
    this._addCrossProposal_0(
      context,
      partialProofData,
      uniqueId_0,
      smgId_0,
      tokenPairId_0,
      amount_0,
      toAddr_0,
      fee_0,
      ttl_0,
      true,
      true
    );
    return [];
  }
  _userBurn_0(context, partialProofData, smgId_0, toAddr_0, tokenPairId_0, coin_0) {
    __compactRuntime__namespace.assert(
      _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(7n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_2.toValue(tokenPairId_0),
              alignment: _descriptor_2.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "tokenpairId not exists"
    );
    const tokenPair_0 = _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(7n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_2.toValue(tokenPairId_0),
                alignment: _descriptor_2.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    __compactRuntime__namespace.assert(
      this._equal_1(
        tokenPair_0.midnigthTokenAccount,
        coin_0.color
      ),
      "token color not match"
    );
    const contractFee_0 = this._getFee_0(
      context,
      partialProofData,
      tokenPairId_0
    );
    this._receiveShielded_0(context, partialProofData, coin_0);
    this._sendImmediateShielded_0(
      context,
      partialProofData,
      coin_0,
      this._shieldedBurnAddress_0(),
      coin_0.value
    );
    const tmp_0 = {
      smgId: smgId_0,
      fromAddr: this._ownPublicKey_0(context, partialProofData),
      toAddr: toAddr_0,
      tokenPairId: tokenPairId_0,
      tokenAccount: tokenPair_0.midnigthTokenAccount,
      amount: coin_0.value,
      fee: contractFee_0,
      nonce: ((t1) => {
        if (t1 > 340282366920938463463374607431768211455n) {
          throw new __compactRuntime__namespace.CompactError("crosschain.compact line 270 char 14: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
        }
        return t1;
      })(_descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value))
    };
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(1n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_22.toValue(tmp_0),
            alignment: _descriptor_22.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    if (contractFee_0 > 0n) {
      this._updateUserFee_0(
        context,
        partialProofData,
        this._ownPublicKey_0(context, partialProofData),
        contractFee_0,
        false
      );
      this._updateUnshieldedReserve_0(
        context,
        partialProofData,
        false,
        this._nativeToken_0(),
        contractFee_0,
        true
      );
    }
    this._updateTokenTotalSupply_0(
      context,
      partialProofData,
      tokenPair_0.midnigthTokenAccount,
      coin_0.value,
      false
    );
    return [];
  }
  _addCrossProposal_0(context, partialProofData, uniqueId_0, smgId_0, tokenPairId_0, amount_0, toAddr_0, fee_0, ttl_0, isMappingToken_0, isShielded_0) {
    __compactRuntime__namespace.assert(
      _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(6n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(uniqueId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value) === false,
      "crossTx has finished"
    );
    let tmp_0;
    __compactRuntime__namespace.assert(
      (tmp_0 = this._ownPublicKey_0(
        context,
        partialProofData
      ), _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_6.toValue(tmp_0),
              alignment: _descriptor_6.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)),
      "not smg member"
    );
    if (_descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(4n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value)) {
      if (this._blockTimeLt_0(
        context,
        partialProofData,
        _descriptor_14.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(4n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(uniqueId_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value).ttl
      )) {
        __compactRuntime__namespace.assert(false, "proposal exists");
      } else {
        __compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { idx: {
              cached: false,
              pushPath: true,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(4n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(uniqueId_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            { rem: { cached: false } },
            { ins: { cached: true, n: 2 } }
          ]
        );
        __compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { idx: {
              cached: false,
              pushPath: true,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(5n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(uniqueId_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            { rem: { cached: false } },
            { ins: { cached: true, n: 2 } }
          ]
        );
      }
    }
    __compactRuntime__namespace.assert(
      this._blockTimeLt_0(context, partialProofData, ttl_0),
      "ttl expired"
    );
    __compactRuntime__namespace.assert(
      _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(7n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_2.toValue(tokenPairId_0),
              alignment: _descriptor_2.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "tokenpairId not exists"
    );
    const tokenPair_0 = _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(7n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_2.toValue(tokenPairId_0),
                alignment: _descriptor_2.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    const newCrossProposal_0 = {
      smgId: smgId_0,
      token: isMappingToken_0 ? tokenPair_0.domainSep : tokenPair_0.midnigthTokenAccount,
      tokenPairId: tokenPairId_0,
      isMappingToken: isMappingToken_0,
      isShielded: isShielded_0,
      amount: amount_0,
      fee: fee_0,
      toAddr: toAddr_0,
      ttl: ttl_0
    };
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(4n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_14.toValue(newCrossProposal_0),
            alignment: _descriptor_14.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(5n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    this._voteCrossProposal_0(
      context,
      partialProofData,
      { uniqueId: uniqueId_0, ttl: ttl_0 }
    );
    const tmp_1 = 1n;
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(0n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(0n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { addi: { immediate: parseInt(__compactRuntime__namespace.valueToBigInt(
          {
            value: _descriptor_19.toValue(tmp_1),
            alignment: _descriptor_19.alignment()
          }.value
        )) } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _voteMultiCrossProposal_0(context, partialProofData, uniqueIds_0) {
    this._folder_0(
      context,
      partialProofData,
      ((context2, partialProofData2, t_0, target_0) => {
        if (!this._equal_2(target_0.uniqueId, new Uint8Array(32))) {
          this._voteCrossProposal_0(
            context2,
            partialProofData2,
            target_0
          );
        }
        return t_0;
      }),
      [],
      uniqueIds_0
    );
    return [];
  }
  _voteCrossProposal_0(context, partialProofData, target_0) {
    let tmp_0;
    __compactRuntime__namespace.assert(
      (tmp_0 = this._ownPublicKey_0(
        context,
        partialProofData
      ), _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_6.toValue(tmp_0),
              alignment: _descriptor_6.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)),
      "not smg member"
    );
    let tmp_1;
    __compactRuntime__namespace.assert(
      (tmp_1 = target_0.uniqueId, _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(4n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(tmp_1),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)),
      "proposal not exists"
    );
    let tmp_2;
    const proposal_0 = (tmp_2 = target_0.uniqueId, _descriptor_14.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(4n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(tmp_2),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value));
    __compactRuntime__namespace.assert(
      this._equal_3(proposal_0.ttl, target_0.ttl),
      "ttl not match"
    );
    let tmp_3;
    if ((tmp_3 = target_0.uniqueId, _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(5n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(tmp_3),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        "size",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value)) >= _descriptor_13.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(12n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value)) {
      return [];
    } else {
      if (this._blockTimeGte_0(context, partialProofData, proposal_0.ttl)) {
        const tmp_4 = target_0.uniqueId;
        __compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { idx: {
              cached: false,
              pushPath: true,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(4n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(tmp_4),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            { rem: { cached: false } },
            { ins: { cached: true, n: 2 } }
          ]
        );
        const tmp_5 = target_0.uniqueId;
        __compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { idx: {
              cached: false,
              pushPath: true,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(5n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(tmp_5),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            { rem: { cached: false } },
            { ins: { cached: true, n: 2 } }
          ]
        );
        return [];
      } else {
        let tmp_6;
        const voterIndex_0 = (tmp_6 = this._ownPublicKey_0(
          context,
          partialProofData
        ), _descriptor_13.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(0n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_6.toValue(tmp_6),
                    alignment: _descriptor_6.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value));
        let tmp_7;
        __compactRuntime__namespace.assert(
          !(tmp_7 = target_0.uniqueId, _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
            context,
            partialProofData,
            [
              { dup: { n: 0 } },
              { idx: {
                cached: false,
                pushPath: false,
                path: [
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_13.toValue(2n),
                      alignment: _descriptor_13.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_13.toValue(5n),
                      alignment: _descriptor_13.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_0.toValue(tmp_7),
                      alignment: _descriptor_0.alignment()
                    }
                  }
                ]
              } },
              { push: {
                storage: false,
                value: __compactRuntime__namespace.StateValue.newCell({
                  value: _descriptor_13.toValue(voterIndex_0),
                  alignment: _descriptor_13.alignment()
                }).encode()
              } },
              "member",
              { popeq: {
                cached: true,
                result: void 0
              } }
            ]
          ).value)),
          "already voted"
        );
        const tmp_8 = target_0.uniqueId;
        __compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { idx: {
              cached: false,
              pushPath: true,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(5n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(tmp_8),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_13.toValue(voterIndex_0),
                alignment: _descriptor_13.alignment()
              }).encode()
            } },
            { push: {
              storage: true,
              value: __compactRuntime__namespace.StateValue.newNull().encode()
            } },
            { ins: { cached: false, n: 1 } },
            { ins: { cached: true, n: 3 } }
          ]
        );
        let tmp_9;
        if ((tmp_9 = target_0.uniqueId, _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(5n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(tmp_9),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value)) >= _descriptor_13.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(12n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value) && proposal_0.fee > 0n) {
          if (proposal_0.isShielded) {
            this._updateShieldedReserve_0(
              context,
              partialProofData,
              proposal_0.isMappingToken,
              proposal_0.token,
              proposal_0.fee,
              true
            );
          } else {
            this._updateUnshieldedReserve_0(
              context,
              partialProofData,
              proposal_0.isMappingToken,
              proposal_0.token,
              proposal_0.fee,
              true
            );
          }
        }
        return [];
      }
    }
  }
  _executeMultiCrossProposal_0(context, partialProofData, mutiEx_0) {
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(2n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    this._folder_1(
      context,
      partialProofData,
      ((context2, partialProofData2, t_0, exCp_0) => {
        if (!this._equal_4(exCp_0.uniqueId, new Uint8Array(32))) {
          this._executeCrossProposal_0(
            context2,
            partialProofData2,
            exCp_0.uniqueId,
            exCp_0.coinIndex
          );
        }
        return t_0;
      }),
      [],
      mutiEx_0
    );
    return [];
  }
  _updateTokenTotalSupply_0(context, partialProofData, token_0, delta_0, isAdd_0) {
    __compactRuntime__namespace.assert(delta_0 > 0n, "delta must be positive");
    const oldTotalSupply_0 = _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(11n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(token_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value) ? _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(11n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(token_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value) : 0n;
    __compactRuntime__namespace.assert(
      isAdd_0 || oldTotalSupply_0 >= delta_0,
      "delta must be less than or equal to oldTotalSupply"
    );
    const newTotalSupply_0 = isAdd_0 ? oldTotalSupply_0 + delta_0 : (__compactRuntime__namespace.assert(
      oldTotalSupply_0 >= delta_0,
      "result of subtraction would be negative"
    ), oldTotalSupply_0 - delta_0);
    if (this._equal_5(newTotalSupply_0, 0n)) {
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(11n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    } else {
      const tmp_0 = ((t1) => {
        if (t1 > 340282366920938463463374607431768211455n) {
          throw new __compactRuntime__namespace.CompactError("crosschain.compact line 388 char 52: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
        }
        return t1;
      })(newTotalSupply_0);
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(11n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_4.toValue(tmp_0),
              alignment: _descriptor_4.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    return [];
  }
  _executeCrossProposal_0(context, partialProofData, uniqueId_0, coinIndex_0) {
    __compactRuntime__namespace.assert(
      this._equal_6(
        _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(14n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value),
        this._ownPublicKey_0(
          context,
          partialProofData
        )
      ),
      "only mergeWorker can executeCrossProposal "
    );
    __compactRuntime__namespace.assert(
      _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(4n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(uniqueId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "crossproposal not exists"
    );
    __compactRuntime__namespace.assert(
      _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(5n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_0.toValue(uniqueId_0),
                  alignment: _descriptor_0.alignment()
                }
              }
            ]
          } },
          "size",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value) >= _descriptor_13.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(12n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value),
      "not enough votes"
    );
    const proposal_0 = _descriptor_14.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(4n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(uniqueId_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    if (proposal_0.isMappingToken === false) {
      __compactRuntime__namespace.assert(
        _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(3n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_4.toValue(coinIndex_0),
                alignment: _descriptor_4.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value),
        "coin not exists"
      );
      const coinInput_0 = _descriptor_11.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(3n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_4.toValue(coinIndex_0),
                  alignment: _descriptor_4.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
      __compactRuntime__namespace.assert(
        this._equal_7(coinInput_0.value, proposal_0.amount),
        "coin value not match"
      );
      const tmp_0 = { receiver: proposal_0.toAddr, coin: coinInput_0 };
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(9n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(uniqueId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_12.toValue(tmp_0),
              alignment: _descriptor_12.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(3n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_4.toValue(coinIndex_0),
              alignment: _descriptor_4.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    } else {
      const tmp_1 = {
        receiver: proposal_0.toAddr,
        domainSep: proposal_0.token,
        amount: proposal_0.amount
      };
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(10n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(uniqueId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_8.toValue(tmp_1),
              alignment: _descriptor_8.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
      let tmp_2;
      const tokenPair_0 = (tmp_2 = proposal_0.tokenPairId, _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(7n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_2.toValue(tmp_2),
                  alignment: _descriptor_2.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value));
      this._updateTokenTotalSupply_0(
        context,
        partialProofData,
        tokenPair_0.midnigthTokenAccount,
        proposal_0.amount,
        true
      );
    }
    const tmp_3 = { uniqueId: uniqueId_0, crossProposal: proposal_0 };
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_15.toValue(tmp_3),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newNull().encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    const tmp_4 = proposal_0.ttl;
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(6n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_9.toValue(tmp_4),
            alignment: _descriptor_9.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(4n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(5n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _getFee_0(context, partialProofData, tokenPairId_0) {
    const tokenPair_0 = _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(7n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_2.toValue(tokenPairId_0),
                alignment: _descriptor_2.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    if (this._equal_8(tokenPair_0.fee, 0n)) {
      let tmp_0;
      if (tmp_0 = tokenPair_0.toChainId, _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(9n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_2.toValue(tmp_0),
              alignment: _descriptor_2.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)) {
        const tmp_1 = tokenPair_0.toChainId;
        return _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(9n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_2.toValue(tmp_1),
                    alignment: _descriptor_2.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      } else {
        return 0n;
      }
    } else {
      return tokenPair_0.fee;
    }
  }
  _userRechargeForFee_0(context, partialProofData, amount_0) {
    this._receiveUnshielded_0(
      context,
      partialProofData,
      this._nativeToken_0(),
      amount_0
    );
    this._updateUserFee_0(
      context,
      partialProofData,
      this._ownPublicKey_0(context, partialProofData),
      amount_0,
      true
    );
    return [];
  }
  _userFeeWithdrawRequest_0(context, partialProofData, receiptor_0) {
    const tmp_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(8n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_6.toValue(tmp_0),
            alignment: _descriptor_6.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_10.toValue(receiptor_0),
            alignment: _descriptor_10.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _userClaimCoin_0(context, partialProofData, id_0) {
    __compactRuntime__namespace.assert(
      _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(9n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(id_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "coin not exists"
    );
    const claimCoinInfo_0 = _descriptor_12.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(9n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(id_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    __compactRuntime__namespace.assert(
      this._equal_9(
        claimCoinInfo_0.receiver,
        this._ownPublicKey_0(
          context,
          partialProofData
        )
      ),
      "not receiver"
    );
    this._sendShielded_0(
      context,
      partialProofData,
      claimCoinInfo_0.coin,
      this._left_1(claimCoinInfo_0.receiver),
      claimCoinInfo_0.coin.value
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(9n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(id_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _userClaimMappingToken_0(context, partialProofData, id_0) {
    __compactRuntime__namespace.assert(
      _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(10n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(id_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "mapping token not exists"
    );
    const claimMappingTokenInfo_0 = _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(10n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(id_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    __compactRuntime__namespace.assert(
      this._equal_10(
        claimMappingTokenInfo_0.receiver,
        this._ownPublicKey_0(
          context,
          partialProofData
        )
      ),
      "not receiver"
    );
    const tmp_0 = this._evolveNonce_0(
      ((t1) => {
        if (t1 > 18446744073709551615n) {
          throw new __compactRuntime__namespace.CompactError("crosschain.compact line 469 char 23: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 18446744073709551615");
        }
        return t1;
      })(_descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)),
      _descriptor_0.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value)
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(0n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_13.toValue(1n),
            alignment: _descriptor_13.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(tmp_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    this._mintShieldedToken_0(
      context,
      partialProofData,
      claimMappingTokenInfo_0.domainSep,
      ((t1) => {
        if (t1 > 18446744073709551615n) {
          throw new __compactRuntime__namespace.CompactError("crosschain.compact line 470 char 53: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 18446744073709551615");
        }
        return t1;
      })(claimMappingTokenInfo_0.amount),
      _descriptor_0.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value),
      this._left_1(claimMappingTokenInfo_0.receiver)
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(10n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(id_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _updateUserFee_0(context, partialProofData, user_0, delta_0, isAdd_0) {
    __compactRuntime__namespace.assert(delta_0 > 0n, "delta must be positive");
    let tmp_0, tmp_1;
    const oldBalance_0 = (tmp_0 = this._ownPublicKey_0(context, partialProofData), _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(7n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_6.toValue(tmp_0),
            alignment: _descriptor_6.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value)) ? (tmp_1 = this._ownPublicKey_0(context, partialProofData), _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(2n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(7n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_6.toValue(tmp_1),
                alignment: _descriptor_6.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value)) : 0n;
    __compactRuntime__namespace.assert(
      isAdd_0 || oldBalance_0 >= delta_0,
      "userFeeBalance not enough"
    );
    const newBalance_0 = isAdd_0 ? oldBalance_0 + delta_0 : (__compactRuntime__namespace.assert(
      oldBalance_0 >= delta_0,
      "result of subtraction would be negative"
    ), oldBalance_0 - delta_0);
    if (this._equal_11(newBalance_0, 0n)) {
      const tmp_2 = this._ownPublicKey_0(context, partialProofData);
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(7n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_6.toValue(tmp_2),
              alignment: _descriptor_6.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    } else {
      const tmp_3 = this._ownPublicKey_0(context, partialProofData);
      const tmp_4 = ((t1) => {
        if (t1 > 340282366920938463463374607431768211455n) {
          throw new __compactRuntime__namespace.CompactError("crosschain.compact line 483 char 43: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
        }
        return t1;
      })(newBalance_0);
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(7n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_6.toValue(tmp_3),
              alignment: _descriptor_6.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_4.toValue(tmp_4),
              alignment: _descriptor_4.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    return [];
  }
  _updateShieldedReserve_0(context, partialProofData, isMappingToken_0, token_0, delta_0, isAdd_0) {
    __compactRuntime__namespace.assert(delta_0 > 0n, "delta must be positive");
    const oldAmount_0 = _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(5n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(token_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value) ? _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(5n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(token_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value).total : 0n;
    __compactRuntime__namespace.assert(
      isAdd_0 || oldAmount_0 >= delta_0,
      "delta must be less than or equal to oldAmount"
    );
    const newAmount_0 = isAdd_0 ? oldAmount_0 + delta_0 : (__compactRuntime__namespace.assert(
      oldAmount_0 >= delta_0,
      "result of subtraction would be negative"
    ), oldAmount_0 - delta_0);
    if (this._equal_12(newAmount_0, 0n)) {
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(5n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    } else {
      const tmp_0 = {
        total: ((t1) => {
          if (t1 > 340282366920938463463374607431768211455n) {
            throw new __compactRuntime__namespace.CompactError("crosschain.compact line 507 char 76: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
          }
          return t1;
        })(newAmount_0),
        isMappingToken: isMappingToken_0
      };
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(5n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_7.toValue(tmp_0),
              alignment: _descriptor_7.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    return [];
  }
  _updateUnshieldedReserve_0(context, partialProofData, isMappingToken_0, token_0, delta_0, isAdd_0) {
    __compactRuntime__namespace.assert(delta_0 > 0n, "delta must be positive");
    const oldAmount_0 = _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(6n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(token_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value) ? _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(6n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(token_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value).total : 0n;
    __compactRuntime__namespace.assert(
      isAdd_0 || oldAmount_0 >= delta_0,
      "delta must be less than or equal to oldAmount"
    );
    const newAmount_0 = isAdd_0 ? oldAmount_0 + delta_0 : (__compactRuntime__namespace.assert(
      oldAmount_0 >= delta_0,
      "result of subtraction would be negative"
    ), oldAmount_0 - delta_0);
    if (this._equal_13(newAmount_0, 0n)) {
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(6n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    } else {
      const tmp_0 = {
        total: ((t1) => {
          if (t1 > 340282366920938463463374607431768211455n) {
            throw new __compactRuntime__namespace.CompactError("crosschain.compact line 521 char 78: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
          }
          return t1;
        })(newAmount_0),
        isMappingToken: isMappingToken_0
      };
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(6n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_7.toValue(tmp_0),
              alignment: _descriptor_7.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    return [];
  }
  _addTokenPair_0(context, partialProofData, tokenPairId_0, pairInfo_0) {
    __compactRuntime__namespace.assert(
      this._equal_14(
        _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(8n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value),
        this._ownPublicKey_0(
          context,
          partialProofData
        )
      ),
      "not authorized"
    );
    __compactRuntime__namespace.assert(
      !_descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(7n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_2.toValue(tokenPairId_0),
              alignment: _descriptor_2.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "token pair already exists"
    );
    if (!this._equal_15(pairInfo_0.domainSep, new Uint8Array(32))) {
      const expectColor_0 = this._tokenType_0(
        pairInfo_0.domainSep,
        _descriptor_1.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 2 } },
            { idx: {
              cached: true,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(0n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value)
      );
      __compactRuntime__namespace.assert(
        this._equal_16(
          pairInfo_0.midnigthTokenAccount,
          expectColor_0
        ),
        "midnigthTokenAccount is not valid"
      );
    }
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(1n),
                alignment: _descriptor_13.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_13.toValue(7n),
                alignment: _descriptor_13.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_2.toValue(tokenPairId_0),
            alignment: _descriptor_2.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_5.toValue(pairInfo_0),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _equal_0(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _folder_0(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 5; i++) {
      x = f(context, partialProofData, x, a0[i]);
    }
    return x;
  }
  _equal_3(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _folder_1(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 5; i++) {
      x = f(context, partialProofData, x, a0[i]);
    }
    return x;
  }
  _equal_5(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_6(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_7(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_8(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_9(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_10(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_11(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_12(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_13(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_14(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_15(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_16(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
};
function ledger2(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime__namespace.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime__namespace.StateValue ? new __compactRuntime__namespace.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime__namespace.QueryContext(chargedState, __compactRuntime__namespace.dummyContractAddress()),
    costModel: __compactRuntime__namespace.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: void 0,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get crossCounter() {
      return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value);
    },
    get nonce() {
      return _descriptor_0.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    smgTxSigners: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(0n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(0n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 30 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(0n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_6.toValue(key_0),
                alignment: _descriptor_6.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 30 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_13.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(0n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_6.toValue(key_0),
                    alignment: _descriptor_6.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[0];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_6.fromValue(key.value), _descriptor_13.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get latestOutBoundCrosstxInfo() {
      return _descriptor_22.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    currentExecuteCrossProposal: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(typeof elem_0 === "object" && elem_0.uniqueId.buffer instanceof ArrayBuffer && elem_0.uniqueId.BYTES_PER_ELEMENT === 1 && elem_0.uniqueId.length === 32 && typeof elem_0.crossProposal === "object" && elem_0.crossProposal.smgId.buffer instanceof ArrayBuffer && elem_0.crossProposal.smgId.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.smgId.length === 32 && elem_0.crossProposal.token.buffer instanceof ArrayBuffer && elem_0.crossProposal.token.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.token.length === 32 && typeof elem_0.crossProposal.tokenPairId === "bigint" && elem_0.crossProposal.tokenPairId >= 0n && elem_0.crossProposal.tokenPairId <= 4294967295n && typeof elem_0.crossProposal.isMappingToken === "boolean" && typeof elem_0.crossProposal.isShielded === "boolean" && typeof elem_0.crossProposal.amount === "bigint" && elem_0.crossProposal.amount >= 0n && elem_0.crossProposal.amount <= 340282366920938463463374607431768211455n && typeof elem_0.crossProposal.fee === "bigint" && elem_0.crossProposal.fee >= 0n && elem_0.crossProposal.fee <= 340282366920938463463374607431768211455n && typeof elem_0.crossProposal.toAddr === "object" && elem_0.crossProposal.toAddr.bytes.buffer instanceof ArrayBuffer && elem_0.crossProposal.toAddr.bytes.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.toAddr.bytes.length === 32 && typeof elem_0.crossProposal.ttl === "bigint" && elem_0.crossProposal.ttl >= 0n && elem_0.crossProposal.ttl <= 18446744073709551615n)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 33 char 1",
            "struct SmgEvent<uniqueId: Bytes<32>, crossProposal: struct CrossProposal<smgId: Bytes<32>, token: Bytes<32>, tokenPairId: Uint<0..4294967296>, isMappingToken: Boolean, isShielded: Boolean, amount: Uint<0..340282366920938463463374607431768211456>, fee: Uint<0..340282366920938463463374607431768211456>, toAddr: struct ZswapCoinPublicKey<bytes: Bytes<32>>, ttl: Uint<0..18446744073709551616>>>",
            elem_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_15.toValue(elem_0),
                alignment: _descriptor_15.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[2];
        return self_0.asMap().keys().map((elem) => _descriptor_15.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    treasuryCoins: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(3n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(3n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 36 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(3n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_4.toValue(key_0),
                alignment: _descriptor_4.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 36 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            key_0
          );
        }
        return _descriptor_11.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(3n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_4.toValue(key_0),
                    alignment: _descriptor_4.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[3];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_4.fromValue(key.value), _descriptor_11.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get treasuryCoinCounter() {
      return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(4n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value);
    },
    reserveOfAllShieldedToken: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(5n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(5n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 38 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(5n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 38 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(5n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(key_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[5];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_7.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    reserveOfAllUnshieldedToken: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(6n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(6n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 39 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(6n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 39 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(6n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(key_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[6];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_7.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    tokenPairs: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(7n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(7n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 42 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(7n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_2.toValue(key_0),
                alignment: _descriptor_2.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 42 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(7n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_2.toValue(key_0),
                    alignment: _descriptor_2.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[7];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_2.fromValue(key.value), _descriptor_5.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get tokenManager() {
      return _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(8n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    feeCommonConfig: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(9n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(9n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 46 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(9n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_2.toValue(key_0),
                alignment: _descriptor_2.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 46 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(9n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_2.toValue(key_0),
                    alignment: _descriptor_2.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[9];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_2.fromValue(key.value), _descriptor_4.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get feeShieldedReceiver() {
      return _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(10n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get feeUnshieldedReceiver() {
      return _descriptor_10.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(11n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get smgPKThreshold() {
      return _descriptor_13.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(12n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    admins: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(13n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(13n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 56 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(13n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_6.toValue(key_0),
                alignment: _descriptor_6.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 56 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(13n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_6.toValue(key_0),
                    alignment: _descriptor_6.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[13];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_6.fromValue(key.value), _descriptor_3.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get adminThreshold() {
      return _descriptor_13.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(1n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(14n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get proposalId() {
      return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(0n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value);
    },
    proposals: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 61 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_2.toValue(key_0),
                alignment: _descriptor_2.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 61 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_37.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(1n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_2.toValue(key_0),
                    alignment: _descriptor_2.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[1];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_2.fromValue(key.value), _descriptor_37.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get currentExcuteProposalId() {
      return _descriptor_2.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    proposalVoters: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(3n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(3n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 63 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(3n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_2.toValue(key_0),
                alignment: _descriptor_2.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 63 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        if (state.asArray()[2].asArray()[3].asMap().get({
          value: _descriptor_2.toValue(key_0),
          alignment: _descriptor_2.alignment()
        }) === void 0) {
          throw new __compactRuntime__namespace.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(2n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(3n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_2.toValue(key_0),
                        alignment: _descriptor_2.alignment()
                      }
                    }
                  ]
                } },
                "size",
                { push: {
                  storage: false,
                  value: __compactRuntime__namespace.StateValue.newCell({
                    value: _descriptor_9.toValue(0n),
                    alignment: _descriptor_9.alignment()
                  }).encode()
                } },
                "eq",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(2n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(3n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_2.toValue(key_0),
                        alignment: _descriptor_2.alignment()
                      }
                    }
                  ]
                } },
                "size",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const elem_0 = args_1[0];
            if (!(typeof elem_0 === "object" && elem_0.bytes.buffer instanceof ArrayBuffer && elem_0.bytes.BYTES_PER_ELEMENT === 1 && elem_0.bytes.length === 32)) {
              __compactRuntime__namespace.typeError(
                "member",
                "argument 1",
                "crosschain.compact line 63 char 45",
                "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
                elem_0
              );
            }
            return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(2n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(3n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_2.toValue(key_0),
                        alignment: _descriptor_2.alignment()
                      }
                    }
                  ]
                } },
                { push: {
                  storage: false,
                  value: __compactRuntime__namespace.StateValue.newCell({
                    value: _descriptor_6.toValue(elem_0),
                    alignment: _descriptor_6.alignment()
                  }).encode()
                } },
                "member",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[2].asArray()[3].asMap().get({
              value: _descriptor_2.toValue(key_0),
              alignment: _descriptor_2.alignment()
            });
            return self_0.asMap().keys().map((elem) => _descriptor_6.fromValue(elem.value))[Symbol.iterator]();
          }
        };
      }
    },
    crossProposal: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(4n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(4n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 66 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(4n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 66 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_14.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(4n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(key_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[4];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_14.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    crossProposalVoters: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(5n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(5n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 67 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(5n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 67 char 1",
            "Bytes<32>",
            key_0
          );
        }
        if (state.asArray()[2].asArray()[5].asMap().get({
          value: _descriptor_0.toValue(key_0),
          alignment: _descriptor_0.alignment()
        }) === void 0) {
          throw new __compactRuntime__namespace.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(2n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(5n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_0.toValue(key_0),
                        alignment: _descriptor_0.alignment()
                      }
                    }
                  ]
                } },
                "size",
                { push: {
                  storage: false,
                  value: __compactRuntime__namespace.StateValue.newCell({
                    value: _descriptor_9.toValue(0n),
                    alignment: _descriptor_9.alignment()
                  }).encode()
                } },
                "eq",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(2n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(5n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_0.toValue(key_0),
                        alignment: _descriptor_0.alignment()
                      }
                    }
                  ]
                } },
                "size",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const elem_0 = args_1[0];
            if (!(typeof elem_0 === "bigint" && elem_0 >= 0n && elem_0 <= 255n)) {
              __compactRuntime__namespace.typeError(
                "member",
                "argument 1",
                "crosschain.compact line 67 char 51",
                "Uint<0..256>",
                elem_0
              );
            }
            return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(2n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_13.toValue(5n),
                        alignment: _descriptor_13.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_0.toValue(key_0),
                        alignment: _descriptor_0.alignment()
                      }
                    }
                  ]
                } },
                { push: {
                  storage: false,
                  value: __compactRuntime__namespace.StateValue.newCell({
                    value: _descriptor_13.toValue(elem_0),
                    alignment: _descriptor_13.alignment()
                  }).encode()
                } },
                "member",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[2].asArray()[5].asMap().get({
              value: _descriptor_0.toValue(key_0),
              alignment: _descriptor_0.alignment()
            });
            return self_0.asMap().keys().map((elem) => _descriptor_13.fromValue(elem.value))[Symbol.iterator]();
          }
        };
      }
    },
    crossProposalHis: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(6n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(6n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 69 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(6n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 69 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(6n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(key_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[6];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_9.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    userFeeBalance: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(7n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(7n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 70 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(7n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_6.toValue(key_0),
                alignment: _descriptor_6.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 70 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(7n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_6.toValue(key_0),
                    alignment: _descriptor_6.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[7];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_6.fromValue(key.value), _descriptor_4.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    userFeeWithdrawAddress: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(8n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(8n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 71 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(8n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_6.toValue(key_0),
                alignment: _descriptor_6.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 71 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_10.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(8n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_6.toValue(key_0),
                    alignment: _descriptor_6.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[8];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_6.fromValue(key.value), _descriptor_10.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    coinToBeClaimed: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(9n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(9n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 72 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(9n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 72 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_12.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(9n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(key_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[9];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_12.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    mappingTokenToBeClaim: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(10n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(10n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 73 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(10n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 73 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(10n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(key_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[10];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_8.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    mappintTokenTotalSupply: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(11n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_9.toValue(0n),
                alignment: _descriptor_9.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(11n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 75 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(11n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 75 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(2n),
                    alignment: _descriptor_13.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_13.toValue(11n),
                    alignment: _descriptor_13.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(key_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[11];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_4.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get owner() {
      return _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(12n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get pendingOwner() {
      return _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(13n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get mergeWorker() {
      return _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(2n),
                  alignment: _descriptor_13.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_13.toValue(14n),
                  alignment: _descriptor_13.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    }
  };
}
({
  currentQueryContext: new __compactRuntime__namespace.QueryContext(new __compactRuntime__namespace.ContractState().data, __compactRuntime__namespace.dummyContractAddress())
});
var _dummyContract = new Contract({});
var pureCircuits = {
  userLock: (...args_0) => {
    if (args_0.length !== 4) {
      throw new __compactRuntime__namespace.CompactError(`userLock: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const smgId_0 = args_0[0];
    const toAddr_0 = args_0[1];
    const tokenPairId_0 = args_0[2];
    const coin_0 = args_0[3];
    if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
      __compactRuntime__namespace.typeError(
        "userLock",
        "argument 1",
        "crosschain.compact line 197 char 1",
        "Bytes<32>",
        smgId_0
      );
    }
    if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
      __compactRuntime__namespace.typeError(
        "userLock",
        "argument 3",
        "crosschain.compact line 197 char 1",
        "Uint<0..4294967296>",
        tokenPairId_0
      );
    }
    if (!(typeof coin_0 === "object" && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof coin_0.value === "bigint" && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
      __compactRuntime__namespace.typeError(
        "userLock",
        "argument 4",
        "crosschain.compact line 197 char 1",
        "struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>",
        coin_0
      );
    }
    return _dummyContract._userLock_0(smgId_0, toAddr_0, tokenPairId_0, coin_0);
  },
  smgRelease: (...args_0) => {
    if (args_0.length !== 7) {
      throw new __compactRuntime__namespace.CompactError(`smgRelease: expected 7 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const uniqueId_0 = args_0[0];
    const smgId_0 = args_0[1];
    const tokenPairId_0 = args_0[2];
    const amount_0 = args_0[3];
    const toAddr_0 = args_0[4];
    const fee_0 = args_0[5];
    const ttl_0 = args_0[6];
    if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32)) {
      __compactRuntime__namespace.typeError(
        "smgRelease",
        "argument 1",
        "crosschain.compact line 227 char 1",
        "Bytes<32>",
        uniqueId_0
      );
    }
    if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
      __compactRuntime__namespace.typeError(
        "smgRelease",
        "argument 2",
        "crosschain.compact line 227 char 1",
        "Bytes<32>",
        smgId_0
      );
    }
    if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
      __compactRuntime__namespace.typeError(
        "smgRelease",
        "argument 3",
        "crosschain.compact line 227 char 1",
        "Uint<0..4294967296>",
        tokenPairId_0
      );
    }
    if (!(typeof amount_0 === "bigint" && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime__namespace.typeError(
        "smgRelease",
        "argument 4",
        "crosschain.compact line 227 char 1",
        "Uint<0..340282366920938463463374607431768211456>",
        amount_0
      );
    }
    if (!(typeof toAddr_0 === "object" && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32)) {
      __compactRuntime__namespace.typeError(
        "smgRelease",
        "argument 5",
        "crosschain.compact line 227 char 1",
        "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
        toAddr_0
      );
    }
    if (!(typeof fee_0 === "bigint" && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime__namespace.typeError(
        "smgRelease",
        "argument 6",
        "crosschain.compact line 227 char 1",
        "Uint<0..340282366920938463463374607431768211456>",
        fee_0
      );
    }
    if (!(typeof ttl_0 === "bigint" && ttl_0 >= 0n && ttl_0 <= 18446744073709551615n)) {
      __compactRuntime__namespace.typeError(
        "smgRelease",
        "argument 7",
        "crosschain.compact line 227 char 1",
        "Uint<0..18446744073709551616>",
        ttl_0
      );
    }
    return _dummyContract._smgRelease_0(
      uniqueId_0,
      smgId_0,
      tokenPairId_0,
      amount_0,
      toAddr_0,
      fee_0,
      ttl_0
    );
  }
};
var CrossChainPrivateStateId = "crossChainPrivateState";
function getDirname() {
  if (typeof (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href)) === "string") {
    return (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.tagName.toUpperCase() === 'SCRIPT' && _documentCurrentScript.src || new URL('index.cjs', document.baseURI).href));
  }
  return __dirname;
}
var currentDir = path__default.default.resolve(new URL(getDirname()).pathname, "..");
console.log("currentDir===>", currentDir);
var ZKConfig = {
  privateStateStoreName: "crosschain-private-state",
  zkConfigPath: path__default.default.resolve(currentDir, "managed", "crosschain")
};
var shieldedCoinInfo = (token, value) => __compactRuntime.encodeShieldedCoinInfo(ledger.createShieldedCoinInfo(token, value));
var fromHexWithOrNoPrefix = (hex) => {
  if (hex.startsWith("0x")) {
    return midnightJsUtils.fromHex(hex.slice(2));
  }
  return midnightJsUtils.fromHex(hex);
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
var crosschainContractInstance = new Contract(witnesses);
var CompiledSimpleContract = compactJs.CompiledContract.make("CrossChain", Contract).pipe(
  compactJs.CompiledContract.withWitnesses(witnesses),
  compactJs.CompiledContract.withCompiledFileAssets(path__default.default.resolve(currentDir, "managed", "crosschain"))
);
var createWalletAndMidnightProvider = async (wallet) => {
  const walletFacade = wallet.getWalletInstance();
  assert3__default.default(walletFacade, "wallet not initialized");
  return {
    getCoinPublicKey: () => wallet.getShieldedSecretKeys().coinPublicKey,
    //() => state.shielded.coinPublicKey.toHexString(),
    getEncryptionPublicKey: () => wallet.getShieldedSecretKeys().encryptionPublicKey,
    async balanceTx(tx, ttl) {
      return walletFacade.balanceUnboundTransaction(tx, { shieldedSecretKeys: wallet.getShieldedSecretKeys(), dustSecretKey: wallet.getDustSecretKey() }, { ttl: ttl ?? new Date(Date.now() + 60 * 60 * 1e3) }).then((tx2) => walletFacade.finalizeRecipe(tx2));
    },
    submitTx(tx) {
      return walletFacade.submitTransaction(tx);
    }
  };
};
var CrossChainApi = class _CrossChainApi {
  constructor() {
    this.MaxSmgSignators = 29;
    this.MaxMergeCoins = 4;
  }
  async init(config, wallet) {
    const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
    const zkConfigProvider = new midnightJsNodeZkConfigProvider.NodeZkConfigProvider(ZKConfig.zkConfigPath);
    this.providers = {
      privateStateProvider: midnightJsLevelPrivateStateProvider.levelPrivateStateProvider({
        privateStateStoreName: "CCPSSN",
        walletProvider: walletAndMidnightProvider
      }),
      publicDataProvider: midnightJsIndexerPublicDataProvider.indexerPublicDataProvider(config.indexer, config.indexerWS),
      zkConfigProvider: new midnightJsNodeZkConfigProvider.NodeZkConfigProvider(ZKConfig.zkConfigPath),
      proofProvider: midnightJsHttpClientProofProvider.httpClientProofProvider(config.proofServer, zkConfigProvider),
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
    this.crossChainContract = await midnightJsContracts.deployContract(this.providers, {
      compiledContract: CompiledSimpleContract,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {},
      signingKey,
      args: [BigInt(adminThreshold), BigInt(smgPkThreshold)]
    });
    return this.crossChainContract.deployTxData.public.contractAddress;
  }
  async join(contractAddress) {
    this.crossChainContract = await midnightJsContracts.findDeployedContract(this.providers, {
      contractAddress,
      compiledContract: CompiledSimpleContract,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {}
    });
  }
  checkCrossData(uniqueId, smgId, tokenPairId, amount, fee, toAddr, coins, ttl) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    assert3__default.default(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const smgId_0 = Buffer.from(smgId, "hex");
    assert3__default.default(smgId_0.length === 32, `smgId must be 32 bytes long`);
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
    const ledger3 = await this.getLedgerState();
    return ledger3?.tokenPairs.lookup(BigInt(tokenPairId));
  }
  async getTokensTotalSupply(tokens) {
    const ledger3 = await this.getLedgerState();
    const tokensTotalSupply = tokens.map((token) => {
      const token_0 = Buffer.from(token, "hex");
      const totalSupply = ledger3?.mappintTokenTotalSupply.member(token_0) ? ledger3?.mappintTokenTotalSupply.lookup(token_0).toString(10) : "0";
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
  static getCrossTxInfo(ledger3, uniqueId) {
    const uniquId_0 = Buffer.from(uniqueId, "hex");
    if (ledger3.crossProposal.member(uniquId_0)) {
      const crossTxInfo = ledger3.crossProposal.lookup(uniquId_0);
      return {
        smgId: midnightJsUtils.toHex(crossTxInfo.smgId),
        token: midnightJsUtils.toHex(crossTxInfo.token),
        tokenPairId: crossTxInfo.tokenPairId.toString(10),
        amount: crossTxInfo.amount.toString(10),
        fee: crossTxInfo.fee.toString(10),
        toAddr: crossTxInfo.toAddr,
        ttl: crossTxInfo.ttl.toString(10)
      };
    }
  }
  static parseContractState(stateHex) {
    const state = __compactRuntime.ContractState.deserialize(Buffer.from(stateHex, "hex"));
    return ledger2(state.data);
  }
  static currentExecuteCrossProposal(ledger3) {
    let res = [];
    for (const smgEvent of ledger3.currentExecuteCrossProposal) {
      res.push({
        smgId: midnightJsUtils.toHex(smgEvent.crossProposal.smgId),
        uniqueId: midnightJsUtils.toHex(smgEvent.uniqueId),
        token: midnightJsUtils.toHex(smgEvent.crossProposal.token),
        tokenPairId: smgEvent.crossProposal.tokenPairId.toString(10),
        isMappingToken: smgEvent.crossProposal.isMappingToken,
        amount: smgEvent.crossProposal.amount.toString(10),
        fee: smgEvent.crossProposal.fee.toString(10),
        toAddr: midnightJsUtils.toHex(smgEvent.crossProposal.toAddr.bytes),
        ttl: smgEvent.crossProposal.ttl.toString(10)
      });
    }
    return res;
  }
  static latestOutBoundCrosstxInfo(ledger3) {
    if (ledger3.latestOutBoundCrosstxInfo.nonce === 0n) {
      return;
    } else {
      return {
        smgId: midnightJsUtils.toHex(ledger3.latestOutBoundCrosstxInfo.smgId),
        fromAddr: midnightJsUtils.toHex(ledger3.latestOutBoundCrosstxInfo.fromAddr.bytes),
        toAddr: ledger3.latestOutBoundCrosstxInfo.toAddr,
        tokenPairId: ledger3.latestOutBoundCrosstxInfo.tokenPairId.toString(10),
        tokenAccount: ledger3.latestOutBoundCrosstxInfo.tokenAccount,
        amount: ledger3.latestOutBoundCrosstxInfo.amount.toString(10),
        fee: ledger3.latestOutBoundCrosstxInfo.fee.toString(10),
        nonce: ledger3.latestOutBoundCrosstxInfo.nonce.toString(10)
      };
    }
  }
  async isVoter(ledger3, voter) {
    let voterPK;
    if (voter) {
      voterPK = getCoinPublicKeyFromShieldAddress(voter);
    } else {
      voterPK = midnightJsUtils.fromHex(this.providers.walletProvider.getCoinPublicKey());
    }
    return ledger3.smgTxSigners.member({ bytes: voterPK });
  }
  async getUnVotedCrossProposal(ledger3, voter) {
    let voterPK;
    if (voter) {
      voterPK = getCoinPublicKeyFromShieldAddress(voter);
    } else {
      voterPK = midnightJsUtils.fromHex(this.providers.walletProvider.getCoinPublicKey());
    }
    if (!this.isVoter(ledger3, voter)) return [];
    const voterIndex = ledger3.smgTxSigners.lookup({ bytes: voterPK });
    let res = [];
    for (const [uniquId, _] of ledger3.crossProposal) {
      const voters = ledger3.crossProposalVoters.lookup(uniquId);
      if (voters.size() >= ledger3.smgPKThreshold) continue;
      if (voters.member(voterIndex)) continue;
      else {
        const crossTxInfo = _CrossChainApi.getCrossTxInfo(ledger3, midnightJsUtils.toHex(uniquId));
        res.push(crossTxInfo);
      }
    }
    return res;
  }
  async getUnExecuteCrossProposal(ledger3) {
    let res = [];
    for (const [uniquId, crossProposal] of ledger3.crossProposal) {
      const voters = ledger3.crossProposalVoters.lookup(uniquId);
      if (voters.size() >= ledger3.smgPKThreshold) {
        res.push({
          uniqueId: midnightJsUtils.toHex(uniquId),
          smgId: midnightJsUtils.toHex(crossProposal.smgId),
          tokenPairId: crossProposal.tokenPairId.toString(10),
          token: midnightJsUtils.toHex(crossProposal.token),
          amount: crossProposal.amount.toString(10),
          fee: crossProposal.fee.toString(10),
          toAddr: midnightJsUtils.toHex(crossProposal.toAddr.bytes),
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
    assert3__default.default(smgId_0.length === 32, `smgId must be 32 bytes long`);
    const tokenPair_0 = BigInt(tokenPair);
    const pairInfo = await this.getTokenPairInfo(tokenPair_0);
    assert3__default.default(pairInfo, `tokenPairId ${tokenPair} not found`);
    const amount_0 = BigInt(amount);
    const token = ledger.decodeRawTokenType(pairInfo.midnigthTokenAccount);
    const coin_0 = shieldedCoinInfo(token, amount_0);
    const finalizedTxData = await this.crossChainContract.callTx.userBurn(smgId_0, toAddress, tokenPair_0, coin_0);
    return finalizedTxData;
  }
  async voteCrossProposal(uniqueId, ttl) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    const ttl_0 = BigInt(ttl);
    assert3__default.default(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const finalizedTxData = await this.crossChainContract.callTx.voteCrossProposal({ uniqueId: uniqueId_0, ttl: ttl_0 });
    return finalizedTxData;
  }
  async voteMultiCrossProposal(uniqueIds) {
    const uniqueIds_0 = uniqueIds.map((item) => {
      const uniqueId_0 = Buffer.from(item.uniqueId, "hex");
      const ttl_0 = BigInt(item.ttl);
      assert3__default.default(uniqueId_0.length === 32, `uniqueId(${uniqueId_0}) must be 32 bytes long`);
      return { uniqueId: uniqueId_0, ttl: ttl_0 };
    });
    assert3__default.default(uniqueIds_0.length <= 5 && uniqueIds_0.length > 0, `uniqueIds length must be between 1 and 5`);
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
      assert3__default.default(uniqueId_0.length === 32, `uniqueId(${item.uniqueId}) must be 32 bytes long`);
      let coinIndex_0 = BigInt(0);
      if (item.coinIndex) {
        coinIndex_0 = BigInt(item.coinIndex);
      }
      return { uniqueId: uniqueId_0, coinIndex: coinIndex_0 };
    });
    assert3__default.default(uniqueIds_0.length <= 5 && uniqueIds_0.length > 0, `uniqueIds must be between 1 and 5`);
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
  // async approveUserWithdrawFee(user: Address): Promise<FinalizedCallTxData<CrossChainContract, "approveUserWithdrawFee">> {
  //   const key_0 = { bytes: getCoinPublicKeyFromShieldAddress(user) };
  //   const ledgerState = await this.getLedgerState();
  //   assert(ledgerState != null, `ledgerState is null`);
  //   // const amount_0 = BigInt(amount);
  //   // const balance_0 = ledgerState.userFeeBalance.lookup(key_0);
  //   // assert(balance_0 >= amount_0, `user ${user} has not enough fee balance real (${balance_0}) vs withdraw ${amount_0}`);
  //   const finalizedTxData = await this.crossChainContract.callTx.approveUserWithdrawFee(key_0);
  //   return finalizedTxData;
  // }
  async userClaim(uniqueId, isMappingToken) {
    if (isMappingToken) {
      return this.userClaimMappingToken(uniqueId);
    } else {
      return this.userClaimCoin(uniqueId);
    }
  }
  async userFeeWithdrawRequest(receiptor) {
    const receiptor_0 = { bytes: __compactRuntime.encodeUserAddress(receiptor) };
    const finalizedTxData = await this.crossChainContract.callTx.userFeeWithdrawRequest(receiptor_0);
    return finalizedTxData;
  }
  async userClaimCoin(uniqueId) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    assert3__default.default(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const finalizedTxData = await this.crossChainContract.callTx.userClaimCoin(uniqueId_0);
    return finalizedTxData;
  }
  async userClaimMappingToken(uniqueId) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    assert3__default.default(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const finalizedTxData = await this.crossChainContract.callTx.userClaimMappingToken(uniqueId_0);
    return finalizedTxData;
  }
  // async addReserve(token: ShieldedTokenType, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addReserve">> {
  //   const amount_0 = BigInt(amount);
  //   const coin_0 = shieldedCoinInfo(token.raw, amount_0);
  //   const finalizedTxData = await this.crossChainContract.callTx.addReserve(coin_0);
  //   return finalizedTxData;
  // }
  // async withdrawReserveOfShieldedToken(token: TokenType, coinIndex: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfShieldedToken">> {
  //   assert(token.tag == 'shielded', "not shielded token");
  //   const coinIndex_0 = BigInt(coinIndex);
  //   const token_0 = encodeRawTokenType((token as ShieldedTokenType).raw);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfShieldedToken(token_0, coinIndex_0);
  //   return finalizedTxData;
  // }
  // async withdrawReserveOfShieldedMappingToken(domainSep: string): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfShieldedMappingToken">> {
  //   assert(domainSep.length <= 64, "domainsep length must <= 64");
  //   const token_0 = pad(domainSep, 32);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfShieldedMappingToken(token_0);
  //   return finalizedTxData;
  // }
  // async withdrawReserveOfUnshieldedToken(token: TokenType): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfUnshieldedToken">> {
  //   assert(token.tag == 'unshielded', "not shielded token");
  //   // const coinIndex_0 = BigInt(coinIndex);
  //   const token_0 = encodeRawTokenType((token as UnshieldedTokenType).raw);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfUnshieldedToken(token_0);
  //   return finalizedTxData;
  // }
  // async withdrawReserveOfUnshieldedMappingToken(domainSep: string): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfUnshieldedMappingToken">> {
  //   assert(domainSep.length <= 64, "domainsep length must <= 64");
  //   const token_0 = pad(domainSep, 32);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfUnshieldedMappingToken(token_0);
  //   return finalizedTxData;
  // }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async getLedgerState() {
    midnightJsUtils.assertIsContractAddress(this.crossChainContract?.deployTxData.public.contractAddress);
    const state = await this.providers.publicDataProvider.queryContractState(this.crossChainContract?.deployTxData.public.contractAddress).then((contractState) => contractState != null ? ledger2(contractState.data) : null);
    return state;
  }
  ///////////////////////////////////////////////        management      ////////////////////////////////////////////////////////
  // async transferOwner(newOwner: Address): Promise<FinalizedCallTxData<CrossChainContract, "transferOwner">> {
  //   const newOwner_0 = { bytes: getCoinPublicKeyFromShieldAddress(newOwner) };
  //   const finalizedTxData = await this.crossChainContract.callTx.transferOwner(newOwner_0);
  //   return finalizedTxData;
  // }
  // async acceptOwner(): Promise<FinalizedCallTxData<CrossChainContract, "acceptOwner">> {
  //   const finalizedTxData = await this.crossChainContract.callTx.acceptOwner();
  //   return finalizedTxData;
  // }
  // async updateSmgPk(newVoter: Address): Promise<FinalizedCallTxData<CrossChainContract, "updateSmgPk">> {
  //   const newVoter_0 = { bytes: getCoinPublicKeyFromShieldAddress(newVoter) };
  //   const finalizedTxData = await this.crossChainContract.callTx.updateSmgPk(newVoter_0);
  //   return finalizedTxData;
  // }
  // async setFeeShieldedReceiver(feeReceiver: Address): Promise<FinalizedCallTxData<CrossChainContract, "setFeeShieldedReceiver">> {
  //   const feeReceiver_0 = { bytes: getCoinPublicKeyFromShieldAddress(feeReceiver) };
  //   const finalizedTxData = await this.crossChainContract.callTx.setFeeShieldedReceiver(feeReceiver_0);
  //   return finalizedTxData;
  // }
  // async setFeeUnshieldedReceiver(feeReceiver: UserAddress): Promise<FinalizedCallTxData<CrossChainContract, "setFeeUnshieldedReceiver">> {
  //   const feeReceiver_0 = { bytes: encodeUserAddress(feeReceiver) };
  //   const finalizedTxData = await this.crossChainContract.callTx.setFeeUnshieldedReceiver(feeReceiver_0);
  //   return finalizedTxData;
  // }
  // async setTokenManager(tokenManager: Address): Promise<FinalizedCallTxData<CrossChainContract, "setTokenManager">> {
  //   const tokenManager_0 = { bytes: getCoinPublicKeyFromShieldAddress(tokenManager) };
  //   const finalizedTxData = await this.crossChainContract.callTx.setTokenManager(tokenManager_0);
  //   return finalizedTxData;
  // }
  // async setMegerWorker(mergeWorker: Address): Promise<FinalizedCallTxData<CrossChainContract, "setMegerWorker">> {
  //   const megerWorker_0 = { bytes: getCoinPublicKeyFromShieldAddress(mergeWorker) };
  //   const finalizedTxData = await this.crossChainContract.callTx.setMegerWorker(megerWorker_0);
  //   return finalizedTxData;
  // }
  // // async mergeTreasuryCoin(coins: bigint[] | number[] | string[]): Promise<FinalizedCallTxData<CrossChainContract, "mergeTreasuryCoin">>{
  // //   if (coins.length != 2) throw 'can only merge 2 coins';
  // //   const coins_0 = coins.map(coin => BigInt(coin));
  // //   const finalizedTxData = await this.crossChainContract.callTx.mergeTreasuryCoin(coins_0);
  // //   return finalizedTxData;
  // // }
  // async addAdmin(admin: Address): Promise<FinalizedCallTxData<CrossChainContract, "addAdmin">> {
  //   const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
  //   const finalizedTxData = await this.crossChainContract.callTx.addAdmin(admin_0);
  //   return finalizedTxData;
  // }
  // async removeAdmin(admin: Address): Promise<FinalizedCallTxData<CrossChainContract, "removeAdmin">> {
  //   const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
  //   const finalizedTxData = await this.crossChainContract.callTx.removeAdmin(admin_0);
  //   return finalizedTxData;
  // }
  // async setAdminThreshold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setAdminThreshold">> {
  //   const threshold_0 = BigInt(threshold);
  //   if (threshold_0 < 1n) throw 'threshold must be greater than 0';
  //   const finalizedTxData = await this.crossChainContract.callTx.setAdminThreshold(threshold_0);
  //   return finalizedTxData;
  // }
  // async setSmgPksks(voters: Address[]): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPksks">> {
  //   assert(voters.length > 0, 'voters must not be empty');
  //   const voters_0 = voters.map(voter => {
  //     return { bytes: getCoinPublicKeyFromShieldAddress(voter) }
  //     // return { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(voter, getZswapNetworkId())) } 
  //   });
  //   for (let index = voters_0.length; index < MAX_SIGNER_COUNT; index++) {
  //     voters_0.push({ bytes: Buffer.alloc(32) });
  //   }
  //   const finalizedTxData = await this.crossChainContract.callTx.setSmgPksks(voters_0);
  //   return finalizedTxData;
  // }
  // async setSmgPKThreold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setSmgPKThreold">> {
  //   const threshold_0 = BigInt(threshold);
  //   const finalizedTxData = await this.crossChainContract.callTx.setSmgPKThreold(threshold_0);
  //   return finalizedTxData;
  // }
  // async setFeeCommonConfig(chainId: number | string | bigint, fee: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setFeeCommonConfig">> {
  //   const chainId_0 = BigInt(chainId);
  //   const fee_0 = BigInt(fee);
  //   const finalizedTxData = await this.crossChainContract.callTx.setFeeCommonConfig(chainId_0, fee_0);
  //   return finalizedTxData;
  // }
  async addTokenPair(tokenPairId, fromChainId, toChainId, midnigthTokenAccount, isShielded, domainSep, fee) {
    const tokenPairId_0 = BigInt(tokenPairId);
    const fromChainId_0 = BigInt(fromChainId);
    const toChainId_0 = BigInt(toChainId);
    const midnigtAccount_0 = ledger.encodeRawTokenType(midnigthTokenAccount);
    const domainSep_0 = pad(domainSep, 32);
    if (domainSep) {
      const expectedTokenType = __compactRuntime.rawTokenType(domainSep_0, this.crossChainContract.deployTxData.public.contractAddress);
      assert3__default.default(expectedTokenType == midnigthTokenAccount, `token type not match ,${expectedTokenType} expected but got ${midnigthTokenAccount}`);
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
  // async removeTokenPair(tokenPairId: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "removeTokenPair">> {
  //   const tokenPairId_0 = BigInt(tokenPairId);
  //   const finalizedTxData = await this.crossChainContract.callTx.removeTokenPair(tokenPairId_0);
  //   return finalizedTxData;
  // }
  // async newProposal(proposal: CrossChain.Proposal): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">> {
  //   const finalizedTxData = await this.crossChainContract.callTx.newProposal(proposal);
  //   return finalizedTxData;
  // }
  // async addAdminProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">> {
  //   // const addr_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(addr, getZswapNetworkId())) };
  //   const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.AddAdmin;
  //   proposal.addr = addr_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // async removeAdminProposal(addr: Address) {
  //   const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.RemoveAdmin;
  //   proposal.addr = addr_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // async updateFeeShieldedReceiverProposal(addr: Address) {
  //   const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.UpdateFeeShieldedReceiver;
  //   proposal.addr = addr_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // async updateFeeUnshieldedReceiverProposal(addr: Address) {
  //   const addr_0 = { bytes: encodeUserAddress(addr) };
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.UpdateFeeUnshieldedReceiver;
  //   proposal.addr = addr_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // async updateTokenManagerProposal(addr: Address) {
  //   const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.UpdateTokenManager;
  //   proposal.addr = addr_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // async updateAdminThresholdProposal(threshold: number | string | bigint) {
  //   const threshold_0 = BigInt(threshold);
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.UpdateAdminThreshold;
  //   proposal.threshold = threshold_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  defaultProsal() {
    return {
      pType: ProposalType.UpdateAdminThreshold,
      addr: { bytes: fromHexWithOrNoPrefix("") },
      addrUnshielded: { bytes: fromHexWithOrNoPrefix("") },
      threshold: BigInt(0),
      feeConfig: { fee: BigInt(0), chainId: BigInt(0) },
      smgPubkeys: new Array(this.MaxSmgSignators).fill({ x: 0n, y: 0n })
    };
  }
  // async updateSMGPKThresholdProposal(threshold: number | string | bigint) {
  //   const threshold_0 = BigInt(threshold);
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.UpdateSMGPKThreshold;
  //   proposal.threshold = threshold_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // async updateFeeCommonConfigProposal(chainId: number | string | bigint, fee: number | string | bigint) {
  //   const chainId_0 = BigInt(chainId);
  //   const fee_0 = BigInt(fee);
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.UpdateFeeCommonConfig;
  //   proposal.feeConfig = { fee: fee_0, chainId: chainId_0 };
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // //////////////////////////////////////////////////////////////////////////////////////////
  // async voteProposal(proposalId: number | string | bigint) {
  //   const proposalId_0 = BigInt(proposalId);
  //   const finalizedTxData = await this.crossChainContract.callTx.voteProposal(proposalId_0);
  //   return finalizedTxData;
  // }
  // async executeProposal(proposalId: number | string | bigint) {
  //   const proposalId_0 = BigInt(proposalId);
  //   const finalizedTxData = await this.crossChainContract.callTx.executeProposal(proposalId_0);
  //   return finalizedTxData;
  // }
  // async removeExpiredHisTxs(txs: string[]) {
  //   assert(txs.length <= 20, 'txs length should be less than 20');
  //   const txs_0 = txs.map((tx) => Buffer.from(tx, 'hex'));
  //   for (let index = txs_0.length; index < 20; index++) {
  //     txs_0.push(Buffer.alloc(32));
  //   }
  //   const finalizedTxData = await this.crossChainContract.callTx.removeExpiredHisTxs(txs_0);
  //   return finalizedTxData;
  // }
  async updateContractAuthority(newKey) {
    return await this.crossChainContract.contractMaintenanceTx.replaceAuthority(newKey);
  }
  async upgradeContract(circuitId, newCircuitHex) {
    if (newCircuitHex) {
      midnightJsTypes.createVerifierKey(midnightJsUtils.fromHex(newCircuitHex));
    } else {
      await this.providers.zkConfigProvider.getVerifierKey(circuitId);
    }
  }
};
var upgradeContractCircuit = async (providers, contractAddress, circuitId, newVkHex) => {
  midnightJsUtils.assertIsContractAddress(contractAddress);
  if (newVkHex) {
    midnightJsTypes.createVerifierKey(midnightJsUtils.fromHex(newVkHex));
  } else {
    await providers.zkConfigProvider.getVerifierKey(circuitId);
  }
};
var removeContractCircuit = async (providers, contractAddress, circuitId) => {
  midnightJsUtils.assertIsContractAddress(contractAddress);
};
var getTreasuryCoinsFromState = (state) => {
  let treasuryCoins = /* @__PURE__ */ new Map();
  console.log("treasuryCoins size:", state.treasuryCoins.size());
  for (const [coinId, coin] of state.treasuryCoins) {
    const tokenType = ledger.decodeRawTokenType(coin.color);
    if (!treasuryCoins.has(tokenType)) {
      treasuryCoins.set(tokenType, /* @__PURE__ */ new Map());
    }
    treasuryCoins.get(tokenType)?.set(coinId, coin);
  }
  return treasuryCoins;
};
var genSigningKey = () => {
  return __compactRuntime.sampleSigningKey();
};
var getCoinPublicKeyFromShieldAddress = (shieldAddr) => {
  const tmp1 = walletSdkAddressFormat.MidnightBech32m.parse(shieldAddr);
  const tmp2 = walletSdkAddressFormat.ShieldedAddress.codec.decode(tmp1.network, tmp1);
  return tmp2.coinPublicKey.data;
};
var initNetwork = (network) => {
  midnightJsNetworkId.setNetworkId(network);
};

exports.CompiledSimpleContract = CompiledSimpleContract;
exports.CrossChainApi = CrossChainApi;
exports.CrossChainPrivateStateId = CrossChainPrivateStateId;
exports.MidnightWalletSDK = MidnightWalletSDK;
exports.ZKConfig = ZKConfig;
exports.configuration = configuration;
exports.createInitialPrivateState = createInitialPrivateState;
exports.createPrivateState = createPrivateState;
exports.createWalletAndMidnightProvider = createWalletAndMidnightProvider;
exports.crosschainContractInstance = crosschainContractInstance;
exports.currentDir = currentDir;
exports.genSigningKey = genSigningKey;
exports.getCoinPublicKeyFromShieldAddress = getCoinPublicKeyFromShieldAddress;
exports.getDirname = getDirname;
exports.getTreasuryCoinsFromState = getTreasuryCoinsFromState;
exports.initFacadeWallet = initFacadeWallet;
exports.initNetwork = initNetwork;
exports.pad = pad;
exports.removeContractCircuit = removeContractCircuit;
exports.signTransactionIntents = signTransactionIntents;
exports.upgradeContractCircuit = upgradeContractCircuit;
exports.waitForFullySynced = waitForFullySynced;
exports.witnesses = witnesses;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map