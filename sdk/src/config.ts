/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-06-22 09:25:39
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-06-22 12:13:05
 * @FilePath: /midnight-crosschain/sdk/src/config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import path from 'node:path';
import { NetworkId, setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
export const currentDir = path.resolve(new URL(import.meta.url).pathname, '..');

export const contractConfig = {
  privateStateStoreName: 'counter-private-state',
  zkConfigPath: path.resolve(currentDir, '..', '..', 'contract', 'src', 'managed', 'counter'),
};

export interface Config {
  readonly indexer: string;
  readonly indexerWS: string;
  readonly node: string;
  readonly proofServer: string;
}

// export class ApiConfig implements Config {
//   constructor(networkId: NetworkId) {
//     setNetworkId(networkId);

//   }
// }
