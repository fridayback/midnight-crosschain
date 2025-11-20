import {CrossChainPrivateState} from './witnesses'
import {Contract, Witnesses} from './managed/crosschain/contract/index.cjs';
import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract, type DeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
// import { fileURLToPath } from 'url'; 
// import path from "path";

// export const currentDir = path.dirname(fileURLToPath(import.meta.url));

// export const ZKConfig = {
//   privateStateStoreName: 'crosschain-private-state',
//   zkConfigPath: path.resolve(currentDir, 'managed', 'crosschain'),
// };

export const CrossChainPrivateStateId = 'crossChainPrivateState';
export type PrivateStateId = typeof CrossChainPrivateStateId;

export type CrossChainContract = Contract<CrossChainPrivateState, Witnesses<CrossChainPrivateState>>;
export type CrossChainCircuitKeys = Exclude<keyof CrossChainContract['impureCircuits'], number | symbol>;
export type CrossChainProviders = MidnightProviders<CrossChainCircuitKeys,PrivateStateId, CrossChainPrivateState>;

export type CrossChainCircuits = Exclude<keyof CrossChainContract['impureCircuits'], number | symbol>;
export type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;