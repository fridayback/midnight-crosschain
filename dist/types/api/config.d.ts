import { NetworkId } from '@midnight-ntwrk/midnight-js-network-id';
export declare const currentDir: string;
export declare const contractConfig: {
    privateStateStoreName: string;
    zkConfigPath: string;
};
export interface Config {
    readonly indexer: string;
    readonly indexerWS: string;
    readonly node: string;
    readonly proofServer: string;
}
export declare class ApiConfig implements Config {
    readonly indexer: string;
    readonly indexerWS: string;
    readonly node: string;
    readonly proofServer: string;
    constructor(networkId: NetworkId, indexer: string, indexerWS: string, node: string, proofServer: string);
}
