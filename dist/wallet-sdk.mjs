import * as ledger from "@midnight-ntwrk/ledger-v7";
import { DustWallet } from "@midnight-ntwrk/wallet-sdk-dust-wallet";
import { WalletFacade } from "@midnight-ntwrk/wallet-sdk-facade";
import { HDWallet, Roles } from "@midnight-ntwrk/wallet-sdk-hd";
import { ShieldedWallet } from "@midnight-ntwrk/wallet-sdk-shielded";
import {
  createKeystore,
  PublicKey,
  NoOpTransactionHistoryStorage,
  UnshieldedWallet
} from "@midnight-ntwrk/wallet-sdk-unshielded-wallet";
import { Buffer } from "buffer";
import * as Rx from "rxjs";
import { ShieldedAddress, UnshieldedAddress } from "@midnight-ntwrk/wallet-sdk-address-format";
import assert from "node:assert";
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
  const hdWallet = HDWallet.fromSeed(seed);
  if (hdWallet.type !== "seedOk") {
    throw new Error("Failed to initialize HDWallet");
  }
  const derivationResult = hdWallet.hdWallet.selectAccount(0).selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust]).deriveKeysAt(0);
  if (derivationResult.type !== "keysDerived") {
    throw new Error("Failed to derive keys");
  }
  hdWallet.hdWallet.clear();
  const shieldedSecretKeys = ledger.ZswapSecretKeys.fromSeed(derivationResult.keys[Roles.Zswap]);
  const dustSecretKey = ledger.DustSecretKey.fromSeed(derivationResult.keys[Roles.Dust]);
  const unshieldedKeystore = createKeystore(derivationResult.keys[Roles.NightExternal], configuration2.networkId);
  const shieldedWallet = strSerializedState ? ShieldedWallet(configuration2).restore(strSerializedState.shieldedWalletState) : ShieldedWallet(configuration2).startWithSecretKeys(shieldedSecretKeys);
  const dustWallet = strSerializedState ? DustWallet(configuration2).restore(strSerializedState.dustWalletState) : DustWallet(configuration2).startWithSecretKey(dustSecretKey, ledger.LedgerParameters.initialParameters().dust);
  const unshieldedWallet = strSerializedState ? UnshieldedWallet({
    ...configuration2,
    txHistoryStorage: new NoOpTransactionHistoryStorage()
    //此处不对交易历史进行保留
  }).restore(strSerializedState.unshieldedWalletState) : UnshieldedWallet({
    ...configuration2,
    txHistoryStorage: new NoOpTransactionHistoryStorage()
    //此处不对交易历史进行保留
  }).startWithPublicKey(PublicKey.fromKeyStore(unshieldedKeystore));
  const wallet = new WalletFacade(shieldedWallet, unshieldedWallet, dustWallet);
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
    const seed = Buffer.from(strSeed, "hex");
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
      shieldedAddress: ShieldedAddress.codec.encode(this.config.networkId, state.shielded.address).asString(),
      unshieldedAddress: UnshieldedAddress.codec.encode(this.config.networkId, state.unshielded.address).asString(),
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
    assert(this.walletObj, "walletObj is not initialized!");
    let curState = await Rx.firstValueFrom(this.walletObj.state());
    let aryBalance = new Array();
    const dustBalance = curState.dust.walletBalance(/* @__PURE__ */ new Date());
    const shieldedBlance = curState.shielded.balances;
    const unshieldedBlance = curState.unshielded.balances;
    return { dustBalance, shieldedBlance, unshieldedBlance };
  }
  async getAvailableCoins() {
    assert(this.walletObj, "walletObj is not initialized!");
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
    assert(this.shieldedSecretKeys, "shieldedSecretKeys is undefined");
    return this.shieldedSecretKeys;
  }
  getUnshieldedKeystore() {
    assert(this.unshieldedKeystore, "unshieldedKeystore is undefined");
    return this.unshieldedKeystore;
  }
  getDustSecretKey() {
    assert(this.dustSecretKey, "dustSecretKey is undefined");
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
    assert(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
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
export {
  MidnightWalletSDK,
  configuration,
  initFacadeWallet
};
//# sourceMappingURL=wallet-sdk.mjs.map