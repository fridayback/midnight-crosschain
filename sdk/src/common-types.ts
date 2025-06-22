/*
 * @Author: liulin blue-sky-dl5@163.com
 * @Date: 2025-06-21 12:24:17
 * @LastEditors: liulin blue-sky-dl5@163.com
 * @LastEditTime: 2025-06-21 12:32:49
 * @FilePath: /midnight-crosschain/sdk/src/common-types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { CrossChain, type CrossChainPrivateState } from '@midnight-crosschain/contract-interface';
import type { ImpureCircuitId, MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';

export type CrossChainCircuits = ImpureCircuitId<CrossChain.Contract<CrossChainPrivateState>>;

export const CounterPrivateStateId = 'counterPrivateState';

export type CrossChainProviders = MidnightProviders<CrossChainCircuits, typeof CounterPrivateStateId, CrossChainPrivateState>;

export type CrossChainContract = CrossChain.Contract<CrossChainPrivateState>;

export type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;