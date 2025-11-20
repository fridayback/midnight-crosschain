import { fileURLToPath } from 'url';
import path from "path";
export const currentDir = path.dirname(fileURLToPath(import.meta.url));
export const ZKConfig = {
    privateStateStoreName: 'crosschain-private-state',
    zkConfigPath: path.resolve(currentDir, 'managed', 'crosschain'),
};
export const CrossChainPrivateStateId = 'crossChainPrivateState';
//# sourceMappingURL=common-types.js.map