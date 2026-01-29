// /*
//  * @Author: liulin 
//  * @Date: 2025-06-20 11:21:39
//  * @LastEditors: liulin 
//  * @LastEditTime: 2025-06-22 12:33:58
//  * @FilePath: /midnight-crosschain/contract/src/witnesses.ts
//  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
//  */

// export type CrossChainPrivateState = {
    
// }

// export const createCrossChainPrivateState = () => ({
// });

// export const witnesses = {
//     // TODO: Add witnesses
// }

// import type { WitnessContext } from '@midnight-ntwrk/compact-runtime';

// import type { Ledger } from './managed/crosschain/contract/index.js';

export type CrossChainPrivateState = {
}

export const createPrivateState = (privateCounter: number): CrossChainPrivateState => ({
});

export const createInitialPrivateState = (privateCounter: number) => createPrivateState(privateCounter);

export const witnesses = {
//   privateIncrement: ({ privateState }: WitnessContext<Ledger, CrossChainPrivateState>): [CrossChainPrivateState, []] => [
//     { privateCounter: privateState.privateCounter + 1 },
//     []
//   ]
};