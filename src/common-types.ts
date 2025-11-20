import {CrossChainPrivateState} from './witnesses'
import {Contract, Witnesses} from './managed/crosschain/contract/index.cjs';
import { type MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import { type FoundContract, type DeployedContract } from '@midnight-ntwrk/midnight-js-contracts';

export const CrossChainPrivateStateId = 'crossChainPrivateState';
export type PrivateStateId = typeof CrossChainPrivateStateId;

export type CrossChainContract = Contract<CrossChainPrivateState, Witnesses<CrossChainPrivateState>>;
export type CrossChainCircuitKeys = Exclude<keyof CrossChainContract['impureCircuits'], number | symbol>;
export type CrossChainProviders = MidnightProviders<CrossChainCircuitKeys,PrivateStateId, CrossChainPrivateState>;

export type CrossChainCircuits = Exclude<keyof CrossChainContract['impureCircuits'], number | symbol>;
export type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;