'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.8.1';
const expectedRuntimeVersion = expectedRuntimeVersionString.split('-')[0].split('.').map(Number);
const actualRuntimeVersion = __compactRuntime.versionString.split('-')[0].split('.').map(Number);
if (expectedRuntimeVersion[0] != actualRuntimeVersion[0]
     || (actualRuntimeVersion[0] == 0 && expectedRuntimeVersion[1] != actualRuntimeVersion[1])
     || expectedRuntimeVersion[1] > actualRuntimeVersion[1]
     || (expectedRuntimeVersion[1] == actualRuntimeVersion[1] && expectedRuntimeVersion[2] > actualRuntimeVersion[2]))
   throw new __compactRuntime.CompactError(`Version mismatch: compiled code expects ${expectedRuntimeVersionString}, runtime is ${__compactRuntime.versionString}`);
{ const MAX_FIELD = 52435875175126190479447740508185965837690552500527637822603658699938581184512n;
  if (__compactRuntime.MAX_FIELD !== MAX_FIELD)
     throw new __compactRuntime.CompactError(`compiler thinks maximum field value is ${MAX_FIELD}; run time thinks it is ${__compactRuntime.MAX_FIELD}`)
}

const _descriptor_0 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_1 = new __compactRuntime.CompactTypeBytes(32);

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_1.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.bytes);
  }
}

const _descriptor_2 = new _ZswapCoinPublicKey_0();

class _ContractAddress_0 {
  alignment() {
    return _descriptor_1.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.bytes);
  }
}

const _descriptor_3 = new _ContractAddress_0();

class _Either_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_3.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_0.fromValue(value_0),
      left: _descriptor_2.fromValue(value_0),
      right: _descriptor_3.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.is_left).concat(_descriptor_2.toValue(value_0.left).concat(_descriptor_3.toValue(value_0.right)));
  }
}

const _descriptor_4 = new _Either_0();

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_6 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _CoinInfo_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_6.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_1.fromValue(value_0),
      color: _descriptor_1.fromValue(value_0),
      value: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.nonce).concat(_descriptor_1.toValue(value_0.color).concat(_descriptor_6.toValue(value_0.value)));
  }
}

const _descriptor_7 = new _CoinInfo_0();

class _QualifiedCoinInfo_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_6.alignment().concat(_descriptor_5.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_1.fromValue(value_0),
      color: _descriptor_1.fromValue(value_0),
      value: _descriptor_6.fromValue(value_0),
      mt_index: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.nonce).concat(_descriptor_1.toValue(value_0.color).concat(_descriptor_6.toValue(value_0.value).concat(_descriptor_5.toValue(value_0.mt_index))));
  }
}

const _descriptor_8 = new _QualifiedCoinInfo_0();

class _Maybe_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_7.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_0.fromValue(value_0),
      value: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.is_some).concat(_descriptor_7.toValue(value_0.value));
  }
}

const _descriptor_9 = new _Maybe_0();

class _SendResult_0 {
  alignment() {
    return _descriptor_9.alignment().concat(_descriptor_7.alignment());
  }
  fromValue(value_0) {
    return {
      change: _descriptor_9.fromValue(value_0),
      sent: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_9.toValue(value_0.change).concat(_descriptor_7.toValue(value_0.sent));
  }
}

const _descriptor_10 = new _SendResult_0();

const _descriptor_11 = new __compactRuntime.CompactTypeField();

const _descriptor_12 = new __compactRuntime.CompactTypeBytes(6);

class _CoinPreimage_0 {
  alignment() {
    return _descriptor_7.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_12.alignment())));
  }
  fromValue(value_0) {
    return {
      info: _descriptor_7.fromValue(value_0),
      data_type: _descriptor_0.fromValue(value_0),
      data: _descriptor_1.fromValue(value_0),
      domain_sep: _descriptor_12.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_7.toValue(value_0.info).concat(_descriptor_0.toValue(value_0.data_type).concat(_descriptor_1.toValue(value_0.data).concat(_descriptor_12.toValue(value_0.domain_sep))));
  }
}

