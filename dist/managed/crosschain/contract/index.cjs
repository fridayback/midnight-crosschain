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

var ProposalType;
(function (ProposalType) {
  ProposalType[ProposalType['AddAdmin'] = 0] = 'AddAdmin';
  ProposalType[ProposalType['RemoveAdmin'] = 1] = 'RemoveAdmin';
  ProposalType[ProposalType['UpdateFeeReceiver'] = 2] = 'UpdateFeeReceiver';
  ProposalType[ProposalType['UpdateTokenManager'] = 3] = 'UpdateTokenManager';
  ProposalType[ProposalType['UpdateAdminThreshold'] = 4] = 'UpdateAdminThreshold';
  ProposalType[ProposalType['UpdateSMGPKThreshold'] = 5] = 'UpdateSMGPKThreshold';
  ProposalType[ProposalType['UpdateFeeCommonConfig'] = 6] = 'UpdateFeeCommonConfig';
  ProposalType[ProposalType['SetSmgPKS'] = 7] = 'SetSmgPKS';
})(ProposalType = exports.ProposalType || (exports.ProposalType = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

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

const _descriptor_3 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_4 = new __compactRuntime.CompactTypeEnum(7, 1);

const _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _FeeConfig_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_5.alignment());
  }
  fromValue(value_0) {
    return {
      chainId: _descriptor_0.fromValue(value_0),
      fee: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.chainId).concat(_descriptor_5.toValue(value_0.fee));
  }
}

const _descriptor_6 = new _FeeConfig_0();

const _descriptor_7 = new __compactRuntime.CompactTypeField();

class _CurvePoint_0 {
  alignment() {
    return _descriptor_7.alignment().concat(_descriptor_7.alignment());
  }
  fromValue(value_0) {
    return {
      x: _descriptor_7.fromValue(value_0),
      y: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_7.toValue(value_0.x).concat(_descriptor_7.toValue(value_0.y));
  }
}

const _descriptor_8 = new _CurvePoint_0();

const _descriptor_9 = new __compactRuntime.CompactTypeVector(29, _descriptor_8);

class _Proposal_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_2.alignment().concat(_descriptor_5.alignment().concat(_descriptor_6.alignment().concat(_descriptor_9.alignment()))));
  }
  fromValue(value_0) {
    return {
      type: _descriptor_4.fromValue(value_0),
      addr: _descriptor_2.fromValue(value_0),
      threshold: _descriptor_5.fromValue(value_0),
      feeConfig: _descriptor_6.fromValue(value_0),
      smgPubkeys: _descriptor_9.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.type).concat(_descriptor_2.toValue(value_0.addr).concat(_descriptor_5.toValue(value_0.threshold).concat(_descriptor_6.toValue(value_0.feeConfig).concat(_descriptor_9.toValue(value_0.smgPubkeys)))));
  }
}

const _descriptor_10 = new _Proposal_0();

const _descriptor_11 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

class _TokenPairInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment())));
  }
  fromValue(value_0) {
    return {
      fromChainId: _descriptor_0.fromValue(value_0),
      toChainId: _descriptor_0.fromValue(value_0),
      midnigthTokenAccount: _descriptor_1.fromValue(value_0),
      fee: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.fromChainId).concat(_descriptor_0.toValue(value_0.toChainId).concat(_descriptor_1.toValue(value_0.midnigthTokenAccount).concat(_descriptor_5.toValue(value_0.fee))));
  }
}

const _descriptor_12 = new _TokenPairInfo_0();

const _descriptor_13 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

const _descriptor_14 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_15 = new __compactRuntime.CompactTypeVector(4, _descriptor_5);

class _QualifiedCoinInfo_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment().concat(_descriptor_11.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_1.fromValue(value_0),
      color: _descriptor_1.fromValue(value_0),
      value: _descriptor_5.fromValue(value_0),
      mt_index: _descriptor_11.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.nonce).concat(_descriptor_1.toValue(value_0.color).concat(_descriptor_5.toValue(value_0.value).concat(_descriptor_11.toValue(value_0.mt_index))));
  }
}

const _descriptor_16 = new _QualifiedCoinInfo_0();

class _CoinInfo_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_1.fromValue(value_0),
      color: _descriptor_1.fromValue(value_0),
      value: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.nonce).concat(_descriptor_1.toValue(value_0.color).concat(_descriptor_5.toValue(value_0.value)));
  }
}

const _descriptor_17 = new _CoinInfo_0();

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

const _descriptor_18 = new _ContractAddress_0();

class _Either_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_18.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_3.fromValue(value_0),
      left: _descriptor_2.fromValue(value_0),
      right: _descriptor_18.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.is_left).concat(_descriptor_2.toValue(value_0.left).concat(_descriptor_18.toValue(value_0.right)));
  }
}

const _descriptor_19 = new _Either_0();

class _Maybe_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_15.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_3.fromValue(value_0),
      value: _descriptor_15.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.is_some).concat(_descriptor_15.toValue(value_0.value));
  }
}

const _descriptor_20 = new _Maybe_0();

const _descriptor_21 = new __compactRuntime.CompactTypeVector(29, _descriptor_14);

class _ProofData_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_2.alignment().concat(_descriptor_20.alignment().concat(_descriptor_21.alignment().concat(_descriptor_5.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_1.fromValue(value_0),
      uniqueId: _descriptor_1.fromValue(value_0),
      tokenPairId: _descriptor_0.fromValue(value_0),
      amount: _descriptor_5.fromValue(value_0),
      fee: _descriptor_5.fromValue(value_0),
      toAddr: _descriptor_2.fromValue(value_0),
      coins: _descriptor_20.fromValue(value_0),
      signers: _descriptor_21.fromValue(value_0),
      ttl: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.smgId).concat(_descriptor_1.toValue(value_0.uniqueId).concat(_descriptor_0.toValue(value_0.tokenPairId).concat(_descriptor_5.toValue(value_0.amount).concat(_descriptor_5.toValue(value_0.fee).concat(_descriptor_2.toValue(value_0.toAddr).concat(_descriptor_20.toValue(value_0.coins).concat(_descriptor_21.toValue(value_0.signers).concat(_descriptor_5.toValue(value_0.ttl)))))))));
  }
}

const _descriptor_22 = new _ProofData_0();

const _descriptor_23 = new __compactRuntime.CompactTypeOpaqueString();

class _CrossOutBound_0 {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_23.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment()))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_1.fromValue(value_0),
      fromAddr: _descriptor_2.fromValue(value_0),
      toAddr: _descriptor_23.fromValue(value_0),
      tokenPairId: _descriptor_0.fromValue(value_0),
      amount: _descriptor_5.fromValue(value_0),
      fee: _descriptor_5.fromValue(value_0),
      nonce: _descriptor_5.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.smgId).concat(_descriptor_2.toValue(value_0.fromAddr).concat(_descriptor_23.toValue(value_0.toAddr).concat(_descriptor_0.toValue(value_0.tokenPairId).concat(_descriptor_5.toValue(value_0.amount).concat(_descriptor_5.toValue(value_0.fee).concat(_descriptor_5.toValue(value_0.nonce)))))));
  }
}

const _descriptor_24 = new _CrossOutBound_0();

class _Maybe_1 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_17.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_3.fromValue(value_0),
      value: _descriptor_17.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.is_some).concat(_descriptor_17.toValue(value_0.value));
  }
}

const _descriptor_25 = new _Maybe_1();

