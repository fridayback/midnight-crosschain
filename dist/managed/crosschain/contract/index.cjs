'use strict';
const __compactRuntime = require('@midnight-ntwrk/compact-runtime');
const expectedRuntimeVersionString = '0.9.0';
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

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_2 = new __compactRuntime.CompactTypeBoolean();

const _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);

class _ZswapCoinPublicKey_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_4 = new _ZswapCoinPublicKey_0();

const _descriptor_5 = new __compactRuntime.CompactTypeEnum(7, 1);

const _descriptor_6 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _FeeConfig_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_6.alignment());
  }
  fromValue(value_0) {
    return {
      chainId: _descriptor_3.fromValue(value_0),
      fee: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.chainId).concat(_descriptor_6.toValue(value_0.fee));
  }
}

const _descriptor_7 = new _FeeConfig_0();

const _descriptor_8 = new __compactRuntime.CompactTypeVector(29, _descriptor_4);

class _Proposal_0 {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_4.alignment().concat(_descriptor_6.alignment().concat(_descriptor_7.alignment().concat(_descriptor_8.alignment()))));
  }
  fromValue(value_0) {
    return {
      type: _descriptor_5.fromValue(value_0),
      addr: _descriptor_4.fromValue(value_0),
      threshold: _descriptor_6.fromValue(value_0),
      feeConfig: _descriptor_7.fromValue(value_0),
      smgPubkeys: _descriptor_8.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.type).concat(_descriptor_4.toValue(value_0.addr).concat(_descriptor_6.toValue(value_0.threshold).concat(_descriptor_7.toValue(value_0.feeConfig).concat(_descriptor_8.toValue(value_0.smgPubkeys)))));
  }
}

const _descriptor_9 = new _Proposal_0();

const _descriptor_10 = new __compactRuntime.CompactTypeVector(20, _descriptor_0);

const _descriptor_11 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

class _ContractAddress_0 {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
}

const _descriptor_12 = new _ContractAddress_0();

class _TokenPairInfo_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment()))));
  }
  fromValue(value_0) {
    return {
      fromChainId: _descriptor_3.fromValue(value_0),
      toChainId: _descriptor_3.fromValue(value_0),
      midnigthTokenAccount: _descriptor_0.fromValue(value_0),
      domainSep: _descriptor_0.fromValue(value_0),
      fee: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.fromChainId).concat(_descriptor_3.toValue(value_0.toChainId).concat(_descriptor_0.toValue(value_0.midnigthTokenAccount).concat(_descriptor_0.toValue(value_0.domainSep).concat(_descriptor_6.toValue(value_0.fee)))));
  }
}

const _descriptor_13 = new _TokenPairInfo_0();

const _descriptor_14 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

const _descriptor_15 = new __compactRuntime.CompactTypeVector(2, _descriptor_6);

class _ReserveOfToken_0 {
  alignment() {
    return _descriptor_6.alignment().concat(_descriptor_2.alignment());
  }
  fromValue(value_0) {
    return {
      total: _descriptor_6.fromValue(value_0),
      isMappingToken: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0.total).concat(_descriptor_2.toValue(value_0.isMappingToken));
  }
}

const _descriptor_16 = new _ReserveOfToken_0();

class _QualifiedCoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_1.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_6.fromValue(value_0),
      mt_index: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_6.toValue(value_0.value).concat(_descriptor_1.toValue(value_0.mt_index))));
  }
}

const _descriptor_17 = new _QualifiedCoinInfo_0();

class _ClaimCoinInfo_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_17.alignment());
  }
  fromValue(value_0) {
    return {
      receiver: _descriptor_4.fromValue(value_0),
      coin: _descriptor_17.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.receiver).concat(_descriptor_17.toValue(value_0.coin));
  }
}

const _descriptor_18 = new _ClaimCoinInfo_0();

class _CoinInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_6.toValue(value_0.value)));
  }
}

const _descriptor_19 = new _CoinInfo_0();

class _ClaimMappingTokenInfo_0 {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment()));
  }
  fromValue(value_0) {
    return {
      receiver: _descriptor_4.fromValue(value_0),
      domainSep: _descriptor_0.fromValue(value_0),
      amount: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.receiver).concat(_descriptor_0.toValue(value_0.domainSep).concat(_descriptor_6.toValue(value_0.amount)));
  }
}

const _descriptor_20 = new _ClaimMappingTokenInfo_0();

class _CrossProposal_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_6.alignment().concat(_descriptor_6.alignment().concat(_descriptor_4.alignment().concat(_descriptor_1.alignment())))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_0.fromValue(value_0),
      token: _descriptor_0.fromValue(value_0),
      tokenPairId: _descriptor_3.fromValue(value_0),
      isMappingToken: _descriptor_2.fromValue(value_0),
      amount: _descriptor_6.fromValue(value_0),
      fee: _descriptor_6.fromValue(value_0),
      toAddr: _descriptor_4.fromValue(value_0),
      ttl: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.smgId).concat(_descriptor_0.toValue(value_0.token).concat(_descriptor_3.toValue(value_0.tokenPairId).concat(_descriptor_2.toValue(value_0.isMappingToken).concat(_descriptor_6.toValue(value_0.amount).concat(_descriptor_6.toValue(value_0.fee).concat(_descriptor_4.toValue(value_0.toAddr).concat(_descriptor_1.toValue(value_0.ttl))))))));
  }
}

const _descriptor_21 = new _CrossProposal_0();

class _SmgEvent_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_21.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_0.fromValue(value_0),
      crossProposal: _descriptor_21.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.uniqueId).concat(_descriptor_21.toValue(value_0.crossProposal));
  }
}

const _descriptor_22 = new _SmgEvent_0();

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_4.alignment().concat(_descriptor_12.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_4.fromValue(value_0),
      right: _descriptor_12.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_4.toValue(value_0.left).concat(_descriptor_12.toValue(value_0.right)));
  }
}

const _descriptor_23 = new _Either_0();

class _ExecuteCrossProposalInfo_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_6.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_0.fromValue(value_0),
      coinIndex: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.uniqueId).concat(_descriptor_6.toValue(value_0.coinIndex));
  }
}

const _descriptor_24 = new _ExecuteCrossProposalInfo_0();

const _descriptor_25 = new __compactRuntime.CompactTypeVector(5, _descriptor_24);

class _VoteForCrossPropasal_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_0.fromValue(value_0),
      ttl: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.uniqueId).concat(_descriptor_1.toValue(value_0.ttl));
  }
}

const _descriptor_26 = new _VoteForCrossPropasal_0();

const _descriptor_27 = new __compactRuntime.CompactTypeVector(5, _descriptor_26);

const _descriptor_28 = new __compactRuntime.CompactTypeOpaqueString();

class _CrossOutBound_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_28.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_6.alignment().concat(_descriptor_6.alignment().concat(_descriptor_6.alignment())))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_0.fromValue(value_0),
      fromAddr: _descriptor_4.fromValue(value_0),
      toAddr: _descriptor_28.fromValue(value_0),
      tokenPairId: _descriptor_3.fromValue(value_0),
      tokenAccount: _descriptor_0.fromValue(value_0),
      amount: _descriptor_6.fromValue(value_0),
      fee: _descriptor_6.fromValue(value_0),
      nonce: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.smgId).concat(_descriptor_4.toValue(value_0.fromAddr).concat(_descriptor_28.toValue(value_0.toAddr).concat(_descriptor_3.toValue(value_0.tokenPairId).concat(_descriptor_0.toValue(value_0.tokenAccount).concat(_descriptor_6.toValue(value_0.amount).concat(_descriptor_6.toValue(value_0.fee).concat(_descriptor_6.toValue(value_0.nonce))))))));
  }
}

const _descriptor_29 = new _CrossOutBound_0();

class _Maybe_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_19.alignment());
  }
  fromValue(value_0) {
    return {
      is_some: _descriptor_2.fromValue(value_0),
      value: _descriptor_19.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_some).concat(_descriptor_19.toValue(value_0.value));
  }
}

const _descriptor_30 = new _Maybe_0();

class _SendResult_0 {
  alignment() {
    return _descriptor_30.alignment().concat(_descriptor_19.alignment());
  }
  fromValue(value_0) {
    return {
      change: _descriptor_30.fromValue(value_0),
      sent: _descriptor_19.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_30.toValue(value_0.change).concat(_descriptor_19.toValue(value_0.sent));
  }
}

const _descriptor_31 = new _SendResult_0();

const _descriptor_32 = new __compactRuntime.CompactTypeField();

const _descriptor_33 = new __compactRuntime.CompactTypeBytes(6);

class _CoinPreimage_0 {
  alignment() {
    return _descriptor_19.alignment().concat(_descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_33.alignment())));
  }
  fromValue(value_0) {
    return {
      info: _descriptor_19.fromValue(value_0),
      dataType: _descriptor_2.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0),
      domain_sep: _descriptor_33.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_19.toValue(value_0.info).concat(_descriptor_2.toValue(value_0.dataType).concat(_descriptor_0.toValue(value_0.data).concat(_descriptor_33.toValue(value_0.domain_sep))));
  }
}

const _descriptor_34 = new _CoinPreimage_0();

const _descriptor_35 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

const _descriptor_36 = new __compactRuntime.CompactTypeVector(2, _descriptor_32);

const _descriptor_37 = new __compactRuntime.CompactTypeVector(3, _descriptor_32);

