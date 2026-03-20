// import "dotenv/config";
import * as graphHttp from 'graphql-http';
import { type FinalizedTransaction } from '@midnight-ntwrk/ledger-v8';



const indexerURL = (process.env.INDEXER_URL || "http://10.211.55.6:8088") + "/api/v3/graphql";
const txServerURL = (process.env.TX_SERVER_URL || "http://10.211.55.6:3000") + '/submit';

const client = graphHttp.createClient({ url: indexerURL });

import axios, { AxiosResponse } from 'axios';
import { TransactionIdentifier } from '@midnight-ntwrk/wallet-sdk-facade';

export type TXWithContext = {
    initial_tx: {
        tx: number[];
        block_context: {
            secondsSinceEpoch: number;
            secondsSinceEpochErr: number;
            parentBlockHash: string;
        };
    };
    batches: [];
}

export type InitialTX = {
    tx: number[];
    block_context: {
        secondsSinceEpoch: number;
        secondsSinceEpochErr: number;
        parentBlockHash: string;
    };
}

export type TXStringWithContext = {
    initial_tx: string;
    batches: [];
}

export class TXClient {
    static async post(apiURL: string, txStringWithContext: TXStringWithContext) {
        try {
            const response: AxiosResponse = await axios.post(apiURL,
                txStringWithContext
            );

            console.log('✅ Post successfully!');
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.error('❌ Axios error:', (error as Error).message);
            } else {
                console.error('❌ Unexpected error:', error);
            }
            throw error;
        }
    }
}

export type BlockData = {
    block: {
        height: bigint;
        hash: string;
    };
}

export type RetBlockData = {
    data: BlockData;
}

export class ToolKitClient {
    static async getBlockNumberSync(): Promise<RetBlockData> {
        let qryOption = `{
            block {
                height
                hash
            }
        }`;

        let cancel = () => {
        };

        const ret: RetBlockData = await new Promise((resolve, reject) => {
            let result: any;
            cancel = client.subscribe(
                {
                    query: qryOption,
                },
                {
                    next: (data) => (result = data),
                    error: reject,
                    complete: () => resolve(result),
                },
            );
        });
        console.log("midnight getBlockNumberSync query result: ", ret);

        return ret;
    }

    static async prepareTXStringWithContext(txData: Uint8Array) {
        let txBlock = await ToolKitClient.getBlockNumberSync();
        let initialTX: InitialTX = {
            tx: [],
            block_context: {
                secondsSinceEpoch: 0,
                secondsSinceEpochErr: 30,
                parentBlockHash: '',
            },
        };
        const timestampSec = Math.floor(Date.now() / 1000);
        initialTX.tx = Array.from(txData);
        initialTX.block_context.secondsSinceEpoch = timestampSec;
        initialTX.block_context.parentBlockHash = txBlock.data.block.hash;

        let txStringWithContext: TXStringWithContext = {
            initial_tx: JSON.stringify(initialTX),
            batches: []
        };

        return txStringWithContext;
    }

    static async submitTXStringWithContext(tx: FinalizedTransaction): Promise<TransactionIdentifier> {
        const txStringWithContext = await ToolKitClient.prepareTXStringWithContext(tx.serialize());
        const ret = await TXClient.post(txServerURL, txStringWithContext);
        if (ret.success === true) {
            return ret.data;
        } else {
            throw new Error(`Failed to submit transaction: ${ret}`);
        }
        // return ret;
    }
}