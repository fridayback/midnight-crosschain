import { CrossChain, type CrossChainPrivateState } from '../contract';
import type { ImpureCircuitId, MidnightProviders } from '@midnight-ntwrk/midnight-js-types';
import type { DeployedContract, FoundContract } from '@midnight-ntwrk/midnight-js-contracts';
export type CrossChainCircuits = ImpureCircuitId<CrossChain.Contract<CrossChainPrivateState>>;
export declare const CounterPrivateStateId = "counterPrivateState";
export type CrossChainProviders = MidnightProviders<CrossChainCircuits, typeof CounterPrivateStateId, CrossChainPrivateState>;
export type CrossChainContract = CrossChain.Contract<CrossChainPrivateState>;
export type DeployedCrossChainContract = DeployedContract<CrossChainContract> | FoundContract<CrossChainContract>;
