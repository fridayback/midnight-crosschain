# midnight-crosschain

## 1. install

```
yarn add midnight-crosschain@https://github.com/fridayback/midnight-crosschain.git#0.8
```

## 2. How to use

```js
import {
  CrossChainApi,
  MidnightWalletSDK,
  initNetwork,
  createWalletAndMidnightProvider,
  buildWalletAndWaitForFunds,
  pad,
  getTreasuryCoinsFromState,
  upgradeContractCircuit,
  removeContractCircuit,
} from "midnight-crosschain";

const config = {
  // logDir: `testnet-remote.log`,
  indexer: "https://indexer.testnet-02.midnight.network/api/v1/graphql",
  indexerWS: "wss://indexer.testnet-02.midnight.network/api/v1/graphql/ws",
  node: "https://rpc.testnet-02.midnight.network",
  proofServer: "http://44.229.225.45:6300",
};

const tokenPair = [
    {
        tokenPairId: 2,
        fromChainId: 1,
        toChainId: 2,
        midnightTokenAccount: 'Wan',
        fee: 0,
        isMappingToken: true
    }
]
const seed = "testnet seed";
const storeWalletSate = (state) => {
  // save state
};
const readWalletState = () => {
  // read state
};

const network = initNetwork("testnet");
const walletSdk = new MidnightWalletSDK(config);
const serializedState = await readWalletState();
await walletSdk.initWallet(seed, storeWalletSate, serializedState);
const wallet = walletSdk.getWalletInstance();
const api = new CrossChainApi();
await api.init(config, wallet);

let domainSep = "";
let midnightTokenAccount = tokenPair.midnightTokenAccount;
if (tokenPair.isMappingToken) {
  midnightTokenAccount = tokenType(
    pad(tokenPair.midnightTokenAccount, 32),
    api.crossChainContract.deployTxData.public.contractAddress
  );
  domainSep = tokenPair.midnightTokenAccount;
}
await api.addTokenPair(
  tokenPair.tokenPairId,
  tokenPair.fromChainId,
  tokenPair.toChainId,
  midnightTokenAccount,
  domainSep,
  tokenPair.fee
);

await api.setFeeCommonConfig(chainId, fee);

const tokenPair = await api.getTokenPairInfo(tokenPairId);

const totalSupply = await api.getTokensTotalSupply([midnightTokenAccount]);
```