const _descriptor_13 = new _CoinPreimage_0();

const _descriptor_14 = new __compactRuntime.CompactTypeVector(2, _descriptor_1);

const _descriptor_15 = new __compactRuntime.CompactTypeVector(3, _descriptor_11);

const _descriptor_16 = new __compactRuntime.CompactTypeVector(2, _descriptor_11);

const _descriptor_17 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_18 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1)
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object')
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    this.witnesses = witnesses_0;
    this.circuits = {
      deposit: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`deposit: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const coin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('deposit',
                                      'argument 1 (as invoked from Typescript)',
                                      'contract/crosschain.compact line 33, char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0 && coin_0.value <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('deposit',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'contract/crosschain.compact line 33, char 1',
                                      'struct CoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211455>>',
                                      coin_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_7.toValue(coin_0),
            alignment: _descriptor_7.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_deposit_0(context, partialProofData, coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      withdraw: (...args_1) => {
        if (args_1.length !== 1)
          throw new __compactRuntime.CompactError(`withdraw: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('withdraw',
                                      'argument 1 (as invoked from Typescript)',
                                      'contract/crosschain.compact line 39, char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_withdraw_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      mint: (...args_1) => {
        if (args_1.length !== 4)
          throw new __compactRuntime.CompactError(`mint: expected 4 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const domainSep_0 = args_1[1];
        const amount_0 = args_1[2];
        const recipient_0 = args_1[3];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('mint',
                                      'argument 1 (as invoked from Typescript)',
                                      'contract/crosschain.compact line 43, char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(domainSep_0.buffer instanceof ArrayBuffer && domainSep_0.BYTES_PER_ELEMENT === 1 && domainSep_0.length === 32))
          __compactRuntime.type_error('mint',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'contract/crosschain.compact line 43, char 1',
                                      'Bytes<32>',
                                      domainSep_0)
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0 && amount_0 <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('mint',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'contract/crosschain.compact line 43, char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      amount_0)
        if (!(typeof(recipient_0) === 'object' && recipient_0.bytes.buffer instanceof ArrayBuffer && recipient_0.bytes.BYTES_PER_ELEMENT === 1 && recipient_0.bytes.length === 32))
          __compactRuntime.type_error('mint',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'contract/crosschain.compact line 43, char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      recipient_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(domainSep_0).concat(_descriptor_6.toValue(amount_0).concat(_descriptor_2.toValue(recipient_0))),
            alignment: _descriptor_1.alignment().concat(_descriptor_6.alignment().concat(_descriptor_2.alignment()))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_mint_0(context,
                                       partialProofData,
                                       domainSep_0,
                                       amount_0,
                                       recipient_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      burn: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`burn: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const coin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('burn',
                                      'argument 1 (as invoked from Typescript)',
                                      'contract/crosschain.compact line 53, char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0 && coin_0.value <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('burn',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'contract/crosschain.compact line 53, char 1',
                                      'struct CoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211455>>',
                                      coin_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_7.toValue(coin_0),
            alignment: _descriptor_7.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_burn_0(context, partialProofData, coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      burnAddress: (...args_1) => {
        if (args_1.length !== 1)
          throw new __compactRuntime.CompactError(`burnAddress: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('burnAddress',
                                      'argument 1 (as invoked from Typescript)',
                                      'contract/crosschain.compact line 61, char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_burnAddress_0(context, partialProofData);
        partialProofData.output = { value: _descriptor_4.toValue(result_0), alignment: _descriptor_4.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      deposit: this.circuits.deposit,
      withdraw: this.circuits.withdraw,
      mint: this.circuits.mint,
      burn: this.circuits.burn
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 1)
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    const constructorContext_0 = args_0[0];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(__compactRuntime.StateValue.newNull());
    state_0.data = stateValue_0;
    state_0.setOperation('deposit', new __compactRuntime.ContractOperation());
    state_0.setOperation('withdraw', new __compactRuntime.ContractOperation());
    state_0.setOperation('mint', new __compactRuntime.ContractOperation());
    state_0.setOperation('burn', new __compactRuntime.ContractOperation());
    const context = {
      originalState: state_0,
      currentPrivateState: constructorContext_0.initialPrivateState,
      currentZswapLocalState: constructorContext_0.initialZswapLocalState,
      transactionContext: new __compactRuntime.QueryContext(state_0.data, __compactRuntime.dummyContractAddress())
    };
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(0n),
                                                                            alignment: _descriptor_18.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(0n),
                                                                            alignment: _descriptor_5.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(1n),
                                                                            alignment: _descriptor_18.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue({ nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n, mt_index: 0n }),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } }]);
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_18.toValue(0n),
                                                alignment: _descriptor_18.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_17.toValue(tmp_0),
                                              alignment: _descriptor_17.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 1 } }]);
    state_0.data = context.transactionContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  #_some_0(context, partialProofData, value_0) {
    return { is_some: true, value: value_0 };
  }
  #_none_0(context, partialProofData) {
    return { is_some: false,
             value:
               { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n } };
  }
  #_left_0(context, partialProofData, value_0) {
    return { is_left: true, left: value_0, right: { bytes: new Uint8Array(32) } };
  }
  #_right_0(context, partialProofData, value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  #_transient_hash_0(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_15, value_0);
    return result_0;
  }
  #_transient_hash_1(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_16, value_0);
    return result_0;
  }
  #_persistent_hash_0(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_13, value_0);
    return result_0;
  }
  #_persistent_commit_0(context, partialProofData, value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_14,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  #_degrade_to_transient_0(context, partialProofData, x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  #_upgrade_from_transient_0(context, partialProofData, x_0) {
    const result_0 = __compactRuntime.upgradeFromTransient(x_0);
    return result_0;
  }
  #_own_public_key_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  #_create_zswap_input_0(context, partialProofData, coin_0) {
    const result_0 = __compactRuntime.createZswapInput(context, coin_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  #_create_zswap_output_0(context, partialProofData, coin_0, recipient_0) {
    const result_0 = __compactRuntime.createZswapOutput(context,
                                                        coin_0,
                                                        recipient_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  #_token_type_0(context, partialProofData, domain_sep_0, contract_address_0) {
    return this.#_persistent_commit_0(context,
                                      partialProofData,
                                      [domain_sep_0, contract_address_0.bytes],
                                      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 100, 101, 114, 105, 118, 101, 95, 116, 111, 107, 101, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  }
  #_mint_token_0(context,
                 partialProofData,
                 domain_sep_0,
                 value_0,
                 nonce_0,
                 recipient_0)
  {
    const coin_0 = { nonce: nonce_0,
                     color:
                       this.#_token_type_0(context,
                                           partialProofData,
                                           domain_sep_0,
                                           _descriptor_3.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 2 } },
                                                                                    { idx: { cached: true,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_18.toValue(0n),
                                                                                                               alignment: _descriptor_18.alignment() } }] } },
                                                                                    { popeq: { cached: true,
                                                                                               result: undefined } }]).value)),
                     value: value_0 };
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_18.toValue(4n),
                                                alignment: _descriptor_18.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(domain_sep_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { dup: { n: 1 } },
                     { dup: { n: 1 } },
                     'member',
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(value_0),
                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                     { swap: { n: 0 } },
                     'neg',
                     { branch: { skip: 4 } },
                     { dup: { n: 2 } },
                     { dup: { n: 2 } },
                     { idx: { cached: true,
                              pushPath: false,
                              path: [ { tag: 'stack' }] } },
                     'add',
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    this.#_create_zswap_output_0(context, partialProofData, coin_0, recipient_0);
    const cm_0 = this.#_coin_commitment_0(context,
                                          partialProofData,
                                          coin_0,
                                          recipient_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_18.toValue(2n),
                                                alignment: _descriptor_18.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(cm_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    return coin_0;
  }
  #_evolve_nonce_0(context, partialProofData, index_0, nonce_0) {
    return this.#_upgrade_from_transient_0(context,
                                           partialProofData,
                                           this.#_transient_hash_0(context,
                                                                   partialProofData,
                                                                   [__compactRuntime.convert_Uint8Array_to_bigint(28,
                                                                                                                  new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101])),
                                                                    index_0,
                                                                    this.#_degrade_to_transient_0(context,
                                                                                                  partialProofData,
                                                                                                  nonce_0)]));
  }
  #_burn_address_0(context, partialProofData) {
    return this.#_left_0(context,
                         partialProofData,
                         { bytes: new Uint8Array(32) });
  }
  #_receive_0(context, partialProofData, coin_0) {
    const recipient_0 = this.#_right_0(context,
                                       partialProofData,
                                       _descriptor_3.fromValue(Contract._query(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 2 } },
                                                                                { idx: { cached: true,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_18.toValue(0n),
                                                                                                           alignment: _descriptor_18.alignment() } }] } },
                                                                                { popeq: { cached: true,
                                                                                           result: undefined } }]).value));
    this.#_create_zswap_output_0(context, partialProofData, coin_0, recipient_0);
    const tmp_0 = this.#_coin_commitment_0(context,
                                           partialProofData,
                                           coin_0,
                                           recipient_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_18.toValue(1n),
                                                alignment: _descriptor_18.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    return [];
  }
  #_send_0(context, partialProofData, input_0, recipient_0, value_0) {
    const self_addr_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 2 } },
                                                                 { idx: { cached: true,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_18.toValue(0n),
                                                                                            alignment: _descriptor_18.alignment() } }] } },
                                                                 { popeq: { cached: true,
                                                                            result: undefined } }]).value);
    this.#_create_zswap_input_0(context, partialProofData, input_0);
    const tmp_0 = this.#_coin_nullifier_0(context,
                                          partialProofData,
                                          this.#_downcast_qualified_coin_0(context,
                                                                           partialProofData,
                                                                           input_0),
                                          self_addr_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_18.toValue(0n),
                                                alignment: _descriptor_18.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    let t_0;
    const change_0 = (t_0 = input_0.value,
                      (__compactRuntime.assert(!(t_0 < value_0),
                                               'result of subtraction would be negative'),
                       t_0 - value_0));
    const output_0 = { nonce:
                         this.#_upgrade_from_transient_0(context,
                                                         partialProofData,
                                                         this.#_transient_hash_1(context,
                                                                                 partialProofData,
                                                                                 [__compactRuntime.convert_Uint8Array_to_bigint(28,
                                                                                                                                new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101])),
                                                                                  this.#_degrade_to_transient_0(context,
                                                                                                                partialProofData,
                                                                                                                input_0.nonce)])),
                       color: input_0.color,
                       value: value_0 };
    this.#_create_zswap_output_0(context,
                                 partialProofData,
                                 output_0,
                                 recipient_0);
    const tmp_1 = this.#_coin_commitment_0(context,
                                           partialProofData,
                                           output_0,
                                           recipient_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_18.toValue(2n),
                                                alignment: _descriptor_18.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_1),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    if (this.#_equal_0(change_0, 0n)) {
      return { change: this.#_none_0(context, partialProofData), sent: output_0 };
    } else {
      const change_coin_0 = { nonce:
                                this.#_upgrade_from_transient_0(context,
                                                                partialProofData,
                                                                this.#_transient_hash_1(context,
                                                                                        partialProofData,
                                                                                        [__compactRuntime.convert_Uint8Array_to_bigint(30,
                                                                                                                                       new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101, 47, 50])),
                                                                                         this.#_degrade_to_transient_0(context,
                                                                                                                       partialProofData,
                                                                                                                       input_0.nonce)])),
                              color: input_0.color,
                              value: change_0 };
      this.#_create_zswap_output_0(context,
                                   partialProofData,
                                   change_coin_0,
                                   this.#_right_0(context,
                                                  partialProofData,
                                                  self_addr_0));
      const cm_0 = this.#_coin_commitment_0(context,
                                            partialProofData,
                                            change_coin_0,
                                            this.#_right_0(context,
                                                           partialProofData,
                                                           self_addr_0));
      Contract._query(context,
                      partialProofData,
                      [
                       { swap: { n: 0 } },
                       { idx: { cached: true,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_18.toValue(2n),
                                                  alignment: _descriptor_18.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(cm_0),
                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newNull().encode() } },
                       { ins: { cached: true, n: 2 } },
                       { swap: { n: 0 } }]);
      Contract._query(context,
                      partialProofData,
                      [
                       { swap: { n: 0 } },
                       { idx: { cached: true,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_18.toValue(1n),
                                                  alignment: _descriptor_18.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(cm_0),
                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newNull().encode() } },
                       { ins: { cached: true, n: 2 } },
                       { swap: { n: 0 } }]);
      return { change: this.#_some_0(context, partialProofData, change_coin_0),
               sent: output_0 };
    }
  }
  #_send_immediate_0(context, partialProofData, input_0, target_0, value_0) {
    return this.#_send_0(context,
                         partialProofData,
                         this.#_upcast_qualified_coin_0(context,
                                                        partialProofData,
                                                        input_0),
                         target_0,
                         value_0);
  }
  #_downcast_qualified_coin_0(context, partialProofData, coin_0) {
    return { nonce: coin_0.nonce, color: coin_0.color, value: coin_0.value };
  }
  #_upcast_qualified_coin_0(context, partialProofData, coin_0) {
    return { nonce: coin_0.nonce,
             color: coin_0.color,
             value: coin_0.value,
             mt_index: 0n };
  }
  #_coin_commitment_0(context, partialProofData, coin_0, recipient_0) {
    return this.#_persistent_hash_0(context,
                                    partialProofData,
                                    { info: coin_0,
                                      data_type: recipient_0.is_left,
                                      data:
                                        recipient_0.is_left?
                                        recipient_0.left.bytes :
                                        recipient_0.right.bytes,
                                      domain_sep:
                                        new Uint8Array([109, 100, 110, 58, 99, 99]) });
  }
  #_coin_nullifier_0(context, partialProofData, coin_0, addr_0) {
    return this.#_persistent_hash_0(context,
                                    partialProofData,
                                    { info: coin_0,
                                      data_type: false,
                                      data: addr_0.bytes,
                                      domain_sep:
                                        new Uint8Array([109, 100, 110, 58, 99, 110]) });
  }
  #_deposit_0(context, partialProofData, coin_0) {
    this.#_receive_0(context, partialProofData, coin_0);
    const tmp_0 = this.#_right_0(context,
                                 partialProofData,
                                 _descriptor_3.fromValue(Contract._query(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 2 } },
                                                                          { idx: { cached: true,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_18.toValue(0n),
                                                                                                     alignment: _descriptor_18.alignment() } }] } },
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value));
    Contract._query(context,
                    partialProofData,
                    [
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(1n),
                                                                            alignment: _descriptor_18.alignment() }).encode() } },
                     { dup: { n: 3 } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell(__compactRuntime.coinCommitment(
                                                                            { value: _descriptor_7.toValue(coin_0),
                                                                              alignment: _descriptor_7.alignment() },
                                                                            { value: _descriptor_4.toValue(tmp_0),
                                                                              alignment: _descriptor_4.alignment() }
                                                                          )).encode() } },
                     { idx: { cached: true,
                              pushPath: false,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_18.toValue(1n),
                                                alignment: _descriptor_18.alignment() } },
                                     { tag: 'stack' }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(coin_0),
                                                                            alignment: _descriptor_7.alignment() }).encode() } },
                     { swap: { n: 0 } },
                     { concat: { cached: true, n: 91 } },
                     { ins: { cached: false, n: 1 } }]);
    return [];
  }
  #_withdraw_0(context, partialProofData) {
    this.#_send_0(context,
                  partialProofData,
                  _descriptor_8.fromValue(Contract._query(context,
                                                          partialProofData,
                                                          [
                                                           { dup: { n: 0 } },
                                                           { idx: { cached: false,
                                                                    pushPath: false,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_18.toValue(1n),
                                                                                      alignment: _descriptor_18.alignment() } }] } },
                                                           { popeq: { cached: false,
                                                                      result: undefined } }]).value),
                  this.#_left_0(context,
                                partialProofData,
                                this.#_own_public_key_0(context,
                                                        partialProofData)),
                  _descriptor_8.fromValue(Contract._query(context,
                                                          partialProofData,
                                                          [
                                                           { dup: { n: 0 } },
                                                           { idx: { cached: false,
                                                                    pushPath: false,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_18.toValue(1n),
                                                                                      alignment: _descriptor_18.alignment() } }] } },
                                                           { popeq: { cached: false,
                                                                      result: undefined } }]).value).value);
    return [];
  }
  #_mint_0(context, partialProofData, domainSep_0, amount_0, recipient_0) {
    const toAddr_0 = this.#_left_0(context, partialProofData, recipient_0);
    this.#_mint_token_0(context,
                        partialProofData,
                        domainSep_0,
                        amount_0,
                        this.#_evolve_nonce_0(context,
                                              partialProofData,
                                              _descriptor_5.fromValue(Contract._query(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_18.toValue(0n),
                                                                                                                  alignment: _descriptor_18.alignment() } }] } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                                              domainSep_0),
                        toAddr_0);
    return [];
  }
  #_burn_0(context, partialProofData, coin_0) {
    const burnAddr_0 = this.#_burn_address_0(context, partialProofData);
    this.#_receive_0(context, partialProofData, coin_0);
    this.#_send_immediate_0(context,
                            partialProofData,
                            coin_0,
                            burnAddr_0,
                            coin_0.value);
    return [];
  }
  #_burnAddress_0(context, partialProofData) {
    return this.#_burn_address_0(context, partialProofData);
  }
  #_equal_0(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  static _query(context, partialProofData, prog) {
    var res;
    try {
      res = context.transactionContext.query(prog, __compactRuntime.CostModel.dummyCostModel());
    } catch (err) {
      throw new __compactRuntime.CompactError(err.toString());
    }
    context.transactionContext = res.context;
    var reads = res.events.filter((e) => e.tag === 'read');
    var i = 0;
    partialProofData.publicTranscript = partialProofData.publicTranscript.concat(prog.map((op) => {
      if(typeof(op) === 'object' && 'popeq' in op) {
        return { popeq: {
          ...op.popeq,
          result: reads[i++].content,
        } };
      } else {
        return op;
      }
    }));
    if(res.events.length == 1 && res.events[0].tag === 'read') {
      return res.events[0].content;
    } else {
      return res.events;
    }
  }
}
function ledger(state) {
  const context = {
    originalState: state,
    transactionContext: new __compactRuntime.QueryContext(state, __compactRuntime.dummyContractAddress())
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get round() {
      return _descriptor_5.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_18.toValue(0n),
                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }]).value);
    },
    get treasury() {
      return _descriptor_8.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_18.toValue(1n),
                                                                                 alignment: _descriptor_18.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  originalState: new __compactRuntime.ContractState(),
  transactionContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
const pureCircuits = {
  burnAddress: (...args_0) => _dummyContract.circuits.burnAddress(_emptyContext, ...args_0).result
};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
