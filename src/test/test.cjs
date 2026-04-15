const sdk = require('../../dist/index.cjs');

sdk.initNetwork("preview");

const crosschain_api = new sdk.CrossChainApi();
