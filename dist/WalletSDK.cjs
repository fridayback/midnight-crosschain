"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var WalletSDK_exports = {};
__export(WalletSDK_exports, {
  MidnightWalletSDK: () => MidnightWalletSDK,
  configuration: () => configuration,
  initFacadeWallet: () => initFacadeWallet
});
module.exports = __toCommonJS(WalletSDK_exports);
var ledger = __toESM(require("@midnight-ntwrk/ledger-v7"), 1);
var import_wallet_sdk_dust_wallet = require("@midnight-ntwrk/wallet-sdk-dust-wallet");
var import_wallet_sdk_facade = require("@midnight-ntwrk/wallet-sdk-facade");
var import_wallet_sdk_hd = require("@midnight-ntwrk/wallet-sdk-hd");
var import_wallet_sdk_shielded = require("@midnight-ntwrk/wallet-sdk-shielded");
var import_wallet_sdk_unshielded_wallet = require("@midnight-ntwrk/wallet-sdk-unshielded-wallet");
var import_buffer = require("buffer");
var Rx = __toESM(require("rxjs"), 1);
var import_wallet_sdk_address_format = require("@midnight-ntwrk/wallet-sdk-address-format");
var import_node_assert = __toESM(require("node:assert"), 1);
const PROOF_SERVER_PORT = Number.parseInt(globalThis.process?.env?.["PROOF_SERVER_PORT"] ?? "6300", 10);
const INDEXER_HTTP_URL = `https://indexer.preview.midnight.network/api/v3/graphql`;
const INDEXER_WS_URL = `wss://indexer.preview.midnight.network/api/v3/graphql/ws`;
const configuration = function(indexerHttpUrl, indexerWsUrl, provingServerUrl, network = "preview", costParameters = {
  additionalFeeOverhead: 300000000000000n,
  feeBlocksMargin: 5
}) {
  return {
    networkId: network,
    costParameters,
    relayURL: new URL(indexerWsUrl),
    provingServerUrl: new URL(provingServerUrl),
    indexerClientConnection: {
      indexerHttpUrl,
      indexerWsUrl
    },
    indexerUrl: indexerWsUrl
  };
};
const initFacadeWallet = async (seed, configuration2, strSerializedState) => {
  const hdWallet = import_wallet_sdk_hd.HDWallet.fromSeed(seed);
  if (hdWallet.type !== "seedOk") {
    throw new Error("Failed to initialize HDWallet");
  }
  const derivationResult = hdWallet.hdWallet.selectAccount(0).selectRoles([import_wallet_sdk_hd.Roles.Zswap, import_wallet_sdk_hd.Roles.NightExternal, import_wallet_sdk_hd.Roles.Dust]).deriveKeysAt(0);
  if (derivationResult.type !== "keysDerived") {
    throw new Error("Failed to derive keys");
  }
  hdWallet.hdWallet.clear();
  const shieldedSecretKeys = ledger.ZswapSecretKeys.fromSeed(derivationResult.keys[import_wallet_sdk_hd.Roles.Zswap]);
  const dustSecretKey = ledger.DustSecretKey.fromSeed(derivationResult.keys[import_wallet_sdk_hd.Roles.Dust]);
  const unshieldedKeystore = (0, import_wallet_sdk_unshielded_wallet.createKeystore)(derivationResult.keys[import_wallet_sdk_hd.Roles.NightExternal], configuration2.networkId);
  const shieldedWallet = strSerializedState ? (0, import_wallet_sdk_shielded.ShieldedWallet)(configuration2).restore(strSerializedState.shieldedWalletState) : (0, import_wallet_sdk_shielded.ShieldedWallet)(configuration2).startWithSecretKeys(shieldedSecretKeys);
  const dustWallet = strSerializedState ? (0, import_wallet_sdk_dust_wallet.DustWallet)(configuration2).restore(strSerializedState.dustWalletState) : (0, import_wallet_sdk_dust_wallet.DustWallet)(configuration2).startWithSecretKey(dustSecretKey, ledger.LedgerParameters.initialParameters().dust);
  const unshieldedWallet = strSerializedState ? (0, import_wallet_sdk_unshielded_wallet.UnshieldedWallet)({
    ...configuration2,
    txHistoryStorage: new import_wallet_sdk_unshielded_wallet.NoOpTransactionHistoryStorage()
    //此处不对交易历史进行保留
  }).restore(strSerializedState.unshieldedWalletState) : (0, import_wallet_sdk_unshielded_wallet.UnshieldedWallet)({
    ...configuration2,
    txHistoryStorage: new import_wallet_sdk_unshielded_wallet.NoOpTransactionHistoryStorage()
    //此处不对交易历史进行保留
  }).startWithPublicKey(import_wallet_sdk_unshielded_wallet.PublicKey.fromKeyStore(unshieldedKeystore));
  const wallet = new import_wallet_sdk_facade.WalletFacade(shieldedWallet, unshieldedWallet, dustWallet);
  await wallet.start(shieldedSecretKeys, dustSecretKey);
  return { wallet, shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
};
class MidnightWalletSDK {
  config;
  // private NetWorkId: NetworkId;
  walletObj;
  shieldedSecretKeys;
  dustSecretKey;
  unshieldedKeystore;
  walletAddress;
  bActiveFlag;
  storeTimer;
  constructor(config) {
    this.config = config;
    this.walletAddress = { shieldedAddress: "", unshieldedAddress: "", dustAddress: "" };
    this.bActiveFlag = false;
  }
  //////////////////////////////////////////
  // to generate a wallet instance
  //////////////////////////////////////////
  async initWallet(strSeed, store, strSerializedState, saveInterval = 6e5) {
    const seed = import_buffer.Buffer.from(strSeed, "hex");
    if (seed.toString("hex").toLowerCase() != strSeed.toLowerCase()) throw "bad seed";
    let oldState;
    const ret = await initFacadeWallet(seed, this.config, strSerializedState);
    this.walletObj = ret.wallet;
    this.shieldedSecretKeys = ret.shieldedSecretKeys;
    this.unshieldedKeystore = ret.unshieldedKeystore;
    this.dustSecretKey = ret.dustSecretKey;
    const selfWallet = this.walletObj;
    const state = await Rx.firstValueFrom(this.walletObj.state());
    this.walletAddress = {
      shieldedAddress: import_wallet_sdk_address_format.ShieldedAddress.codec.encode(this.config.networkId, state.shielded.address).asString(),
      unshieldedAddress: import_wallet_sdk_address_format.UnshieldedAddress.codec.encode(this.config.networkId, state.unshielded.address).asString(),
      dustAddress: state.dust.dustAddress
    };
    const callBack = async () => {
      const state2 = await Rx.firstValueFrom(selfWallet.state());
      await store({ shieldedWalletState: state2.shielded.serialize(), unshieldedWalletState: state2.unshielded.serialize(), dustWalletState: state2.dust.serialize() });
      console.log("wallet state saved!");
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
    (0, import_node_assert.default)(this.walletObj, "walletObj is not initialized!");
    let curState = await Rx.firstValueFrom(this.walletObj.state());
    let aryBalance = new Array();
    const dustBalance = curState.dust.walletBalance(/* @__PURE__ */ new Date());
    const shieldedBlance = curState.shielded.balances;
    const unshieldedBlance = curState.unshielded.balances;
    return { dustBalance, shieldedBlance, unshieldedBlance };
  }
  async getAvailableCoins() {
    (0, import_node_assert.default)(this.walletObj, "walletObj is not initialized!");
    let curState = await Rx.firstValueFrom(this.walletObj.state());
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
    (0, import_node_assert.default)(this.shieldedSecretKeys, "shieldedSecretKeys is undefined");
    return this.shieldedSecretKeys;
  }
  getUnshieldedKeystore() {
    (0, import_node_assert.default)(this.unshieldedKeystore, "unshieldedKeystore is undefined");
    return this.unshieldedKeystore;
  }
  getDustSecretKey() {
    (0, import_node_assert.default)(this.dustSecretKey, "dustSecretKey is undefined");
    return this.dustSecretKey;
  }
  async getSerializedWalletState() {
    if (!this.walletObj) return "";
    let curState = await Rx.firstValueFrom(this.walletObj.state());
    const dustWalletState = curState.dust.serialize();
    const shieldedWalletState = curState.shielded.serialize();
    const unshieldedWalletState = curState.unshielded.serialize();
    return { dustWalletState, shieldedWalletState, unshieldedWalletState };
  }
  async transferTo(transferInfo, ttl) {
    (0, import_node_assert.default)(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
    const unprovenTxRecipe = await this.walletObj?.transferTransaction(
      this.shieldedSecretKeys,
      this.dustSecretKey,
      transferInfo,
      ttl
    );
    const finalizedTx = await this.walletObj.finalizeTransaction(unprovenTxRecipe);
    const submittedTxHash = await this.walletObj.submitTransaction(finalizedTx);
    return submittedTxHash;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MidnightWalletSDK,
  configuration,
  initFacadeWallet
});
//# sourceMappingURL=WalletSDK.cjs.map