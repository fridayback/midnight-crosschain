import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
__compactRuntime.checkRuntimeVersion('0.15.0');

export var ProposalType;
(function (ProposalType) {
  ProposalType[ProposalType['AddAdmin'] = 0] = 'AddAdmin';
  ProposalType[ProposalType['RemoveAdmin'] = 1] = 'RemoveAdmin';
  ProposalType[ProposalType['UpdateFeeReceiver'] = 2] = 'UpdateFeeReceiver';
  ProposalType[ProposalType['UpdateTokenManager'] = 3] = 'UpdateTokenManager';
  ProposalType[ProposalType['UpdateAdminThreshold'] = 4] = 'UpdateAdminThreshold';
  ProposalType[ProposalType['UpdateSMGPKThreshold'] = 5] = 'UpdateSMGPKThreshold';
  ProposalType[ProposalType['UpdateFeeCommonConfig'] = 6] = 'UpdateFeeCommonConfig';
  ProposalType[ProposalType['SetSmgPKS'] = 7] = 'SetSmgPKS';
})(ProposalType || (ProposalType = {}));

const _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);

const _descriptor_1 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);

const _descriptor_2 = __compactRuntime.CompactTypeBoolean;

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

class _UserAddress_0 {
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

const _descriptor_6 = new _UserAddress_0();

const _descriptor_7 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);

class _FeeConfig_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_7.alignment());
  }
  fromValue(value_0) {
    return {
      chainId: _descriptor_3.fromValue(value_0),
      fee: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.chainId).concat(_descriptor_7.toValue(value_0.fee));
  }
}

const _descriptor_8 = new _FeeConfig_0();

const _descriptor_9 = new __compactRuntime.CompactTypeVector(29, _descriptor_4);

class _Proposal_0 {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_4.alignment().concat(_descriptor_6.alignment().concat(_descriptor_7.alignment().concat(_descriptor_8.alignment().concat(_descriptor_9.alignment())))));
  }
  fromValue(value_0) {
    return {
      pType: _descriptor_5.fromValue(value_0),
      addr: _descriptor_4.fromValue(value_0),
      addrUnshielded: _descriptor_6.fromValue(value_0),
      threshold: _descriptor_7.fromValue(value_0),
      feeConfig: _descriptor_8.fromValue(value_0),
      smgPubkeys: _descriptor_9.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.pType).concat(_descriptor_4.toValue(value_0.addr).concat(_descriptor_6.toValue(value_0.addrUnshielded).concat(_descriptor_7.toValue(value_0.threshold).concat(_descriptor_8.toValue(value_0.feeConfig).concat(_descriptor_9.toValue(value_0.smgPubkeys))))));
  }
}

const _descriptor_10 = new _Proposal_0();

const _descriptor_11 = new __compactRuntime.CompactTypeVector(20, _descriptor_0);

const _descriptor_12 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);

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

const _descriptor_13 = new _ContractAddress_0();

class _TokenPairInfo_0 {
  alignment() {
    return _descriptor_3.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_7.alignment()))));
  }
  fromValue(value_0) {
    return {
      fromChainId: _descriptor_3.fromValue(value_0),
      toChainId: _descriptor_3.fromValue(value_0),
      midnigthTokenAccount: _descriptor_0.fromValue(value_0),
      domainSep: _descriptor_0.fromValue(value_0),
      fee: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_3.toValue(value_0.fromChainId).concat(_descriptor_3.toValue(value_0.toChainId).concat(_descriptor_0.toValue(value_0.midnigthTokenAccount).concat(_descriptor_0.toValue(value_0.domainSep).concat(_descriptor_7.toValue(value_0.fee)))));
  }
}

const _descriptor_14 = new _TokenPairInfo_0();

const _descriptor_15 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);

class _CrossProposal_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_2.alignment().concat(_descriptor_7.alignment().concat(_descriptor_7.alignment().concat(_descriptor_6.alignment().concat(_descriptor_1.alignment())))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_0.fromValue(value_0),
      token: _descriptor_0.fromValue(value_0),
      tokenPairId: _descriptor_3.fromValue(value_0),
      isMappingToken: _descriptor_2.fromValue(value_0),
      amount: _descriptor_7.fromValue(value_0),
      fee: _descriptor_7.fromValue(value_0),
      toAddr: _descriptor_6.fromValue(value_0),
      ttl: _descriptor_1.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.smgId).concat(_descriptor_0.toValue(value_0.token).concat(_descriptor_3.toValue(value_0.tokenPairId).concat(_descriptor_2.toValue(value_0.isMappingToken).concat(_descriptor_7.toValue(value_0.amount).concat(_descriptor_7.toValue(value_0.fee).concat(_descriptor_6.toValue(value_0.toAddr).concat(_descriptor_1.toValue(value_0.ttl))))))));
  }
}

const _descriptor_16 = new _CrossProposal_0();

class _SmgEvent_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_16.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_0.fromValue(value_0),
      crossProposal: _descriptor_16.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.uniqueId).concat(_descriptor_16.toValue(value_0.crossProposal));
  }
}

const _descriptor_17 = new _SmgEvent_0();

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

const _descriptor_18 = new _VoteForCrossPropasal_0();

const _descriptor_19 = new __compactRuntime.CompactTypeVector(5, _descriptor_18);

class _ReserveOfToken_0 {
  alignment() {
    return _descriptor_7.alignment().concat(_descriptor_2.alignment());
  }
  fromValue(value_0) {
    return {
      total: _descriptor_7.fromValue(value_0),
      isMappingToken: _descriptor_2.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_7.toValue(value_0.total).concat(_descriptor_2.toValue(value_0.isMappingToken));
  }
}

const _descriptor_20 = new _ReserveOfToken_0();

const _descriptor_21 = __compactRuntime.CompactTypeOpaqueString;

class _CrossOutBound_0 {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_21.alignment().concat(_descriptor_3.alignment().concat(_descriptor_0.alignment().concat(_descriptor_7.alignment().concat(_descriptor_7.alignment()))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_0.fromValue(value_0),
      fromAddr: _descriptor_4.fromValue(value_0),
      toAddr: _descriptor_21.fromValue(value_0),
      tokenPairId: _descriptor_3.fromValue(value_0),
      tokenAccount: _descriptor_0.fromValue(value_0),
      amount: _descriptor_7.fromValue(value_0),
      fee: _descriptor_7.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.smgId).concat(_descriptor_4.toValue(value_0.fromAddr).concat(_descriptor_21.toValue(value_0.toAddr).concat(_descriptor_3.toValue(value_0.tokenPairId).concat(_descriptor_0.toValue(value_0.tokenAccount).concat(_descriptor_7.toValue(value_0.amount).concat(_descriptor_7.toValue(value_0.fee)))))));
  }
}

const _descriptor_22 = new _CrossOutBound_0();

const _descriptor_23 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);

class _Either_0 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
}

const _descriptor_24 = new _Either_0();

class _Either_1 {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_13.alignment().concat(_descriptor_6.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_2.fromValue(value_0),
      left: _descriptor_13.fromValue(value_0),
      right: _descriptor_6.fromValue(value_0)
    }
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.is_left).concat(_descriptor_13.toValue(value_0.left).concat(_descriptor_6.toValue(value_0.right)));
  }
}

const _descriptor_25 = new _Either_1();

