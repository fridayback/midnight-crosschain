
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { PublicDataProvider } from '@midnight-ntwrk/midnight-js-types';
import { assertIsContractAddress, fromHex, parseCoinPublicKeyToHex, toHex } from '@midnight-ntwrk/midnight-js-utils';
import * as CrossChain from "./managed/crosschain/contract/index.js";
import {type UnshieldedTokenType} from '@midnight-ntwrk/ledger-v8';

export interface Config {
  // readonly logDir: string;
  readonly indexer: string;
  readonly indexerWS: string;
  readonly node: string;
  readonly proofServer: string;
  readonly zkConfigPath: string;
}

export class CrossChainState {
  publicDataProvider!: PublicDataProvider;
  contractAddress!: string;

  constructor(indexer: string, indexerWS: string, contractAddress: string) {
    assertIsContractAddress(contractAddress);
    this.publicDataProvider = indexerPublicDataProvider(indexer, indexerWS);
    this.contractAddress = contractAddress;
  }

  async getLedgerState(): Promise<CrossChain.Ledger | null> {
    const state = await this.publicDataProvider
      .queryContractState(this.contractAddress)
      .then((contractState) => (contractState != null ? CrossChain.ledger(contractState.data) : null));
    return state;
  }

  async getContractState() {
    assertIsContractAddress(this.contractAddress);
    const state = await this.publicDataProvider
      .queryContractState(this.contractAddress)
      .then((contractState) => {
        const ledgerState = (contractState != null ? CrossChain.ledger(contractState.data) : null)
        let balances :{ [key: string]: string|bigint|number } = {};
        for (const [key, value] of contractState?.balance!) {
          if(key.tag == 'shielded') continue;
          else{
            const tokenType = (key as UnshieldedTokenType).raw; ;
            balances[tokenType] = value.toString(10);
          }
          
        };
        return { ledgerState, balances };
      });
    return state;
  }

}
