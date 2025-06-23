/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-06-20 12:02:08
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-06-23 12:30:35
 * @FilePath: /midnight-crosschain/contract/src/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export * as CrossChain from "./managed/contract/index.cjs";
export * from "./witnesses.js";

import path from 'node:path';
export const currentDir = path.resolve(new URL(import.meta.url).pathname, '..');

export const ZKConfig = {
  privateStateStoreName: 'crosschain-private-state',
  zkConfigPath: path.resolve(currentDir, 'managed', 'crosschain'),
};