export class Contract {
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
      userLock: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`userLock: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const smgId_0 = args_1[1];
        const toAddr_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('userLock',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 180 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime.typeError('userLock',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 180 char 1',
                                     'Bytes<32>',
                                     smgId_0)
        }
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.typeError('userLock',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'crosschain.compact line 180 char 1',
                                     'Uint<0..4294967296>',
                                     tokenPairId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('userLock',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'crosschain.compact line 180 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(smgId_0).concat(_descriptor_21.toValue(toAddr_0).concat(_descriptor_3.toValue(tokenPairId_0).concat(_descriptor_7.toValue(amount_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_21.alignment().concat(_descriptor_3.alignment().concat(_descriptor_7.alignment())))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userLock_0(context,
                                          partialProofData,
                                          smgId_0,
                                          toAddr_0,
                                          tokenPairId_0,
                                          amount_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      smgRelease: (...args_1) => {
        if (args_1.length !== 8) {
          throw new __compactRuntime.CompactError(`smgRelease: expected 8 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const uniqueId_0 = args_1[1];
        const smgId_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        const toAddr_0 = args_1[5];
        const fee_0 = args_1[6];
        const ttl_0 = args_1[7];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('smgRelease',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 206 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32)) {
          __compactRuntime.typeError('smgRelease',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 206 char 1',
                                     'Bytes<32>',
                                     uniqueId_0)
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime.typeError('smgRelease',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'crosschain.compact line 206 char 1',
                                     'Bytes<32>',
                                     smgId_0)
        }
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.typeError('smgRelease',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'crosschain.compact line 206 char 1',
                                     'Uint<0..4294967296>',
                                     tokenPairId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('smgRelease',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'crosschain.compact line 206 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        if (!(typeof(toAddr_0) === 'object' && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32)) {
          __compactRuntime.typeError('smgRelease',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'crosschain.compact line 206 char 1',
                                     'struct UserAddress<bytes: Bytes<32>>',
                                     toAddr_0)
        }
        if (!(typeof(fee_0) === 'bigint' && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('smgRelease',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'crosschain.compact line 206 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     fee_0)
        }
        if (!(typeof(ttl_0) === 'bigint' && ttl_0 >= 0n && ttl_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('smgRelease',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'crosschain.compact line 206 char 1',
                                     'Uint<0..18446744073709551616>',
                                     ttl_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(uniqueId_0).concat(_descriptor_0.toValue(smgId_0).concat(_descriptor_3.toValue(tokenPairId_0).concat(_descriptor_7.toValue(amount_0).concat(_descriptor_6.toValue(toAddr_0).concat(_descriptor_7.toValue(fee_0).concat(_descriptor_1.toValue(ttl_0))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_7.alignment().concat(_descriptor_6.alignment().concat(_descriptor_7.alignment().concat(_descriptor_1.alignment()))))))
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._smgRelease_0(context,
                                            partialProofData,
                                            uniqueId_0,
                                            smgId_0,
                                            tokenPairId_0,
                                            amount_0,
                                            toAddr_0,
                                            fee_0,
                                            ttl_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
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
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('smgMint',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 221 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32)) {
          __compactRuntime.typeError('smgMint',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 221 char 1',
                                     'Bytes<32>',
                                     uniqueId_0)
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime.typeError('smgMint',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'crosschain.compact line 221 char 1',
                                     'Bytes<32>',
                                     smgId_0)
        }
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.typeError('smgMint',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'crosschain.compact line 221 char 1',
                                     'Uint<0..4294967296>',
                                     tokenPairId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('smgMint',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'crosschain.compact line 221 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        if (!(typeof(fee_0) === 'bigint' && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('smgMint',
                                     'argument 5 (argument 6 as invoked from Typescript)',
                                     'crosschain.compact line 221 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     fee_0)
        }
        if (!(typeof(toAddr_0) === 'object' && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32)) {
          __compactRuntime.typeError('smgMint',
                                     'argument 6 (argument 7 as invoked from Typescript)',
                                     'crosschain.compact line 221 char 1',
                                     'struct UserAddress<bytes: Bytes<32>>',
                                     toAddr_0)
        }
        if (!(typeof(ttl_0) === 'bigint' && ttl_0 >= 0n && ttl_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError('smgMint',
                                     'argument 7 (argument 8 as invoked from Typescript)',
                                     'crosschain.compact line 221 char 1',
                                     'Uint<0..18446744073709551616>',
                                     ttl_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(uniqueId_0).concat(_descriptor_0.toValue(smgId_0).concat(_descriptor_3.toValue(tokenPairId_0).concat(_descriptor_7.toValue(amount_0).concat(_descriptor_7.toValue(fee_0).concat(_descriptor_6.toValue(toAddr_0).concat(_descriptor_1.toValue(ttl_0))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_3.alignment().concat(_descriptor_7.alignment().concat(_descriptor_7.alignment().concat(_descriptor_6.alignment().concat(_descriptor_1.alignment()))))))
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
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      userBurn: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime.CompactError(`userBurn: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const smgId_0 = args_1[1];
        const toAddr_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('userBurn',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 236 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime.typeError('userBurn',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 236 char 1',
                                     'Bytes<32>',
                                     smgId_0)
        }
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.typeError('userBurn',
                                     'argument 3 (argument 4 as invoked from Typescript)',
                                     'crosschain.compact line 236 char 1',
                                     'Uint<0..4294967296>',
                                     tokenPairId_0)
        }
        if (!(typeof(amount_0) === 'bigint' && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('userBurn',
                                     'argument 4 (argument 5 as invoked from Typescript)',
                                     'crosschain.compact line 236 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     amount_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(smgId_0).concat(_descriptor_21.toValue(toAddr_0).concat(_descriptor_3.toValue(tokenPairId_0).concat(_descriptor_7.toValue(amount_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_21.alignment().concat(_descriptor_3.alignment().concat(_descriptor_7.alignment())))
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
                                          amount_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      voteMultiCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`voteMultiCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const uniqueIds_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('voteMultiCrossProposal',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 314 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(Array.isArray(uniqueIds_0) && uniqueIds_0.length === 5 && uniqueIds_0.every((t) => typeof(t) === 'object' && t.uniqueId.buffer instanceof ArrayBuffer && t.uniqueId.BYTES_PER_ELEMENT === 1 && t.uniqueId.length === 32 && typeof(t.ttl) === 'bigint' && t.ttl >= 0n && t.ttl <= 18446744073709551615n))) {
          __compactRuntime.typeError('voteMultiCrossProposal',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 314 char 1',
                                     'Vector<5, struct VoteForCrossPropasal<uniqueId: Bytes<32>, ttl: Uint<0..18446744073709551616>>>',
                                     uniqueIds_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_19.toValue(uniqueIds_0),
            alignment: _descriptor_19.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._voteMultiCrossProposal_0(context,
                                                        partialProofData,
                                                        uniqueIds_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      executeCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`executeCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const uniqueId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('executeCrossProposal',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 401 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32)) {
          __compactRuntime.typeError('executeCrossProposal',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 401 char 1',
                                     'Bytes<32>',
                                     uniqueId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._executeCrossProposal_0(context,
                                                      partialProofData,
                                                      uniqueId_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      transferOwner: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`transferOwner: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newOwner_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('transferOwner',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 464 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(newOwner_0) === 'object' && newOwner_0.bytes.buffer instanceof ArrayBuffer && newOwner_0.bytes.BYTES_PER_ELEMENT === 1 && newOwner_0.bytes.length === 32)) {
          __compactRuntime.typeError('transferOwner',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 464 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     newOwner_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
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
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      acceptOwner: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`acceptOwner: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('acceptOwner',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 469 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._acceptOwner_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setFeeReceiver: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setFeeReceiver: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newFeeReceiver_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setFeeReceiver',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 474 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(newFeeReceiver_0) === 'object' && newFeeReceiver_0.bytes.buffer instanceof ArrayBuffer && newFeeReceiver_0.bytes.BYTES_PER_ELEMENT === 1 && newFeeReceiver_0.bytes.length === 32)) {
          __compactRuntime.typeError('setFeeReceiver',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 474 char 1',
                                     'struct UserAddress<bytes: Bytes<32>>',
                                     newFeeReceiver_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_6.toValue(newFeeReceiver_0),
            alignment: _descriptor_6.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setFeeReceiver_0(context,
                                                partialProofData,
                                                newFeeReceiver_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setTokenManager: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setTokenManager: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newTokenManager_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setTokenManager',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 479 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(newTokenManager_0) === 'object' && newTokenManager_0.bytes.buffer instanceof ArrayBuffer && newTokenManager_0.bytes.BYTES_PER_ELEMENT === 1 && newTokenManager_0.bytes.length === 32)) {
          __compactRuntime.typeError('setTokenManager',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 479 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     newTokenManager_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
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
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      addAdmin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`addAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const admin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('addAdmin',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 489 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(admin_0) === 'object' && admin_0.bytes.buffer instanceof ArrayBuffer && admin_0.bytes.BYTES_PER_ELEMENT === 1 && admin_0.bytes.length === 32)) {
          __compactRuntime.typeError('addAdmin',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 489 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     admin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
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
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeAdmin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const admin_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('removeAdmin',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 495 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(admin_0) === 'object' && admin_0.bytes.buffer instanceof ArrayBuffer && admin_0.bytes.BYTES_PER_ELEMENT === 1 && admin_0.bytes.length === 32)) {
          __compactRuntime.typeError('removeAdmin',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 495 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     admin_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
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
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setAdminThreshold: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setAdminThreshold: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const threshold_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setAdminThreshold',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 501 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(threshold_0) === 'bigint' && threshold_0 >= 0n && threshold_0 <= 255n)) {
          __compactRuntime.typeError('setAdminThreshold',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 501 char 1',
                                     'Uint<0..256>',
                                     threshold_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_15.toValue(threshold_0),
            alignment: _descriptor_15.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setAdminThreshold_0(context,
                                                   partialProofData,
                                                   threshold_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setSmgPksks: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setSmgPksks: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const voters_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setSmgPksks',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 507 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(Array.isArray(voters_0) && voters_0.length === 29 && voters_0.every((t) => typeof(t) === 'object' && t.bytes.buffer instanceof ArrayBuffer && t.bytes.BYTES_PER_ELEMENT === 1 && t.bytes.length === 32))) {
          __compactRuntime.typeError('setSmgPksks',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 507 char 1',
                                     'Vector<29, struct ZswapCoinPublicKey<bytes: Bytes<32>>>',
                                     voters_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_9.toValue(voters_0),
            alignment: _descriptor_9.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setSmgPksks_0(context, partialProofData, voters_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      updateSmgPk: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`updateSmgPk: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newVoter_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('updateSmgPk',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 522 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(newVoter_0) === 'object' && newVoter_0.bytes.buffer instanceof ArrayBuffer && newVoter_0.bytes.BYTES_PER_ELEMENT === 1 && newVoter_0.bytes.length === 32)) {
          __compactRuntime.typeError('updateSmgPk',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 522 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     newVoter_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
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
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setSmgPKThreold: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setSmgPKThreold: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const threshold_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setSmgPKThreold',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 538 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(threshold_0) === 'bigint' && threshold_0 >= 0n && threshold_0 <= 255n)) {
          __compactRuntime.typeError('setSmgPKThreold',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 538 char 1',
                                     'Uint<0..256>',
                                     threshold_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_15.toValue(threshold_0),
            alignment: _descriptor_15.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setSmgPKThreold_0(context,
                                                 partialProofData,
                                                 threshold_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setFeeCommonConfig: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`setFeeCommonConfig: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const chainId_0 = args_1[1];
        const fee_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('setFeeCommonConfig',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 544 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(chainId_0) === 'bigint' && chainId_0 >= 0n && chainId_0 <= 4294967295n)) {
          __compactRuntime.typeError('setFeeCommonConfig',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 544 char 1',
                                     'Uint<0..4294967296>',
                                     chainId_0)
        }
        if (!(typeof(fee_0) === 'bigint' && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('setFeeCommonConfig',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'crosschain.compact line 544 char 1',
                                     'Uint<0..340282366920938463463374607431768211456>',
                                     fee_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(chainId_0).concat(_descriptor_7.toValue(fee_0)),
            alignment: _descriptor_3.alignment().concat(_descriptor_7.alignment())
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
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      addTokenPair: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`addTokenPair: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenPairId_0 = args_1[1];
        const pairInfo_0 = args_1[2];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('addTokenPair',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 553 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.typeError('addTokenPair',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 553 char 1',
                                     'Uint<0..4294967296>',
                                     tokenPairId_0)
        }
        if (!(typeof(pairInfo_0) === 'object' && typeof(pairInfo_0.fromChainId) === 'bigint' && pairInfo_0.fromChainId >= 0n && pairInfo_0.fromChainId <= 4294967295n && typeof(pairInfo_0.toChainId) === 'bigint' && pairInfo_0.toChainId >= 0n && pairInfo_0.toChainId <= 4294967295n && pairInfo_0.midnigthTokenAccount.buffer instanceof ArrayBuffer && pairInfo_0.midnigthTokenAccount.BYTES_PER_ELEMENT === 1 && pairInfo_0.midnigthTokenAccount.length === 32 && pairInfo_0.domainSep.buffer instanceof ArrayBuffer && pairInfo_0.domainSep.BYTES_PER_ELEMENT === 1 && pairInfo_0.domainSep.length === 32 && typeof(pairInfo_0.fee) === 'bigint' && pairInfo_0.fee >= 0n && pairInfo_0.fee <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError('addTokenPair',
                                     'argument 2 (argument 3 as invoked from Typescript)',
                                     'crosschain.compact line 553 char 1',
                                     'struct TokenPairInfo<fromChainId: Uint<0..4294967296>, toChainId: Uint<0..4294967296>, midnigthTokenAccount: Bytes<32>, domainSep: Bytes<32>, fee: Uint<0..340282366920938463463374607431768211456>>',
                                     pairInfo_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_3.toValue(tokenPairId_0).concat(_descriptor_14.toValue(pairInfo_0)),
            alignment: _descriptor_3.alignment().concat(_descriptor_14.alignment())
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
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeTokenPair: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeTokenPair: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenPairId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('removeTokenPair',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 565 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(tokenPairId_0) === 'bigint' && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.typeError('removeTokenPair',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 565 char 1',
                                     'Uint<0..4294967296>',
                                     tokenPairId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
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
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      newProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`newProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newProposal_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('newProposal',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 571 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(newProposal_0) === 'object' && typeof(newProposal_0.pType) === 'number' && newProposal_0.pType >= 0 && newProposal_0.pType <= 7 && typeof(newProposal_0.addr) === 'object' && newProposal_0.addr.bytes.buffer instanceof ArrayBuffer && newProposal_0.addr.bytes.BYTES_PER_ELEMENT === 1 && newProposal_0.addr.bytes.length === 32 && typeof(newProposal_0.addrUnshielded) === 'object' && newProposal_0.addrUnshielded.bytes.buffer instanceof ArrayBuffer && newProposal_0.addrUnshielded.bytes.BYTES_PER_ELEMENT === 1 && newProposal_0.addrUnshielded.bytes.length === 32 && typeof(newProposal_0.threshold) === 'bigint' && newProposal_0.threshold >= 0n && newProposal_0.threshold <= 340282366920938463463374607431768211455n && typeof(newProposal_0.feeConfig) === 'object' && typeof(newProposal_0.feeConfig.chainId) === 'bigint' && newProposal_0.feeConfig.chainId >= 0n && newProposal_0.feeConfig.chainId <= 4294967295n && typeof(newProposal_0.feeConfig.fee) === 'bigint' && newProposal_0.feeConfig.fee >= 0n && newProposal_0.feeConfig.fee <= 340282366920938463463374607431768211455n && Array.isArray(newProposal_0.smgPubkeys) && newProposal_0.smgPubkeys.length === 29 && newProposal_0.smgPubkeys.every((t) => typeof(t) === 'object' && t.bytes.buffer instanceof ArrayBuffer && t.bytes.BYTES_PER_ELEMENT === 1 && t.bytes.length === 32))) {
          __compactRuntime.typeError('newProposal',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 571 char 1',
                                     'struct Proposal<pType: Enum<ProposalType, AddAdmin, RemoveAdmin, UpdateFeeReceiver, UpdateTokenManager, UpdateAdminThreshold, UpdateSMGPKThreshold, UpdateFeeCommonConfig, SetSmgPKS>, addr: struct ZswapCoinPublicKey<bytes: Bytes<32>>, addrUnshielded: struct UserAddress<bytes: Bytes<32>>, threshold: Uint<0..340282366920938463463374607431768211456>, feeConfig: struct FeeConfig<chainId: Uint<0..4294967296>, fee: Uint<0..340282366920938463463374607431768211456>>, smgPubkeys: Vector<29, struct ZswapCoinPublicKey<bytes: Bytes<32>>>>',
                                     newProposal_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_10.toValue(newProposal_0),
            alignment: _descriptor_10.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._newProposal_0(context,
                                             partialProofData,
                                             newProposal_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      voteProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`voteProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const proposalId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('voteProposal',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 581 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(proposalId_0) === 'bigint' && proposalId_0 >= 0n && proposalId_0 <= 4294967295n)) {
          __compactRuntime.typeError('voteProposal',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 581 char 1',
                                     'Uint<0..4294967296>',
                                     proposalId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
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
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      executeProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`executeProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const proposalId_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('executeProposal',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 590 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(typeof(proposalId_0) === 'bigint' && proposalId_0 >= 0n && proposalId_0 <= 4294967295n)) {
          __compactRuntime.typeError('executeProposal',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 590 char 1',
                                     'Uint<0..4294967296>',
                                     proposalId_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
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
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeExpiredHisTxs: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeExpiredHisTxs: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const txs_0 = args_1[1];
        if (!(typeof(contextOrig_0) === 'object' && contextOrig_0.currentQueryContext != undefined)) {
          __compactRuntime.typeError('removeExpiredHisTxs',
                                     'argument 1 (as invoked from Typescript)',
                                     'crosschain.compact line 624 char 1',
                                     'CircuitContext',
                                     contextOrig_0)
        }
        if (!(Array.isArray(txs_0) && txs_0.length === 20 && txs_0.every((t) => t.buffer instanceof ArrayBuffer && t.BYTES_PER_ELEMENT === 1 && t.length === 32))) {
          __compactRuntime.typeError('removeExpiredHisTxs',
                                     'argument 1 (argument 2 as invoked from Typescript)',
                                     'crosschain.compact line 624 char 1',
                                     'Vector<20, Bytes<32>>',
                                     txs_0)
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_11.toValue(txs_0),
            alignment: _descriptor_11.alignment()
          },
          output: undefined,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeExpiredHisTxs_0(context,
                                                     partialProofData,
                                                     txs_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context: context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      userLock: this.circuits.userLock,
      smgRelease: this.circuits.smgRelease,
      smgMint: this.circuits.smgMint,
      userBurn: this.circuits.userBurn,
      voteMultiCrossProposal: this.circuits.voteMultiCrossProposal,
      executeCrossProposal: this.circuits.executeCrossProposal,
      transferOwner: this.circuits.transferOwner,
      acceptOwner: this.circuits.acceptOwner,
      setFeeReceiver: this.circuits.setFeeReceiver,
      setTokenManager: this.circuits.setTokenManager,
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
    this.provableCircuits = {
      userLock: this.circuits.userLock,
      smgRelease: this.circuits.smgRelease,
      smgMint: this.circuits.smgMint,
      userBurn: this.circuits.userBurn,
      voteMultiCrossProposal: this.circuits.voteMultiCrossProposal,
      executeCrossProposal: this.circuits.executeCrossProposal,
      transferOwner: this.circuits.transferOwner,
      acceptOwner: this.circuits.acceptOwner,
      setFeeReceiver: this.circuits.setFeeReceiver,
      setTokenManager: this.circuits.setTokenManager,
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
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const adminThresholdInit_0 = args_0[1];
    const smgPKThresholdInit_0 = args_0[2];
    const feeReceiverInit_0 = args_0[3];
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
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 1 (argument 2 as invoked from Typescript)',
                                 'crosschain.compact line 151 char 1',
                                 'Uint<0..256>',
                                 adminThresholdInit_0)
    }
    if (!(typeof(smgPKThresholdInit_0) === 'bigint' && smgPKThresholdInit_0 >= 0n && smgPKThresholdInit_0 <= 255n)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 2 (argument 3 as invoked from Typescript)',
                                 'crosschain.compact line 151 char 1',
                                 'Uint<0..256>',
                                 smgPKThresholdInit_0)
    }
    if (!(typeof(feeReceiverInit_0) === 'object' && feeReceiverInit_0.bytes.buffer instanceof ArrayBuffer && feeReceiverInit_0.bytes.BYTES_PER_ELEMENT === 1 && feeReceiverInit_0.bytes.length === 32)) {
      __compactRuntime.typeError('Contract state constructor',
                                 'argument 3 (argument 4 as invoked from Typescript)',
                                 'crosschain.compact line 151 char 1',
                                 'struct UserAddress<bytes: Bytes<32>>',
                                 feeReceiverInit_0)
    }
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
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation('userLock', new __compactRuntime.ContractOperation());
    state_0.setOperation('smgRelease', new __compactRuntime.ContractOperation());
    state_0.setOperation('smgMint', new __compactRuntime.ContractOperation());
    state_0.setOperation('userBurn', new __compactRuntime.ContractOperation());
    state_0.setOperation('voteMultiCrossProposal', new __compactRuntime.ContractOperation());
    state_0.setOperation('executeCrossProposal', new __compactRuntime.ContractOperation());
    state_0.setOperation('transferOwner', new __compactRuntime.ContractOperation());
    state_0.setOperation('acceptOwner', new __compactRuntime.ContractOperation());
    state_0.setOperation('setFeeReceiver', new __compactRuntime.ContractOperation());
    state_0.setOperation('setTokenManager', new __compactRuntime.ContractOperation());
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
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: undefined,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(0n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(1n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_22.toValue({ smgId: new Uint8Array(32), fromAddr: { bytes: new Uint8Array(32) }, toAddr: '', tokenPairId: 0n, tokenAccount: new Uint8Array(32), amount: 0n, fee: 0n }),
                                                                                              alignment: _descriptor_22.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(2n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue({ uniqueId: new Uint8Array(32), crossProposal: { smgId: new Uint8Array(32), token: new Uint8Array(32), tokenPairId: 0n, isMappingToken: false, amount: 0n, fee: 0n, toAddr: { bytes: new Uint8Array(32) }, ttl: 0n } }),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(3n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(4n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(5n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(6n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue({ bytes: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(7n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(0n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(0n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(1n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(0n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(2n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(3n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(4n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(0n),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(5n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(6n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(7n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(8n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(9n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(10n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(11n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(0n),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(12n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(13n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(14n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(12n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_1 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(14n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_1),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_2 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(4n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_2),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(1n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(adminThresholdInit_0),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(7n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(smgPKThresholdInit_0),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(6n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(feeReceiverInit_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_3 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(2n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_12.toValue(tmp_3),
                                                                alignment: _descriptor_12.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 2 } }]);
    state_0.data = new __compactRuntime.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    }
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: new Uint8Array(32) };
  }
  _right_0(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _nativeToken_0() {
    return new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }
  _tokenType_0(domain_sep_0, contractAddress_0) {
    return this._persistentCommit_0([domain_sep_0, contractAddress_0.bytes],
                                    new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 100, 101, 114, 105, 118, 101, 95, 116, 111, 107, 101, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  }
  _blockTimeLt_0(context, partialProofData, time_0) {
    return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                     partialProofData,
                                                                     [
                                                                      { dup: { n: 2 } },
                                                                      { idx: { cached: true,
                                                                               pushPath: false,
                                                                               path: [
                                                                                      { tag: 'value',
                                                                                        value: { value: _descriptor_15.toValue(2n),
                                                                                                 alignment: _descriptor_15.alignment() } }] } },
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
  _mintUnshieldedToken_0(context,
                         partialProofData,
                         domainSep_0,
                         amount_0,
                         recipient_0)
  {
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(5n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(domainSep_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(amount_0),
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
    const color_0 = this._tokenType_0(domainSep_0,
                                      _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                 partialProofData,
                                                                                                 [
                                                                                                  { dup: { n: 2 } },
                                                                                                  { idx: { cached: true,
                                                                                                           pushPath: false,
                                                                                                           path: [
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_15.toValue(0n),
                                                                                                                             alignment: _descriptor_15.alignment() } }] } },
                                                                                                  { popeq: { cached: true,
                                                                                                             result: undefined } }]).value));
    const tmp_0 = this._left_0(color_0);
    const tmp_1 = amount_0;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(8n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                              { value: _descriptor_24.toValue(tmp_0),
                                                                                                alignment: _descriptor_24.alignment() },
                                                                                              { value: _descriptor_25.toValue(recipient_0),
                                                                                                alignment: _descriptor_25.alignment() }
                                                                                            )).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_1),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
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
    if (recipient_0.is_left
        &&
        this._equal_0(recipient_0.left.bytes,
                      _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 2 } },
                                                                                  { idx: { cached: true,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_15.toValue(0n),
                                                                                                             alignment: _descriptor_15.alignment() } }] } },
                                                                                  { popeq: { cached: true,
                                                                                             result: undefined } }]).value).bytes))
    {
      const tmp_2 = this._left_0(color_0);
      const tmp_3 = amount_0;
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(6n),
                                                                    alignment: _descriptor_15.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(tmp_2),
                                                                                                alignment: _descriptor_24.alignment() }).encode() } },
                                         { dup: { n: 1 } },
                                         { dup: { n: 1 } },
                                         'member',
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_3),
                                                                                                alignment: _descriptor_7.alignment() }).encode() } },
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
    }
    return color_0;
  }
  _sendUnshielded_0(context, partialProofData, color_0, amount_0, recipient_0) {
    const tmp_0 = this._left_0(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(7n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(tmp_0),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(amount_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
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
    const tmp_1 = this._left_0(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(8n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
                                                                                              { value: _descriptor_24.toValue(tmp_1),
                                                                                                alignment: _descriptor_24.alignment() },
                                                                                              { value: _descriptor_25.toValue(recipient_0),
                                                                                                alignment: _descriptor_25.alignment() }
                                                                                            )).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(amount_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
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
    if (recipient_0.is_left
        &&
        this._equal_1(recipient_0.left.bytes,
                      _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                 partialProofData,
                                                                                 [
                                                                                  { dup: { n: 2 } },
                                                                                  { idx: { cached: true,
                                                                                           pushPath: false,
                                                                                           path: [
                                                                                                  { tag: 'value',
                                                                                                    value: { value: _descriptor_15.toValue(0n),
                                                                                                             alignment: _descriptor_15.alignment() } }] } },
                                                                                  { popeq: { cached: true,
                                                                                             result: undefined } }]).value).bytes))
    {
      const tmp_2 = this._left_0(color_0);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { swap: { n: 0 } },
                                         { idx: { cached: true,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(6n),
                                                                    alignment: _descriptor_15.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(tmp_2),
                                                                                                alignment: _descriptor_24.alignment() }).encode() } },
                                         { dup: { n: 1 } },
                                         { dup: { n: 1 } },
                                         'member',
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(amount_0),
                                                                                                alignment: _descriptor_7.alignment() }).encode() } },
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
    }
    return [];
  }
  _receiveUnshielded_0(context, partialProofData, color_0, amount_0) {
    const tmp_0 = this._left_0(color_0);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { swap: { n: 0 } },
                                       { idx: { cached: true,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(6n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_24.toValue(tmp_0),
                                                                                              alignment: _descriptor_24.alignment() }).encode() } },
                                       { dup: { n: 1 } },
                                       { dup: { n: 1 } },
                                       'member',
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(amount_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
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
    return [];
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(_descriptor_23,
                                                       value_0,
                                                       rand_0);
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_4.toValue(result_0),
      alignment: _descriptor_4.alignment()
    });
    return result_0;
  }
  _receiveFee_0(context, partialProofData, amount_0) {
    this._receiveUnshielded_0(context,
                              partialProofData,
                              this._nativeToken_0(),
                              amount_0);
    this._updateReserve_0(context,
                          partialProofData,
                          false,
                          this._nativeToken_0(),
                          amount_0,
                          true);
    return [];
  }
  _userLock_0(context,
              partialProofData,
              smgId_0,
              toAddr_0,
              tokenPairId_0,
              amount_0)
  {
    let t_0;
    __compactRuntime.assert((t_0 = amount_0, t_0 > 0n),
                            'amount must be greater than 0');
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(0n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(3n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'tokenpairId not exists');
    const tokenPair_0 = _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(0n),
                                                                                                               alignment: _descriptor_15.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(3n),
                                                                                                               alignment: _descriptor_15.alignment() } }] } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                               alignment: _descriptor_3.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value);
    __compactRuntime.assert(this._equal_2(tokenPair_0.domainSep,
                                          new Uint8Array(32)),
                            'not support mapping token');
    const contractFee_0 = this._getFee_0(context,
                                         partialProofData,
                                         tokenPairId_0);
    this._receiveUnshielded_0(context,
                              partialProofData,
                              tokenPair_0.midnigthTokenAccount,
                              amount_0);
    if (contractFee_0 > 0n) {
      this._receiveFee_0(context, partialProofData, contractFee_0);
    }
    const tmp_0 = { smgId: smgId_0,
                    fromAddr: this._ownPublicKey_0(context, partialProofData),
                    toAddr: toAddr_0,
                    tokenPairId: tokenPairId_0,
                    tokenAccount: tokenPair_0.midnigthTokenAccount,
                    amount: amount_0,
                    fee: contractFee_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(1n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_22.toValue(tmp_0),
                                                                                              alignment: _descriptor_22.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _smgRelease_0(context,
                partialProofData,
                uniqueId_0,
                smgId_0,
                tokenPairId_0,
                amount_0,
                toAddr_0,
                fee_0,
                ttl_0)
  {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(0n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(3n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'tokenpairId not exists');
    const tokenPair_0 = _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(0n),
                                                                                                               alignment: _descriptor_15.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(3n),
                                                                                                               alignment: _descriptor_15.alignment() } }] } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                               alignment: _descriptor_3.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value);
    __compactRuntime.assert(this._equal_3(tokenPair_0.domainSep,
                                          new Uint8Array(32)),
                            'smgRelease not support mapping token');
    this._addCrossProposal_0(context,
                             partialProofData,
                             uniqueId_0,
                             smgId_0,
                             tokenPairId_0,
                             tokenPair_0,
                             amount_0,
                             toAddr_0,
                             fee_0,
                             ttl_0);
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
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(0n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(3n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'tokenpairId not exists');
    const tokenPair_0 = _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(0n),
                                                                                                               alignment: _descriptor_15.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(3n),
                                                                                                               alignment: _descriptor_15.alignment() } }] } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                               alignment: _descriptor_3.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value);
    __compactRuntime.assert(!this._equal_4(tokenPair_0.domainSep,
                                           new Uint8Array(32)),
                            'smgMint only support mapping token');
    this._addCrossProposal_0(context,
                             partialProofData,
                             uniqueId_0,
                             smgId_0,
                             tokenPairId_0,
                             tokenPair_0,
                             amount_0,
                             toAddr_0,
                             fee_0,
                             ttl_0);
    return [];
  }
  _userBurn_0(context,
              partialProofData,
              smgId_0,
              toAddr_0,
              tokenPairId_0,
              amount_0)
  {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(0n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(3n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'tokenpairId not exists');
    let t_0;
    __compactRuntime.assert((t_0 = amount_0, t_0 > 0n),
                            'amount must be greater than 0');
    const tokenPair_0 = _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(0n),
                                                                                                               alignment: _descriptor_15.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(3n),
                                                                                                               alignment: _descriptor_15.alignment() } }] } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                               alignment: _descriptor_3.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value);
    __compactRuntime.assert(!this._equal_5(tokenPair_0.domainSep,
                                           new Uint8Array(32)),
                            'only support mapping token');
    const contractFee_0 = this._getFee_0(context,
                                         partialProofData,
                                         tokenPairId_0);
    if (contractFee_0 > 0n) {
      this._receiveFee_0(context, partialProofData, contractFee_0);
    }
    this.__burn_0(context,
                  partialProofData,
                  tokenPair_0.midnigthTokenAccount,
                  amount_0);
    const tmp_0 = { smgId: smgId_0,
                    fromAddr: this._ownPublicKey_0(context, partialProofData),
                    toAddr: toAddr_0,
                    tokenPairId: tokenPairId_0,
                    tokenAccount: tokenPair_0.midnigthTokenAccount,
                    amount: amount_0,
                    fee: contractFee_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(1n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_22.toValue(tmp_0),
                                                                                              alignment: _descriptor_22.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _addCrossProposal_0(context,
                      partialProofData,
                      uniqueId_0,
                      smgId_0,
                      tokenPairId_0,
                      tokenPair_0,
                      amount_0,
                      toAddr_0,
                      fee_0,
                      ttl_0)
  {
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(1n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(8n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
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
                             _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'not smg member');
    let t_0;
    __compactRuntime.assert((t_0 = amount_0, t_0 > 0n),
                            'amount must be greater than 0');
    let t_1;
    __compactRuntime.assert((t_1 = amount_0, t_1 > fee_0),
                            'amount must be greater than fee');
    if (_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(1n),
                                                                                              alignment: _descriptor_15.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(6n),
                                                                                              alignment: _descriptor_15.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                                                          alignment: _descriptor_0.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value))
    {
      let t_2;
      if (this._blockTimeLt_0(context,
                              partialProofData,
                              _descriptor_16.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_15.toValue(6n),
                                                                                                                     alignment: _descriptor_15.alignment() } }] } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_0.toValue(uniqueId_0),
                                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                                          { popeq: { cached: false,
                                                                                                     result: undefined } }]).value).ttl)
          ||
          (t_2 = _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                           partialProofData,
                                                                           [
                                                                            { dup: { n: 0 } },
                                                                            { idx: { cached: false,
                                                                                     pushPath: false,
                                                                                     path: [
                                                                                            { tag: 'value',
                                                                                              value: { value: _descriptor_15.toValue(1n),
                                                                                                       alignment: _descriptor_15.alignment() } },
                                                                                            { tag: 'value',
                                                                                              value: { value: _descriptor_15.toValue(7n),
                                                                                                       alignment: _descriptor_15.alignment() } },
                                                                                            { tag: 'value',
                                                                                              value: { value: _descriptor_0.toValue(uniqueId_0),
                                                                                                       alignment: _descriptor_0.alignment() } }] } },
                                                                            'size',
                                                                            { popeq: { cached: true,
                                                                                       result: undefined } }]).value),
           t_2
           >=
           _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                      partialProofData,
                                                                      [
                                                                       { dup: { n: 0 } },
                                                                       { idx: { cached: false,
                                                                                pushPath: false,
                                                                                path: [
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_15.toValue(0n),
                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                       { tag: 'value',
                                                                                         value: { value: _descriptor_15.toValue(7n),
                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                       { popeq: { cached: false,
                                                                                  result: undefined } }]).value)))
      {
        __compactRuntime.assert(false, 'proposal exists');
      } else {
        __compactRuntime.queryLedgerState(context,
                                          partialProofData,
                                          [
                                           { idx: { cached: false,
                                                    pushPath: true,
                                                    path: [
                                                           { tag: 'value',
                                                             value: { value: _descriptor_15.toValue(1n),
                                                                      alignment: _descriptor_15.alignment() } },
                                                           { tag: 'value',
                                                             value: { value: _descriptor_15.toValue(6n),
                                                                      alignment: _descriptor_15.alignment() } }] } },
                                           { push: { storage: false,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                           { rem: { cached: false } },
                                           { ins: { cached: true, n: 2 } }]);
        __compactRuntime.queryLedgerState(context,
                                          partialProofData,
                                          [
                                           { idx: { cached: false,
                                                    pushPath: true,
                                                    path: [
                                                           { tag: 'value',
                                                             value: { value: _descriptor_15.toValue(1n),
                                                                      alignment: _descriptor_15.alignment() } },
                                                           { tag: 'value',
                                                             value: { value: _descriptor_15.toValue(7n),
                                                                      alignment: _descriptor_15.alignment() } }] } },
                                           { push: { storage: false,
                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                                  alignment: _descriptor_0.alignment() }).encode() } },
                                           { rem: { cached: false } },
                                           { ins: { cached: true, n: 2 } }]);
      }
    }
    __compactRuntime.assert(this._blockTimeLt_0(context, partialProofData, ttl_0),
                            'ttl expired');
    const isMappingToken_0 = !this._equal_6(tokenPair_0.domainSep,
                                            new Uint8Array(32));
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
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(6n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_16.toValue(newCrossProposal_0),
                                                                                              alignment: _descriptor_16.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(7n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    let tmp_1;
    const voterIndex_0 = (tmp_1 = this._ownPublicKey_0(context, partialProofData),
                          _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_15.toValue(0n),
                                                                                                                 alignment: _descriptor_15.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_15.toValue(0n),
                                                                                                                 alignment: _descriptor_15.alignment() } }] } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_4.toValue(tmp_1),
                                                                                                                 alignment: _descriptor_4.alignment() } }] } },
                                                                                      { popeq: { cached: false,
                                                                                                 result: undefined } }]).value));
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(7n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_0.toValue(uniqueId_0),
                                                                  alignment: _descriptor_0.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(voterIndex_0),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newNull().encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 3 } }]);
    return [];
  }
  _voteMultiCrossProposal_0(context, partialProofData, uniqueIds_0) {
    let tmp_0;
    if (!(tmp_0 = this._ownPublicKey_0(context, partialProofData),
          _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_15.toValue(0n),
                                                                                                alignment: _descriptor_15.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_15.toValue(0n),
                                                                                                alignment: _descriptor_15.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                            alignment: _descriptor_4.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value)))
    {
      return [];
    } else {
      this._folder_0(context,
                     partialProofData,
                     ((context, partialProofData, t_0, target_0) =>
                      {
                        let tmp_1;
                        if (!this._equal_7(target_0.uniqueId, new Uint8Array(32))
                            &&
                            (tmp_1 = target_0.uniqueId,
                             _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(6n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_1),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)))
                        {
                          let tmp_2;
                          const proposal_0 = (tmp_2 = target_0.uniqueId,
                                              _descriptor_16.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                         partialProofData,
                                                                                                         [
                                                                                                          { dup: { n: 0 } },
                                                                                                          { idx: { cached: false,
                                                                                                                   pushPath: false,
                                                                                                                   path: [
                                                                                                                          { tag: 'value',
                                                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                                                          { tag: 'value',
                                                                                                                            value: { value: _descriptor_15.toValue(6n),
                                                                                                                                     alignment: _descriptor_15.alignment() } }] } },
                                                                                                          { idx: { cached: false,
                                                                                                                   pushPath: false,
                                                                                                                   path: [
                                                                                                                          { tag: 'value',
                                                                                                                            value: { value: _descriptor_0.toValue(tmp_2),
                                                                                                                                     alignment: _descriptor_0.alignment() } }] } },
                                                                                                          { popeq: { cached: false,
                                                                                                                     result: undefined } }]).value));
                          let t_1, tmp_3;
                          if (t_1 = (tmp_3 = target_0.uniqueId,
                                     _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                               partialProofData,
                                                                                               [
                                                                                                { dup: { n: 0 } },
                                                                                                { idx: { cached: false,
                                                                                                         pushPath: false,
                                                                                                         path: [
                                                                                                                { tag: 'value',
                                                                                                                  value: { value: _descriptor_15.toValue(1n),
                                                                                                                           alignment: _descriptor_15.alignment() } },
                                                                                                                { tag: 'value',
                                                                                                                  value: { value: _descriptor_15.toValue(7n),
                                                                                                                           alignment: _descriptor_15.alignment() } },
                                                                                                                { tag: 'value',
                                                                                                                  value: { value: _descriptor_0.toValue(tmp_3),
                                                                                                                           alignment: _descriptor_0.alignment() } }] } },
                                                                                                'size',
                                                                                                { popeq: { cached: true,
                                                                                                           result: undefined } }]).value)),
                              t_1
                              <
                              _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                         partialProofData,
                                                                                         [
                                                                                          { dup: { n: 0 } },
                                                                                          { idx: { cached: false,
                                                                                                   pushPath: false,
                                                                                                   path: [
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                                          { tag: 'value',
                                                                                                            value: { value: _descriptor_15.toValue(7n),
                                                                                                                     alignment: _descriptor_15.alignment() } }] } },
                                                                                          { popeq: { cached: false,
                                                                                                     result: undefined } }]).value))
                          {
                            if (this._equal_8(proposal_0.ttl, target_0.ttl)) {
                              if (this._blockTimeGte_0(context,
                                                       partialProofData,
                                                       proposal_0.ttl))
                              {
                                const tmp_4 = target_0.uniqueId;
                                __compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { idx: { cached: false,
                                                                            pushPath: true,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(1n),
                                                                                              alignment: _descriptor_15.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(6n),
                                                                                              alignment: _descriptor_15.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_4),
                                                                                                                          alignment: _descriptor_0.alignment() }).encode() } },
                                                                   { rem: { cached: false } },
                                                                   { ins: { cached: true,
                                                                            n: 2 } }]);
                                const tmp_5 = target_0.uniqueId;
                                __compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { idx: { cached: false,
                                                                            pushPath: true,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(1n),
                                                                                              alignment: _descriptor_15.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(7n),
                                                                                              alignment: _descriptor_15.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tmp_5),
                                                                                                                          alignment: _descriptor_0.alignment() }).encode() } },
                                                                   { rem: { cached: false } },
                                                                   { ins: { cached: true,
                                                                            n: 2 } }]);
                              } else {
                                let tmp_6;
                                const voterIndex_0 = (tmp_6 = this._ownPublicKey_0(context,
                                                                                   partialProofData),
                                                      _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                                 partialProofData,
                                                                                                                 [
                                                                                                                  { dup: { n: 0 } },
                                                                                                                  { idx: { cached: false,
                                                                                                                           pushPath: false,
                                                                                                                           path: [
                                                                                                                                  { tag: 'value',
                                                                                                                                    value: { value: _descriptor_15.toValue(0n),
                                                                                                                                             alignment: _descriptor_15.alignment() } },
                                                                                                                                  { tag: 'value',
                                                                                                                                    value: { value: _descriptor_15.toValue(0n),
                                                                                                                                             alignment: _descriptor_15.alignment() } }] } },
                                                                                                                  { idx: { cached: false,
                                                                                                                           pushPath: false,
                                                                                                                           path: [
                                                                                                                                  { tag: 'value',
                                                                                                                                    value: { value: _descriptor_4.toValue(tmp_6),
                                                                                                                                             alignment: _descriptor_4.alignment() } }] } },
                                                                                                                  { popeq: { cached: false,
                                                                                                                             result: undefined } }]).value));
                                const tmp_7 = target_0.uniqueId;
                                __compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { idx: { cached: false,
                                                                            pushPath: true,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(1n),
                                                                                              alignment: _descriptor_15.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(7n),
                                                                                              alignment: _descriptor_15.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_0.toValue(tmp_7),
                                                                                              alignment: _descriptor_0.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(voterIndex_0),
                                                                                                                          alignment: _descriptor_15.alignment() }).encode() } },
                                                                   { push: { storage: true,
                                                                             value: __compactRuntime.StateValue.newNull().encode() } },
                                                                   { ins: { cached: false,
                                                                            n: 1 } },
                                                                   { ins: { cached: true,
                                                                            n: 3 } }]);
                              }
                            }
                          }
                        }
                        return t_0;
                      }),
                     [],
                     uniqueIds_0);
      return [];
    }
  }
  _updateReserve_0(context,
                   partialProofData,
                   isMappingToken_0,
                   token_0,
                   delta_0,
                   isAdd_0)
  {
    __compactRuntime.assert(delta_0 > 0n, 'delta must be positive');
    const oldAmount_0 = _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_15.toValue(1n),
                                                                                                              alignment: _descriptor_15.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_15.toValue(9n),
                                                                                                              alignment: _descriptor_15.alignment() } }] } },
                                                                                   { push: { storage: false,
                                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                                                                                          alignment: _descriptor_0.alignment() }).encode() } },
                                                                                   'member',
                                                                                   { popeq: { cached: true,
                                                                                              result: undefined } }]).value)
                        ?
                        _descriptor_20.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(1n),
                                                                                                               alignment: _descriptor_15.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(9n),
                                                                                                               alignment: _descriptor_15.alignment() } }] } },
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
    __compactRuntime.assert(this._equal_9(oldAmount_0, 0n)
                            ||
                            _descriptor_20.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(9n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_0.toValue(token_0),
                                                                                                                   alignment: _descriptor_0.alignment() } }] } },
                                                                                        { popeq: { cached: false,
                                                                                                   result: undefined } }]).value).isMappingToken
                            ===
                            isMappingToken_0,
                            'token type mismatch');
    const newAmount_0 = isAdd_0 ?
                        oldAmount_0 + delta_0 :
                        (__compactRuntime.assert(oldAmount_0 >= delta_0,
                                                 'result of subtraction would be negative'),
                         oldAmount_0 - delta_0);
    if (this._equal_10(newAmount_0, 0n)) {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(1n),
                                                                    alignment: _descriptor_15.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(9n),
                                                                    alignment: _descriptor_15.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { rem: { cached: false } },
                                         { ins: { cached: true, n: 2 } }]);
    } else {
      const tmp_0 = { total:
                        ((t1) => {
                          if (t1 > 340282366920938463463374607431768211455n) {
                            throw new __compactRuntime.CompactError('crosschain.compact line 350 char 68: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                          }
                          return t1;
                        })(newAmount_0),
                      isMappingToken: isMappingToken_0 };
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(1n),
                                                                    alignment: _descriptor_15.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(9n),
                                                                    alignment: _descriptor_15.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_20.toValue(tmp_0),
                                                                                                alignment: _descriptor_20.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 2 } }]);
    }
    return [];
  }
  __transfer_0(context,
               partialProofData,
               uniqueId_0,
               token_0,
               toAddr_0,
               amount_0,
               fee_0)
  {
    if (fee_0 > 0n) {
      this._sendUnshielded_0(context,
                             partialProofData,
                             token_0,
                             fee_0,
                             this._right_0(_descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(0n),
                                                                                                                                 alignment: _descriptor_15.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(6n),
                                                                                                                                 alignment: _descriptor_15.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)));
    }
    this._sendUnshielded_0(context,
                           partialProofData,
                           token_0,
                           amount_0,
                           this._right_0(toAddr_0));
    return [];
  }
  __mint_0(context,
           partialProofData,
           uniqueId_0,
           domainSep_0,
           toAddr_0,
           amount_0,
           fee_0)
  {
    const color_0 = this._tokenType_0(domainSep_0,
                                      _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                 partialProofData,
                                                                                                 [
                                                                                                  { dup: { n: 2 } },
                                                                                                  { idx: { cached: true,
                                                                                                           pushPath: false,
                                                                                                           path: [
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_15.toValue(0n),
                                                                                                                             alignment: _descriptor_15.alignment() } }] } },
                                                                                                  { popeq: { cached: true,
                                                                                                             result: undefined } }]).value));
    this._updateTokenTotalSupply_0(context,
                                   partialProofData,
                                   color_0,
                                   amount_0,
                                   true);
    if (fee_0 > 0n) {
      this._mintUnshieldedToken_0(context,
                                  partialProofData,
                                  domainSep_0,
                                  ((t1) => {
                                    if (t1 > 18446744073709551615n) {
                                      throw new __compactRuntime.CompactError('crosschain.compact line 389 char 36: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                    }
                                    return t1;
                                  })(fee_0),
                                  this._right_0(_descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                          partialProofData,
                                                                                                          [
                                                                                                           { dup: { n: 0 } },
                                                                                                           { idx: { cached: false,
                                                                                                                    pushPath: false,
                                                                                                                    path: [
                                                                                                                           { tag: 'value',
                                                                                                                             value: { value: _descriptor_15.toValue(0n),
                                                                                                                                      alignment: _descriptor_15.alignment() } },
                                                                                                                           { tag: 'value',
                                                                                                                             value: { value: _descriptor_15.toValue(6n),
                                                                                                                                      alignment: _descriptor_15.alignment() } }] } },
                                                                                                           { popeq: { cached: false,
                                                                                                                      result: undefined } }]).value)));
    }
    this._mintUnshieldedToken_0(context,
                                partialProofData,
                                domainSep_0,
                                ((t1) => {
                                  if (t1 > 18446744073709551615n) {
                                    throw new __compactRuntime.CompactError('crosschain.compact line 398 char 34: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                                  }
                                  return t1;
                                })(amount_0),
                                this._right_0(toAddr_0));
    return [];
  }
  _executeCrossProposal_0(context, partialProofData, uniqueId_0) {
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._ownPublicKey_0(context,
                                                          partialProofData),
                             _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'only smgTxSigners can executeCrossProposal ');
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(1n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(6n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'proposal not exists');
    let t_0;
    __compactRuntime.assert((t_0 = _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                             partialProofData,
                                                                                             [
                                                                                              { dup: { n: 0 } },
                                                                                              { idx: { cached: false,
                                                                                                       pushPath: false,
                                                                                                       path: [
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_15.toValue(1n),
                                                                                                                         alignment: _descriptor_15.alignment() } },
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_15.toValue(7n),
                                                                                                                         alignment: _descriptor_15.alignment() } },
                                                                                                              { tag: 'value',
                                                                                                                value: { value: _descriptor_0.toValue(uniqueId_0),
                                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                                              'size',
                                                                                              { popeq: { cached: true,
                                                                                                         result: undefined } }]).value),
                             t_0
                             >=
                             _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                        partialProofData,
                                                                                        [
                                                                                         { dup: { n: 0 } },
                                                                                         { idx: { cached: false,
                                                                                                  pushPath: false,
                                                                                                  path: [
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_15.toValue(0n),
                                                                                                                    alignment: _descriptor_15.alignment() } },
                                                                                                         { tag: 'value',
                                                                                                           value: { value: _descriptor_15.toValue(7n),
                                                                                                                    alignment: _descriptor_15.alignment() } }] } },
                                                                                         { popeq: { cached: false,
                                                                                                    result: undefined } }]).value)),
                            'not enough votes');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(2n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue({ uniqueId: new Uint8Array(32), crossProposal: { smgId: new Uint8Array(32), token: new Uint8Array(32), tokenPairId: 0n, isMappingToken: false, amount: 0n, fee: 0n, toAddr: { bytes: new Uint8Array(32) }, ttl: 0n } }),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const proposal_0 = _descriptor_16.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                  partialProofData,
                                                                                  [
                                                                                   { dup: { n: 0 } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_15.toValue(1n),
                                                                                                              alignment: _descriptor_15.alignment() } },
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_15.toValue(6n),
                                                                                                              alignment: _descriptor_15.alignment() } }] } },
                                                                                   { idx: { cached: false,
                                                                                            pushPath: false,
                                                                                            path: [
                                                                                                   { tag: 'value',
                                                                                                     value: { value: _descriptor_0.toValue(uniqueId_0),
                                                                                                              alignment: _descriptor_0.alignment() } }] } },
                                                                                   { popeq: { cached: false,
                                                                                              result: undefined } }]).value);
    if (proposal_0.isMappingToken === false) {
      this.__transfer_0(context,
                        partialProofData,
                        uniqueId_0,
                        proposal_0.token,
                        proposal_0.toAddr,
                        proposal_0.amount,
                        proposal_0.fee);
    } else {
      let tmp_1;
      const tokenPair_0 = (tmp_1 = proposal_0.tokenPairId,
                           _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(0n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(3n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_3.toValue(tmp_1),
                                                                                                                  alignment: _descriptor_3.alignment() } }] } },
                                                                                       { popeq: { cached: false,
                                                                                                  result: undefined } }]).value));
      this.__mint_0(context,
                    partialProofData,
                    uniqueId_0,
                    proposal_0.token,
                    proposal_0.toAddr,
                    proposal_0.amount,
                    proposal_0.fee);
    }
    const tmp_2 = { uniqueId: uniqueId_0, crossProposal: proposal_0 };
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(2n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_17.toValue(tmp_2),
                                                                                              alignment: _descriptor_17.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    const tmp_3 = proposal_0.ttl;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(8n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_1.toValue(tmp_3),
                                                                                              alignment: _descriptor_1.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(6n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(7n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(uniqueId_0),
                                                                                              alignment: _descriptor_0.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _updateTokenTotalSupply_0(context, partialProofData, token_0, delta_0, isAdd_0)
  {
    __compactRuntime.assert(delta_0 > 0n, 'delta must be positive');
    const oldTotalSupply_0 = _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(10n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                                                                                               alignment: _descriptor_0.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)
                             ?
                             _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(10n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
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
                             (__compactRuntime.assert(oldTotalSupply_0
                                                      >=
                                                      delta_0,
                                                      'result of subtraction would be negative'),
                              oldTotalSupply_0 - delta_0);
    if (this._equal_11(newTotalSupply_0, 0n)) {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(1n),
                                                                    alignment: _descriptor_15.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(10n),
                                                                    alignment: _descriptor_15.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { rem: { cached: false } },
                                         { ins: { cached: true, n: 2 } }]);
    } else {
      const tmp_0 = ((t1) => {
                      if (t1 > 340282366920938463463374607431768211455n) {
                        throw new __compactRuntime.CompactError('crosschain.compact line 433 char 52: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 340282366920938463463374607431768211455');
                      }
                      return t1;
                    })(newTotalSupply_0);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(1n),
                                                                    alignment: _descriptor_15.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(10n),
                                                                    alignment: _descriptor_15.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(token_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(tmp_0),
                                                                                                alignment: _descriptor_7.alignment() }).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 2 } }]);
    }
    return [];
  }
  __burn_0(context, partialProofData, color_0, amount_0) {
    this._receiveUnshielded_0(context, partialProofData, color_0, amount_0);
    this._sendUnshielded_0(context,
                           partialProofData,
                           color_0,
                           amount_0,
                           this._right_0({ bytes:
                                             __compactRuntime.convertFieldToBytes(32,
                                                                                  0n,
                                                                                  'crosschain.compact line 440 char 98') }));
    this._updateTokenTotalSupply_0(context,
                                   partialProofData,
                                   color_0,
                                   amount_0,
                                   false);
    return [];
  }
  _getFee_0(context, partialProofData, tokenPairId_0) {
    const tokenPair_0 = _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                   partialProofData,
                                                                                   [
                                                                                    { dup: { n: 0 } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(0n),
                                                                                                               alignment: _descriptor_15.alignment() } },
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_15.toValue(3n),
                                                                                                               alignment: _descriptor_15.alignment() } }] } },
                                                                                    { idx: { cached: false,
                                                                                             pushPath: false,
                                                                                             path: [
                                                                                                    { tag: 'value',
                                                                                                      value: { value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                               alignment: _descriptor_3.alignment() } }] } },
                                                                                    { popeq: { cached: false,
                                                                                               result: undefined } }]).value);
    if (this._equal_12(tokenPair_0.fee, 0n)) {
      let tmp_0;
      if (tmp_0 = tokenPair_0.toChainId,
          _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                    partialProofData,
                                                                    [
                                                                     { dup: { n: 0 } },
                                                                     { idx: { cached: false,
                                                                              pushPath: false,
                                                                              path: [
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_15.toValue(0n),
                                                                                                alignment: _descriptor_15.alignment() } },
                                                                                     { tag: 'value',
                                                                                       value: { value: _descriptor_15.toValue(5n),
                                                                                                alignment: _descriptor_15.alignment() } }] } },
                                                                     { push: { storage: false,
                                                                               value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                                                            alignment: _descriptor_3.alignment() }).encode() } },
                                                                     'member',
                                                                     { popeq: { cached: true,
                                                                                result: undefined } }]).value))
      {
        const tmp_1 = tokenPair_0.toChainId;
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(5n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
  _transferOwner_0(context, partialProofData, newOwner_0) {
    __compactRuntime.assert(this._equal_13(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(1n),
                                                                                                                                 alignment: _descriptor_15.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(12n),
                                                                                                                                 alignment: _descriptor_15.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value),
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'only owner can transfer ownership');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(13n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(newOwner_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _acceptOwner_0(context, partialProofData) {
    __compactRuntime.assert(this._equal_14(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(1n),
                                                                                                                                 alignment: _descriptor_15.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(13n),
                                                                                                                                 alignment: _descriptor_15.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value),
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'only pending owner can accept ownership');
    const tmp_0 = _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                            partialProofData,
                                                                            [
                                                                             { dup: { n: 0 } },
                                                                             { idx: { cached: false,
                                                                                      pushPath: false,
                                                                                      path: [
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_15.toValue(1n),
                                                                                                        alignment: _descriptor_15.alignment() } },
                                                                                             { tag: 'value',
                                                                                               value: { value: _descriptor_15.toValue(13n),
                                                                                                        alignment: _descriptor_15.alignment() } }] } },
                                                                             { popeq: { cached: false,
                                                                                        result: undefined } }]).value);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(12n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
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
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(6n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_6.toValue(newFeeReceiver_0),
                                                                                              alignment: _descriptor_6.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _setTokenManager_0(context, partialProofData, newTokenManager_0) {
    __compactRuntime.assert(this._checkAdminAuthorized_0(context,
                                                         partialProofData),
                            'not admin authorized');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(4n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(newTokenManager_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _addAdmin_0(context, partialProofData, admin_0) {
    __compactRuntime.assert(this._checkAdminAuthorized_0(context,
                                                         partialProofData),
                            'not admin authorized');
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(admin_0),
                                                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'admin already exists');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
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
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(1n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(0n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(admin_0),
                                                                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'admin does not exist');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
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
    let t_0;
    __compactRuntime.assert((t_0 = threshold_0,
                             t_0
                             <=
                             _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                                        'size',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'threshold must be less than or equal to the number of admins');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(1n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(threshold_0),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _setSmgPksks_0(context, partialProofData, voters_0) {
    __compactRuntime.assert(this._checkAdminAuthorized_0(context,
                                                         partialProofData),
                            'only owner can set smg pks');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(0n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newMap(
                                                          new __compactRuntime.StateMap()
                                                        ).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    this._folder_1(context,
                   partialProofData,
                   ((context, partialProofData, index_0, voter_0) =>
                    {
                      __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                         partialProofData,
                                                                                                         [
                                                                                                          { dup: { n: 0 } },
                                                                                                          { idx: { cached: false,
                                                                                                                   pushPath: false,
                                                                                                                   path: [
                                                                                                                          { tag: 'value',
                                                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                                                          { tag: 'value',
                                                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                                                     alignment: _descriptor_15.alignment() } }] } },
                                                                                                          { push: { storage: false,
                                                                                                                    value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(voter_0),
                                                                                                                                                                 alignment: _descriptor_4.alignment() }).encode() } },
                                                                                                          'member',
                                                                                                          { popeq: { cached: true,
                                                                                                                     result: undefined } }]).value),
                                              'smg voter Repeatedly adding');
                      if (!this._equal_15(voter_0, { bytes: new Uint8Array(32) }))
                      {
                        __compactRuntime.queryLedgerState(context,
                                                          partialProofData,
                                                          [
                                                           { idx: { cached: false,
                                                                    pushPath: true,
                                                                    path: [
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_15.toValue(0n),
                                                                                      alignment: _descriptor_15.alignment() } },
                                                                           { tag: 'value',
                                                                             value: { value: _descriptor_15.toValue(0n),
                                                                                      alignment: _descriptor_15.alignment() } }] } },
                                                           { push: { storage: false,
                                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(voter_0),
                                                                                                                  alignment: _descriptor_4.alignment() }).encode() } },
                                                           { push: { storage: true,
                                                                     value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(index_0),
                                                                                                                  alignment: _descriptor_15.alignment() }).encode() } },
                                                           { ins: { cached: false,
                                                                    n: 1 } },
                                                           { ins: { cached: true,
                                                                    n: 2 } }]);
                        return ((t1) => {
                                 if (t1 > 255n) {
                                   throw new __compactRuntime.CompactError('crosschain.compact line 515 char 14: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
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
                             _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'voter does not exist');
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(newVoter_0),
                                                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'the new voter exist');
    let tmp_1;
    const index_0 = (tmp_1 = this._ownPublicKey_0(context, partialProofData),
                     _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                partialProofData,
                                                                                [
                                                                                 { dup: { n: 0 } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_15.toValue(0n),
                                                                                                            alignment: _descriptor_15.alignment() } },
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_15.toValue(0n),
                                                                                                            alignment: _descriptor_15.alignment() } }] } },
                                                                                 { idx: { cached: false,
                                                                                          pushPath: false,
                                                                                          path: [
                                                                                                 { tag: 'value',
                                                                                                   value: { value: _descriptor_4.toValue(tmp_1),
                                                                                                            alignment: _descriptor_4.alignment() } }] } },
                                                                                 { popeq: { cached: false,
                                                                                            result: undefined } }]).value));
    const tmp_2 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_2),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(newVoter_0),
                                                                                              alignment: _descriptor_4.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(index_0),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _checkAdminAuthorized_0(context, partialProofData) {
    const isOwner_0 = this._equal_16(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                               partialProofData,
                                                                                               [
                                                                                                { dup: { n: 0 } },
                                                                                                { idx: { cached: false,
                                                                                                         pushPath: false,
                                                                                                         path: [
                                                                                                                { tag: 'value',
                                                                                                                  value: { value: _descriptor_15.toValue(1n),
                                                                                                                           alignment: _descriptor_15.alignment() } },
                                                                                                                { tag: 'value',
                                                                                                                  value: { value: _descriptor_15.toValue(12n),
                                                                                                                           alignment: _descriptor_15.alignment() } }] } },
                                                                                                { popeq: { cached: false,
                                                                                                           result: undefined } }]).value),
                                     this._ownPublicKey_0(context,
                                                          partialProofData));
    let t_0, tmp_1, tmp_0;
    const isAdminAuthorized_0 = (tmp_0 = _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                   partialProofData,
                                                                                                   [
                                                                                                    { dup: { n: 0 } },
                                                                                                    { idx: { cached: false,
                                                                                                             pushPath: false,
                                                                                                             path: [
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_15.toValue(1n),
                                                                                                                               alignment: _descriptor_15.alignment() } },
                                                                                                                    { tag: 'value',
                                                                                                                      value: { value: _descriptor_15.toValue(4n),
                                                                                                                               alignment: _descriptor_15.alignment() } }] } },
                                                                                                    { popeq: { cached: false,
                                                                                                               result: undefined } }]).value),
                                 _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                           partialProofData,
                                                                                           [
                                                                                            { dup: { n: 0 } },
                                                                                            { idx: { cached: false,
                                                                                                     pushPath: false,
                                                                                                     path: [
                                                                                                            { tag: 'value',
                                                                                                              value: { value: _descriptor_15.toValue(1n),
                                                                                                                       alignment: _descriptor_15.alignment() } },
                                                                                                            { tag: 'value',
                                                                                                              value: { value: _descriptor_15.toValue(5n),
                                                                                                                       alignment: _descriptor_15.alignment() } }] } },
                                                                                            { push: { storage: false,
                                                                                                      value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_0),
                                                                                                                                                   alignment: _descriptor_3.alignment() }).encode() } },
                                                                                            'member',
                                                                                            { popeq: { cached: true,
                                                                                                       result: undefined } }]).value))
                                &&
                                (t_0 = (tmp_1 = _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                          partialProofData,
                                                                                                          [
                                                                                                           { dup: { n: 0 } },
                                                                                                           { idx: { cached: false,
                                                                                                                    pushPath: false,
                                                                                                                    path: [
                                                                                                                           { tag: 'value',
                                                                                                                             value: { value: _descriptor_15.toValue(1n),
                                                                                                                                      alignment: _descriptor_15.alignment() } },
                                                                                                                           { tag: 'value',
                                                                                                                             value: { value: _descriptor_15.toValue(4n),
                                                                                                                                      alignment: _descriptor_15.alignment() } }] } },
                                                                                                           { popeq: { cached: false,
                                                                                                                      result: undefined } }]).value),
                                        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                  partialProofData,
                                                                                                  [
                                                                                                   { dup: { n: 0 } },
                                                                                                   { idx: { cached: false,
                                                                                                            pushPath: false,
                                                                                                            path: [
                                                                                                                   { tag: 'value',
                                                                                                                     value: { value: _descriptor_15.toValue(1n),
                                                                                                                              alignment: _descriptor_15.alignment() } },
                                                                                                                   { tag: 'value',
                                                                                                                     value: { value: _descriptor_15.toValue(5n),
                                                                                                                              alignment: _descriptor_15.alignment() } },
                                                                                                                   { tag: 'value',
                                                                                                                     value: { value: _descriptor_3.toValue(tmp_1),
                                                                                                                              alignment: _descriptor_3.alignment() } }] } },
                                                                                                   'size',
                                                                                                   { popeq: { cached: true,
                                                                                                              result: undefined } }]).value)),
                                 t_0
                                 >=
                                 _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                            partialProofData,
                                                                                            [
                                                                                             { dup: { n: 0 } },
                                                                                             { idx: { cached: false,
                                                                                                      pushPath: false,
                                                                                                      path: [
                                                                                                             { tag: 'value',
                                                                                                               value: { value: _descriptor_15.toValue(1n),
                                                                                                                        alignment: _descriptor_15.alignment() } },
                                                                                                             { tag: 'value',
                                                                                                               value: { value: _descriptor_15.toValue(1n),
                                                                                                                        alignment: _descriptor_15.alignment() } }] } },
                                                                                             { popeq: { cached: false,
                                                                                                        result: undefined } }]).value));
    return isOwner_0
           &&
           this._equal_17(_descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                     partialProofData,
                                                                                     [
                                                                                      { dup: { n: 0 } },
                                                                                      { idx: { cached: false,
                                                                                               pushPath: false,
                                                                                               path: [
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_15.toValue(1n),
                                                                                                                 alignment: _descriptor_15.alignment() } },
                                                                                                      { tag: 'value',
                                                                                                        value: { value: _descriptor_15.toValue(1n),
                                                                                                                 alignment: _descriptor_15.alignment() } }] } },
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
                            _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(0n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(0n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       'size',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'threshold must be less than or equal to the number of smg pks');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(7n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(threshold_0),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    return [];
  }
  _setFeeCommonConfig_0(context, partialProofData, chainId_0, fee_0) {
    __compactRuntime.assert(this._equal_18(this._ownPublicKey_0(context,
                                                                partialProofData),
                                           _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(0n),
                                                                                                                                 alignment: _descriptor_15.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(4n),
                                                                                                                                 alignment: _descriptor_15.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value)),
                            'not tokenManager');
    if (_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(0n),
                                                                                              alignment: _descriptor_15.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(5n),
                                                                                              alignment: _descriptor_15.alignment() } }] } },
                                                                   { push: { storage: false,
                                                                             value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(chainId_0),
                                                                                                                          alignment: _descriptor_3.alignment() }).encode() } },
                                                                   'member',
                                                                   { popeq: { cached: true,
                                                                              result: undefined } }]).value))
    {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(0n),
                                                                    alignment: _descriptor_15.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(5n),
                                                                    alignment: _descriptor_15.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(chainId_0),
                                                                                                alignment: _descriptor_3.alignment() }).encode() } },
                                         { rem: { cached: false } },
                                         { ins: { cached: true, n: 2 } }]);
    }
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(5n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(chainId_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_7.toValue(fee_0),
                                                                                              alignment: _descriptor_7.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _addTokenPair_0(context, partialProofData, tokenPairId_0, pairInfo_0) {
    __compactRuntime.assert(this._equal_19(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(0n),
                                                                                                                                 alignment: _descriptor_15.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(4n),
                                                                                                                                 alignment: _descriptor_15.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value),
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'not authorized');
    __compactRuntime.assert(!_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(3n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                                                               alignment: _descriptor_3.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value),
                            'token pair already exists');
    if (!this._equal_20(pairInfo_0.domainSep, new Uint8Array(32))) {
      const expectColor_0 = this._tokenType_0(pairInfo_0.domainSep,
                                              _descriptor_13.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                         partialProofData,
                                                                                                         [
                                                                                                          { dup: { n: 2 } },
                                                                                                          { idx: { cached: true,
                                                                                                                   pushPath: false,
                                                                                                                   path: [
                                                                                                                          { tag: 'value',
                                                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                                                     alignment: _descriptor_15.alignment() } }] } },
                                                                                                          { popeq: { cached: true,
                                                                                                                     result: undefined } }]).value));
      __compactRuntime.assert(this._equal_21(pairInfo_0.midnigthTokenAccount,
                                             expectColor_0),
                              'midnigthTokenAccount is not valid');
    }
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(3n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_14.toValue(pairInfo_0),
                                                                                              alignment: _descriptor_14.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _removeTokenPair_0(context, partialProofData, tokenPairId_0) {
    __compactRuntime.assert(this._equal_22(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(0n),
                                                                                                                                 alignment: _descriptor_15.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(4n),
                                                                                                                                 alignment: _descriptor_15.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value),
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'not authorized');
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(0n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(3n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'token pair does not exist');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(0n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(3n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tokenPairId_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    return [];
  }
  _newProposal_0(context, partialProofData, newProposal_0) {
    __compactRuntime.assert(newProposal_0.pType !== 6
                            &&
                            newProposal_0.pType !== 3,
                            'ProposalType not supoorted');
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(2n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
                                                              { value: _descriptor_12.toValue(tmp_0),
                                                                alignment: _descriptor_12.alignment() }
                                                                .value
                                                            )) } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_1 = ((t1) => {
                    if (t1 > 4294967295n) {
                      throw new __compactRuntime.CompactError('crosschain.compact line 575 char 20: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                    }
                    return t1;
                  })(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_15.toValue(1n),
                                                                                                           alignment: _descriptor_15.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_15.toValue(2n),
                                                                                                           alignment: _descriptor_15.alignment() } }] } },
                                                                                { popeq: { cached: true,
                                                                                           result: undefined } }]).value));
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(3n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_10.toValue(newProposal_0),
                                                                                              alignment: _descriptor_10.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_2 = ((t1) => {
                    if (t1 > 4294967295n) {
                      throw new __compactRuntime.CompactError('crosschain.compact line 576 char 32: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                    }
                    return t1;
                  })(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                               partialProofData,
                                                                               [
                                                                                { dup: { n: 0 } },
                                                                                { idx: { cached: false,
                                                                                         pushPath: false,
                                                                                         path: [
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_15.toValue(1n),
                                                                                                           alignment: _descriptor_15.alignment() } },
                                                                                                { tag: 'value',
                                                                                                  value: { value: _descriptor_15.toValue(2n),
                                                                                                           alignment: _descriptor_15.alignment() } }] } },
                                                                                { popeq: { cached: true,
                                                                                           result: undefined } }]).value));
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(5n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
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
                             throw new __compactRuntime.CompactError('crosschain.compact line 577 char 16: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 4294967295');
                           }
                           return t1;
                         })(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(1n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(2n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value)));
    return [];
  }
  _voteProposal_0(context, partialProofData, proposalId_0) {
    let tmp_0;
    __compactRuntime.assert((tmp_0 = this._ownPublicKey_0(context,
                                                          partialProofData),
                             _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                       partialProofData,
                                                                                       [
                                                                                        { dup: { n: 0 } },
                                                                                        { idx: { cached: false,
                                                                                                 pushPath: false,
                                                                                                 path: [
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                                        { tag: 'value',
                                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                                        { push: { storage: false,
                                                                                                  value: __compactRuntime.StateValue.newCell({ value: _descriptor_4.toValue(tmp_0),
                                                                                                                                               alignment: _descriptor_4.alignment() }).encode() } },
                                                                                        'member',
                                                                                        { popeq: { cached: true,
                                                                                                   result: undefined } }]).value)),
                            'only admin can vote proposal');
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(1n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(3n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(proposalId_0),
                                                                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'proposal does not exist');
    const tmp_1 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(5n),
                                                                  alignment: _descriptor_15.alignment() } },
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
    __compactRuntime.assert(_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                      partialProofData,
                                                                                      [
                                                                                       { dup: { n: 0 } },
                                                                                       { idx: { cached: false,
                                                                                                pushPath: false,
                                                                                                path: [
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(1n),
                                                                                                                  alignment: _descriptor_15.alignment() } },
                                                                                                       { tag: 'value',
                                                                                                         value: { value: _descriptor_15.toValue(5n),
                                                                                                                  alignment: _descriptor_15.alignment() } }] } },
                                                                                       { push: { storage: false,
                                                                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(proposalId_0),
                                                                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                                                                       'member',
                                                                                       { popeq: { cached: true,
                                                                                                  result: undefined } }]).value),
                            'proposal does not exist');
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(4n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(proposalId_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    let tmp_0;
    const currentProposal_0 = (tmp_0 = _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                 partialProofData,
                                                                                                 [
                                                                                                  { dup: { n: 0 } },
                                                                                                  { idx: { cached: false,
                                                                                                           pushPath: false,
                                                                                                           path: [
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_15.toValue(1n),
                                                                                                                             alignment: _descriptor_15.alignment() } },
                                                                                                                  { tag: 'value',
                                                                                                                    value: { value: _descriptor_15.toValue(4n),
                                                                                                                             alignment: _descriptor_15.alignment() } }] } },
                                                                                                  { popeq: { cached: false,
                                                                                                             result: undefined } }]).value),
                               _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                          partialProofData,
                                                                                          [
                                                                                           { dup: { n: 0 } },
                                                                                           { idx: { cached: false,
                                                                                                    pushPath: false,
                                                                                                    path: [
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_15.toValue(1n),
                                                                                                                      alignment: _descriptor_15.alignment() } },
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_15.toValue(3n),
                                                                                                                      alignment: _descriptor_15.alignment() } }] } },
                                                                                           { idx: { cached: false,
                                                                                                    pushPath: false,
                                                                                                    path: [
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_3.toValue(tmp_0),
                                                                                                                      alignment: _descriptor_3.alignment() } }] } },
                                                                                           { popeq: { cached: false,
                                                                                                      result: undefined } }]).value));
    if (currentProposal_0.pType === 0) {
      this._addAdmin_0(context, partialProofData, currentProposal_0.addr);
    } else {
      if (currentProposal_0.pType === 1) {
        this._removeAdmin_0(context, partialProofData, currentProposal_0.addr);
      } else {
        if (currentProposal_0.pType === 2) {
          this._setFeeReceiver_0(context,
                                 partialProofData,
                                 currentProposal_0.addrUnshielded);
        } else {
          if (currentProposal_0.pType === 3) {
            this._setTokenManager_0(context,
                                    partialProofData,
                                    currentProposal_0.addr);
          } else {
            if (currentProposal_0.pType === 4) {
              this._setAdminThreshold_0(context,
                                        partialProofData,
                                        ((t1) => {
                                          if (t1 > 255n) {
                                            throw new __compactRuntime.CompactError('crosschain.compact line 605 char 23: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                          }
                                          return t1;
                                        })(currentProposal_0.threshold));
            } else {
              if (currentProposal_0.pType === 5) {
                this._setSmgPKThreold_0(context,
                                        partialProofData,
                                        ((t1) => {
                                          if (t1 > 255n) {
                                            throw new __compactRuntime.CompactError('crosschain.compact line 607 char 21: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 255');
                                          }
                                          return t1;
                                        })(currentProposal_0.threshold));
              } else {
                if (currentProposal_0.pType === 6) {
                  this._setFeeCommonConfig_0(context,
                                             partialProofData,
                                             currentProposal_0.feeConfig.chainId,
                                             currentProposal_0.feeConfig.fee);
                } else {
                  if (currentProposal_0.pType === 7) {
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
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(3n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(proposalId_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } },
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(5n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(proposalId_0),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { rem: { cached: false } },
                                       { ins: { cached: true, n: 2 } }]);
    const tmp_1 = 0n;
    __compactRuntime.queryLedgerState(context,
                                      partialProofData,
                                      [
                                       { idx: { cached: false,
                                                pushPath: true,
                                                path: [
                                                       { tag: 'value',
                                                         value: { value: _descriptor_15.toValue(1n),
                                                                  alignment: _descriptor_15.alignment() } }] } },
                                       { push: { storage: false,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(4n),
                                                                                              alignment: _descriptor_15.alignment() }).encode() } },
                                       { push: { storage: true,
                                                 value: __compactRuntime.StateValue.newCell({ value: _descriptor_3.toValue(tmp_1),
                                                                                              alignment: _descriptor_3.alignment() }).encode() } },
                                       { ins: { cached: false, n: 1 } },
                                       { ins: { cached: true, n: 1 } }]);
    if (currentProposal_0.pType === 1) {
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(1n),
                                                                    alignment: _descriptor_15.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(3n),
                                                                                                alignment: _descriptor_15.alignment() }).encode() } },
                                         { push: { storage: true,
                                                   value: __compactRuntime.StateValue.newMap(
                                                            new __compactRuntime.StateMap()
                                                          ).encode() } },
                                         { ins: { cached: false, n: 1 } },
                                         { ins: { cached: true, n: 1 } }]);
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(1n),
                                                                    alignment: _descriptor_15.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(5n),
                                                                                                alignment: _descriptor_15.alignment() }).encode() } },
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
    __compactRuntime.assert(this._equal_23(_descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                                     partialProofData,
                                                                                                     [
                                                                                                      { dup: { n: 0 } },
                                                                                                      { idx: { cached: false,
                                                                                                               pushPath: false,
                                                                                                               path: [
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(1n),
                                                                                                                                 alignment: _descriptor_15.alignment() } },
                                                                                                                      { tag: 'value',
                                                                                                                        value: { value: _descriptor_15.toValue(12n),
                                                                                                                                 alignment: _descriptor_15.alignment() } }] } },
                                                                                                      { popeq: { cached: false,
                                                                                                                 result: undefined } }]).value),
                                           this._ownPublicKey_0(context,
                                                                partialProofData)),
                            'not admin authorized');
    this._folder_2(context,
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
    if (_descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                  partialProofData,
                                                                  [
                                                                   { dup: { n: 0 } },
                                                                   { idx: { cached: false,
                                                                            pushPath: false,
                                                                            path: [
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(1n),
                                                                                              alignment: _descriptor_15.alignment() } },
                                                                                   { tag: 'value',
                                                                                     value: { value: _descriptor_15.toValue(8n),
                                                                                              alignment: _descriptor_15.alignment() } }] } },
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
                                 throw new __compactRuntime.CompactError('crosschain.compact line 632 char 51: cast from Field or Uint value to smaller Uint value failed: ' + t1 + ' is greater than 18446744073709551615');
                               }
                               return t1;
                             })(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                                          partialProofData,
                                                                                          [
                                                                                           { dup: { n: 0 } },
                                                                                           { idx: { cached: false,
                                                                                                    pushPath: false,
                                                                                                    path: [
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_15.toValue(1n),
                                                                                                                      alignment: _descriptor_15.alignment() } },
                                                                                                           { tag: 'value',
                                                                                                             value: { value: _descriptor_15.toValue(8n),
                                                                                                                      alignment: _descriptor_15.alignment() } }] } },
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
      __compactRuntime.queryLedgerState(context,
                                        partialProofData,
                                        [
                                         { idx: { cached: false,
                                                  pushPath: true,
                                                  path: [
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(1n),
                                                                    alignment: _descriptor_15.alignment() } },
                                                         { tag: 'value',
                                                           value: { value: _descriptor_15.toValue(8n),
                                                                    alignment: _descriptor_15.alignment() } }] } },
                                         { push: { storage: false,
                                                   value: __compactRuntime.StateValue.newCell({ value: _descriptor_0.toValue(tx_0),
                                                                                                alignment: _descriptor_0.alignment() }).encode() } },
                                         { rem: { cached: false } },
                                         { ins: { cached: true, n: 2 } }]);
    }
    return [];
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
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
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_8(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _folder_0(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 5; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
  _equal_9(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_10(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_11(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_12(x0, y0) {
    if (x0 !== y0) { return false; }
    return true;
  }
  _equal_13(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
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
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
    return true;
  }
  _folder_1(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 29; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
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
    if (x0 !== y0) { return false; }
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
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_21(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) { return false; }
    return true;
  }
  _equal_22(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) { return false; }
    }
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
  _folder_2(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 20; i++) { x = f(context, partialProofData, x, a0[i]); }
    return x;
  }
}
export function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: undefined,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    smgTxSigners: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'crosschain.compact line 28 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'crosschain.compact line 28 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     key_0)
        }
        return _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_15.toValue(0n),
                                                                                                      alignment: _descriptor_15.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_15.toValue(0n),
                                                                                                      alignment: _descriptor_15.alignment() } }] } },
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
        const self_0 = state.asArray()[0].asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_4.fromValue(key.value),      _descriptor_15.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get latestOutBoundCrosstxInfo() {
      return _descriptor_22.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_15.toValue(0n),
                                                                                                    alignment: _descriptor_15.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_15.toValue(1n),
                                                                                                    alignment: _descriptor_15.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value);
    },
    get currentExecuteCrossProposal() {
      return _descriptor_17.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_15.toValue(0n),
                                                                                                    alignment: _descriptor_15.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_15.toValue(2n),
                                                                                                    alignment: _descriptor_15.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value);
    },
    tokenPairs: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(3n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(3n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'crosschain.compact line 34 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(3n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'crosschain.compact line 34 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_14.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_15.toValue(0n),
                                                                                                      alignment: _descriptor_15.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_15.toValue(3n),
                                                                                                      alignment: _descriptor_15.alignment() } }] } },
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
        const self_0 = state.asArray()[0].asArray()[3];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_3.fromValue(key.value),      _descriptor_14.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get tokenManager() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(4n),
                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    feeCommonConfig: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(5n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(5n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'crosschain.compact line 38 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(5n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'crosschain.compact line 38 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(5n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        const self_0 = state.asArray()[0].asArray()[5];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_3.fromValue(key.value),      _descriptor_7.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get feeReceiver() {
      return _descriptor_6.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(0n),
                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(6n),
                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get smgPKThreshold() {
      return _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_15.toValue(0n),
                                                                                                    alignment: _descriptor_15.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_15.toValue(7n),
                                                                                                    alignment: _descriptor_15.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value);
    },
    admins: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'crosschain.compact line 46 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'crosschain.compact line 46 char 1',
                                     'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(0n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[0];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_4.fromValue(key.value),      _descriptor_2.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get adminThreshold() {
      return _descriptor_15.fromValue(__compactRuntime.queryLedgerState(context,
                                                                        partialProofData,
                                                                        [
                                                                         { dup: { n: 0 } },
                                                                         { idx: { cached: false,
                                                                                  pushPath: false,
                                                                                  path: [
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_15.toValue(1n),
                                                                                                    alignment: _descriptor_15.alignment() } },
                                                                                         { tag: 'value',
                                                                                           value: { value: _descriptor_15.toValue(1n),
                                                                                                    alignment: _descriptor_15.alignment() } }] } },
                                                                         { popeq: { cached: false,
                                                                                    result: undefined } }]).value);
    },
    get proposalId() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(2n),
                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    proposals: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(3n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(3n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'crosschain.compact line 51 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(3n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'crosschain.compact line 51 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_10.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_15.toValue(1n),
                                                                                                      alignment: _descriptor_15.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_15.toValue(3n),
                                                                                                      alignment: _descriptor_15.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[3];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_3.fromValue(key.value),      _descriptor_10.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get currentExcuteProposalId() {
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(4n),
                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    proposalVoters: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(5n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(5n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'crosschain.compact line 53 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(5n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'crosschain.compact line 53 char 1',
                                     'Uint<0..4294967296>',
                                     key_0)
        }
        if (state.asArray()[1].asArray()[5].asMap().get({ value: _descriptor_3.toValue(key_0),
                                                          alignment: _descriptor_3.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(1n),
                                                                                                         alignment: _descriptor_15.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(5n),
                                                                                                         alignment: _descriptor_15.alignment() } },
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
            return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(1n),
                                                                                                         alignment: _descriptor_15.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(5n),
                                                                                                         alignment: _descriptor_15.alignment() } },
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
              __compactRuntime.typeError('member',
                                         'argument 1',
                                         'crosschain.compact line 53 char 45',
                                         'struct ZswapCoinPublicKey<bytes: Bytes<32>>',
                                         elem_0)
            }
            return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(1n),
                                                                                                         alignment: _descriptor_15.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(5n),
                                                                                                         alignment: _descriptor_15.alignment() } },
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
            const self_0 = state.asArray()[1].asArray()[5].asMap().get({ value: _descriptor_3.toValue(key_0),
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
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(6n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(6n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'crosschain.compact line 56 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(6n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'crosschain.compact line 56 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_16.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_15.toValue(1n),
                                                                                                      alignment: _descriptor_15.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_15.toValue(6n),
                                                                                                      alignment: _descriptor_15.alignment() } }] } },
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
    crossProposalVoters: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(7n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(7n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'crosschain.compact line 57 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(7n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'crosschain.compact line 57 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        if (state.asArray()[1].asArray()[7].asMap().get({ value: _descriptor_0.toValue(key_0),
                                                          alignment: _descriptor_0.alignment() }) === undefined) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(1n),
                                                                                                         alignment: _descriptor_15.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(7n),
                                                                                                         alignment: _descriptor_15.alignment() } },
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
            return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(1n),
                                                                                                         alignment: _descriptor_15.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(7n),
                                                                                                         alignment: _descriptor_15.alignment() } },
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
              __compactRuntime.typeError('member',
                                         'argument 1',
                                         'crosschain.compact line 57 char 51',
                                         'Uint<0..256>',
                                         elem_0)
            }
            return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                             partialProofData,
                                                                             [
                                                                              { dup: { n: 0 } },
                                                                              { idx: { cached: false,
                                                                                       pushPath: false,
                                                                                       path: [
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(1n),
                                                                                                         alignment: _descriptor_15.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_15.toValue(7n),
                                                                                                         alignment: _descriptor_15.alignment() } },
                                                                                              { tag: 'value',
                                                                                                value: { value: _descriptor_0.toValue(key_0),
                                                                                                         alignment: _descriptor_0.alignment() } }] } },
                                                                              { push: { storage: false,
                                                                                        value: __compactRuntime.StateValue.newCell({ value: _descriptor_15.toValue(elem_0),
                                                                                                                                     alignment: _descriptor_15.alignment() }).encode() } },
                                                                              'member',
                                                                              { popeq: { cached: true,
                                                                                         result: undefined } }]).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[1].asArray()[7].asMap().get({ value: _descriptor_0.toValue(key_0),
                                                                         alignment: _descriptor_0.alignment() });
            return self_0.asMap().keys().map((elem) => _descriptor_15.fromValue(elem.value))[Symbol.iterator]();
          }
        }
      }
    },
    crossProposalHis: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(8n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(8n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'crosschain.compact line 58 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(8n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'crosschain.compact line 58 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(8n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[8];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_1.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    reserveOfAllToken: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(9n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(9n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'crosschain.compact line 60 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(9n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'crosschain.compact line 60 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_20.fromValue(__compactRuntime.queryLedgerState(context,
                                                                          partialProofData,
                                                                          [
                                                                           { dup: { n: 0 } },
                                                                           { idx: { cached: false,
                                                                                    pushPath: false,
                                                                                    path: [
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_15.toValue(1n),
                                                                                                      alignment: _descriptor_15.alignment() } },
                                                                                           { tag: 'value',
                                                                                             value: { value: _descriptor_15.toValue(9n),
                                                                                                      alignment: _descriptor_15.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[9];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_20.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    mappingTokenTotalSupply: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(10n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(10n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('member',
                                     'argument 1',
                                     'crosschain.compact line 64 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_2.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(10n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
          __compactRuntime.typeError('lookup',
                                     'argument 1',
                                     'crosschain.compact line 64 char 1',
                                     'Bytes<32>',
                                     key_0)
        }
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(context,
                                                                         partialProofData,
                                                                         [
                                                                          { dup: { n: 0 } },
                                                                          { idx: { cached: false,
                                                                                   pushPath: false,
                                                                                   path: [
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(1n),
                                                                                                     alignment: _descriptor_15.alignment() } },
                                                                                          { tag: 'value',
                                                                                            value: { value: _descriptor_15.toValue(10n),
                                                                                                     alignment: _descriptor_15.alignment() } }] } },
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
        const self_0 = state.asArray()[1].asArray()[10];
        return self_0.asMap().keys().map(  (key) => {    const value = self_0.asMap().get(key).asCell();    return [      _descriptor_0.fromValue(key.value),      _descriptor_7.fromValue(value.value)    ];  })[Symbol.iterator]();
      }
    },
    get round() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(11n),
                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                        { popeq: { cached: true,
                                                                                   result: undefined } }]).value);
    },
    get owner() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(12n),
                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get pendingOwner() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(13n),
                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    },
    get worker() {
      return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(context,
                                                                       partialProofData,
                                                                       [
                                                                        { dup: { n: 0 } },
                                                                        { idx: { cached: false,
                                                                                 pushPath: false,
                                                                                 path: [
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(1n),
                                                                                                   alignment: _descriptor_15.alignment() } },
                                                                                        { tag: 'value',
                                                                                          value: { value: _descriptor_15.toValue(14n),
                                                                                                   alignment: _descriptor_15.alignment() } }] } },
                                                                        { popeq: { cached: false,
                                                                                   result: undefined } }]).value);
    }
  };
}
const _emptyContext = {
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
};
const _dummyContract = new Contract({ });
export const pureCircuits = {};
export const contractReferenceLocations =
  { tag: 'publicLedgerArray', indices: { } };
//# sourceMappingURL=index.js.map
