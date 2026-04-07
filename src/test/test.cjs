const seed = 'test-seed';
const fs = require('fs/promises');

const storeWalletSate = async (state) => {
    await fs.writeFile('./serialized-state-' + seed, JSON.stringify(state), 'ascii');
}
const readWalletState = async () => {
    try {
        return JSON.parse(await fs.readFile('./serialized-state-' + seed, 'ascii'));
    } catch (error) {
        console.error(`Error reading wallet state: ${error}`);
    }
}
const g_midnight_module_import = require('../../dist/index.cjs');
async function load() {
    try {
        // g_midnight_module_import = await import('midnight-crosschain');
        // g_midnight_module_import = require('./sdk.cjs');
    } catch (error) {
        if (error instanceof Error) {
            console.error('2:',error.stack);
        } else {
            console.error('2:','Caught non-error:', error);
        }
    }
    

    // let networkId = this.getNetworkId();
    // g_midnight_module_import.initNetwork(networkId);
    let network;
    if (global.testnet) {
        network = "preview";
    }
    else {
        network = "preview";
    }
    console.log("__inner_getCrossChainApi network:", network);
    g_midnight_module_import.initNetwork(network);
    let crosschain_api = new g_midnight_module_import.CrossChainApi();

    // let crossConf = global.config.crossTokens[this.chainType].CONF;
    const config = {
        // indexer: crossConf.indexerHTTP,
        // indexerWS: crossConf.indexerWS,
        // node: crossConf.nodeUrl,
        // proofServer: crossConf.proofServerUrl,
        network: 'preview',
        indexer: 'https://indexer.preview.midnight.network/api/v3/graphql',
        indexerWS: 'wss://indexer.preview.midnight.network/api/v3/graphql/ws',
        proofServer: 'http://35.163.105.105:6300',
        // proofServer: 'https://lace-proof-pub.preview.midnight.network',//'http://54.187.143.74:6300',
    };
    console.log("__inner_getCrossChainApi config-1:", config);
    config.node = "https://rpc.preview.midnight.network";
    console.log("__inner_getCrossChainApi config-2:", config);
    const cfg = g_midnight_module_import.configuration(config.indexer, config.indexerWS, config.proofServer, config.node, config.network);
    let wallet = new g_midnight_module_import.MidnightWalletSDK(cfg);

    // let privateKeyHex = this.getPrivateKey();
    // g_midnight_wallet_save_key = sha256(privateKeyHex);
    // console.log("g_midnight_wallet_save_key:", g_midnight_wallet_save_key);
    // console.log("__inner_getCrossChainApi 10001");
    // let walletState = new MidnightWalletState();
    // console.log("__inner_getCrossChainApi 10002");
    // await walletState.init();
    // console.log("__inner_getCrossChainApi 10003");
    // let preWalletState = await walletState.restoreWalletByState(g_midnight_wallet_save_key);
    // console.log("__inner_getCrossChainApi 10004");
    // // console.log("walletState:", walletState);
    // console.log("preWalletState:", preWalletState);
    const privateKeyHex = "1111111111111111111111111111111111111111111111111111111111111113";
    try {
        await wallet.initWallet(privateKeyHex, storeWalletSate, undefined, 10 * 60 * 1000);
        console.info('Wallet Built completly...: address = ', wallet.getAccountAddress());
        console.info('Wallet Balance:', await wallet.getBalances());
    } catch (error) {
        if (error instanceof Error) {
            console.error('3:',error.stack);
        } else {
            console.error('3:','Caught non-error:', error);
        }
    }

}

load().then(() => {
    console.log("Wallet loaded successfully");
}).catch((error) => {
    console.error(`Error loading wallet: ${error}`);
    if (error instanceof Error) {
        console.error(error.stack);
    } else {
        console.error('Caught non-error:', error);
    }
});