class _CurvePoint_0 {
  alignment() {
    return _descriptor_32.alignment().concat(_descriptor_32.alignment());
  }
  fromValue(value_0) {
    return {
      x: _descriptor_32.fromValue(value_0),
      y: _descriptor_32.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_32.toValue(value_0.x).concat(_descriptor_32.toValue(value_0.y));
  }
}

const _descriptor_38 = new _CurvePoint_0();

class Contract {
  witnesses;
  constructor(...args_0) {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof(witnesses_0) !== 'object') {
      throw new __compactRuntime.CompactError('first (witnesses) argument to Contract constructor is not an object');
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      userLock(context, ...args_1) {
        return { result: pureCircuits.userLock(...args_1), context };
      },
      smgRelease(context, ...args_1) {
        return { result: pureCircuits.smgRelease(...args_1), context };
      },
      smgMint: (...args_1) => {
        if (args_1.length !== 8) {
          throw new __compactRuntime.CompactError(`smgMint: expected 8 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const uniqueId_0 = args_1[1];
        const smgId_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        const fee_0 = args_1[5];
        const toAddr_0 = args_1[6];
        const ttl_0 = args_1[7];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('smgMint',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 232 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32)) {
          __compactRuntime.type_error('smgMint',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 232 char 1',
                                      'Bytes<32>',
                                      uniqueId_0)
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime.type_error('smgMint',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 232 char 1',
                                      'Bytes<32>',
                                      smgId_0)
        }
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.type_error('smgMint',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'crosschain.compact line 232 char 1',
                                      'Uint<0..4294967295>',
                                      tokenPairId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('smgMint',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'crosschain.compact line 232 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      amount_0)
        }
        if (!(typeof(fee_0) === 'bigint' && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('smgMint',
                                      'argument 5 (argument 6 as invoked from Typescript)',
                                      'crosschain.compact line 232 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      fee_0)
        }
        if (!(typeof(toAddr_0) === 'object' && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32)) {
          __compactRuntime.type_error('smgMint',
                                      'argument 6 (argument 7 as invoked from Typescript)',
                                      'crosschain.compact line 232 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      toAddr_0)
        }
        if (!(typeof(ttl_0) === 'bigint' && ttl_0 >= 0n && ttl_0 <= 18446744073709551615n)) {
          __compactRuntime.type_error('smgMint',
                                      'argument 7 (argument 8 as invoked from Typescript)',
                                      'crosschain.compact line 232 char 1',
                                      'Uint<0..18446744073709551615>',
                                      ttl_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(uniqueId_0).concat(_descriptor_0.toValue(smgId_0).concat(_descriptor_3.toValue(tokenPairId_0).concat(_descriptor_6.toValue(amount_0).concat(_descriptor_6.toValue(fee_0).concat(_descriptor_4.toValue(toAddr_0).concat(_descriptor_1.toValue(ttl_0))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_6.alignment().concat(_descriptor_6.alignment().concat(_descriptor_4.alignment().concat(_descriptor_1.alignment()))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._smgMint_0(context,
                                         partialProofData,
                                         uniqueId_0,
                                         smgId_0,
                                         tokenPairId_0,
                                         amount_0,
                                         fee_0,
                                         toAddr_0,
                                         ttl_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      userBurn: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`userBurn: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const smgId_0 = args_1[1];
        const toAddr_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const coin_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('userBurn',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 242 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime.type_error('userBurn',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 242 char 1',
                                      'Bytes<32>',
                                      smgId_0)
        }
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.type_error('userBurn',
                                      'argument 3 (argument 4 as invoked from Typescript)',
                                      'crosschain.compact line 242 char 1',
                                      'Uint<0..4294967295>',
                                      tokenPairId_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('userBurn',
                                      'argument 4 (argument 5 as invoked from Typescript)',
                                      'crosschain.compact line 242 char 1',
                                      'struct CoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211455>>',
                                      coin_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(smgId_0).concat(_descriptor_28.toValue(toAddr_0).concat(_descriptor_3.toValue(tokenPairId_0).concat(_descriptor_19.toValue(coin_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_28.alignment().concat(_descriptor_3.alignment().concat(_descriptor_19.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userBurn_0(context,
                                          partialProofData,
                                          smgId_0,
                                          toAddr_0,
                                          tokenPairId_0,
                                          coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      voteMultiCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`voteMultiCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const uniqueIds_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('voteMultiCrossProposal',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 321 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(Array.isArray(uniqueIds_0) && uniqueIds_0.length === 5 && uniqueIds_0.every((t) => typeof(t) === 'object' && t.uniqueId.buffer instanceof ArrayBuffer && t.uniqueId.BYTES_PER_ELEMENT === 1 && t.uniqueId.length === 32 && typeof(t.ttl) === 'bigint' && t.ttl >= 0n && t.ttl <= 18446744073709551615n))) {
          __compactRuntime.type_error('voteMultiCrossProposal',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 321 char 1',
                                      'Vector<5, struct VoteForCrossPropasal<uniqueId: Bytes<32>, ttl: Uint<0..18446744073709551615>>>',
                                      uniqueIds_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_27.toValue(uniqueIds_0),
            alignment: _descriptor_27.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._voteMultiCrossProposal_0(context,
                                                        partialProofData,
                                                        uniqueIds_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      voteCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`voteCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const target_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('voteCrossProposal',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 329 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(target_0) === 'object' && target_0.uniqueId.buffer instanceof ArrayBuffer && target_0.uniqueId.BYTES_PER_ELEMENT === 1 && target_0.uniqueId.length === 32 && typeof(target_0.ttl) === 'bigint' && target_0.ttl >= 0n && target_0.ttl <= 18446744073709551615n)) {
          __compactRuntime.type_error('voteCrossProposal',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 329 char 1',
                                      'struct VoteForCrossPropasal<uniqueId: Bytes<32>, ttl: Uint<0..18446744073709551615>>',
                                      target_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_26.toValue(target_0),
            alignment: _descriptor_26.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._voteCrossProposal_0(context,
                                                   partialProofData,
                                                   target_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      executeMultiCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`executeMultiCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const mutiEx_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('executeMultiCrossProposal',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 356 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(Array.isArray(mutiEx_0) && mutiEx_0.length === 5 && mutiEx_0.every((t) => typeof(t) === 'object' && t.uniqueId.buffer instanceof ArrayBuffer && t.uniqueId.BYTES_PER_ELEMENT === 1 && t.uniqueId.length === 32 && typeof(t.coinIndex) === 'bigint' && t.coinIndex >= 0n && t.coinIndex <= 340282366920938463463374607431768211455n))) {
          __compactRuntime.type_error('executeMultiCrossProposal',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 356 char 1',
                                      'Vector<5, struct ExecuteCrossProposalInfo<uniqueId: Bytes<32>, coinIndex: Uint<0..340282366920938463463374607431768211455>>>',
                                      mutiEx_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_25.toValue(mutiEx_0),
            alignment: _descriptor_25.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._executeMultiCrossProposal_0(context,
                                                           partialProofData,
                                                           mutiEx_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      userRechargeForFee: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`userRechargeForFee: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const coin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('userRechargeForFee',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 433 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('userRechargeForFee',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 433 char 1',
                                      'struct CoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211455>>',
                                      coin_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_19.toValue(coin_0),
            alignment: _descriptor_19.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userRechargeForFee_0(context,
                                                    partialProofData,
                                                    coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      userClaimCoin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`userClaimCoin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const id_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('userClaimCoin',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 441 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(id_0.buffer instanceof ArrayBuffer && id_0.BYTES_PER_ELEMENT === 1 && id_0.length === 32)) {
          __compactRuntime.type_error('userClaimCoin',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 441 char 1',
                                      'Bytes<32>',
                                      id_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(id_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userClaimCoin_0(context, partialProofData, id_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      userClaimMappingToken: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`userClaimMappingToken: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const id_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('userClaimMappingToken',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 449 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(id_0.buffer instanceof ArrayBuffer && id_0.BYTES_PER_ELEMENT === 1 && id_0.length === 32)) {
          __compactRuntime.type_error('userClaimMappingToken',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 449 char 1',
                                      'Bytes<32>',
                                      id_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(id_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userClaimMappingToken_0(context,
                                                       partialProofData,
                                                       id_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      addReserve: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`addReserve: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const coin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('addReserve',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 475 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('addReserve',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 475 char 1',
                                      'struct CoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211455>>',
                                      coin_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_19.toValue(coin_0),
            alignment: _descriptor_19.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addReserve_0(context, partialProofData, coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      approveUserWithdrawFee: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`approveUserWithdrawFee: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const user_0 = args_1[1];
        const coinApprove_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('approveUserWithdrawFee',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 495 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(user_0) === 'object' && user_0.bytes.buffer instanceof ArrayBuffer && user_0.bytes.BYTES_PER_ELEMENT === 1 && user_0.bytes.length === 32)) {
          __compactRuntime.type_error('approveUserWithdrawFee',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 495 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      user_0)
        }
        if (!(typeof(coinApprove_0) === 'object' && coinApprove_0.nonce.buffer instanceof ArrayBuffer && coinApprove_0.nonce.BYTES_PER_ELEMENT === 1 && coinApprove_0.nonce.length === 32 && coinApprove_0.color.buffer instanceof ArrayBuffer && coinApprove_0.color.BYTES_PER_ELEMENT === 1 && coinApprove_0.color.length === 32 && typeof(coinApprove_0.value) === 'bigint' && coinApprove_0.value >= 0n && coinApprove_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('approveUserWithdrawFee',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 495 char 1',
                                      'struct CoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211455>>',
                                      coinApprove_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_4.toValue(user_0).concat(_descriptor_19.toValue(coinApprove_0)),
            alignment: _descriptor_4.alignment().concat(_descriptor_19.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._approveUserWithdrawFee_0(context,
                                                        partialProofData,
                                                        user_0,
                                                        coinApprove_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      withdrawReserveOfNativeToken: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`withdrawReserveOfNativeToken: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const token_0 = args_1[1];
        const coinIndex_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('withdrawReserveOfNativeToken',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 531 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(token_0.buffer instanceof ArrayBuffer && token_0.BYTES_PER_ELEMENT === 1 && token_0.length === 32)) {
          __compactRuntime.type_error('withdrawReserveOfNativeToken',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 531 char 1',
                                      'Bytes<32>',
                                      token_0)
        }
        if (!(typeof(coinIndex_0) === 'bigint' && coinIndex_0 >= 0n && coinIndex_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('withdrawReserveOfNativeToken',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 531 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      coinIndex_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(token_0).concat(_descriptor_6.toValue(coinIndex_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_6.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._withdrawReserveOfNativeToken_0(context,
                                                              partialProofData,
                                                              token_0,
                                                              coinIndex_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      withdrawReserveOfMappingToken: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`withdrawReserveOfMappingToken: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const domainSep_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('withdrawReserveOfMappingToken',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 545 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(domainSep_0.buffer instanceof ArrayBuffer && domainSep_0.BYTES_PER_ELEMENT === 1 && domainSep_0.length === 32)) {
          __compactRuntime.type_error('withdrawReserveOfMappingToken',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 545 char 1',
                                      'Bytes<32>',
                                      domainSep_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(domainSep_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._withdrawReserveOfMappingToken_0(context,
                                                               partialProofData,
                                                               domainSep_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      transferOwner: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`transferOwner: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newOwner_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('transferOwner',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 560 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(newOwner_0) === 'object' && newOwner_0.bytes.buffer instanceof ArrayBuffer && newOwner_0.bytes.BYTES_PER_ELEMENT === 1 && newOwner_0.bytes.length === 32)) {
          __compactRuntime.type_error('transferOwner',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 560 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      newOwner_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_4.toValue(newOwner_0),
            alignment: _descriptor_4.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._transferOwner_0(context,
                                               partialProofData,
                                               newOwner_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      acceptOwner: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`acceptOwner: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('acceptOwner',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 565 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._acceptOwner_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setFeeReceiver: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setFeeReceiver: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newFeeReceiver_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('setFeeReceiver',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 570 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(newFeeReceiver_0) === 'object' && newFeeReceiver_0.bytes.buffer instanceof ArrayBuffer && newFeeReceiver_0.bytes.BYTES_PER_ELEMENT === 1 && newFeeReceiver_0.bytes.length === 32)) {
          __compactRuntime.type_error('setFeeReceiver',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 570 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      newFeeReceiver_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_4.toValue(newFeeReceiver_0),
            alignment: _descriptor_4.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setFeeReceiver_0(context,
                                                partialProofData,
                                                newFeeReceiver_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setTokenManager: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setTokenManager: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newTokenManager_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('setTokenManager',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 575 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(newTokenManager_0) === 'object' && newTokenManager_0.bytes.buffer instanceof ArrayBuffer && newTokenManager_0.bytes.BYTES_PER_ELEMENT === 1 && newTokenManager_0.bytes.length === 32)) {
          __compactRuntime.type_error('setTokenManager',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 575 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      newTokenManager_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_4.toValue(newTokenManager_0),
            alignment: _descriptor_4.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setTokenManager_0(context,
                                                 partialProofData,
                                                 newTokenManager_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setMegerWorker: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setMegerWorker: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newMergeWorker_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('setMegerWorker',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 580 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(newMergeWorker_0) === 'object' && newMergeWorker_0.bytes.buffer instanceof ArrayBuffer && newMergeWorker_0.bytes.BYTES_PER_ELEMENT === 1 && newMergeWorker_0.bytes.length === 32)) {
          __compactRuntime.type_error('setMegerWorker',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 580 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      newMergeWorker_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_4.toValue(newMergeWorker_0),
            alignment: _descriptor_4.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setMegerWorker_0(context,
                                                partialProofData,
                                                newMergeWorker_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      mergeTreasuryCoin(context, ...args_1) {
        return { result: pureCircuits.mergeTreasuryCoin(...args_1), context };
      },
      addAdmin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`addAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const admin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('addAdmin',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 599 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(admin_0) === 'object' && admin_0.bytes.buffer instanceof ArrayBuffer && admin_0.bytes.BYTES_PER_ELEMENT === 1 && admin_0.bytes.length === 32)) {
          __compactRuntime.type_error('addAdmin',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 599 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      admin_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_4.toValue(admin_0),
            alignment: _descriptor_4.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addAdmin_0(context, partialProofData, admin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      removeAdmin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const admin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('removeAdmin',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 605 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(admin_0) === 'object' && admin_0.bytes.buffer instanceof ArrayBuffer && admin_0.bytes.BYTES_PER_ELEMENT === 1 && admin_0.bytes.length === 32)) {
          __compactRuntime.type_error('removeAdmin',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 605 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      admin_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_4.toValue(admin_0),
            alignment: _descriptor_4.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeAdmin_0(context, partialProofData, admin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setAdminThreshold: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setAdminThreshold: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const threshold_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('setAdminThreshold',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 611 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(threshold_0) === 'bigint' && threshold_0 >= 0n && threshold_0 <= 255n)) {
          __compactRuntime.type_error('setAdminThreshold',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 611 char 1',
                                      'Uint<0..255>',
                                      threshold_0)
        }
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
        const result_0 = this._setAdminThreshold_0(context,
                                                   partialProofData,
                                                   threshold_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setSmgPksks: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setSmgPksks: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const voters_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('setSmgPksks',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 617 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(Array.isArray(voters_0) && voters_0.length === 29 && voters_0.every((t) => typeof(t) === 'object' && t.bytes.buffer instanceof ArrayBuffer && t.bytes.BYTES_PER_ELEMENT === 1 && t.bytes.length === 32))) {
          __compactRuntime.type_error('setSmgPksks',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 617 char 1',
                                      'Vector<29, struct ZswapCoinPublicKey<bytes: Bytes<32>>>',
                                      voters_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_8.toValue(voters_0),
            alignment: _descriptor_8.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setSmgPksks_0(context, partialProofData, voters_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      updateSmgPk: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`updateSmgPk: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newVoter_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('updateSmgPk',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 632 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(newVoter_0) === 'object' && newVoter_0.bytes.buffer instanceof ArrayBuffer && newVoter_0.bytes.BYTES_PER_ELEMENT === 1 && newVoter_0.bytes.length === 32)) {
          __compactRuntime.type_error('updateSmgPk',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 632 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      newVoter_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_4.toValue(newVoter_0),
            alignment: _descriptor_4.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._updateSmgPk_0(context,
                                             partialProofData,
                                             newVoter_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setSmgPKThreold: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setSmgPKThreold: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const threshold_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('setSmgPKThreold',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 660 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(threshold_0) === 'bigint' && threshold_0 >= 0n && threshold_0 <= 255n)) {
          __compactRuntime.type_error('setSmgPKThreold',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 660 char 1',
                                      'Uint<0..255>',
                                      threshold_0)
        }
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
        const result_0 = this._setSmgPKThreold_0(context,
                                                 partialProofData,
                                                 threshold_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      setFeeCommonConfig: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`setFeeCommonConfig: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const chainId_0 = args_1[1];
        const fee_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('setFeeCommonConfig',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 666 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(chainId_0) === 'bigint' && chainId_0 >= 0n && chainId_0 <= 4294967295n)) {
          __compactRuntime.type_error('setFeeCommonConfig',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 666 char 1',
                                      'Uint<0..4294967295>',
                                      chainId_0)
        }
        if (!(typeof(fee_0) === 'bigint' && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('setFeeCommonConfig',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 666 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      fee_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(chainId_0).concat(_descriptor_6.toValue(fee_0)),
            alignment: _descriptor_3.alignment().concat(_descriptor_6.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setFeeCommonConfig_0(context,
                                                    partialProofData,
                                                    chainId_0,
                                                    fee_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      addTokenPair: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`addTokenPair: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenPairId_0 = args_1[1];
        const pairInfo_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('addTokenPair',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 675 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.type_error('addTokenPair',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 675 char 1',
                                      'Uint<0..4294967295>',
                                      tokenPairId_0)
        }
        if (!(typeof(pairInfo_0) === 'object' && typeof(pairInfo_0.fromChainId) === 'bigint' && pairInfo_0.fromChainId >= 0n && pairInfo_0.fromChainId <= 4294967295n && typeof(pairInfo_0.toChainId) === 'bigint' && pairInfo_0.toChainId >= 0n && pairInfo_0.toChainId <= 4294967295n && pairInfo_0.midnigthTokenAccount.buffer instanceof ArrayBuffer && pairInfo_0.midnigthTokenAccount.BYTES_PER_ELEMENT === 1 && pairInfo_0.midnigthTokenAccount.length === 32 && pairInfo_0.domainSep.buffer instanceof ArrayBuffer && pairInfo_0.domainSep.BYTES_PER_ELEMENT === 1 && pairInfo_0.domainSep.length === 32 && typeof(pairInfo_0.fee) === 'bigint' && pairInfo_0.fee >= 0n && pairInfo_0.fee <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('addTokenPair',
                                      'argument 2 (argument 3 as invoked from Typescript)',
                                      'crosschain.compact line 675 char 1',
                                      'struct TokenPairInfo<fromChainId: Uint<0..4294967295>, toChainId: Uint<0..4294967295>, midnigthTokenAccount: Bytes<32>, domainSep: Bytes<32>, fee: Uint<0..340282366920938463463374607431768211455>>',
                                      pairInfo_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(tokenPairId_0).concat(_descriptor_13.toValue(pairInfo_0)),
            alignment: _descriptor_3.alignment().concat(_descriptor_13.alignment())
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addTokenPair_0(context,
                                              partialProofData,
                                              tokenPairId_0,
                                              pairInfo_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      removeTokenPair: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeTokenPair: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenPairId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('removeTokenPair',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 687 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.type_error('removeTokenPair',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 687 char 1',
                                      'Uint<0..4294967295>',
                                      tokenPairId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(tokenPairId_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeTokenPair_0(context,
                                                 partialProofData,
                                                 tokenPairId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      newProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`newProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newProposal_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('newProposal',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 693 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(newProposal_0) === 'object' && typeof(newProposal_0.type) === 'number' && newProposal_0.type >= 0 && newProposal_0.type <= 7 && typeof(newProposal_0.addr) === 'object' && newProposal_0.addr.bytes.buffer instanceof ArrayBuffer && newProposal_0.addr.bytes.BYTES_PER_ELEMENT === 1 && newProposal_0.addr.bytes.length === 32 && typeof(newProposal_0.threshold) === 'bigint' && newProposal_0.threshold >= 0n && newProposal_0.threshold <= 340282366920938463463374607431768211455n && typeof(newProposal_0.feeConfig) === 'object' && typeof(newProposal_0.feeConfig.chainId) === 'bigint' && newProposal_0.feeConfig.chainId >= 0n && newProposal_0.feeConfig.chainId <= 4294967295n && typeof(newProposal_0.feeConfig.fee) === 'bigint' && newProposal_0.feeConfig.fee >= 0n && newProposal_0.feeConfig.fee <= 340282366920938463463374607431768211455n && Array.isArray(newProposal_0.smgPubkeys) && newProposal_0.smgPubkeys.length === 29 && newProposal_0.smgPubkeys.every((t) => typeof(t) === 'object' && t.bytes.buffer instanceof ArrayBuffer && t.bytes.BYTES_PER_ELEMENT === 1 && t.bytes.length === 32))) {
          __compactRuntime.type_error('newProposal',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 693 char 1',
                                      'struct Proposal<type: Enum<ProposalType, AddAdmin, RemoveAdmin, UpdateFeeReceiver, UpdateTokenManager, UpdateAdminThreshold, UpdateSMGPKThreshold, UpdateFeeCommonConfig, SetSmgPKS>, addr: struct ZswapCoinPublicKey<bytes: Bytes<32>>, threshold: Uint<0..340282366920938463463374607431768211455>, feeConfig: struct FeeConfig<chainId: Uint<0..4294967295>, fee: Uint<0..340282366920938463463374607431768211455>>, smgPubkeys: Vector<29, struct ZswapCoinPublicKey<bytes: Bytes<32>>>>',
                                      newProposal_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_9.toValue(newProposal_0),
            alignment: _descriptor_9.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._newProposal_0(context,
                                             partialProofData,
                                             newProposal_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      voteProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`voteProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const proposalId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('voteProposal',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 703 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(proposalId_0) === 'bigint' && proposalId_0 >= 0n && proposalId_0 <= 4294967295n)) {
          __compactRuntime.type_error('voteProposal',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 703 char 1',
                                      'Uint<0..4294967295>',
                                      proposalId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(proposalId_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._voteProposal_0(context,
                                              partialProofData,
                                              proposalId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      executeProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`executeProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const proposalId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('executeProposal',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 712 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(typeof(proposalId_0) === 'bigint' && proposalId_0 >= 0n && proposalId_0 <= 4294967295n)) {
          __compactRuntime.type_error('executeProposal',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 712 char 1',
                                      'Uint<0..4294967295>',
                                      proposalId_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(proposalId_0),
            alignment: _descriptor_3.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._executeProposal_0(context,
                                                 partialProofData,
                                                 proposalId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      },
      removeExpiredHisTxs: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeExpiredHisTxs: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const txs_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.originalState != undefined && contextOrig_0.transactionContext != undefined)) {
          __compactRuntime.type_error('removeExpiredHisTxs',
                                      'argument 1 (as invoked from Typescript)',
                                      'crosschain.compact line 746 char 1',
                                      'CircuitContext',
                                      contextOrig_0)
        }
        if (!(Array.isArray(txs_0) && txs_0.length === 20 && txs_0.every((t) => t.buffer instanceof ArrayBuffer && t.BYTES_PER_ELEMENT === 1 && t.length === 32))) {
          __compactRuntime.type_error('removeExpiredHisTxs',
                                      'argument 1 (argument 2 as invoked from Typescript)',
                                      'crosschain.compact line 746 char 1',
                                      'Vector<20, Bytes<32>>',
                                      txs_0)
        }
        const context = { ...contextOrig_0 };
        const partialProofData = {
          input: {
            value: _descriptor_10.toValue(txs_0),
            alignment: _descriptor_10.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeExpiredHisTxs_0(context,
                                                     partialProofData,
                                                     txs_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData };
      }
    };
    this.impureCircuits = {
      smgMint: this.circuits.smgMint,
      userBurn: this.circuits.userBurn,
      voteMultiCrossProposal: this.circuits.voteMultiCrossProposal,
      voteCrossProposal: this.circuits.voteCrossProposal,
      executeMultiCrossProposal: this.circuits.executeMultiCrossProposal,
      userRechargeForFee: this.circuits.userRechargeForFee,
      userClaimCoin: this.circuits.userClaimCoin,
      userClaimMappingToken: this.circuits.userClaimMappingToken,
      addReserve: this.circuits.addReserve,
      approveUserWithdrawFee: this.circuits.approveUserWithdrawFee,
      withdrawReserveOfNativeToken: this.circuits.withdrawReserveOfNativeToken,
      withdrawReserveOfMappingToken: this.circuits.withdrawReserveOfMappingToken,
      transferOwner: this.circuits.transferOwner,
      acceptOwner: this.circuits.acceptOwner,
      setFeeReceiver: this.circuits.setFeeReceiver,
      setTokenManager: this.circuits.setTokenManager,
      setMegerWorker: this.circuits.setMegerWorker,
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
      executeProposal: this.circuits.executeProposal,
      removeExpiredHisTxs: this.circuits.removeExpiredHisTxs
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 3) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 3 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const adminThresholdInit_0 = args_0[1];
    const smgPKThresholdInit_0 = args_0[2];
    if (typeof(constructorContext_0) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!('initialZswapLocalState' in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof(constructorContext_0.initialZswapLocalState) !== 'object') {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(typeof(adminThresholdInit_0) === 'bigint' && adminThresholdInit_0 >= 0n && adminThresholdInit_0 <= 255n)) {
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 1 (argument 2 as invoked from Typescript)',
                                  'crosschain.compact line 171 char 1',
                                  'Uint<0..255>',
                                  adminThresholdInit_0)
    }
    if (!(typeof(smgPKThresholdInit_0) === 'bigint' && smgPKThresholdInit_0 >= 0n && smgPKThresholdInit_0 <= 255n)) {
      __compactRuntime.type_error('Contract state constructor',
                                  'argument 2 (argument 3 as invoked from Typescript)',
                                  'crosschain.compact line 171 char 1',
                                  'Uint<0..255>',
                                  smgPKThresholdInit_0)
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    let stateValue_3 = __compactRuntime.StateValue.newArray();
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_3);
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
    state_0.setOperation('smgMint', new __compactRuntime.ContractOperation());
    state_0.setOperation('userBurn', new __compactRuntime.ContractOperation());
    state_0.setOperation('voteMultiCrossProposal', new __compactRuntime.ContractOperation());
    state_0.setOperation('voteCrossProposal', new __compactRuntime.ContractOperation());
    state_0.setOperation('executeMultiCrossProposal', new __compactRuntime.ContractOperation());
    state_0.setOperation('userRechargeForFee', new __compactRuntime.ContractOperation());
    state_0.setOperation('userClaimCoin', new __compactRuntime.ContractOperation());
    state_0.setOperation('userClaimMappingToken', new __compactRuntime.ContractOperation());
    state_0.setOperation('addReserve', new __compactRuntime.ContractOperation());
    state_0.setOperation('approveUserWithdrawFee', new __compactRuntime.ContractOperation());
    state_0.setOperation('withdrawReserveOfNativeToken', new __compactRuntime.ContractOperation());
    state_0.setOperation('withdrawReserveOfMappingToken', new __compactRuntime.ContractOperation());
    state_0.setOperation('transferOwner', new __compactRuntime.ContractOperation());
    state_0.setOperation('acceptOwner', new __compactRuntime.ContractOperation());
    state_0.setOperation('setFeeReceiver', new __compactRuntime.ContractOperation());
    state_0.setOperation('setTokenManager', new __compactRuntime.ContractOperation());
    state_0.setOperation('setMegerWorker', new __compactRuntime.ContractOperation());
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
    state_0.setOperation('removeExpiredHisTxs', new __compactRuntime.ContractOperation());
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
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
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(0n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(new Uint8Array(32)),
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(1n),
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_29.toValue({ smgId: new Uint8Array(32), fromAddr: { bytes: new Uint8Array(32) }, toAddr: '', tokenPairId: 0n, tokenAccount: new Uint8Array(32), amount: 0n, fee: 0n, nonce: 0n }),
                                                                            alignment: _descriptor_29.alignment() }).encode() } },
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(5n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(8n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(13n),
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(14n),
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(0n),
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(1n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
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
                                       value: { value: _descriptor_14.toValue(2n),
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(3n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(4n),
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
                                       value: { value: _descriptor_14.toValue(2n),
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
                                       value: { value: _descriptor_14.toValue(2n),
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
                                       value: { value: _descriptor_14.toValue(2n),
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(8n),
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
                                       value: { value: _descriptor_14.toValue(2n),
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(10n),
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
                                       value: { value: _descriptor_14.toValue(2n),
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(12n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(13n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(14n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_0 = this._ownPublicKey_0(context, partialProofData);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(12n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_1 = this._ownPublicKey_0(context, partialProofData);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(14n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_2 = this._ownPublicKey_0(context, partialProofData);
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_2),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_3 = this._ownPublicKey_0(context, partialProofData);
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_3),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(0n),
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(13n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(smgPKThresholdInit_0),
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_11.toValue(tmp_4),
                                              alignment: _descriptor_11.alignment() }
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
  _some_0(value_0) { return { is_some: true, value: value_0 }; }
  _none_0() {
    return { is_some: false,
             value:
               { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n } };
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: { bytes: new Uint8Array(32) } };
  }
  _right_0(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_36, value_0);
    return result_0;
  }
  _transientHash_1(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_37, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_34, value_0);
    return result_0;
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_35,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  _degradeToTransient_0(x_0) {
    const result_0 = __compactRuntime.degradeToTransient(x_0);
    return result_0;
  }
  _upgradeFromTransient_0(x_0) {
    const result_0 = __compactRuntime.upgradeFromTransient(x_0);
    return result_0;
  }
  _nativeToken_0() {
    return new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_4.toValue(result_0),
      alignment: _descriptor_4.alignment()
    });
    return result_0;
  }
  _createZswapInput_0(context, partialProofData, coin_0) {
    const result_0 = __compactRuntime.createZswapInput(context, coin_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _createZswapOutput_0(context, partialProofData, coin_0, recipient_0) {
    const result_0 = __compactRuntime.createZswapOutput(context,
                                                        coin_0,
                                                        recipient_0);
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _tokenType_0(domain_sep_0, contractAddress_0) {
    return this._persistentCommit_0([domain_sep_0, contractAddress_0.bytes],
                                    new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 100, 101, 114, 105, 118, 101, 95, 116, 111, 107, 101, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  }
  _mintToken_0(context,
               partialProofData,
               domain_sep_0,
               value_0,
               nonce_0,
               recipient_0)
  {
    const coin_0 = { nonce: nonce_0,
                     color:
                       this._tokenType_0(domain_sep_0,
                                         _descriptor_12.fromValue(Contract._query(context,
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(domain_sep_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { dup: { n: 1 } },
                     { dup: { n: 1 } },
                     'member',
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(value_0),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
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
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const cm_0 = this._coinCommitment_0(coin_0, recipient_0);
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    return coin_0;
  }
  _evolveNonce_0(index_0, nonce_0) {
    return this._upgradeFromTransient_0(this._transientHash_1([__compactRuntime.convertBytesToField(28,
                                                                                                    new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
                                                                                                    '<standard library>'),
                                                               index_0,
                                                               this._degradeToTransient_0(nonce_0)]));
  }
  _burnAddress_0() { return this._left_0({ bytes: new Uint8Array(32) }); }
  _receive_0(context, partialProofData, coin_0) {
    const recipient_0 = this._right_0(_descriptor_12.fromValue(Contract._query(context,
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
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const tmp_0 = this._coinCommitment_0(coin_0, recipient_0);
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    return [];
  }
  _send_0(context, partialProofData, input_0, recipient_0, value_0) {
    const selfAddr_0 = _descriptor_12.fromValue(Contract._query(context,
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
    this._createZswapInput_0(context, partialProofData, input_0);
    const tmp_0 = this._coinNullifier_0(this._downcastQualifiedCoin_0(input_0),
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
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
                         this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convertBytesToField(28,
                                                                                                                  new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
                                                                                                                  '<standard library>'),
                                                                             this._degradeToTransient_0(input_0.nonce)])),
                       color: input_0.color,
                       value: value_0 };
    this._createZswapOutput_0(context, partialProofData, output_0, recipient_0);
    const tmp_1 = this._coinCommitment_0(output_0, recipient_0);
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: true, n: 2 } },
                     { swap: { n: 0 } }]);
    if (this._equal_0(change_0, 0n)) {
      return { change: this._none_0(), sent: output_0 };
    } else {
      const changeCoin_0 = { nonce:
                               this._upgradeFromTransient_0(this._transientHash_0([__compactRuntime.convertBytesToField(30,
                                                                                                                        new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101, 47, 50]),
                                                                                                                        '<standard library>'),
                                                                                   this._degradeToTransient_0(input_0.nonce)])),
                             color: input_0.color,
                             value: change_0 };
      this._createZswapOutput_0(context,
                                partialProofData,
                                changeCoin_0,
                                this._right_0(selfAddr_0));
      const cm_0 = this._coinCommitment_0(changeCoin_0,
                                          this._right_0(selfAddr_0));
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
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                              alignment: _descriptor_0.alignment() }).encode() } },
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
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(cm_0),
                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newNull().encode() } },
                       { ins: { cached: true, n: 2 } },
                       { swap: { n: 0 } }]);
      return { change: this._some_0(changeCoin_0), sent: output_0 };
    }
  }
  _sendImmediate_0(context, partialProofData, input_0, target_0, value_0) {
    return this._send_0(context,
                        partialProofData,
                        this._upcastQualifiedCoin_0(input_0),
                        target_0,
                        value_0);
  }
  _downcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce, color: coin_0.color, value: coin_0.value };
  }
  _upcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce,
             color: coin_0.color,
             value: coin_0.value,
             mt_index: 0n };
  }
  _coinCommitment_0(coin_0, recipient_0) {
    return this._persistentHash_0({ info: coin_0,
                                    dataType: recipient_0.is_left,
                                    data:
                                      recipient_0.is_left ?
                                      recipient_0.left.bytes :
                                      recipient_0.right.bytes,
                                    domain_sep:
                                      new Uint8Array([109, 100, 110, 58, 99, 99]) });
  }
  _coinNullifier_0(coin_0, addr_0) {
    return this._persistentHash_0({ info: coin_0,
                                    dataType: false,
                                    data: addr_0.bytes,
                                    domain_sep:
                                      new Uint8Array([109, 100, 110, 58, 99, 110]) });
  }
  _blockTimeLt_0(context, partialProofData, time_0) {
    return _descriptor_2.fromValue(Contract._query(context,
                                                   partialProofData,
                                                   [
                                                    { dup: { n: 2 } },
                                                    { idx: { cached: true,
                                                             pushPath: false,
                                                             path: [
                                                                    { tag: 'value',
                                                                      value: { value: _descriptor_14.toValue(2n),
                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                    { push: { storage: false,
                                                              value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(time_0),
                                                                                                           alignment: _descriptor_1.alignment() }).encode() } },
                                                    'lt',
                                                    { popeq: { cached: true,
                                                               result: undefined } }]).value);
  }
  _blockTimeGte_0(context, partialProofData, time_0) {
    return !this._blockTimeLt_0(context, partialProofData, time_0);
  }
  _userLock_0(smgId_0, toAddr_0, tokenPairId_0, coin_0) { return []; }
  _smgRelease_0(uniqueId_0,
                smgId_0,
                tokenPairId_0,
                amount_0,
                toAddr_0,
                fee_0,
                ttl_0)
  {
    return [];
  }
  _smgMint_0(context,
             partialProofData,
             uniqueId_0,
             smgId_0,
             tokenPairId_0,
             amount_0,
             fee_0,
             toAddr_0,
             ttl_0)
  {
    this._addCrossProposal_0(context,
                             partialProofData,
                             uniqueId_0,
                             smgId_0,
                             tokenPairId_0,
                             amount_0,
                             toAddr_0,
                             fee_0,
                             ttl_0,
                             true);
    return [];
  }
  _userBurn_0(context,
              partialProofData,
              smgId_0,
              toAddr_0,
              tokenPairId_0,
              coin_0)
  {
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
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
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'tokenpairId not exists');
    const tokenPair_0 = _descriptor_13.fromValue(Contract._query(context,
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
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_3.toValue(tokenPairId_0),
                                                                                             alignment: _descriptor_3.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value);
    __compactRuntime.assert(this._equal_1(tokenPair_0.midnigthTokenAccount,
                                          coin_0.color),
                            'token color not match');
    const contractFee_0 = this._getFee_0(context,
                                         partialProofData,
                                         tokenPairId_0);
    this._receive_0(context, partialProofData, coin_0);
    this._sendImmediate_0(context,
                          partialProofData,
                          coin_0,
                          this._burnAddress_0(),
                          coin_0.value);
    const tmp_0 = { smgId: smgId_0,
                    fromAddr: this._ownPublicKey_0(context, partialProofData),
                    toAddr: toAddr_0,
                    tokenPairId: tokenPairId_0,
                    tokenAccount: tokenPair_0.midnigthTokenAccount,
                    amount: coin_0.value,
                    fee: contractFee_0,
                    nonce:
                      ((t1) => {
                        if (t1 > 340282366920938463463374607431768211455n) {
                          throw new __compactRuntime.CompactError('crosschain.compact line 263 char 14: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                        }
                        return t1;
                      })(_descriptor_1.fromValue(Contract._query(context,
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
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_29.toValue(tmp_0),
                                                                            alignment: _descriptor_29.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    if (contractFee_0 > 0n) {
      this._updateUserFee_0(context,
                            partialProofData,
                            this._ownPublicKey_0(context, partialProofData),
                            contractFee_0,
                            false);
      this._updateReserve_0(context,
                            partialProofData,
                            false,
                            this._nativeToken_0(),
                            contractFee_0,
                            true);
    }
    this._updateTokenTotalSupply_0(context,
                                   partialProofData,
                                   tokenPair_0.midnigthTokenAccount,
                                   coin_0.value,
                                   false);
    return [];
  }
  _addCrossProposal_0(context,
                      partialProofData,
                      uniqueId_0,
                      smgId_0,
                      tokenPairId_0,
                      amount_0,
                      toAddr_0,
                      fee_0,
                      ttl_0,
                      isMappingToken_0)
  {
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(7n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value)
                            ===
                            false,
                            'crossTx has finished');
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._ownPublicKey_0(context,
                                                          partialProofData),
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
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                             alignment: _descriptor_4.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value)),
                            'not smg member');
    if (_descriptor_2.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_14.toValue(5n),
                                                                            alignment: _descriptor_14.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                                        alignment: _descriptor_0.alignment() }).encode() } },
                                                 'member',
                                                 { popeq: { cached: true,
                                                            result: undefined } }]).value))
    {
      if (this._blockTimeLt_0(context,
                              partialProofData,
                              _descriptor_21.fromValue(Contract._query(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                                   alignment: _descriptor_14.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_14.toValue(5n),
                                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_0.toValue(uniqueId_0),
                                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value).ttl))
      {
        __compactRuntime.assert(false, 'proposal exists');
      } else {
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_14.toValue(2n),
                                                    alignment: _descriptor_14.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_14.toValue(5n),
                                                    alignment: _descriptor_14.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
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
                                           value: { value: _descriptor_14.toValue(2n),
                                                    alignment: _descriptor_14.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_14.toValue(6n),
                                                    alignment: _descriptor_14.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                         { rem: { cached: false } },
                         { ins: { cached: true, n: 2 } }]);
      }
    }
    __compactRuntime.assert(this._blockTimeLt_0(context, partialProofData, ttl_0),
                            'ttl expired');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
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
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'tokenpairId not exists');
    const tokenPair_0 = _descriptor_13.fromValue(Contract._query(context,
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
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_3.toValue(tokenPairId_0),
                                                                                             alignment: _descriptor_3.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value);
    const newCrossProposal_0 = { smgId: smgId_0,
                                 token:
                                   isMappingToken_0 ?
                                   tokenPair_0.domainSep :
                                   tokenPair_0.midnigthTokenAccount,
                                 tokenPairId: tokenPairId_0,
                                 isMappingToken: isMappingToken_0,
                                 amount: amount_0,
                                 fee: fee_0,
                                 toAddr: toAddr_0,
                                 ttl: ttl_0 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(5n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_21.toValue(newCrossProposal_0),
                                                                            alignment: _descriptor_21.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(6n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    this._voteCrossProposal_0(context,
                              partialProofData,
                              { uniqueId: uniqueId_0, ttl: ttl_0 });
    const tmp_1 = 1n;
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
                                            { value: _descriptor_11.toValue(tmp_1),
                                              alignment: _descriptor_11.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _voteMultiCrossProposal_0(context, partialProofData, uniqueIds_0) {
    this._folder_0(context,
                   partialProofData,
                   ((context, partialProofData, t_0, target_0) =>
                    {
                      if (!this._equal_2(target_0.uniqueId, new Uint8Array(32)))
                      {
                        this._voteCrossProposal_0(context,
                                                  partialProofData,
                                                  target_0);
                      }
                      return t_0;
                    }),
                   [],
                   uniqueIds_0);
    return [];
  }
  _voteCrossProposal_0(context, partialProofData, target_0) {
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._ownPublicKey_0(context,
                                                          partialProofData),
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
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                             alignment: _descriptor_4.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value)),
                            'not smg member');
    let tmp_1;
    __compactRuntime.assert((tmp_1 = target_0.uniqueId,
                             _descriptor_2.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(5n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                                                             alignment: _descriptor_0.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value)),
                            'proposal not exists');
    let tmp_2;
    const proposal_0 = (tmp_2 = target_0.uniqueId,
                        _descriptor_21.fromValue(Contract._query(context,
                                                                 partialProofData,
                                                                 [
                                                                  { dup: { n: 0 } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(2n),
                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_14.toValue(5n),
                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_0.toValue(tmp_2),
                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value));
    __compactRuntime.assert(this._equal_3(proposal_0.ttl, target_0.ttl),
                            'ttl not match');
    let tmp_3;
    if ((tmp_3 = target_0.uniqueId,
         _descriptor_1.fromValue(Contract._query(context,
                                                 partialProofData,
                                                 [
                                                  { dup: { n: 0 } },
                                                  { idx: { cached: false,
                                                           pushPath: false,
                                                           path: [
                                                                  { tag: 'value',
                                                                    value: { value: _descriptor_14.toValue(2n),
                                                                             alignment: _descriptor_14.alignment() } },
                                                                  { tag: 'value',
                                                                    value: { value: _descriptor_14.toValue(6n),
                                                                             alignment: _descriptor_14.alignment() } },
                                                                  { tag: 'value',
                                                                    value: { value: _descriptor_0.toValue(tmp_3),
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
                                                                    value: { value: _descriptor_14.toValue(13n),
                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                  { popeq: { cached: false,
                                                             result: undefined } }]).value))
    {
      return [];
    } else {
      if (this._blockTimeGte_0(context, partialProofData, proposal_0.ttl)) {
        const tmp_4 = target_0.uniqueId;
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_14.toValue(2n),
                                                    alignment: _descriptor_14.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_14.toValue(5n),
                                                    alignment: _descriptor_14.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_4),
                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                         { rem: { cached: false } },
                         { ins: { cached: true, n: 2 } }]);
        const tmp_5 = target_0.uniqueId;
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_14.toValue(2n),
                                                    alignment: _descriptor_14.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_14.toValue(6n),
                                                    alignment: _descriptor_14.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_5),
                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                         { rem: { cached: false } },
                         { ins: { cached: true, n: 2 } }]);
        return [];
      } else {
        let tmp_6;
        const voterIndex_0 = (tmp_6 = this._ownPublicKey_0(context,
                                                           partialProofData),
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
                                                                                          value: { value: _descriptor_14.toValue(1n),
                                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_4.toValue(tmp_6),
                                                                                                   alignment: _descriptor_4.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value));
        let tmp_7;
        __compactRuntime.assert(!(tmp_7 = target_0.uniqueId,
                                  _descriptor_2.fromValue(Contract._query(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_14.toValue(2n),
                                                                                                      alignment: _descriptor_14.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_14.toValue(6n),
                                                                                                      alignment: _descriptor_14.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_0.toValue(tmp_7),
                                                                                                      alignment: _descriptor_0.alignment() } }] } },
                                                                           { push: { storage: false,
                                                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(voterIndex_0),
                                                                                                                                  alignment: _descriptor_14.alignment() }).encode() } },
                                                                           'member',
                                                                           { popeq: { cached: true,
                                                                                      result: undefined } }]).value)),
                                'already voted');
        const tmp_8 = target_0.uniqueId;
        Contract._query(context,
                        partialProofData,
                        [
                         { idx: { cached: false,
                                  pushPath: true,
                                  path: [
                                         { tag: 'value',
                                           value: { value: _descriptor_14.toValue(2n),
                                                    alignment: _descriptor_14.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_14.toValue(6n),
                                                    alignment: _descriptor_14.alignment() } },
                                         { tag: 'value',
                                           value: { value: _descriptor_0.toValue(tmp_8),
                                                    alignment: _descriptor_0.alignment() } }] } },
                         { push: { storage: false,
                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(voterIndex_0),
                                                                                alignment: _descriptor_14.alignment() }).encode() } },
                         { push: { storage: true,
                                   value: __compactRuntime.StateValue.newNull().encode() } },
                         { ins: { cached: false, n: 1 } },
                         { ins: { cached: true, n: 3 } }]);
        let tmp_9;
        if ((tmp_9 = target_0.uniqueId,
             _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(6n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_0.toValue(tmp_9),
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
                                                                        value: { value: _descriptor_14.toValue(13n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value)
            &&
            proposal_0.fee > 0n)
        {
          this._updateReserve_0(context,
                                partialProofData,
                                proposal_0.isMappingToken,
                                proposal_0.token,
                                proposal_0.fee,
                                true);
        }
        return [];
      }
    }
  }
  _executeMultiCrossProposal_0(context, partialProofData, mutiEx_0) {
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
    this._folder_1(context,
                   partialProofData,
                   ((context, partialProofData, t_0, exCp_0) =>
                    {
                      if (!this._equal_4(exCp_0.uniqueId, new Uint8Array(32))) {
                        this._executeCrossProposal_0(context,
                                                     partialProofData,
                                                     exCp_0.uniqueId,
                                                     exCp_0.coinIndex);
                      }
                      return t_0;
                    }),
                   [],
                   mutiEx_0);
    return [];
  }
  _updateTokenTotalSupply_0(context, partialProofData, token_0, delta_0, isAdd_0)
  {
    __compactRuntime.assert(delta_0 > 0n, 'delta must be positive');
    const oldTotalSupply_0 = _descriptor_2.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(11n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                                                                             alignment: _descriptor_0.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value)
                             ?
                             _descriptor_6.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(11n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_0.toValue(token_0),
                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value)
                             :
                             0n;
    __compactRuntime.assert(isAdd_0 || oldTotalSupply_0 >= delta_0,
                            'delta must be less than or equal to oldTotalSupply');
    const newTotalSupply_0 = isAdd_0 ?
                             oldTotalSupply_0 + delta_0 :
                             (__compactRuntime.assert(!(oldTotalSupply_0
                                                        <
                                                        delta_0),
                                                      'result of subtraction would be negative'),
                              oldTotalSupply_0 - delta_0);
    if (this._equal_5(newTotalSupply_0, 0n)) {
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(2n),
                                                  alignment: _descriptor_14.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(11n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                       { rem: { cached: false } },
                       { ins: { cached: true, n: 2 } }]);
    } else {
      const tmp_0 = ((t1) => {
                      if (t1 > 340282366920938463463374607431768211455n) {
                        throw new __compactRuntime.CompactError('crosschain.compact line 375 char 52: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                      }
                      return t1;
                    })(newTotalSupply_0);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(2n),
                                                  alignment: _descriptor_14.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(11n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_0),
                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 2 } }]);
    }
    return [];
  }
  _executeCrossProposal_0(context, partialProofData, uniqueId_0, coinIndex_0) {
    __compactRuntime.assert(this._equal_6(_descriptor_4.fromValue(Contract._query(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_14.toValue(2n),
                                                                                                              alignment: _descriptor_14.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_14.toValue(14n),
                                                                                                              alignment: _descriptor_14.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value),
                                          this._ownPublicKey_0(context,
                                                               partialProofData)),
                            'only mergeWorker can executeCrossProposal ');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(5n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'crossproposal not exists');
    __compactRuntime.assert(_descriptor_1.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(6n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_0.toValue(uniqueId_0),
                                                                                                alignment: _descriptor_0.alignment() } }] } },
                                                                     'size',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value)
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
                                                                                        value: { value: _descriptor_14.toValue(13n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value),
                            'not enough votes');
    const proposal_0 = _descriptor_21.fromValue(Contract._query(context,
                                                                partialProofData,
                                                                [
                                                                 { dup: { n: 0 } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_14.toValue(2n),
                                                                                            alignment: _descriptor_14.alignment() } },
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_14.toValue(5n),
                                                                                            alignment: _descriptor_14.alignment() } }] } },
                                                                 { idx: { cached: false,
                                                                          pushPath: false,
                                                                          path: [
                                                                                 { tag: 'value',
                                                                                   value: { value: _descriptor_0.toValue(uniqueId_0),
                                                                                            alignment: _descriptor_0.alignment() } }] } },
                                                                 { popeq: { cached: false,
                                                                            result: undefined } }]).value);
    if (proposal_0.isMappingToken === false) {
      __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
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
                                                                       { push: { storage: false,
                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(coinIndex_0),
                                                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                                                       'member',
                                                                       { popeq: { cached: true,
                                                                                  result: undefined } }]).value),
                              'coin not exists');
      const coinInput_0 = _descriptor_17.fromValue(Contract._query(context,
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
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_6.toValue(coinIndex_0),
                                                                                               alignment: _descriptor_6.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value);
      __compactRuntime.assert(this._equal_7(coinInput_0.value, proposal_0.amount),
                              'coin value not match');
      const tmp_0 = { receiver: proposal_0.toAddr, coin: coinInput_0 };
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(2n),
                                                  alignment: _descriptor_14.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(9n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(tmp_0),
                                                                              alignment: _descriptor_18.alignment() }).encode() } },
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
                                         value: { value: _descriptor_14.toValue(4n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(coinIndex_0),
                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                       { rem: { cached: false } },
                       { ins: { cached: true, n: 2 } }]);
    } else {
      const tmp_1 = { receiver: proposal_0.toAddr,
                      domainSep: proposal_0.token,
                      amount: proposal_0.amount };
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(2n),
                                                  alignment: _descriptor_14.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(10n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_20.toValue(tmp_1),
                                                                              alignment: _descriptor_20.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 2 } }]);
      let tmp_2;
      const tokenPair_0 = (tmp_2 = proposal_0.tokenPairId,
                           _descriptor_13.fromValue(Contract._query(context,
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
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_3.toValue(tmp_2),
                                                                                                alignment: _descriptor_3.alignment() } }] } },
                                                                     { popeq: { cached: false,
                                                                                result: undefined } }]).value));
      this._updateTokenTotalSupply_0(context,
                                     partialProofData,
                                     tokenPair_0.midnigthTokenAccount,
                                     proposal_0.amount,
                                     true);
    }
    const tmp_3 = { uniqueId: uniqueId_0, crossProposal: proposal_0 };
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_22.toValue(tmp_3),
                                                                            alignment: _descriptor_22.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    const tmp_4 = proposal_0.ttl;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(7n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_4),
                                                                            alignment: _descriptor_1.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(5n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(6n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _addTreasuryCoin_0(context, partialProofData, coin_0) {
    const tmp_0 = 1n;
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
                                       value: { value: _descriptor_14.toValue(5n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_11.toValue(tmp_0),
                                              alignment: _descriptor_11.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }]);
    const tmp_1 = ((t1) => {
                    if (t1 > 340282366920938463463374607431768211455n) {
                      throw new __compactRuntime.CompactError('crosschain.compact line 409 char 28: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                    }
                    return t1;
                  })(_descriptor_1.fromValue(Contract._query(context,
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
                                                              { popeq: { cached: true,
                                                                         result: undefined } }]).value));
    const tmp_2 = this._right_0(_descriptor_12.fromValue(Contract._query(context,
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
    __compactRuntime.hasCoinCommitment(context, coin_0, tmp_2) ? Contract._query(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { idx: { cached: false,
                                                                                           pushPath: true,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(1n),
                                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(4n),
                                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                                  { push: { storage: false,
                                                                                            value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_1),
                                                                                                                                         alignment: _descriptor_6.alignment() }).encode() } },
                                                                                  { dup: { n: 7 } },
                                                                                  { push: { storage: false,
                                                                                            value: __compactRuntime.StateValue.newCell(__compactRuntime.coinCommitment(
                                                                                                                                         { value: _descriptor_19.toValue(coin_0),
                                                                                                                                           alignment: _descriptor_19.alignment() },
                                                                                                                                         { value: _descriptor_23.toValue(tmp_2),
                                                                                                                                           alignment: _descriptor_23.alignment() }
                                                                                                                                       )).encode() } },
                                                                                  { idx: { cached: true,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(1n),
                                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                                  { tag: 'stack' }] } },
                                                                                  { push: { storage: false,
                                                                                            value: __compactRuntime.StateValue.newCell({ value: _descriptor_19.toValue(coin_0),
                                                                                                                                         alignment: _descriptor_19.alignment() }).encode() } },
                                                                                  { swap: { n: 0 } },
                                                                                  { concat: { cached: true,
                                                                                              n: 91 } },
                                                                                  { ins: { cached: false,
                                                                                           n: 1 } },
                                                                                  { ins: { cached: true,
                                                                                           n: 2 } }]) : (() => { throw new __compactRuntime.CompactError(`crosschain.compact line 409 char 3: Coin commitment not found. Check the coin has been received (or call 'createZswapOutput')`); })();
    return [];
  }
  _getFee_0(context, partialProofData, tokenPairId_0) {
    const tokenPair_0 = _descriptor_13.fromValue(Contract._query(context,
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
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_3.toValue(tokenPairId_0),
                                                                                             alignment: _descriptor_3.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value);
    if (this._equal_8(tokenPair_0.fee, 0n)) {
      let tmp_0;
      if (tmp_0 = tokenPair_0.toChainId,
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
                                                                     value: { value: _descriptor_14.toValue(9n),
                                                                              alignment: _descriptor_14.alignment() } }] } },
                                                   { push: { storage: false,
                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                                          alignment: _descriptor_3.alignment() }).encode() } },
                                                   'member',
                                                   { popeq: { cached: true,
                                                              result: undefined } }]).value))
      {
        const tmp_1 = tokenPair_0.toChainId;
        return _descriptor_6.fromValue(Contract._query(context,
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
                                                                          value: { value: _descriptor_3.toValue(tmp_1),
                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      } else {
        return 0n;
      }
    } else {
      return tokenPair_0.fee;
    }
  }
  _userRechargeForFee_0(context, partialProofData, coin_0) {
    __compactRuntime.assert(this._equal_9(coin_0.color, this._nativeToken_0()),
                            'wrong coin color');
    this._receive_0(context, partialProofData, coin_0);
    this._addTreasuryCoin_0(context, partialProofData, coin_0);
    this._updateUserFee_0(context,
                          partialProofData,
                          this._ownPublicKey_0(context, partialProofData),
                          coin_0.value,
                          true);
    return [];
  }
  _userClaimCoin_0(context, partialProofData, id_0) {
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(9n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'coin not exists');
    const claimCoinInfo_0 = _descriptor_18.fromValue(Contract._query(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 0 } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                                 alignment: _descriptor_14.alignment() } },
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_14.toValue(9n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { idx: { cached: false,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_0.toValue(id_0),
                                                                                                 alignment: _descriptor_0.alignment() } }] } },
                                                                      { popeq: { cached: false,
                                                                                 result: undefined } }]).value);
    __compactRuntime.assert(this._equal_10(claimCoinInfo_0.receiver,
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'not receiver');
    this._send_0(context,
                 partialProofData,
                 claimCoinInfo_0.coin,
                 this._left_0(claimCoinInfo_0.receiver),
                 claimCoinInfo_0.coin.value);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(9n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _userClaimMappingToken_0(context, partialProofData, id_0) {
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(10n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'mapping token not exists');
    const claimMappingTokenInfo_0 = _descriptor_20.fromValue(Contract._query(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(2n),
                                                                                                         alignment: _descriptor_14.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(10n),
                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(id_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value);
    __compactRuntime.assert(this._equal_11(claimMappingTokenInfo_0.receiver,
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'not receiver');
    const tmp_0 = this._evolveNonce_0(((t1) => {
                                        if (t1 > 18446744073709551615n) {
                                          throw new __compactRuntime.CompactError('crosschain.compact line 453 char 23: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                        }
                                        return t1;
                                      })(_descriptor_1.fromValue(Contract._query(context,
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
                                      _descriptor_0.fromValue(Contract._query(context,
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
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value));
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    this._mintToken_0(context,
                      partialProofData,
                      claimMappingTokenInfo_0.domainSep,
                      ((t1) => {
                        if (t1 > 18446744073709551615n) {
                          throw new __compactRuntime.CompactError('crosschain.compact line 454 char 45: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                        }
                        return t1;
                      })(claimMappingTokenInfo_0.amount),
                      _descriptor_0.fromValue(Contract._query(context,
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
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value),
                      this._left_0(claimMappingTokenInfo_0.receiver));
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(10n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(id_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _updateUserFee_0(context, partialProofData, user_0, delta_0, isAdd_0) {
    __compactRuntime.assert(delta_0 > 0n, 'delta must be positive');
    let tmp_0, tmp_1;
    const oldBalance_0 = (tmp_0 = this._ownPublicKey_0(context, partialProofData),
                          _descriptor_2.fromValue(Contract._query(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_14.toValue(2n),
                                                                                              alignment: _descriptor_14.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_14.toValue(8n),
                                                                                              alignment: _descriptor_14.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                          alignment: _descriptor_4.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value))
                         ?
                         (tmp_1 = this._ownPublicKey_0(context, partialProofData),
                          _descriptor_6.fromValue(Contract._query(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_14.toValue(2n),
                                                                                              alignment: _descriptor_14.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_14.toValue(8n),
                                                                                              alignment: _descriptor_14.alignment() } }] } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_4.toValue(tmp_1),
                                                                                              alignment: _descriptor_4.alignment() } }] } },
                                                                   { popeq: { cached: false,
                                                                              result: undefined } }]).value))
                         :
                         0n;
    __compactRuntime.assert(isAdd_0 || oldBalance_0 >= delta_0,
                            'userFeeBalance not enough');
    const newBalance_0 = isAdd_0 ?
                         oldBalance_0 + delta_0 :
                         (__compactRuntime.assert(!(oldBalance_0 < delta_0),
                                                  'result of subtraction would be negative'),
                          oldBalance_0 - delta_0);
    if (this._equal_12(newBalance_0, 0n)) {
      const tmp_2 = this._ownPublicKey_0(context, partialProofData);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(2n),
                                                  alignment: _descriptor_14.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(8n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_2),
                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                       { rem: { cached: false } },
                       { ins: { cached: true, n: 2 } }]);
    } else {
      const tmp_3 = this._ownPublicKey_0(context, partialProofData);
      const tmp_4 = ((t1) => {
                      if (t1 > 340282366920938463463374607431768211455n) {
                        throw new __compactRuntime.CompactError('crosschain.compact line 467 char 43: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                      }
                      return t1;
                    })(newBalance_0);
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(2n),
                                                  alignment: _descriptor_14.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(8n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_3),
                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(tmp_4),
                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 2 } }]);
    }
    return [];
  }
  _addReserve_0(context, partialProofData, coin_0) {
    this._receive_0(context, partialProofData, coin_0);
    this._addTreasuryCoin_0(context, partialProofData, coin_0);
    this._updateReserve_0(context,
                          partialProofData,
                          false,
                          coin_0.color,
                          coin_0.value,
                          true);
    return [];
  }
  _updateReserve_0(context,
                   partialProofData,
                   isMappingToken_0,
                   token_0,
                   delta_0,
                   isAdd_0)
  {
    __compactRuntime.assert(delta_0 > 0n, 'delta must be positive');
    const oldAmount_0 = _descriptor_2.fromValue(Contract._query(context,
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
                                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                                                                        alignment: _descriptor_0.alignment() }).encode() } },
                                                                 'member',
                                                                 { popeq: { cached: true,
                                                                            result: undefined } }]).value)
                        ?
                        _descriptor_16.fromValue(Contract._query(context,
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
                                                                                    value: { value: _descriptor_0.toValue(token_0),
                                                                                             alignment: _descriptor_0.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value).total
                        :
                        0n;
    __compactRuntime.assert(isAdd_0 || oldAmount_0 >= delta_0,
                            'delta must be less than or equal to oldAmount');
    const newAmount_0 = isAdd_0 ?
                        oldAmount_0 + delta_0 :
                        (__compactRuntime.assert(!(oldAmount_0 < delta_0),
                                                 'result of subtraction would be negative'),
                         oldAmount_0 - delta_0);
    if (this._equal_13(newAmount_0, 0n)) {
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
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                       { rem: { cached: false } },
                       { ins: { cached: true, n: 2 } }]);
    } else {
      const tmp_0 = { total:
                        ((t1) => {
                          if (t1 > 340282366920938463463374607431768211455n) {
                            throw new __compactRuntime.CompactError('crosschain.compact line 491 char 68: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                          }
                          return t1;
                        })(newAmount_0),
                      isMappingToken: isMappingToken_0 };
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
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(tmp_0),
                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 2 } }]);
    }
    return [];
  }
  _approveUserWithdrawFee_0(context, partialProofData, user_0, coinApprove_0) {
    __compactRuntime.assert(this._equal_14(this._ownPublicKey_0(context,
                                                                partialProofData),
                                           _descriptor_4.fromValue(Contract._query(context,
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
                                                                                               result: undefined } }]).value)),
                            'only feeReceiver can approveUserWithDrawFee');
    __compactRuntime.assert(this._equal_15(coinApprove_0.color,
                                           this._nativeToken_0()),
                            'wrong coin color');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(8n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(user_0),
                                                                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'userFeeBalance not exists');
    const userFeeBalanceInfo_0 = _descriptor_6.fromValue(Contract._query(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(2n),
                                                                                                     alignment: _descriptor_14.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(8n),
                                                                                                     alignment: _descriptor_14.alignment() } }] } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_4.toValue(user_0),
                                                                                                     alignment: _descriptor_4.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
    __compactRuntime.assert(userFeeBalanceInfo_0 >= coinApprove_0.value,
                            'coinApprove.value must <= userFeeBalance');
    this._receive_0(context, partialProofData, coinApprove_0);
    this._addTreasuryCoin_0(context, partialProofData, coinApprove_0);
    const coinIndex_0 = ((t1) => {
                          if (t1 > 340282366920938463463374607431768211455n) {
                            throw new __compactRuntime.CompactError('crosschain.compact line 505 char 21: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                          }
                          return t1;
                        })(_descriptor_1.fromValue(Contract._query(context,
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
                                                                    { popeq: { cached: true,
                                                                               result: undefined } }]).value));
    const coinOfTreasury_0 = _descriptor_17.fromValue(Contract._query(context,
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
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_6.toValue(coinIndex_0),
                                                                                                  alignment: _descriptor_6.alignment() } }] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }]).value);
    this._updateUserFee_0(context,
                          partialProofData,
                          user_0,
                          coinApprove_0.value,
                          false);
    this._updateReserve_0(context,
                          partialProofData,
                          false,
                          coinApprove_0.color,
                          coinApprove_0.value,
                          true);
    const tmp_0 = this._evolveNonce_0(((t1) => {
                                        if (t1 > 18446744073709551615n) {
                                          throw new __compactRuntime.CompactError('crosschain.compact line 510 char 23: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                        }
                                        return t1;
                                      })(_descriptor_1.fromValue(Contract._query(context,
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
                                      _descriptor_0.fromValue(Contract._query(context,
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
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value));
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    const tmp_1 = _descriptor_0.fromValue(Contract._query(context,
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
                                                           { popeq: { cached: false,
                                                                      result: undefined } }]).value);
    const tmp_2 = { receiver: user_0, coin: coinOfTreasury_0 };
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(9n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_18.toValue(tmp_2),
                                                                            alignment: _descriptor_18.alignment() }).encode() } },
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
                                       value: { value: _descriptor_14.toValue(4n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(coinIndex_0),
                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _withdrawReserveOfNativeToken_0(context,
                                  partialProofData,
                                  token_0,
                                  coinIndex_0)
  {
    __compactRuntime.assert(this._equal_16(this._ownPublicKey_0(context,
                                                                partialProofData),
                                           _descriptor_4.fromValue(Contract._query(context,
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
                                                                                               result: undefined } }]).value)),
                            'only feeReceiver can withdrawReserveOfNativeToken');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
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
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'fee of specified token not exists');
    const reserveInfo_0 = _descriptor_16.fromValue(Contract._query(context,
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
                                                                                      value: { value: _descriptor_0.toValue(token_0),
                                                                                               alignment: _descriptor_0.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value);
    __compactRuntime.assert(reserveInfo_0.isMappingToken === false,
                            'only native token can be executed');
    const coinInput_0 = _descriptor_17.fromValue(Contract._query(context,
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
                                                                  { idx: { cached: false,
                                                                           pushPath: false,
                                                                           path: [
                                                                                  { tag: 'value',
                                                                                    value: { value: _descriptor_6.toValue(coinIndex_0),
                                                                                             alignment: _descriptor_6.alignment() } }] } },
                                                                  { popeq: { cached: false,
                                                                             result: undefined } }]).value);
    __compactRuntime.assert(coinInput_0.value <= reserveInfo_0.total,
                            'not enough reserve');
    const resultSend_0 = this._send_0(context,
                                      partialProofData,
                                      coinInput_0,
                                      this._left_0(_descriptor_4.fromValue(Contract._query(context,
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
                                                                                                       result: undefined } }]).value)),
                                      coinInput_0.value);
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
                                       value: { value: _descriptor_14.toValue(4n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(coinIndex_0),
                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    this._updateReserve_0(context,
                          partialProofData,
                          false,
                          token_0,
                          coinInput_0.value,
                          false);
    return [];
  }
  _withdrawReserveOfMappingToken_0(context, partialProofData, domainSep_0) {
    __compactRuntime.assert(this._equal_17(this._ownPublicKey_0(context,
                                                                partialProofData),
                                           _descriptor_4.fromValue(Contract._query(context,
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
                                                                                               result: undefined } }]).value)),
                            'only feeReceiver can withdrawReserveOfMappingToken');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
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
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(domainSep_0),
                                                                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'reserver of specified domainSep not exists');
    const reserveInfo_0 = _descriptor_16.fromValue(Contract._query(context,
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
                                                                                      value: { value: _descriptor_0.toValue(domainSep_0),
                                                                                               alignment: _descriptor_0.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value);
    __compactRuntime.assert(reserveInfo_0.isMappingToken === true,
                            'only mapping token can be executed');
    const tmp_0 = this._evolveNonce_0(((t1) => {
                                        if (t1 > 18446744073709551615n) {
                                          throw new __compactRuntime.CompactError('crosschain.compact line 551 char 23: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                        }
                                        return t1;
                                      })(_descriptor_1.fromValue(Contract._query(context,
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
                                      _descriptor_0.fromValue(Contract._query(context,
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
                                                                               { popeq: { cached: false,
                                                                                          result: undefined } }]).value));
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_0),
                                                                            alignment: _descriptor_0.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    this._mintToken_0(context,
                      partialProofData,
                      domainSep_0,
                      ((t1) => {
                        if (t1 > 18446744073709551615n) {
                          throw new __compactRuntime.CompactError('crosschain.compact line 552 char 34: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                        }
                        return t1;
                      })(reserveInfo_0.total),
                      _descriptor_0.fromValue(Contract._query(context,
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
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value),
                      this._left_0(_descriptor_4.fromValue(Contract._query(context,
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
                                                                                       result: undefined } }]).value)));
    this._updateReserve_0(context,
                          partialProofData,
                          true,
                          domainSep_0,
                          reserveInfo_0.total,
                          false);
    return [];
  }
  _transferOwner_0(context, partialProofData, newOwner_0) {
    __compactRuntime.assert(this._equal_18(_descriptor_4.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(2n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(12n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value),
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'only owner can transfer ownership');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(13n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(newOwner_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _acceptOwner_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_19(_descriptor_4.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(2n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(13n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value),
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'only pending owner can accept ownership');
    const tmp_0 = _descriptor_4.fromValue(Contract._query(context,
                                                          partialProofData,
                                                          [
                                                           { dup: { n: 0 } },
                                                           { idx: { cached: false,
                                                                    pushPath: false,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_14.toValue(2n),
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(12n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _setFeeReceiver_0(context, partialProofData, newFeeReceiver_0) {
    __compactRuntime.assert(this._checkAdminAuthorized_0(context,
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(10n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(newFeeReceiver_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _setTokenManager_0(context, partialProofData, newTokenManager_0) {
    __compactRuntime.assert(this._checkAdminAuthorized_0(context,
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(8n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(newTokenManager_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _setMegerWorker_0(context, partialProofData, newMergeWorker_0) {
    __compactRuntime.assert(this._checkAdminAuthorized_0(context,
                                                         partialProofData),
                            'not admin authorized');
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(14n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(newMergeWorker_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _mergeTreasuryCoin_0(coins_0) { return []; }
  _addAdmin_0(context, partialProofData, admin_0) {
    __compactRuntime.assert(this._checkAdminAuthorized_0(context,
                                                         partialProofData),
                            'not admin authorized');
    __compactRuntime.assert(!_descriptor_2.fromValue(Contract._query(context,
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
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(admin_0),
                                                                                                                             alignment: _descriptor_4.alignment() }).encode() } },
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
                                       value: { value: _descriptor_14.toValue(14n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(admin_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_2.toValue(true),
                                                                            alignment: _descriptor_2.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _removeAdmin_0(context, partialProofData, admin_0) {
    __compactRuntime.assert(this._checkAdminAuthorized_0(context,
                                                         partialProofData),
                            'not admin authorized');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
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
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(admin_0),
                                                                                                                            alignment: _descriptor_4.alignment() }).encode() } },
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
                                       value: { value: _descriptor_14.toValue(14n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(admin_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _setAdminThreshold_0(context, partialProofData, threshold_0) {
    __compactRuntime.assert(this._checkAdminAuthorized_0(context,
                                                         partialProofData),
                            'not admin authorized');
    __compactRuntime.assert(threshold_0
                            <=
                            _descriptor_1.fromValue(Contract._query(context,
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(0n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(threshold_0),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _setSmgPksks_0(context, partialProofData, voters_0) {
    __compactRuntime.assert(this._checkAdminAuthorized_0(context,
                                                         partialProofData),
                            'only owner can set smg pks');
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
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    this._folder_2(context,
                   partialProofData,
                   ((context, partialProofData, index_0, voter_0) =>
                    {
                      __compactRuntime.assert(!_descriptor_2.fromValue(Contract._query(context,
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
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(voter_0),
                                                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                                              'smg voter Repeatedly adding');
                      if (!this._equal_20(voter_0, { bytes: new Uint8Array(32) }))
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
                                                           value: { value: _descriptor_14.toValue(1n),
                                                                    alignment: _descriptor_14.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(voter_0),
                                                                                                alignment: _descriptor_4.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(index_0),
                                                                                                alignment: _descriptor_14.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 2 } }]);
                        return ((t1) => {
                                 if (t1 > 255n) {
                                   throw new __compactRuntime.CompactError('crosschain.compact line 625 char 14: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                 }
                                 return t1;
                               })(index_0 + 1n);
                      } else {
                        return index_0;
                      }
                    }),
                   0n,
                   voters_0);
    return [];
  }
  _updateSmgPk_0(context, partialProofData, newVoter_0) {
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._ownPublicKey_0(context,
                                                          partialProofData),
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
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                             alignment: _descriptor_4.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value)),
                            'voter does not exist');
    __compactRuntime.assert(!_descriptor_2.fromValue(Contract._query(context,
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
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(newVoter_0),
                                                                                                                             alignment: _descriptor_4.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value),
                            'the new voter exist');
    let tmp_1;
    const index_0 = (tmp_1 = this._ownPublicKey_0(context, partialProofData),
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
                                                                                 value: { value: _descriptor_14.toValue(1n),
                                                                                          alignment: _descriptor_14.alignment() } }] } },
                                                               { idx: { cached: false,
                                                                        pushPath: false,
                                                                        path: [
                                                                               { tag: 'value',
                                                                                 value: { value: _descriptor_4.toValue(tmp_1),
                                                                                          alignment: _descriptor_4.alignment() } }] } },
                                                               { popeq: { cached: false,
                                                                          result: undefined } }]).value));
    const tmp_2 = this._ownPublicKey_0(context, partialProofData);
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
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_2),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
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
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(newVoter_0),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(index_0),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _checkAdminAuthorized_0(context, partialProofData) {
    const isOwner_0 = this._equal_21(_descriptor_4.fromValue(Contract._query(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(2n),
                                                                                                         alignment: _descriptor_14.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_14.toValue(12n),
                                                                                                         alignment: _descriptor_14.alignment() } }] } },
                                                                              { popeq: { cached: false,
                                                                                         result: undefined } }]).value),
                                     this._ownPublicKey_0(context,
                                                          partialProofData));
    let tmp_0, tmp_1;
    const isAdminAuthorized_0 = (tmp_1 = _descriptor_3.fromValue(Contract._query(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(2n),
                                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(3n),
                                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value),
                                 _descriptor_2.fromValue(Contract._query(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(2n),
                                                                                                     alignment: _descriptor_14.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(4n),
                                                                                                     alignment: _descriptor_14.alignment() } }] } },
                                                                          { push: { storage: false,
                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                                                                                 alignment: _descriptor_3.alignment() }).encode() } },
                                                                          'member',
                                                                          { popeq: { cached: true,
                                                                                     result: undefined } }]).value))
                                &&
                                (tmp_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 0 } },
                                                                                  { idx: { cached: false,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(2n),
                                                                                                             alignment: _descriptor_14.alignment() } },
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_14.toValue(3n),
                                                                                                             alignment: _descriptor_14.alignment() } }] } },
                                                                                  { popeq: { cached: false,
                                                                                             result: undefined } }]).value),
                                 _descriptor_1.fromValue(Contract._query(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(2n),
                                                                                                     alignment: _descriptor_14.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(4n),
                                                                                                     alignment: _descriptor_14.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_3.toValue(tmp_0),
                                                                                                     alignment: _descriptor_3.alignment() } }] } },
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
                                                                                            value: { value: _descriptor_14.toValue(2n),
                                                                                                     alignment: _descriptor_14.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_14.toValue(0n),
                                                                                                     alignment: _descriptor_14.alignment() } }] } },
                                                                          { popeq: { cached: false,
                                                                                     result: undefined } }]).value);
    return isOwner_0
           &&
           this._equal_22(_descriptor_14.fromValue(Contract._query(context,
                                                                   partialProofData,
                                                                   [
                                                                    { dup: { n: 0 } },
                                                                    { idx: { cached: false,
                                                                             pushPath: false,
                                                                             path: [
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_14.toValue(2n),
                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                    { tag: 'value',
                                                                                      value: { value: _descriptor_14.toValue(0n),
                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                    { popeq: { cached: false,
                                                                               result: undefined } }]).value),
                          0n)
           ||
           isAdminAuthorized_0;
  }
  _setSmgPKThreold_0(context, partialProofData, threshold_0) {
    __compactRuntime.assert(this._checkAdminAuthorized_0(context,
                                                         partialProofData),
                            'not admin authorized');
    __compactRuntime.assert(threshold_0
                            <=
                            _descriptor_1.fromValue(Contract._query(context,
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
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(13n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(threshold_0),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _setFeeCommonConfig_0(context, partialProofData, chainId_0, fee_0) {
    __compactRuntime.assert(this._equal_23(this._ownPublicKey_0(context,
                                                                partialProofData),
                                           _descriptor_4.fromValue(Contract._query(context,
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
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value)),
                            'not tokenManager');
    if (_descriptor_2.fromValue(Contract._query(context,
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
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(chainId_0),
                                                                                                        alignment: _descriptor_3.alignment() }).encode() } },
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
                                         value: { value: _descriptor_14.toValue(9n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(chainId_0),
                                                                              alignment: _descriptor_3.alignment() }).encode() } },
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
                                       value: { value: _descriptor_14.toValue(9n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(chainId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(fee_0),
                                                                            alignment: _descriptor_6.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _addTokenPair_0(context, partialProofData, tokenPairId_0, pairInfo_0) {
    __compactRuntime.assert(this._equal_24(_descriptor_4.fromValue(Contract._query(context,
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
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value),
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'not authorized');
    __compactRuntime.assert(!_descriptor_2.fromValue(Contract._query(context,
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
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                                             alignment: _descriptor_3.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value),
                            'token pair already exists');
    if (!this._equal_25(pairInfo_0.domainSep, new Uint8Array(32))) {
      const expectColor_0 = this._tokenType_0(pairInfo_0.domainSep,
                                              _descriptor_12.fromValue(Contract._query(context,
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
      __compactRuntime.assert(this._equal_26(pairInfo_0.midnigthTokenAccount,
                                             expectColor_0),
                              'midnigthTokenAccount is not valid');
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
                                       value: { value: _descriptor_14.toValue(7n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_13.toValue(pairInfo_0),
                                                                            alignment: _descriptor_13.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _removeTokenPair_0(context, partialProofData, tokenPairId_0) {
    __compactRuntime.assert(this._equal_27(_descriptor_4.fromValue(Contract._query(context,
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
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value),
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'not authorized');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
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
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
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
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(7n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _newProposal_0(context, partialProofData, newProposal_0) {
    __compactRuntime.assert(newProposal_0.type !== 6 && newProposal_0.type !== 3,
                            'ProposalType not supoorted');
    const tmp_0 = 1n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(1n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                            { value: _descriptor_11.toValue(tmp_0),
                                              alignment: _descriptor_11.alignment() }
                                              .value
                                          )) } },
                     { ins: { cached: true, n: 2 } }]);
    const tmp_1 = ((t1) => {
                    if (t1 > 4294967295n) {
                      throw new __compactRuntime.CompactError('crosschain.compact line 697 char 20: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                    }
                    return t1;
                  })(_descriptor_1.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_14.toValue(2n),
                                                                                         alignment: _descriptor_14.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_14.toValue(1n),
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_9.toValue(newProposal_0),
                                                                            alignment: _descriptor_9.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    const tmp_2 = ((t1) => {
                    if (t1 > 4294967295n) {
                      throw new __compactRuntime.CompactError('crosschain.compact line 698 char 32: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                    }
                    return t1;
                  })(_descriptor_1.fromValue(Contract._query(context,
                                                             partialProofData,
                                                             [
                                                              { dup: { n: 0 } },
                                                              { idx: { cached: false,
                                                                       pushPath: false,
                                                                       path: [
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_14.toValue(2n),
                                                                                         alignment: _descriptor_14.alignment() } },
                                                                              { tag: 'value',
                                                                                value: { value: _descriptor_14.toValue(1n),
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(4n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_2),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newMap(
                                        new __compactRuntime.StateMap()
                                      ).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 2 } }]);
    this._voteProposal_0(context,
                         partialProofData,
                         ((t1) => {
                           if (t1 > 4294967295n) {
                             throw new __compactRuntime.CompactError('crosschain.compact line 699 char 16: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                           }
                           return t1;
                         })(_descriptor_1.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(1n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value)));
    return [];
  }
  _voteProposal_0(context, partialProofData, proposalId_0) {
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._ownPublicKey_0(context,
                                                          partialProofData),
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
                                                                                        value: { value: _descriptor_14.toValue(14n),
                                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                                      { push: { storage: false,
                                                                                value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                             alignment: _descriptor_4.alignment() }).encode() } },
                                                                      'member',
                                                                      { popeq: { cached: true,
                                                                                 result: undefined } }]).value)),
                            'only admin can vote proposal');
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(proposalId_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value),
                            'proposal does not exist');
    const tmp_1 = this._ownPublicKey_0(context, partialProofData);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(4n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_3.toValue(proposalId_0),
                                                alignment: _descriptor_3.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newNull().encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 3 } }]);
    return [];
  }
  _executeProposal_0(context, partialProofData, proposalId_0) {
    __compactRuntime.assert(_descriptor_2.fromValue(Contract._query(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(2n),
                                                                                                alignment: _descriptor_14.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_14.toValue(4n),
                                                                                                alignment: _descriptor_14.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(proposalId_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(3n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(proposalId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    let tmp_0;
    const currentProposal_0 = (tmp_0 = _descriptor_3.fromValue(Contract._query(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(2n),
                                                                                                           alignment: _descriptor_14.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_14.toValue(3n),
                                                                                                           alignment: _descriptor_14.alignment() } }] } },
                                                                                { popeq: { cached: false,
                                                                                           result: undefined } }]).value),
                               _descriptor_9.fromValue(Contract._query(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                                   alignment: _descriptor_14.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_3.toValue(tmp_0),
                                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value));
    if (currentProposal_0.type === 0) {
      this._addAdmin_0(context, partialProofData, currentProposal_0.addr);
    } else {
      if (currentProposal_0.type === 1) {
        this._removeAdmin_0(context, partialProofData, currentProposal_0.addr);
      } else {
        if (currentProposal_0.type === 2) {
          this._setFeeReceiver_0(context,
                                 partialProofData,
                                 currentProposal_0.addr);
        } else {
          if (currentProposal_0.type === 3) {
            this._setTokenManager_0(context,
                                    partialProofData,
                                    currentProposal_0.addr);
          } else {
            if (currentProposal_0.type === 4) {
              this._setAdminThreshold_0(context,
                                        partialProofData,
                                        ((t1) => {
                                          if (t1 > 255n) {
                                            throw new __compactRuntime.CompactError('crosschain.compact line 727 char 23: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                          }
                                          return t1;
                                        })(currentProposal_0.threshold));
            } else {
              if (currentProposal_0.type === 5) {
                this._setSmgPKThreold_0(context,
                                        partialProofData,
                                        ((t1) => {
                                          if (t1 > 255n) {
                                            throw new __compactRuntime.CompactError('crosschain.compact line 729 char 21: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                          }
                                          return t1;
                                        })(currentProposal_0.threshold));
              } else {
                if (currentProposal_0.type === 6) {
                  this._setFeeCommonConfig_0(context,
                                             partialProofData,
                                             currentProposal_0.feeConfig.chainId,
                                             currentProposal_0.feeConfig.fee);
                } else {
                  if (currentProposal_0.type === 7) {
                    this._setSmgPksks_0(context,
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
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(proposalId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } },
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(4n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(proposalId_0),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { rem: { cached: false } },
                     { ins: { cached: true, n: 2 } }]);
    const tmp_1 = 0n;
    Contract._query(context,
                    partialProofData,
                    [
                     { idx: { cached: false,
                              pushPath: true,
                              path: [
                                     { tag: 'value',
                                       value: { value: _descriptor_14.toValue(2n),
                                                alignment: _descriptor_14.alignment() } }] } },
                     { push: { storage: false,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(3n),
                                                                            alignment: _descriptor_14.alignment() }).encode() } },
                     { push: { storage: true,
                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                     { ins: { cached: false, n: 1 } },
                     { ins: { cached: true, n: 1 } }]);
    if (currentProposal_0.type === 1) {
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(2n),
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
                                         value: { value: _descriptor_14.toValue(2n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(4n),
                                                                              alignment: _descriptor_14.alignment() }).encode() } },
                       { push: { storage: true,
                                 value: __compactRuntime.StateValue.newMap(
                                          new __compactRuntime.StateMap()
                                        ).encode() } },
                       { ins: { cached: false, n: 1 } },
                       { ins: { cached: true, n: 1 } }]);
    }
    return [];
  }
  _removeExpiredHisTxs_0(context, partialProofData, txs_0) {
    __compactRuntime.assert(this._equal_28(_descriptor_4.fromValue(Contract._query(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(2n),
                                                                                                               alignment: _descriptor_14.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_14.toValue(12n),
                                                                                                               alignment: _descriptor_14.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value),
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'not admin authorized');
    this._folder_3(context,
                   partialProofData,
                   ((context, partialProofData, t_0, tx_0) =>
                    {
                      this._removeExpiredHisTx_0(context, partialProofData, tx_0);
                      return t_0;
                    }),
                   [],
                   txs_0);
    return [];
  }
  _removeExpiredHisTx_0(context, partialProofData, tx_0) {
    if (_descriptor_2.fromValue(Contract._query(context,
                                                partialProofData,
                                                [
                                                 { dup: { n: 0 } },
                                                 { idx: { cached: false,
                                                          pushPath: false,
                                                          path: [
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_14.toValue(2n),
                                                                            alignment: _descriptor_14.alignment() } },
                                                                 { tag: 'value',
                                                                   value: { value: _descriptor_14.toValue(7n),
                                                                            alignment: _descriptor_14.alignment() } }] } },
                                                 { push: { storage: false,
                                                           value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tx_0),
                                                                                                        alignment: _descriptor_0.alignment() }).encode() } },
                                                 'member',
                                                 { popeq: { cached: true,
                                                            result: undefined } }]).value)
        &&
        this._blockTimeGte_0(context,
                             partialProofData,
                             ((t1) => {
                               if (t1 > 18446744073709551615n) {
                                 throw new __compactRuntime.CompactError('crosschain.compact line 754 char 51: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                               }
                               return t1;
                             })(_descriptor_1.fromValue(Contract._query(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_14.toValue(2n),
                                                                                                    alignment: _descriptor_14.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_14.toValue(7n),
                                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_0.toValue(tx_0),
                                                                                                    alignment: _descriptor_0.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value)
                                +
                                3600n * 24n * 60n)))
    {
      Contract._query(context,
                      partialProofData,
                      [
                       { idx: { cached: false,
                                pushPath: true,
                                path: [
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(2n),
                                                  alignment: _descriptor_14.alignment() } },
                                       { tag: 'value',
                                         value: { value: _descriptor_14.toValue(7n),
                                                  alignment: _descriptor_14.alignment() } }] } },
                       { push: { storage: false,
                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tx_0),
                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                       { rem: { cached: false } },
                       { ins: { cached: true, n: 2 } }]);
    }
    return [];
  }
  _equal_0(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_0(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 5; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_3(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _folder_1(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 5; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_5(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_7(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_9(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_10(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_11(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_12(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_13(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_14(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_15(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_16(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_17(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_18(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_19(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_20(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _folder_2(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 29; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_21(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_22(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_23(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_24(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_25(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_26(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_27(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _equal_28(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _folder_3(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 20; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
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
    get crossCounter() {
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
                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }]).value);
    },
    get nonce() {
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
                                                                        value: { value: _descriptor_14.toValue(0n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    smgTxSigners: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
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
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
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
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 30 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      key_0)
        }
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
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(key_0),
                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 30 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      key_0)
        }
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
                                                                           value: { value: _descriptor_14.toValue(1n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_4.toValue(key_0),
                                                                                    alignment: _descriptor_4.alignment() } }] } },
                                                         { popeq: { cached: false,
                                                                    result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[1];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_4.fromValue(key.value),      _descriptor_14.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get latestOutBoundCrosstxInfo() {
      return _descriptor_29.fromValue(Contract._query(context,
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
                                                       { popeq: { cached: false,
                                                                  result: undefined } }]).value);
    },
    currentExecuteCrossProposal: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
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
                                                                          value: { value: _descriptor_14.toValue(3n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
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
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(typeof(elem_0) === 'object' && elem_0.uniqueId.buffer instanceof ArrayBuffer && elem_0.uniqueId.BYTES_PER_ELEMENT === 1 && elem_0.uniqueId.length === 32 && typeof(elem_0.crossProposal) === 'object' && elem_0.crossProposal.smgId.buffer instanceof ArrayBuffer && elem_0.crossProposal.smgId.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.smgId.length === 32 && elem_0.crossProposal.token.buffer instanceof ArrayBuffer && elem_0.crossProposal.token.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.token.length === 32 && typeof(elem_0.crossProposal.tokenPairId) === 'bigint' && elem_0.crossProposal.tokenPairId >= 0n && elem_0.crossProposal.tokenPairId <= 4294967295n && typeof(elem_0.crossProposal.isMappingToken) === 'boolean' && typeof(elem_0.crossProposal.amount) === 'bigint' && elem_0.crossProposal.amount >= 0n && elem_0.crossProposal.amount <= 340282366920938463463374607431768211455n && typeof(elem_0.crossProposal.fee) === 'bigint' && elem_0.crossProposal.fee >= 0n && elem_0.crossProposal.fee <= 340282366920938463463374607431768211455n && typeof(elem_0.crossProposal.toAddr) === 'object' && elem_0.crossProposal.toAddr.bytes.buffer instanceof ArrayBuffer && elem_0.crossProposal.toAddr.bytes.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.toAddr.bytes.length === 32 && typeof(elem_0.crossProposal.ttl) === 'bigint' && elem_0.crossProposal.ttl >= 0n && elem_0.crossProposal.ttl <= 18446744073709551615n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 33 char 1',
                                      'struct SmgEvent<uniqueId: Bytes<32>, crossProposal: struct CrossProposal<smgId: Bytes<32>, token: Bytes<32>, tokenPairId: Uint<0..4294967295>, isMappingToken: Boolean, amount: Uint<0..340282366920938463463374607431768211455>, fee: Uint<0..340282366920938463463374607431768211455>, toAddr: struct ZswapCoinPublicKey<bytes: Bytes<32>>, ttl: Uint<0..18446744073709551615>>>',
                                      elem_0)
        }
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
                                                                          value: { value: _descriptor_14.toValue(3n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_22.toValue(elem_0),
                                                                                                               alignment: _descriptor_22.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[3];
        return self_0.asMap().keys().map((elem) => _descriptor_22.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    treasuryCoins: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
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
                                                                          value: { value: _descriptor_14.toValue(4n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
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
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 36 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      key_0)
        }
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
                                                                          value: { value: _descriptor_14.toValue(4n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(key_0),
                                                                                                               alignment: _descriptor_6.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 36 char 1',
                                      'Uint<0..340282366920938463463374607431768211455>',
                                      key_0)
        }
        return _descriptor_17.fromValue(Contract._query(context,
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
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_6.toValue(key_0),
                                                                                    alignment: _descriptor_6.alignment() } }] } },
                                                         { popeq: { cached: false,
                                                                    result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[4];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_6.fromValue(key.value),      _descriptor_17.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get treasuryCoinCounter() {
      return _descriptor_1.fromValue(Contract._query(context,
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
                                                      { popeq: { cached: true,
                                                                 result: undefined } }]).value);
    },
    reserveOfAllToken: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
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
                                                                          value: { value: _descriptor_14.toValue(6n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
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
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 38 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
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
                                                                          value: { value: _descriptor_14.toValue(6n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 38 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_16.fromValue(Contract._query(context,
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
                                                                           value: { value: _descriptor_0.toValue(key_0),
                                                                                    alignment: _descriptor_0.alignment() } }] } },
                                                         { popeq: { cached: false,
                                                                    result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[6];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_16.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    tokenPairs: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
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
                                                                          value: { value: _descriptor_14.toValue(7n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
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
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 41 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        }
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
                                                                          value: { value: _descriptor_14.toValue(7n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(key_0),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 41 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        }
        return _descriptor_13.fromValue(Contract._query(context,
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
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_3.toValue(key_0),
                                                                                    alignment: _descriptor_3.alignment() } }] } },
                                                         { popeq: { cached: false,
                                                                    result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[7];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_3.fromValue(key.value),      _descriptor_13.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get tokenManager() {
      return _descriptor_4.fromValue(Contract._query(context,
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
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    feeCommonConfig: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
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
                                                                          value: { value: _descriptor_14.toValue(9n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
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
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 45 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        }
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
                                                                          value: { value: _descriptor_14.toValue(9n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(key_0),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 45 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        }
        return _descriptor_6.fromValue(Contract._query(context,
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
                                                                          value: { value: _descriptor_3.toValue(key_0),
                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[9];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_3.fromValue(key.value),      _descriptor_6.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get feeReceiver() {
      return _descriptor_4.fromValue(Contract._query(context,
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
    smgPubkeys: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
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
                                                                          value: { value: _descriptor_14.toValue(11n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
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
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 255n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 49 char 1',
                                      'Uint<0..255>',
                                      key_0)
        }
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
                                                                          value: { value: _descriptor_14.toValue(11n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(key_0),
                                                                                                               alignment: _descriptor_14.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 255n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 49 char 1',
                                      'Uint<0..255>',
                                      key_0)
        }
        return _descriptor_38.fromValue(Contract._query(context,
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
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[11];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_14.fromValue(key.value),      _descriptor_38.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    smgPubkeysToIndex: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
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
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
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
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.x) === 'bigint' && key_0.x >= 0 && key_0.x <= __compactRuntime.MAX_FIELD && typeof(key_0.y) === 'bigint' && key_0.y >= 0 && key_0.y <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 50 char 1',
                                      'struct CurvePoint<x: Field, y: Field>',
                                      key_0)
        }
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
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_38.toValue(key_0),
                                                                                                               alignment: _descriptor_38.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && typeof(key_0.x) === 'bigint' && key_0.x >= 0 && key_0.x <= __compactRuntime.MAX_FIELD && typeof(key_0.y) === 'bigint' && key_0.y >= 0 && key_0.y <= __compactRuntime.MAX_FIELD)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 50 char 1',
                                      'struct CurvePoint<x: Field, y: Field>',
                                      key_0)
        }
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
                                                                           value: { value: _descriptor_14.toValue(12n),
                                                                                    alignment: _descriptor_14.alignment() } }] } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_38.toValue(key_0),
                                                                                    alignment: _descriptor_38.alignment() } }] } },
                                                         { popeq: { cached: false,
                                                                    result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[12];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_38.fromValue(key.value),      _descriptor_14.fromValue(value.value)    ];  })[Symbol.iterator]();
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
                                                                         value: { value: _descriptor_14.toValue(13n),
                                                                                  alignment: _descriptor_14.alignment() } }] } },
                                                       { popeq: { cached: false,
                                                                  result: undefined } }]).value);
    },
    admins: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
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
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
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
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 55 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      key_0)
        }
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
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(key_0),
                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 55 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      key_0)
        }
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
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_4.toValue(key_0),
                                                                                   alignment: _descriptor_4.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[14];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_4.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
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
                                                                         value: { value: _descriptor_14.toValue(2n),
                                                                                  alignment: _descriptor_14.alignment() } },
                                                                       { tag: 'value',
                                                                         value: { value: _descriptor_14.toValue(0n),
                                                                                  alignment: _descriptor_14.alignment() } }] } },
                                                       { popeq: { cached: false,
                                                                  result: undefined } }]).value);
    },
    get proposalId() {
      return _descriptor_1.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(1n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: true,
                                                                 result: undefined } }]).value);
    },
    proposals: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 60 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(key_0),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 60 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        }
        return _descriptor_9.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_3.toValue(key_0),
                                                                                   alignment: _descriptor_3.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[2];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_3.fromValue(key.value),      _descriptor_9.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get currentExcuteProposalId() {
      return _descriptor_3.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(3n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    proposalVoters: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(4n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(4n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 62 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(4n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(key_0),
                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'bigint' && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 62 char 1',
                                      'Uint<0..4294967295>',
                                      key_0)
        }
        if (state.asArray()[2].asArray()[4].asMap().get({ value: _descriptor_3.toValue(key_0),
                                                          alignment: _descriptor_3.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_2.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(2n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(4n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_3.toValue(key_0),
                                                                                       alignment: _descriptor_3.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_1.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(2n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(4n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_3.toValue(key_0),
                                                                                       alignment: _descriptor_3.alignment() } }] } },
                                                            'size',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const elem_0 = args_1[0];
            if (!(typeof(elem_0) === 'object' && elem_0.bytes.buffer instanceof ArrayBuffer && elem_0.bytes.BYTES_PER_ELEMENT === 1 && elem_0.bytes.length === 32)) {
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'crosschain.compact line 62 char 45',
                                          'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                          elem_0)
            }
            return _descriptor_2.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(2n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(4n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_3.toValue(key_0),
                                                                                       alignment: _descriptor_3.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(elem_0),
                                                                                                                   alignment: _descriptor_4.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[2].asArray()[4].asMap().get({ value: _descriptor_3.toValue(key_0),
                                                                         alignment: _descriptor_3.alignment() });
            return self_0.asMap().keys().map((elem) => _descriptor_4.fromValue(elem.value))[Symbol.iterator]();
          }
        }
      }
    },
    crossProposal: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(5n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(5n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 65 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(5n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 65 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_21.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(2n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(5n),
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
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[5];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_21.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    crossProposalVoters: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(6n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(6n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 66 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(6n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 66 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        if (state.asArray()[2].asArray()[6].asMap().get({ value: _descriptor_0.toValue(key_0),
                                                          alignment: _descriptor_0.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_2.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(2n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(6n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(key_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            'size',
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                                   alignment: _descriptor_1.alignment() }).encode() } },
                                                            'eq',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_1.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(2n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(6n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(key_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            'size',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const elem_0 = args_1[0];
            if (!(typeof(elem_0) === 'bigint' && elem_0 >= 0n && elem_0 <= 255n)) {
              __compactRuntime.type_error('member',
                                          'argument 1',
                                          'crosschain.compact line 66 char 51',
                                          'Uint<0..255>',
                                          elem_0)
            }
            return _descriptor_2.fromValue(Contract._query(context,
                                                           partialProofData,
                                                           [
                                                            { dup: { n: 0 } },
                                                            { idx: { cached: false,
                                                                     pushPath: false,
                                                                     path: [
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(2n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_14.toValue(6n),
                                                                                       alignment: _descriptor_14.alignment() } },
                                                                            { tag: 'value',
                                                                              value: { value: _descriptor_0.toValue(key_0),
                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                            { push: { storage: false,
                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(elem_0),
                                                                                                                   alignment: _descriptor_14.alignment() }).encode() } },
                                                            'member',
                                                            { popeq: { cached: true,
                                                                       result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[2].asArray()[6].asMap().get({ value: _descriptor_0.toValue(key_0),
                                                                         alignment: _descriptor_0.alignment() });
            return self_0.asMap().keys().map((elem) => _descriptor_14.fromValue(elem.value))[Symbol.iterator]();
          }
        }
      }
    },
    crossProposalHis: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(7n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(7n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 68 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
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
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 68 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
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
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[7];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    userFeeBalance: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(8n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(8n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 69 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(8n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(key_0),
                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof(key_0) === 'object' && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 69 char 1',
                                      'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                      key_0)
        }
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(8n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_4.toValue(key_0),
                                                                                   alignment: _descriptor_4.alignment() } }] } },
                                                        { popeq: { cached: false,
                                                                   result: undefined } }]).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[8];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_4.fromValue(key.value),      _descriptor_6.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    coinToBeClaimed: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(9n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(9n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 70 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
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
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 70 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_18.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(2n),
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
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[9];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_18.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    mappingTokenToBeClaim: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(10n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(10n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 71 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(10n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(key_0),
                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                        'member',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 71 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_20.fromValue(Contract._query(context,
                                                        partialProofData,
                                                        [
                                                         { dup: { n: 0 } },
                                                         { idx: { cached: false,
                                                                  pushPath: false,
                                                                  path: [
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(2n),
                                                                                    alignment: _descriptor_14.alignment() } },
                                                                         { tag: 'value',
                                                                           value: { value: _descriptor_14.toValue(10n),
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
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[10];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_20.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    mappintTokenTotalSupply: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(11n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { push: { storage: false,
                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                                               alignment: _descriptor_1.alignment() }).encode() } },
                                                        'eq',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_1.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(11n),
                                                                                   alignment: _descriptor_14.alignment() } }] } },
                                                        'size',
                                                        { popeq: { cached: true,
                                                                   result: undefined } }]).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('member',
                                      'argument 1',
                                      'crosschain.compact line 73 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_2.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
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
        if (args_0.length !== 1) {
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.type_error('lookup',
                                      'argument 1',
                                      'crosschain.compact line 73 char 1',
                                      'Bytes<32>',
                                      key_0)
        }
        return _descriptor_6.fromValue(Contract._query(context,
                                                       partialProofData,
                                                       [
                                                        { dup: { n: 0 } },
                                                        { idx: { cached: false,
                                                                 pushPath: false,
                                                                 path: [
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(2n),
                                                                                   alignment: _descriptor_14.alignment() } },
                                                                        { tag: 'value',
                                                                          value: { value: _descriptor_14.toValue(11n),
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
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[11];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_6.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get owner() {
      return _descriptor_4.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(12n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get pendingOwner() {
      return _descriptor_4.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(2n),
                                                                                 alignment: _descriptor_14.alignment() } },
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(13n),
                                                                                 alignment: _descriptor_14.alignment() } }] } },
                                                      { popeq: { cached: false,
                                                                 result: undefined } }]).value);
    },
    get mergeWorker() {
      return _descriptor_4.fromValue(Contract._query(context,
                                                     partialProofData,
                                                     [
                                                      { dup: { n: 0 } },
                                                      { idx: { cached: false,
                                                               pushPath: false,
                                                               path: [
                                                                      { tag: 'value',
                                                                        value: { value: _descriptor_14.toValue(2n),
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
  userLock: (...args_0) => {
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`userLock: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const smgId_0 = args_0[0];
    const toAddr_0 = args_0[1];
    const tokenPairId_0 = args_0[2];
    const coin_0 = args_0[3];
    if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
      __compactRuntime.type_error('userLock',
                                  'argument 1',
                                  'crosschain.compact line 190 char 1',
                                  'Bytes<32>',
                                  smgId_0)
    }
    if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
      __compactRuntime.type_error('userLock',
                                  'argument 3',
                                  'crosschain.compact line 190 char 1',
                                  'Uint<0..4294967295>',
                                  tokenPairId_0)
    }
    if (!(typeof(coin_0) === 'object' && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof(coin_0.value) === 'bigint' && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.type_error('userLock',
                                  'argument 4',
                                  'crosschain.compact line 190 char 1',
                                  'struct CoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211455>>',
                                  coin_0)
    }
    return _dummyContract._userLock_0(smgId_0, toAddr_0, tokenPairId_0, coin_0);
  },
  smgRelease: (...args_0) => {
    if (args_0.length !== 7) {
      throw new __compactRuntime.CompactError(`smgRelease: expected 7 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const uniqueId_0 = args_0[0];
    const smgId_0 = args_0[1];
    const tokenPairId_0 = args_0[2];
    const amount_0 = args_0[3];
    const toAddr_0 = args_0[4];
    const fee_0 = args_0[5];
    const ttl_0 = args_0[6];
    if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32)) {
      __compactRuntime.type_error('smgRelease',
                                  'argument 1',
                                  'crosschain.compact line 220 char 1',
                                  'Bytes<32>',
                                  uniqueId_0)
    }
    if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
      __compactRuntime.type_error('smgRelease',
                                  'argument 2',
                                  'crosschain.compact line 220 char 1',
                                  'Bytes<32>',
                                  smgId_0)
    }
    if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
      __compactRuntime.type_error('smgRelease',
                                  'argument 3',
                                  'crosschain.compact line 220 char 1',
                                  'Uint<0..4294967295>',
                                  tokenPairId_0)
    }
    if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.type_error('smgRelease',
                                  'argument 4',
                                  'crosschain.compact line 220 char 1',
                                  'Uint<0..340282366920938463463374607431768211455>',
                                  amount_0)
    }
    if (!(typeof(toAddr_0) === 'object' && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32)) {
      __compactRuntime.type_error('smgRelease',
                                  'argument 5',
                                  'crosschain.compact line 220 char 1',
                                  'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                  toAddr_0)
    }
    if (!(typeof(fee_0) === 'bigint' && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.type_error('smgRelease',
                                  'argument 6',
                                  'crosschain.compact line 220 char 1',
                                  'Uint<0..340282366920938463463374607431768211455>',
                                  fee_0)
    }
    if (!(typeof(ttl_0) === 'bigint' && ttl_0 >= 0n && ttl_0 <= 18446744073709551615n)) {
      __compactRuntime.type_error('smgRelease',
                                  'argument 7',
                                  'crosschain.compact line 220 char 1',
                                  'Uint<0..18446744073709551615>',
                                  ttl_0)
    }
    return _dummyContract._smgRelease_0(uniqueId_0,
                                        smgId_0,
                                        tokenPairId_0,
                                        amount_0,
                                        toAddr_0,
                                        fee_0,
                                        ttl_0);
  },
  mergeTreasuryCoin: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`mergeTreasuryCoin: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const coins_0 = args_0[0];
    if (!(Array.isArray(coins_0) && coins_0.length === 2 && coins_0.every((t) => typeof(t) === 'bigint' && t >= 0n && t <= 340282366920938463463374607431768211455n))) {
      __compactRuntime.type_error('mergeTreasuryCoin',
                                  'argument 1',
                                  'crosschain.compact line 586 char 1',
                                  'Vector<2, Uint<0..340282366920938463463374607431768211455>>',
                                  coins_0)
    }
    return _dummyContract._mergeTreasuryCoin_0(coins_0);
  }
};
const contractReferenceLocations = { tag: 'publicLedgerArray', indices: { } };
exports.Contract = Contract;
exports.ledger = ledger;
exports.pureCircuits = pureCircuits;
exports.contractReferenceLocations = contractReferenceLocations;
//# sourceMappingURL=index.cjs.map
