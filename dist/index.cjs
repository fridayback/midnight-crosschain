'use strict';

var path = require('path');
var __compactRuntime = require('@midnight-ntwrk/compact-runtime');
var compactJs = require('@midnight-ntwrk/compact-js');
var midnightJsTypes = require('@midnight-ntwrk/midnight-js-types');
var midnightJsContracts = require('@midnight-ntwrk/midnight-js-contracts');
var midnightJsIndexerPublicDataProvider = require('@midnight-ntwrk/midnight-js-indexer-public-data-provider');
var ledger2 = require('@midnight-ntwrk/ledger-v8');
var midnightJsNetworkId = require('@midnight-ntwrk/midnight-js-network-id');
var midnightJsUtils = require('@midnight-ntwrk/midnight-js-utils');
var walletSdkAddressFormat = require('@midnight-ntwrk/wallet-sdk-address-format');
var Rx2 = require('rxjs');
var assert3 = require('assert');
require('@midnight-ntwrk/wallet-sdk-dust-wallet');
require('@midnight-ntwrk/wallet-sdk-facade');
require('@midnight-ntwrk/wallet-sdk-hd');
require('@midnight-ntwrk/wallet-sdk-shielded');
require('@midnight-ntwrk/wallet-sdk-unshielded-wallet');
require('buffer');
var graphHttp = require('graphql-http');
require('axios');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var path__default = /*#__PURE__*/_interopDefault(path);
var __compactRuntime__namespace = /*#__PURE__*/_interopNamespace(__compactRuntime);
var ledger2__namespace = /*#__PURE__*/_interopNamespace(ledger2);
var Rx2__namespace = /*#__PURE__*/_interopNamespace(Rx2);
var assert3__default = /*#__PURE__*/_interopDefault(assert3);
var graphHttp__namespace = /*#__PURE__*/_interopNamespace(graphHttp);

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);