class _SendResult_0 {
  alignment() {
    return _descriptor_25.alignment().concat(_descriptor_17.alignment());
  }
  fromValue(value_0) {
    return {
      change: _descriptor_25.fromValue(value_0),
      sent: _descriptor_17.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_25.toValue(value_0.change).concat(_descriptor_17.toValue(value_0.sent));
  }
}

const _descriptor_26 = new _SendResult_0();

const _descriptor_27 = new __compactRuntime.CompactTypeVector(2, _descriptor_1);

const _descriptor_28 = new __compactRuntime.CompactTypeVector(9, _descriptor_1);

const _descriptor_29 = new __compactRuntime.CompactTypeBytes(6);

class _CoinPreimage_0 {
  alignment() {
    return _descriptor_17.alignment().concat(_descriptor_3.alignment().concat(_descriptor_1.alignment().concat(_descriptor_29.alignment())));
  }
  fromValue(value_0) {
    return {
      info: _descriptor_17.fromValue(value_0),
      dataType: _descriptor_3.fromValue(value_0),
      data: _descriptor_1.fromValue(value_0),
      domain_sep: _descriptor_29.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_17.toValue(value_0.info).concat(_descriptor_3.toValue(value_0.dataType).concat(_descriptor_1.toValue(value_0.data).concat(_descriptor_29.toValue(value_0.domain_sep))));
  }
}

const _descriptor_30 = new _CoinPreimage_0();

const _descriptor_31 = new __compactRuntime.CompactTypeVector(3, _descriptor_7);

const _descriptor_32 = new __compactRuntime.CompactTypeVector(2, _descriptor_7);

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
      userLock: (...args_1) => {
        if (args_1.length !== 5)
          throw new __compactRuntime.CompactError(`userLock: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const smgId_0 = args_1[1];
        const toAddr_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('userLock',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 150 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32))
          __compactRuntime.type_error('userLock',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 150 char 1',
                                      'Bytes<32>',
                                      smgId_0)
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0 && tokenPairId_0 <= 4294967295n))
          __compactRuntime.type_error('userLock',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'crosschain.compact line 150 char 1',
                                      'Uint<0..4294967295>',
                                      tokenPairId_0)
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0 && amount_0 <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('userLock',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'crosschain.compact line 150 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      amount_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(smgId_0).concat(_descriptor_23.toValue(toAddr_0).concat(_descriptor_0.toValue(tokenPairId_0).concat(_descriptor_5.toValue(amount_0)))),
            alignment: _descriptor_1.alignment().concat(_descriptor_23.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_userLock_0(context,
                                           partialProofData,
                                           smgId_0,
                                           toAddr_0,
                                           tokenPairId_0,
                                           amount_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      smgRelease: (...args_1) => {
        if (args_1.length !== 12)
          throw new __compactRuntime.CompactError(`smgRelease: expected 12 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const uniqueId_0 = args_1[1];
        const smgId_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        const fee_0 = args_1[5];
        const toAddr_0 = args_1[6];
        const coins_0 = args_1[7];
        const signers_0 = args_1[8];
        const ttl_0 = args_1[9];
        const R_0 = args_1[10];
        const s_0 = args_1[11];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('smgRelease',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32))
          __compactRuntime.type_error('smgRelease',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'Bytes<32>',
                                      uniqueId_0)
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32))
          __compactRuntime.type_error('smgRelease',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'Bytes<32>',
                                      smgId_0)
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0 && tokenPairId_0 <= 4294967295n))
          __compactRuntime.type_error('smgRelease',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'Uint<0..4294967295>',
                                      tokenPairId_0)
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0 && amount_0 <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('smgRelease',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      amount_0)
        if (!(typeof(fee_0) === 'bigint' && fee_0 >= 0 && fee_0 <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('smgRelease',
                                      'argument 5 (argument 6 as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      fee_0)
        if (!(typeof(toAddr_0) === 'object' && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32))
          __compactRuntime.type_error('smgRelease',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      toAddr_0)
        if (!(Array.isArray(coins_0) && coins_0.length === 4 && coins_0.every((t) => typeof(t) === 'bigint' && t >= 0 && t <= 340282366920938463463374607431768211455n)))
          __compactRuntime.type_error('smgRelease',
                                      'argument 7 (argument 8 as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'Vector<4, Uint<0..340282366920938463463374607431768211455>>',
                                      coins_0)
        if (!(Array.isArray(signers_0) && signers_0.length === 29 && signers_0.every((t) => typeof(t) === 'bigint' && t >= 0 && t <= 255n)))
          __compactRuntime.type_error('smgRelease',
                                      'argument 8 (argument 9 as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'Vector<29, Uint<0..255>>',
                                      signers_0)
        if (!(typeof(ttl_0) === 'bigint' && ttl_0 >= 0 && ttl_0 <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('smgRelease',
                                      'argument 9 (argument 10 as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      ttl_0)
        if (!(typeof(R_0) === 'object' && typeof(R_0.x) === 'bigint' && R_0.x >= 0 && R_0.x <= __compactRuntime.MAX_FIELD && typeof(R_0.y) === 'bigint' && R_0.y >= 0 && R_0.y <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('smgRelease',
                                      'argument 10 (argument 11 as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'struct CurvePoint<x: Field, y: Field>',
                                      R_0)
        if (!(typeof(s_0) === 'bigint' && s_0 >= 0 && s_0 <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('smgRelease',
                                      'argument 11 (argument 12 as invoked from Typescript)',
                                      'crosschain.compact line 193 char 1',
                                      'Field',
                                      s_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(uniqueId_0).concat(_descriptor_1.toValue(smgId_0).concat(_descriptor_0.toValue(tokenPairId_0).concat(_descriptor_5.toValue(amount_0).concat(_descriptor_5.toValue(fee_0).concat(_descriptor_2.toValue(toAddr_0).concat(_descriptor_15.toValue(coins_0).concat(_descriptor_21.toValue(signers_0).concat(_descriptor_5.toValue(ttl_0).concat(_descriptor_8.toValue(R_0).concat(_descriptor_7.toValue(s_0))))))))))),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_2.alignment().concat(_descriptor_15.alignment().concat(_descriptor_21.alignment().concat(_descriptor_5.alignment().concat(_descriptor_8.alignment().concat(_descriptor_7.alignment()))))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_smgRelease_0(context,
                                             partialProofData,
                                             uniqueId_0,
                                             smgId_0,
                                             tokenPairId_0,
                                             amount_0,
                                             fee_0,
                                             toAddr_0,
                                             coins_0,
                                             signers_0,
                                             ttl_0,
                                             R_0,
                                             s_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      userBurn: (...args_1) => {
        if (args_1.length !== 5)
          throw new __compactRuntime.CompactError(`userBurn: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const smgId_0 = args_1[1];
        const toAddr_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('userBurn',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 246 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32))
          __compactRuntime.type_error('userBurn',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 246 char 1',
                                      'Bytes<32>',
                                      smgId_0)
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0 && tokenPairId_0 <= 4294967295n))
          __compactRuntime.type_error('userBurn',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'crosschain.compact line 246 char 1',
                                      'Uint<0..4294967295>',
                                      tokenPairId_0)
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0 && amount_0 <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('userBurn',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'crosschain.compact line 246 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      amount_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(smgId_0).concat(_descriptor_23.toValue(toAddr_0).concat(_descriptor_0.toValue(tokenPairId_0).concat(_descriptor_5.toValue(amount_0)))),
            alignment: _descriptor_1.alignment().concat(_descriptor_23.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_userBurn_0(context,
                                           partialProofData,
                                           smgId_0,
                                           toAddr_0,
                                           tokenPairId_0,
                                           amount_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      smgMint: (...args_1) => {
        if (args_1.length !== 11)
          throw new __compactRuntime.CompactError(`smgMint: expected 11 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const uniqueId_0 = args_1[1];
        const smgId_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        const fee_0 = args_1[5];
        const toAddr_0 = args_1[6];
        const signers_0 = args_1[7];
        const ttl_0 = args_1[8];
        const R_0 = args_1[9];
        const s_0 = args_1[10];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('smgMint',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 289 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32))
          __compactRuntime.type_error('smgMint',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 289 char 1',
                                      'Bytes<32>',
                                      uniqueId_0)
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32))
          __compactRuntime.type_error('smgMint',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 289 char 1',
                                      'Bytes<32>',
                                      smgId_0)
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0 && tokenPairId_0 <= 4294967295n))
          __compactRuntime.type_error('smgMint',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'crosschain.compact line 289 char 1',
                                      'Uint<0..4294967295>',
                                      tokenPairId_0)
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0 && amount_0 <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('smgMint',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'crosschain.compact line 289 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      amount_0)
        if (!(typeof(fee_0) === 'bigint' && fee_0 >= 0 && fee_0 <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('smgMint',
                                      'argument 5 (argument 6 as invoked from Typescript)',
                                      'crosschain.compact line 289 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      fee_0)
        if (!(typeof(toAddr_0) === 'object' && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32))
          __compactRuntime.type_error('smgMint',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'crosschain.compact line 289 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      toAddr_0)
        if (!(Array.isArray(signers_0) && signers_0.length === 29 && signers_0.every((t) => typeof(t) === 'bigint' && t >= 0 && t <= 255n)))
          __compactRuntime.type_error('smgMint',
                                      'argument 7 (argument 8 as invoked from Typescript)',
                                      'crosschain.compact line 289 char 1',
                                      'Vector<29, Uint<0..255>>',
                                      signers_0)
        if (!(typeof(ttl_0) === 'bigint' && ttl_0 >= 0 && ttl_0 <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('smgMint',
                                      'argument 8 (argument 9 as invoked from Typescript)',
                                      'crosschain.compact line 289 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      ttl_0)
        if (!(typeof(R_0) === 'object' && typeof(R_0.x) === 'bigint' && R_0.x >= 0 && R_0.x <= __compactRuntime.MAX_FIELD && typeof(R_0.y) === 'bigint' && R_0.y >= 0 && R_0.y <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('smgMint',
                                      'argument 9 (argument 10 as invoked from Typescript)',
                                      'crosschain.compact line 289 char 1',
                                      'struct CurvePoint<x: Field, y: Field>',
                                      R_0)
        if (!(typeof(s_0) === 'bigint' && s_0 >= 0 && s_0 <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('smgMint',
                                      'argument 10 (argument 11 as invoked from Typescript)',
                                      'crosschain.compact line 289 char 1',
                                      'Field',
                                      s_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(uniqueId_0).concat(_descriptor_1.toValue(smgId_0).concat(_descriptor_0.toValue(tokenPairId_0).concat(_descriptor_5.toValue(amount_0).concat(_descriptor_5.toValue(fee_0).concat(_descriptor_2.toValue(toAddr_0).concat(_descriptor_21.toValue(signers_0).concat(_descriptor_5.toValue(ttl_0).concat(_descriptor_8.toValue(R_0).concat(_descriptor_7.toValue(s_0)))))))))),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_2.alignment().concat(_descriptor_21.alignment().concat(_descriptor_5.alignment().concat(_descriptor_8.alignment().concat(_descriptor_7.alignment())))))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_smgMint_0(context,
                                          partialProofData,
                                          uniqueId_0,
                                          smgId_0,
                                          tokenPairId_0,
                                          amount_0,
                                          fee_0,
                                          toAddr_0,
                                          signers_0,
                                          ttl_0,
                                          R_0,
                                          s_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      verifySignature: (...args_1) => {
        if (args_1.length !== 5)
          throw new __compactRuntime.CompactError(`verifySignature: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const hash_0 = args_1[1];
        const P_0 = args_1[2];
        const R_0 = args_1[3];
        const s_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('verifySignature',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 341 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(hash_0.buffer instanceof ArrayBuffer && hash_0.BYTES_PER_ELEMENT === 1 && hash_0.length === 32))
          __compactRuntime.type_error('verifySignature',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 341 char 1',
                                      'Bytes<32>',
                                      hash_0)
        if (!(typeof(P_0) === 'object' && typeof(P_0.x) === 'bigint' && P_0.x >= 0 && P_0.x <= __compactRuntime.MAX_FIELD && typeof(P_0.y) === 'bigint' && P_0.y >= 0 && P_0.y <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('verifySignature',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 341 char 1',
                                      'struct CurvePoint<x: Field, y: Field>',
                                      P_0)
        if (!(typeof(R_0) === 'object' && typeof(R_0.x) === 'bigint' && R_0.x >= 0 && R_0.x <= __compactRuntime.MAX_FIELD && typeof(R_0.y) === 'bigint' && R_0.y >= 0 && R_0.y <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('verifySignature',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'crosschain.compact line 341 char 1',
                                      'struct CurvePoint<x: Field, y: Field>',
                                      R_0)
        if (!(typeof(s_0) === 'bigint' && s_0 >= 0 && s_0 <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('verifySignature',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'crosschain.compact line 341 char 1',
                                      'Field',
                                      s_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(hash_0).concat(_descriptor_8.toValue(P_0).concat(_descriptor_8.toValue(R_0).concat(_descriptor_7.toValue(s_0)))),
            alignment: _descriptor_1.alignment().concat(_descriptor_8.alignment().concat(_descriptor_8.alignment().concat(_descriptor_7.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_verifySignature_0(context,
                                                  partialProofData,
                                                  hash_0,
                                                  P_0,
                                                  R_0,
                                                  s_0);
        partialProofData.output = { value: _descriptor_3.toValue(result_0), alignment: _descriptor_3.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      hashProof: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`hashProof: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const proof_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('hashProof',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 358 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(proof_0) === 'object' && proof_0.smgId.buffer instanceof ArrayBuffer && proof_0.smgId.BYTES_PER_ELEMENT === 1 && proof_0.smgId.length === 32 && proof_0.uniqueId.buffer instanceof ArrayBuffer && proof_0.uniqueId.BYTES_PER_ELEMENT === 1 && proof_0.uniqueId.length === 32 && typeof(proof_0.tokenPairId) === 'bigint' && proof_0.tokenPairId >= 0 && proof_0.tokenPairId <= 4294967295n && typeof(proof_0.amount) === 'bigint' && proof_0.amount >= 0 && proof_0.amount <= 340282366920938463463374607431768211455n && typeof(proof_0.fee) === 'bigint' && proof_0.fee >= 0 && proof_0.fee <= 340282366920938463463374607431768211455n && typeof(proof_0.toAddr) === 'object' && proof_0.toAddr.bytes.buffer instanceof ArrayBuffer && proof_0.toAddr.bytes.BYTES_PER_ELEMENT === 1 && proof_0.toAddr.bytes.length === 32 && typeof(proof_0.coins) === 'object' && typeof(proof_0.coins.is_some) === 'boolean' && Array.isArray(proof_0.coins.value) && proof_0.coins.value.length === 4 && proof_0.coins.value.every((t) => typeof(t) === 'bigint' && t >= 0 && t <= 340282366920938463463374607431768211455n) && Array.isArray(proof_0.signers) && proof_0.signers.length === 29 && proof_0.signers.every((t) => typeof(t) === 'bigint' && t >= 0 && t <= 255n) && typeof(proof_0.ttl) === 'bigint' && proof_0.ttl >= 0 && proof_0.ttl <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('hashProof',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 358 char 1',
                                      'struct ProofData<smgId: Bytes<32>, uniqueId: Bytes<32>, tokenPairId: Uint<0..4294967295>, amount: Uint<0..340282366920938463463374607431768211455>, fee: Uint<0..340282366920938463463374607431768211455>, toAddr: struct ZswapCoinPublicKey<bytes: Bytes<32>>, coins: struct Maybe<is_some: Boolean, value: Vector<4, Uint<0..340282366920938463463374607431768211455>>>, signers: Vector<29, Uint<0..255>>, ttl: Uint<0..340282366920938463463374607431768211455>>',
                                      proof_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_22.toValue(proof_0),
            alignment: _descriptor_22.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_hashProof_0(context, partialProofData, proof_0);
        partialProofData.output = { value: _descriptor_1.toValue(result_0), alignment: _descriptor_1.alignment() };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      transferOwner: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`transferOwner: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const newOwner_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('transferOwner',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 444 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(newOwner_0) === 'object' && newOwner_0.bytes.buffer instanceof ArrayBuffer && newOwner_0.bytes.BYTES_PER_ELEMENT === 1 && newOwner_0.bytes.length === 32))
          __compactRuntime.type_error('transferOwner',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 444 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      newOwner_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(newOwner_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_transferOwner_0(context,
                                                partialProofData,
                                                newOwner_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      acceptOwner: (...args_1) => {
        if (args_1.length !== 1)
          throw new __compactRuntime.CompactError(`acceptOwner: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('acceptOwner',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 449 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_acceptOwner_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setFeeReceiver: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`setFeeReceiver: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const newFeeReceiver_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('setFeeReceiver',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 454 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(newFeeReceiver_0) === 'object' && newFeeReceiver_0.bytes.buffer instanceof ArrayBuffer && newFeeReceiver_0.bytes.BYTES_PER_ELEMENT === 1 && newFeeReceiver_0.bytes.length === 32))
          __compactRuntime.type_error('setFeeReceiver',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 454 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      newFeeReceiver_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(newFeeReceiver_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_setFeeReceiver_0(context,
                                                 partialProofData,
                                                 newFeeReceiver_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setTokenManager: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`setTokenManager: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const newTokenManager_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('setTokenManager',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 459 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(newTokenManager_0) === 'object' && newTokenManager_0.bytes.buffer instanceof ArrayBuffer && newTokenManager_0.bytes.BYTES_PER_ELEMENT === 1 && newTokenManager_0.bytes.length === 32))
          __compactRuntime.type_error('setTokenManager',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 459 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      newTokenManager_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(newTokenManager_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_setTokenManager_0(context,
                                                  partialProofData,
                                                  newTokenManager_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setMegerWorker: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`setMegerWorker: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const newMergeWorker_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('setMegerWorker',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 464 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(newMergeWorker_0) === 'object' && newMergeWorker_0.bytes.buffer instanceof ArrayBuffer && newMergeWorker_0.bytes.BYTES_PER_ELEMENT === 1 && newMergeWorker_0.bytes.length === 32))
          __compactRuntime.type_error('setMegerWorker',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 464 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      newMergeWorker_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(newMergeWorker_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_setMegerWorker_0(context,
                                                 partialProofData,
                                                 newMergeWorker_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      mergeTreasuryCoin: (...args_1) => {
        if (args_1.length !== 3)
          throw new __compactRuntime.CompactError(`mergeTreasuryCoin: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const token_0 = args_1[1];
        const coins_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('mergeTreasuryCoin',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 469 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(token_0.buffer instanceof ArrayBuffer && token_0.BYTES_PER_ELEMENT === 1 && token_0.length === 32))
          __compactRuntime.type_error('mergeTreasuryCoin',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 469 char 1',
                                      'Bytes<32>',
                                      token_0)
        if (!(Array.isArray(coins_0) && coins_0.length === 4 && coins_0.every((t) => typeof(t) === 'bigint' && t >= 0 && t <= 340282366920938463463374607431768211455n)))
          __compactRuntime.type_error('mergeTreasuryCoin',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 469 char 1',
                                      'Vector<4, Uint<0..340282366920938463463374607431768211455>>',
                                      coins_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(token_0).concat(_descriptor_15.toValue(coins_0)),
            alignment: _descriptor_1.alignment().concat(_descriptor_15.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_mergeTreasuryCoin_0(context,
                                                    partialProofData,
                                                    token_0,
                                                    coins_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      addAdmin: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`addAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const admin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('addAdmin',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 475 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(admin_0) === 'object' && admin_0.bytes.buffer instanceof ArrayBuffer && admin_0.bytes.BYTES_PER_ELEMENT === 1 && admin_0.bytes.length === 32))
          __compactRuntime.type_error('addAdmin',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 475 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      admin_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(admin_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_addAdmin_0(context, partialProofData, admin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      removeAdmin: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`removeAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const admin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('removeAdmin',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 481 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(admin_0) === 'object' && admin_0.bytes.buffer instanceof ArrayBuffer && admin_0.bytes.BYTES_PER_ELEMENT === 1 && admin_0.bytes.length === 32))
          __compactRuntime.type_error('removeAdmin',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 481 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      admin_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(admin_0),
            alignment: _descriptor_2.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_removeAdmin_0(context, partialProofData, admin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setAdminThreshold: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`setAdminThreshold: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const threshold_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('setAdminThreshold',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 487 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(threshold_0) === 'bigint' && threshold_0 >= 0 && threshold_0 <= 255n))
          __compactRuntime.type_error('setAdminThreshold',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 487 char 1',
                                      'Uint<0..255>',
                                      threshold_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_14.toValue(threshold_0),
            alignment: _descriptor_14.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_setAdminThreshold_0(context,
                                                    partialProofData,
                                                    threshold_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setSmgPksks: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`setSmgPksks: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const pks_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('setSmgPksks',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 495 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(Array.isArray(pks_0) && pks_0.length === 29 && pks_0.every((t) => typeof(t) === 'object' && typeof(t.x) === 'bigint' && t.x >= 0 && t.x <= __compactRuntime.MAX_FIELD && typeof(t.y) === 'bigint' && t.y >= 0 && t.y <= __compactRuntime.MAX_FIELD)))
          __compactRuntime.type_error('setSmgPksks',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 495 char 1',
                                      'Vector<29, struct CurvePoint<x: Field, y: Field>>',
                                      pks_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_9.toValue(pks_0),
            alignment: _descriptor_9.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_setSmgPksks_0(context, partialProofData, pks_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      updateSmgPk: (...args_1) => {
        if (args_1.length !== 5)
          throw new __compactRuntime.CompactError(`updateSmgPk: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const id_0 = args_1[1];
        const newPk_0 = args_1[2];
        const R_0 = args_1[3];
        const signature_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('updateSmgPk',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 508 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(id_0) === 'bigint' && id_0 >= 0 && id_0 <= 255n))
          __compactRuntime.type_error('updateSmgPk',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 508 char 1',
                                      'Uint<0..255>',
                                      id_0)
        if (!(typeof(newPk_0) === 'object' && typeof(newPk_0.x) === 'bigint' && newPk_0.x >= 0 && newPk_0.x <= __compactRuntime.MAX_FIELD && typeof(newPk_0.y) === 'bigint' && newPk_0.y >= 0 && newPk_0.y <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('updateSmgPk',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 508 char 1',
                                      'struct CurvePoint<x: Field, y: Field>',
                                      newPk_0)
        if (!(typeof(R_0) === 'object' && typeof(R_0.x) === 'bigint' && R_0.x >= 0 && R_0.x <= __compactRuntime.MAX_FIELD && typeof(R_0.y) === 'bigint' && R_0.y >= 0 && R_0.y <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('updateSmgPk',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'crosschain.compact line 508 char 1',
                                      'struct CurvePoint<x: Field, y: Field>',
                                      R_0)
        if (!(typeof(signature_0) === 'bigint' && signature_0 >= 0 && signature_0 <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('updateSmgPk',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'crosschain.compact line 508 char 1',
                                      'Field',
                                      signature_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_14.toValue(id_0).concat(_descriptor_8.toValue(newPk_0).concat(_descriptor_8.toValue(R_0).concat(_descriptor_7.toValue(signature_0)))),
            alignment: _descriptor_14.alignment().concat(_descriptor_8.alignment().concat(_descriptor_8.alignment().concat(_descriptor_7.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_updateSmgPk_0(context,
                                              partialProofData,
                                              id_0,
                                              newPk_0,
                                              R_0,
                                              signature_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setSmgPKThreold: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`setSmgPKThreold: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const threshold_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('setSmgPKThreold',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 523 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(threshold_0) === 'bigint' && threshold_0 >= 0 && threshold_0 <= 255n))
          __compactRuntime.type_error('setSmgPKThreold',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 523 char 1',
                                      'Uint<0..255>',
                                      threshold_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_14.toValue(threshold_0),
            alignment: _descriptor_14.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_setSmgPKThreold_0(context,
                                                  partialProofData,
                                                  threshold_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setFeeCommonConfig: (...args_1) => {
        if (args_1.length !== 3)
          throw new __compactRuntime.CompactError(`setFeeCommonConfig: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const chainId_0 = args_1[1];
        const fee_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('setFeeCommonConfig',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 534 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(chainId_0) === 'bigint' && chainId_0 >= 0 && chainId_0 <= 4294967295n))
          __compactRuntime.type_error('setFeeCommonConfig',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 534 char 1',
                                      'Uint<0..4294967295>',
                                      chainId_0)
        if (!(typeof(fee_0) === 'bigint' && fee_0 >= 0 && fee_0 <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('setFeeCommonConfig',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 534 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      fee_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(chainId_0).concat(_descriptor_5.toValue(fee_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_5.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_setFeeCommonConfig_0(context,
                                                     partialProofData,
                                                     chainId_0,
                                                     fee_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      addTokenPair: (...args_1) => {
        if (args_1.length !== 3)
          throw new __compactRuntime.CompactError(`addTokenPair: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const tokenPairId_0 = args_1[1];
        const pairInfo_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('addTokenPair',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 542 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0 && tokenPairId_0 <= 4294967295n))
          __compactRuntime.type_error('addTokenPair',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 542 char 1',
                                      'Uint<0..4294967295>',
                                      tokenPairId_0)
        if (!(typeof(pairInfo_0) === 'object' && typeof(pairInfo_0.fromChainId) === 'bigint' && pairInfo_0.fromChainId >= 0 && pairInfo_0.fromChainId <= 4294967295n && typeof(pairInfo_0.toChainId) === 'bigint' && pairInfo_0.toChainId >= 0 && pairInfo_0.toChainId <= 4294967295n && pairInfo_0.midnigthTokenAccount.buffer instanceof ArrayBuffer && pairInfo_0.midnigthTokenAccount.BYTES_PER_ELEMENT === 1 && pairInfo_0.midnigthTokenAccount.length === 32 && typeof(pairInfo_0.fee) === 'bigint' && pairInfo_0.fee >= 0 && pairInfo_0.fee <= 340282366920938463463374607431768211455n))
          __compactRuntime.type_error('addTokenPair',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 542 char 1',
                                      'struct TokenPairInfo<fromChainId: Uint<0..4294967295>, toChainId: Uint<0..4294967295>, midnigthTokenAccount: Bytes<32>, fee: Uint<0..340282366920938463463374607431768211455>>',
                                      pairInfo_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenPairId_0).concat(_descriptor_12.toValue(pairInfo_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_12.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_addTokenPair_0(context,
                                               partialProofData,
                                               tokenPairId_0,
                                               pairInfo_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      removeTokenPair: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`removeTokenPair: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const tokenPairId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('removeTokenPair',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 550 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0 && tokenPairId_0 <= 4294967295n))
          __compactRuntime.type_error('removeTokenPair',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 550 char 1',
                                      'Uint<0..4294967295>',
                                      tokenPairId_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenPairId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_removeTokenPair_0(context,
                                                  partialProofData,
                                                  tokenPairId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      newProposal: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`newProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const newProposal_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('newProposal',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 556 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(newProposal_0) === 'object' && typeof(newProposal_0.type) === 'number' && newProposal_0.type >= 0 && newProposal_0.type <= 7 && typeof(newProposal_0.addr) === 'object' && newProposal_0.addr.bytes.buffer instanceof ArrayBuffer && newProposal_0.addr.bytes.BYTES_PER_ELEMENT === 1 && newProposal_0.addr.bytes.length === 32 && typeof(newProposal_0.threshold) === 'bigint' && newProposal_0.threshold >= 0 && newProposal_0.threshold <= 340282366920938463463374607431768211455n && typeof(newProposal_0.feeConfig) === 'object' && typeof(newProposal_0.feeConfig.chainId) === 'bigint' && newProposal_0.feeConfig.chainId >= 0 && newProposal_0.feeConfig.chainId <= 4294967295n && typeof(newProposal_0.feeConfig.fee) === 'bigint' && newProposal_0.feeConfig.fee >= 0 && newProposal_0.feeConfig.fee <= 340282366920938463463374607431768211455n && Array.isArray(newProposal_0.smgPubkeys) && newProposal_0.smgPubkeys.length === 29 && newProposal_0.smgPubkeys.every((t) => typeof(t) === 'object' && typeof(t.x) === 'bigint' && t.x >= 0 && t.x <= __compactRuntime.MAX_FIELD && typeof(t.y) === 'bigint' && t.y >= 0 && t.y <= __compactRuntime.MAX_FIELD)))
          __compactRuntime.type_error('newProposal',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 556 char 1',
                                      'struct Proposal<type: Enum<ProposalType, AddAdmin, RemoveAdmin, UpdateFeeReceiver, UpdateTokenManager, UpdateAdminThreshold, UpdateSMGPKThreshold, UpdateFeeCommonConfig, SetSmgPKS>, addr: struct ZswapCoinPublicKey<bytes: Bytes<32>>, threshold: Uint<0..340282366920938463463374607431768211455>, feeConfig: struct FeeConfig<chainId: Uint<0..4294967295>, fee: Uint<0..340282366920938463463374607431768211455>>, smgPubkeys: Vector<29, struct CurvePoint<x: Field, y: Field>>>',
                                      newProposal_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_10.toValue(newProposal_0),
            alignment: _descriptor_10.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_newProposal_0(context,
                                              partialProofData,
                                              newProposal_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      voteProposal: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`voteProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const proposalId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('voteProposal',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 563 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(proposalId_0) === 'bigint' && proposalId_0 >= 0 && proposalId_0 <= 4294967295n))
          __compactRuntime.type_error('voteProposal',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 563 char 1',
                                      'Uint<0..4294967295>',
                                      proposalId_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(proposalId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_voteProposal_0(context,
                                               partialProofData,
                                               proposalId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      executeProposal: (...args_1) => {
        if (args_1.length !== 2)
          throw new __compactRuntime.CompactError(`executeProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        const contextOrig_0 = args_1[0];
        const proposalId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined))
          __compactRuntime.type_error('executeProposal',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 572 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        if (!(typeof(proposalId_0) === 'bigint' && proposalId_0 >= 0 && proposalId_0 <= 4294967295n))
          __compactRuntime.type_error('executeProposal',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 572 char 1',
                                      'Uint<0..4294967295>',
                                      proposalId_0)
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(proposalId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this.#_executeProposal_0(context,
                                                  partialProofData,
                                                  proposalId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      userLock: this.circuits.userLock,
      smgRelease: this.circuits.smgRelease,
      userBurn: this.circuits.userBurn,
      smgMint: this.circuits.smgMint,
      transferOwner: this.circuits.transferOwner,
      acceptOwner: this.circuits.acceptOwner,
      setFeeReceiver: this.circuits.setFeeReceiver,
      setTokenManager: this.circuits.setTokenManager,
      setMegerWorker: this.circuits.setMegerWorker,
      mergeTreasuryCoin: this.circuits.mergeTreasuryCoin,
      addAdmin: this.circuits.addAdmin,
      removeAdmin: this.circuits.removeAdmin,
      setAdminThreshold: this.circuits.setAdminThreshold,
      setSmgPksks: this.circuits.setSmgPksks,
      updateSmgPk: this.circuits.updateSmgPk,
      setSmgPKThreold: this.circuits.setSmgPKThreold,
      setFeeCommonConfig: this.circuits.setFeeCommonConfig,
      addTokenPair: this.circuits.addTokenPair,
      removeTokenPair: this.circuits.removeTokenPair,
      newProposal: this.circuits.newProposal,
      voteProposal: this.circuits.voteProposal,
      executeProposal: this.circuits.executeProposal
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 4)
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    const constructorContext_0 = args_0[0];
    const adminThresholdInit_0 = args_0[1];
    const smgPKThresholdInit_0 = args_0[2];
    const smgCount_0 = args_0[3];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(typeof(adminThresholdInit_0) === 'bigint' && adminThresholdInit_0 >= 0 && adminThresholdInit_0 <= 255n))
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 1 (argument 2 as invoked from Typescript)',
                                  'crosschain.compact line 133 char 1',
                                  'Uint<0..255>',
                                  adminThresholdInit_0)
    if (!(typeof(smgPKThresholdInit_0) === 'bigint' && smgPKThresholdInit_0 >= 0 && smgPKThresholdInit_0 <= 255n))
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 2 (argument 3 as invoked from Typescript)',
                                  'crosschain.compact line 133 char 1',
                                  'Uint<0..255>',
                                  smgPKThresholdInit_0)
    if (!(typeof(smgCount_0) === 'bigint' && smgCount_0 >= 0 && smgCount_0 <= 255n))
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 3 (argument 4 as invoked from Typescript)',
                                  'crosschain.compact line 133 char 1',
                                  'Uint<0..255>',
                                  smgCount_0)
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    let stateValue_2 = __compactRuntime.StateValue.newArray();
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_2);
    let stateValue_1 = __compactRuntime.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_1);
    state_0.data = stateValue_0;
    state_0.setOperation('userLock', new __compactRuntime.ContractOperation());
    state_0.setOperation('smgRelease', new __compactRuntime.ContractOperation());
    state_0.setOperation('userBurn', new __compactRuntime.ContractOperation());
    state_0.setOperation('smgMint', new __compactRuntime.ContractOperation());
    state_0.setOperation('transferOwner', new __compactRuntime.ContractOperation());
    state_0.setOperation('acceptOwner', new __compactRuntime.ContractOperation());
    state_0.setOperation('setFeeReceiver', new __compactRuntime.ContractOperation());
    state_0.setOperation('setTokenManager', new __compactRuntime.ContractOperation());
    state_0.setOperation('setMegerWorker', new __compactRuntime.ContractOperation());
    state_0.setOperation('mergeTreasuryCoin', new __compactRuntime.ContractOperation());
    state_0.setOperation('addAdmin', new __compactRuntime.ContractOperation());
    state_0.setOperation('removeAdmin', new __compactRuntime.ContractOperation());
    state_0.setOperation('setAdminThreshold', new __compactRuntime.ContractOperation());
    state_0.setOperation('setSmgPksks', new __compactRuntime.ContractOperation());
    state_0.setOperation('updateSmgPk', new __compactRuntime.ContractOperation());
    state_0.setOperation('setSmgPKThreold', new __compactRuntime.ContractOperation());
    state_0.setOperation('setFeeCommonConfig', new __compactRuntime.ContractOperation());
    state_0.setOperation('addTokenPair', new __compactRuntime.ContractOperation());
    state_0.setOperation('removeTokenPair', new __compactRuntime.ContractOperation());
    state_0.setOperation('newProposal', new __compactRuntime.ContractOperation());
    state_0.setOperation('voteProposal', new __compactRuntime.ContractOperation());
    state_0.setOperation('executeProposal', new __compactRuntime.ContractOperation());
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
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(0n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(1n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(new Uint8Array(32)),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(3n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(4n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue({ smgId: new Uint8Array(32), fromAddr: { bytes: new Uint8Array(32) }, toAddr: '', tokenPairId: 0n, amount: 0n, fee: 0n, nonce: 0n }),
                                                                            alignment: _descriptor_24.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(5n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(6n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(7n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(8n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(0n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(1n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(3n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(4n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(0n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(5n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(0n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(6n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(7n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(0n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(8n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(9n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(10n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(0n),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(11n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(12n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(13n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(14n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_0 = this.#_ownPublicKey_0(context, partialProofData);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(12n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_1 = this.#_ownPublicKey_0(context, partialProofData);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(14n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_1),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_2 = this.#_ownPublicKey_0(context, partialProofData);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(8n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_2),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_3 = this.#_ownPublicKey_0(context, partialProofData);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(1n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_3),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(7n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(adminThresholdInit_0),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(4n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(smgPKThresholdInit_0),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(5n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(smgCount_0),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_4 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(8n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_13.toValue(tmp_4),
                                              alignment: _descriptor_13.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }]);
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
  #_some_1(context, partialProofData, value_0) {
    return { is_some: true, value: value_0 };
  }
  #_none_0(context, partialProofData) {
    return { is_some: false,
             value:
               { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n } };
  }
  #_none_1(context, partialProofData) {
    return { is_some: false, value: new Array(4).fill(0n) };
  }
  #_left_0(context, partialProofData, value_0) {
    return { is_left: true, left: value_0, right: { bytes: new Uint8Array(32) } };
  }
  #_right_0(context, partialProofData, value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  #_transientHash_0(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_31, value_0);
    return result_0;
  }
  #_transientHash_1(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_32, value_0);
    return result_0;
  }
  #_persistentHash_0(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_0, value_0);
    return result_0;
  }
  #_persistentHash_1(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_5, value_0);
    return result_0;
  }
  #_persistentHash_2(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_15, value_0);
    return result_0;
  }
  #_persistentHash_3(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_21, value_0);
    return result_0;
  }
  #_persistentHash_4(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_28, value_0);
    return result_0;
  }
  #_persistentHash_5(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_30, value_0);
    return result_0;
  }
  #_persistentHash_6(context, partialProofData, value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_8, value_0);
    return result_0;
  }
  #_persistentCommit_0(context, partialProofData, value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_27,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  #_degradeToTransient_0(context, partialProofData, x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  #_upgradeFromTransient_0(context, partialProofData, x_0) {
    const result_0 = __compactRuntime.upgradeFromTransient(x_0);
    return result_0;
  }
  #_ecAdd_0(context, partialProofData, a_0, b_0) {
    const result_0 = __compactRuntime.ecAdd(a_0, b_0);
    return result_0;
  }
  #_nativeToken_0(context, partialProofData) {
    return new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  #_ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_2.toValue(result_0),
      alignment: _descriptor_2.alignment()
    });
    return result_0;
  }
  #_createZswapInput_0(context, partialProofData, coin_0) {
    const result_0 = __compactRuntime.createZswapInput(context, coin_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  #_createZswapOutput_0(context, partialProofData, coin_0, recipient_0) {
    const result_0 = __compactRuntime.createZswapOutput(context,
                                                        coin_0,
                                                        recipient_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  #_tokenType_0(context, partialProofData, domain_sep_0, contractAddress_0) {
    return this.#_persistentCommit_0(context,
                                     partialProofData,
                                     [domain_sep_0, contractAddress_0.bytes],
                                     new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 100, 101, 114, 105, 118, 101, 95, 116, 111, 107, 101, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  }
  #_mintToken_0(context,
                partialProofData,
                domain_sep_0,
                value_0,
                nonce_0,
                recipient_0)
  {
    const coin_0 = { nonce: nonce_0,
                     color:
                       this.#_tokenType_0(context,
                                          partialProofData,
                                          domain_sep_0,
                                          _descriptor_18.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 2 } },
                                                                                    { idx: { cached: true,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
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
                                       value: { value: _descriptor_14.toValue(4n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(domain_sep_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { dup: { n: 1 } },
                     { dup: { n: 1 } },
                     'member',
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(value_0),
                                                                            alignment: _descriptor_11.alignment() }).encode() } },
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
    this.#_createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const cm_0 = this.#_coinCommitment_0(context,
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(cm_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    return coin_0;
  }
  #_evolveNonce_0(context, partialProofData, index_0, nonce_0) {
    return this.#_upgradeFromTransient_0(context,
                                         partialProofData,
                                         this.#_transientHash_0(context,
                                                                partialProofData,
                                                                [__compactRuntime.convert_Uint8Array_to_bigint(28,
                                                                                                               new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101])),
                                                                 index_0,
                                                                 this.#_degradeToTransient_0(context,
                                                                                             partialProofData,
                                                                                             nonce_0)]));
  }
  #_burnAddress_0(context, partialProofData) {
    return this.#_left_0(context,
                         partialProofData,
                         { bytes: new Uint8Array(32) });
  }
  #_receive_0(context, partialProofData, coin_0) {
    const recipient_0 = this.#_right_0(context,
                                       partialProofData,
                                       _descriptor_18.fromValue(Contract._query(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 2 } },
                                                                                 { idx: { cached: true,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_14.toValue(0n),
                                                                                                            alignment: _descriptor_14.alignment() } }] } },
                                                                                 { popeq: { cached: true,
                                                                                            result: undefined } }]).value));
    this.#_createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const tmp_0 = this.#_coinCommitment_0(context,
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
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
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
    const selfAddr_0 = _descriptor_18.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 2 } },
                                                                 { idx: { cached: true,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_14.toValue(0n),
                                                                                            alignment: _descriptor_14.alignment() } }] } },
                                                                 { popeq: { cached: true,
                                                                            result: undefined } }]).value);
    this.#_createZswapInput_0(context, partialProofData, input_0);
    const tmp_0 = this.#_coinNullifier_0(context,
                                         partialProofData,
                                         this.#_downcastQualifiedCoin_0(context,
                                                                        partialProofData,
                                                                        input_0),
                                         selfAddr_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
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
                         this.#_upgradeFromTransient_0(context,
                                                       partialProofData,
                                                       this.#_transientHash_1(context,
                                                                              partialProofData,
                                                                              [__compactRuntime.convert_Uint8Array_to_bigint(28,
                                                                                                                             new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101])),
                                                                               this.#_degradeToTransient_0(context,
                                                                                                           partialProofData,
                                                                                                           input_0.nonce)])),
                       color: input_0.color,
                       value: value_0 };
    this.#_createZswapOutput_0(context, partialProofData, output_0, recipient_0);
    const tmp_1 = this.#_coinCommitment_0(context,
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
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
      const changeCoin_0 = { nonce:
                               this.#_upgradeFromTransient_0(context,
                                                             partialProofData,
                                                             this.#_transientHash_1(context,
                                                                                    partialProofData,
                                                                                    [__compactRuntime.convert_Uint8Array_to_bigint(30,
                                                                                                                                   new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101, 47, 50])),
                                                                                     this.#_degradeToTransient_0(context,
                                                                                                                 partialProofData,
                                                                                                                 input_0.nonce)])),
                             color: input_0.color,
                             value: change_0 };
      this.#_createZswapOutput_0(context,
                                 partialProofData,
                                 changeCoin_0,
                                 this.#_right_0(context,
                                                partialProofData,
                                                selfAddr_0));
      const cm_0 = this.#_coinCommitment_0(context,
                                           partialProofData,
                                           changeCoin_0,
                                           this.#_right_0(context,
                                                          partialProofData,
                                                          selfAddr_0));
      Contract._query(context,
                      partialProofData,
                      [
                       { swap: { n: 0 } },
                       { idx: { cached: true,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(2n),
                                                  alignment: _descriptor_14.alignment() } }] } },
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
                                         value: { value: _descriptor_14.toValue(1n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(cm_0),
                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newNull().encode() } },
                       { ins: { cached: true, n: 2 } },
                       { swap: { n: 0 } }]);
      return { change: this.#_some_1(context, partialProofData, changeCoin_0),
               sent: output_0 };
    }
  }
  #_sendImmediate_0(context, partialProofData, input_0, target_0, value_0) {
    return this.#_send_0(context,
                         partialProofData,
                         this.#_upcastQualifiedCoin_0(context,
                                                      partialProofData,
                                                      input_0),
                         target_0,
                         value_0);
  }
  #_mergeCoin_0(context, partialProofData, a_0, b_0) {
    const selfAddr_0 = _descriptor_18.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 2 } },
                                                                 { idx: { cached: true,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_14.toValue(0n),
                                                                                            alignment: _descriptor_14.alignment() } }] } },
                                                                 { popeq: { cached: true,
                                                                            result: undefined } }]).value);
    this.#_createZswapInput_0(context, partialProofData, a_0);
    const tmp_0 = this.#_coinNullifier_0(context,
                                         partialProofData,
                                         this.#_downcastQualifiedCoin_0(context,
                                                                        partialProofData,
                                                                        a_0),
                                         selfAddr_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    this.#_createZswapInput_0(context, partialProofData, b_0);
    const tmp_1 = this.#_coinNullifier_0(context,
                                         partialProofData,
                                         this.#_downcastQualifiedCoin_0(context,
                                                                        partialProofData,
                                                                        b_0),
                                         selfAddr_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_1),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    __compactRuntime.assert(this.#_equal_1(a_0.color, b_0.color),
                            'Can only merge coins of the same color');
    const newCoin_0 = { nonce:
                          this.#_upgradeFromTransient_0(context,
                                                        partialProofData,
                                                        this.#_transientHash_1(context,
                                                                               partialProofData,
                                                                               [__compactRuntime.convert_Uint8Array_to_bigint(28,
                                                                                                                              new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101])),
                                                                                this.#_degradeToTransient_0(context,
                                                                                                            partialProofData,
                                                                                                            a_0.nonce)])),
                        color: a_0.color,
                        value:
                          ((t1) => {
                            if (t1 > 340282366920938463463374607431768211455n)
                              throw new __compactRuntime.CompactError('<standard library>: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                            return t1;
                          })(a_0.value + b_0.value) };
    this.#_createZswapOutput_0(context,
                               partialProofData,
                               newCoin_0,
                               this.#_right_0(context,
                                              partialProofData,
                                              selfAddr_0));
    const cm_0 = this.#_coinCommitment_0(context,
                                         partialProofData,
                                         newCoin_0,
                                         this.#_right_0(context,
                                                        partialProofData,
                                                        selfAddr_0));
    Contract._query(context,
                    partialProofData,
                    [
                     { swap: { n: 0 } },
                     { idx: { cached: true,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
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
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(cm_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    return newCoin_0;
  }
  #_mergeCoinImmediate_0(context, partialProofData, a_0, b_0) {
    return this.#_mergeCoin_0(context,
                              partialProofData,
                              a_0,
                              this.#_upcastQualifiedCoin_0(context,
                                                           partialProofData,
                                                           b_0));
  }
  #_downcastQualifiedCoin_0(context, partialProofData, coin_0) {
    return { nonce: coin_0.nonce, color: coin_0.color, value: coin_0.value };
  }
  #_upcastQualifiedCoin_0(context, partialProofData, coin_0) {
    return { nonce: coin_0.nonce,
             color: coin_0.color,
             value: coin_0.value,
             mt_index: 0n };
  }
  #_coinCommitment_0(context, partialProofData, coin_0, recipient_0) {
    return this.#_persistentHash_5(context,
                                   partialProofData,
                                   { info: coin_0,
                                     dataType: recipient_0.is_left,
                                     data:
                                       recipient_0.is_left ?
                                       recipient_0.left.bytes :
                                       recipient_0.right.bytes,
                                     domain_sep:
                                       new Uint8Array([109, 100, 110, 58, 99, 99]) });
  }
  #_coinNullifier_0(context, partialProofData, coin_0, addr_0) {
    return this.#_persistentHash_5(context,
                                   partialProofData,
                                   { info: coin_0,
                                     dataType: false,
                                     data: addr_0.bytes,
                                     domain_sep:
                                       new Uint8Array([109, 100, 110, 58, 99, 110]) });
  }
  #_userLock_0(context,
               partialProofData,
               smgId_0,
               toAddr_0,
               tokenPairId_0,
               amount_0)
  {
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(0n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(7n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenPairId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'tokenpairId not exists');
    const tokenPair_0 = _descriptor_12.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(0n),
                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(7n),
                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_0.toValue(tokenPairId_0),
                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value);
    const contractFee_0 = this.#_getFee_0(context,
                                          partialProofData,
                                          tokenPairId_0);
    const tmp_0 = this.#_evolveNonce_0(context,
                                       partialProofData,
                                       ((t1) => {
                                         if (t1 > 18446744073709551615n)
                                           throw new __compactRuntime.CompactError('crosschain.compact line 156 char 23: cast from field value to Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                         return t1;
                                       })(_descriptor_11.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: true,
                                                                                               result: undefined } }]).value)),
                                       _descriptor_1.fromValue(Contract._query(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(0n),
                                                                                                           alignment: _descriptor_14.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(2n),
                                                                                                           alignment: _descriptor_14.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    if (this.#_equal_2(this.#_nativeToken_0(context, partialProofData),
                       tokenPair_0.midnigthTokenAccount))
    {
      const receivedAmount_0 = amount_0 + contractFee_0;
      const coin_0 = { nonce:
                         _descriptor_1.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(0n),
                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(2n),
                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                       color: tokenPair_0.midnigthTokenAccount,
                       value:
                         ((t1) => {
                           if (t1 > 340282366920938463463374607431768211455n)
                             throw new __compactRuntime.CompactError('crosschain.compact line 160 char 73: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                           return t1;
                         })(receivedAmount_0) };
      this.#_receive_0(context, partialProofData, coin_0);
    } else {
      const coin_1 = { nonce:
                         _descriptor_1.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(0n),
                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(2n),
                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value),
                       color: tokenPair_0.midnigthTokenAccount,
                       value: amount_0 };
      this.#_receive_0(context, partialProofData, coin_1);
      const tmp_1 = this.#_evolveNonce_0(context,
                                         partialProofData,
                                         ((t1) => {
                                           if (t1 > 18446744073709551615n)
                                             throw new __compactRuntime.CompactError('crosschain.compact line 167 char 25: cast from field value to Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                           return t1;
                                         })(_descriptor_11.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                                      { popeq: { cached: true,
                                                                                                 result: undefined } }]).value)),
                                         _descriptor_1.fromValue(Contract._query(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(0n),
                                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(2n),
                                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value));
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(0n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                              alignment: _descriptor_14.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_1),
                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }]);
      this.#_receive_0(context,
                       partialProofData,
                       { nonce:
                           _descriptor_1.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_14.toValue(2n),
                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value),
                         color: this.#_nativeToken_0(context, partialProofData),
                         value: contractFee_0 });
    }
    this.#_transferFee_0(context, partialProofData, contractFee_0);
    const tmp_2 = this.#_evolveNonce_0(context,
                                       partialProofData,
                                       ((t1) => {
                                         if (t1 > 18446744073709551615n)
                                           throw new __compactRuntime.CompactError('crosschain.compact line 174 char 23: cast from field value to Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                         return t1;
                                       })(_descriptor_11.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: true,
                                                                                               result: undefined } }]).value)),
                                       _descriptor_1.fromValue(Contract._query(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(0n),
                                                                                                           alignment: _descriptor_14.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(2n),
                                                                                                           alignment: _descriptor_14.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_2),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const crossCoin_0 = { nonce:
                            _descriptor_1.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(0n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value),
                          color: tokenPair_0.midnigthTokenAccount,
                          value: amount_0 };
    this.#_addTreasuryCoin_0(context, partialProofData, crossCoin_0);
    const tmp_3 = { smgId: smgId_0,
                    fromAddr: this.#_ownPublicKey_0(context, partialProofData),
                    toAddr: toAddr_0,
                    tokenPairId: tokenPairId_0,
                    amount: amount_0,
                    fee: contractFee_0,
                    nonce:
                      ((t1) => {
                        if (t1 > 340282366920938463463374607431768211455n)
                          throw new __compactRuntime.CompactError('crosschain.compact line 186 char 14: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                        return t1;
                      })(_descriptor_11.fromValue(Contract._query(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_14.toValue(0n),
                                                                                              alignment: _descriptor_14.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_14.toValue(0n),
                                                                                              alignment: _descriptor_14.alignment() } }] } },
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value)) };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(4n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(tmp_3),
                                                                            alignment: _descriptor_24.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_4 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_13.toValue(tmp_4),
                                              alignment: _descriptor_13.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_smgRelease_0(context,
                 partialProofData,
                 uniqueId_0,
                 smgId_0,
                 tokenPairId_0,
                 amount_0,
                 fee_0,
                 toAddr_0,
                 coins_0,
                 signers_0,
                 ttl_0,
                 R_0,
                 s_0)
  {
    __compactRuntime.assert(ttl_0
                            >=
                            _descriptor_11.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value),
                            'ttl expired');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(0n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(7n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenPairId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'tokenpairId not exists');
    const tokenPair_0 = _descriptor_12.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(0n),
                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(7n),
                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_0.toValue(tokenPairId_0),
                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value);
    const coinInput_0 = this.#_internalMerger_0(context,
                                                partialProofData,
                                                tokenPair_0.midnigthTokenAccount,
                                                coins_0);
    const sendResult_0 = this.#_sendImmediate_0(context,
                                                partialProofData,
                                                coinInput_0,
                                                this.#_left_0(context,
                                                              partialProofData,
                                                              toAddr_0),
                                                amount_0);
    if (fee_0 > 0n) {
      const change_0 = sendResult_0.change;
      __compactRuntime.assert(change_0.is_some && change_0.value.value >= fee_0,
                              'insufficient fee');
      const sendFeeResult_0 = this.#_sendImmediate_0(context,
                                                     partialProofData,
                                                     change_0.value,
                                                     this.#_left_0(context,
                                                                   partialProofData,
                                                                   _descriptor_2.fromValue(Contract._query(context,
                                                                                                           partialProofData,
                                                                                                           [
                                                                                                            { dup: { n: 0 } },
                                                                                                            { idx: { cached: false,
                                                                                                                     pushPath: false,
                                                                                                                     path: [
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_14.toValue(1n),
                                                                                                                                       alignment: _descriptor_14.alignment() } },
                                                                                                                            { tag: 'value',
                                                                                                                              value: { value: _descriptor_14.toValue(1n),
                                                                                                                                       alignment: _descriptor_14.alignment() } }] } },
                                                                                                            { popeq: { cached: false,
                                                                                                                       result: undefined } }]).value)),
                                                     fee_0);
      if (sendFeeResult_0.change.is_some) {
        this.#_addTreasuryCoin_0(context,
                                 partialProofData,
                                 sendFeeResult_0.change.value);
      }
    } else {
      if (sendResult_0.change.is_some) {
        this.#_addTreasuryCoin_0(context,
                                 partialProofData,
                                 sendResult_0.change.value);
      }
    }
    const proof_0 = { smgId: smgId_0,
                      uniqueId: uniqueId_0,
                      tokenPairId: tokenPairId_0,
                      amount: amount_0,
                      fee: fee_0,
                      toAddr: toAddr_0,
                      coins: this.#_some_0(context, partialProofData, coins_0),
                      signers: signers_0,
                      ttl: ttl_0 };
    __compactRuntime.assert(this.#_verifyProof_0(context,
                                                 partialProofData,
                                                 proof_0,
                                                 R_0,
                                                 s_0),
                            'verify proof failed');
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_13.toValue(tmp_0),
                                              alignment: _descriptor_13.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_userBurn_0(context,
               partialProofData,
               smgId_0,
               toAddr_0,
               tokenPairId_0,
               amount_0)
  {
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(0n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(7n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenPairId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'tokenpairId not exists');
    const tokenPair_0 = _descriptor_12.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(0n),
                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(7n),
                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_0.toValue(tokenPairId_0),
                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value);
    const contractFee_0 = this.#_getFee_0(context,
                                          partialProofData,
                                          tokenPairId_0);
    if (contractFee_0 > 0n) {
      const tmp_0 = this.#_evolveNonce_0(context,
                                         partialProofData,
                                         ((t1) => {
                                           if (t1 > 18446744073709551615n)
                                             throw new __compactRuntime.CompactError('crosschain.compact line 253 char 25: cast from field value to Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                           return t1;
                                         })(_descriptor_11.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                                      { popeq: { cached: true,
                                                                                                 result: undefined } }]).value)),
                                         _descriptor_1.fromValue(Contract._query(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(0n),
                                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(2n),
                                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value));
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(0n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                              alignment: _descriptor_14.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }]);
      this.#_receive_0(context,
                       partialProofData,
                       { nonce:
                           _descriptor_1.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_14.toValue(2n),
                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value),
                         color: this.#_nativeToken_0(context, partialProofData),
                         value: contractFee_0 });
      this.#_transferFee_0(context, partialProofData, contractFee_0);
    }
    const tmp_1 = this.#_evolveNonce_0(context,
                                       partialProofData,
                                       ((t1) => {
                                         if (t1 > 18446744073709551615n)
                                           throw new __compactRuntime.CompactError('crosschain.compact line 259 char 23: cast from field value to Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                         return t1;
                                       })(_descriptor_11.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: true,
                                                                                               result: undefined } }]).value)),
                                       _descriptor_1.fromValue(Contract._query(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(0n),
                                                                                                           alignment: _descriptor_14.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(2n),
                                                                                                           alignment: _descriptor_14.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_1),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const receivedCoin_0 = { nonce:
                               _descriptor_1.fromValue(Contract._query(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                                   alignment: _descriptor_14.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value),
                             color: tokenPair_0.midnigthTokenAccount,
                             value:
                               ((t1) => {
                                 if (t1 > 340282366920938463463374607431768211455n)
                                   throw new __compactRuntime.CompactError('crosschain.compact line 262 char 14: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                                 return t1;
                               })(amount_0) };
    this.#_receive_0(context, partialProofData, receivedCoin_0);
    const tmp_2 = this.#_evolveNonce_0(context,
                                       partialProofData,
                                       ((t1) => {
                                         if (t1 > 18446744073709551615n)
                                           throw new __compactRuntime.CompactError('crosschain.compact line 267 char 23: cast from field value to Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                         return t1;
                                       })(_descriptor_11.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: true,
                                                                                               result: undefined } }]).value)),
                                       _descriptor_1.fromValue(Contract._query(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(0n),
                                                                                                           alignment: _descriptor_14.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(2n),
                                                                                                           alignment: _descriptor_14.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_2),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const burnCoin_0 = { nonce:
                           _descriptor_1.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_14.toValue(2n),
                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value),
                         color: tokenPair_0.midnigthTokenAccount,
                         value:
                           ((t1) => {
                             if (t1 > 340282366920938463463374607431768211455n)
                               throw new __compactRuntime.CompactError('crosschain.compact line 270 char 14: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                             return t1;
                           })(amount_0) };
    this.#_sendImmediate_0(context,
                           partialProofData,
                           burnCoin_0,
                           this.#_burnAddress_0(context, partialProofData),
                           burnCoin_0.value);
    const tmp_3 = { smgId: smgId_0,
                    fromAddr: this.#_ownPublicKey_0(context, partialProofData),
                    toAddr: toAddr_0,
                    tokenPairId: tokenPairId_0,
                    amount: amount_0,
                    fee: contractFee_0,
                    nonce:
                      ((t1) => {
                        if (t1 > 340282366920938463463374607431768211455n)
                          throw new __compactRuntime.CompactError('crosschain.compact line 283 char 14: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                        return t1;
                      })(_descriptor_11.fromValue(Contract._query(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_14.toValue(0n),
                                                                                              alignment: _descriptor_14.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_14.toValue(0n),
                                                                                              alignment: _descriptor_14.alignment() } }] } },
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value)) };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(4n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(tmp_3),
                                                                            alignment: _descriptor_24.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_4 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_13.toValue(tmp_4),
                                              alignment: _descriptor_13.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_smgMint_0(context,
              partialProofData,
              uniqueId_0,
              smgId_0,
              tokenPairId_0,
              amount_0,
              fee_0,
              toAddr_0,
              signers_0,
              ttl_0,
              R_0,
              s_0)
  {
    __compactRuntime.assert(ttl_0
                            >=
                            _descriptor_11.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value),
                            'ttl expired');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(0n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(7n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenPairId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'tokenpairId not exists');
    const tokenPair_0 = _descriptor_12.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(0n),
                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(7n),
                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_0.toValue(tokenPairId_0),
                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value);
    const tmp_0 = this.#_evolveNonce_0(context,
                                       partialProofData,
                                       ((t1) => {
                                         if (t1 > 18446744073709551615n)
                                           throw new __compactRuntime.CompactError('crosschain.compact line 305 char 23: cast from field value to Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                         return t1;
                                       })(_descriptor_11.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(1n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: true,
                                                                                               result: undefined } }]).value)),
                                       _descriptor_1.fromValue(Contract._query(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(0n),
                                                                                                           alignment: _descriptor_14.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(2n),
                                                                                                           alignment: _descriptor_14.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    this.#_mintToken_0(context,
                       partialProofData,
                       tokenPair_0.midnigthTokenAccount,
                       ((t1) => {
                         if (t1 > 18446744073709551615n)
                           throw new __compactRuntime.CompactError('crosschain.compact line 308 char 5: cast from field value to Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                         return t1;
                       })(amount_0),
                       _descriptor_1.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_14.toValue(0n),
                                                                                           alignment: _descriptor_14.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_14.toValue(2n),
                                                                                           alignment: _descriptor_14.alignment() } }] } },
                                                                { popeq: { cached: false,
                                                                           result: undefined } }]).value),
                       this.#_left_0(context, partialProofData, toAddr_0));
    const tmp_1 = this.#_evolveNonce_0(context,
                                       partialProofData,
                                       ((t1) => {
                                         if (t1 > 18446744073709551615n)
                                           throw new __compactRuntime.CompactError('crosschain.compact line 314 char 23: cast from field value to Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                         return t1;
                                       })(_descriptor_11.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(1n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: true,
                                                                                               result: undefined } }]).value)),
                                       _descriptor_1.fromValue(Contract._query(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(0n),
                                                                                                           alignment: _descriptor_14.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(2n),
                                                                                                           alignment: _descriptor_14.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_1),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    this.#_mintToken_0(context,
                       partialProofData,
                       tokenPair_0.midnigthTokenAccount,
                       ((t1) => {
                         if (t1 > 18446744073709551615n)
                           throw new __compactRuntime.CompactError('crosschain.compact line 317 char 5: cast from field value to Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                         return t1;
                       })(fee_0),
                       _descriptor_1.fromValue(Contract._query(context,
                                                               partialProofData,
                                                               [
                                                                { dup: { n: 0 } },
                                                                { idx: { cached: false,
                                                                         pushPath: false,
                                                                         path: [
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_14.toValue(0n),
                                                                                           alignment: _descriptor_14.alignment() } },
                                                                                { tag: 'value',
                                                                                  value: { value: _descriptor_14.toValue(2n),
                                                                                           alignment: _descriptor_14.alignment() } }] } },
                                                                { popeq: { cached: false,
                                                                           result: undefined } }]).value),
                       this.#_left_0(context,
                                     partialProofData,
                                     _descriptor_2.fromValue(Contract._query(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(1n),
                                                                                                         alignment: _descriptor_14.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(1n),
                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value)));
    const proof_0 = { smgId: smgId_0,
                      uniqueId: uniqueId_0,
                      tokenPairId: tokenPairId_0,
                      amount: amount_0,
                      fee: fee_0,
                      toAddr: toAddr_0,
                      coins: this.#_none_1(context, partialProofData),
                      signers: signers_0,
                      ttl: ttl_0 };
    __compactRuntime.assert(this.#_verifyProof_0(context,
                                                 partialProofData,
                                                 proof_0,
                                                 R_0,
                                                 s_0),
                            'verify proof failed');
    const tmp_2 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_13.toValue(tmp_2),
                                              alignment: _descriptor_13.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_verifySignature_0(context, partialProofData, hash_0, P_0, R_0, s_0) {
    return true;
  }
  #_hashProof_0(context, partialProofData, proof_0) {
    const tokenPairIdHash_0 = this.#_persistentHash_0(context,
                                                      partialProofData,
                                                      proof_0.tokenPairId);
    const amountHash_0 = this.#_persistentHash_1(context,
                                                 partialProofData,
                                                 proof_0.amount);
    const feeHash_0 = this.#_persistentHash_1(context,
                                              partialProofData,
                                              proof_0.fee);
    const coinsHash_0 = this.#_persistentHash_2(context,
                                                partialProofData,
                                                proof_0.coins.value);
    const signersHash_0 = this.#_persistentHash_3(context,
                                                  partialProofData,
                                                  proof_0.signers);
    const ttlHash_0 = this.#_persistentHash_1(context,
                                              partialProofData,
                                              proof_0.ttl);
    return this.#_persistentHash_4(context,
                                   partialProofData,
                                   [proof_0.smgId,
                                    proof_0.uniqueId,
                                    tokenPairIdHash_0,
                                    amountHash_0,
                                    feeHash_0,
                                    proof_0.toAddr.bytes,
                                    coinsHash_0,
                                    signersHash_0,
                                    ttlHash_0]);
  }
  #_verifyProof_0(context, partialProofData, proof_0, R_0, s_0) {
    const hash_0 = this.#_hashProof_0(context, partialProofData, proof_0);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(3n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const P_0 = this.#_folder_0(context,
                                partialProofData,
                                ((context, partialProofData, Pi_0, index_0) =>
                                 {
                                   const tmp_0 = _descriptor_8.fromValue(Contract._query(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_14.toValue(1n),
                                                                                                                     alignment: _descriptor_14.alignment() } },
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_14.toValue(2n),
                                                                                                                     alignment: _descriptor_14.alignment() } }] } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_14.toValue(index_0),
                                                                                                                     alignment: _descriptor_14.alignment() } }] } },
                                                                                          { popeq: { cached: false,
                                                                                                     result: undefined } }]).value);
                                   Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { idx: { cached: false,
                                                             pushPath: true,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                               alignment: _descriptor_14.alignment() } },
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_14.toValue(3n),
                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                    { push: { storage: false,
                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                                                           alignment: _descriptor_8.alignment() }).encode() } },
                                                    { push: { storage: true,
                                                              value: __compactRuntime.StateValue.newNull().encode() } },
                                                    { ins: { cached: false, n: 1 } },
                                                    { ins: { cached: true, n: 2 } }]);
                                   return this.#_ecAdd_0(context,
                                                         partialProofData,
                                                         Pi_0,
                                                         _descriptor_8.fromValue(Contract._query(context,
                                                                                                 partialProofData,
                                                                                                 [
                                                                                                  { dup: { n: 0 } },
                                                                                                  { idx: { cached: false,
                                                                                                           pushPath: false,
                                                                                                           path: [
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_14.toValue(1n),
                                                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_14.toValue(2n),
                                                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                                                  { idx: { cached: false,
                                                                                                           pushPath: false,
                                                                                                           path: [
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_14.toValue(index_0),
                                                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                                                  { popeq: { cached: false,
                                                                                                             result: undefined } }]).value));
                                 }),
                                { x: 0n, y: 0n },
                                proof_0.signers);
    __compactRuntime.assert(_descriptor_11.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(3n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      'size',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value)
                            <=
                            _descriptor_14.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(4n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value),
                            'threshold not reached');
    return this.#_verifySignature_0(context,
                                    partialProofData,
                                    hash_0,
                                    P_0,
                                    R_0,
                                    s_0);
  }
  #_internalMerger_0(context, partialProofData, token_0, coins_0) {
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(0n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(5n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(token_0),
                                                                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'token required not exists');
    return this.#_folder_1(context,
                           partialProofData,
                           ((context, partialProofData, acc_0, coinIndex_0) =>
                            {
                              if (coinIndex_0 > 0n) {
                                __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                                                partialProofData,
                                                                                                [
                                                                                                 { dup: { n: 0 } },
                                                                                                 { idx: { cached: false,
                                                                                                          pushPath: false,
                                                                                                          path: [
                                                                                                                 { tag: 'value',
                                                                                                                   value: { value: _descriptor_14.toValue(0n),
                                                                                                                            alignment: _descriptor_14.alignment() } },
                                                                                                                 { tag: 'value',
                                                                                                                   value: { value: _descriptor_14.toValue(5n),
                                                                                                                            alignment: _descriptor_14.alignment() } },
                                                                                                                 { tag: 'value',
                                                                                                                   value: { value: _descriptor_1.toValue(token_0),
                                                                                                                            alignment: _descriptor_1.alignment() } }] } },
                                                                                                 { push: { storage: false,
                                                                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(coinIndex_0),
                                                                                                                                                        alignment: _descriptor_5.alignment() }).encode() } },
                                                                                                 'member',
                                                                                                 { popeq: { cached: true,
                                                                                                            result: undefined } }]).value),
                                                        'coin required not exists');
                                const coinTmp_0 = this.#_mergeCoinImmediate_0(context,
                                                                              partialProofData,
                                                                              _descriptor_16.fromValue(Contract._query(context,
                                                                                                                       partialProofData,
                                                                                                                       [
                                                                                                                        { dup: { n: 0 } },
                                                                                                                        { idx: { cached: false,
                                                                                                                                 pushPath: false,
                                                                                                                                 path: [
                                                                                                                                        { tag: 'value',
                                                                                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                                                                                   alignment: _descriptor_14.alignment() } },
                                                                                                                                        { tag: 'value',
                                                                                                                                          value: { value: _descriptor_14.toValue(5n),
                                                                                                                                                   alignment: _descriptor_14.alignment() } },
                                                                                                                                        { tag: 'value',
                                                                                                                                          value: { value: _descriptor_1.toValue(token_0),
                                                                                                                                                   alignment: _descriptor_1.alignment() } }] } },
                                                                                                                        { idx: { cached: false,
                                                                                                                                 pushPath: false,
                                                                                                                                 path: [
                                                                                                                                        { tag: 'value',
                                                                                                                                          value: { value: _descriptor_5.toValue(coinIndex_0),
                                                                                                                                                   alignment: _descriptor_5.alignment() } }] } },
                                                                                                                        { popeq: { cached: false,
                                                                                                                                   result: undefined } }]).value),
                                                                              acc_0);
                                Contract._query(context,
                                                partialProofData,
                                                [
                                                 { idx: { cached: false,
                                                          pushPath: true,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_14.toValue(0n),
                                                                            alignment: _descriptor_14.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_14.toValue(5n),
                                                                            alignment: _descriptor_14.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_1.toValue(token_0),
                                                                            alignment: _descriptor_1.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(coinIndex_0),
                                                                                                        alignment: _descriptor_5.alignment() }).encode() } },
                                                 { rem: { cached: false } },
                                                 { ins: { cached: true, n: 3 } }]);
                                return coinTmp_0;
                              } else {
                                return acc_0;
                              }
                            }),
                           { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n },
                           coins_0);
  }
  #_transferFee_0(context, partialProofData, contractFee_0) {
    if (contractFee_0 > 0n) {
      const tmp_0 = this.#_evolveNonce_0(context,
                                         partialProofData,
                                         ((t1) => {
                                           if (t1 > 18446744073709551615n)
                                             throw new __compactRuntime.CompactError('crosschain.compact line 411 char 25: cast from field value to Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                           return t1;
                                         })(_descriptor_11.fromValue(Contract._query(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                                      { popeq: { cached: true,
                                                                                                 result: undefined } }]).value)),
                                         _descriptor_1.fromValue(Contract._query(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(0n),
                                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(2n),
                                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value));
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(0n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                              alignment: _descriptor_14.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }]);
      const feeCoin_0 = { nonce:
                            _descriptor_1.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(0n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value),
                          color: this.#_nativeToken_0(context, partialProofData),
                          value: contractFee_0 };
      this.#_sendImmediate_0(context,
                             partialProofData,
                             feeCoin_0,
                             this.#_left_0(context,
                                           partialProofData,
                                           _descriptor_2.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(1n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(1n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value)),
                             feeCoin_0.value);
    }
    return [];
  }
  #_addTreasuryCoin_0(context, partialProofData, coin_0) {
    let tmp_0;
    if (!(tmp_0 = coin_0.color,
          _descriptor_3.fromValue(Contract._query(context,
                                                  partialProofData,
                                                  [
                                                   { dup: { n: 0 } },
                                                   { idx: { cached: false,
                                                            pushPath: false,
                                                            path: [
                                                                   { tag: 'value',
                                                                     value: { value: _descriptor_14.toValue(0n),
                                                                              alignment: _descriptor_14.alignment() } },
                                                                   { tag: 'value',
                                                                     value: { value: _descriptor_14.toValue(5n),
                                                                              alignment: _descriptor_14.alignment() } }] } },
                                                   { push: { storage: false,
                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_0),
                                                                                                          alignment: _descriptor_1.alignment() }).encode() } },
                                                   'member',
                                                   { popeq: { cached: true,
                                                              result: undefined } }]).value)))
    {
      const tmp_1 = coin_0.color;
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(0n),
                                                  alignment: _descriptor_14.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(5n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_1),
                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newMap(
                                          new __compactRuntime.StateMap()
                                        ).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 2 } }]);
      const tmp_2 = coin_0.color;
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(0n),
                                                  alignment: _descriptor_14.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(6n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_2),
                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                              alignment: _descriptor_11.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 2 } }]);
    }
    const tmp_3 = 1n;
    const tmp_4 = coin_0.color;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(6n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_1.toValue(tmp_4),
                                                alignment: _descriptor_1.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_13.toValue(tmp_3),
                                              alignment: _descriptor_13.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 3 } }]);
    let tmp_5;
    const coinIndex_0 = (tmp_5 = coin_0.color,
                         _descriptor_11.fromValue(Contract._query(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_14.toValue(0n),
                                                                                              alignment: _descriptor_14.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_14.toValue(6n),
                                                                                              alignment: _descriptor_14.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_1.toValue(tmp_5),
                                                                                              alignment: _descriptor_1.alignment() } }] } },
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value));
    const tmp_6 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n)
                      throw new __compactRuntime.CompactError('crosschain.compact line 428 char 57: cast from field value to Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    return t1;
                  })(coinIndex_0);
    const tmp_7 = this.#_right_0(context,
                                 partialProofData,
                                 _descriptor_18.fromValue(Contract._query(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 2 } },
                                                                           { idx: { cached: true,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_14.toValue(0n),
                                                                                                      alignment: _descriptor_14.alignment() } }] } },
                                                                           { popeq: { cached: true,
                                                                                      result: undefined } }]).value));
    const tmp_8 = coin_0.color;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(5n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_1.toValue(tmp_8),
                                                alignment: _descriptor_1.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(tmp_6),
                                                                            alignment: _descriptor_5.alignment() }).encode() } },
                     { dup: { n: 9 } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell(__compactRuntime.coinCommitment(
                                                                            { value: _descriptor_17.toValue(coin_0),
                                                                              alignment: _descriptor_17.alignment() },
                                                                            { value: _descriptor_19.toValue(tmp_7),
                                                                              alignment: _descriptor_19.alignment() }
                                                                          )).encode() } },
                     { idx: { cached: true,
                              pushPath: false,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'stack' }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(coin_0),
                                                                            alignment: _descriptor_17.alignment() }).encode() } },
                     { swap: { n: 0 } },
                     { concat: { cached: true, n: 91 } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 3 } }]);
    return [];
  }
  #_getFee_0(context, partialProofData, tokenPairId_0) {
    const tokenPair_0 = _descriptor_12.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(0n),
                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(7n),
                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_0.toValue(tokenPairId_0),
                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value);
    if (this.#_equal_3(tokenPair_0.fee, 0n)) {
      const tmp_0 = tokenPair_0.toChainId;
      return _descriptor_5.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_0.toValue(tmp_0),
                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    } else {
      return tokenPair_0.fee;
    }
  }
  #_transferOwner_0(context, partialProofData, newOwner_0) {
    __compactRuntime.assert(this.#_equal_4(_descriptor_2.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(1n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(12n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value),
                                           this.#_ownPublicKey_0(context,
                                                                 partialProofData)),
                            'only owner can transfer ownership');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(13n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(newOwner_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  #_acceptOwner_0(context, partialProofData) {
    __compactRuntime.assert(this.#_equal_5(_descriptor_2.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(1n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(13n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value),
                                           this.#_ownPublicKey_0(context,
                                                                 partialProofData)),
                            'only pending owner can accept ownership');
    const tmp_0 = _descriptor_2.fromValue(Contract._query(context,
                                                          partialProofData,
                                                          [
                                                           { dup: { n: 0 } },
                                                           { idx: { cached: false,
                                                                    pushPath: false,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_14.toValue(1n),
                                                                                      alignment: _descriptor_14.alignment() } },
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_14.toValue(13n),
                                                                                      alignment: _descriptor_14.alignment() } }] } },
                                                           { popeq: { cached: false,
                                                                      result: undefined } }]).value);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(12n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  #_setFeeReceiver_0(context, partialProofData, newFeeReceiver_0) {
    __compactRuntime.assert(this.#_checkAdminAuthorized_0(context,
                                                          partialProofData),
                            'not admin authorized');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(1n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(newFeeReceiver_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  #_setTokenManager_0(context, partialProofData, newTokenManager_0) {
    __compactRuntime.assert(this.#_checkAdminAuthorized_0(context,
                                                          partialProofData),
                            'not admin authorized');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(8n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(newTokenManager_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  #_setMegerWorker_0(context, partialProofData, newMergeWorker_0) {
    __compactRuntime.assert(this.#_checkAdminAuthorized_0(context,
                                                          partialProofData),
                            'not admin authorized');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(14n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(newMergeWorker_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  #_mergeTreasuryCoin_0(context, partialProofData, token_0, coins_0) {
    __compactRuntime.assert(this.#_equal_6(_descriptor_2.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(1n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(14n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value),
                                           this.#_ownPublicKey_0(context,
                                                                 partialProofData)),
                            'only mergeWorker can merge coin');
    const coinInfo_0 = this.#_internalMerger_0(context,
                                               partialProofData,
                                               token_0,
                                               coins_0);
    this.#_addTreasuryCoin_0(context, partialProofData, coinInfo_0);
    return [];
  }
  #_addAdmin_0(context, partialProofData, admin_0) {
    __compactRuntime.assert(this.#_checkAdminAuthorized_0(context,
                                                          partialProofData),
                            'not admin authorized');
    __compactRuntime.assert(!_descriptor_3.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(6n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(admin_0),
                                                                                                                             alignment: _descriptor_2.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value),
                            'admin already exists');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(6n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(admin_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(true),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_removeAdmin_0(context, partialProofData, admin_0) {
    __compactRuntime.assert(this.#_checkAdminAuthorized_0(context,
                                                          partialProofData),
                            'not admin authorized');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(1n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(6n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(admin_0),
                                                                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'admin does not exist');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(6n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(admin_0),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_setAdminThreshold_0(context, partialProofData, threshold_0) {
    __compactRuntime.assert(this.#_checkAdminAuthorized_0(context,
                                                          partialProofData),
                            'not admin authorized');
    __compactRuntime.assert(threshold_0
                            <=
                            _descriptor_11.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(6n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      'size',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value),
                            'threshold must be less than or equal to the number of admins');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(7n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(threshold_0),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  #_setSmgPksks_0(context, partialProofData, pks_0) {
    __compactRuntime.assert(this.#_checkAdminAuthorized_0(context,
                                                          partialProofData),
                            'not admin authorized');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(3n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    this.#_folder_2(context,
                    partialProofData,
                    ((context, partialProofData, index_0, pk_0) =>
                     {
                       Contract._query(context,
                                       partialProofData,
                                       [
                                        { idx: { cached: false,
                                                 pushPath: true,
                                                 path: [
                                                        { tag: 'value',
                                                          value: { value: _descriptor_14.toValue(1n),
                                                                   alignment: _descriptor_14.alignment() } },
                                                        { tag: 'value',
                                                          value: { value: _descriptor_14.toValue(2n),
                                                                   alignment: _descriptor_14.alignment() } }] } },
                                        { push: { storage: false,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(index_0),
                                                                                               alignment: _descriptor_14.alignment() }).encode() } },
                                        { push: { storage: true,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(pk_0),
                                                                                               alignment: _descriptor_8.alignment() }).encode() } },
                                        { ins: { cached: false, n: 1 } },
                                        { ins: { cached: true, n: 2 } }]);
                       Contract._query(context,
                                       partialProofData,
                                       [
                                        { idx: { cached: false,
                                                 pushPath: true,
                                                 path: [
                                                        { tag: 'value',
                                                          value: { value: _descriptor_14.toValue(1n),
                                                                   alignment: _descriptor_14.alignment() } },
                                                        { tag: 'value',
                                                          value: { value: _descriptor_14.toValue(3n),
                                                                   alignment: _descriptor_14.alignment() } }] } },
                                        { push: { storage: false,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(pk_0),
                                                                                               alignment: _descriptor_8.alignment() }).encode() } },
                                        { push: { storage: true,
                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(index_0),
                                                                                               alignment: _descriptor_14.alignment() }).encode() } },
                                        { ins: { cached: false, n: 1 } },
                                        { ins: { cached: true, n: 2 } }]);
                       return ((t1) => {
                                if (t1 > 255n)
                                  throw new __compactRuntime.CompactError('crosschain.compact line 504 char 12: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 255');
                                return t1;
                              })(index_0 + 1n);
                     }),
                    0n,
                    pks_0);
    return [];
  }
  #_updateSmgPk_0(context, partialProofData, id_0, newPk_0, R_0, signature_0) {
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(1n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(id_0),
                                                                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'smg pk does not exist');
    const hash_0 = this.#_persistentHash_6(context, partialProofData, newPk_0);
    __compactRuntime.assert(this.#_verifySignature_0(context,
                                                     partialProofData,
                                                     hash_0,
                                                     _descriptor_8.fromValue(Contract._query(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 0 } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_14.toValue(1n),
                                                                                                                         alignment: _descriptor_14.alignment() } },
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_14.toValue(2n),
                                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_14.toValue(id_0),
                                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                                              { popeq: { cached: false,
                                                                                                         result: undefined } }]).value),
                                                     R_0,
                                                     signature_0),
                            'invalid signature');
    const tmp_0 = _descriptor_8.fromValue(Contract._query(context,
                                                          partialProofData,
                                                          [
                                                           { dup: { n: 0 } },
                                                           { idx: { cached: false,
                                                                    pushPath: false,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_14.toValue(1n),
                                                                                      alignment: _descriptor_14.alignment() } },
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_14.toValue(2n),
                                                                                      alignment: _descriptor_14.alignment() } }] } },
                                                           { idx: { cached: false,
                                                                    pushPath: false,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_14.toValue(id_0),
                                                                                      alignment: _descriptor_14.alignment() } }] } },
                                                           { popeq: { cached: false,
                                                                      result: undefined } }]).value);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(3n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(tmp_0),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(3n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(newPk_0),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(id_0),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(id_0),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(newPk_0),
                                                                            alignment: _descriptor_8.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_checkAdminAuthorized_0(context, partialProofData) {
    const isOwner_0 = this.#_equal_7(_descriptor_2.fromValue(Contract._query(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(1n),
                                                                                                         alignment: _descriptor_14.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(12n),
                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value),
                                     this.#_ownPublicKey_0(context,
                                                           partialProofData));
    let tmp_0, tmp_1;
    const isAdminAuthorized_0 = (tmp_1 = _descriptor_0.fromValue(Contract._query(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(1n),
                                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(10n),
                                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value),
                                 _descriptor_3.fromValue(Contract._query(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(1n),
                                                                                                     alignment: _descriptor_14.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(11n),
                                                                                                     alignment: _descriptor_14.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                                                                 alignment: _descriptor_0.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value))
                                &&
                                (tmp_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(1n),
                                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(10n),
                                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value),
                                 _descriptor_11.fromValue(Contract._query(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_14.toValue(1n),
                                                                                                      alignment: _descriptor_14.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_14.toValue(11n),
                                                                                                      alignment: _descriptor_14.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_0.toValue(tmp_0),
                                                                                                      alignment: _descriptor_0.alignment() } }] } },
                                                                           'size',
                                                                           { popeq: { cached: true,
                                                                                      result: undefined } }]).value))
                                >=
                                _descriptor_14.fromValue(Contract._query(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(1n),
                                                                                                     alignment: _descriptor_14.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(7n),
                                                                                                     alignment: _descriptor_14.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
    return isOwner_0
           &&
           this.#_equal_8(_descriptor_14.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_14.toValue(1n),
                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_14.toValue(7n),
                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value),
                          0n)
           ||
           isAdminAuthorized_0;
  }
  #_setSmgPKThreold_0(context, partialProofData, threshold_0) {
    __compactRuntime.assert(this.#_checkAdminAuthorized_0(context,
                                                          partialProofData),
                            'not admin authorized');
    __compactRuntime.assert(threshold_0
                            <=
                            _descriptor_11.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      'size',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value),
                            'threshold must be less than or equal to the number of smg pks');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(4n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(threshold_0),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  #_setFeeCommonConfig_0(context, partialProofData, chainId_0, fee_0) {
    __compactRuntime.assert(this.#_checkAdminAuthorized_0(context,
                                                          partialProofData),
                            'not admin authorized');
    if (_descriptor_3.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_14.toValue(1n),
                                                                            alignment: _descriptor_14.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_14.toValue(0n),
                                                                            alignment: _descriptor_14.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(chainId_0),
                                                                                                        alignment: _descriptor_0.alignment() }).encode() } },
                                                 'member',
                                                 { popeq: { cached: true,
                                                            result: undefined } }]).value))
    {
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(1n),
                                                  alignment: _descriptor_14.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(0n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(chainId_0),
                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                       { rem: { cached: false } },
                       { ins: { cached: true, n: 2 } }]);
    }
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(chainId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(fee_0),
                                                                            alignment: _descriptor_5.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_addTokenPair_0(context, partialProofData, tokenPairId_0, pairInfo_0) {
    __compactRuntime.assert(this.#_equal_9(_descriptor_2.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(8n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value),
                                           this.#_ownPublicKey_0(context,
                                                                 partialProofData))
                            ||
                            this.#_checkAdminAuthorized_0(context,
                                                          partialProofData),
                            'not authorized');
    __compactRuntime.assert(!_descriptor_3.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(7n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenPairId_0),
                                                                                                                             alignment: _descriptor_0.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value),
                            'token pair already exists');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(7n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenPairId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_12.toValue(pairInfo_0),
                                                                            alignment: _descriptor_12.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_removeTokenPair_0(context, partialProofData, tokenPairId_0) {
    __compactRuntime.assert(this.#_equal_10(_descriptor_2.fromValue(Contract._query(context,
                                                                                    partialProofData,
                                                                                    [
                                                                                     { dup: { n: 0 } },
                                                                                     { idx: { cached: false,
                                                                                              pushPath: false,
                                                                                              path: [
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_14.toValue(0n),
                                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                                     { tag: 'value',
                                                                                                       value: { value: _descriptor_14.toValue(8n),
                                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                                     { popeq: { cached: false,
                                                                                                result: undefined } }]).value),
                                            this.#_ownPublicKey_0(context,
                                                                  partialProofData))
                            ||
                            this.#_checkAdminAuthorized_0(context,
                                                          partialProofData),
                            'not authorized');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(0n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(7n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenPairId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'token pair does not exist');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(0n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(7n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tokenPairId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_newProposal_0(context, partialProofData, newProposal_0) {
    const tmp_0 = ((t1) => {
                    if (t1 > 4294967295n)
                      throw new __compactRuntime.CompactError('crosschain.compact line 557 char 20: cast from field value to Uint value failed: ' + t1 + ' is greater than 4294967295');
                    return t1;
                  })(_descriptor_11.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_14.toValue(1n),
                                                                                          alignment: _descriptor_14.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_14.toValue(8n),
                                                                                          alignment: _descriptor_14.alignment() } }] } },
                                                               { popeq: { cached: true,
                                                                          result: undefined } }]).value));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(9n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(newProposal_0),
                                                                            alignment: _descriptor_10.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    const tmp_1 = ((t1) => {
                    if (t1 > 4294967295n)
                      throw new __compactRuntime.CompactError('crosschain.compact line 558 char 32: cast from field value to Uint value failed: ' + t1 + ' is greater than 4294967295');
                    return t1;
                  })(_descriptor_11.fromValue(Contract._query(context,
                                                              partialProofData,
                                                              [
                                                               { dup: { n: 0 } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_14.toValue(1n),
                                                                                          alignment: _descriptor_14.alignment() } },
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_14.toValue(8n),
                                                                                          alignment: _descriptor_14.alignment() } }] } },
                                                               { popeq: { cached: true,
                                                                          result: undefined } }]).value));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(11n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    this.#_voteProposal_0(context,
                          partialProofData,
                          ((t1) => {
                            if (t1 > 4294967295n)
                              throw new __compactRuntime.CompactError('crosschain.compact line 559 char 16: cast from field value to Uint value failed: ' + t1 + ' is greater than 4294967295');
                            return t1;
                          })(_descriptor_11.fromValue(Contract._query(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_14.toValue(1n),
                                                                                                  alignment: _descriptor_14.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_14.toValue(8n),
                                                                                                  alignment: _descriptor_14.alignment() } }] } },
                                                                       { popeq: { cached: true,
                                                                                  result: undefined } }]).value)));
    const tmp_2 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(8n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_13.toValue(tmp_2),
                                              alignment: _descriptor_13.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_voteProposal_0(context, partialProofData, proposalId_0) {
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this.#_ownPublicKey_0(context,
                                                           partialProofData),
                             _descriptor_3.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(6n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_0),
                                                                                                                             alignment: _descriptor_2.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value)),
                            'only admin can vote proposal');
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(1n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(9n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proposalId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'proposal does not exist');
    const tmp_1 = this.#_ownPublicKey_0(context, partialProofData);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(11n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_0.toValue(proposalId_0),
                                                alignment: _descriptor_0.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(tmp_1),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 3 } }]);
    return [];
  }
  #_executeProposal_0(context, partialProofData, proposalId_0) {
    __compactRuntime.assert(_descriptor_3.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(1n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(11n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proposalId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'proposal does not exist');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(10n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proposalId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    let tmp_0;
    const currentProposal_0 = (tmp_0 = _descriptor_0.fromValue(Contract._query(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(1n),
                                                                                                           alignment: _descriptor_14.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(10n),
                                                                                                           alignment: _descriptor_14.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value),
                               _descriptor_10.fromValue(Contract._query(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_14.toValue(1n),
                                                                                                    alignment: _descriptor_14.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_14.toValue(9n),
                                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_0.toValue(tmp_0),
                                                                                                    alignment: _descriptor_0.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value));
    if (currentProposal_0.type === 0) {
      this.#_addAdmin_0(context, partialProofData, currentProposal_0.addr);
    } else {
      if (currentProposal_0.type === 1) {
        this.#_removeAdmin_0(context, partialProofData, currentProposal_0.addr);
      } else {
        if (currentProposal_0.type === 2) {
          this.#_setFeeReceiver_0(context,
                                  partialProofData,
                                  currentProposal_0.addr);
        } else {
          if (currentProposal_0.type === 3) {
            this.#_setTokenManager_0(context,
                                     partialProofData,
                                     currentProposal_0.addr);
          } else {
            if (currentProposal_0.type === 4) {
              this.#_setAdminThreshold_0(context,
                                         partialProofData,
                                         ((t1) => {
                                           if (t1 > 255n)
                                             throw new __compactRuntime.CompactError('crosschain.compact line 587 char 23: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 255');
                                           return t1;
                                         })(currentProposal_0.threshold));
            } else {
              if (currentProposal_0.type === 5) {
                this.#_setSmgPKThreold_0(context,
                                         partialProofData,
                                         ((t1) => {
                                           if (t1 > 255n)
                                             throw new __compactRuntime.CompactError('crosschain.compact line 589 char 21: cast from unsigned value to smaller unsigned value failed: ' + t1 + ' is greater than 255');
                                           return t1;
                                         })(currentProposal_0.threshold));
              } else {
                if (currentProposal_0.type === 6) {
                  this.#_setFeeCommonConfig_0(context,
                                              partialProofData,
                                              currentProposal_0.feeConfig.chainId,
                                              currentProposal_0.feeConfig.fee);
                } else {
                  if (currentProposal_0.type === 7) {
                    this.#_setSmgPksks_0(context,
                                         partialProofData,
                                         currentProposal_0.smgPubkeys);
                  }
                }
              }
            }
          }
        }
      }
    }
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(9n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proposalId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(11n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(proposalId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  #_equal_0(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) return false;
    return true;
  }
  #_folder_0(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 29; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_folder_1(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 4; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_equal_3(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_4(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) return false;
    }
    return true;
  }
  #_equal_5(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) return false;
    }
    return true;
  }
  #_equal_6(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) return false;
    }
    return true;
  }
  #_folder_2(context, partialProofData, f, x, a0)
  {
    for (let i = 0; i < 29; i++) x = f(context, partialProofData, x, a0[i]);
    return x;
  }
  #_equal_7(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) return false;
    }
    return true;
  }
  #_equal_8(x0, y0) {
    if (x0 !== y0) return false;
    return true;
  }
  #_equal_9(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) return false;
    }
    return true;
  }
  #_equal_10(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) return false;
    }
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
    get outBoundCounter() {
      return _descriptor_11.fromValue(Contract._query(context,
                                                      partialProofData,
                                                      [
                                                       { dup: { n: 0 } },
                                                       { idx: { cached: false,
                                                                pushPath: false,
                                                                path: [
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(0n),
                                                                                  alignment: _descriptor_14.alignment() } },
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(0n),
                                                                                  alignment: _descriptor_14.alignment() } }] } },
                                                       { popeq: { cached: true,
                                                                  result: undefined } }]).value);
    },
    get inBoundCounter() {
      return _descriptor_11.fromValue(Contract._query(context,
                                                      partialProofData,
                                                      [
                                                       { dup: { n: 0 } },
                                                       { idx: { cached: false,
                                                                pushPath: false,
                                                                path: [
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(0n),
                                                                                  alignment: _descriptor_14.alignment() } },
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(1n),
                                                                                  alignment: _descriptor_14.alignment() } }] } },
                                                       { popeq: { cached: true,
                                                                  result: undefined } }]).value);
    },
    get nonce() {
      return _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    smgTxSigners: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(3n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_11.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(0n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(3n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         'size',
                                                         { popeq: { cached: true,
                                                                    result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const elem_0 = args_0[0];
        if (!(typeof(elem_0) === 'object' && typeof(elem_0.x) === 'bigint' && elem_0.x >= 0 && elem_0.x <= __compactRuntime.MAX_FIELD && typeof(elem_0.y) === 'bigint' && elem_0.y >= 0 && elem_0.y <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 28 char 1',
                                      'struct CurvePoint<x: Field, y: Field>',
                                      elem_0)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(3n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(elem_0),
                                                                                                               alignment: _descriptor_8.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        const self_0 = state.asArray()[0].asArray()[3];
        return self_0.asMap().keys().map((elem) => _descriptor_8.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    get latestOutBoundCrosstxInfo() {
      return _descriptor_24.fromValue(Contract._query(context,
                                                      partialProofData,
                                                      [
                                                       { dup: { n: 0 } },
                                                       { idx: { cached: false,
                                                                pushPath: false,
                                                                path: [
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(0n),
                                                                                  alignment: _descriptor_14.alignment() } },
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(4n),
                                                                                  alignment: _descriptor_14.alignment() } }] } },
                                                       { popeq: { cached: false,
                                                                  result: undefined } }]).value);
    },
    treasuryCoins: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(5n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_11.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(0n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(5n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         'size',
                                                         { popeq: { cached: true,
                                                                    result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 32 char 1',
                                      'Bytes<32>',
                                      key_0)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(5n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 32 char 1',
                                      'Bytes<32>',
                                      key_0)
        if (state.asArray()[0].asArray()[5].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                          alignment: _descriptor_1.alignment() }) === undefined)
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0)
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            return _descriptor_3.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(0n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(5n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                                   alignment: _descriptor_11.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0)
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            return _descriptor_11.fromValue(Contract._query(context,
                                                            partialProofData,
                                                            [
                                                             { dup: { n: 0 } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_14.toValue(0n),
                                                                                        alignment: _descriptor_14.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_14.toValue(5n),
                                                                                        alignment: _descriptor_14.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_1.toValue(key_0),
                                                                                        alignment: _descriptor_1.alignment() } }] } },
                                                             'size',
                                                             { popeq: { cached: true,
                                                                        result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1)
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0 && key_1 <= 340282366920938463463374607431768211455n))
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'crosschain.compact line 32 char 45',
                                          'Uint<0..340282366920938463463374607431768211455>',
                                          key_1)
            return _descriptor_3.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(0n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(5n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_1.toValue(key_0),
                                                                                       alignment: _descriptor_1.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_5.toValue(key_1),
                                                                                                                   alignment: _descriptor_5.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          lookup(...args_1) {
            if (args_1.length !== 1)
              throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_1.length}`);
            const key_1 = args_1[0];
            if (!(typeof(key_1) === 'bigint' && key_1 >= 0 && key_1 <= 340282366920938463463374607431768211455n))
              __compactRuntime.type_error('lookup',
                                          'argument 1',
                                          'crosschain.compact line 32 char 45',
                                          'Uint<0..340282366920938463463374607431768211455>',
                                          key_1)
            return _descriptor_16.fromValue(Contract._query(context,
                                                            partialProofData,
                                                            [
                                                             { dup: { n: 0 } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_14.toValue(0n),
                                                                                        alignment: _descriptor_14.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_14.toValue(5n),
                                                                                        alignment: _descriptor_14.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_1.toValue(key_0),
                                                                                        alignment: _descriptor_1.alignment() } }] } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_5.toValue(key_1),
                                                                                        alignment: _descriptor_5.alignment() } }] } },
                                                             { popeq: { cached: false,
                                                                        result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0)
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            const self_0 = state.asArray()[0].asArray()[5].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                                         alignment: _descriptor_1.alignment() });
            return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_5.fromValue(key.value),      _descriptor_16.fromValue(value.value)    ];  })[Symbol.iterator]();
          }
        }
      }
    },
    treasuryCoinCounter: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(6n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_11.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(0n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(6n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         'size',
                                                         { popeq: { cached: true,
                                                                    result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 33 char 1',
                                      'Bytes<32>',
                                      key_0)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(6n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(key_0),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 33 char 1',
                                      'Bytes<32>',
                                      key_0)
        if (state.asArray()[0].asArray()[6].asMap().get({ value: _descriptor_1.toValue(key_0),
                                                          alignment: _descriptor_1.alignment() }) === undefined)
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        return {
          read(...args_1) {
            if (args_1.length !== 0)
              throw new __compactRuntime.CompactError(`read: expected 0 arguments, received ${args_1.length}`);
            return _descriptor_11.fromValue(Contract._query(context,
                                                            partialProofData,
                                                            [
                                                             { dup: { n: 0 } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_14.toValue(0n),
                                                                                        alignment: _descriptor_14.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_14.toValue(6n),
                                                                                        alignment: _descriptor_14.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_1.toValue(key_0),
                                                                                        alignment: _descriptor_1.alignment() } }] } },
                                                             { popeq: { cached: true,
                                                                        result: undefined } }]).value);
          }
        }
      }
    },
    tokenPairs: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(7n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_11.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(0n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(7n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         'size',
                                                         { popeq: { cached: true,
                                                                    result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= 4294967295n))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 36 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(7n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= 4294967295n))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 36 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        return _descriptor_12.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(0n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(7n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_0.toValue(key_0),
                                                                                    alignment: _descriptor_0.alignment() } }] } },
                                                         { popeq: { cached: false,
                                                                    result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        const self_0 = state.asArray()[0].asArray()[7];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_12.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get tokenManager() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(8n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    feeCommonConfig: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_11.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(1n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(0n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         'size',
                                                         { popeq: { cached: true,
                                                                    result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= 4294967295n))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 40 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= 4294967295n))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 40 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        return _descriptor_5.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(0n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_0.toValue(key_0),
                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        const self_0 = state.asArray()[1].asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_5.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get feeReceiver() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    smgPubkeys: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_11.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(1n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(2n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         'size',
                                                         { popeq: { cached: true,
                                                                    result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= 255n))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 44 char 1',
                                      'Uint<0..255>',
                                      key_0)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(key_0),
                                                                                                               alignment: _descriptor_14.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= 255n))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 44 char 1',
                                      'Uint<0..255>',
                                      key_0)
        return _descriptor_8.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(key_0),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        const self_0 = state.asArray()[1].asArray()[2];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_14.fromValue(key.value),      _descriptor_8.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    smgPubkeysToIndex: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(3n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_11.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(1n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(3n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         'size',
                                                         { popeq: { cached: true,
                                                                    result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.x) === 'bigint' && key_0.x >= 0 && key_0.x <= __compactRuntime.MAX_FIELD && typeof(key_0.y) === 'bigint' && key_0.y >= 0 && key_0.y <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 45 char 1',
                                      'struct CurvePoint<x: Field, y: Field>',
                                      key_0)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(3n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_8.toValue(key_0),
                                                                                                               alignment: _descriptor_8.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.x) === 'bigint' && key_0.x >= 0 && key_0.x <= __compactRuntime.MAX_FIELD && typeof(key_0.y) === 'bigint' && key_0.y >= 0 && key_0.y <= __compactRuntime.MAX_FIELD))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 45 char 1',
                                      'struct CurvePoint<x: Field, y: Field>',
                                      key_0)
        return _descriptor_14.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(1n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(3n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_8.toValue(key_0),
                                                                                    alignment: _descriptor_8.alignment() } }] } },
                                                         { popeq: { cached: false,
                                                                    result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        const self_0 = state.asArray()[1].asArray()[3];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_8.fromValue(key.value),      _descriptor_14.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get smgPKThreshold() {
      return _descriptor_14.fromValue(Contract._query(context,
                                                      partialProofData,
                                                      [
                                                       { dup: { n: 0 } },
                                                       { idx: { cached: false,
                                                                pushPath: false,
                                                                path: [
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(1n),
                                                                                  alignment: _descriptor_14.alignment() } },
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(4n),
                                                                                  alignment: _descriptor_14.alignment() } }] } },
                                                       { popeq: { cached: false,
                                                                  result: undefined } }]).value);
    },
    get smgPKCount() {
      return _descriptor_14.fromValue(Contract._query(context,
                                                      partialProofData,
                                                      [
                                                       { dup: { n: 0 } },
                                                       { idx: { cached: false,
                                                                pushPath: false,
                                                                path: [
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(1n),
                                                                                  alignment: _descriptor_14.alignment() } },
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(5n),
                                                                                  alignment: _descriptor_14.alignment() } }] } },
                                                       { popeq: { cached: false,
                                                                  result: undefined } }]).value);
    },
    admins: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(6n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_11.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(1n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(6n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         'size',
                                                         { popeq: { cached: true,
                                                                    result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 50 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      key_0)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(6n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(key_0),
                                                                                                               alignment: _descriptor_2.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 50 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      key_0)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(6n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_2.toValue(key_0),
                                                                                   alignment: _descriptor_2.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        const self_0 = state.asArray()[1].asArray()[6];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_2.fromValue(key.value),      _descriptor_3.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get adminThreshold() {
      return _descriptor_14.fromValue(Contract._query(context,
                                                      partialProofData,
                                                      [
                                                       { dup: { n: 0 } },
                                                       { idx: { cached: false,
                                                                pushPath: false,
                                                                path: [
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(1n),
                                                                                  alignment: _descriptor_14.alignment() } },
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(7n),
                                                                                  alignment: _descriptor_14.alignment() } }] } },
                                                       { popeq: { cached: false,
                                                                  result: undefined } }]).value);
    },
    get proposalId() {
      return _descriptor_11.fromValue(Contract._query(context,
                                                      partialProofData,
                                                      [
                                                       { dup: { n: 0 } },
                                                       { idx: { cached: false,
                                                                pushPath: false,
                                                                path: [
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(1n),
                                                                                  alignment: _descriptor_14.alignment() } },
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(8n),
                                                                                  alignment: _descriptor_14.alignment() } }] } },
                                                       { popeq: { cached: true,
                                                                  result: undefined } }]).value);
    },
    proposals: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(9n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_11.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(1n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(9n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         'size',
                                                         { popeq: { cached: true,
                                                                    result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= 4294967295n))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 55 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(9n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= 4294967295n))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 55 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        return _descriptor_10.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(1n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(9n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_0.toValue(key_0),
                                                                                    alignment: _descriptor_0.alignment() } }] } },
                                                         { popeq: { cached: false,
                                                                    result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        const self_0 = state.asArray()[1].asArray()[9];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_10.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get currentExcuteProposalId() {
      return _descriptor_0.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(10n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    proposalVoters: {
      isEmpty(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(11n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                               alignment: _descriptor_11.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0)
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        return _descriptor_11.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(1n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(11n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         'size',
                                                         { popeq: { cached: true,
                                                                    result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= 4294967295n))
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 57 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        return _descriptor_3.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(11n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1)
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0 && key_0 <= 4294967295n))
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 57 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        if (state.asArray()[1].asArray()[11].asMap().get({ value: _descriptor_0.toValue(key_0),
                                                           alignment: _descriptor_0.alignment() }) === undefined)
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0)
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            return _descriptor_3.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(1n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(11n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(key_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_11.toValue(0n),
                                                                                                                   alignment: _descriptor_11.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0)
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            return _descriptor_11.fromValue(Contract._query(context,
                                                            partialProofData,
                                                            [
                                                             { dup: { n: 0 } },
                                                             { idx: { cached: false,
                                                                      pushPath: false,
                                                                      path: [
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_14.toValue(1n),
                                                                                        alignment: _descriptor_14.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_14.toValue(11n),
                                                                                        alignment: _descriptor_14.alignment() } },
                                                                             { tag: 'value',
                                                                               value: { value: _descriptor_0.toValue(key_0),
                                                                                        alignment: _descriptor_0.alignment() } }] } },
                                                             'size',
                                                             { popeq: { cached: true,
                                                                        result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1)
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            const elem_0 = args_1[0];
            if (!(typeof(elem_0) === 'object' && elem_0.bytes.buffer instanceof ArrayBuffer && elem_0.bytes.BYTES_PER_ELEMENT === 1 && elem_0.bytes.length === 32))
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'crosschain.compact line 57 char 45',
                                          'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                          elem_0)
            return _descriptor_3.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(1n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(11n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(key_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(elem_0),
                                                                                                                   alignment: _descriptor_2.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0)
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            const self_0 = state.asArray()[1].asArray()[11].asMap().get({ value: _descriptor_0.toValue(key_0),
                                                                          alignment: _descriptor_0.alignment() });
            return self_0.asMap().keys().map((elem) => _descriptor_2.fromValue(elem.value))[Symbol.iterator]();
          }
        }
      }
    },
    get owner() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(12n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get pendingOwner() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(13n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get mergeWorker() {
      return _descriptor_2.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(14n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
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
  verifySignature: (...args_0) => _dummyContract.circuits.verifySignature(_emptyContext, ...args_0).result,
  hashProof: (...args_1) => _dummyContract.circuits.hashProof(_emptyContext, ...args_1).result
};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
