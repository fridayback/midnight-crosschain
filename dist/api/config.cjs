"use strict";
/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-06-22 09:25:39
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-06-23 15:40:38
 * @FilePath: /midnight-crosschain/sdk/src/config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiConfig = exports.contractConfig = exports.currentDir = void 0;
const node_path_1 = __importDefault(require("node:path"));
const midnight_js_network_id_1 = require("@midnight-ntwrk/midnight-js-network-id");
exports.currentDir = node_path_1.default.resolve(new URL(__dirname).pathname, '..');
exports.contractConfig = {
    privateStateStoreName: 'counter-private-state',
    zkConfigPath: node_path_1.default.resolve(exports.currentDir, '..', '..', 'contract', 'src', 'managed', 'counter'),
};
class ApiConfig {
    indexer;
    indexerWS;
    node;
    proofServer;
    constructor(networkId, indexer, indexerWS, node, proofServer) {
        this.indexer = indexer;
        this.indexerWS = indexerWS;
        this.node = node;
        this.proofServer = proofServer;
        (0, midnight_js_network_id_1.setNetworkId)(networkId);
        this.indexer = indexer;
        this.indexerWS = indexerWS;
        this.node = node;
        this.proofServer = proofServer;
    }
}
exports.ApiConfig = ApiConfig;
//# sourceMappingURL=config.js.map