// src/witnesses.ts
var createPrivateState = (privateCounter) => ({});
var createInitialPrivateState = (privateCounter) => createPrivateState();
var witnesses = {
  //   privateIncrement: ({ privateState }: WitnessContext<Ledger, CrossChainPrivateState>): [CrossChainPrivateState, []] => [
  //     { privateCounter: privateState.privateCounter + 1 },
  //     []
  //   ]
};
__compactRuntime__namespace.checkRuntimeVersion("0.15.0");
var ProposalType;
(function(ProposalType2) {
  ProposalType2[ProposalType2["AddAdmin"] = 0] = "AddAdmin";
  ProposalType2[ProposalType2["RemoveAdmin"] = 1] = "RemoveAdmin";
  ProposalType2[ProposalType2["UpdateFeeReceiver"] = 2] = "UpdateFeeReceiver";
  ProposalType2[ProposalType2["UpdateTokenManager"] = 3] = "UpdateTokenManager";
  ProposalType2[ProposalType2["UpdateAdminThreshold"] = 4] = "UpdateAdminThreshold";
  ProposalType2[ProposalType2["UpdateSMGPKThreshold"] = 5] = "UpdateSMGPKThreshold";
  ProposalType2[ProposalType2["UpdateFeeCommonConfig"] = 6] = "UpdateFeeCommonConfig";
  ProposalType2[ProposalType2["SetSmgPKS"] = 7] = "SetSmgPKS";
})(ProposalType || (ProposalType = {}));
var _descriptor_0 = new __compactRuntime__namespace.CompactTypeUnsignedInteger(4294967295n, 4);
var _descriptor_1 = new __compactRuntime__namespace.CompactTypeBytes(32);
var _descriptor_2 = new __compactRuntime__namespace.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);
var _TokenPairInfo_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment()))));
  }
  fromValue(value_0) {
    return {
      fromChainId: _descriptor_0.fromValue(value_0),
      toChainId: _descriptor_0.fromValue(value_0),
      midnigthTokenAccount: _descriptor_1.fromValue(value_0),
      domainSep: _descriptor_1.fromValue(value_0),
      fee: _descriptor_2.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.fromChainId).concat(_descriptor_0.toValue(value_0.toChainId).concat(_descriptor_1.toValue(value_0.midnigthTokenAccount).concat(_descriptor_1.toValue(value_0.domainSep).concat(_descriptor_2.toValue(value_0.fee)))));
  }
};
var _descriptor_3 = new _TokenPairInfo_0();
var _ZswapCoinPublicKey_0 = class {
  alignment() {
    return _descriptor_1.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_1.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.bytes);
  }
};
var _descriptor_4 = new _ZswapCoinPublicKey_0();
var _descriptor_5 = __compactRuntime__namespace.CompactTypeBoolean;
var _ContractAddress_0 = class {
  alignment() {
    return _descriptor_1.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_1.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.bytes);
  }
};
var _descriptor_6 = new _ContractAddress_0();
var _descriptor_7 = new __compactRuntime__namespace.CompactTypeUnsignedInteger(255n, 1);
var _descriptor_8 = new __compactRuntime__namespace.CompactTypeUnsignedInteger(18446744073709551615n, 8);
var _UserAddress_0 = class {
  alignment() {
    return _descriptor_1.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_1.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.bytes);
  }
};
var _descriptor_9 = new _UserAddress_0();
var _descriptor_10 = new __compactRuntime__namespace.CompactTypeVector(29, _descriptor_4);
var _ClaimTokenInfo_0 = class {
  alignment() {
    return _descriptor_9.alignment().concat(_descriptor_1.alignment().concat(_descriptor_5.alignment().concat(_descriptor_2.alignment())));
  }
  fromValue(value_0) {
    return {
      receiver: _descriptor_9.fromValue(value_0),
      token: _descriptor_1.fromValue(value_0),
      isMappingToken: _descriptor_5.fromValue(value_0),
      amount: _descriptor_2.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_9.toValue(value_0.receiver).concat(_descriptor_1.toValue(value_0.token).concat(_descriptor_5.toValue(value_0.isMappingToken).concat(_descriptor_2.toValue(value_0.amount))));
  }
};
var _descriptor_11 = new _ClaimTokenInfo_0();
var _CrossProposal_0 = class {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_9.alignment().concat(_descriptor_8.alignment())))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_1.fromValue(value_0),
      token: _descriptor_1.fromValue(value_0),
      tokenPairId: _descriptor_0.fromValue(value_0),
      isMappingToken: _descriptor_5.fromValue(value_0),
      amount: _descriptor_2.fromValue(value_0),
      fee: _descriptor_2.fromValue(value_0),
      toAddr: _descriptor_9.fromValue(value_0),
      ttl: _descriptor_8.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.smgId).concat(_descriptor_1.toValue(value_0.token).concat(_descriptor_0.toValue(value_0.tokenPairId).concat(_descriptor_5.toValue(value_0.isMappingToken).concat(_descriptor_2.toValue(value_0.amount).concat(_descriptor_2.toValue(value_0.fee).concat(_descriptor_9.toValue(value_0.toAddr).concat(_descriptor_8.toValue(value_0.ttl))))))));
  }
};
var _descriptor_12 = new _CrossProposal_0();
var _SmgEvent_0 = class {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_12.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_1.fromValue(value_0),
      crossProposal: _descriptor_12.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.uniqueId).concat(_descriptor_12.toValue(value_0.crossProposal));
  }
};
var _descriptor_13 = new _SmgEvent_0();
var _descriptor_14 = new __compactRuntime__namespace.CompactTypeVector(3, _descriptor_1);
var _ReserveOfToken_0 = class {
  alignment() {
    return _descriptor_2.alignment().concat(_descriptor_5.alignment());
  }
  fromValue(value_0) {
    return {
      total: _descriptor_2.fromValue(value_0),
      isMappingToken: _descriptor_5.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_2.toValue(value_0.total).concat(_descriptor_5.toValue(value_0.isMappingToken));
  }
};
var _descriptor_15 = new _ReserveOfToken_0();
var _VoteForCrossPropasal_0 = class {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_8.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_1.fromValue(value_0),
      ttl: _descriptor_8.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.uniqueId).concat(_descriptor_8.toValue(value_0.ttl));
  }
};
var _descriptor_16 = new _VoteForCrossPropasal_0();
var _descriptor_17 = new __compactRuntime__namespace.CompactTypeVector(5, _descriptor_16);
var _descriptor_18 = __compactRuntime__namespace.CompactTypeOpaqueString;
var _CrossOutBound_0 = class {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_4.alignment().concat(_descriptor_18.alignment().concat(_descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment()))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_1.fromValue(value_0),
      fromAddr: _descriptor_4.fromValue(value_0),
      toAddr: _descriptor_18.fromValue(value_0),
      tokenPairId: _descriptor_0.fromValue(value_0),
      tokenAccount: _descriptor_1.fromValue(value_0),
      amount: _descriptor_2.fromValue(value_0),
      fee: _descriptor_2.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.smgId).concat(_descriptor_4.toValue(value_0.fromAddr).concat(_descriptor_18.toValue(value_0.toAddr).concat(_descriptor_0.toValue(value_0.tokenPairId).concat(_descriptor_1.toValue(value_0.tokenAccount).concat(_descriptor_2.toValue(value_0.amount).concat(_descriptor_2.toValue(value_0.fee)))))));
  }
};
var _descriptor_19 = new _CrossOutBound_0();
var _Either_0 = class {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_1.alignment().concat(_descriptor_1.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_5.fromValue(value_0),
      left: _descriptor_1.fromValue(value_0),
      right: _descriptor_1.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.is_left).concat(_descriptor_1.toValue(value_0.left).concat(_descriptor_1.toValue(value_0.right)));
  }
};
var _descriptor_20 = new _Either_0();
var _descriptor_21 = new __compactRuntime__namespace.CompactTypeVector(2, _descriptor_1);
var _Either_1 = class {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_6.alignment().concat(_descriptor_9.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_5.fromValue(value_0),
      left: _descriptor_6.fromValue(value_0),
      right: _descriptor_9.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.is_left).concat(_descriptor_6.toValue(value_0.left).concat(_descriptor_9.toValue(value_0.right)));
  }
};
var _descriptor_22 = new _Either_1();
var _descriptor_23 = new __compactRuntime__namespace.CompactTypeUnsignedInteger(65535n, 2);
var _descriptor_24 = new __compactRuntime__namespace.CompactTypeEnum(7, 1);
var _FeeConfig_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_2.alignment());
  }
  fromValue(value_0) {
    return {
      chainId: _descriptor_0.fromValue(value_0),
      fee: _descriptor_2.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.chainId).concat(_descriptor_2.toValue(value_0.fee));
  }
};
var _descriptor_25 = new _FeeConfig_0();
var _Proposal_0 = class {
  alignment() {
    return _descriptor_24.alignment().concat(_descriptor_4.alignment().concat(_descriptor_9.alignment().concat(_descriptor_2.alignment().concat(_descriptor_25.alignment().concat(_descriptor_10.alignment())))));
  }
  fromValue(value_0) {
    return {
      pType: _descriptor_24.fromValue(value_0),
      addr: _descriptor_4.fromValue(value_0),
      addrUnshielded: _descriptor_9.fromValue(value_0),
      threshold: _descriptor_2.fromValue(value_0),
      feeConfig: _descriptor_25.fromValue(value_0),
      smgPubkeys: _descriptor_10.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_24.toValue(value_0.pType).concat(_descriptor_4.toValue(value_0.addr).concat(_descriptor_9.toValue(value_0.addrUnshielded).concat(_descriptor_2.toValue(value_0.threshold).concat(_descriptor_25.toValue(value_0.feeConfig).concat(_descriptor_10.toValue(value_0.smgPubkeys))))));
  }
};
var _descriptor_26 = new _Proposal_0();
var Contract = class {
  constructor(...args_0) {
    __publicField(this, "witnesses");
    if (args_0.length !== 1) {
      throw new __compactRuntime__namespace.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof witnesses_0 !== "object") {
      throw new __compactRuntime__namespace.CompactError("first (witnesses) argument to Contract constructor is not an object");
    }
    this.witnesses = witnesses_0;
    this.circuits = {
      userLock: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime__namespace.CompactError(`userLock: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const smgId_0 = args_1[1];
        const toAddr_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "userLock",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 180 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "userLock",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 180 char 1",
            "Bytes<32>",
            smgId_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "userLock",
            "argument 3 (argument 4 as invoked from Typescript)",
            "crosschain.compact line 180 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        if (!(typeof amount_0 === "bigint" && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "userLock",
            "argument 4 (argument 5 as invoked from Typescript)",
            "crosschain.compact line 180 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            amount_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(smgId_0).concat(_descriptor_18.toValue(toAddr_0).concat(_descriptor_0.toValue(tokenPairId_0).concat(_descriptor_2.toValue(amount_0)))),
            alignment: _descriptor_1.alignment().concat(_descriptor_18.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment())))
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userLock_0(
          context,
          partialProofData,
          smgId_0,
          toAddr_0,
          tokenPairId_0,
          amount_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      smgRelease: (...args_1) => {
        if (args_1.length !== 8) {
          throw new __compactRuntime__namespace.CompactError(`smgRelease: expected 8 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const uniqueId_0 = args_1[1];
        const smgId_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        const toAddr_0 = args_1[5];
        const fee_0 = args_1[6];
        const ttl_0 = args_1[7];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "smgRelease",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 206 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "smgRelease",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 206 char 1",
            "Bytes<32>",
            uniqueId_0
          );
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "smgRelease",
            "argument 2 (argument 3 as invoked from Typescript)",
            "crosschain.compact line 206 char 1",
            "Bytes<32>",
            smgId_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "smgRelease",
            "argument 3 (argument 4 as invoked from Typescript)",
            "crosschain.compact line 206 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        if (!(typeof amount_0 === "bigint" && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "smgRelease",
            "argument 4 (argument 5 as invoked from Typescript)",
            "crosschain.compact line 206 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            amount_0
          );
        }
        if (!(typeof toAddr_0 === "object" && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "smgRelease",
            "argument 5 (argument 6 as invoked from Typescript)",
            "crosschain.compact line 206 char 1",
            "struct UserAddress<bytes: Bytes<32>>",
            toAddr_0
          );
        }
        if (!(typeof fee_0 === "bigint" && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "smgRelease",
            "argument 6 (argument 7 as invoked from Typescript)",
            "crosschain.compact line 206 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            fee_0
          );
        }
        if (!(typeof ttl_0 === "bigint" && ttl_0 >= 0n && ttl_0 <= 18446744073709551615n)) {
          __compactRuntime__namespace.typeError(
            "smgRelease",
            "argument 7 (argument 8 as invoked from Typescript)",
            "crosschain.compact line 206 char 1",
            "Uint<0..18446744073709551616>",
            ttl_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(uniqueId_0).concat(_descriptor_1.toValue(smgId_0).concat(_descriptor_0.toValue(tokenPairId_0).concat(_descriptor_2.toValue(amount_0).concat(_descriptor_9.toValue(toAddr_0).concat(_descriptor_2.toValue(fee_0).concat(_descriptor_8.toValue(ttl_0))))))),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_9.alignment().concat(_descriptor_2.alignment().concat(_descriptor_8.alignment()))))))
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._smgRelease_0(
          context,
          partialProofData,
          uniqueId_0,
          smgId_0,
          tokenPairId_0,
          amount_0,
          toAddr_0,
          fee_0,
          ttl_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      smgMint: (...args_1) => {
        if (args_1.length !== 8) {
          throw new __compactRuntime__namespace.CompactError(`smgMint: expected 8 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const uniqueId_0 = args_1[1];
        const smgId_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        const fee_0 = args_1[5];
        const toAddr_0 = args_1[6];
        const ttl_0 = args_1[7];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 221 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 221 char 1",
            "Bytes<32>",
            uniqueId_0
          );
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 2 (argument 3 as invoked from Typescript)",
            "crosschain.compact line 221 char 1",
            "Bytes<32>",
            smgId_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 3 (argument 4 as invoked from Typescript)",
            "crosschain.compact line 221 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        if (!(typeof amount_0 === "bigint" && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 4 (argument 5 as invoked from Typescript)",
            "crosschain.compact line 221 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            amount_0
          );
        }
        if (!(typeof fee_0 === "bigint" && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 5 (argument 6 as invoked from Typescript)",
            "crosschain.compact line 221 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            fee_0
          );
        }
        if (!(typeof toAddr_0 === "object" && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 6 (argument 7 as invoked from Typescript)",
            "crosschain.compact line 221 char 1",
            "struct UserAddress<bytes: Bytes<32>>",
            toAddr_0
          );
        }
        if (!(typeof ttl_0 === "bigint" && ttl_0 >= 0n && ttl_0 <= 18446744073709551615n)) {
          __compactRuntime__namespace.typeError(
            "smgMint",
            "argument 7 (argument 8 as invoked from Typescript)",
            "crosschain.compact line 221 char 1",
            "Uint<0..18446744073709551616>",
            ttl_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(uniqueId_0).concat(_descriptor_1.toValue(smgId_0).concat(_descriptor_0.toValue(tokenPairId_0).concat(_descriptor_2.toValue(amount_0).concat(_descriptor_2.toValue(fee_0).concat(_descriptor_9.toValue(toAddr_0).concat(_descriptor_8.toValue(ttl_0))))))),
            alignment: _descriptor_1.alignment().concat(_descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment().concat(_descriptor_2.alignment().concat(_descriptor_9.alignment().concat(_descriptor_8.alignment()))))))
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._smgMint_0(
          context,
          partialProofData,
          uniqueId_0,
          smgId_0,
          tokenPairId_0,
          amount_0,
          fee_0,
          toAddr_0,
          ttl_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      userBurn: (...args_1) => {
        if (args_1.length !== 5) {
          throw new __compactRuntime__namespace.CompactError(`userBurn: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const smgId_0 = args_1[1];
        const toAddr_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const amount_0 = args_1[4];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "userBurn",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 236 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "userBurn",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 236 char 1",
            "Bytes<32>",
            smgId_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "userBurn",
            "argument 3 (argument 4 as invoked from Typescript)",
            "crosschain.compact line 236 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        if (!(typeof amount_0 === "bigint" && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "userBurn",
            "argument 4 (argument 5 as invoked from Typescript)",
            "crosschain.compact line 236 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            amount_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(smgId_0).concat(_descriptor_18.toValue(toAddr_0).concat(_descriptor_0.toValue(tokenPairId_0).concat(_descriptor_2.toValue(amount_0)))),
            alignment: _descriptor_1.alignment().concat(_descriptor_18.alignment().concat(_descriptor_0.alignment().concat(_descriptor_2.alignment())))
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userBurn_0(
          context,
          partialProofData,
          smgId_0,
          toAddr_0,
          tokenPairId_0,
          amount_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      voteMultiCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`voteMultiCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const uniqueIds_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "voteMultiCrossProposal",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 314 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(Array.isArray(uniqueIds_0) && uniqueIds_0.length === 5 && uniqueIds_0.every((t) => typeof t === "object" && t.uniqueId.buffer instanceof ArrayBuffer && t.uniqueId.BYTES_PER_ELEMENT === 1 && t.uniqueId.length === 32 && typeof t.ttl === "bigint" && t.ttl >= 0n && t.ttl <= 18446744073709551615n))) {
          __compactRuntime__namespace.typeError(
            "voteMultiCrossProposal",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 314 char 1",
            "Vector<5, struct VoteForCrossPropasal<uniqueId: Bytes<32>, ttl: Uint<0..18446744073709551616>>>",
            uniqueIds_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_17.toValue(uniqueIds_0),
            alignment: _descriptor_17.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._voteMultiCrossProposal_0(
          context,
          partialProofData,
          uniqueIds_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      executeMultiCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`executeMultiCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const mutiEx_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "executeMultiCrossProposal",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 397 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(Array.isArray(mutiEx_0) && mutiEx_0.length === 3 && mutiEx_0.every((t) => t.buffer instanceof ArrayBuffer && t.BYTES_PER_ELEMENT === 1 && t.length === 32))) {
          __compactRuntime__namespace.typeError(
            "executeMultiCrossProposal",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 397 char 1",
            "Vector<3, Bytes<32>>",
            mutiEx_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_14.toValue(mutiEx_0),
            alignment: _descriptor_14.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._executeMultiCrossProposal_0(
          context,
          partialProofData,
          mutiEx_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      userClaim: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`userClaim: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const id_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "userClaim",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 440 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(id_0.buffer instanceof ArrayBuffer && id_0.BYTES_PER_ELEMENT === 1 && id_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "userClaim",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 440 char 1",
            "Bytes<32>",
            id_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(id_0),
            alignment: _descriptor_1.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userClaim_0(context, partialProofData, id_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setFeeReceiver: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`setFeeReceiver: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newFeeReceiver_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "setFeeReceiver",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 482 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof newFeeReceiver_0 === "object" && newFeeReceiver_0.bytes.buffer instanceof ArrayBuffer && newFeeReceiver_0.bytes.BYTES_PER_ELEMENT === 1 && newFeeReceiver_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "setFeeReceiver",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 482 char 1",
            "struct UserAddress<bytes: Bytes<32>>",
            newFeeReceiver_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_9.toValue(newFeeReceiver_0),
            alignment: _descriptor_9.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setFeeReceiver_0(
          context,
          partialProofData,
          newFeeReceiver_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setSmgPksks: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`setSmgPksks: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const voters_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "setSmgPksks",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 515 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(Array.isArray(voters_0) && voters_0.length === 29 && voters_0.every((t) => typeof t === "object" && t.bytes.buffer instanceof ArrayBuffer && t.bytes.BYTES_PER_ELEMENT === 1 && t.bytes.length === 32))) {
          __compactRuntime__namespace.typeError(
            "setSmgPksks",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 515 char 1",
            "Vector<29, struct ZswapCoinPublicKey<bytes: Bytes<32>>>",
            voters_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_10.toValue(voters_0),
            alignment: _descriptor_10.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setSmgPksks_0(context, partialProofData, voters_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setSmgPKThreold: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`setSmgPKThreold: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const threshold_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "setSmgPKThreold",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 546 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof threshold_0 === "bigint" && threshold_0 >= 0n && threshold_0 <= 255n)) {
          __compactRuntime__namespace.typeError(
            "setSmgPKThreold",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 546 char 1",
            "Uint<0..256>",
            threshold_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_7.toValue(threshold_0),
            alignment: _descriptor_7.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setSmgPKThreold_0(
          context,
          partialProofData,
          threshold_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setFeeCommonConfig: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime__namespace.CompactError(`setFeeCommonConfig: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const chainId_0 = args_1[1];
        const fee_0 = args_1[2];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "setFeeCommonConfig",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 552 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof chainId_0 === "bigint" && chainId_0 >= 0n && chainId_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "setFeeCommonConfig",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 552 char 1",
            "Uint<0..4294967296>",
            chainId_0
          );
        }
        if (!(typeof fee_0 === "bigint" && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "setFeeCommonConfig",
            "argument 2 (argument 3 as invoked from Typescript)",
            "crosschain.compact line 552 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            fee_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(chainId_0).concat(_descriptor_2.toValue(fee_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_2.alignment())
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setFeeCommonConfig_0(
          context,
          partialProofData,
          chainId_0,
          fee_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      addTokenPair: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime__namespace.CompactError(`addTokenPair: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenPairId_0 = args_1[1];
        const pairInfo_0 = args_1[2];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "addTokenPair",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 561 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "addTokenPair",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 561 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        if (!(typeof pairInfo_0 === "object" && typeof pairInfo_0.fromChainId === "bigint" && pairInfo_0.fromChainId >= 0n && pairInfo_0.fromChainId <= 4294967295n && typeof pairInfo_0.toChainId === "bigint" && pairInfo_0.toChainId >= 0n && pairInfo_0.toChainId <= 4294967295n && pairInfo_0.midnigthTokenAccount.buffer instanceof ArrayBuffer && pairInfo_0.midnigthTokenAccount.BYTES_PER_ELEMENT === 1 && pairInfo_0.midnigthTokenAccount.length === 32 && pairInfo_0.domainSep.buffer instanceof ArrayBuffer && pairInfo_0.domainSep.BYTES_PER_ELEMENT === 1 && pairInfo_0.domainSep.length === 32 && typeof pairInfo_0.fee === "bigint" && pairInfo_0.fee >= 0n && pairInfo_0.fee <= 340282366920938463463374607431768211455n)) {
          __compactRuntime__namespace.typeError(
            "addTokenPair",
            "argument 2 (argument 3 as invoked from Typescript)",
            "crosschain.compact line 561 char 1",
            "struct TokenPairInfo<fromChainId: Uint<0..4294967296>, toChainId: Uint<0..4294967296>, midnigthTokenAccount: Bytes<32>, domainSep: Bytes<32>, fee: Uint<0..340282366920938463463374607431768211456>>",
            pairInfo_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenPairId_0).concat(_descriptor_3.toValue(pairInfo_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_3.alignment())
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addTokenPair_0(
          context,
          partialProofData,
          tokenPairId_0,
          pairInfo_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeTokenPair: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime__namespace.CompactError(`removeTokenPair: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenPairId_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime__namespace.typeError(
            "removeTokenPair",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 573 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "removeTokenPair",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 573 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime__namespace.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(tokenPairId_0),
            alignment: _descriptor_0.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeTokenPair_0(
          context,
          partialProofData,
          tokenPairId_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      userLock: this.circuits.userLock,
      smgRelease: this.circuits.smgRelease,
      smgMint: this.circuits.smgMint,
      userBurn: this.circuits.userBurn,
      voteMultiCrossProposal: this.circuits.voteMultiCrossProposal,
      executeMultiCrossProposal: this.circuits.executeMultiCrossProposal,
      userClaim: this.circuits.userClaim,
      setFeeReceiver: this.circuits.setFeeReceiver,
      setSmgPksks: this.circuits.setSmgPksks,
      setSmgPKThreold: this.circuits.setSmgPKThreold,
      setFeeCommonConfig: this.circuits.setFeeCommonConfig,
      addTokenPair: this.circuits.addTokenPair,
      removeTokenPair: this.circuits.removeTokenPair
    };
    this.provableCircuits = {
      userLock: this.circuits.userLock,
      smgRelease: this.circuits.smgRelease,
      smgMint: this.circuits.smgMint,
      userBurn: this.circuits.userBurn,
      voteMultiCrossProposal: this.circuits.voteMultiCrossProposal,
      executeMultiCrossProposal: this.circuits.executeMultiCrossProposal,
      userClaim: this.circuits.userClaim,
      setFeeReceiver: this.circuits.setFeeReceiver,
      setSmgPksks: this.circuits.setSmgPksks,
      setSmgPKThreold: this.circuits.setSmgPKThreold,
      setFeeCommonConfig: this.circuits.setFeeCommonConfig,
      addTokenPair: this.circuits.addTokenPair,
      removeTokenPair: this.circuits.removeTokenPair
    };
  }
  initialState(...args_0) {
    if (args_0.length !== 4) {
      throw new __compactRuntime__namespace.CompactError(`Contract state constructor: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const constructorContext_0 = args_0[0];
    const adminThresholdInit_0 = args_0[1];
    const smgPKThresholdInit_0 = args_0[2];
    const feeReceiverInit_0 = args_0[3];
    if (typeof constructorContext_0 !== "object") {
      throw new __compactRuntime__namespace.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!("initialZswapLocalState" in constructorContext_0)) {
      throw new __compactRuntime__namespace.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof constructorContext_0.initialZswapLocalState !== "object") {
      throw new __compactRuntime__namespace.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(typeof adminThresholdInit_0 === "bigint" && adminThresholdInit_0 >= 0n && adminThresholdInit_0 <= 255n)) {
      __compactRuntime__namespace.typeError(
        "Contract state constructor",
        "argument 1 (argument 2 as invoked from Typescript)",
        "crosschain.compact line 151 char 1",
        "Uint<0..256>",
        adminThresholdInit_0
      );
    }
    if (!(typeof smgPKThresholdInit_0 === "bigint" && smgPKThresholdInit_0 >= 0n && smgPKThresholdInit_0 <= 255n)) {
      __compactRuntime__namespace.typeError(
        "Contract state constructor",
        "argument 2 (argument 3 as invoked from Typescript)",
        "crosschain.compact line 151 char 1",
        "Uint<0..256>",
        smgPKThresholdInit_0
      );
    }
    if (!(typeof feeReceiverInit_0 === "object" && feeReceiverInit_0.bytes.buffer instanceof ArrayBuffer && feeReceiverInit_0.bytes.BYTES_PER_ELEMENT === 1 && feeReceiverInit_0.bytes.length === 32)) {
      __compactRuntime__namespace.typeError(
        "Contract state constructor",
        "argument 3 (argument 4 as invoked from Typescript)",
        "crosschain.compact line 151 char 1",
        "struct UserAddress<bytes: Bytes<32>>",
        feeReceiverInit_0
      );
    }
    const state_0 = new __compactRuntime__namespace.ContractState();
    let stateValue_0 = __compactRuntime__namespace.StateValue.newArray();
    let stateValue_2 = __compactRuntime__namespace.StateValue.newArray();
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_2 = stateValue_2.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_2);
    let stateValue_1 = __compactRuntime__namespace.StateValue.newArray();
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_1 = stateValue_1.arrayPush(__compactRuntime__namespace.StateValue.newNull());
    stateValue_0 = stateValue_0.arrayPush(stateValue_1);
    state_0.data = new __compactRuntime__namespace.ChargedState(stateValue_0);
    state_0.setOperation("userLock", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("smgRelease", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("smgMint", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("userBurn", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("voteMultiCrossProposal", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("executeMultiCrossProposal", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("userClaim", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("setFeeReceiver", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("setSmgPksks", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("setSmgPKThreold", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("setFeeCommonConfig", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("addTokenPair", new __compactRuntime__namespace.ContractOperation());
    state_0.setOperation("removeTokenPair", new __compactRuntime__namespace.ContractOperation());
    const context = __compactRuntime__namespace.createCircuitContext(__compactRuntime__namespace.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: void 0,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(0n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(1n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_19.toValue({ smgId: new Uint8Array(32), fromAddr: { bytes: new Uint8Array(32) }, toAddr: "", tokenPairId: 0n, tokenAccount: new Uint8Array(32), amount: 0n, fee: 0n }),
            alignment: _descriptor_19.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(2n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(3n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(4n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_4.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(5n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(6n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_9.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_9.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(7n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(0n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(8n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(0n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(0n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(1n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_8.toValue(0n),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(2n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(3n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(0n),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(4n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(5n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(6n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(7n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(8n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(9n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(10n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(11n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_8.toValue(0n),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(12n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_4.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(13n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_4.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(14n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_4.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_4.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(12n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_4.toValue(tmp_0),
            alignment: _descriptor_4.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_1 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(14n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_4.toValue(tmp_1),
            alignment: _descriptor_4.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_2 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(4n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_4.toValue(tmp_2),
            alignment: _descriptor_4.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(0n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(adminThresholdInit_0),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(7n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(smgPKThresholdInit_0),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(6n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_9.toValue(feeReceiverInit_0),
            alignment: _descriptor_9.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_3 = 1n;
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { addi: { immediate: parseInt(__compactRuntime__namespace.valueToBigInt(
          {
            value: _descriptor_23.toValue(tmp_3),
            alignment: _descriptor_23.alignment()
          }.value
        )) } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    state_0.data = new __compactRuntime__namespace.ChargedState(context.currentQueryContext.state.state);
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    };
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
    return this._persistentCommit_0(
      [domain_sep_0, contractAddress_0.bytes],
      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 100, 101, 114, 105, 118, 101, 95, 116, 111, 107, 101, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    );
  }
  _blockTimeLt_0(context, partialProofData, time_0) {
    return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(2n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_8.toValue(time_0),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        "lt",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value);
  }
  _blockTimeGte_0(context, partialProofData, time_0) {
    return !this._blockTimeLt_0(context, partialProofData, time_0);
  }
  _mintUnshieldedToken_0(context, partialProofData, domainSep_0, amount_0, recipient_0) {
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { swap: { n: 0 } },
        { idx: {
          cached: true,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(5n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_1.toValue(domainSep_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_8.toValue(amount_0),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { swap: { n: 0 } },
        "neg",
        { branch: { skip: 4 } },
        { dup: { n: 2 } },
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [{ tag: "stack" }]
        } },
        "add",
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    const color_0 = this._tokenType_0(
      domainSep_0,
      _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 2 } },
          { idx: {
            cached: true,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)
    );
    const tmp_0 = this._left_0(color_0);
    const tmp_1 = amount_0;
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { swap: { n: 0 } },
        { idx: {
          cached: true,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(8n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell(__compactRuntime__namespace.alignedConcat(
            {
              value: _descriptor_20.toValue(tmp_0),
              alignment: _descriptor_20.alignment()
            },
            {
              value: _descriptor_22.toValue(recipient_0),
              alignment: _descriptor_22.alignment()
            }
          )).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_2.toValue(tmp_1),
            alignment: _descriptor_2.alignment()
          }).encode()
        } },
        { swap: { n: 0 } },
        "neg",
        { branch: { skip: 4 } },
        { dup: { n: 2 } },
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [{ tag: "stack" }]
        } },
        "add",
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    if (recipient_0.is_left && this._equal_0(
      recipient_0.left.bytes,
      _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 2 } },
          { idx: {
            cached: true,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value).bytes
    )) {
      const tmp_2 = this._left_0(color_0);
      const tmp_3 = amount_0;
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { swap: { n: 0 } },
          { idx: {
            cached: true,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(6n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_20.toValue(tmp_2),
              alignment: _descriptor_20.alignment()
            }).encode()
          } },
          { dup: { n: 1 } },
          { dup: { n: 1 } },
          "member",
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_2.toValue(tmp_3),
              alignment: _descriptor_2.alignment()
            }).encode()
          } },
          { swap: { n: 0 } },
          "neg",
          { branch: { skip: 4 } },
          { dup: { n: 2 } },
          { dup: { n: 2 } },
          { idx: {
            cached: true,
            pushPath: false,
            path: [{ tag: "stack" }]
          } },
          "add",
          { ins: { cached: true, n: 2 } },
          { swap: { n: 0 } }
        ]
      );
    }
    return color_0;
  }
  _sendUnshielded_0(context, partialProofData, color_0, amount_0, recipient_0) {
    const tmp_0 = this._left_0(color_0);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { swap: { n: 0 } },
        { idx: {
          cached: true,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(7n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_20.toValue(tmp_0),
            alignment: _descriptor_20.alignment()
          }).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_2.toValue(amount_0),
            alignment: _descriptor_2.alignment()
          }).encode()
        } },
        { swap: { n: 0 } },
        "neg",
        { branch: { skip: 4 } },
        { dup: { n: 2 } },
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [{ tag: "stack" }]
        } },
        "add",
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    const tmp_1 = this._left_0(color_0);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { swap: { n: 0 } },
        { idx: {
          cached: true,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(8n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell(__compactRuntime__namespace.alignedConcat(
            {
              value: _descriptor_20.toValue(tmp_1),
              alignment: _descriptor_20.alignment()
            },
            {
              value: _descriptor_22.toValue(recipient_0),
              alignment: _descriptor_22.alignment()
            }
          )).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_2.toValue(amount_0),
            alignment: _descriptor_2.alignment()
          }).encode()
        } },
        { swap: { n: 0 } },
        "neg",
        { branch: { skip: 4 } },
        { dup: { n: 2 } },
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [{ tag: "stack" }]
        } },
        "add",
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    if (recipient_0.is_left && this._equal_1(
      recipient_0.left.bytes,
      _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 2 } },
          { idx: {
            cached: true,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value).bytes
    )) {
      const tmp_2 = this._left_0(color_0);
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { swap: { n: 0 } },
          { idx: {
            cached: true,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(6n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_20.toValue(tmp_2),
              alignment: _descriptor_20.alignment()
            }).encode()
          } },
          { dup: { n: 1 } },
          { dup: { n: 1 } },
          "member",
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_2.toValue(amount_0),
              alignment: _descriptor_2.alignment()
            }).encode()
          } },
          { swap: { n: 0 } },
          "neg",
          { branch: { skip: 4 } },
          { dup: { n: 2 } },
          { dup: { n: 2 } },
          { idx: {
            cached: true,
            pushPath: false,
            path: [{ tag: "stack" }]
          } },
          "add",
          { ins: { cached: true, n: 2 } },
          { swap: { n: 0 } }
        ]
      );
    }
    return [];
  }
  _receiveUnshielded_0(context, partialProofData, color_0, amount_0) {
    const tmp_0 = this._left_0(color_0);
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { swap: { n: 0 } },
        { idx: {
          cached: true,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(6n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_20.toValue(tmp_0),
            alignment: _descriptor_20.alignment()
          }).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_2.toValue(amount_0),
            alignment: _descriptor_2.alignment()
          }).encode()
        } },
        { swap: { n: 0 } },
        "neg",
        { branch: { skip: 4 } },
        { dup: { n: 2 } },
        { dup: { n: 2 } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [{ tag: "stack" }]
        } },
        "add",
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    return [];
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = __compactRuntime__namespace.persistentCommit(
      _descriptor_21,
      value_0,
      rand_0
    );
    return result_0;
  }
  _ownPublicKey_0(context, partialProofData) {
    const result_0 = __compactRuntime__namespace.ownPublicKey(context);
    partialProofData.privateTranscriptOutputs.push({
      value: _descriptor_4.toValue(result_0),
      alignment: _descriptor_4.alignment()
    });
    return result_0;
  }
  _receiveFee_0(context, partialProofData, amount_0) {
    this._receiveUnshielded_0(
      context,
      partialProofData,
      this._nativeToken_0(),
      amount_0
    );
    this._updateReserve_0(
      context,
      partialProofData,
      false,
      this._nativeToken_0(),
      amount_0,
      true
    );
    return [];
  }
  _userLock_0(context, partialProofData, smgId_0, toAddr_0, tokenPairId_0, amount_0) {
    let t_0;
    __compactRuntime__namespace.assert(
      (t_0 = amount_0, t_0 > 0n),
      "amount must be greater than 0"
    );
    __compactRuntime__namespace.assert(
      _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(3n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(tokenPairId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "tokenpairId not exists"
    );
    const tokenPair_0 = _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(3n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(tokenPairId_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    __compactRuntime__namespace.assert(
      this._equal_2(
        tokenPair_0.domainSep,
        new Uint8Array(32)
      ),
      "not support mapping token"
    );
    const contractFee_0 = this._getFee_0(
      context,
      partialProofData,
      tokenPairId_0
    );
    this._receiveUnshielded_0(
      context,
      partialProofData,
      tokenPair_0.midnigthTokenAccount,
      amount_0
    );
    if (contractFee_0 > 0n) {
      this._receiveFee_0(context, partialProofData, contractFee_0);
    }
    const tmp_0 = {
      smgId: smgId_0,
      fromAddr: this._ownPublicKey_0(context, partialProofData),
      toAddr: toAddr_0,
      tokenPairId: tokenPairId_0,
      tokenAccount: tokenPair_0.midnigthTokenAccount,
      amount: amount_0,
      fee: 0n
    };
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(1n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_19.toValue(tmp_0),
            alignment: _descriptor_19.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _smgRelease_0(context, partialProofData, uniqueId_0, smgId_0, tokenPairId_0, amount_0, toAddr_0, fee_0, ttl_0) {
    __compactRuntime__namespace.assert(
      _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(3n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(tokenPairId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "tokenpairId not exists"
    );
    const tokenPair_0 = _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(3n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(tokenPairId_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    __compactRuntime__namespace.assert(
      this._equal_3(
        tokenPair_0.domainSep,
        new Uint8Array(32)
      ),
      "smgRelease not support mapping token"
    );
    this._addCrossProposal_0(
      context,
      partialProofData,
      uniqueId_0,
      smgId_0,
      tokenPairId_0,
      tokenPair_0,
      amount_0,
      toAddr_0,
      fee_0,
      ttl_0
    );
    return [];
  }
  _smgMint_0(context, partialProofData, uniqueId_0, smgId_0, tokenPairId_0, amount_0, fee_0, toAddr_0, ttl_0) {
    __compactRuntime__namespace.assert(
      _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(3n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(tokenPairId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "tokenpairId not exists"
    );
    const tokenPair_0 = _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(3n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(tokenPairId_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    __compactRuntime__namespace.assert(
      !this._equal_4(
        tokenPair_0.domainSep,
        new Uint8Array(32)
      ),
      "smgMint only support mapping token"
    );
    this._addCrossProposal_0(
      context,
      partialProofData,
      uniqueId_0,
      smgId_0,
      tokenPairId_0,
      tokenPair_0,
      amount_0,
      toAddr_0,
      fee_0,
      ttl_0
    );
    return [];
  }
  _userBurn_0(context, partialProofData, smgId_0, toAddr_0, tokenPairId_0, amount_0) {
    __compactRuntime__namespace.assert(
      _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(3n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(tokenPairId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "tokenpairId not exists"
    );
    let t_0;
    __compactRuntime__namespace.assert(
      (t_0 = amount_0, t_0 > 0n),
      "amount must be greater than 0"
    );
    const tokenPair_0 = _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(3n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(tokenPairId_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    __compactRuntime__namespace.assert(
      !this._equal_5(
        tokenPair_0.domainSep,
        new Uint8Array(32)
      ),
      "only support mapping token"
    );
    const contractFee_0 = this._getFee_0(
      context,
      partialProofData,
      tokenPairId_0
    );
    if (contractFee_0 > 0n) {
      this._receiveFee_0(context, partialProofData, contractFee_0);
    }
    this.__burn_0(
      context,
      partialProofData,
      tokenPair_0.midnigthTokenAccount,
      ((t1) => {
        if (t1 > 18446744073709551615n) {
          throw new __compactRuntime__namespace.CompactError("crosschain.compact line 244 char 41: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 18446744073709551615");
        }
        return t1;
      })(amount_0)
    );
    const tmp_0 = {
      smgId: smgId_0,
      fromAddr: this._ownPublicKey_0(context, partialProofData),
      toAddr: toAddr_0,
      tokenPairId: tokenPairId_0,
      tokenAccount: tokenPair_0.midnigthTokenAccount,
      amount: amount_0,
      fee: contractFee_0
    };
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(1n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_19.toValue(tmp_0),
            alignment: _descriptor_19.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _addCrossProposal_0(context, partialProofData, uniqueId_0, smgId_0, tokenPairId_0, tokenPair_0, amount_0, toAddr_0, fee_0, ttl_0) {
    __compactRuntime__namespace.assert(
      _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(7n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_1.toValue(uniqueId_0),
              alignment: _descriptor_1.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value) === false,
      "crossTx has finished"
    );
    let tmp_0;
    __compactRuntime__namespace.assert(
      (tmp_0 = this._ownPublicKey_0(
        context,
        partialProofData
      ), _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_4.toValue(tmp_0),
              alignment: _descriptor_4.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)),
      "not smg member"
    );
    let t_0;
    __compactRuntime__namespace.assert(
      (t_0 = amount_0, t_0 > 0n),
      "amount must be greater than 0"
    );
    let t_1;
    __compactRuntime__namespace.assert(
      (t_1 = amount_0, t_1 > fee_0),
      "amount must be greater than fee"
    );
    if (_descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(5n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_1.toValue(uniqueId_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value)) {
      let t_2;
      if (this._blockTimeLt_0(
        context,
        partialProofData,
        _descriptor_12.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_1.toValue(uniqueId_0),
                    alignment: _descriptor_1.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value).ttl
      ) || (t_2 = _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(6n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_1.toValue(uniqueId_0),
                  alignment: _descriptor_1.alignment()
                }
              }
            ]
          } },
          "size",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value), t_2 >= _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(7n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value))) {
        __compactRuntime__namespace.assert(false, "proposal exists");
      } else {
        __compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { idx: {
              cached: false,
              pushPath: true,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_1.toValue(uniqueId_0),
                alignment: _descriptor_1.alignment()
              }).encode()
            } },
            { rem: { cached: false } },
            { ins: { cached: true, n: 2 } }
          ]
        );
        __compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { idx: {
              cached: false,
              pushPath: true,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(6n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_1.toValue(uniqueId_0),
                alignment: _descriptor_1.alignment()
              }).encode()
            } },
            { rem: { cached: false } },
            { ins: { cached: true, n: 2 } }
          ]
        );
      }
    }
    __compactRuntime__namespace.assert(
      this._blockTimeLt_0(context, partialProofData, ttl_0),
      "ttl expired"
    );
    const isMappingToken_0 = !this._equal_6(
      tokenPair_0.domainSep,
      new Uint8Array(32)
    );
    const newCrossProposal_0 = {
      smgId: smgId_0,
      token: isMappingToken_0 ? tokenPair_0.domainSep : tokenPair_0.midnigthTokenAccount,
      tokenPairId: tokenPairId_0,
      isMappingToken: isMappingToken_0,
      amount: amount_0,
      fee: fee_0,
      toAddr: toAddr_0,
      ttl: ttl_0
    };
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(5n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_1.toValue(uniqueId_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_12.toValue(newCrossProposal_0),
            alignment: _descriptor_12.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(6n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_1.toValue(uniqueId_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    let tmp_1;
    const voterIndex_0 = (tmp_1 = this._ownPublicKey_0(context, partialProofData), _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_4.toValue(tmp_1),
                alignment: _descriptor_4.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value));
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(6n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_1.toValue(uniqueId_0),
                alignment: _descriptor_1.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(voterIndex_0),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newNull().encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 3 } }
      ]
    );
    return [];
  }
  _voteMultiCrossProposal_0(context, partialProofData, uniqueIds_0) {
    let tmp_0;
    if (!(tmp_0 = this._ownPublicKey_0(context, partialProofData), _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_4.toValue(tmp_0),
            alignment: _descriptor_4.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value))) {
      return [];
    } else {
      this._folder_0(
        context,
        partialProofData,
        ((context2, partialProofData2, t_0, target_0) => {
          let tmp_1;
          if (!this._equal_7(target_0.uniqueId, new Uint8Array(32)) && (tmp_1 = target_0.uniqueId, _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
            context2,
            partialProofData2,
            [
              { dup: { n: 0 } },
              { idx: {
                cached: false,
                pushPath: false,
                path: [
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(1n),
                      alignment: _descriptor_7.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(5n),
                      alignment: _descriptor_7.alignment()
                    }
                  }
                ]
              } },
              { push: {
                storage: false,
                value: __compactRuntime__namespace.StateValue.newCell({
                  value: _descriptor_1.toValue(tmp_1),
                  alignment: _descriptor_1.alignment()
                }).encode()
              } },
              "member",
              { popeq: {
                cached: true,
                result: void 0
              } }
            ]
          ).value))) {
            let tmp_2;
            const proposal_0 = (tmp_2 = target_0.uniqueId, _descriptor_12.fromValue(__compactRuntime__namespace.queryLedgerState(
              context2,
              partialProofData2,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(1n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(5n),
                        alignment: _descriptor_7.alignment()
                      }
                    }
                  ]
                } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_1.toValue(tmp_2),
                        alignment: _descriptor_1.alignment()
                      }
                    }
                  ]
                } },
                { popeq: {
                  cached: false,
                  result: void 0
                } }
              ]
            ).value));
            let t_1, tmp_3;
            if (t_1 = (tmp_3 = target_0.uniqueId, _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
              context2,
              partialProofData2,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(1n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(6n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_1.toValue(tmp_3),
                        alignment: _descriptor_1.alignment()
                      }
                    }
                  ]
                } },
                "size",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value)), t_1 < _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
              context2,
              partialProofData2,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(0n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(7n),
                        alignment: _descriptor_7.alignment()
                      }
                    }
                  ]
                } },
                { popeq: {
                  cached: false,
                  result: void 0
                } }
              ]
            ).value)) {
              if (this._equal_8(proposal_0.ttl, target_0.ttl)) {
                if (this._blockTimeGte_0(
                  context2,
                  partialProofData2,
                  proposal_0.ttl
                )) {
                  const tmp_4 = target_0.uniqueId;
                  __compactRuntime__namespace.queryLedgerState(
                    context2,
                    partialProofData2,
                    [
                      { idx: {
                        cached: false,
                        pushPath: true,
                        path: [
                          {
                            tag: "value",
                            value: {
                              value: _descriptor_7.toValue(1n),
                              alignment: _descriptor_7.alignment()
                            }
                          },
                          {
                            tag: "value",
                            value: {
                              value: _descriptor_7.toValue(5n),
                              alignment: _descriptor_7.alignment()
                            }
                          }
                        ]
                      } },
                      { push: {
                        storage: false,
                        value: __compactRuntime__namespace.StateValue.newCell({
                          value: _descriptor_1.toValue(tmp_4),
                          alignment: _descriptor_1.alignment()
                        }).encode()
                      } },
                      { rem: { cached: false } },
                      { ins: {
                        cached: true,
                        n: 2
                      } }
                    ]
                  );
                  const tmp_5 = target_0.uniqueId;
                  __compactRuntime__namespace.queryLedgerState(
                    context2,
                    partialProofData2,
                    [
                      { idx: {
                        cached: false,
                        pushPath: true,
                        path: [
                          {
                            tag: "value",
                            value: {
                              value: _descriptor_7.toValue(1n),
                              alignment: _descriptor_7.alignment()
                            }
                          },
                          {
                            tag: "value",
                            value: {
                              value: _descriptor_7.toValue(6n),
                              alignment: _descriptor_7.alignment()
                            }
                          }
                        ]
                      } },
                      { push: {
                        storage: false,
                        value: __compactRuntime__namespace.StateValue.newCell({
                          value: _descriptor_1.toValue(tmp_5),
                          alignment: _descriptor_1.alignment()
                        }).encode()
                      } },
                      { rem: { cached: false } },
                      { ins: {
                        cached: true,
                        n: 2
                      } }
                    ]
                  );
                } else {
                  let tmp_6;
                  const voterIndex_0 = (tmp_6 = this._ownPublicKey_0(
                    context2,
                    partialProofData2
                  ), _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
                    context2,
                    partialProofData2,
                    [
                      { dup: { n: 0 } },
                      { idx: {
                        cached: false,
                        pushPath: false,
                        path: [
                          {
                            tag: "value",
                            value: {
                              value: _descriptor_7.toValue(0n),
                              alignment: _descriptor_7.alignment()
                            }
                          },
                          {
                            tag: "value",
                            value: {
                              value: _descriptor_7.toValue(0n),
                              alignment: _descriptor_7.alignment()
                            }
                          }
                        ]
                      } },
                      { idx: {
                        cached: false,
                        pushPath: false,
                        path: [
                          {
                            tag: "value",
                            value: {
                              value: _descriptor_4.toValue(tmp_6),
                              alignment: _descriptor_4.alignment()
                            }
                          }
                        ]
                      } },
                      { popeq: {
                        cached: false,
                        result: void 0
                      } }
                    ]
                  ).value));
                  const tmp_7 = target_0.uniqueId;
                  __compactRuntime__namespace.queryLedgerState(
                    context2,
                    partialProofData2,
                    [
                      { idx: {
                        cached: false,
                        pushPath: true,
                        path: [
                          {
                            tag: "value",
                            value: {
                              value: _descriptor_7.toValue(1n),
                              alignment: _descriptor_7.alignment()
                            }
                          },
                          {
                            tag: "value",
                            value: {
                              value: _descriptor_7.toValue(6n),
                              alignment: _descriptor_7.alignment()
                            }
                          },
                          {
                            tag: "value",
                            value: {
                              value: _descriptor_1.toValue(tmp_7),
                              alignment: _descriptor_1.alignment()
                            }
                          }
                        ]
                      } },
                      { push: {
                        storage: false,
                        value: __compactRuntime__namespace.StateValue.newCell({
                          value: _descriptor_7.toValue(voterIndex_0),
                          alignment: _descriptor_7.alignment()
                        }).encode()
                      } },
                      { push: {
                        storage: true,
                        value: __compactRuntime__namespace.StateValue.newNull().encode()
                      } },
                      { ins: {
                        cached: false,
                        n: 1
                      } },
                      { ins: {
                        cached: true,
                        n: 3
                      } }
                    ]
                  );
                }
              }
            }
          }
          return t_0;
        }),
        [],
        uniqueIds_0
      );
      return [];
    }
  }
  _updateReserve_0(context, partialProofData, isMappingToken_0, token_0, delta_0, isAdd_0) {
    __compactRuntime__namespace.assert(delta_0 > 0n, "delta must be positive");
    const oldAmount_0 = _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(8n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_1.toValue(token_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value) ? _descriptor_15.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(8n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_1.toValue(token_0),
                alignment: _descriptor_1.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value).total : 0n;
    __compactRuntime__namespace.assert(
      isAdd_0 || oldAmount_0 >= delta_0,
      "delta must be less than or equal to oldAmount"
    );
    __compactRuntime__namespace.assert(
      this._equal_9(oldAmount_0, 0n) || _descriptor_15.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(8n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_1.toValue(token_0),
                  alignment: _descriptor_1.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value).isMappingToken === isMappingToken_0,
      "token type mismatch"
    );
    const newAmount_0 = isAdd_0 ? oldAmount_0 + delta_0 : (__compactRuntime__namespace.assert(
      oldAmount_0 >= delta_0,
      "result of subtraction would be negative"
    ), oldAmount_0 - delta_0);
    if (this._equal_10(newAmount_0, 0n)) {
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(8n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_1.toValue(token_0),
              alignment: _descriptor_1.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    } else {
      const tmp_0 = {
        total: ((t1) => {
          if (t1 > 340282366920938463463374607431768211455n) {
            throw new __compactRuntime__namespace.CompactError("crosschain.compact line 350 char 68: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
          }
          return t1;
        })(newAmount_0),
        isMappingToken: isMappingToken_0
      };
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(8n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_1.toValue(token_0),
              alignment: _descriptor_1.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_15.toValue(tmp_0),
              alignment: _descriptor_15.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    return [];
  }
  __transfer_0(context, partialProofData, uniqueId_0, token_0, toAddr_0, amount_0, fee_0) {
    const tmp_0 = {
      receiver: toAddr_0,
      token: token_0,
      isMappingToken: false,
      amount: (__compactRuntime__namespace.assert(
        amount_0 >= fee_0,
        "result of subtraction would be negative"
      ), amount_0 - fee_0)
    };
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(9n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_1.toValue(uniqueId_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_11.toValue(tmp_0),
            alignment: _descriptor_11.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    if (fee_0 > 0n) {
      this._updateReserve_0(
        context,
        partialProofData,
        false,
        token_0,
        fee_0,
        true
      );
    }
    return [];
  }
  __mint_0(context, partialProofData, uniqueId_0, domainSep_0, toAddr_0, amount_0, fee_0) {
    const color_0 = this._tokenType_0(
      domainSep_0,
      _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 2 } },
          { idx: {
            cached: true,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)
    );
    this._updateTokenTotalSupply_0(
      context,
      partialProofData,
      color_0,
      amount_0,
      true
    );
    if (fee_0 > 0n) {
      this._updateReserve_0(
        context,
        partialProofData,
        true,
        domainSep_0,
        fee_0,
        true
      );
    }
    const tmp_0 = {
      receiver: toAddr_0,
      token: domainSep_0,
      isMappingToken: true,
      amount: (__compactRuntime__namespace.assert(
        amount_0 >= fee_0,
        "result of subtraction would be negative"
      ), amount_0 - fee_0)
    };
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(9n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_1.toValue(uniqueId_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_11.toValue(tmp_0),
            alignment: _descriptor_11.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _executeMultiCrossProposal_0(context, partialProofData, mutiEx_0) {
    __compactRuntime__namespace.assert(
      this._equal_11(
        _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(14n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value),
        this._ownPublicKey_0(
          context,
          partialProofData
        )
      ),
      "only worker can executeCrossProposal "
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(2n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    this._folder_1(
      context,
      partialProofData,
      ((context2, partialProofData2, t_0, uniqueId_0) => {
        let t_1;
        if (!this._equal_12(uniqueId_0, new Uint8Array(32)) && _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context2,
          partialProofData2,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_1.toValue(uniqueId_0),
                alignment: _descriptor_1.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value) && (t_1 = _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context2,
          partialProofData2,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(6n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_1.toValue(uniqueId_0),
                    alignment: _descriptor_1.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value), t_1 >= _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
          context2,
          partialProofData2,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(7n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value))) {
          const proposal_0 = _descriptor_12.fromValue(__compactRuntime__namespace.queryLedgerState(
            context2,
            partialProofData2,
            [
              { dup: { n: 0 } },
              { idx: {
                cached: false,
                pushPath: false,
                path: [
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(1n),
                      alignment: _descriptor_7.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(5n),
                      alignment: _descriptor_7.alignment()
                    }
                  }
                ]
              } },
              { idx: {
                cached: false,
                pushPath: false,
                path: [
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_1.toValue(uniqueId_0),
                      alignment: _descriptor_1.alignment()
                    }
                  }
                ]
              } },
              { popeq: {
                cached: false,
                result: void 0
              } }
            ]
          ).value);
          if (proposal_0.isMappingToken === false) {
            this.__transfer_0(
              context2,
              partialProofData2,
              uniqueId_0,
              proposal_0.token,
              proposal_0.toAddr,
              proposal_0.amount,
              proposal_0.fee
            );
          } else {
            let tmp_0;
            (tmp_0 = proposal_0.tokenPairId, _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
              context2,
              partialProofData2,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(0n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(3n),
                        alignment: _descriptor_7.alignment()
                      }
                    }
                  ]
                } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_0.toValue(tmp_0),
                        alignment: _descriptor_0.alignment()
                      }
                    }
                  ]
                } },
                { popeq: {
                  cached: false,
                  result: void 0
                } }
              ]
            ).value));
            this.__mint_0(
              context2,
              partialProofData2,
              uniqueId_0,
              proposal_0.token,
              proposal_0.toAddr,
              proposal_0.amount,
              proposal_0.fee
            );
          }
          const tmp_1 = {
            uniqueId: uniqueId_0,
            crossProposal: proposal_0
          };
          __compactRuntime__namespace.queryLedgerState(
            context2,
            partialProofData2,
            [
              { idx: {
                cached: false,
                pushPath: true,
                path: [
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(0n),
                      alignment: _descriptor_7.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(2n),
                      alignment: _descriptor_7.alignment()
                    }
                  }
                ]
              } },
              { push: {
                storage: false,
                value: __compactRuntime__namespace.StateValue.newCell({
                  value: _descriptor_13.toValue(tmp_1),
                  alignment: _descriptor_13.alignment()
                }).encode()
              } },
              { push: {
                storage: true,
                value: __compactRuntime__namespace.StateValue.newNull().encode()
              } },
              { ins: {
                cached: false,
                n: 1
              } },
              { ins: {
                cached: true,
                n: 2
              } }
            ]
          );
          const tmp_2 = proposal_0.ttl;
          __compactRuntime__namespace.queryLedgerState(
            context2,
            partialProofData2,
            [
              { idx: {
                cached: false,
                pushPath: true,
                path: [
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(1n),
                      alignment: _descriptor_7.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(7n),
                      alignment: _descriptor_7.alignment()
                    }
                  }
                ]
              } },
              { push: {
                storage: false,
                value: __compactRuntime__namespace.StateValue.newCell({
                  value: _descriptor_1.toValue(uniqueId_0),
                  alignment: _descriptor_1.alignment()
                }).encode()
              } },
              { push: {
                storage: true,
                value: __compactRuntime__namespace.StateValue.newCell({
                  value: _descriptor_8.toValue(tmp_2),
                  alignment: _descriptor_8.alignment()
                }).encode()
              } },
              { ins: {
                cached: false,
                n: 1
              } },
              { ins: {
                cached: true,
                n: 2
              } }
            ]
          );
          __compactRuntime__namespace.queryLedgerState(
            context2,
            partialProofData2,
            [
              { idx: {
                cached: false,
                pushPath: true,
                path: [
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(1n),
                      alignment: _descriptor_7.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(5n),
                      alignment: _descriptor_7.alignment()
                    }
                  }
                ]
              } },
              { push: {
                storage: false,
                value: __compactRuntime__namespace.StateValue.newCell({
                  value: _descriptor_1.toValue(uniqueId_0),
                  alignment: _descriptor_1.alignment()
                }).encode()
              } },
              { rem: { cached: false } },
              { ins: {
                cached: true,
                n: 2
              } }
            ]
          );
          __compactRuntime__namespace.queryLedgerState(
            context2,
            partialProofData2,
            [
              { idx: {
                cached: false,
                pushPath: true,
                path: [
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(1n),
                      alignment: _descriptor_7.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(6n),
                      alignment: _descriptor_7.alignment()
                    }
                  }
                ]
              } },
              { push: {
                storage: false,
                value: __compactRuntime__namespace.StateValue.newCell({
                  value: _descriptor_1.toValue(uniqueId_0),
                  alignment: _descriptor_1.alignment()
                }).encode()
              } },
              { rem: { cached: false } },
              { ins: {
                cached: true,
                n: 2
              } }
            ]
          );
        }
        return t_0;
      }),
      [],
      mutiEx_0
    );
    return [];
  }
  _updateTokenTotalSupply_0(context, partialProofData, token_0, delta_0, isAdd_0) {
    __compactRuntime__namespace.assert(delta_0 > 0n, "delta must be positive");
    const oldTotalSupply_0 = _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(10n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_1.toValue(token_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value) ? _descriptor_2.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(10n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_1.toValue(token_0),
                alignment: _descriptor_1.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value) : 0n;
    __compactRuntime__namespace.assert(
      isAdd_0 || oldTotalSupply_0 >= delta_0,
      "delta must be less than or equal to oldTotalSupply"
    );
    const newTotalSupply_0 = isAdd_0 ? oldTotalSupply_0 + delta_0 : (__compactRuntime__namespace.assert(
      oldTotalSupply_0 >= delta_0,
      "result of subtraction would be negative"
    ), oldTotalSupply_0 - delta_0);
    if (this._equal_13(newTotalSupply_0, 0n)) {
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(10n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_1.toValue(token_0),
              alignment: _descriptor_1.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    } else {
      const tmp_0 = ((t1) => {
        if (t1 > 340282366920938463463374607431768211455n) {
          throw new __compactRuntime__namespace.CompactError("crosschain.compact line 429 char 52: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
        }
        return t1;
      })(newTotalSupply_0);
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(10n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_1.toValue(token_0),
              alignment: _descriptor_1.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_2.toValue(tmp_0),
              alignment: _descriptor_2.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    return [];
  }
  __burn_0(context, partialProofData, color_0, amount_0) {
    this._receiveUnshielded_0(context, partialProofData, color_0, amount_0);
    this._updateTokenTotalSupply_0(
      context,
      partialProofData,
      color_0,
      amount_0,
      false
    );
    return [];
  }
  _userClaim_0(context, partialProofData, id_0) {
    __compactRuntime__namespace.assert(
      _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(9n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_1.toValue(id_0),
              alignment: _descriptor_1.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "claim info not exists"
    );
    const claimMappingTokenInfo_0 = _descriptor_11.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(9n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_1.toValue(id_0),
                alignment: _descriptor_1.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    if (claimMappingTokenInfo_0.isMappingToken) {
      this._mintUnshieldedToken_0(
        context,
        partialProofData,
        claimMappingTokenInfo_0.token,
        ((t1) => {
          if (t1 > 18446744073709551615n) {
            throw new __compactRuntime__namespace.CompactError("crosschain.compact line 445 char 54: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 18446744073709551615");
          }
          return t1;
        })(claimMappingTokenInfo_0.amount),
        this._right_0(claimMappingTokenInfo_0.receiver)
      );
    } else {
      this._sendUnshielded_0(
        context,
        partialProofData,
        claimMappingTokenInfo_0.token,
        ((t1) => {
          if (t1 > 18446744073709551615n) {
            throw new __compactRuntime__namespace.CompactError("crosschain.compact line 447 char 49: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 18446744073709551615");
          }
          return t1;
        })(claimMappingTokenInfo_0.amount),
        this._right_0(claimMappingTokenInfo_0.receiver)
      );
    }
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(9n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_1.toValue(id_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _getFee_0(context, partialProofData, tokenPairId_0) {
    const tokenPair_0 = _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(3n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(tokenPairId_0),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value);
    if (this._equal_14(tokenPair_0.fee, 0n)) {
      let tmp_0;
      if (tmp_0 = tokenPair_0.toChainId, _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(5n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(tmp_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)) {
        const tmp_1 = tokenPair_0.toChainId;
        return _descriptor_2.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(tmp_1),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      } else {
        return 0n;
      }
    } else {
      return tokenPair_0.fee;
    }
  }
  _setFeeReceiver_0(context, partialProofData, newFeeReceiver_0) {
    __compactRuntime__namespace.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "not admin authorized"
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(6n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_9.toValue(newFeeReceiver_0),
            alignment: _descriptor_9.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _setSmgPksks_0(context, partialProofData, voters_0) {
    __compactRuntime__namespace.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "only owner can set smg pks"
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(0n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newMap(
            new __compactRuntime__namespace.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    this._folder_2(
      context,
      partialProofData,
      ((context2, partialProofData2, index_0, voter_0) => {
        __compactRuntime__namespace.assert(
          !_descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
            context2,
            partialProofData2,
            [
              { dup: { n: 0 } },
              { idx: {
                cached: false,
                pushPath: false,
                path: [
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(0n),
                      alignment: _descriptor_7.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(0n),
                      alignment: _descriptor_7.alignment()
                    }
                  }
                ]
              } },
              { push: {
                storage: false,
                value: __compactRuntime__namespace.StateValue.newCell({
                  value: _descriptor_4.toValue(voter_0),
                  alignment: _descriptor_4.alignment()
                }).encode()
              } },
              "member",
              { popeq: {
                cached: true,
                result: void 0
              } }
            ]
          ).value),
          "smg voter Repeatedly adding"
        );
        if (!this._equal_15(voter_0, { bytes: new Uint8Array(32) })) {
          __compactRuntime__namespace.queryLedgerState(
            context2,
            partialProofData2,
            [
              { idx: {
                cached: false,
                pushPath: true,
                path: [
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(0n),
                      alignment: _descriptor_7.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_7.toValue(0n),
                      alignment: _descriptor_7.alignment()
                    }
                  }
                ]
              } },
              { push: {
                storage: false,
                value: __compactRuntime__namespace.StateValue.newCell({
                  value: _descriptor_4.toValue(voter_0),
                  alignment: _descriptor_4.alignment()
                }).encode()
              } },
              { push: {
                storage: true,
                value: __compactRuntime__namespace.StateValue.newCell({
                  value: _descriptor_7.toValue(index_0),
                  alignment: _descriptor_7.alignment()
                }).encode()
              } },
              { ins: {
                cached: false,
                n: 1
              } },
              { ins: {
                cached: true,
                n: 2
              } }
            ]
          );
          return ((t1) => {
            if (t1 > 255n) {
              throw new __compactRuntime__namespace.CompactError("crosschain.compact line 523 char 14: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 255");
            }
            return t1;
          })(index_0 + 1n);
        } else {
          return index_0;
        }
      }),
      0n,
      voters_0
    );
    return [];
  }
  _checkAdminAuthorized_0(context, partialProofData) {
    const isOwner_0 = this._equal_16(
      _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(12n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value),
      this._ownPublicKey_0(
        context,
        partialProofData
      )
    );
    let t_0, tmp_1, tmp_0;
    const isAdminAuthorized_0 = (tmp_0 = _descriptor_0.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(3n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value), _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(4n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(tmp_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value)) && (t_0 = (tmp_1 = _descriptor_0.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(3n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value), _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(4n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(tmp_1),
                alignment: _descriptor_0.alignment()
              }
            }
          ]
        } },
        "size",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value)), t_0 >= _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(1n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value));
    return isOwner_0 && this._equal_17(
      _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value),
      0n
    ) || isAdminAuthorized_0;
  }
  _setSmgPKThreold_0(context, partialProofData, threshold_0) {
    __compactRuntime__namespace.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "not admin authorized"
    );
    __compactRuntime__namespace.assert(
      threshold_0 <= _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          "size",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "threshold must be less than or equal to the number of smg pks"
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(7n),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_7.toValue(threshold_0),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _setFeeCommonConfig_0(context, partialProofData, chainId_0, fee_0) {
    __compactRuntime__namespace.assert(
      this._equal_18(
        this._ownPublicKey_0(
          context,
          partialProofData
        ),
        _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(4n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value)
      ),
      "not tokenManager"
    );
    if (_descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { dup: { n: 0 } },
        { idx: {
          cached: false,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(5n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(chainId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value)) {
      __compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { idx: {
            cached: false,
            pushPath: true,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(5n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(chainId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(5n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(chainId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_2.toValue(fee_0),
            alignment: _descriptor_2.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _addTokenPair_0(context, partialProofData, tokenPairId_0, pairInfo_0) {
    __compactRuntime__namespace.assert(
      this._equal_19(
        _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(4n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value),
        this._ownPublicKey_0(
          context,
          partialProofData
        )
      ),
      "not authorized"
    );
    __compactRuntime__namespace.assert(
      !_descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(3n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(tokenPairId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "token pair already exists"
    );
    if (!this._equal_20(pairInfo_0.domainSep, new Uint8Array(32))) {
      const expectColor_0 = this._tokenType_0(
        pairInfo_0.domainSep,
        _descriptor_6.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 2 } },
            { idx: {
              cached: true,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value)
      );
      __compactRuntime__namespace.assert(
        this._equal_21(
          pairInfo_0.midnigthTokenAccount,
          expectColor_0
        ),
        "midnigthTokenAccount is not valid"
      );
    }
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(3n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(tokenPairId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_3.toValue(pairInfo_0),
            alignment: _descriptor_3.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _removeTokenPair_0(context, partialProofData, tokenPairId_0) {
    __compactRuntime__namespace.assert(
      this._equal_22(
        _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(4n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value),
        this._ownPublicKey_0(
          context,
          partialProofData
        )
      ),
      "not authorized"
    );
    __compactRuntime__namespace.assert(
      _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(3n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime__namespace.StateValue.newCell({
              value: _descriptor_0.toValue(tokenPairId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "token pair does not exist"
    );
    __compactRuntime__namespace.queryLedgerState(
      context,
      partialProofData,
      [
        { idx: {
          cached: false,
          pushPath: true,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(0n),
                alignment: _descriptor_7.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_7.toValue(3n),
                alignment: _descriptor_7.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime__namespace.StateValue.newCell({
            value: _descriptor_0.toValue(tokenPairId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _equal_0(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_1(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_2(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_3(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_4(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_5(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_6(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_7(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_8(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _folder_0(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 5; i++) {
      x = f(context, partialProofData, x, a0[i]);
    }
    return x;
  }
  _equal_9(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_10(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_11(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_12(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _folder_1(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 3; i++) {
      x = f(context, partialProofData, x, a0[i]);
    }
    return x;
  }
  _equal_13(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_14(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_15(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _folder_2(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 29; i++) {
      x = f(context, partialProofData, x, a0[i]);
    }
    return x;
  }
  _equal_16(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_17(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_18(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_19(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_20(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_21(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_22(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
};
function ledger(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime__namespace.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime__namespace.StateValue ? new __compactRuntime__namespace.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime__namespace.QueryContext(chargedState, __compactRuntime__namespace.dummyContractAddress()),
    costModel: __compactRuntime__namespace.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: void 0,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    smgTxSigners: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 28 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_4.toValue(key_0),
                alignment: _descriptor_4.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 28 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_4.toValue(key_0),
                    alignment: _descriptor_4.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[0];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_4.fromValue(key.value), _descriptor_7.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get latestOutBoundCrosstxInfo() {
      return _descriptor_19.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    currentExecuteCrossProposal: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(2n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(2n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(typeof elem_0 === "object" && elem_0.uniqueId.buffer instanceof ArrayBuffer && elem_0.uniqueId.BYTES_PER_ELEMENT === 1 && elem_0.uniqueId.length === 32 && typeof elem_0.crossProposal === "object" && elem_0.crossProposal.smgId.buffer instanceof ArrayBuffer && elem_0.crossProposal.smgId.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.smgId.length === 32 && elem_0.crossProposal.token.buffer instanceof ArrayBuffer && elem_0.crossProposal.token.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.token.length === 32 && typeof elem_0.crossProposal.tokenPairId === "bigint" && elem_0.crossProposal.tokenPairId >= 0n && elem_0.crossProposal.tokenPairId <= 4294967295n && typeof elem_0.crossProposal.isMappingToken === "boolean" && typeof elem_0.crossProposal.amount === "bigint" && elem_0.crossProposal.amount >= 0n && elem_0.crossProposal.amount <= 340282366920938463463374607431768211455n && typeof elem_0.crossProposal.fee === "bigint" && elem_0.crossProposal.fee >= 0n && elem_0.crossProposal.fee <= 340282366920938463463374607431768211455n && typeof elem_0.crossProposal.toAddr === "object" && elem_0.crossProposal.toAddr.bytes.buffer instanceof ArrayBuffer && elem_0.crossProposal.toAddr.bytes.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.toAddr.bytes.length === 32 && typeof elem_0.crossProposal.ttl === "bigint" && elem_0.crossProposal.ttl >= 0n && elem_0.crossProposal.ttl <= 18446744073709551615n)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 30 char 1",
            "struct SmgEvent<uniqueId: Bytes<32>, crossProposal: struct CrossProposal<smgId: Bytes<32>, token: Bytes<32>, tokenPairId: Uint<0..4294967296>, isMappingToken: Boolean, amount: Uint<0..340282366920938463463374607431768211456>, fee: Uint<0..340282366920938463463374607431768211456>, toAddr: struct UserAddress<bytes: Bytes<32>>, ttl: Uint<0..18446744073709551616>>>",
            elem_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(2n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_13.toValue(elem_0),
                alignment: _descriptor_13.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[2];
        return self_0.asMap().keys().map((elem) => _descriptor_13.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    tokenPairs: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(3n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(3n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 34 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(3n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 34 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(3n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(key_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[3];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_3.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get tokenManager() {
      return _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(4n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    feeCommonConfig: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 38 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 38 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_2.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(key_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[5];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_2.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get feeReceiver() {
      return _descriptor_9.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(6n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get smgPKThreshold() {
      return _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(7n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    admins: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(8n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(8n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 46 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(8n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_4.toValue(key_0),
                alignment: _descriptor_4.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 46 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(0n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(8n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_4.toValue(key_0),
                    alignment: _descriptor_4.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[0].asArray()[8];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_4.fromValue(key.value), _descriptor_5.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get adminThreshold() {
      return _descriptor_7.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(0n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get proposalId() {
      return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value);
    },
    proposals: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(2n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(2n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 51 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(2n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 51 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_26.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(2n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(key_0),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[2];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_26.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get currentExcuteProposalId() {
      return _descriptor_0.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(3n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    proposalVoters: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(4n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(4n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 53 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(4n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_0.toValue(key_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 53 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        if (state.asArray()[1].asArray()[4].asMap().get({
          value: _descriptor_0.toValue(key_0),
          alignment: _descriptor_0.alignment()
        }) === void 0) {
          throw new __compactRuntime__namespace.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(1n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(4n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_0.toValue(key_0),
                        alignment: _descriptor_0.alignment()
                      }
                    }
                  ]
                } },
                "size",
                { push: {
                  storage: false,
                  value: __compactRuntime__namespace.StateValue.newCell({
                    value: _descriptor_8.toValue(0n),
                    alignment: _descriptor_8.alignment()
                  }).encode()
                } },
                "eq",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(1n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(4n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_0.toValue(key_0),
                        alignment: _descriptor_0.alignment()
                      }
                    }
                  ]
                } },
                "size",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const elem_0 = args_1[0];
            if (!(typeof elem_0 === "object" && elem_0.bytes.buffer instanceof ArrayBuffer && elem_0.bytes.BYTES_PER_ELEMENT === 1 && elem_0.bytes.length === 32)) {
              __compactRuntime__namespace.typeError(
                "member",
                "argument 1",
                "crosschain.compact line 53 char 45",
                "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
                elem_0
              );
            }
            return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(1n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(4n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_0.toValue(key_0),
                        alignment: _descriptor_0.alignment()
                      }
                    }
                  ]
                } },
                { push: {
                  storage: false,
                  value: __compactRuntime__namespace.StateValue.newCell({
                    value: _descriptor_4.toValue(elem_0),
                    alignment: _descriptor_4.alignment()
                  }).encode()
                } },
                "member",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[1].asArray()[4].asMap().get({
              value: _descriptor_0.toValue(key_0),
              alignment: _descriptor_0.alignment()
            });
            return self_0.asMap().keys().map((elem) => _descriptor_4.fromValue(elem.value))[Symbol.iterator]();
          }
        };
      }
    },
    crossProposal: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 56 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_1.toValue(key_0),
                alignment: _descriptor_1.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 56 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_12.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(5n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_1.toValue(key_0),
                    alignment: _descriptor_1.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[5];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_1.fromValue(key.value), _descriptor_12.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    crossProposalVoters: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(6n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(6n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 57 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(6n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_1.toValue(key_0),
                alignment: _descriptor_1.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 57 char 1",
            "Bytes<32>",
            key_0
          );
        }
        if (state.asArray()[1].asArray()[6].asMap().get({
          value: _descriptor_1.toValue(key_0),
          alignment: _descriptor_1.alignment()
        }) === void 0) {
          throw new __compactRuntime__namespace.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(1n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(6n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_1.toValue(key_0),
                        alignment: _descriptor_1.alignment()
                      }
                    }
                  ]
                } },
                "size",
                { push: {
                  storage: false,
                  value: __compactRuntime__namespace.StateValue.newCell({
                    value: _descriptor_8.toValue(0n),
                    alignment: _descriptor_8.alignment()
                  }).encode()
                } },
                "eq",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          size(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(1n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(6n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_1.toValue(key_0),
                        alignment: _descriptor_1.alignment()
                      }
                    }
                  ]
                } },
                "size",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          member(...args_1) {
            if (args_1.length !== 1) {
              throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const elem_0 = args_1[0];
            if (!(typeof elem_0 === "bigint" && elem_0 >= 0n && elem_0 <= 255n)) {
              __compactRuntime__namespace.typeError(
                "member",
                "argument 1",
                "crosschain.compact line 57 char 51",
                "Uint<0..256>",
                elem_0
              );
            }
            return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
              context,
              partialProofData,
              [
                { dup: { n: 0 } },
                { idx: {
                  cached: false,
                  pushPath: false,
                  path: [
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(1n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_7.toValue(6n),
                        alignment: _descriptor_7.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_1.toValue(key_0),
                        alignment: _descriptor_1.alignment()
                      }
                    }
                  ]
                } },
                { push: {
                  storage: false,
                  value: __compactRuntime__namespace.StateValue.newCell({
                    value: _descriptor_7.toValue(elem_0),
                    alignment: _descriptor_7.alignment()
                  }).encode()
                } },
                "member",
                { popeq: {
                  cached: true,
                  result: void 0
                } }
              ]
            ).value);
          },
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[1].asArray()[6].asMap().get({
              value: _descriptor_1.toValue(key_0),
              alignment: _descriptor_1.alignment()
            });
            return self_0.asMap().keys().map((elem) => _descriptor_7.fromValue(elem.value))[Symbol.iterator]();
          }
        };
      }
    },
    crossProposalHis: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(7n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(7n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 58 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(7n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_1.toValue(key_0),
                alignment: _descriptor_1.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 58 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(7n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_1.toValue(key_0),
                    alignment: _descriptor_1.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[7];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_1.fromValue(key.value), _descriptor_8.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    reserveOfAllToken: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(8n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(8n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 60 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(8n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_1.toValue(key_0),
                alignment: _descriptor_1.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 60 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_15.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(8n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_1.toValue(key_0),
                    alignment: _descriptor_1.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[8];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_1.fromValue(key.value), _descriptor_15.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    tokenToBeClaimed: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(9n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(9n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 61 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(9n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_1.toValue(key_0),
                alignment: _descriptor_1.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 61 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_11.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(9n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_1.toValue(key_0),
                    alignment: _descriptor_1.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[9];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_1.fromValue(key.value), _descriptor_11.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    mappingTokenTotalSupply: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(10n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_8.toValue(0n),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "eq",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      size(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(10n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            "size",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      member(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 64 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_5.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(10n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime__namespace.StateValue.newCell({
                value: _descriptor_1.toValue(key_0),
                alignment: _descriptor_1.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value);
      },
      lookup(...args_0) {
        if (args_0.length !== 1) {
          throw new __compactRuntime__namespace.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime__namespace.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 64 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_2.fromValue(__compactRuntime__namespace.queryLedgerState(
          context,
          partialProofData,
          [
            { dup: { n: 0 } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(1n),
                    alignment: _descriptor_7.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_7.toValue(10n),
                    alignment: _descriptor_7.alignment()
                  }
                }
              ]
            } },
            { idx: {
              cached: false,
              pushPath: false,
              path: [
                {
                  tag: "value",
                  value: {
                    value: _descriptor_1.toValue(key_0),
                    alignment: _descriptor_1.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value);
      },
      [Symbol.iterator](...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime__namespace.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[10];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_1.fromValue(key.value), _descriptor_2.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get round() {
      return _descriptor_8.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(11n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value);
    },
    get owner() {
      return _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(12n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get pendingOwner() {
      return _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(13n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    },
    get worker() {
      return _descriptor_4.fromValue(__compactRuntime__namespace.queryLedgerState(
        context,
        partialProofData,
        [
          { dup: { n: 0 } },
          { idx: {
            cached: false,
            pushPath: false,
            path: [
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(1n),
                  alignment: _descriptor_7.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_7.toValue(14n),
                  alignment: _descriptor_7.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value);
    }
  };
}
({
  currentQueryContext: new __compactRuntime__namespace.QueryContext(new __compactRuntime__namespace.ContractState().data, __compactRuntime__namespace.dummyContractAddress())
});
new Contract({});
var indexerURL = (process.env.INDEXER_URL || "http://10.211.55.6:8088") + "/api/v3/graphql";
(process.env.TX_SERVER_URL || "http://10.211.55.6:3000") + "/submit";
graphHttp__namespace.createClient({ url: indexerURL });

// src/wallet-sdk.ts
var signTransactionIntents = (tx, signFn, proofMarker) => {
  if (!tx.intents || tx.intents.size === 0) return;
  let intents = tx.intents;
  for (const segment of intents.keys()) {
    const intent = intents.get(segment);
    if (!intent) continue;
    const cloned = ledger2__namespace.Intent.deserialize(
      "signature",
      proofMarker,
      "pre-binding",
      intent.serialize()
    );
    const sigData = cloned.signatureData(segment);
    const signature = signFn(sigData);
    if (cloned.fallibleUnshieldedOffer) {
      const sigs = cloned.fallibleUnshieldedOffer.inputs.map(
        (_, i) => cloned.fallibleUnshieldedOffer.signatures.at(i) ?? signature
      );
      cloned.fallibleUnshieldedOffer = cloned.fallibleUnshieldedOffer.addSignatures(sigs);
    }
    if (cloned.guaranteedUnshieldedOffer) {
      const sigs = cloned.guaranteedUnshieldedOffer.inputs.map(
        (_, i) => cloned.guaranteedUnshieldedOffer.signatures.at(i) ?? signature
      );
      cloned.guaranteedUnshieldedOffer = cloned.guaranteedUnshieldedOffer.addSignatures(sigs);
    }
    intents.set(segment, cloned);
  }
  tx.intents = intents;
};

// src/api.ts
var CrossChainPrivateStateId = "crossChainPrivateState";
var currentDir = "";
console.log("currentDir===>", currentDir);
var ZKConfig = {
  privateStateStoreName: "crosschain-private-state",
  zkConfigPath: path__default.default.resolve(currentDir, "managed", "crosschain")
};
var fromHexWithOrNoPrefix = (hex) => {
  if (hex.startsWith("0x")) {
    return midnightJsUtils.fromHex(hex.slice(2));
  }
  return midnightJsUtils.fromHex(hex);
};
function pad(s, n) {
  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(s);
  if (n < utf8Bytes.length) {
    throw new Error(`The padded length n must be at least ${utf8Bytes.length}`);
  }
  const paddedArray = new Uint8Array(n);
  paddedArray.set(utf8Bytes);
  return paddedArray;
}
var crosschainContractInstance = new Contract(witnesses);
var CompiledSimpleContract = compactJs.CompiledContract.make("CrossChain", Contract).pipe(
  compactJs.CompiledContract.withWitnesses(witnesses),
  compactJs.CompiledContract.withCompiledFileAssets(path__default.default.resolve(currentDir, "managed", "crosschain"))
);
var createWalletAndMidnightProvider = async (wallet) => {
  const walletFacade = wallet.getWalletInstance();
  assert3__default.default(walletFacade, "wallet not initialized");
  const state = await Rx2__namespace.firstValueFrom(walletFacade.state().pipe(Rx2__namespace.filter((s) => s.isSynced)));
  return {
    getCoinPublicKey: () => state.shielded.coinPublicKey.toHexString(),
    getEncryptionPublicKey: () => state.shielded.encryptionPublicKey.toHexString(),
    async balanceTx(tx, ttl) {
      const recipe = await walletFacade.balanceUnboundTransaction(
        tx,
        { shieldedSecretKeys: wallet.getShieldedSecretKeys(), dustSecretKey: wallet.getDustSecretKey() },
        { ttl: ttl ?? new Date(Date.now() + 30 * 60 * 1e3) }
      );
      const signFn = (payload) => wallet.getUnshieldedKeystore().signData(payload);
      signTransactionIntents(recipe.baseTransaction, signFn, "proof");
      if (recipe.balancingTransaction) {
        signTransactionIntents(recipe.balancingTransaction, signFn, "pre-proof");
      }
      return walletFacade.finalizeRecipe(recipe);
    },
    submitTx(tx) {
      return wallet.submitTx(tx);
    }
  };
};
var MAX_SIGNER_COUNT = 29;
var CrossChainApi = class _CrossChainApi {
  constructor() {
    this.MaxSmgSignators = 29;
    this.MaxMergeCoins = 4;
  }
  async init(providers) {
    this.providers = providers;
  }
  // async init(config: Config, wallet: MidnightWalletSDK) {
  //   const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
  //   const zkConfigProvider = new NodeZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath);
  //   this.providers = {
  //     privateStateProvider: levelPrivateStateProvider<typeof CrossChainPrivateStateId>({
  //       privateStateStoreName: 'CCPSSN',
  //       walletProvider: walletAndMidnightProvider
  //     }),
  //     publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
  //     zkConfigProvider: new NodeZkConfigProvider<CrossChainCircuits>(ZKConfig.zkConfigPath),
  //     proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
  //     walletProvider: walletAndMidnightProvider,
  //     midnightProvider: walletAndMidnightProvider,
  //   };
  // }
  // async setWallet(wallet: MidnightWalletSDK) {
  //   const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
  //   this.providers = {
  //     ...this.providers,
  //     walletProvider: walletAndMidnightProvider,
  //     midnightProvider: walletAndMidnightProvider,
  //   };
  // }
  async deployContract(adminThreshold, smgPkThreshold, feeReceiver, signingKey) {
    const feeReceiver_0 = { bytes: getUserAddressFromUnshieldAddress(feeReceiver) };
    this.crossChainContract = await midnightJsContracts.deployContract(this.providers, {
      compiledContract: CompiledSimpleContract,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {},
      signingKey,
      args: [BigInt(adminThreshold), BigInt(smgPkThreshold), feeReceiver_0]
    });
    return this.crossChainContract.deployTxData.public.contractAddress;
  }
  async join(contractAddress) {
    this.crossChainContract = await midnightJsContracts.findDeployedContract(this.providers, {
      contractAddress,
      compiledContract: CompiledSimpleContract,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {}
    });
  }
  checkCrossData(uniqueId, smgId, tokenPairId, amount, fee, toAddr, coins, ttl) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    assert3__default.default(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const smgId_0 = Buffer.from(smgId, "hex");
    assert3__default.default(smgId_0.length === 32, `smgId must be 32 bytes long`);
    const tokenPairId_0 = BigInt(tokenPairId);
    const amount_0 = BigInt(amount);
    const fee_0 = BigInt(fee);
    const toAddr_0 = toAddr.includes("mn_shield") ? { bytes: getCoinPublicKeyFromShieldAddress(toAddr) } : { bytes: getUserAddressFromUnshieldAddress(toAddr) };
    const ttl_0 = BigInt(ttl);
    return {
      uniqueId: uniqueId_0,
      smgId: smgId_0,
      tokenPairId: tokenPairId_0,
      amount: amount_0,
      fee: fee_0,
      toAddr: toAddr_0,
      ttl: ttl_0
    };
  }
  async getTokenPairInfo(tokenPairId) {
    const ledger3 = await this.getLedgerState();
    return ledger3?.tokenPairs.lookup(BigInt(tokenPairId));
  }
  async getTokensTotalSupply(tokens) {
    const ledger3 = await this.getLedgerState();
    const tokensTotalSupply = tokens.map((token) => {
      const token_0 = Buffer.from(token, "hex");
      const totalSupply = ledger3?.mappingTokenTotalSupply.member(token_0) ? ledger3?.mappingTokenTotalSupply.lookup(token_0).toString(10) : "0";
      return { token, totalSupply };
    });
    return tokensTotalSupply;
  }
  // static getCurrentInBoundCrossTxs(ledger: CrossChain.Ledger) {
  //   let res = [];
  //   for (const smgEvent of ledger.currentExecuteCrossProposal) {
  //     res.push({
  //       smgId: toHex(smgEvent.crossProposal.smgId)
  //     , uniqueId: toHex(smgEvent.uniqueId)
  //     , token: toHex(smgEvent.crossProposal.token)
  //     , tokenPairId: smgEvent.crossProposal.tokenPairId.toString(10)
  //     , isMappingToken: smgEvent.crossProposal.isMappingToken
  //     , amount: smgEvent.crossProposal.amount.toString(10)
  //     , fee: smgEvent.crossProposal.fee.toString(10)
  //     , toAddr: toHex(smgEvent.crossProposal.toAddr.bytes)
  //     , ttl: smgEvent.crossProposal.ttl.toString(10)
  //     });
  //   }
  //   return res;
  // }
  static getCrossTxInfo(ledger3, uniqueId) {
    const uniquId_0 = Buffer.from(uniqueId, "hex");
    if (ledger3.crossProposal.member(uniquId_0)) {
      const crossTxInfo = ledger3.crossProposal.lookup(uniquId_0);
      return {
        smgId: midnightJsUtils.toHex(crossTxInfo.smgId),
        token: midnightJsUtils.toHex(crossTxInfo.token),
        tokenPairId: crossTxInfo.tokenPairId.toString(10),
        amount: crossTxInfo.amount.toString(10),
        fee: crossTxInfo.fee.toString(10),
        toAddr: crossTxInfo.toAddr,
        ttl: crossTxInfo.ttl.toString(10)
      };
    }
  }
  static parseContractState(stateHex) {
    const state = __compactRuntime.ContractState.deserialize(Buffer.from(stateHex, "hex"));
    return ledger(state.data);
  }
  static currentExecuteCrossProposal(ledger3) {
    let res = [];
    for (const smgEvent of ledger3.currentExecuteCrossProposal) {
      res.push({
        smgId: midnightJsUtils.toHex(smgEvent.crossProposal.smgId),
        uniqueId: midnightJsUtils.toHex(smgEvent.uniqueId),
        token: midnightJsUtils.toHex(smgEvent.crossProposal.token),
        tokenPairId: smgEvent.crossProposal.tokenPairId.toString(10),
        isMappingToken: smgEvent.crossProposal.isMappingToken,
        amount: smgEvent.crossProposal.amount.toString(10),
        fee: smgEvent.crossProposal.fee.toString(10),
        toAddr: midnightJsUtils.toHex(smgEvent.crossProposal.toAddr.bytes),
        ttl: smgEvent.crossProposal.ttl.toString(10)
      });
    }
    return res;
  }
  static latestOutBoundCrosstxInfo(ledger3) {
    if (ledger3.latestOutBoundCrosstxInfo.tokenPairId === 0n) {
      return;
    } else {
      return {
        smgId: midnightJsUtils.toHex(ledger3.latestOutBoundCrosstxInfo.smgId),
        fromAddr: midnightJsUtils.toHex(ledger3.latestOutBoundCrosstxInfo.fromAddr.bytes),
        toAddr: ledger3.latestOutBoundCrosstxInfo.toAddr,
        tokenPairId: ledger3.latestOutBoundCrosstxInfo.tokenPairId.toString(10),
        tokenAccount: ledger3.latestOutBoundCrosstxInfo.tokenAccount,
        amount: ledger3.latestOutBoundCrosstxInfo.amount.toString(10),
        fee: ledger3.latestOutBoundCrosstxInfo.fee.toString(10)
        // nonce: ledger.latestOutBoundCrosstxInfo.nonce.toString(10),
      };
    }
  }
  async isVoter(ledger3, voter) {
    let voterPK;
    if (voter) {
      voterPK = getCoinPublicKeyFromShieldAddress(voter);
    } else {
      voterPK = midnightJsUtils.fromHex(this.providers.walletProvider.getCoinPublicKey());
    }
    return ledger3.smgTxSigners.member({ bytes: voterPK });
  }
  async getUnVotedCrossProposal(ledger3, voter) {
    let voterPK;
    if (voter) {
      voterPK = getCoinPublicKeyFromShieldAddress(voter);
    } else {
      voterPK = midnightJsUtils.fromHex(this.providers.walletProvider.getCoinPublicKey());
    }
    if (!this.isVoter(ledger3, voter)) return [];
    const voterIndex = ledger3.smgTxSigners.lookup({ bytes: voterPK });
    let res = [];
    for (const [uniquId, _] of ledger3.crossProposal) {
      const voters = ledger3.crossProposalVoters.lookup(uniquId);
      if (voters.size() >= ledger3.smgPKThreshold) continue;
      if (voters.member(voterIndex)) continue;
      else {
        const crossTxInfo = _CrossChainApi.getCrossTxInfo(ledger3, midnightJsUtils.toHex(uniquId));
        res.push({ uniquId: midnightJsUtils.toHex(uniquId), ...crossTxInfo });
      }
    }
    return res;
  }
  async getUnExecuteCrossProposal(ledger3) {
    let res = [];
    for (const [uniquId, crossProposal] of ledger3.crossProposal) {
      const voters = ledger3.crossProposalVoters.lookup(uniquId);
      if (voters.size() >= ledger3.smgPKThreshold) {
        res.push({
          uniqueId: midnightJsUtils.toHex(uniquId),
          smgId: midnightJsUtils.toHex(crossProposal.smgId),
          tokenPairId: crossProposal.tokenPairId.toString(10),
          token: midnightJsUtils.toHex(crossProposal.token),
          amount: crossProposal.amount.toString(10),
          fee: crossProposal.fee.toString(10),
          toAddr: midnightJsUtils.toHex(crossProposal.toAddr.bytes),
          ttl: crossProposal.ttl.toString(10)
        });
      }
    }
    return res;
  }
  /////////////////////////////////////////////////  Cross Tx  /////////////////////////////////////////////////////////////
  async userLock(smgId, toAddress, tokenPair, amount) {
    const smgId_0 = Buffer.from(smgId, "hex");
    assert3__default.default(smgId_0.length === 32, `smgId must be 32 bytes long`);
    const tokenPair_0 = BigInt(tokenPair);
    const amount_0 = BigInt(amount);
    const finalizedTxData = await this.crossChainContract.callTx.userLock(smgId_0, toAddress, tokenPair_0, amount_0);
    return finalizedTxData;
  }
  async smgRelease(uniqueId, smgId, tokenPair, amount, fee, toAddr, ttl) {
    const proof = this.checkCrossData(uniqueId, smgId, tokenPair, amount, fee, toAddr, void 0, ttl);
    const finalizedTxData = await this.crossChainContract.callTx.smgRelease(
      proof.uniqueId,
      proof.smgId,
      proof.tokenPairId,
      proof.amount,
      proof.toAddr,
      proof.fee,
      proof.ttl
    );
    return finalizedTxData;
  }
  async smgMint(uniqueId, smgId, tokenPair, amount, fee, toAddr, ttl) {
    const proof = this.checkCrossData(uniqueId, smgId, tokenPair, amount, fee, toAddr, void 0, ttl);
    const finalizedTxData = await this.crossChainContract.callTx.smgMint(proof.uniqueId, proof.smgId, proof.tokenPairId, proof.amount, proof.fee, proof.toAddr, proof.ttl);
    return finalizedTxData;
  }
  async userBurn(smgId, toAddress, tokenPair, amount) {
    const smgId_0 = Buffer.from(smgId, "hex");
    assert3__default.default(smgId_0.length === 32, `smgId must be 32 bytes long`);
    const tokenPair_0 = BigInt(tokenPair);
    const pairInfo = await this.getTokenPairInfo(tokenPair_0);
    assert3__default.default(pairInfo, `tokenPairId ${tokenPair} not found`);
    const amount_0 = BigInt(amount);
    ledger2.decodeRawTokenType(pairInfo.midnigthTokenAccount);
    const finalizedTxData = await this.crossChainContract.callTx.userBurn(smgId_0, toAddress, tokenPair_0, amount_0);
    return finalizedTxData;
  }
  async voteCrossProposal(uniqueId, ttl) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    const ttl_0 = BigInt(ttl);
    assert3__default.default(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const maxCount = 5;
    let items = [{ uniqueId: uniqueId_0, ttl: ttl_0 }];
    for (let index = 1; index < maxCount; index++) {
      items.push({ uniqueId: Buffer.alloc(32, 0), ttl: 0n });
    }
    const finalizedTxData = await this.crossChainContract.callTx.voteMultiCrossProposal(items);
    return finalizedTxData;
  }
  async voteMultiCrossProposal(uniqueIds) {
    const uniqueIds_0 = uniqueIds.map((item) => {
      const uniqueId_0 = Buffer.from(item.uniqueId, "hex");
      const ttl_0 = BigInt(item.ttl);
      assert3__default.default(uniqueId_0.length === 32, `uniqueId(${uniqueId_0}) must be 32 bytes long`);
      return { uniqueId: uniqueId_0, ttl: ttl_0 };
    });
    const maxCount = 5;
    assert3__default.default(uniqueIds_0.length <= maxCount && uniqueIds_0.length > 0, `uniqueIds length must be between 1 and ${maxCount}`);
    for (let index = uniqueIds_0.length; index < maxCount; index++) {
      uniqueIds_0.push({ uniqueId: Buffer.alloc(32), ttl: BigInt(0) });
    }
    const finalizedTxData = await this.crossChainContract.callTx.voteMultiCrossProposal(uniqueIds_0);
    return finalizedTxData;
  }
  async executeCrossProposal(uniqueId, coinIndex) {
  }
  async executeMultiCrossProposal(uniqueIds) {
    const uniqueIds_0 = uniqueIds.map((item) => {
      const uniqueId_0 = Buffer.from(item, "hex");
      assert3__default.default(uniqueId_0.length === 32, `uniqueId(${uniqueId_0}) must be 32 bytes long`);
      return uniqueId_0;
    });
    const maxCount = 3;
    assert3__default.default(uniqueIds_0.length <= maxCount && uniqueIds_0.length > 0, `uniqueIds must be between 1 and ${maxCount}`);
    for (let index = uniqueIds_0.length; index < maxCount; index++) {
      uniqueIds_0.push(Buffer.alloc(32));
    }
    const finalizedTxData = await this.crossChainContract.callTx.executeMultiCrossProposal(uniqueIds_0);
    return finalizedTxData;
  }
  // async userRechargeForFee(amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "userRechargeForFee">> {
  //   const amount_0 = BigInt(amount);
  //   const finalizedTxData = await this.crossChainContract.callTx.userRechargeForFee(amount_0);
  //   return finalizedTxData;
  // }
  // async approveUserWithdrawFee(user: Address): Promise<FinalizedCallTxData<CrossChainContract, "approveUserWithdrawFee">> {
  //   const key_0 = { bytes: getCoinPublicKeyFromShieldAddress(user) };
  //   const ledgerState = await this.getLedgerState();
  //   assert(ledgerState != null, `ledgerState is null`);
  //   // const amount_0 = BigInt(amount);
  //   // const balance_0 = ledgerState.userFeeBalance.lookup(key_0);
  //   // assert(balance_0 >= amount_0, `user ${user} has not enough fee balance real (${balance_0}) vs withdraw ${amount_0}`);
  //   const finalizedTxData = await this.crossChainContract.callTx.approveUserWithdrawFee(key_0);
  //   return finalizedTxData;
  // }
  async userClaim(uniqueId) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    assert3__default.default(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const finalizedTxData = await this.crossChainContract.callTx.userClaim(uniqueId_0);
    return finalizedTxData;
  }
  // async userFeeWithdrawRequest(receiptor: UserAddress) {
  //   const receiptor_0 = { bytes: encodeUserAddress(receiptor) };
  //   const finalizedTxData = await this.crossChainContract.callTx.userFeeWithdrawRequest(receiptor_0);
  //   return finalizedTxData;
  // }
  // async userClaimCoin(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "userClaimCoin">> {
  //   const uniqueId_0 = Buffer.from(uniqueId, 'hex');
  //   assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
  //   const finalizedTxData = await this.crossChainContract.callTx.userClaimCoin(uniqueId_0);
  //   return finalizedTxData;
  // }
  // async userClaimMappingToken(uniqueId: string): Promise<FinalizedCallTxData<CrossChainContract, "userClaimMappingToken">> {
  //   const uniqueId_0 = Buffer.from(uniqueId, 'hex');
  //   assert(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
  //   const finalizedTxData = await this.crossChainContract.callTx.userClaimMappingToken(uniqueId_0);
  //   return finalizedTxData;
  // }
  // async addReserve(token: ShieldedTokenType, amount: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "addReserve">> {
  //   const amount_0 = BigInt(amount);
  //   const coin_0 = shieldedCoinInfo(token.raw, amount_0);
  //   const finalizedTxData = await this.crossChainContract.callTx.addReserve(coin_0);
  //   return finalizedTxData;
  // }
  // async withdrawReserveOfShieldedToken(token: TokenType, coinIndex: string | number | bigint): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfShieldedToken">> {
  //   assert(token.tag == 'shielded', "not shielded token");
  //   const coinIndex_0 = BigInt(coinIndex);
  //   const token_0 = encodeRawTokenType((token as ShieldedTokenType).raw);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfShieldedToken(token_0, coinIndex_0);
  //   return finalizedTxData;
  // }
  // async withdrawReserveOfShieldedMappingToken(domainSep: string): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfShieldedMappingToken">> {
  //   assert(domainSep.length <= 64, "domainsep length must <= 64");
  //   const token_0 = pad(domainSep, 32);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfShieldedMappingToken(token_0);
  //   return finalizedTxData;
  // }
  // async withdrawReserveOfUnshieldedToken(token: TokenType): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfUnshieldedToken">> {
  //   assert(token.tag == 'unshielded', "not shielded token");
  //   // const coinIndex_0 = BigInt(coinIndex);
  //   const token_0 = encodeRawTokenType((token as UnshieldedTokenType).raw);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfUnshieldedToken(token_0);
  //   return finalizedTxData;
  // }
  // async withdrawReserveOfUnshieldedMappingToken(domainSep: string): Promise<FinalizedCallTxData<CrossChainContract, "withdrawReserveOfUnshieldedMappingToken">> {
  //   assert(domainSep.length <= 64, "domainsep length must <= 64");
  //   const token_0 = pad(domainSep, 32);
  //   const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfUnshieldedMappingToken(token_0);
  //   return finalizedTxData;
  // }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async getLedgerState() {
    midnightJsUtils.assertIsContractAddress(this.crossChainContract?.deployTxData.public.contractAddress);
    const state = await this.providers.publicDataProvider.queryContractState(this.crossChainContract?.deployTxData.public.contractAddress).then((contractState) => contractState != null ? ledger(contractState.data) : null);
    return state;
  }
  ///////////////////////////////////////////////        management      ////////////////////////////////////////////////////////
  // async transferOwner(newOwner: Address): Promise<FinalizedCallTxData<CrossChainContract, "transferOwner">> {
  //   const newOwner_0 = { bytes: getCoinPublicKeyFromShieldAddress(newOwner) };
  //   const finalizedTxData = await this.crossChainContract.callTx.transferOwner(newOwner_0);
  //   return finalizedTxData;
  // }
  // async acceptOwner(): Promise<FinalizedCallTxData<CrossChainContract, "acceptOwner">> {
  //   const finalizedTxData = await this.crossChainContract.callTx.acceptOwner();
  //   return finalizedTxData;
  // }
  // async updateSmgPk(newVoter: Address): Promise<FinalizedCallTxData<CrossChainContract, "updateSmgPk">> {
  //   const newVoter_0 = { bytes: getCoinPublicKeyFromShieldAddress(newVoter) };
  //   const finalizedTxData = await this.crossChainContract.callTx.updateSmgPk(newVoter_0);
  //   return finalizedTxData;
  // }
  // async setFeeShieldedReceiver(feeReceiver: Address): Promise<FinalizedCallTxData<CrossChainContract, "setFeeShieldedReceiver">> {
  //   const feeReceiver_0 = { bytes: getCoinPublicKeyFromShieldAddress(feeReceiver) };
  //   const finalizedTxData = await this.crossChainContract.callTx.setFeeShieldedReceiver(feeReceiver_0);
  //   return finalizedTxData;
  // }
  // async setFeeUnshieldedReceiver(feeReceiver: UserAddress): Promise<FinalizedCallTxData<CrossChainContract, "setFeeUnshieldedReceiver">> {
  //   const feeReceiver_0 = { bytes: getUserAddressFromUnshieldAddress(feeReceiver) };
  //   const finalizedTxData = await this.crossChainContract.callTx.setFeeUnshieldedReceiver(feeReceiver_0);
  //   return finalizedTxData;
  // }
  // async setTokenManager(tokenManager: Address): Promise<FinalizedCallTxData<CrossChainContract, "setTokenManager">> {
  //   const tokenManager_0 = { bytes: getCoinPublicKeyFromShieldAddress(tokenManager) };
  //   const finalizedTxData = await this.crossChainContract.callTx.setTokenManager(tokenManager_0);
  //   return finalizedTxData;
  // }
  // async setMegerWorker(mergeWorker: Address): Promise<FinalizedCallTxData<CrossChainContract, "setMegerWorker">> {
  //   const megerWorker_0 = { bytes: getCoinPublicKeyFromShieldAddress(mergeWorker) };
  //   const finalizedTxData = await this.crossChainContract.callTx.setMegerWorker(megerWorker_0);
  //   return finalizedTxData;
  // }
  // // async mergeTreasuryCoin(coins: bigint[] | number[] | string[]): Promise<FinalizedCallTxData<CrossChainContract, "mergeTreasuryCoin">>{
  // //   if (coins.length != 2) throw 'can only merge 2 coins';
  // //   const coins_0 = coins.map(coin => BigInt(coin));
  // //   const finalizedTxData = await this.crossChainContract.callTx.mergeTreasuryCoin(coins_0);
  // //   return finalizedTxData;
  // // }
  // async addAdmin(admin: Address): Promise<FinalizedCallTxData<CrossChainContract, "addAdmin">> {
  //   const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
  //   const finalizedTxData = await this.crossChainContract.callTx.addAdmin(admin_0);
  //   return finalizedTxData;
  // }
  // async removeAdmin(admin: Address): Promise<FinalizedCallTxData<CrossChainContract, "removeAdmin">> {
  //   const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
  //   const finalizedTxData = await this.crossChainContract.callTx.removeAdmin(admin_0);
  //   return finalizedTxData;
  // }
  // async setAdminThreshold(threshold: number | string | bigint): Promise<FinalizedCallTxData<CrossChainContract, "setAdminThreshold">> {
  //   const threshold_0 = BigInt(threshold);
  //   if (threshold_0 < 1n) throw 'threshold must be greater than 0';
  //   const finalizedTxData = await this.crossChainContract.callTx.setAdminThreshold(threshold_0);
  //   return finalizedTxData;
  // }
  async setSmgPksks(voters) {
    assert3__default.default(voters.length > 0, "voters must not be empty");
    const voters_0 = voters.map((voter) => {
      return { bytes: getCoinPublicKeyFromShieldAddress(voter) };
    });
    for (let index = voters_0.length; index < MAX_SIGNER_COUNT; index++) {
      voters_0.push({ bytes: Buffer.alloc(32) });
    }
    const finalizedTxData = await this.crossChainContract.callTx.setSmgPksks(voters_0);
    return finalizedTxData;
  }
  async setSmgPKThreold(threshold) {
    const threshold_0 = BigInt(threshold);
    const finalizedTxData = await this.crossChainContract.callTx.setSmgPKThreold(threshold_0);
    return finalizedTxData;
  }
  async setFeeCommonConfig(chainId, fee) {
    const chainId_0 = BigInt(chainId);
    const fee_0 = BigInt(fee);
    const finalizedTxData = await this.crossChainContract.callTx.setFeeCommonConfig(chainId_0, fee_0);
    return finalizedTxData;
  }
  async addTokenPair(tokenPairId, fromChainId, toChainId, midnigthTokenAccount, domainSep, fee) {
    const tokenPairId_0 = BigInt(tokenPairId);
    const fromChainId_0 = BigInt(fromChainId);
    const toChainId_0 = BigInt(toChainId);
    const midnigtAccount_0 = Buffer.from(midnigthTokenAccount, "hex");
    const domainSep_0 = pad(domainSep, 32);
    if (domainSep) {
      const expectedTokenType = __compactRuntime.rawTokenType(domainSep_0, this.crossChainContract.deployTxData.public.contractAddress);
      assert3__default.default(expectedTokenType == midnigthTokenAccount, `token type not match ,${expectedTokenType} expected but got ${midnigthTokenAccount}`);
    }
    const fee_0 = BigInt(fee);
    const tokenPair = {
      fromChainId: fromChainId_0,
      toChainId: toChainId_0,
      midnigthTokenAccount: midnigtAccount_0,
      domainSep: domainSep_0,
      fee: fee_0
    };
    const finalizedTxData = await this.crossChainContract.callTx.addTokenPair(tokenPairId_0, tokenPair);
    return finalizedTxData;
  }
  async removeTokenPair(tokenPairId) {
    const tokenPairId_0 = BigInt(tokenPairId);
    const finalizedTxData = await this.crossChainContract.callTx.removeTokenPair(tokenPairId_0);
    return finalizedTxData;
  }
  // async newProposal(proposal: CrossChain.Proposal): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">> {
  //   const finalizedTxData = await this.crossChainContract.callTx.newProposal(proposal);
  //   return finalizedTxData;
  // }
  // async addAdminProposal(addr: Address): Promise<FinalizedCallTxData<CrossChainContract, "newProposal">> {
  //   // const addr_0 = { bytes: fromHexWithOrNoPrefix(parseCoinPublicKeyToHex(addr, getZswapNetworkId())) };
  //   const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.AddAdmin;
  //   proposal.addr = addr_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // async removeAdminProposal(addr: Address) {
  //   const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.RemoveAdmin;
  //   proposal.addr = addr_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // async updateFeeUnshieldedReceiverProposal(addr: Address) {
  //   const addr_0 = { bytes: getUserAddressFromUnshieldAddress(addr) };
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.UpdateFeeUnshieldedReceiver;
  //   proposal.addr = addr_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // async updateTokenManagerProposal(addr: Address) {
  //   const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.UpdateTokenManager;
  //   proposal.addr = addr_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // async updateAdminThresholdProposal(threshold: number | string | bigint) {
  //   const threshold_0 = BigInt(threshold);
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.UpdateAdminThreshold;
  //   proposal.threshold = threshold_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  defaultProsal() {
    return {
      pType: ProposalType.UpdateAdminThreshold,
      addr: { bytes: fromHexWithOrNoPrefix("") },
      addrUnshielded: { bytes: fromHexWithOrNoPrefix("") },
      threshold: BigInt(0),
      feeConfig: { fee: BigInt(0), chainId: BigInt(0) },
      smgPubkeys: new Array(this.MaxSmgSignators).fill({ x: 0n, y: 0n })
    };
  }
  // async updateSMGPKThresholdProposal(threshold: number | string | bigint) {
  //   const threshold_0 = BigInt(threshold);
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.UpdateSMGPKThreshold;
  //   proposal.threshold = threshold_0;
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // async updateFeeCommonConfigProposal(chainId: number | string | bigint, fee: number | string | bigint) {
  //   const chainId_0 = BigInt(chainId);
  //   const fee_0 = BigInt(fee);
  //   let proposal = this.defaultProsal();
  //   proposal.pType = CrossChain.ProposalType.UpdateFeeCommonConfig;
  //   proposal.feeConfig = { fee: fee_0, chainId: chainId_0 };
  //   return await this.crossChainContract.callTx.newProposal(proposal);
  // }
  // //////////////////////////////////////////////////////////////////////////////////////////
  // async voteProposal(proposalId: number | string | bigint) {
  //   const proposalId_0 = BigInt(proposalId);
  //   const finalizedTxData = await this.crossChainContract.callTx.voteProposal(proposalId_0);
  //   return finalizedTxData;
  // }
  // async executeProposal(proposalId: number | string | bigint) {
  //   const proposalId_0 = BigInt(proposalId);
  //   const finalizedTxData = await this.crossChainContract.callTx.executeProposal(proposalId_0);
  //   return finalizedTxData;
  // }
  // async removeExpiredHisTxs(txs: string[]) {
  //   assert(txs.length <= 20, 'txs length should be less than 20');
  //   const txs_0 = txs.map((tx) => Buffer.from(tx, 'hex'));
  //   for (let index = txs_0.length; index < 20; index++) {
  //     txs_0.push(Buffer.alloc(32));
  //   }
  //   const finalizedTxData = await this.crossChainContract.callTx.removeExpiredHisTxs(txs_0);
  //   return finalizedTxData;
  // }
  async updateContractAuthority(newKey) {
  }
  async upgradeContract(circuitId, newCircuitHex) {
    if (newCircuitHex) {
      midnightJsTypes.createVerifierKey(midnightJsUtils.fromHex(newCircuitHex));
    } else {
      await this.providers.zkConfigProvider.getVerifierKey(circuitId);
    }
  }
  // async addCircuite(circuitId: CrossChainCircuits, newCircuitHex: string){
  //   const newVK = createVerifierKey(fromHex(newCircuitHex));
  //   return await this.crossChainContract.circuitMaintenanceTx.foo.insertVerifierKey(newVK);
  // }
};
var upgradeContractCircuit = async (providers, contractAddress, circuitId, newVkHex) => {
  midnightJsUtils.assertIsContractAddress(contractAddress);
  let newVk;
  if (newVkHex) {
    newVk = midnightJsTypes.createVerifierKey(midnightJsUtils.fromHex(newVkHex));
  } else {
    newVk = await providers.zkConfigProvider.getVerifierKey(circuitId);
  }
  return await midnightJsContracts.submitInsertVerifierKeyTx(providers, CompiledSimpleContract, contractAddress, circuitId, newVk);
};
var removeContractCircuit = async (providers, contractAddress, circuitId) => {
  midnightJsUtils.assertIsContractAddress(contractAddress);
};
var genSigningKey = () => {
  return __compactRuntime.sampleSigningKey();
};
var getCoinPublicKeyFromShieldAddress = (shieldAddr) => {
  const tmp1 = walletSdkAddressFormat.MidnightBech32m.parse(shieldAddr);
  const tmp2 = walletSdkAddressFormat.ShieldedAddress.codec.decode(tmp1.network, tmp1);
  return tmp2.coinPublicKey.data;
};
var getUserAddressFromUnshieldAddress = (unshieldAddr) => {
  const tmp1 = walletSdkAddressFormat.MidnightBech32m.parse(unshieldAddr);
  const tmp2 = walletSdkAddressFormat.UnshieldedAddress.codec.decode(tmp1.network, tmp1);
  return tmp2.data;
};
var initNetwork = (network) => {
  midnightJsNetworkId.setNetworkId(network);
};
var CrossChainState = class {
  constructor(indexer, indexerWS, contractAddress) {
    this.MaxSmgSignators = 29;
    this.MaxMergeCoins = 4;
    midnightJsUtils.assertIsContractAddress(contractAddress);
    this.publicDataProvider = midnightJsIndexerPublicDataProvider.indexerPublicDataProvider(indexer, indexerWS);
    this.contractAddress = contractAddress;
  }
  async getLedgerState() {
    const state = await this.publicDataProvider.queryContractState(this.contractAddress).then((contractState) => contractState != null ? ledger(contractState.data) : null);
    return state;
  }
};

exports.CompiledSimpleContract = CompiledSimpleContract;
exports.CrossChainApi = CrossChainApi;
exports.CrossChainPrivateStateId = CrossChainPrivateStateId;
exports.CrossChainState = CrossChainState;
exports.ZKConfig = ZKConfig;
exports.createInitialPrivateState = createInitialPrivateState;
exports.createPrivateState = createPrivateState;
exports.createWalletAndMidnightProvider = createWalletAndMidnightProvider;
exports.crosschainContractInstance = crosschainContractInstance;
exports.genSigningKey = genSigningKey;
exports.getCoinPublicKeyFromShieldAddress = getCoinPublicKeyFromShieldAddress;
exports.getUserAddressFromUnshieldAddress = getUserAddressFromUnshieldAddress;
exports.initNetwork = initNetwork;
exports.pad = pad;
exports.removeContractCircuit = removeContractCircuit;
exports.upgradeContractCircuit = upgradeContractCircuit;
exports.witnesses = witnesses;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map