/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-06-21 12:24:17
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-06-27 17:32:17
 * @FilePath: /midnight-crosschain/sdk/src/common-types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as CrossChain from './managed/contract/index.cjs';
import { type CrossChainPrivateState } from './witnesses';
import type { ImpureCircuitId, MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

export type CrossChainCircuits = ImpureCircuitId<CrossChain.Contract<CrossChainPrivateState>>;

export const CrossChainPrivateStateId = 'crossChainPrivateState';

export type CrossChainProviders = MidnightProviders<CrossChainCircuits, typeof CrossChainPrivateStateId, CrossChainPrivateState>;

export type CrossChainContract = CrossChain.Contract<CrossChainPrivateState>;

export type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;