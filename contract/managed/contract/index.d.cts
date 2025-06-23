import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type CoinInfo = { nonce: Uint8Array; color: Uint8Array; value: bigint };

export type QualifiedCoinInfo = { nonce: Uint8Array;
                                  color: Uint8Array;
                                  value: bigint;
                                  mt_index: bigint
                                };

export type Witnesses<T> = {
}

export type ImpureCircuits<T> = {
  deposit(context: __compactRuntime.CircuitContext<T>, coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  withdraw(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  mint(context: __compactRuntime.CircuitContext<T>,
       domainSep_0: Uint8Array,
       amount_0: bigint,
       recipient_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  burn(context: __compactRuntime.CircuitContext<T>, coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
}

export type PureCircuits = {
  burnAddress(): { is_left: boolean,
                   left: { bytes: Uint8Array },
                   right: { bytes: Uint8Array }
                 };
}

export type Circuits<T> = {
  deposit(context: __compactRuntime.CircuitContext<T>, coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  withdraw(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, []>;
  mint(context: __compactRuntime.CircuitContext<T>,
       domainSep_0: Uint8Array,
       amount_0: bigint,
       recipient_0: { bytes: Uint8Array }): __compactRuntime.CircuitResults<T, []>;
  burn(context: __compactRuntime.CircuitContext<T>, coin_0: CoinInfo): __compactRuntime.CircuitResults<T, []>;
  burnAddress(context: __compactRuntime.CircuitContext<T>): __compactRuntime.CircuitResults<T, { is_left: boolean,
                                                                                                 left: { bytes: Uint8Array
                                                                                                       },
                                                                                                 right: { bytes: Uint8Array
                                                                                                        }
                                                                                               }>;
}

export type Ledger = {
  readonly round: bigint;
  readonly treasury: QualifiedCoinInfo;
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<T, W extends Witnesses<T> = Witnesses<T>> {
  witnesses: W;
  circuits: Circuits<T>;
  impureCircuits: ImpureCircuits<T>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<T>): __compactRuntime.ConstructorResult<T>;
}

export declare function ledger(state: __compactRuntime.StateValue): Ledger;
export declare const pureCircuits: PureCircuits;
