import * as ledger from '@midnight-ntwrk/ledger-v6';
import { decodeRawTokenType, encodeRawTokenType, createShieldedCoinInfo } from '@midnight-ntwrk/ledger-v6';
import { DustWallet } from '@midnight-ntwrk/wallet-sdk-dust-wallet';
import { WalletFacade } from '@midnight-ntwrk/wallet-sdk-facade';
import { HDWallet, Roles } from '@midnight-ntwrk/wallet-sdk-hd';
import { ShieldedWallet } from '@midnight-ntwrk/wallet-sdk-shielded';
import { createKeystore, UnshieldedWallet, NoOpTransactionHistoryStorage, PublicKey } from '@midnight-ntwrk/wallet-sdk-unshielded-wallet';
import { Buffer as Buffer$1 } from 'buffer';
import { UnshieldedAddress, ShieldedAddress, MidnightBech32m } from '@midnight-ntwrk/wallet-sdk-address-format';
import assert3 from 'assert';
import path from 'path';
import * as __compactRuntime from '@midnight-ntwrk/compact-runtime';
import { ContractState, encodeUserAddress, rawTokenType, sampleSigningKey, encodeShieldedCoinInfo } from '@midnight-ntwrk/compact-runtime';
import { deployContract, findDeployedContract, submitInsertVerifierKeyTx, submitRemoveVerifierKeyTx } from '@midnight-ntwrk/midnight-js-contracts';
import { levelPrivateStateProvider } from '@midnight-ntwrk/midnight-js-level-private-state-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { NodeZkConfigProvider } from '@midnight-ntwrk/midnight-js-node-zk-config-provider';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import { toHex, fromHex, assertIsContractAddress } from '@midnight-ntwrk/midnight-js-utils';
import { createVerifierKey } from '@midnight-ntwrk/midnight-js-types';

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  __defProp(target, "default", { value: mod, enumerable: true }) ,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);

// node_modules/rxjs/dist/cjs/internal/util/isFunction.js
var require_isFunction = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isFunction.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isFunction = void 0;
    function isFunction(value) {
      return typeof value === "function";
    }
    exports$1.isFunction = isFunction;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/createErrorClass.js
var require_createErrorClass = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/createErrorClass.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.createErrorClass = void 0;
    function createErrorClass(createImpl) {
      var _super = function(instance) {
        Error.call(instance);
        instance.stack = new Error().stack;
      };
      var ctorFunc = createImpl(_super);
      ctorFunc.prototype = Object.create(Error.prototype);
      ctorFunc.prototype.constructor = ctorFunc;
      return ctorFunc;
    }
    exports$1.createErrorClass = createErrorClass;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/UnsubscriptionError.js
var require_UnsubscriptionError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/UnsubscriptionError.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.UnsubscriptionError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports$1.UnsubscriptionError = createErrorClass_1.createErrorClass(function(_super) {
      return function UnsubscriptionErrorImpl(errors) {
        _super(this);
        this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
          return i + 1 + ") " + err.toString();
        }).join("\n  ") : "";
        this.name = "UnsubscriptionError";
        this.errors = errors;
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/util/arrRemove.js
var require_arrRemove = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/arrRemove.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.arrRemove = void 0;
    function arrRemove(arr, item) {
      if (arr) {
        var index = arr.indexOf(item);
        0 <= index && arr.splice(index, 1);
      }
    }
    exports$1.arrRemove = arrRemove;
  }
});

// node_modules/rxjs/dist/cjs/internal/Subscription.js
var require_Subscription = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Subscription.js"(exports$1) {
    var __values = exports$1 && exports$1.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isSubscription = exports$1.EMPTY_SUBSCRIPTION = exports$1.Subscription = void 0;
    var isFunction_1 = require_isFunction();
    var UnsubscriptionError_1 = require_UnsubscriptionError();
    var arrRemove_1 = require_arrRemove();
    var Subscription = (function() {
      function Subscription2(initialTeardown) {
        this.initialTeardown = initialTeardown;
        this.closed = false;
        this._parentage = null;
        this._finalizers = null;
      }
      Subscription2.prototype.unsubscribe = function() {
        var e_1, _a, e_2, _b;
        var errors;
        if (!this.closed) {
          this.closed = true;
          var _parentage = this._parentage;
          if (_parentage) {
            this._parentage = null;
            if (Array.isArray(_parentage)) {
              try {
                for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                  var parent_1 = _parentage_1_1.value;
                  parent_1.remove(this);
                }
              } catch (e_1_1) {
                e_1 = { error: e_1_1 };
              } finally {
                try {
                  if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
                } finally {
                  if (e_1) throw e_1.error;
                }
              }
            } else {
              _parentage.remove(this);
            }
          }
          var initialFinalizer = this.initialTeardown;
          if (isFunction_1.isFunction(initialFinalizer)) {
            try {
              initialFinalizer();
            } catch (e) {
              errors = e instanceof UnsubscriptionError_1.UnsubscriptionError ? e.errors : [e];
            }
          }
          var _finalizers = this._finalizers;
          if (_finalizers) {
            this._finalizers = null;
            try {
              for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
                var finalizer = _finalizers_1_1.value;
                try {
                  execFinalizer(finalizer);
                } catch (err) {
                  errors = errors !== null && errors !== void 0 ? errors : [];
                  if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                    errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                  } else {
                    errors.push(err);
                  }
                }
              }
            } catch (e_2_1) {
              e_2 = { error: e_2_1 };
            } finally {
              try {
                if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
              } finally {
                if (e_2) throw e_2.error;
              }
            }
          }
          if (errors) {
            throw new UnsubscriptionError_1.UnsubscriptionError(errors);
          }
        }
      };
      Subscription2.prototype.add = function(teardown) {
        var _a;
        if (teardown && teardown !== this) {
          if (this.closed) {
            execFinalizer(teardown);
          } else {
            if (teardown instanceof Subscription2) {
              if (teardown.closed || teardown._hasParent(this)) {
                return;
              }
              teardown._addParent(this);
            }
            (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
          }
        }
      };
      Subscription2.prototype._hasParent = function(parent) {
        var _parentage = this._parentage;
        return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
      };
      Subscription2.prototype._addParent = function(parent) {
        var _parentage = this._parentage;
        this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
      };
      Subscription2.prototype._removeParent = function(parent) {
        var _parentage = this._parentage;
        if (_parentage === parent) {
          this._parentage = null;
        } else if (Array.isArray(_parentage)) {
          arrRemove_1.arrRemove(_parentage, parent);
        }
      };
      Subscription2.prototype.remove = function(teardown) {
        var _finalizers = this._finalizers;
        _finalizers && arrRemove_1.arrRemove(_finalizers, teardown);
        if (teardown instanceof Subscription2) {
          teardown._removeParent(this);
        }
      };
      Subscription2.EMPTY = (function() {
        var empty = new Subscription2();
        empty.closed = true;
        return empty;
      })();
      return Subscription2;
    })();
    exports$1.Subscription = Subscription;
    exports$1.EMPTY_SUBSCRIPTION = Subscription.EMPTY;
    function isSubscription(value) {
      return value instanceof Subscription || value && "closed" in value && isFunction_1.isFunction(value.remove) && isFunction_1.isFunction(value.add) && isFunction_1.isFunction(value.unsubscribe);
    }
    exports$1.isSubscription = isSubscription;
    function execFinalizer(finalizer) {
      if (isFunction_1.isFunction(finalizer)) {
        finalizer();
      } else {
        finalizer.unsubscribe();
      }
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/config.js
var require_config = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/config.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.config = void 0;
    exports$1.config = {
      onUnhandledError: null,
      onStoppedNotification: null,
      Promise: void 0,
      useDeprecatedSynchronousErrorHandling: false,
      useDeprecatedNextContext: false
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/timeoutProvider.js
var require_timeoutProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/timeoutProvider.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.timeoutProvider = void 0;
    exports$1.timeoutProvider = {
      setTimeout: function(handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          args[_i - 2] = arguments[_i];
        }
        var delegate = exports$1.timeoutProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) {
          return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
        }
        return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
      },
      clearTimeout: function(handle) {
        var delegate = exports$1.timeoutProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/util/reportUnhandledError.js
var require_reportUnhandledError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/reportUnhandledError.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.reportUnhandledError = void 0;
    var config_1 = require_config();
    var timeoutProvider_1 = require_timeoutProvider();
    function reportUnhandledError(err) {
      timeoutProvider_1.timeoutProvider.setTimeout(function() {
        var onUnhandledError = config_1.config.onUnhandledError;
        if (onUnhandledError) {
          onUnhandledError(err);
        } else {
          throw err;
        }
      });
    }
    exports$1.reportUnhandledError = reportUnhandledError;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/noop.js
var require_noop = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/noop.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.noop = void 0;
    function noop() {
    }
    exports$1.noop = noop;
  }
});

// node_modules/rxjs/dist/cjs/internal/NotificationFactories.js
var require_NotificationFactories = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/NotificationFactories.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.createNotification = exports$1.nextNotification = exports$1.errorNotification = exports$1.COMPLETE_NOTIFICATION = void 0;
    exports$1.COMPLETE_NOTIFICATION = (function() {
      return createNotification("C", void 0, void 0);
    })();
    function errorNotification(error) {
      return createNotification("E", void 0, error);
    }
    exports$1.errorNotification = errorNotification;
    function nextNotification(value) {
      return createNotification("N", value, void 0);
    }
    exports$1.nextNotification = nextNotification;
    function createNotification(kind, value, error) {
      return {
        kind,
        value,
        error
      };
    }
    exports$1.createNotification = createNotification;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/errorContext.js
var require_errorContext = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/errorContext.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.captureError = exports$1.errorContext = void 0;
    var config_1 = require_config();
    var context = null;
    function errorContext(cb) {
      if (config_1.config.useDeprecatedSynchronousErrorHandling) {
        var isRoot = !context;
        if (isRoot) {
          context = { errorThrown: false, error: null };
        }
        cb();
        if (isRoot) {
          var _a = context, errorThrown = _a.errorThrown, error = _a.error;
          context = null;
          if (errorThrown) {
            throw error;
          }
        }
      } else {
        cb();
      }
    }
    exports$1.errorContext = errorContext;
    function captureError(err) {
      if (config_1.config.useDeprecatedSynchronousErrorHandling && context) {
        context.errorThrown = true;
        context.error = err;
      }
    }
    exports$1.captureError = captureError;
  }
});

// node_modules/rxjs/dist/cjs/internal/Subscriber.js
var require_Subscriber = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Subscriber.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.EMPTY_OBSERVER = exports$1.SafeSubscriber = exports$1.Subscriber = void 0;
    var isFunction_1 = require_isFunction();
    var Subscription_1 = require_Subscription();
    var config_1 = require_config();
    var reportUnhandledError_1 = require_reportUnhandledError();
    var noop_1 = require_noop();
    var NotificationFactories_1 = require_NotificationFactories();
    var timeoutProvider_1 = require_timeoutProvider();
    var errorContext_1 = require_errorContext();
    var Subscriber = (function(_super) {
      __extends(Subscriber2, _super);
      function Subscriber2(destination) {
        var _this = _super.call(this) || this;
        _this.isStopped = false;
        if (destination) {
          _this.destination = destination;
          if (Subscription_1.isSubscription(destination)) {
            destination.add(_this);
          }
        } else {
          _this.destination = exports$1.EMPTY_OBSERVER;
        }
        return _this;
      }
      Subscriber2.create = function(next, error, complete) {
        return new SafeSubscriber(next, error, complete);
      };
      Subscriber2.prototype.next = function(value) {
        if (this.isStopped) {
          handleStoppedNotification(NotificationFactories_1.nextNotification(value), this);
        } else {
          this._next(value);
        }
      };
      Subscriber2.prototype.error = function(err) {
        if (this.isStopped) {
          handleStoppedNotification(NotificationFactories_1.errorNotification(err), this);
        } else {
          this.isStopped = true;
          this._error(err);
        }
      };
      Subscriber2.prototype.complete = function() {
        if (this.isStopped) {
          handleStoppedNotification(NotificationFactories_1.COMPLETE_NOTIFICATION, this);
        } else {
          this.isStopped = true;
          this._complete();
        }
      };
      Subscriber2.prototype.unsubscribe = function() {
        if (!this.closed) {
          this.isStopped = true;
          _super.prototype.unsubscribe.call(this);
          this.destination = null;
        }
      };
      Subscriber2.prototype._next = function(value) {
        this.destination.next(value);
      };
      Subscriber2.prototype._error = function(err) {
        try {
          this.destination.error(err);
        } finally {
          this.unsubscribe();
        }
      };
      Subscriber2.prototype._complete = function() {
        try {
          this.destination.complete();
        } finally {
          this.unsubscribe();
        }
      };
      return Subscriber2;
    })(Subscription_1.Subscription);
    exports$1.Subscriber = Subscriber;
    var _bind = Function.prototype.bind;
    function bind(fn, thisArg) {
      return _bind.call(fn, thisArg);
    }
    var ConsumerObserver = (function() {
      function ConsumerObserver2(partialObserver) {
        this.partialObserver = partialObserver;
      }
      ConsumerObserver2.prototype.next = function(value) {
        var partialObserver = this.partialObserver;
        if (partialObserver.next) {
          try {
            partialObserver.next(value);
          } catch (error) {
            handleUnhandledError(error);
          }
        }
      };
      ConsumerObserver2.prototype.error = function(err) {
        var partialObserver = this.partialObserver;
        if (partialObserver.error) {
          try {
            partialObserver.error(err);
          } catch (error) {
            handleUnhandledError(error);
          }
        } else {
          handleUnhandledError(err);
        }
      };
      ConsumerObserver2.prototype.complete = function() {
        var partialObserver = this.partialObserver;
        if (partialObserver.complete) {
          try {
            partialObserver.complete();
          } catch (error) {
            handleUnhandledError(error);
          }
        }
      };
      return ConsumerObserver2;
    })();
    var SafeSubscriber = (function(_super) {
      __extends(SafeSubscriber2, _super);
      function SafeSubscriber2(observerOrNext, error, complete) {
        var _this = _super.call(this) || this;
        var partialObserver;
        if (isFunction_1.isFunction(observerOrNext) || !observerOrNext) {
          partialObserver = {
            next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
            error: error !== null && error !== void 0 ? error : void 0,
            complete: complete !== null && complete !== void 0 ? complete : void 0
          };
        } else {
          var context_1;
          if (_this && config_1.config.useDeprecatedNextContext) {
            context_1 = Object.create(observerOrNext);
            context_1.unsubscribe = function() {
              return _this.unsubscribe();
            };
            partialObserver = {
              next: observerOrNext.next && bind(observerOrNext.next, context_1),
              error: observerOrNext.error && bind(observerOrNext.error, context_1),
              complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
            };
          } else {
            partialObserver = observerOrNext;
          }
        }
        _this.destination = new ConsumerObserver(partialObserver);
        return _this;
      }
      return SafeSubscriber2;
    })(Subscriber);
    exports$1.SafeSubscriber = SafeSubscriber;
    function handleUnhandledError(error) {
      if (config_1.config.useDeprecatedSynchronousErrorHandling) {
        errorContext_1.captureError(error);
      } else {
        reportUnhandledError_1.reportUnhandledError(error);
      }
    }
    function defaultErrorHandler(err) {
      throw err;
    }
    function handleStoppedNotification(notification, subscriber) {
      var onStoppedNotification = config_1.config.onStoppedNotification;
      onStoppedNotification && timeoutProvider_1.timeoutProvider.setTimeout(function() {
        return onStoppedNotification(notification, subscriber);
      });
    }
    exports$1.EMPTY_OBSERVER = {
      closed: true,
      next: noop_1.noop,
      error: defaultErrorHandler,
      complete: noop_1.noop
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/symbol/observable.js
var require_observable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/symbol/observable.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.observable = void 0;
    exports$1.observable = (function() {
      return typeof Symbol === "function" && Symbol.observable || "@@observable";
    })();
  }
});

// node_modules/rxjs/dist/cjs/internal/util/identity.js
var require_identity = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/identity.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.identity = void 0;
    function identity(x) {
      return x;
    }
    exports$1.identity = identity;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/pipe.js
var require_pipe = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/pipe.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.pipeFromArray = exports$1.pipe = void 0;
    var identity_1 = require_identity();
    function pipe() {
      var fns = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
      }
      return pipeFromArray(fns);
    }
    exports$1.pipe = pipe;
    function pipeFromArray(fns) {
      if (fns.length === 0) {
        return identity_1.identity;
      }
      if (fns.length === 1) {
        return fns[0];
      }
      return function piped(input) {
        return fns.reduce(function(prev, fn) {
          return fn(prev);
        }, input);
      };
    }
    exports$1.pipeFromArray = pipeFromArray;
  }
});

// node_modules/rxjs/dist/cjs/internal/Observable.js
var require_Observable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Observable.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.Observable = void 0;
    var Subscriber_1 = require_Subscriber();
    var Subscription_1 = require_Subscription();
    var observable_1 = require_observable();
    var pipe_1 = require_pipe();
    var config_1 = require_config();
    var isFunction_1 = require_isFunction();
    var errorContext_1 = require_errorContext();
    var Observable = (function() {
      function Observable2(subscribe) {
        if (subscribe) {
          this._subscribe = subscribe;
        }
      }
      Observable2.prototype.lift = function(operator) {
        var observable = new Observable2();
        observable.source = this;
        observable.operator = operator;
        return observable;
      };
      Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
        var _this = this;
        var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new Subscriber_1.SafeSubscriber(observerOrNext, error, complete);
        errorContext_1.errorContext(function() {
          var _a = _this, operator = _a.operator, source = _a.source;
          subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
        });
        return subscriber;
      };
      Observable2.prototype._trySubscribe = function(sink) {
        try {
          return this._subscribe(sink);
        } catch (err) {
          sink.error(err);
        }
      };
      Observable2.prototype.forEach = function(next, promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function(resolve, reject) {
          var subscriber = new Subscriber_1.SafeSubscriber({
            next: function(value) {
              try {
                next(value);
              } catch (err) {
                reject(err);
                subscriber.unsubscribe();
              }
            },
            error: reject,
            complete: resolve
          });
          _this.subscribe(subscriber);
        });
      };
      Observable2.prototype._subscribe = function(subscriber) {
        var _a;
        return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
      };
      Observable2.prototype[observable_1.observable] = function() {
        return this;
      };
      Observable2.prototype.pipe = function() {
        var operations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          operations[_i] = arguments[_i];
        }
        return pipe_1.pipeFromArray(operations)(this);
      };
      Observable2.prototype.toPromise = function(promiseCtor) {
        var _this = this;
        promiseCtor = getPromiseCtor(promiseCtor);
        return new promiseCtor(function(resolve, reject) {
          var value;
          _this.subscribe(function(x) {
            return value = x;
          }, function(err) {
            return reject(err);
          }, function() {
            return resolve(value);
          });
        });
      };
      Observable2.create = function(subscribe) {
        return new Observable2(subscribe);
      };
      return Observable2;
    })();
    exports$1.Observable = Observable;
    function getPromiseCtor(promiseCtor) {
      var _a;
      return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config_1.config.Promise) !== null && _a !== void 0 ? _a : Promise;
    }
    function isObserver(value) {
      return value && isFunction_1.isFunction(value.next) && isFunction_1.isFunction(value.error) && isFunction_1.isFunction(value.complete);
    }
    function isSubscriber(value) {
      return value && value instanceof Subscriber_1.Subscriber || isObserver(value) && Subscription_1.isSubscription(value);
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/util/lift.js
var require_lift = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/lift.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.operate = exports$1.hasLift = void 0;
    var isFunction_1 = require_isFunction();
    function hasLift(source) {
      return isFunction_1.isFunction(source === null || source === void 0 ? void 0 : source.lift);
    }
    exports$1.hasLift = hasLift;
    function operate(init) {
      return function(source) {
        if (hasLift(source)) {
          return source.lift(function(liftedSource) {
            try {
              return init(liftedSource, this);
            } catch (err) {
              this.error(err);
            }
          });
        }
        throw new TypeError("Unable to lift unknown Observable type");
      };
    }
    exports$1.operate = operate;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/OperatorSubscriber.js
var require_OperatorSubscriber = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/OperatorSubscriber.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.OperatorSubscriber = exports$1.createOperatorSubscriber = void 0;
    var Subscriber_1 = require_Subscriber();
    function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
      return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
    }
    exports$1.createOperatorSubscriber = createOperatorSubscriber;
    var OperatorSubscriber = (function(_super) {
      __extends(OperatorSubscriber2, _super);
      function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
        var _this = _super.call(this, destination) || this;
        _this.onFinalize = onFinalize;
        _this.shouldUnsubscribe = shouldUnsubscribe;
        _this._next = onNext ? function(value) {
          try {
            onNext(value);
          } catch (err) {
            destination.error(err);
          }
        } : _super.prototype._next;
        _this._error = onError ? function(err) {
          try {
            onError(err);
          } catch (err2) {
            destination.error(err2);
          } finally {
            this.unsubscribe();
          }
        } : _super.prototype._error;
        _this._complete = onComplete ? function() {
          try {
            onComplete();
          } catch (err) {
            destination.error(err);
          } finally {
            this.unsubscribe();
          }
        } : _super.prototype._complete;
        return _this;
      }
      OperatorSubscriber2.prototype.unsubscribe = function() {
        var _a;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
          var closed_1 = this.closed;
          _super.prototype.unsubscribe.call(this);
          !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
        }
      };
      return OperatorSubscriber2;
    })(Subscriber_1.Subscriber);
    exports$1.OperatorSubscriber = OperatorSubscriber;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/refCount.js
var require_refCount = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/refCount.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.refCount = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function refCount() {
      return lift_1.operate(function(source, subscriber) {
        var connection = null;
        source._refCount++;
        var refCounter = OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, void 0, function() {
          if (!source || source._refCount <= 0 || 0 < --source._refCount) {
            connection = null;
            return;
          }
          var sharedConnection = source._connection;
          var conn = connection;
          connection = null;
          if (sharedConnection && (!conn || sharedConnection === conn)) {
            sharedConnection.unsubscribe();
          }
          subscriber.unsubscribe();
        });
        source.subscribe(refCounter);
        if (!refCounter.closed) {
          connection = source.connect();
        }
      });
    }
    exports$1.refCount = refCount;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/ConnectableObservable.js
var require_ConnectableObservable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/ConnectableObservable.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.ConnectableObservable = void 0;
    var Observable_1 = require_Observable();
    var Subscription_1 = require_Subscription();
    var refCount_1 = require_refCount();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var lift_1 = require_lift();
    var ConnectableObservable = (function(_super) {
      __extends(ConnectableObservable2, _super);
      function ConnectableObservable2(source, subjectFactory) {
        var _this = _super.call(this) || this;
        _this.source = source;
        _this.subjectFactory = subjectFactory;
        _this._subject = null;
        _this._refCount = 0;
        _this._connection = null;
        if (lift_1.hasLift(source)) {
          _this.lift = source.lift;
        }
        return _this;
      }
      ConnectableObservable2.prototype._subscribe = function(subscriber) {
        return this.getSubject().subscribe(subscriber);
      };
      ConnectableObservable2.prototype.getSubject = function() {
        var subject = this._subject;
        if (!subject || subject.isStopped) {
          this._subject = this.subjectFactory();
        }
        return this._subject;
      };
      ConnectableObservable2.prototype._teardown = function() {
        this._refCount = 0;
        var _connection = this._connection;
        this._subject = this._connection = null;
        _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
      };
      ConnectableObservable2.prototype.connect = function() {
        var _this = this;
        var connection = this._connection;
        if (!connection) {
          connection = this._connection = new Subscription_1.Subscription();
          var subject_1 = this.getSubject();
          connection.add(this.source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subject_1, void 0, function() {
            _this._teardown();
            subject_1.complete();
          }, function(err) {
            _this._teardown();
            subject_1.error(err);
          }, function() {
            return _this._teardown();
          })));
          if (connection.closed) {
            this._connection = null;
            connection = Subscription_1.Subscription.EMPTY;
          }
        }
        return connection;
      };
      ConnectableObservable2.prototype.refCount = function() {
        return refCount_1.refCount()(this);
      };
      return ConnectableObservable2;
    })(Observable_1.Observable);
    exports$1.ConnectableObservable = ConnectableObservable;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/performanceTimestampProvider.js
var require_performanceTimestampProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/performanceTimestampProvider.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.performanceTimestampProvider = void 0;
    exports$1.performanceTimestampProvider = {
      now: function() {
        return (exports$1.performanceTimestampProvider.delegate || performance).now();
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/animationFrameProvider.js
var require_animationFrameProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/animationFrameProvider.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.animationFrameProvider = void 0;
    var Subscription_1 = require_Subscription();
    exports$1.animationFrameProvider = {
      schedule: function(callback) {
        var request = requestAnimationFrame;
        var cancel = cancelAnimationFrame;
        var delegate = exports$1.animationFrameProvider.delegate;
        if (delegate) {
          request = delegate.requestAnimationFrame;
          cancel = delegate.cancelAnimationFrame;
        }
        var handle = request(function(timestamp) {
          cancel = void 0;
          callback(timestamp);
        });
        return new Subscription_1.Subscription(function() {
          return cancel === null || cancel === void 0 ? void 0 : cancel(handle);
        });
      },
      requestAnimationFrame: function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var delegate = exports$1.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
      },
      cancelAnimationFrame: function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var delegate = exports$1.animationFrameProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, __spreadArray([], __read(args)));
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/dom/animationFrames.js
var require_animationFrames = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/dom/animationFrames.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.animationFrames = void 0;
    var Observable_1 = require_Observable();
    var performanceTimestampProvider_1 = require_performanceTimestampProvider();
    var animationFrameProvider_1 = require_animationFrameProvider();
    function animationFrames(timestampProvider) {
      return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
    }
    exports$1.animationFrames = animationFrames;
    function animationFramesFactory(timestampProvider) {
      return new Observable_1.Observable(function(subscriber) {
        var provider = timestampProvider || performanceTimestampProvider_1.performanceTimestampProvider;
        var start = provider.now();
        var id = 0;
        var run = function() {
          if (!subscriber.closed) {
            id = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function(timestamp) {
              id = 0;
              var now = provider.now();
              subscriber.next({
                timestamp: timestampProvider ? now : timestamp,
                elapsed: now - start
              });
              run();
            });
          }
        };
        run();
        return function() {
          if (id) {
            animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
          }
        };
      });
    }
    var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();
  }
});

// node_modules/rxjs/dist/cjs/internal/util/ObjectUnsubscribedError.js
var require_ObjectUnsubscribedError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/ObjectUnsubscribedError.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.ObjectUnsubscribedError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports$1.ObjectUnsubscribedError = createErrorClass_1.createErrorClass(function(_super) {
      return function ObjectUnsubscribedErrorImpl() {
        _super(this);
        this.name = "ObjectUnsubscribedError";
        this.message = "object unsubscribed";
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/Subject.js
var require_Subject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Subject.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    var __values = exports$1 && exports$1.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.AnonymousSubject = exports$1.Subject = void 0;
    var Observable_1 = require_Observable();
    var Subscription_1 = require_Subscription();
    var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
    var arrRemove_1 = require_arrRemove();
    var errorContext_1 = require_errorContext();
    var Subject = (function(_super) {
      __extends(Subject2, _super);
      function Subject2() {
        var _this = _super.call(this) || this;
        _this.closed = false;
        _this.currentObservers = null;
        _this.observers = [];
        _this.isStopped = false;
        _this.hasError = false;
        _this.thrownError = null;
        return _this;
      }
      Subject2.prototype.lift = function(operator) {
        var subject = new AnonymousSubject(this, this);
        subject.operator = operator;
        return subject;
      };
      Subject2.prototype._throwIfClosed = function() {
        if (this.closed) {
          throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
        }
      };
      Subject2.prototype.next = function(value) {
        var _this = this;
        errorContext_1.errorContext(function() {
          var e_1, _a;
          _this._throwIfClosed();
          if (!_this.isStopped) {
            if (!_this.currentObservers) {
              _this.currentObservers = Array.from(_this.observers);
            }
            try {
              for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) {
                var observer = _c.value;
                observer.next(value);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
              } finally {
                if (e_1) throw e_1.error;
              }
            }
          }
        });
      };
      Subject2.prototype.error = function(err) {
        var _this = this;
        errorContext_1.errorContext(function() {
          _this._throwIfClosed();
          if (!_this.isStopped) {
            _this.hasError = _this.isStopped = true;
            _this.thrownError = err;
            var observers = _this.observers;
            while (observers.length) {
              observers.shift().error(err);
            }
          }
        });
      };
      Subject2.prototype.complete = function() {
        var _this = this;
        errorContext_1.errorContext(function() {
          _this._throwIfClosed();
          if (!_this.isStopped) {
            _this.isStopped = true;
            var observers = _this.observers;
            while (observers.length) {
              observers.shift().complete();
            }
          }
        });
      };
      Subject2.prototype.unsubscribe = function() {
        this.isStopped = this.closed = true;
        this.observers = this.currentObservers = null;
      };
      Object.defineProperty(Subject2.prototype, "observed", {
        get: function() {
          var _a;
          return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
        },
        enumerable: false,
        configurable: true
      });
      Subject2.prototype._trySubscribe = function(subscriber) {
        this._throwIfClosed();
        return _super.prototype._trySubscribe.call(this, subscriber);
      };
      Subject2.prototype._subscribe = function(subscriber) {
        this._throwIfClosed();
        this._checkFinalizedStatuses(subscriber);
        return this._innerSubscribe(subscriber);
      };
      Subject2.prototype._innerSubscribe = function(subscriber) {
        var _this = this;
        var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
        if (hasError || isStopped) {
          return Subscription_1.EMPTY_SUBSCRIPTION;
        }
        this.currentObservers = null;
        observers.push(subscriber);
        return new Subscription_1.Subscription(function() {
          _this.currentObservers = null;
          arrRemove_1.arrRemove(observers, subscriber);
        });
      };
      Subject2.prototype._checkFinalizedStatuses = function(subscriber) {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
        if (hasError) {
          subscriber.error(thrownError);
        } else if (isStopped) {
          subscriber.complete();
        }
      };
      Subject2.prototype.asObservable = function() {
        var observable = new Observable_1.Observable();
        observable.source = this;
        return observable;
      };
      Subject2.create = function(destination, source) {
        return new AnonymousSubject(destination, source);
      };
      return Subject2;
    })(Observable_1.Observable);
    exports$1.Subject = Subject;
    var AnonymousSubject = (function(_super) {
      __extends(AnonymousSubject2, _super);
      function AnonymousSubject2(destination, source) {
        var _this = _super.call(this) || this;
        _this.destination = destination;
        _this.source = source;
        return _this;
      }
      AnonymousSubject2.prototype.next = function(value) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
      };
      AnonymousSubject2.prototype.error = function(err) {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
      };
      AnonymousSubject2.prototype.complete = function() {
        var _a, _b;
        (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
      };
      AnonymousSubject2.prototype._subscribe = function(subscriber) {
        var _a, _b;
        return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : Subscription_1.EMPTY_SUBSCRIPTION;
      };
      return AnonymousSubject2;
    })(Subject);
    exports$1.AnonymousSubject = AnonymousSubject;
  }
});

// node_modules/rxjs/dist/cjs/internal/BehaviorSubject.js
var require_BehaviorSubject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/BehaviorSubject.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.BehaviorSubject = void 0;
    var Subject_1 = require_Subject();
    var BehaviorSubject = (function(_super) {
      __extends(BehaviorSubject2, _super);
      function BehaviorSubject2(_value) {
        var _this = _super.call(this) || this;
        _this._value = _value;
        return _this;
      }
      Object.defineProperty(BehaviorSubject2.prototype, "value", {
        get: function() {
          return this.getValue();
        },
        enumerable: false,
        configurable: true
      });
      BehaviorSubject2.prototype._subscribe = function(subscriber) {
        var subscription = _super.prototype._subscribe.call(this, subscriber);
        !subscription.closed && subscriber.next(this._value);
        return subscription;
      };
      BehaviorSubject2.prototype.getValue = function() {
        var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
        if (hasError) {
          throw thrownError;
        }
        this._throwIfClosed();
        return _value;
      };
      BehaviorSubject2.prototype.next = function(value) {
        _super.prototype.next.call(this, this._value = value);
      };
      return BehaviorSubject2;
    })(Subject_1.Subject);
    exports$1.BehaviorSubject = BehaviorSubject;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/dateTimestampProvider.js
var require_dateTimestampProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/dateTimestampProvider.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.dateTimestampProvider = void 0;
    exports$1.dateTimestampProvider = {
      now: function() {
        return (exports$1.dateTimestampProvider.delegate || Date).now();
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/ReplaySubject.js
var require_ReplaySubject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/ReplaySubject.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.ReplaySubject = void 0;
    var Subject_1 = require_Subject();
    var dateTimestampProvider_1 = require_dateTimestampProvider();
    var ReplaySubject = (function(_super) {
      __extends(ReplaySubject2, _super);
      function ReplaySubject2(_bufferSize, _windowTime, _timestampProvider) {
        if (_bufferSize === void 0) {
          _bufferSize = Infinity;
        }
        if (_windowTime === void 0) {
          _windowTime = Infinity;
        }
        if (_timestampProvider === void 0) {
          _timestampProvider = dateTimestampProvider_1.dateTimestampProvider;
        }
        var _this = _super.call(this) || this;
        _this._bufferSize = _bufferSize;
        _this._windowTime = _windowTime;
        _this._timestampProvider = _timestampProvider;
        _this._buffer = [];
        _this._infiniteTimeWindow = true;
        _this._infiniteTimeWindow = _windowTime === Infinity;
        _this._bufferSize = Math.max(1, _bufferSize);
        _this._windowTime = Math.max(1, _windowTime);
        return _this;
      }
      ReplaySubject2.prototype.next = function(value) {
        var _a = this, isStopped = _a.isStopped, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow, _timestampProvider = _a._timestampProvider, _windowTime = _a._windowTime;
        if (!isStopped) {
          _buffer.push(value);
          !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
        }
        this._trimBuffer();
        _super.prototype.next.call(this, value);
      };
      ReplaySubject2.prototype._subscribe = function(subscriber) {
        this._throwIfClosed();
        this._trimBuffer();
        var subscription = this._innerSubscribe(subscriber);
        var _a = this, _infiniteTimeWindow = _a._infiniteTimeWindow, _buffer = _a._buffer;
        var copy = _buffer.slice();
        for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
          subscriber.next(copy[i]);
        }
        this._checkFinalizedStatuses(subscriber);
        return subscription;
      };
      ReplaySubject2.prototype._trimBuffer = function() {
        var _a = this, _bufferSize = _a._bufferSize, _timestampProvider = _a._timestampProvider, _buffer = _a._buffer, _infiniteTimeWindow = _a._infiniteTimeWindow;
        var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
        _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);
        if (!_infiniteTimeWindow) {
          var now = _timestampProvider.now();
          var last = 0;
          for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
            last = i;
          }
          last && _buffer.splice(0, last + 1);
        }
      };
      return ReplaySubject2;
    })(Subject_1.Subject);
    exports$1.ReplaySubject = ReplaySubject;
  }
});

// node_modules/rxjs/dist/cjs/internal/AsyncSubject.js
var require_AsyncSubject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/AsyncSubject.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.AsyncSubject = void 0;
    var Subject_1 = require_Subject();
    var AsyncSubject = (function(_super) {
      __extends(AsyncSubject2, _super);
      function AsyncSubject2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._value = null;
        _this._hasValue = false;
        _this._isComplete = false;
        return _this;
      }
      AsyncSubject2.prototype._checkFinalizedStatuses = function(subscriber) {
        var _a = this, hasError = _a.hasError, _hasValue = _a._hasValue, _value = _a._value, thrownError = _a.thrownError, isStopped = _a.isStopped, _isComplete = _a._isComplete;
        if (hasError) {
          subscriber.error(thrownError);
        } else if (isStopped || _isComplete) {
          _hasValue && subscriber.next(_value);
          subscriber.complete();
        }
      };
      AsyncSubject2.prototype.next = function(value) {
        if (!this.isStopped) {
          this._value = value;
          this._hasValue = true;
        }
      };
      AsyncSubject2.prototype.complete = function() {
        var _a = this, _hasValue = _a._hasValue, _value = _a._value, _isComplete = _a._isComplete;
        if (!_isComplete) {
          this._isComplete = true;
          _hasValue && _super.prototype.next.call(this, _value);
          _super.prototype.complete.call(this);
        }
      };
      return AsyncSubject2;
    })(Subject_1.Subject);
    exports$1.AsyncSubject = AsyncSubject;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/Action.js
var require_Action = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/Action.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.Action = void 0;
    var Subscription_1 = require_Subscription();
    var Action = (function(_super) {
      __extends(Action2, _super);
      function Action2(scheduler, work) {
        return _super.call(this) || this;
      }
      Action2.prototype.schedule = function(state, delay) {
        return this;
      };
      return Action2;
    })(Subscription_1.Subscription);
    exports$1.Action = Action;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/intervalProvider.js
var require_intervalProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/intervalProvider.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.intervalProvider = void 0;
    exports$1.intervalProvider = {
      setInterval: function(handler, timeout) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          args[_i - 2] = arguments[_i];
        }
        var delegate = exports$1.intervalProvider.delegate;
        if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) {
          return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
        }
        return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
      },
      clearInterval: function(handle) {
        var delegate = exports$1.intervalProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AsyncAction.js
var require_AsyncAction = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AsyncAction.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.AsyncAction = void 0;
    var Action_1 = require_Action();
    var intervalProvider_1 = require_intervalProvider();
    var arrRemove_1 = require_arrRemove();
    var AsyncAction = (function(_super) {
      __extends(AsyncAction2, _super);
      function AsyncAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.pending = false;
        return _this;
      }
      AsyncAction2.prototype.schedule = function(state, delay) {
        var _a;
        if (delay === void 0) {
          delay = 0;
        }
        if (this.closed) {
          return this;
        }
        this.state = state;
        var id = this.id;
        var scheduler = this.scheduler;
        if (id != null) {
          this.id = this.recycleAsyncId(scheduler, id, delay);
        }
        this.pending = true;
        this.delay = delay;
        this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
        return this;
      };
      AsyncAction2.prototype.requestAsyncId = function(scheduler, _id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        return intervalProvider_1.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
      };
      AsyncAction2.prototype.recycleAsyncId = function(_scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay != null && this.delay === delay && this.pending === false) {
          return id;
        }
        if (id != null) {
          intervalProvider_1.intervalProvider.clearInterval(id);
        }
        return void 0;
      };
      AsyncAction2.prototype.execute = function(state, delay) {
        if (this.closed) {
          return new Error("executing a cancelled action");
        }
        this.pending = false;
        var error = this._execute(state, delay);
        if (error) {
          return error;
        } else if (this.pending === false && this.id != null) {
          this.id = this.recycleAsyncId(this.scheduler, this.id, null);
        }
      };
      AsyncAction2.prototype._execute = function(state, _delay) {
        var errored = false;
        var errorValue;
        try {
          this.work(state);
        } catch (e) {
          errored = true;
          errorValue = e ? e : new Error("Scheduled action threw falsy error");
        }
        if (errored) {
          this.unsubscribe();
          return errorValue;
        }
      };
      AsyncAction2.prototype.unsubscribe = function() {
        if (!this.closed) {
          var _a = this, id = _a.id, scheduler = _a.scheduler;
          var actions = scheduler.actions;
          this.work = this.state = this.scheduler = null;
          this.pending = false;
          arrRemove_1.arrRemove(actions, this);
          if (id != null) {
            this.id = this.recycleAsyncId(scheduler, id, null);
          }
          this.delay = null;
          _super.prototype.unsubscribe.call(this);
        }
      };
      return AsyncAction2;
    })(Action_1.Action);
    exports$1.AsyncAction = AsyncAction;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/Immediate.js
var require_Immediate = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/Immediate.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.TestTools = exports$1.Immediate = void 0;
    var nextHandle = 1;
    var resolved;
    var activeHandles = {};
    function findAndClearHandle(handle) {
      if (handle in activeHandles) {
        delete activeHandles[handle];
        return true;
      }
      return false;
    }
    exports$1.Immediate = {
      setImmediate: function(cb) {
        var handle = nextHandle++;
        activeHandles[handle] = true;
        if (!resolved) {
          resolved = Promise.resolve();
        }
        resolved.then(function() {
          return findAndClearHandle(handle) && cb();
        });
        return handle;
      },
      clearImmediate: function(handle) {
        findAndClearHandle(handle);
      }
    };
    exports$1.TestTools = {
      pending: function() {
        return Object.keys(activeHandles).length;
      }
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/immediateProvider.js
var require_immediateProvider = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/immediateProvider.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.immediateProvider = void 0;
    var Immediate_1 = require_Immediate();
    var setImmediate = Immediate_1.Immediate.setImmediate;
    var clearImmediate = Immediate_1.Immediate.clearImmediate;
    exports$1.immediateProvider = {
      setImmediate: function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var delegate = exports$1.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, __spreadArray([], __read(args)));
      },
      clearImmediate: function(handle) {
        var delegate = exports$1.immediateProvider.delegate;
        return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
      },
      delegate: void 0
    };
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AsapAction.js
var require_AsapAction = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AsapAction.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.AsapAction = void 0;
    var AsyncAction_1 = require_AsyncAction();
    var immediateProvider_1 = require_immediateProvider();
    var AsapAction = (function(_super) {
      __extends(AsapAction2, _super);
      function AsapAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }
      AsapAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = immediateProvider_1.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, void 0)));
      };
      AsapAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
        var _a;
        if (delay === void 0) {
          delay = 0;
        }
        if (delay != null ? delay > 0 : this.delay > 0) {
          return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        var actions = scheduler.actions;
        if (id != null && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
          immediateProvider_1.immediateProvider.clearImmediate(id);
          if (scheduler._scheduled === id) {
            scheduler._scheduled = void 0;
          }
        }
        return void 0;
      };
      return AsapAction2;
    })(AsyncAction_1.AsyncAction);
    exports$1.AsapAction = AsapAction;
  }
});

// node_modules/rxjs/dist/cjs/internal/Scheduler.js
var require_Scheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Scheduler.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.Scheduler = void 0;
    var dateTimestampProvider_1 = require_dateTimestampProvider();
    var Scheduler = (function() {
      function Scheduler2(schedulerActionCtor, now) {
        if (now === void 0) {
          now = Scheduler2.now;
        }
        this.schedulerActionCtor = schedulerActionCtor;
        this.now = now;
      }
      Scheduler2.prototype.schedule = function(work, delay, state) {
        if (delay === void 0) {
          delay = 0;
        }
        return new this.schedulerActionCtor(this, work).schedule(state, delay);
      };
      Scheduler2.now = dateTimestampProvider_1.dateTimestampProvider.now;
      return Scheduler2;
    })();
    exports$1.Scheduler = Scheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AsyncScheduler.js
var require_AsyncScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AsyncScheduler.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.AsyncScheduler = void 0;
    var Scheduler_1 = require_Scheduler();
    var AsyncScheduler = (function(_super) {
      __extends(AsyncScheduler2, _super);
      function AsyncScheduler2(SchedulerAction, now) {
        if (now === void 0) {
          now = Scheduler_1.Scheduler.now;
        }
        var _this = _super.call(this, SchedulerAction, now) || this;
        _this.actions = [];
        _this._active = false;
        return _this;
      }
      AsyncScheduler2.prototype.flush = function(action) {
        var actions = this.actions;
        if (this._active) {
          actions.push(action);
          return;
        }
        var error;
        this._active = true;
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while (action = actions.shift());
        this._active = false;
        if (error) {
          while (action = actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AsyncScheduler2;
    })(Scheduler_1.Scheduler);
    exports$1.AsyncScheduler = AsyncScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AsapScheduler.js
var require_AsapScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AsapScheduler.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.AsapScheduler = void 0;
    var AsyncScheduler_1 = require_AsyncScheduler();
    var AsapScheduler = (function(_super) {
      __extends(AsapScheduler2, _super);
      function AsapScheduler2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      AsapScheduler2.prototype.flush = function(action) {
        this._active = true;
        var flushId = this._scheduled;
        this._scheduled = void 0;
        var actions = this.actions;
        var error;
        action = action || actions.shift();
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while ((action = actions[0]) && action.id === flushId && actions.shift());
        this._active = false;
        if (error) {
          while ((action = actions[0]) && action.id === flushId && actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AsapScheduler2;
    })(AsyncScheduler_1.AsyncScheduler);
    exports$1.AsapScheduler = AsapScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/asap.js
var require_asap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/asap.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.asap = exports$1.asapScheduler = void 0;
    var AsapAction_1 = require_AsapAction();
    var AsapScheduler_1 = require_AsapScheduler();
    exports$1.asapScheduler = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);
    exports$1.asap = exports$1.asapScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/async.js
var require_async = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/async.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.async = exports$1.asyncScheduler = void 0;
    var AsyncAction_1 = require_AsyncAction();
    var AsyncScheduler_1 = require_AsyncScheduler();
    exports$1.asyncScheduler = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);
    exports$1.async = exports$1.asyncScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/QueueAction.js
var require_QueueAction = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/QueueAction.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.QueueAction = void 0;
    var AsyncAction_1 = require_AsyncAction();
    var QueueAction = (function(_super) {
      __extends(QueueAction2, _super);
      function QueueAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }
      QueueAction2.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay > 0) {
          return _super.prototype.schedule.call(this, state, delay);
        }
        this.delay = delay;
        this.state = state;
        this.scheduler.flush(this);
        return this;
      };
      QueueAction2.prototype.execute = function(state, delay) {
        return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
      };
      QueueAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay != null && delay > 0 || delay == null && this.delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.flush(this);
        return 0;
      };
      return QueueAction2;
    })(AsyncAction_1.AsyncAction);
    exports$1.QueueAction = QueueAction;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/QueueScheduler.js
var require_QueueScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/QueueScheduler.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.QueueScheduler = void 0;
    var AsyncScheduler_1 = require_AsyncScheduler();
    var QueueScheduler = (function(_super) {
      __extends(QueueScheduler2, _super);
      function QueueScheduler2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      return QueueScheduler2;
    })(AsyncScheduler_1.AsyncScheduler);
    exports$1.QueueScheduler = QueueScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/queue.js
var require_queue = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/queue.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.queue = exports$1.queueScheduler = void 0;
    var QueueAction_1 = require_QueueAction();
    var QueueScheduler_1 = require_QueueScheduler();
    exports$1.queueScheduler = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);
    exports$1.queue = exports$1.queueScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameAction.js
var require_AnimationFrameAction = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameAction.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.AnimationFrameAction = void 0;
    var AsyncAction_1 = require_AsyncAction();
    var animationFrameProvider_1 = require_animationFrameProvider();
    var AnimationFrameAction = (function(_super) {
      __extends(AnimationFrameAction2, _super);
      function AnimationFrameAction2(scheduler, work) {
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        return _this;
      }
      AnimationFrameAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (delay !== null && delay > 0) {
          return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
        }
        scheduler.actions.push(this);
        return scheduler._scheduled || (scheduler._scheduled = animationFrameProvider_1.animationFrameProvider.requestAnimationFrame(function() {
          return scheduler.flush(void 0);
        }));
      };
      AnimationFrameAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
        var _a;
        if (delay === void 0) {
          delay = 0;
        }
        if (delay != null ? delay > 0 : this.delay > 0) {
          return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
        }
        var actions = scheduler.actions;
        if (id != null && id === scheduler._scheduled && ((_a = actions[actions.length - 1]) === null || _a === void 0 ? void 0 : _a.id) !== id) {
          animationFrameProvider_1.animationFrameProvider.cancelAnimationFrame(id);
          scheduler._scheduled = void 0;
        }
        return void 0;
      };
      return AnimationFrameAction2;
    })(AsyncAction_1.AsyncAction);
    exports$1.AnimationFrameAction = AnimationFrameAction;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameScheduler.js
var require_AnimationFrameScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/AnimationFrameScheduler.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.AnimationFrameScheduler = void 0;
    var AsyncScheduler_1 = require_AsyncScheduler();
    var AnimationFrameScheduler = (function(_super) {
      __extends(AnimationFrameScheduler2, _super);
      function AnimationFrameScheduler2() {
        return _super !== null && _super.apply(this, arguments) || this;
      }
      AnimationFrameScheduler2.prototype.flush = function(action) {
        this._active = true;
        var flushId;
        if (action) {
          flushId = action.id;
        } else {
          flushId = this._scheduled;
          this._scheduled = void 0;
        }
        var actions = this.actions;
        var error;
        action = action || actions.shift();
        do {
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        } while ((action = actions[0]) && action.id === flushId && actions.shift());
        this._active = false;
        if (error) {
          while ((action = actions[0]) && action.id === flushId && actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      return AnimationFrameScheduler2;
    })(AsyncScheduler_1.AsyncScheduler);
    exports$1.AnimationFrameScheduler = AnimationFrameScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/animationFrame.js
var require_animationFrame = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/animationFrame.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.animationFrame = exports$1.animationFrameScheduler = void 0;
    var AnimationFrameAction_1 = require_AnimationFrameAction();
    var AnimationFrameScheduler_1 = require_AnimationFrameScheduler();
    exports$1.animationFrameScheduler = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);
    exports$1.animationFrame = exports$1.animationFrameScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduler/VirtualTimeScheduler.js
var require_VirtualTimeScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduler/VirtualTimeScheduler.js"(exports$1) {
    var __extends = exports$1 && exports$1.__extends || /* @__PURE__ */ (function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    })();
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.VirtualAction = exports$1.VirtualTimeScheduler = void 0;
    var AsyncAction_1 = require_AsyncAction();
    var Subscription_1 = require_Subscription();
    var AsyncScheduler_1 = require_AsyncScheduler();
    var VirtualTimeScheduler = (function(_super) {
      __extends(VirtualTimeScheduler2, _super);
      function VirtualTimeScheduler2(schedulerActionCtor, maxFrames) {
        if (schedulerActionCtor === void 0) {
          schedulerActionCtor = VirtualAction;
        }
        if (maxFrames === void 0) {
          maxFrames = Infinity;
        }
        var _this = _super.call(this, schedulerActionCtor, function() {
          return _this.frame;
        }) || this;
        _this.maxFrames = maxFrames;
        _this.frame = 0;
        _this.index = -1;
        return _this;
      }
      VirtualTimeScheduler2.prototype.flush = function() {
        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
        var error;
        var action;
        while ((action = actions[0]) && action.delay <= maxFrames) {
          actions.shift();
          this.frame = action.delay;
          if (error = action.execute(action.state, action.delay)) {
            break;
          }
        }
        if (error) {
          while (action = actions.shift()) {
            action.unsubscribe();
          }
          throw error;
        }
      };
      VirtualTimeScheduler2.frameTimeFactor = 10;
      return VirtualTimeScheduler2;
    })(AsyncScheduler_1.AsyncScheduler);
    exports$1.VirtualTimeScheduler = VirtualTimeScheduler;
    var VirtualAction = (function(_super) {
      __extends(VirtualAction2, _super);
      function VirtualAction2(scheduler, work, index) {
        if (index === void 0) {
          index = scheduler.index += 1;
        }
        var _this = _super.call(this, scheduler, work) || this;
        _this.scheduler = scheduler;
        _this.work = work;
        _this.index = index;
        _this.active = true;
        _this.index = scheduler.index = index;
        return _this;
      }
      VirtualAction2.prototype.schedule = function(state, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        if (Number.isFinite(delay)) {
          if (!this.id) {
            return _super.prototype.schedule.call(this, state, delay);
          }
          this.active = false;
          var action = new VirtualAction2(this.scheduler, this.work);
          this.add(action);
          return action.schedule(state, delay);
        } else {
          return Subscription_1.Subscription.EMPTY;
        }
      };
      VirtualAction2.prototype.requestAsyncId = function(scheduler, id, delay) {
        if (delay === void 0) {
          delay = 0;
        }
        this.delay = scheduler.frame + delay;
        var actions = scheduler.actions;
        actions.push(this);
        actions.sort(VirtualAction2.sortActions);
        return 1;
      };
      VirtualAction2.prototype.recycleAsyncId = function(scheduler, id, delay) {
        return void 0;
      };
      VirtualAction2.prototype._execute = function(state, delay) {
        if (this.active === true) {
          return _super.prototype._execute.call(this, state, delay);
        }
      };
      VirtualAction2.sortActions = function(a, b) {
        if (a.delay === b.delay) {
          if (a.index === b.index) {
            return 0;
          } else if (a.index > b.index) {
            return 1;
          } else {
            return -1;
          }
        } else if (a.delay > b.delay) {
          return 1;
        } else {
          return -1;
        }
      };
      return VirtualAction2;
    })(AsyncAction_1.AsyncAction);
    exports$1.VirtualAction = VirtualAction;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/empty.js
var require_empty = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/empty.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.empty = exports$1.EMPTY = void 0;
    var Observable_1 = require_Observable();
    exports$1.EMPTY = new Observable_1.Observable(function(subscriber) {
      return subscriber.complete();
    });
    function empty(scheduler) {
      return scheduler ? emptyScheduled(scheduler) : exports$1.EMPTY;
    }
    exports$1.empty = empty;
    function emptyScheduled(scheduler) {
      return new Observable_1.Observable(function(subscriber) {
        return scheduler.schedule(function() {
          return subscriber.complete();
        });
      });
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isScheduler.js
var require_isScheduler = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isScheduler.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isScheduler = void 0;
    var isFunction_1 = require_isFunction();
    function isScheduler(value) {
      return value && isFunction_1.isFunction(value.schedule);
    }
    exports$1.isScheduler = isScheduler;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/args.js
var require_args = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/args.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.popNumber = exports$1.popScheduler = exports$1.popResultSelector = void 0;
    var isFunction_1 = require_isFunction();
    var isScheduler_1 = require_isScheduler();
    function last(arr) {
      return arr[arr.length - 1];
    }
    function popResultSelector(args) {
      return isFunction_1.isFunction(last(args)) ? args.pop() : void 0;
    }
    exports$1.popResultSelector = popResultSelector;
    function popScheduler(args) {
      return isScheduler_1.isScheduler(last(args)) ? args.pop() : void 0;
    }
    exports$1.popScheduler = popScheduler;
    function popNumber(args, defaultValue) {
      return typeof last(args) === "number" ? args.pop() : defaultValue;
    }
    exports$1.popNumber = popNumber;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isArrayLike.js
var require_isArrayLike = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isArrayLike.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isArrayLike = void 0;
    exports$1.isArrayLike = (function(x) {
      return x && typeof x.length === "number" && typeof x !== "function";
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isPromise.js
var require_isPromise = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isPromise.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isPromise = void 0;
    var isFunction_1 = require_isFunction();
    function isPromise(value) {
      return isFunction_1.isFunction(value === null || value === void 0 ? void 0 : value.then);
    }
    exports$1.isPromise = isPromise;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isInteropObservable.js
var require_isInteropObservable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isInteropObservable.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isInteropObservable = void 0;
    var observable_1 = require_observable();
    var isFunction_1 = require_isFunction();
    function isInteropObservable(input) {
      return isFunction_1.isFunction(input[observable_1.observable]);
    }
    exports$1.isInteropObservable = isInteropObservable;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isAsyncIterable.js
var require_isAsyncIterable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isAsyncIterable.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isAsyncIterable = void 0;
    var isFunction_1 = require_isFunction();
    function isAsyncIterable(obj) {
      return Symbol.asyncIterator && isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
    }
    exports$1.isAsyncIterable = isAsyncIterable;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/throwUnobservableError.js
var require_throwUnobservableError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/throwUnobservableError.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.createInvalidObservableTypeError = void 0;
    function createInvalidObservableTypeError(input) {
      return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
    }
    exports$1.createInvalidObservableTypeError = createInvalidObservableTypeError;
  }
});

// node_modules/rxjs/dist/cjs/internal/symbol/iterator.js
var require_iterator = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/symbol/iterator.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.iterator = exports$1.getSymbolIterator = void 0;
    function getSymbolIterator() {
      if (typeof Symbol !== "function" || !Symbol.iterator) {
        return "@@iterator";
      }
      return Symbol.iterator;
    }
    exports$1.getSymbolIterator = getSymbolIterator;
    exports$1.iterator = getSymbolIterator();
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isIterable.js
var require_isIterable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isIterable.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isIterable = void 0;
    var iterator_1 = require_iterator();
    var isFunction_1 = require_isFunction();
    function isIterable(input) {
      return isFunction_1.isFunction(input === null || input === void 0 ? void 0 : input[iterator_1.iterator]);
    }
    exports$1.isIterable = isIterable;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isReadableStreamLike.js
var require_isReadableStreamLike = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isReadableStreamLike.js"(exports$1) {
    var __generator = exports$1 && exports$1.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __await = exports$1 && exports$1.__await || function(v) {
      return this instanceof __await ? (this.v = v, this) : new __await(v);
    };
    var __asyncGenerator = exports$1 && exports$1.__asyncGenerator || function(thisArg, _arguments, generator) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var g = generator.apply(thisArg, _arguments || []), i, q = [];
      return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i;
      function verb(n) {
        if (g[n]) i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
      }
      function resume(n, v) {
        try {
          step(g[n](v));
        } catch (e) {
          settle(q[0][3], e);
        }
      }
      function step(r) {
        r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
      }
      function fulfill(value) {
        resume("next", value);
      }
      function reject(value) {
        resume("throw", value);
      }
      function settle(f, v) {
        if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
      }
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isReadableStreamLike = exports$1.readableStreamLikeToAsyncGenerator = void 0;
    var isFunction_1 = require_isFunction();
    function readableStreamLikeToAsyncGenerator(readableStream) {
      return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
        var reader, _a, value, done;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              reader = readableStream.getReader();
              _b.label = 1;
            case 1:
              _b.trys.push([1, , 9, 10]);
              _b.label = 2;
            case 2:
              return [4, __await(reader.read())];
            case 3:
              _a = _b.sent(), value = _a.value, done = _a.done;
              if (!done) return [3, 5];
              return [4, __await(void 0)];
            case 4:
              return [2, _b.sent()];
            case 5:
              return [4, __await(value)];
            case 6:
              return [4, _b.sent()];
            case 7:
              _b.sent();
              return [3, 2];
            case 8:
              return [3, 10];
            case 9:
              reader.releaseLock();
              return [7];
            case 10:
              return [2];
          }
        });
      });
    }
    exports$1.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
    function isReadableStreamLike(obj) {
      return isFunction_1.isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
    }
    exports$1.isReadableStreamLike = isReadableStreamLike;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/innerFrom.js
var require_innerFrom = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/innerFrom.js"(exports$1) {
    var __awaiter = exports$1 && exports$1.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports$1 && exports$1.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    var __asyncValues = exports$1 && exports$1.__asyncValues || function(o) {
      if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
      var m = o[Symbol.asyncIterator], i;
      return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
        return this;
      }, i);
      function verb(n) {
        i[n] = o[n] && function(v) {
          return new Promise(function(resolve, reject) {
            v = o[n](v), settle(resolve, reject, v.done, v.value);
          });
        };
      }
      function settle(resolve, reject, d, v) {
        Promise.resolve(v).then(function(v2) {
          resolve({ value: v2, done: d });
        }, reject);
      }
    };
    var __values = exports$1 && exports$1.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.fromReadableStreamLike = exports$1.fromAsyncIterable = exports$1.fromIterable = exports$1.fromPromise = exports$1.fromArrayLike = exports$1.fromInteropObservable = exports$1.innerFrom = void 0;
    var isArrayLike_1 = require_isArrayLike();
    var isPromise_1 = require_isPromise();
    var Observable_1 = require_Observable();
    var isInteropObservable_1 = require_isInteropObservable();
    var isAsyncIterable_1 = require_isAsyncIterable();
    var throwUnobservableError_1 = require_throwUnobservableError();
    var isIterable_1 = require_isIterable();
    var isReadableStreamLike_1 = require_isReadableStreamLike();
    var isFunction_1 = require_isFunction();
    var reportUnhandledError_1 = require_reportUnhandledError();
    var observable_1 = require_observable();
    function innerFrom(input) {
      if (input instanceof Observable_1.Observable) {
        return input;
      }
      if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
          return fromInteropObservable(input);
        }
        if (isArrayLike_1.isArrayLike(input)) {
          return fromArrayLike(input);
        }
        if (isPromise_1.isPromise(input)) {
          return fromPromise(input);
        }
        if (isAsyncIterable_1.isAsyncIterable(input)) {
          return fromAsyncIterable(input);
        }
        if (isIterable_1.isIterable(input)) {
          return fromIterable(input);
        }
        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
          return fromReadableStreamLike(input);
        }
      }
      throw throwUnobservableError_1.createInvalidObservableTypeError(input);
    }
    exports$1.innerFrom = innerFrom;
    function fromInteropObservable(obj) {
      return new Observable_1.Observable(function(subscriber) {
        var obs = obj[observable_1.observable]();
        if (isFunction_1.isFunction(obs.subscribe)) {
          return obs.subscribe(subscriber);
        }
        throw new TypeError("Provided object does not correctly implement Symbol.observable");
      });
    }
    exports$1.fromInteropObservable = fromInteropObservable;
    function fromArrayLike(array) {
      return new Observable_1.Observable(function(subscriber) {
        for (var i = 0; i < array.length && !subscriber.closed; i++) {
          subscriber.next(array[i]);
        }
        subscriber.complete();
      });
    }
    exports$1.fromArrayLike = fromArrayLike;
    function fromPromise(promise) {
      return new Observable_1.Observable(function(subscriber) {
        promise.then(function(value) {
          if (!subscriber.closed) {
            subscriber.next(value);
            subscriber.complete();
          }
        }, function(err) {
          return subscriber.error(err);
        }).then(null, reportUnhandledError_1.reportUnhandledError);
      });
    }
    exports$1.fromPromise = fromPromise;
    function fromIterable(iterable) {
      return new Observable_1.Observable(function(subscriber) {
        var e_1, _a;
        try {
          for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
            var value = iterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return;
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
        subscriber.complete();
      });
    }
    exports$1.fromIterable = fromIterable;
    function fromAsyncIterable(asyncIterable) {
      return new Observable_1.Observable(function(subscriber) {
        process(asyncIterable, subscriber).catch(function(err) {
          return subscriber.error(err);
        });
      });
    }
    exports$1.fromAsyncIterable = fromAsyncIterable;
    function fromReadableStreamLike(readableStream) {
      return fromAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(readableStream));
    }
    exports$1.fromReadableStreamLike = fromReadableStreamLike;
    function process(asyncIterable, subscriber) {
      var asyncIterable_1, asyncIterable_1_1;
      var e_2, _a;
      return __awaiter(this, void 0, void 0, function() {
        var value, e_2_1;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              _b.trys.push([0, 5, 6, 11]);
              asyncIterable_1 = __asyncValues(asyncIterable);
              _b.label = 1;
            case 1:
              return [4, asyncIterable_1.next()];
            case 2:
              if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
              value = asyncIterable_1_1.value;
              subscriber.next(value);
              if (subscriber.closed) {
                return [2];
              }
              _b.label = 3;
            case 3:
              return [3, 1];
            case 4:
              return [3, 11];
            case 5:
              e_2_1 = _b.sent();
              e_2 = { error: e_2_1 };
              return [3, 11];
            case 6:
              _b.trys.push([6, , 9, 10]);
              if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
              return [4, _a.call(asyncIterable_1)];
            case 7:
              _b.sent();
              _b.label = 8;
            case 8:
              return [3, 10];
            case 9:
              if (e_2) throw e_2.error;
              return [7];
            case 10:
              return [7];
            case 11:
              subscriber.complete();
              return [2];
          }
        });
      });
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/util/executeSchedule.js
var require_executeSchedule = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/executeSchedule.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.executeSchedule = void 0;
    function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
      if (delay === void 0) {
        delay = 0;
      }
      if (repeat === void 0) {
        repeat = false;
      }
      var scheduleSubscription = scheduler.schedule(function() {
        work();
        if (repeat) {
          parentSubscription.add(this.schedule(null, delay));
        } else {
          this.unsubscribe();
        }
      }, delay);
      parentSubscription.add(scheduleSubscription);
      if (!repeat) {
        return scheduleSubscription;
      }
    }
    exports$1.executeSchedule = executeSchedule;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/observeOn.js
var require_observeOn = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/observeOn.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.observeOn = void 0;
    var executeSchedule_1 = require_executeSchedule();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function observeOn(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return lift_1.operate(function(source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            return subscriber.next(value);
          }, delay);
        }, function() {
          return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            return subscriber.complete();
          }, delay);
        }, function(err) {
          return executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            return subscriber.error(err);
          }, delay);
        }));
      });
    }
    exports$1.observeOn = observeOn;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/subscribeOn.js
var require_subscribeOn = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/subscribeOn.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.subscribeOn = void 0;
    var lift_1 = require_lift();
    function subscribeOn(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      return lift_1.operate(function(source, subscriber) {
        subscriber.add(scheduler.schedule(function() {
          return source.subscribe(subscriber);
        }, delay));
      });
    }
    exports$1.subscribeOn = subscribeOn;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduleObservable.js
var require_scheduleObservable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleObservable.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.scheduleObservable = void 0;
    var innerFrom_1 = require_innerFrom();
    var observeOn_1 = require_observeOn();
    var subscribeOn_1 = require_subscribeOn();
    function scheduleObservable(input, scheduler) {
      return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
    }
    exports$1.scheduleObservable = scheduleObservable;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/schedulePromise.js
var require_schedulePromise = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/schedulePromise.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.schedulePromise = void 0;
    var innerFrom_1 = require_innerFrom();
    var observeOn_1 = require_observeOn();
    var subscribeOn_1 = require_subscribeOn();
    function schedulePromise(input, scheduler) {
      return innerFrom_1.innerFrom(input).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
    }
    exports$1.schedulePromise = schedulePromise;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduleArray.js
var require_scheduleArray = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleArray.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.scheduleArray = void 0;
    var Observable_1 = require_Observable();
    function scheduleArray(input, scheduler) {
      return new Observable_1.Observable(function(subscriber) {
        var i = 0;
        return scheduler.schedule(function() {
          if (i === input.length) {
            subscriber.complete();
          } else {
            subscriber.next(input[i++]);
            if (!subscriber.closed) {
              this.schedule();
            }
          }
        });
      });
    }
    exports$1.scheduleArray = scheduleArray;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduleIterable.js
var require_scheduleIterable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleIterable.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.scheduleIterable = void 0;
    var Observable_1 = require_Observable();
    var iterator_1 = require_iterator();
    var isFunction_1 = require_isFunction();
    var executeSchedule_1 = require_executeSchedule();
    function scheduleIterable(input, scheduler) {
      return new Observable_1.Observable(function(subscriber) {
        var iterator;
        executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
          iterator = input[iterator_1.iterator]();
          executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            var _a;
            var value;
            var done;
            try {
              _a = iterator.next(), value = _a.value, done = _a.done;
            } catch (err) {
              subscriber.error(err);
              return;
            }
            if (done) {
              subscriber.complete();
            } else {
              subscriber.next(value);
            }
          }, 0, true);
        });
        return function() {
          return isFunction_1.isFunction(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return();
        };
      });
    }
    exports$1.scheduleIterable = scheduleIterable;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduleAsyncIterable.js
var require_scheduleAsyncIterable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleAsyncIterable.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.scheduleAsyncIterable = void 0;
    var Observable_1 = require_Observable();
    var executeSchedule_1 = require_executeSchedule();
    function scheduleAsyncIterable(input, scheduler) {
      if (!input) {
        throw new Error("Iterable cannot be null");
      }
      return new Observable_1.Observable(function(subscriber) {
        executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
          var iterator = input[Symbol.asyncIterator]();
          executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            iterator.next().then(function(result) {
              if (result.done) {
                subscriber.complete();
              } else {
                subscriber.next(result.value);
              }
            });
          }, 0, true);
        });
      });
    }
    exports$1.scheduleAsyncIterable = scheduleAsyncIterable;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduleReadableStreamLike.js
var require_scheduleReadableStreamLike = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduleReadableStreamLike.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.scheduleReadableStreamLike = void 0;
    var scheduleAsyncIterable_1 = require_scheduleAsyncIterable();
    var isReadableStreamLike_1 = require_isReadableStreamLike();
    function scheduleReadableStreamLike(input, scheduler) {
      return scheduleAsyncIterable_1.scheduleAsyncIterable(isReadableStreamLike_1.readableStreamLikeToAsyncGenerator(input), scheduler);
    }
    exports$1.scheduleReadableStreamLike = scheduleReadableStreamLike;
  }
});

// node_modules/rxjs/dist/cjs/internal/scheduled/scheduled.js
var require_scheduled = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/scheduled/scheduled.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.scheduled = void 0;
    var scheduleObservable_1 = require_scheduleObservable();
    var schedulePromise_1 = require_schedulePromise();
    var scheduleArray_1 = require_scheduleArray();
    var scheduleIterable_1 = require_scheduleIterable();
    var scheduleAsyncIterable_1 = require_scheduleAsyncIterable();
    var isInteropObservable_1 = require_isInteropObservable();
    var isPromise_1 = require_isPromise();
    var isArrayLike_1 = require_isArrayLike();
    var isIterable_1 = require_isIterable();
    var isAsyncIterable_1 = require_isAsyncIterable();
    var throwUnobservableError_1 = require_throwUnobservableError();
    var isReadableStreamLike_1 = require_isReadableStreamLike();
    var scheduleReadableStreamLike_1 = require_scheduleReadableStreamLike();
    function scheduled(input, scheduler) {
      if (input != null) {
        if (isInteropObservable_1.isInteropObservable(input)) {
          return scheduleObservable_1.scheduleObservable(input, scheduler);
        }
        if (isArrayLike_1.isArrayLike(input)) {
          return scheduleArray_1.scheduleArray(input, scheduler);
        }
        if (isPromise_1.isPromise(input)) {
          return schedulePromise_1.schedulePromise(input, scheduler);
        }
        if (isAsyncIterable_1.isAsyncIterable(input)) {
          return scheduleAsyncIterable_1.scheduleAsyncIterable(input, scheduler);
        }
        if (isIterable_1.isIterable(input)) {
          return scheduleIterable_1.scheduleIterable(input, scheduler);
        }
        if (isReadableStreamLike_1.isReadableStreamLike(input)) {
          return scheduleReadableStreamLike_1.scheduleReadableStreamLike(input, scheduler);
        }
      }
      throw throwUnobservableError_1.createInvalidObservableTypeError(input);
    }
    exports$1.scheduled = scheduled;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/from.js
var require_from = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/from.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.from = void 0;
    var scheduled_1 = require_scheduled();
    var innerFrom_1 = require_innerFrom();
    function from(input, scheduler) {
      return scheduler ? scheduled_1.scheduled(input, scheduler) : innerFrom_1.innerFrom(input);
    }
    exports$1.from = from;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/of.js
var require_of = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/of.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.of = void 0;
    var args_1 = require_args();
    var from_1 = require_from();
    function of() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(args);
      return from_1.from(args, scheduler);
    }
    exports$1.of = of;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/throwError.js
var require_throwError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/throwError.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.throwError = void 0;
    var Observable_1 = require_Observable();
    var isFunction_1 = require_isFunction();
    function throwError(errorOrErrorFactory, scheduler) {
      var errorFactory = isFunction_1.isFunction(errorOrErrorFactory) ? errorOrErrorFactory : function() {
        return errorOrErrorFactory;
      };
      var init = function(subscriber) {
        return subscriber.error(errorFactory());
      };
      return new Observable_1.Observable(scheduler ? function(subscriber) {
        return scheduler.schedule(init, 0, subscriber);
      } : init);
    }
    exports$1.throwError = throwError;
  }
});

// node_modules/rxjs/dist/cjs/internal/Notification.js
var require_Notification = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/Notification.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.observeNotification = exports$1.Notification = exports$1.NotificationKind = void 0;
    var empty_1 = require_empty();
    var of_1 = require_of();
    var throwError_1 = require_throwError();
    var isFunction_1 = require_isFunction();
    (function(NotificationKind2) {
      NotificationKind2["NEXT"] = "N";
      NotificationKind2["ERROR"] = "E";
      NotificationKind2["COMPLETE"] = "C";
    })(exports$1.NotificationKind || (exports$1.NotificationKind = {}));
    var Notification = (function() {
      function Notification2(kind, value, error) {
        this.kind = kind;
        this.value = value;
        this.error = error;
        this.hasValue = kind === "N";
      }
      Notification2.prototype.observe = function(observer) {
        return observeNotification(this, observer);
      };
      Notification2.prototype.do = function(nextHandler, errorHandler, completeHandler) {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        return kind === "N" ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === "E" ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
      };
      Notification2.prototype.accept = function(nextOrObserver, error, complete) {
        var _a;
        return isFunction_1.isFunction((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next) ? this.observe(nextOrObserver) : this.do(nextOrObserver, error, complete);
      };
      Notification2.prototype.toObservable = function() {
        var _a = this, kind = _a.kind, value = _a.value, error = _a.error;
        var result = kind === "N" ? of_1.of(value) : kind === "E" ? throwError_1.throwError(function() {
          return error;
        }) : kind === "C" ? empty_1.EMPTY : 0;
        if (!result) {
          throw new TypeError("Unexpected notification kind " + kind);
        }
        return result;
      };
      Notification2.createNext = function(value) {
        return new Notification2("N", value);
      };
      Notification2.createError = function(err) {
        return new Notification2("E", void 0, err);
      };
      Notification2.createComplete = function() {
        return Notification2.completeNotification;
      };
      Notification2.completeNotification = new Notification2("C");
      return Notification2;
    })();
    exports$1.Notification = Notification;
    function observeNotification(notification, observer) {
      var _a, _b, _c;
      var _d = notification, kind = _d.kind, value = _d.value, error = _d.error;
      if (typeof kind !== "string") {
        throw new TypeError('Invalid notification, missing "kind"');
      }
      kind === "N" ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === "E" ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
    }
    exports$1.observeNotification = observeNotification;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isObservable.js
var require_isObservable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isObservable.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isObservable = void 0;
    var Observable_1 = require_Observable();
    var isFunction_1 = require_isFunction();
    function isObservable(obj) {
      return !!obj && (obj instanceof Observable_1.Observable || isFunction_1.isFunction(obj.lift) && isFunction_1.isFunction(obj.subscribe));
    }
    exports$1.isObservable = isObservable;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/EmptyError.js
var require_EmptyError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/EmptyError.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.EmptyError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports$1.EmptyError = createErrorClass_1.createErrorClass(function(_super) {
      return function EmptyErrorImpl() {
        _super(this);
        this.name = "EmptyError";
        this.message = "no elements in sequence";
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/lastValueFrom.js
var require_lastValueFrom = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/lastValueFrom.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.lastValueFrom = void 0;
    var EmptyError_1 = require_EmptyError();
    function lastValueFrom(source, config) {
      var hasConfig = typeof config === "object";
      return new Promise(function(resolve, reject) {
        var _hasValue = false;
        var _value;
        source.subscribe({
          next: function(value) {
            _value = value;
            _hasValue = true;
          },
          error: reject,
          complete: function() {
            if (_hasValue) {
              resolve(_value);
            } else if (hasConfig) {
              resolve(config.defaultValue);
            } else {
              reject(new EmptyError_1.EmptyError());
            }
          }
        });
      });
    }
    exports$1.lastValueFrom = lastValueFrom;
  }
});

// node_modules/rxjs/dist/cjs/internal/firstValueFrom.js
var require_firstValueFrom = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/firstValueFrom.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.firstValueFrom = void 0;
    var EmptyError_1 = require_EmptyError();
    var Subscriber_1 = require_Subscriber();
    function firstValueFrom2(source, config) {
      var hasConfig = typeof config === "object";
      return new Promise(function(resolve, reject) {
        var subscriber = new Subscriber_1.SafeSubscriber({
          next: function(value) {
            resolve(value);
            subscriber.unsubscribe();
          },
          error: reject,
          complete: function() {
            if (hasConfig) {
              resolve(config.defaultValue);
            } else {
              reject(new EmptyError_1.EmptyError());
            }
          }
        });
        source.subscribe(subscriber);
      });
    }
    exports$1.firstValueFrom = firstValueFrom2;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/ArgumentOutOfRangeError.js
var require_ArgumentOutOfRangeError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/ArgumentOutOfRangeError.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.ArgumentOutOfRangeError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports$1.ArgumentOutOfRangeError = createErrorClass_1.createErrorClass(function(_super) {
      return function ArgumentOutOfRangeErrorImpl() {
        _super(this);
        this.name = "ArgumentOutOfRangeError";
        this.message = "argument out of range";
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/util/NotFoundError.js
var require_NotFoundError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/NotFoundError.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.NotFoundError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports$1.NotFoundError = createErrorClass_1.createErrorClass(function(_super) {
      return function NotFoundErrorImpl(message) {
        _super(this);
        this.name = "NotFoundError";
        this.message = message;
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/util/SequenceError.js
var require_SequenceError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/SequenceError.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.SequenceError = void 0;
    var createErrorClass_1 = require_createErrorClass();
    exports$1.SequenceError = createErrorClass_1.createErrorClass(function(_super) {
      return function SequenceErrorImpl(message) {
        _super(this);
        this.name = "SequenceError";
        this.message = message;
      };
    });
  }
});

// node_modules/rxjs/dist/cjs/internal/util/isDate.js
var require_isDate = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/isDate.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isValidDate = void 0;
    function isValidDate(value) {
      return value instanceof Date && !isNaN(value);
    }
    exports$1.isValidDate = isValidDate;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/timeout.js
var require_timeout = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/timeout.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.timeout = exports$1.TimeoutError = void 0;
    var async_1 = require_async();
    var isDate_1 = require_isDate();
    var lift_1 = require_lift();
    var innerFrom_1 = require_innerFrom();
    var createErrorClass_1 = require_createErrorClass();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var executeSchedule_1 = require_executeSchedule();
    exports$1.TimeoutError = createErrorClass_1.createErrorClass(function(_super) {
      return function TimeoutErrorImpl(info) {
        if (info === void 0) {
          info = null;
        }
        _super(this);
        this.message = "Timeout has occurred";
        this.name = "TimeoutError";
        this.info = info;
      };
    });
    function timeout(config, schedulerArg) {
      var _a = isDate_1.isValidDate(config) ? { first: config } : typeof config === "number" ? { each: config } : config, first = _a.first, each = _a.each, _b = _a.with, _with = _b === void 0 ? timeoutErrorFactory : _b, _c = _a.scheduler, scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : async_1.asyncScheduler : _c, _d = _a.meta, meta = _d === void 0 ? null : _d;
      if (first == null && each == null) {
        throw new TypeError("No timeout provided.");
      }
      return lift_1.operate(function(source, subscriber) {
        var originalSourceSubscription;
        var timerSubscription;
        var lastValue = null;
        var seen = 0;
        var startTimer = function(delay) {
          timerSubscription = executeSchedule_1.executeSchedule(subscriber, scheduler, function() {
            try {
              originalSourceSubscription.unsubscribe();
              innerFrom_1.innerFrom(_with({
                meta,
                lastValue,
                seen
              })).subscribe(subscriber);
            } catch (err) {
              subscriber.error(err);
            }
          }, delay);
        };
        originalSourceSubscription = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
          seen++;
          subscriber.next(lastValue = value);
          each > 0 && startTimer(each);
        }, void 0, void 0, function() {
          if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
            timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
          }
          lastValue = null;
        }));
        !seen && startTimer(first != null ? typeof first === "number" ? first : +first - scheduler.now() : each);
      });
    }
    exports$1.timeout = timeout;
    function timeoutErrorFactory(info) {
      throw new exports$1.TimeoutError(info);
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/map.js
var require_map = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/map.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.map = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function map(project, thisArg) {
      return lift_1.operate(function(source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          subscriber.next(project.call(thisArg, value, index++));
        }));
      });
    }
    exports$1.map = map;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/mapOneOrManyArgs.js
var require_mapOneOrManyArgs = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/mapOneOrManyArgs.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.mapOneOrManyArgs = void 0;
    var map_1 = require_map();
    var isArray = Array.isArray;
    function callOrApply(fn, args) {
      return isArray(args) ? fn.apply(void 0, __spreadArray([], __read(args))) : fn(args);
    }
    function mapOneOrManyArgs(fn) {
      return map_1.map(function(args) {
        return callOrApply(fn, args);
      });
    }
    exports$1.mapOneOrManyArgs = mapOneOrManyArgs;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/bindCallbackInternals.js
var require_bindCallbackInternals = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/bindCallbackInternals.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.bindCallbackInternals = void 0;
    var isScheduler_1 = require_isScheduler();
    var Observable_1 = require_Observable();
    var subscribeOn_1 = require_subscribeOn();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var observeOn_1 = require_observeOn();
    var AsyncSubject_1 = require_AsyncSubject();
    function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
      if (resultSelector) {
        if (isScheduler_1.isScheduler(resultSelector)) {
          scheduler = resultSelector;
        } else {
          return function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler).apply(this, args).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
          };
        }
      }
      if (scheduler) {
        return function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return bindCallbackInternals(isNodeStyle, callbackFunc).apply(this, args).pipe(subscribeOn_1.subscribeOn(scheduler), observeOn_1.observeOn(scheduler));
        };
      }
      return function() {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var subject = new AsyncSubject_1.AsyncSubject();
        var uninitialized = true;
        return new Observable_1.Observable(function(subscriber) {
          var subs = subject.subscribe(subscriber);
          if (uninitialized) {
            uninitialized = false;
            var isAsync_1 = false;
            var isComplete_1 = false;
            callbackFunc.apply(_this, __spreadArray(__spreadArray([], __read(args)), [
              function() {
                var results = [];
                for (var _i2 = 0; _i2 < arguments.length; _i2++) {
                  results[_i2] = arguments[_i2];
                }
                if (isNodeStyle) {
                  var err = results.shift();
                  if (err != null) {
                    subject.error(err);
                    return;
                  }
                }
                subject.next(1 < results.length ? results : results[0]);
                isComplete_1 = true;
                if (isAsync_1) {
                  subject.complete();
                }
              }
            ]));
            if (isComplete_1) {
              subject.complete();
            }
            isAsync_1 = true;
          }
          return subs;
        });
      };
    }
    exports$1.bindCallbackInternals = bindCallbackInternals;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/bindCallback.js
var require_bindCallback = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/bindCallback.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.bindCallback = void 0;
    var bindCallbackInternals_1 = require_bindCallbackInternals();
    function bindCallback(callbackFunc, resultSelector, scheduler) {
      return bindCallbackInternals_1.bindCallbackInternals(false, callbackFunc, resultSelector, scheduler);
    }
    exports$1.bindCallback = bindCallback;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/bindNodeCallback.js
var require_bindNodeCallback = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/bindNodeCallback.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.bindNodeCallback = void 0;
    var bindCallbackInternals_1 = require_bindCallbackInternals();
    function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
      return bindCallbackInternals_1.bindCallbackInternals(true, callbackFunc, resultSelector, scheduler);
    }
    exports$1.bindNodeCallback = bindNodeCallback;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/argsArgArrayOrObject.js
var require_argsArgArrayOrObject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/argsArgArrayOrObject.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.argsArgArrayOrObject = void 0;
    var isArray = Array.isArray;
    var getPrototypeOf = Object.getPrototypeOf;
    var objectProto = Object.prototype;
    var getKeys = Object.keys;
    function argsArgArrayOrObject(args) {
      if (args.length === 1) {
        var first_1 = args[0];
        if (isArray(first_1)) {
          return { args: first_1, keys: null };
        }
        if (isPOJO(first_1)) {
          var keys = getKeys(first_1);
          return {
            args: keys.map(function(key) {
              return first_1[key];
            }),
            keys
          };
        }
      }
      return { args, keys: null };
    }
    exports$1.argsArgArrayOrObject = argsArgArrayOrObject;
    function isPOJO(obj) {
      return obj && typeof obj === "object" && getPrototypeOf(obj) === objectProto;
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/util/createObject.js
var require_createObject = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/createObject.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.createObject = void 0;
    function createObject(keys, values) {
      return keys.reduce(function(result, key, i) {
        return result[key] = values[i], result;
      }, {});
    }
    exports$1.createObject = createObject;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/combineLatest.js
var require_combineLatest = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/combineLatest.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.combineLatestInit = exports$1.combineLatest = void 0;
    var Observable_1 = require_Observable();
    var argsArgArrayOrObject_1 = require_argsArgArrayOrObject();
    var from_1 = require_from();
    var identity_1 = require_identity();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var args_1 = require_args();
    var createObject_1 = require_createObject();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var executeSchedule_1 = require_executeSchedule();
    function combineLatest() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(args);
      var resultSelector = args_1.popResultSelector(args);
      var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), observables = _a.args, keys = _a.keys;
      if (observables.length === 0) {
        return from_1.from([], scheduler);
      }
      var result = new Observable_1.Observable(combineLatestInit(observables, scheduler, keys ? function(values) {
        return createObject_1.createObject(keys, values);
      } : identity_1.identity));
      return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
    }
    exports$1.combineLatest = combineLatest;
    function combineLatestInit(observables, scheduler, valueTransform) {
      if (valueTransform === void 0) {
        valueTransform = identity_1.identity;
      }
      return function(subscriber) {
        maybeSchedule(scheduler, function() {
          var length = observables.length;
          var values = new Array(length);
          var active = length;
          var remainingFirstValues = length;
          var _loop_1 = function(i2) {
            maybeSchedule(scheduler, function() {
              var source = from_1.from(observables[i2], scheduler);
              var hasFirstValue = false;
              source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
                values[i2] = value;
                if (!hasFirstValue) {
                  hasFirstValue = true;
                  remainingFirstValues--;
                }
                if (!remainingFirstValues) {
                  subscriber.next(valueTransform(values.slice()));
                }
              }, function() {
                if (!--active) {
                  subscriber.complete();
                }
              }));
            }, subscriber);
          };
          for (var i = 0; i < length; i++) {
            _loop_1(i);
          }
        }, subscriber);
      };
    }
    exports$1.combineLatestInit = combineLatestInit;
    function maybeSchedule(scheduler, execute, subscription) {
      if (scheduler) {
        executeSchedule_1.executeSchedule(subscription, scheduler, execute);
      } else {
        execute();
      }
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeInternals.js
var require_mergeInternals = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeInternals.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.mergeInternals = void 0;
    var innerFrom_1 = require_innerFrom();
    var executeSchedule_1 = require_executeSchedule();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
      var buffer = [];
      var active = 0;
      var index = 0;
      var isComplete = false;
      var checkComplete = function() {
        if (isComplete && !buffer.length && !active) {
          subscriber.complete();
        }
      };
      var outerNext = function(value) {
        return active < concurrent ? doInnerSub(value) : buffer.push(value);
      };
      var doInnerSub = function(value) {
        expand && subscriber.next(value);
        active++;
        var innerComplete = false;
        innerFrom_1.innerFrom(project(value, index++)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(innerValue) {
          onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
          if (expand) {
            outerNext(innerValue);
          } else {
            subscriber.next(innerValue);
          }
        }, function() {
          innerComplete = true;
        }, void 0, function() {
          if (innerComplete) {
            try {
              active--;
              var _loop_1 = function() {
                var bufferedValue = buffer.shift();
                if (innerSubScheduler) {
                  executeSchedule_1.executeSchedule(subscriber, innerSubScheduler, function() {
                    return doInnerSub(bufferedValue);
                  });
                } else {
                  doInnerSub(bufferedValue);
                }
              };
              while (buffer.length && active < concurrent) {
                _loop_1();
              }
              checkComplete();
            } catch (err) {
              subscriber.error(err);
            }
          }
        }));
      };
      source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, outerNext, function() {
        isComplete = true;
        checkComplete();
      }));
      return function() {
        additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
      };
    }
    exports$1.mergeInternals = mergeInternals;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeMap.js
var require_mergeMap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeMap.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.mergeMap = void 0;
    var map_1 = require_map();
    var innerFrom_1 = require_innerFrom();
    var lift_1 = require_lift();
    var mergeInternals_1 = require_mergeInternals();
    var isFunction_1 = require_isFunction();
    function mergeMap(project, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Infinity;
      }
      if (isFunction_1.isFunction(resultSelector)) {
        return mergeMap(function(a, i) {
          return map_1.map(function(b, ii) {
            return resultSelector(a, b, i, ii);
          })(innerFrom_1.innerFrom(project(a, i)));
        }, concurrent);
      } else if (typeof resultSelector === "number") {
        concurrent = resultSelector;
      }
      return lift_1.operate(function(source, subscriber) {
        return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent);
      });
    }
    exports$1.mergeMap = mergeMap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeAll.js
var require_mergeAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeAll.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.mergeAll = void 0;
    var mergeMap_1 = require_mergeMap();
    var identity_1 = require_identity();
    function mergeAll(concurrent) {
      if (concurrent === void 0) {
        concurrent = Infinity;
      }
      return mergeMap_1.mergeMap(identity_1.identity, concurrent);
    }
    exports$1.mergeAll = mergeAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/concatAll.js
var require_concatAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/concatAll.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.concatAll = void 0;
    var mergeAll_1 = require_mergeAll();
    function concatAll() {
      return mergeAll_1.mergeAll(1);
    }
    exports$1.concatAll = concatAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/concat.js
var require_concat = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/concat.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.concat = void 0;
    var concatAll_1 = require_concatAll();
    var args_1 = require_args();
    var from_1 = require_from();
    function concat() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      return concatAll_1.concatAll()(from_1.from(args, args_1.popScheduler(args)));
    }
    exports$1.concat = concat;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/defer.js
var require_defer = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/defer.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.defer = void 0;
    var Observable_1 = require_Observable();
    var innerFrom_1 = require_innerFrom();
    function defer(observableFactory) {
      return new Observable_1.Observable(function(subscriber) {
        innerFrom_1.innerFrom(observableFactory()).subscribe(subscriber);
      });
    }
    exports$1.defer = defer;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/connectable.js
var require_connectable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/connectable.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.connectable = void 0;
    var Subject_1 = require_Subject();
    var Observable_1 = require_Observable();
    var defer_1 = require_defer();
    var DEFAULT_CONFIG = {
      connector: function() {
        return new Subject_1.Subject();
      },
      resetOnDisconnect: true
    };
    function connectable(source, config) {
      if (config === void 0) {
        config = DEFAULT_CONFIG;
      }
      var connection = null;
      var connector = config.connector, _a = config.resetOnDisconnect, resetOnDisconnect = _a === void 0 ? true : _a;
      var subject = connector();
      var result = new Observable_1.Observable(function(subscriber) {
        return subject.subscribe(subscriber);
      });
      result.connect = function() {
        if (!connection || connection.closed) {
          connection = defer_1.defer(function() {
            return source;
          }).subscribe(subject);
          if (resetOnDisconnect) {
            connection.add(function() {
              return subject = connector();
            });
          }
        }
        return connection;
      };
      return result;
    }
    exports$1.connectable = connectable;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/forkJoin.js
var require_forkJoin = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/forkJoin.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.forkJoin = void 0;
    var Observable_1 = require_Observable();
    var argsArgArrayOrObject_1 = require_argsArgArrayOrObject();
    var innerFrom_1 = require_innerFrom();
    var args_1 = require_args();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var createObject_1 = require_createObject();
    function forkJoin() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var resultSelector = args_1.popResultSelector(args);
      var _a = argsArgArrayOrObject_1.argsArgArrayOrObject(args), sources = _a.args, keys = _a.keys;
      var result = new Observable_1.Observable(function(subscriber) {
        var length = sources.length;
        if (!length) {
          subscriber.complete();
          return;
        }
        var values = new Array(length);
        var remainingCompletions = length;
        var remainingEmissions = length;
        var _loop_1 = function(sourceIndex2) {
          var hasValue = false;
          innerFrom_1.innerFrom(sources[sourceIndex2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            if (!hasValue) {
              hasValue = true;
              remainingEmissions--;
            }
            values[sourceIndex2] = value;
          }, function() {
            return remainingCompletions--;
          }, void 0, function() {
            if (!remainingCompletions || !hasValue) {
              if (!remainingEmissions) {
                subscriber.next(keys ? createObject_1.createObject(keys, values) : values);
              }
              subscriber.complete();
            }
          }));
        };
        for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
          _loop_1(sourceIndex);
        }
      });
      return resultSelector ? result.pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : result;
    }
    exports$1.forkJoin = forkJoin;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/fromEvent.js
var require_fromEvent = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/fromEvent.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.fromEvent = void 0;
    var innerFrom_1 = require_innerFrom();
    var Observable_1 = require_Observable();
    var mergeMap_1 = require_mergeMap();
    var isArrayLike_1 = require_isArrayLike();
    var isFunction_1 = require_isFunction();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var nodeEventEmitterMethods = ["addListener", "removeListener"];
    var eventTargetMethods = ["addEventListener", "removeEventListener"];
    var jqueryMethods = ["on", "off"];
    function fromEvent(target, eventName, options, resultSelector) {
      if (isFunction_1.isFunction(options)) {
        resultSelector = options;
        options = void 0;
      }
      if (resultSelector) {
        return fromEvent(target, eventName, options).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
      }
      var _a = __read(isEventTarget(target) ? eventTargetMethods.map(function(methodName) {
        return function(handler) {
          return target[methodName](eventName, handler, options);
        };
      }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2), add = _a[0], remove = _a[1];
      if (!add) {
        if (isArrayLike_1.isArrayLike(target)) {
          return mergeMap_1.mergeMap(function(subTarget) {
            return fromEvent(subTarget, eventName, options);
          })(innerFrom_1.innerFrom(target));
        }
      }
      if (!add) {
        throw new TypeError("Invalid event target");
      }
      return new Observable_1.Observable(function(subscriber) {
        var handler = function() {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }
          return subscriber.next(1 < args.length ? args : args[0]);
        };
        add(handler);
        return function() {
          return remove(handler);
        };
      });
    }
    exports$1.fromEvent = fromEvent;
    function toCommonHandlerRegistry(target, eventName) {
      return function(methodName) {
        return function(handler) {
          return target[methodName](eventName, handler);
        };
      };
    }
    function isNodeStyleEventEmitter(target) {
      return isFunction_1.isFunction(target.addListener) && isFunction_1.isFunction(target.removeListener);
    }
    function isJQueryStyleEventEmitter(target) {
      return isFunction_1.isFunction(target.on) && isFunction_1.isFunction(target.off);
    }
    function isEventTarget(target) {
      return isFunction_1.isFunction(target.addEventListener) && isFunction_1.isFunction(target.removeEventListener);
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/fromEventPattern.js
var require_fromEventPattern = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/fromEventPattern.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.fromEventPattern = void 0;
    var Observable_1 = require_Observable();
    var isFunction_1 = require_isFunction();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    function fromEventPattern(addHandler, removeHandler, resultSelector) {
      if (resultSelector) {
        return fromEventPattern(addHandler, removeHandler).pipe(mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector));
      }
      return new Observable_1.Observable(function(subscriber) {
        var handler = function() {
          var e = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            e[_i] = arguments[_i];
          }
          return subscriber.next(e.length === 1 ? e[0] : e);
        };
        var retValue = addHandler(handler);
        return isFunction_1.isFunction(removeHandler) ? function() {
          return removeHandler(handler, retValue);
        } : void 0;
      });
    }
    exports$1.fromEventPattern = fromEventPattern;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/generate.js
var require_generate = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/generate.js"(exports$1) {
    var __generator = exports$1 && exports$1.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1) throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.generate = void 0;
    var identity_1 = require_identity();
    var isScheduler_1 = require_isScheduler();
    var defer_1 = require_defer();
    var scheduleIterable_1 = require_scheduleIterable();
    function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
      var _a, _b;
      var resultSelector;
      var initialState;
      if (arguments.length === 1) {
        _a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? identity_1.identity : _b, scheduler = _a.scheduler;
      } else {
        initialState = initialStateOrOptions;
        if (!resultSelectorOrScheduler || isScheduler_1.isScheduler(resultSelectorOrScheduler)) {
          resultSelector = identity_1.identity;
          scheduler = resultSelectorOrScheduler;
        } else {
          resultSelector = resultSelectorOrScheduler;
        }
      }
      function gen() {
        var state;
        return __generator(this, function(_a2) {
          switch (_a2.label) {
            case 0:
              state = initialState;
              _a2.label = 1;
            case 1:
              if (!(!condition || condition(state))) return [3, 4];
              return [4, resultSelector(state)];
            case 2:
              _a2.sent();
              _a2.label = 3;
            case 3:
              state = iterate(state);
              return [3, 1];
            case 4:
              return [2];
          }
        });
      }
      return defer_1.defer(scheduler ? function() {
        return scheduleIterable_1.scheduleIterable(gen(), scheduler);
      } : gen);
    }
    exports$1.generate = generate;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/iif.js
var require_iif = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/iif.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.iif = void 0;
    var defer_1 = require_defer();
    function iif(condition, trueResult, falseResult) {
      return defer_1.defer(function() {
        return condition() ? trueResult : falseResult;
      });
    }
    exports$1.iif = iif;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/timer.js
var require_timer = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/timer.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.timer = void 0;
    var Observable_1 = require_Observable();
    var async_1 = require_async();
    var isScheduler_1 = require_isScheduler();
    var isDate_1 = require_isDate();
    function timer(dueTime, intervalOrScheduler, scheduler) {
      if (dueTime === void 0) {
        dueTime = 0;
      }
      if (scheduler === void 0) {
        scheduler = async_1.async;
      }
      var intervalDuration = -1;
      if (intervalOrScheduler != null) {
        if (isScheduler_1.isScheduler(intervalOrScheduler)) {
          scheduler = intervalOrScheduler;
        } else {
          intervalDuration = intervalOrScheduler;
        }
      }
      return new Observable_1.Observable(function(subscriber) {
        var due = isDate_1.isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
        if (due < 0) {
          due = 0;
        }
        var n = 0;
        return scheduler.schedule(function() {
          if (!subscriber.closed) {
            subscriber.next(n++);
            if (0 <= intervalDuration) {
              this.schedule(void 0, intervalDuration);
            } else {
              subscriber.complete();
            }
          }
        }, due);
      });
    }
    exports$1.timer = timer;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/interval.js
var require_interval = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/interval.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.interval = void 0;
    var async_1 = require_async();
    var timer_1 = require_timer();
    function interval(period, scheduler) {
      if (period === void 0) {
        period = 0;
      }
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      if (period < 0) {
        period = 0;
      }
      return timer_1.timer(period, period, scheduler);
    }
    exports$1.interval = interval;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/merge.js
var require_merge = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/merge.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.merge = void 0;
    var mergeAll_1 = require_mergeAll();
    var innerFrom_1 = require_innerFrom();
    var empty_1 = require_empty();
    var args_1 = require_args();
    var from_1 = require_from();
    function merge() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(args);
      var concurrent = args_1.popNumber(args, Infinity);
      var sources = args;
      return !sources.length ? empty_1.EMPTY : sources.length === 1 ? innerFrom_1.innerFrom(sources[0]) : mergeAll_1.mergeAll(concurrent)(from_1.from(sources, scheduler));
    }
    exports$1.merge = merge;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/never.js
var require_never = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/never.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.never = exports$1.NEVER = void 0;
    var Observable_1 = require_Observable();
    var noop_1 = require_noop();
    exports$1.NEVER = new Observable_1.Observable(noop_1.noop);
    function never() {
      return exports$1.NEVER;
    }
    exports$1.never = never;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/argsOrArgArray.js
var require_argsOrArgArray = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/argsOrArgArray.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.argsOrArgArray = void 0;
    var isArray = Array.isArray;
    function argsOrArgArray(args) {
      return args.length === 1 && isArray(args[0]) ? args[0] : args;
    }
    exports$1.argsOrArgArray = argsOrArgArray;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/onErrorResumeNext.js
var require_onErrorResumeNext = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/onErrorResumeNext.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.onErrorResumeNext = void 0;
    var Observable_1 = require_Observable();
    var argsOrArgArray_1 = require_argsOrArgArray();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    var innerFrom_1 = require_innerFrom();
    function onErrorResumeNext() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
      return new Observable_1.Observable(function(subscriber) {
        var sourceIndex = 0;
        var subscribeNext = function() {
          if (sourceIndex < nextSources.length) {
            var nextSource = void 0;
            try {
              nextSource = innerFrom_1.innerFrom(nextSources[sourceIndex++]);
            } catch (err) {
              subscribeNext();
              return;
            }
            var innerSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, void 0, noop_1.noop, noop_1.noop);
            nextSource.subscribe(innerSubscriber);
            innerSubscriber.add(subscribeNext);
          } else {
            subscriber.complete();
          }
        };
        subscribeNext();
      });
    }
    exports$1.onErrorResumeNext = onErrorResumeNext;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/pairs.js
var require_pairs = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/pairs.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.pairs = void 0;
    var from_1 = require_from();
    function pairs(obj, scheduler) {
      return from_1.from(Object.entries(obj), scheduler);
    }
    exports$1.pairs = pairs;
  }
});

// node_modules/rxjs/dist/cjs/internal/util/not.js
var require_not = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/util/not.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.not = void 0;
    function not(pred, thisArg) {
      return function(value, index) {
        return !pred.call(thisArg, value, index);
      };
    }
    exports$1.not = not;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/filter.js
var require_filter = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/filter.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.filter = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function filter(predicate, thisArg) {
      return lift_1.operate(function(source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return predicate.call(thisArg, value, index++) && subscriber.next(value);
        }));
      });
    }
    exports$1.filter = filter;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/partition.js
var require_partition = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/partition.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.partition = void 0;
    var not_1 = require_not();
    var filter_1 = require_filter();
    var innerFrom_1 = require_innerFrom();
    function partition(source, predicate, thisArg) {
      return [filter_1.filter(predicate, thisArg)(innerFrom_1.innerFrom(source)), filter_1.filter(not_1.not(predicate, thisArg))(innerFrom_1.innerFrom(source))];
    }
    exports$1.partition = partition;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/race.js
var require_race = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/race.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.raceInit = exports$1.race = void 0;
    var Observable_1 = require_Observable();
    var innerFrom_1 = require_innerFrom();
    var argsOrArgArray_1 = require_argsOrArgArray();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function race() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      sources = argsOrArgArray_1.argsOrArgArray(sources);
      return sources.length === 1 ? innerFrom_1.innerFrom(sources[0]) : new Observable_1.Observable(raceInit(sources));
    }
    exports$1.race = race;
    function raceInit(sources) {
      return function(subscriber) {
        var subscriptions = [];
        var _loop_1 = function(i2) {
          subscriptions.push(innerFrom_1.innerFrom(sources[i2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            if (subscriptions) {
              for (var s = 0; s < subscriptions.length; s++) {
                s !== i2 && subscriptions[s].unsubscribe();
              }
              subscriptions = null;
            }
            subscriber.next(value);
          })));
        };
        for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
          _loop_1(i);
        }
      };
    }
    exports$1.raceInit = raceInit;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/range.js
var require_range = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/range.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.range = void 0;
    var Observable_1 = require_Observable();
    var empty_1 = require_empty();
    function range(start, count, scheduler) {
      if (count == null) {
        count = start;
        start = 0;
      }
      if (count <= 0) {
        return empty_1.EMPTY;
      }
      var end = count + start;
      return new Observable_1.Observable(scheduler ? function(subscriber) {
        var n = start;
        return scheduler.schedule(function() {
          if (n < end) {
            subscriber.next(n++);
            this.schedule();
          } else {
            subscriber.complete();
          }
        });
      } : function(subscriber) {
        var n = start;
        while (n < end && !subscriber.closed) {
          subscriber.next(n++);
        }
        subscriber.complete();
      });
    }
    exports$1.range = range;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/using.js
var require_using = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/using.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.using = void 0;
    var Observable_1 = require_Observable();
    var innerFrom_1 = require_innerFrom();
    var empty_1 = require_empty();
    function using(resourceFactory, observableFactory) {
      return new Observable_1.Observable(function(subscriber) {
        var resource = resourceFactory();
        var result = observableFactory(resource);
        var source = result ? innerFrom_1.innerFrom(result) : empty_1.EMPTY;
        source.subscribe(subscriber);
        return function() {
          if (resource) {
            resource.unsubscribe();
          }
        };
      });
    }
    exports$1.using = using;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/zip.js
var require_zip = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/zip.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.zip = void 0;
    var Observable_1 = require_Observable();
    var innerFrom_1 = require_innerFrom();
    var argsOrArgArray_1 = require_argsOrArgArray();
    var empty_1 = require_empty();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var args_1 = require_args();
    function zip() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var resultSelector = args_1.popResultSelector(args);
      var sources = argsOrArgArray_1.argsOrArgArray(args);
      return sources.length ? new Observable_1.Observable(function(subscriber) {
        var buffers = sources.map(function() {
          return [];
        });
        var completed = sources.map(function() {
          return false;
        });
        subscriber.add(function() {
          buffers = completed = null;
        });
        var _loop_1 = function(sourceIndex2) {
          innerFrom_1.innerFrom(sources[sourceIndex2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            buffers[sourceIndex2].push(value);
            if (buffers.every(function(buffer) {
              return buffer.length;
            })) {
              var result = buffers.map(function(buffer) {
                return buffer.shift();
              });
              subscriber.next(resultSelector ? resultSelector.apply(void 0, __spreadArray([], __read(result))) : result);
              if (buffers.some(function(buffer, i) {
                return !buffer.length && completed[i];
              })) {
                subscriber.complete();
              }
            }
          }, function() {
            completed[sourceIndex2] = true;
            !buffers[sourceIndex2].length && subscriber.complete();
          }));
        };
        for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
          _loop_1(sourceIndex);
        }
        return function() {
          buffers = completed = null;
        };
      }) : empty_1.EMPTY;
    }
    exports$1.zip = zip;
  }
});

// node_modules/rxjs/dist/cjs/internal/types.js
var require_types = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/types.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/audit.js
var require_audit = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/audit.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.audit = void 0;
    var lift_1 = require_lift();
    var innerFrom_1 = require_innerFrom();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function audit(durationSelector) {
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var isComplete = false;
        var endDuration = function() {
          durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
          durationSubscriber = null;
          if (hasValue) {
            hasValue = false;
            var value = lastValue;
            lastValue = null;
            subscriber.next(value);
          }
          isComplete && subscriber.complete();
        };
        var cleanupDuration = function() {
          durationSubscriber = null;
          isComplete && subscriber.complete();
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          hasValue = true;
          lastValue = value;
          if (!durationSubscriber) {
            innerFrom_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, endDuration, cleanupDuration));
          }
        }, function() {
          isComplete = true;
          (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
        }));
      });
    }
    exports$1.audit = audit;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/auditTime.js
var require_auditTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/auditTime.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.auditTime = void 0;
    var async_1 = require_async();
    var audit_1 = require_audit();
    var timer_1 = require_timer();
    function auditTime(duration, scheduler) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      return audit_1.audit(function() {
        return timer_1.timer(duration, scheduler);
      });
    }
    exports$1.auditTime = auditTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/buffer.js
var require_buffer = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/buffer.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.buffer = void 0;
    var lift_1 = require_lift();
    var noop_1 = require_noop();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function buffer(closingNotifier) {
      return lift_1.operate(function(source, subscriber) {
        var currentBuffer = [];
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return currentBuffer.push(value);
        }, function() {
          subscriber.next(currentBuffer);
          subscriber.complete();
        }));
        innerFrom_1.innerFrom(closingNotifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          var b = currentBuffer;
          currentBuffer = [];
          subscriber.next(b);
        }, noop_1.noop));
        return function() {
          currentBuffer = null;
        };
      });
    }
    exports$1.buffer = buffer;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/bufferCount.js
var require_bufferCount = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/bufferCount.js"(exports$1) {
    var __values = exports$1 && exports$1.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.bufferCount = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var arrRemove_1 = require_arrRemove();
    function bufferCount(bufferSize, startBufferEvery) {
      if (startBufferEvery === void 0) {
        startBufferEvery = null;
      }
      startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
      return lift_1.operate(function(source, subscriber) {
        var buffers = [];
        var count = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var e_1, _a, e_2, _b;
          var toEmit = null;
          if (count++ % startBufferEvery === 0) {
            buffers.push([]);
          }
          try {
            for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
              var buffer = buffers_1_1.value;
              buffer.push(value);
              if (bufferSize <= buffer.length) {
                toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
                toEmit.push(buffer);
              }
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          if (toEmit) {
            try {
              for (var toEmit_1 = __values(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
                var buffer = toEmit_1_1.value;
                arrRemove_1.arrRemove(buffers, buffer);
                subscriber.next(buffer);
              }
            } catch (e_2_1) {
              e_2 = { error: e_2_1 };
            } finally {
              try {
                if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
              } finally {
                if (e_2) throw e_2.error;
              }
            }
          }
        }, function() {
          var e_3, _a;
          try {
            for (var buffers_2 = __values(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
              var buffer = buffers_2_1.value;
              subscriber.next(buffer);
            }
          } catch (e_3_1) {
            e_3 = { error: e_3_1 };
          } finally {
            try {
              if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
            } finally {
              if (e_3) throw e_3.error;
            }
          }
          subscriber.complete();
        }, void 0, function() {
          buffers = null;
        }));
      });
    }
    exports$1.bufferCount = bufferCount;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/bufferTime.js
var require_bufferTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/bufferTime.js"(exports$1) {
    var __values = exports$1 && exports$1.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.bufferTime = void 0;
    var Subscription_1 = require_Subscription();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var arrRemove_1 = require_arrRemove();
    var async_1 = require_async();
    var args_1 = require_args();
    var executeSchedule_1 = require_executeSchedule();
    function bufferTime(bufferTimeSpan) {
      var _a, _b;
      var otherArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
      }
      var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
      var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
      var maxBufferSize = otherArgs[1] || Infinity;
      return lift_1.operate(function(source, subscriber) {
        var bufferRecords = [];
        var restartOnEmit = false;
        var emit = function(record) {
          var buffer = record.buffer, subs = record.subs;
          subs.unsubscribe();
          arrRemove_1.arrRemove(bufferRecords, record);
          subscriber.next(buffer);
          restartOnEmit && startBuffer();
        };
        var startBuffer = function() {
          if (bufferRecords) {
            var subs = new Subscription_1.Subscription();
            subscriber.add(subs);
            var buffer = [];
            var record_1 = {
              buffer,
              subs
            };
            bufferRecords.push(record_1);
            executeSchedule_1.executeSchedule(subs, scheduler, function() {
              return emit(record_1);
            }, bufferTimeSpan);
          }
        };
        if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
          executeSchedule_1.executeSchedule(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
        } else {
          restartOnEmit = true;
        }
        startBuffer();
        var bufferTimeSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var e_1, _a2;
          var recordsCopy = bufferRecords.slice();
          try {
            for (var recordsCopy_1 = __values(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
              var record = recordsCopy_1_1.value;
              var buffer = record.buffer;
              buffer.push(value);
              maxBufferSize <= buffer.length && emit(record);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a2 = recordsCopy_1.return)) _a2.call(recordsCopy_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }, function() {
          while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
            subscriber.next(bufferRecords.shift().buffer);
          }
          bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
          subscriber.complete();
          subscriber.unsubscribe();
        }, void 0, function() {
          return bufferRecords = null;
        });
        source.subscribe(bufferTimeSubscriber);
      });
    }
    exports$1.bufferTime = bufferTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/bufferToggle.js
var require_bufferToggle = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/bufferToggle.js"(exports$1) {
    var __values = exports$1 && exports$1.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.bufferToggle = void 0;
    var Subscription_1 = require_Subscription();
    var lift_1 = require_lift();
    var innerFrom_1 = require_innerFrom();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    var arrRemove_1 = require_arrRemove();
    function bufferToggle(openings, closingSelector) {
      return lift_1.operate(function(source, subscriber) {
        var buffers = [];
        innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(openValue) {
          var buffer = [];
          buffers.push(buffer);
          var closingSubscription = new Subscription_1.Subscription();
          var emitBuffer = function() {
            arrRemove_1.arrRemove(buffers, buffer);
            subscriber.next(buffer);
            closingSubscription.unsubscribe();
          };
          closingSubscription.add(innerFrom_1.innerFrom(closingSelector(openValue)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, emitBuffer, noop_1.noop)));
        }, noop_1.noop));
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var e_1, _a;
          try {
            for (var buffers_1 = __values(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
              var buffer = buffers_1_1.value;
              buffer.push(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }, function() {
          while (buffers.length > 0) {
            subscriber.next(buffers.shift());
          }
          subscriber.complete();
        }));
      });
    }
    exports$1.bufferToggle = bufferToggle;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/bufferWhen.js
var require_bufferWhen = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/bufferWhen.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.bufferWhen = void 0;
    var lift_1 = require_lift();
    var noop_1 = require_noop();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function bufferWhen(closingSelector) {
      return lift_1.operate(function(source, subscriber) {
        var buffer = null;
        var closingSubscriber = null;
        var openBuffer = function() {
          closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
          var b = buffer;
          buffer = [];
          b && subscriber.next(b);
          innerFrom_1.innerFrom(closingSelector()).subscribe(closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openBuffer, noop_1.noop));
        };
        openBuffer();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return buffer === null || buffer === void 0 ? void 0 : buffer.push(value);
        }, function() {
          buffer && subscriber.next(buffer);
          subscriber.complete();
        }, void 0, function() {
          return buffer = closingSubscriber = null;
        }));
      });
    }
    exports$1.bufferWhen = bufferWhen;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/catchError.js
var require_catchError = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/catchError.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.catchError = void 0;
    var innerFrom_1 = require_innerFrom();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var lift_1 = require_lift();
    function catchError(selector) {
      return lift_1.operate(function(source, subscriber) {
        var innerSub = null;
        var syncUnsub = false;
        var handledResult;
        innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
          handledResult = innerFrom_1.innerFrom(selector(err, catchError(selector)(source)));
          if (innerSub) {
            innerSub.unsubscribe();
            innerSub = null;
            handledResult.subscribe(subscriber);
          } else {
            syncUnsub = true;
          }
        }));
        if (syncUnsub) {
          innerSub.unsubscribe();
          innerSub = null;
          handledResult.subscribe(subscriber);
        }
      });
    }
    exports$1.catchError = catchError;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/scanInternals.js
var require_scanInternals = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/scanInternals.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.scanInternals = void 0;
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
      return function(source, subscriber) {
        var hasState = hasSeed;
        var state = seed;
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var i = index++;
          state = hasState ? accumulator(state, value, i) : (hasState = true, value);
          emitOnNext && subscriber.next(state);
        }, emitBeforeComplete && (function() {
          hasState && subscriber.next(state);
          subscriber.complete();
        })));
      };
    }
    exports$1.scanInternals = scanInternals;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/reduce.js
var require_reduce = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/reduce.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.reduce = void 0;
    var scanInternals_1 = require_scanInternals();
    var lift_1 = require_lift();
    function reduce(accumulator, seed) {
      return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, false, true));
    }
    exports$1.reduce = reduce;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/toArray.js
var require_toArray = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/toArray.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.toArray = void 0;
    var reduce_1 = require_reduce();
    var lift_1 = require_lift();
    var arrReducer = function(arr, value) {
      return arr.push(value), arr;
    };
    function toArray() {
      return lift_1.operate(function(source, subscriber) {
        reduce_1.reduce(arrReducer, [])(source).subscribe(subscriber);
      });
    }
    exports$1.toArray = toArray;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/joinAllInternals.js
var require_joinAllInternals = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/joinAllInternals.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.joinAllInternals = void 0;
    var identity_1 = require_identity();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var pipe_1 = require_pipe();
    var mergeMap_1 = require_mergeMap();
    var toArray_1 = require_toArray();
    function joinAllInternals(joinFn, project) {
      return pipe_1.pipe(toArray_1.toArray(), mergeMap_1.mergeMap(function(sources) {
        return joinFn(sources);
      }), project ? mapOneOrManyArgs_1.mapOneOrManyArgs(project) : identity_1.identity);
    }
    exports$1.joinAllInternals = joinAllInternals;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/combineLatestAll.js
var require_combineLatestAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/combineLatestAll.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.combineLatestAll = void 0;
    var combineLatest_1 = require_combineLatest();
    var joinAllInternals_1 = require_joinAllInternals();
    function combineLatestAll(project) {
      return joinAllInternals_1.joinAllInternals(combineLatest_1.combineLatest, project);
    }
    exports$1.combineLatestAll = combineLatestAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/combineAll.js
var require_combineAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/combineAll.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.combineAll = void 0;
    var combineLatestAll_1 = require_combineLatestAll();
    exports$1.combineAll = combineLatestAll_1.combineLatestAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/combineLatest.js
var require_combineLatest2 = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/combineLatest.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.combineLatest = void 0;
    var combineLatest_1 = require_combineLatest();
    var lift_1 = require_lift();
    var argsOrArgArray_1 = require_argsOrArgArray();
    var mapOneOrManyArgs_1 = require_mapOneOrManyArgs();
    var pipe_1 = require_pipe();
    var args_1 = require_args();
    function combineLatest() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var resultSelector = args_1.popResultSelector(args);
      return resultSelector ? pipe_1.pipe(combineLatest.apply(void 0, __spreadArray([], __read(args))), mapOneOrManyArgs_1.mapOneOrManyArgs(resultSelector)) : lift_1.operate(function(source, subscriber) {
        combineLatest_1.combineLatestInit(__spreadArray([source], __read(argsOrArgArray_1.argsOrArgArray(args))))(subscriber);
      });
    }
    exports$1.combineLatest = combineLatest;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/combineLatestWith.js
var require_combineLatestWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/combineLatestWith.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.combineLatestWith = void 0;
    var combineLatest_1 = require_combineLatest2();
    function combineLatestWith() {
      var otherSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
      }
      return combineLatest_1.combineLatest.apply(void 0, __spreadArray([], __read(otherSources)));
    }
    exports$1.combineLatestWith = combineLatestWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/concatMap.js
var require_concatMap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/concatMap.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.concatMap = void 0;
    var mergeMap_1 = require_mergeMap();
    var isFunction_1 = require_isFunction();
    function concatMap(project, resultSelector) {
      return isFunction_1.isFunction(resultSelector) ? mergeMap_1.mergeMap(project, resultSelector, 1) : mergeMap_1.mergeMap(project, 1);
    }
    exports$1.concatMap = concatMap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/concatMapTo.js
var require_concatMapTo = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/concatMapTo.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.concatMapTo = void 0;
    var concatMap_1 = require_concatMap();
    var isFunction_1 = require_isFunction();
    function concatMapTo(innerObservable, resultSelector) {
      return isFunction_1.isFunction(resultSelector) ? concatMap_1.concatMap(function() {
        return innerObservable;
      }, resultSelector) : concatMap_1.concatMap(function() {
        return innerObservable;
      });
    }
    exports$1.concatMapTo = concatMapTo;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/concat.js
var require_concat2 = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/concat.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.concat = void 0;
    var lift_1 = require_lift();
    var concatAll_1 = require_concatAll();
    var args_1 = require_args();
    var from_1 = require_from();
    function concat() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(args);
      return lift_1.operate(function(source, subscriber) {
        concatAll_1.concatAll()(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
      });
    }
    exports$1.concat = concat;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/concatWith.js
var require_concatWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/concatWith.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.concatWith = void 0;
    var concat_1 = require_concat2();
    function concatWith() {
      var otherSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
      }
      return concat_1.concat.apply(void 0, __spreadArray([], __read(otherSources)));
    }
    exports$1.concatWith = concatWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/observable/fromSubscribable.js
var require_fromSubscribable = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/observable/fromSubscribable.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.fromSubscribable = void 0;
    var Observable_1 = require_Observable();
    function fromSubscribable(subscribable) {
      return new Observable_1.Observable(function(subscriber) {
        return subscribable.subscribe(subscriber);
      });
    }
    exports$1.fromSubscribable = fromSubscribable;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/connect.js
var require_connect = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/connect.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.connect = void 0;
    var Subject_1 = require_Subject();
    var innerFrom_1 = require_innerFrom();
    var lift_1 = require_lift();
    var fromSubscribable_1 = require_fromSubscribable();
    var DEFAULT_CONFIG = {
      connector: function() {
        return new Subject_1.Subject();
      }
    };
    function connect(selector, config) {
      if (config === void 0) {
        config = DEFAULT_CONFIG;
      }
      var connector = config.connector;
      return lift_1.operate(function(source, subscriber) {
        var subject = connector();
        innerFrom_1.innerFrom(selector(fromSubscribable_1.fromSubscribable(subject))).subscribe(subscriber);
        subscriber.add(source.subscribe(subject));
      });
    }
    exports$1.connect = connect;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/count.js
var require_count = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/count.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.count = void 0;
    var reduce_1 = require_reduce();
    function count(predicate) {
      return reduce_1.reduce(function(total, value, i) {
        return !predicate || predicate(value, i) ? total + 1 : total;
      }, 0);
    }
    exports$1.count = count;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/debounce.js
var require_debounce = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/debounce.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.debounce = void 0;
    var lift_1 = require_lift();
    var noop_1 = require_noop();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function debounce(durationSelector) {
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        var durationSubscriber = null;
        var emit = function() {
          durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
          durationSubscriber = null;
          if (hasValue) {
            hasValue = false;
            var value = lastValue;
            lastValue = null;
            subscriber.next(value);
          }
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
          hasValue = true;
          lastValue = value;
          durationSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, emit, noop_1.noop);
          innerFrom_1.innerFrom(durationSelector(value)).subscribe(durationSubscriber);
        }, function() {
          emit();
          subscriber.complete();
        }, void 0, function() {
          lastValue = durationSubscriber = null;
        }));
      });
    }
    exports$1.debounce = debounce;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/debounceTime.js
var require_debounceTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/debounceTime.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.debounceTime = void 0;
    var async_1 = require_async();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function debounceTime(dueTime, scheduler) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      return lift_1.operate(function(source, subscriber) {
        var activeTask = null;
        var lastValue = null;
        var lastTime = null;
        var emit = function() {
          if (activeTask) {
            activeTask.unsubscribe();
            activeTask = null;
            var value = lastValue;
            lastValue = null;
            subscriber.next(value);
          }
        };
        function emitWhenIdle() {
          var targetTime = lastTime + dueTime;
          var now = scheduler.now();
          if (now < targetTime) {
            activeTask = this.schedule(void 0, targetTime - now);
            subscriber.add(activeTask);
            return;
          }
          emit();
        }
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          lastValue = value;
          lastTime = scheduler.now();
          if (!activeTask) {
            activeTask = scheduler.schedule(emitWhenIdle, dueTime);
            subscriber.add(activeTask);
          }
        }, function() {
          emit();
          subscriber.complete();
        }, void 0, function() {
          lastValue = activeTask = null;
        }));
      });
    }
    exports$1.debounceTime = debounceTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/defaultIfEmpty.js
var require_defaultIfEmpty = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/defaultIfEmpty.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.defaultIfEmpty = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function defaultIfEmpty(defaultValue) {
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          hasValue = true;
          subscriber.next(value);
        }, function() {
          if (!hasValue) {
            subscriber.next(defaultValue);
          }
          subscriber.complete();
        }));
      });
    }
    exports$1.defaultIfEmpty = defaultIfEmpty;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/take.js
var require_take = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/take.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.take = void 0;
    var empty_1 = require_empty();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function take(count) {
      return count <= 0 ? function() {
        return empty_1.EMPTY;
      } : lift_1.operate(function(source, subscriber) {
        var seen = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          if (++seen <= count) {
            subscriber.next(value);
            if (count <= seen) {
              subscriber.complete();
            }
          }
        }));
      });
    }
    exports$1.take = take;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/ignoreElements.js
var require_ignoreElements = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/ignoreElements.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.ignoreElements = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    function ignoreElements() {
      return lift_1.operate(function(source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, noop_1.noop));
      });
    }
    exports$1.ignoreElements = ignoreElements;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mapTo.js
var require_mapTo = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mapTo.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.mapTo = void 0;
    var map_1 = require_map();
    function mapTo(value) {
      return map_1.map(function() {
        return value;
      });
    }
    exports$1.mapTo = mapTo;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/delayWhen.js
var require_delayWhen = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/delayWhen.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.delayWhen = void 0;
    var concat_1 = require_concat();
    var take_1 = require_take();
    var ignoreElements_1 = require_ignoreElements();
    var mapTo_1 = require_mapTo();
    var mergeMap_1 = require_mergeMap();
    var innerFrom_1 = require_innerFrom();
    function delayWhen(delayDurationSelector, subscriptionDelay) {
      if (subscriptionDelay) {
        return function(source) {
          return concat_1.concat(subscriptionDelay.pipe(take_1.take(1), ignoreElements_1.ignoreElements()), source.pipe(delayWhen(delayDurationSelector)));
        };
      }
      return mergeMap_1.mergeMap(function(value, index) {
        return innerFrom_1.innerFrom(delayDurationSelector(value, index)).pipe(take_1.take(1), mapTo_1.mapTo(value));
      });
    }
    exports$1.delayWhen = delayWhen;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/delay.js
var require_delay = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/delay.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.delay = void 0;
    var async_1 = require_async();
    var delayWhen_1 = require_delayWhen();
    var timer_1 = require_timer();
    function delay(due, scheduler) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      var duration = timer_1.timer(due, scheduler);
      return delayWhen_1.delayWhen(function() {
        return duration;
      });
    }
    exports$1.delay = delay;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/dematerialize.js
var require_dematerialize = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/dematerialize.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.dematerialize = void 0;
    var Notification_1 = require_Notification();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function dematerialize() {
      return lift_1.operate(function(source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(notification) {
          return Notification_1.observeNotification(notification, subscriber);
        }));
      });
    }
    exports$1.dematerialize = dematerialize;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/distinct.js
var require_distinct = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/distinct.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.distinct = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    var innerFrom_1 = require_innerFrom();
    function distinct(keySelector, flushes) {
      return lift_1.operate(function(source, subscriber) {
        var distinctKeys = /* @__PURE__ */ new Set();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var key = keySelector ? keySelector(value) : value;
          if (!distinctKeys.has(key)) {
            distinctKeys.add(key);
            subscriber.next(value);
          }
        }));
        flushes && innerFrom_1.innerFrom(flushes).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          return distinctKeys.clear();
        }, noop_1.noop));
      });
    }
    exports$1.distinct = distinct;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/distinctUntilChanged.js
var require_distinctUntilChanged = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/distinctUntilChanged.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.distinctUntilChanged = void 0;
    var identity_1 = require_identity();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function distinctUntilChanged(comparator, keySelector) {
      if (keySelector === void 0) {
        keySelector = identity_1.identity;
      }
      comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
      return lift_1.operate(function(source, subscriber) {
        var previousKey;
        var first = true;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var currentKey = keySelector(value);
          if (first || !comparator(previousKey, currentKey)) {
            first = false;
            previousKey = currentKey;
            subscriber.next(value);
          }
        }));
      });
    }
    exports$1.distinctUntilChanged = distinctUntilChanged;
    function defaultCompare(a, b) {
      return a === b;
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/distinctUntilKeyChanged.js
var require_distinctUntilKeyChanged = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/distinctUntilKeyChanged.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.distinctUntilKeyChanged = void 0;
    var distinctUntilChanged_1 = require_distinctUntilChanged();
    function distinctUntilKeyChanged(key, compare) {
      return distinctUntilChanged_1.distinctUntilChanged(function(x, y) {
        return compare ? compare(x[key], y[key]) : x[key] === y[key];
      });
    }
    exports$1.distinctUntilKeyChanged = distinctUntilKeyChanged;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/throwIfEmpty.js
var require_throwIfEmpty = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/throwIfEmpty.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.throwIfEmpty = void 0;
    var EmptyError_1 = require_EmptyError();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function throwIfEmpty(errorFactory) {
      if (errorFactory === void 0) {
        errorFactory = defaultErrorFactory;
      }
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          hasValue = true;
          subscriber.next(value);
        }, function() {
          return hasValue ? subscriber.complete() : subscriber.error(errorFactory());
        }));
      });
    }
    exports$1.throwIfEmpty = throwIfEmpty;
    function defaultErrorFactory() {
      return new EmptyError_1.EmptyError();
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/elementAt.js
var require_elementAt = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/elementAt.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.elementAt = void 0;
    var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
    var filter_1 = require_filter();
    var throwIfEmpty_1 = require_throwIfEmpty();
    var defaultIfEmpty_1 = require_defaultIfEmpty();
    var take_1 = require_take();
    function elementAt(index, defaultValue) {
      if (index < 0) {
        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
      }
      var hasDefaultValue = arguments.length >= 2;
      return function(source) {
        return source.pipe(filter_1.filter(function(v, i) {
          return i === index;
        }), take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
          return new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError();
        }));
      };
    }
    exports$1.elementAt = elementAt;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/endWith.js
var require_endWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/endWith.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.endWith = void 0;
    var concat_1 = require_concat();
    var of_1 = require_of();
    function endWith() {
      var values = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
      }
      return function(source) {
        return concat_1.concat(source, of_1.of.apply(void 0, __spreadArray([], __read(values))));
      };
    }
    exports$1.endWith = endWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/every.js
var require_every = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/every.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.every = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function every(predicate, thisArg) {
      return lift_1.operate(function(source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          if (!predicate.call(thisArg, value, index++, source)) {
            subscriber.next(false);
            subscriber.complete();
          }
        }, function() {
          subscriber.next(true);
          subscriber.complete();
        }));
      });
    }
    exports$1.every = every;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/exhaustMap.js
var require_exhaustMap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/exhaustMap.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.exhaustMap = void 0;
    var map_1 = require_map();
    var innerFrom_1 = require_innerFrom();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function exhaustMap(project, resultSelector) {
      if (resultSelector) {
        return function(source) {
          return source.pipe(exhaustMap(function(a, i) {
            return innerFrom_1.innerFrom(project(a, i)).pipe(map_1.map(function(b, ii) {
              return resultSelector(a, b, i, ii);
            }));
          }));
        };
      }
      return lift_1.operate(function(source, subscriber) {
        var index = 0;
        var innerSub = null;
        var isComplete = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(outerValue) {
          if (!innerSub) {
            innerSub = OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
              innerSub = null;
              isComplete && subscriber.complete();
            });
            innerFrom_1.innerFrom(project(outerValue, index++)).subscribe(innerSub);
          }
        }, function() {
          isComplete = true;
          !innerSub && subscriber.complete();
        }));
      });
    }
    exports$1.exhaustMap = exhaustMap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/exhaustAll.js
var require_exhaustAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/exhaustAll.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.exhaustAll = void 0;
    var exhaustMap_1 = require_exhaustMap();
    var identity_1 = require_identity();
    function exhaustAll() {
      return exhaustMap_1.exhaustMap(identity_1.identity);
    }
    exports$1.exhaustAll = exhaustAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/exhaust.js
var require_exhaust = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/exhaust.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.exhaust = void 0;
    var exhaustAll_1 = require_exhaustAll();
    exports$1.exhaust = exhaustAll_1.exhaustAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/expand.js
var require_expand = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/expand.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.expand = void 0;
    var lift_1 = require_lift();
    var mergeInternals_1 = require_mergeInternals();
    function expand(project, concurrent, scheduler) {
      if (concurrent === void 0) {
        concurrent = Infinity;
      }
      concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
      return lift_1.operate(function(source, subscriber) {
        return mergeInternals_1.mergeInternals(source, subscriber, project, concurrent, void 0, true, scheduler);
      });
    }
    exports$1.expand = expand;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/finalize.js
var require_finalize = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/finalize.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.finalize = void 0;
    var lift_1 = require_lift();
    function finalize(callback) {
      return lift_1.operate(function(source, subscriber) {
        try {
          source.subscribe(subscriber);
        } finally {
          subscriber.add(callback);
        }
      });
    }
    exports$1.finalize = finalize;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/find.js
var require_find = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/find.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.createFind = exports$1.find = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function find(predicate, thisArg) {
      return lift_1.operate(createFind(predicate, thisArg, "value"));
    }
    exports$1.find = find;
    function createFind(predicate, thisArg, emit) {
      var findIndex = emit === "index";
      return function(source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var i = index++;
          if (predicate.call(thisArg, value, i, source)) {
            subscriber.next(findIndex ? i : value);
            subscriber.complete();
          }
        }, function() {
          subscriber.next(findIndex ? -1 : void 0);
          subscriber.complete();
        }));
      };
    }
    exports$1.createFind = createFind;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/findIndex.js
var require_findIndex = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/findIndex.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.findIndex = void 0;
    var lift_1 = require_lift();
    var find_1 = require_find();
    function findIndex(predicate, thisArg) {
      return lift_1.operate(find_1.createFind(predicate, thisArg, "index"));
    }
    exports$1.findIndex = findIndex;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/first.js
var require_first = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/first.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.first = void 0;
    var EmptyError_1 = require_EmptyError();
    var filter_1 = require_filter();
    var take_1 = require_take();
    var defaultIfEmpty_1 = require_defaultIfEmpty();
    var throwIfEmpty_1 = require_throwIfEmpty();
    var identity_1 = require_identity();
    function first(predicate, defaultValue) {
      var hasDefaultValue = arguments.length >= 2;
      return function(source) {
        return source.pipe(predicate ? filter_1.filter(function(v, i) {
          return predicate(v, i, source);
        }) : identity_1.identity, take_1.take(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
          return new EmptyError_1.EmptyError();
        }));
      };
    }
    exports$1.first = first;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/groupBy.js
var require_groupBy = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/groupBy.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.groupBy = void 0;
    var Observable_1 = require_Observable();
    var innerFrom_1 = require_innerFrom();
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function groupBy(keySelector, elementOrOptions, duration, connector) {
      return lift_1.operate(function(source, subscriber) {
        var element;
        if (!elementOrOptions || typeof elementOrOptions === "function") {
          element = elementOrOptions;
        } else {
          duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector;
        }
        var groups = /* @__PURE__ */ new Map();
        var notify = function(cb) {
          groups.forEach(cb);
          cb(subscriber);
        };
        var handleError = function(err) {
          return notify(function(consumer) {
            return consumer.error(err);
          });
        };
        var activeGroups = 0;
        var teardownAttempted = false;
        var groupBySourceSubscriber = new OperatorSubscriber_1.OperatorSubscriber(subscriber, function(value) {
          try {
            var key_1 = keySelector(value);
            var group_1 = groups.get(key_1);
            if (!group_1) {
              groups.set(key_1, group_1 = connector ? connector() : new Subject_1.Subject());
              var grouped = createGroupedObservable(key_1, group_1);
              subscriber.next(grouped);
              if (duration) {
                var durationSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(group_1, function() {
                  group_1.complete();
                  durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
                }, void 0, void 0, function() {
                  return groups.delete(key_1);
                });
                groupBySourceSubscriber.add(innerFrom_1.innerFrom(duration(grouped)).subscribe(durationSubscriber_1));
              }
            }
            group_1.next(element ? element(value) : value);
          } catch (err) {
            handleError(err);
          }
        }, function() {
          return notify(function(consumer) {
            return consumer.complete();
          });
        }, handleError, function() {
          return groups.clear();
        }, function() {
          teardownAttempted = true;
          return activeGroups === 0;
        });
        source.subscribe(groupBySourceSubscriber);
        function createGroupedObservable(key, groupSubject) {
          var result = new Observable_1.Observable(function(groupSubscriber) {
            activeGroups++;
            var innerSub = groupSubject.subscribe(groupSubscriber);
            return function() {
              innerSub.unsubscribe();
              --activeGroups === 0 && teardownAttempted && groupBySourceSubscriber.unsubscribe();
            };
          });
          result.key = key;
          return result;
        }
      });
    }
    exports$1.groupBy = groupBy;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/isEmpty.js
var require_isEmpty = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/isEmpty.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.isEmpty = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function isEmpty() {
      return lift_1.operate(function(source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          subscriber.next(false);
          subscriber.complete();
        }, function() {
          subscriber.next(true);
          subscriber.complete();
        }));
      });
    }
    exports$1.isEmpty = isEmpty;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/takeLast.js
var require_takeLast = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/takeLast.js"(exports$1) {
    var __values = exports$1 && exports$1.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.takeLast = void 0;
    var empty_1 = require_empty();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function takeLast(count) {
      return count <= 0 ? function() {
        return empty_1.EMPTY;
      } : lift_1.operate(function(source, subscriber) {
        var buffer = [];
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          buffer.push(value);
          count < buffer.length && buffer.shift();
        }, function() {
          var e_1, _a;
          try {
            for (var buffer_1 = __values(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
              var value = buffer_1_1.value;
              subscriber.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          subscriber.complete();
        }, void 0, function() {
          buffer = null;
        }));
      });
    }
    exports$1.takeLast = takeLast;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/last.js
var require_last = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/last.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.last = void 0;
    var EmptyError_1 = require_EmptyError();
    var filter_1 = require_filter();
    var takeLast_1 = require_takeLast();
    var throwIfEmpty_1 = require_throwIfEmpty();
    var defaultIfEmpty_1 = require_defaultIfEmpty();
    var identity_1 = require_identity();
    function last(predicate, defaultValue) {
      var hasDefaultValue = arguments.length >= 2;
      return function(source) {
        return source.pipe(predicate ? filter_1.filter(function(v, i) {
          return predicate(v, i, source);
        }) : identity_1.identity, takeLast_1.takeLast(1), hasDefaultValue ? defaultIfEmpty_1.defaultIfEmpty(defaultValue) : throwIfEmpty_1.throwIfEmpty(function() {
          return new EmptyError_1.EmptyError();
        }));
      };
    }
    exports$1.last = last;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/materialize.js
var require_materialize = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/materialize.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.materialize = void 0;
    var Notification_1 = require_Notification();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function materialize() {
      return lift_1.operate(function(source, subscriber) {
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          subscriber.next(Notification_1.Notification.createNext(value));
        }, function() {
          subscriber.next(Notification_1.Notification.createComplete());
          subscriber.complete();
        }, function(err) {
          subscriber.next(Notification_1.Notification.createError(err));
          subscriber.complete();
        }));
      });
    }
    exports$1.materialize = materialize;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/max.js
var require_max = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/max.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.max = void 0;
    var reduce_1 = require_reduce();
    var isFunction_1 = require_isFunction();
    function max(comparer) {
      return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function(x, y) {
        return comparer(x, y) > 0 ? x : y;
      } : function(x, y) {
        return x > y ? x : y;
      });
    }
    exports$1.max = max;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/flatMap.js
var require_flatMap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/flatMap.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.flatMap = void 0;
    var mergeMap_1 = require_mergeMap();
    exports$1.flatMap = mergeMap_1.mergeMap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeMapTo.js
var require_mergeMapTo = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeMapTo.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.mergeMapTo = void 0;
    var mergeMap_1 = require_mergeMap();
    var isFunction_1 = require_isFunction();
    function mergeMapTo(innerObservable, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Infinity;
      }
      if (isFunction_1.isFunction(resultSelector)) {
        return mergeMap_1.mergeMap(function() {
          return innerObservable;
        }, resultSelector, concurrent);
      }
      if (typeof resultSelector === "number") {
        concurrent = resultSelector;
      }
      return mergeMap_1.mergeMap(function() {
        return innerObservable;
      }, concurrent);
    }
    exports$1.mergeMapTo = mergeMapTo;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeScan.js
var require_mergeScan = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeScan.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.mergeScan = void 0;
    var lift_1 = require_lift();
    var mergeInternals_1 = require_mergeInternals();
    function mergeScan(accumulator, seed, concurrent) {
      if (concurrent === void 0) {
        concurrent = Infinity;
      }
      return lift_1.operate(function(source, subscriber) {
        var state = seed;
        return mergeInternals_1.mergeInternals(source, subscriber, function(value, index) {
          return accumulator(state, value, index);
        }, concurrent, function(value) {
          state = value;
        }, false, void 0, function() {
          return state = null;
        });
      });
    }
    exports$1.mergeScan = mergeScan;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/merge.js
var require_merge2 = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/merge.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.merge = void 0;
    var lift_1 = require_lift();
    var mergeAll_1 = require_mergeAll();
    var args_1 = require_args();
    var from_1 = require_from();
    function merge() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(args);
      var concurrent = args_1.popNumber(args, Infinity);
      return lift_1.operate(function(source, subscriber) {
        mergeAll_1.mergeAll(concurrent)(from_1.from(__spreadArray([source], __read(args)), scheduler)).subscribe(subscriber);
      });
    }
    exports$1.merge = merge;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/mergeWith.js
var require_mergeWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/mergeWith.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.mergeWith = void 0;
    var merge_1 = require_merge2();
    function mergeWith() {
      var otherSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
      }
      return merge_1.merge.apply(void 0, __spreadArray([], __read(otherSources)));
    }
    exports$1.mergeWith = mergeWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/min.js
var require_min = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/min.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.min = void 0;
    var reduce_1 = require_reduce();
    var isFunction_1 = require_isFunction();
    function min(comparer) {
      return reduce_1.reduce(isFunction_1.isFunction(comparer) ? function(x, y) {
        return comparer(x, y) < 0 ? x : y;
      } : function(x, y) {
        return x < y ? x : y;
      });
    }
    exports$1.min = min;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/multicast.js
var require_multicast = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/multicast.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.multicast = void 0;
    var ConnectableObservable_1 = require_ConnectableObservable();
    var isFunction_1 = require_isFunction();
    var connect_1 = require_connect();
    function multicast(subjectOrSubjectFactory, selector) {
      var subjectFactory = isFunction_1.isFunction(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function() {
        return subjectOrSubjectFactory;
      };
      if (isFunction_1.isFunction(selector)) {
        return connect_1.connect(selector, {
          connector: subjectFactory
        });
      }
      return function(source) {
        return new ConnectableObservable_1.ConnectableObservable(source, subjectFactory);
      };
    }
    exports$1.multicast = multicast;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/onErrorResumeNextWith.js
var require_onErrorResumeNextWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/onErrorResumeNextWith.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.onErrorResumeNext = exports$1.onErrorResumeNextWith = void 0;
    var argsOrArgArray_1 = require_argsOrArgArray();
    var onErrorResumeNext_1 = require_onErrorResumeNext();
    function onErrorResumeNextWith() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      var nextSources = argsOrArgArray_1.argsOrArgArray(sources);
      return function(source) {
        return onErrorResumeNext_1.onErrorResumeNext.apply(void 0, __spreadArray([source], __read(nextSources)));
      };
    }
    exports$1.onErrorResumeNextWith = onErrorResumeNextWith;
    exports$1.onErrorResumeNext = onErrorResumeNextWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/pairwise.js
var require_pairwise = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/pairwise.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.pairwise = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function pairwise() {
      return lift_1.operate(function(source, subscriber) {
        var prev;
        var hasPrev = false;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var p = prev;
          prev = value;
          hasPrev && subscriber.next([p, value]);
          hasPrev = true;
        }));
      });
    }
    exports$1.pairwise = pairwise;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/pluck.js
var require_pluck = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/pluck.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.pluck = void 0;
    var map_1 = require_map();
    function pluck() {
      var properties = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        properties[_i] = arguments[_i];
      }
      var length = properties.length;
      if (length === 0) {
        throw new Error("list of properties cannot be empty.");
      }
      return map_1.map(function(x) {
        var currentProp = x;
        for (var i = 0; i < length; i++) {
          var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];
          if (typeof p !== "undefined") {
            currentProp = p;
          } else {
            return void 0;
          }
        }
        return currentProp;
      });
    }
    exports$1.pluck = pluck;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/publish.js
var require_publish = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/publish.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.publish = void 0;
    var Subject_1 = require_Subject();
    var multicast_1 = require_multicast();
    var connect_1 = require_connect();
    function publish(selector) {
      return selector ? function(source) {
        return connect_1.connect(selector)(source);
      } : function(source) {
        return multicast_1.multicast(new Subject_1.Subject())(source);
      };
    }
    exports$1.publish = publish;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/publishBehavior.js
var require_publishBehavior = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/publishBehavior.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.publishBehavior = void 0;
    var BehaviorSubject_1 = require_BehaviorSubject();
    var ConnectableObservable_1 = require_ConnectableObservable();
    function publishBehavior(initialValue) {
      return function(source) {
        var subject = new BehaviorSubject_1.BehaviorSubject(initialValue);
        return new ConnectableObservable_1.ConnectableObservable(source, function() {
          return subject;
        });
      };
    }
    exports$1.publishBehavior = publishBehavior;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/publishLast.js
var require_publishLast = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/publishLast.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.publishLast = void 0;
    var AsyncSubject_1 = require_AsyncSubject();
    var ConnectableObservable_1 = require_ConnectableObservable();
    function publishLast() {
      return function(source) {
        var subject = new AsyncSubject_1.AsyncSubject();
        return new ConnectableObservable_1.ConnectableObservable(source, function() {
          return subject;
        });
      };
    }
    exports$1.publishLast = publishLast;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/publishReplay.js
var require_publishReplay = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/publishReplay.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.publishReplay = void 0;
    var ReplaySubject_1 = require_ReplaySubject();
    var multicast_1 = require_multicast();
    var isFunction_1 = require_isFunction();
    function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
      if (selectorOrScheduler && !isFunction_1.isFunction(selectorOrScheduler)) {
        timestampProvider = selectorOrScheduler;
      }
      var selector = isFunction_1.isFunction(selectorOrScheduler) ? selectorOrScheduler : void 0;
      return function(source) {
        return multicast_1.multicast(new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source);
      };
    }
    exports$1.publishReplay = publishReplay;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/raceWith.js
var require_raceWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/raceWith.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.raceWith = void 0;
    var race_1 = require_race();
    var lift_1 = require_lift();
    var identity_1 = require_identity();
    function raceWith() {
      var otherSources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        otherSources[_i] = arguments[_i];
      }
      return !otherSources.length ? identity_1.identity : lift_1.operate(function(source, subscriber) {
        race_1.raceInit(__spreadArray([source], __read(otherSources)))(subscriber);
      });
    }
    exports$1.raceWith = raceWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/repeat.js
var require_repeat = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/repeat.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.repeat = void 0;
    var empty_1 = require_empty();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    var timer_1 = require_timer();
    function repeat(countOrConfig) {
      var _a;
      var count = Infinity;
      var delay;
      if (countOrConfig != null) {
        if (typeof countOrConfig === "object") {
          _a = countOrConfig.count, count = _a === void 0 ? Infinity : _a, delay = countOrConfig.delay;
        } else {
          count = countOrConfig;
        }
      }
      return count <= 0 ? function() {
        return empty_1.EMPTY;
      } : lift_1.operate(function(source, subscriber) {
        var soFar = 0;
        var sourceSub;
        var resubscribe = function() {
          sourceSub === null || sourceSub === void 0 ? void 0 : sourceSub.unsubscribe();
          sourceSub = null;
          if (delay != null) {
            var notifier = typeof delay === "number" ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(soFar));
            var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
              notifierSubscriber_1.unsubscribe();
              subscribeToSource();
            });
            notifier.subscribe(notifierSubscriber_1);
          } else {
            subscribeToSource();
          }
        };
        var subscribeToSource = function() {
          var syncUnsub = false;
          sourceSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
            if (++soFar < count) {
              if (sourceSub) {
                resubscribe();
              } else {
                syncUnsub = true;
              }
            } else {
              subscriber.complete();
            }
          }));
          if (syncUnsub) {
            resubscribe();
          }
        };
        subscribeToSource();
      });
    }
    exports$1.repeat = repeat;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/repeatWhen.js
var require_repeatWhen = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/repeatWhen.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.repeatWhen = void 0;
    var innerFrom_1 = require_innerFrom();
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function repeatWhen(notifier) {
      return lift_1.operate(function(source, subscriber) {
        var innerSub;
        var syncResub = false;
        var completions$;
        var isNotifierComplete = false;
        var isMainComplete = false;
        var checkComplete = function() {
          return isMainComplete && isNotifierComplete && (subscriber.complete(), true);
        };
        var getCompletionSubject = function() {
          if (!completions$) {
            completions$ = new Subject_1.Subject();
            innerFrom_1.innerFrom(notifier(completions$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
              if (innerSub) {
                subscribeForRepeatWhen();
              } else {
                syncResub = true;
              }
            }, function() {
              isNotifierComplete = true;
              checkComplete();
            }));
          }
          return completions$;
        };
        var subscribeForRepeatWhen = function() {
          isMainComplete = false;
          innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, function() {
            isMainComplete = true;
            !checkComplete() && getCompletionSubject().next();
          }));
          if (syncResub) {
            innerSub.unsubscribe();
            innerSub = null;
            syncResub = false;
            subscribeForRepeatWhen();
          }
        };
        subscribeForRepeatWhen();
      });
    }
    exports$1.repeatWhen = repeatWhen;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/retry.js
var require_retry = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/retry.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.retry = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var identity_1 = require_identity();
    var timer_1 = require_timer();
    var innerFrom_1 = require_innerFrom();
    function retry(configOrCount) {
      if (configOrCount === void 0) {
        configOrCount = Infinity;
      }
      var config;
      if (configOrCount && typeof configOrCount === "object") {
        config = configOrCount;
      } else {
        config = {
          count: configOrCount
        };
      }
      var _a = config.count, count = _a === void 0 ? Infinity : _a, delay = config.delay, _b = config.resetOnSuccess, resetOnSuccess = _b === void 0 ? false : _b;
      return count <= 0 ? identity_1.identity : lift_1.operate(function(source, subscriber) {
        var soFar = 0;
        var innerSub;
        var subscribeForRetry = function() {
          var syncUnsub = false;
          innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            if (resetOnSuccess) {
              soFar = 0;
            }
            subscriber.next(value);
          }, void 0, function(err) {
            if (soFar++ < count) {
              var resub_1 = function() {
                if (innerSub) {
                  innerSub.unsubscribe();
                  innerSub = null;
                  subscribeForRetry();
                } else {
                  syncUnsub = true;
                }
              };
              if (delay != null) {
                var notifier = typeof delay === "number" ? timer_1.timer(delay) : innerFrom_1.innerFrom(delay(err, soFar));
                var notifierSubscriber_1 = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
                  notifierSubscriber_1.unsubscribe();
                  resub_1();
                }, function() {
                  subscriber.complete();
                });
                notifier.subscribe(notifierSubscriber_1);
              } else {
                resub_1();
              }
            } else {
              subscriber.error(err);
            }
          }));
          if (syncUnsub) {
            innerSub.unsubscribe();
            innerSub = null;
            subscribeForRetry();
          }
        };
        subscribeForRetry();
      });
    }
    exports$1.retry = retry;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/retryWhen.js
var require_retryWhen = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/retryWhen.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.retryWhen = void 0;
    var innerFrom_1 = require_innerFrom();
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function retryWhen(notifier) {
      return lift_1.operate(function(source, subscriber) {
        var innerSub;
        var syncResub = false;
        var errors$;
        var subscribeForRetryWhen = function() {
          innerSub = source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
            if (!errors$) {
              errors$ = new Subject_1.Subject();
              innerFrom_1.innerFrom(notifier(errors$)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
                return innerSub ? subscribeForRetryWhen() : syncResub = true;
              }));
            }
            if (errors$) {
              errors$.next(err);
            }
          }));
          if (syncResub) {
            innerSub.unsubscribe();
            innerSub = null;
            syncResub = false;
            subscribeForRetryWhen();
          }
        };
        subscribeForRetryWhen();
      });
    }
    exports$1.retryWhen = retryWhen;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/sample.js
var require_sample = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/sample.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.sample = void 0;
    var innerFrom_1 = require_innerFrom();
    var lift_1 = require_lift();
    var noop_1 = require_noop();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function sample(notifier) {
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        var lastValue = null;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          hasValue = true;
          lastValue = value;
        }));
        innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          if (hasValue) {
            hasValue = false;
            var value = lastValue;
            lastValue = null;
            subscriber.next(value);
          }
        }, noop_1.noop));
      });
    }
    exports$1.sample = sample;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/sampleTime.js
var require_sampleTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/sampleTime.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.sampleTime = void 0;
    var async_1 = require_async();
    var sample_1 = require_sample();
    var interval_1 = require_interval();
    function sampleTime(period, scheduler) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      return sample_1.sample(interval_1.interval(period, scheduler));
    }
    exports$1.sampleTime = sampleTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/scan.js
var require_scan = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/scan.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.scan = void 0;
    var lift_1 = require_lift();
    var scanInternals_1 = require_scanInternals();
    function scan(accumulator, seed) {
      return lift_1.operate(scanInternals_1.scanInternals(accumulator, seed, arguments.length >= 2, true));
    }
    exports$1.scan = scan;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/sequenceEqual.js
var require_sequenceEqual = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/sequenceEqual.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.sequenceEqual = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function sequenceEqual(compareTo, comparator) {
      if (comparator === void 0) {
        comparator = function(a, b) {
          return a === b;
        };
      }
      return lift_1.operate(function(source, subscriber) {
        var aState = createState();
        var bState = createState();
        var emit = function(isEqual) {
          subscriber.next(isEqual);
          subscriber.complete();
        };
        var createSubscriber = function(selfState, otherState) {
          var sequenceEqualSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(a) {
            var buffer = otherState.buffer, complete = otherState.complete;
            if (buffer.length === 0) {
              complete ? emit(false) : selfState.buffer.push(a);
            } else {
              !comparator(a, buffer.shift()) && emit(false);
            }
          }, function() {
            selfState.complete = true;
            var complete = otherState.complete, buffer = otherState.buffer;
            complete && emit(buffer.length === 0);
            sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
          });
          return sequenceEqualSubscriber;
        };
        source.subscribe(createSubscriber(aState, bState));
        innerFrom_1.innerFrom(compareTo).subscribe(createSubscriber(bState, aState));
      });
    }
    exports$1.sequenceEqual = sequenceEqual;
    function createState() {
      return {
        buffer: [],
        complete: false
      };
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/share.js
var require_share = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/share.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.share = void 0;
    var innerFrom_1 = require_innerFrom();
    var Subject_1 = require_Subject();
    var Subscriber_1 = require_Subscriber();
    var lift_1 = require_lift();
    function share(options) {
      if (options === void 0) {
        options = {};
      }
      var _a = options.connector, connector = _a === void 0 ? function() {
        return new Subject_1.Subject();
      } : _a, _b = options.resetOnError, resetOnError = _b === void 0 ? true : _b, _c = options.resetOnComplete, resetOnComplete = _c === void 0 ? true : _c, _d = options.resetOnRefCountZero, resetOnRefCountZero = _d === void 0 ? true : _d;
      return function(wrapperSource) {
        var connection;
        var resetConnection;
        var subject;
        var refCount = 0;
        var hasCompleted = false;
        var hasErrored = false;
        var cancelReset = function() {
          resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
          resetConnection = void 0;
        };
        var reset = function() {
          cancelReset();
          connection = subject = void 0;
          hasCompleted = hasErrored = false;
        };
        var resetAndUnsubscribe = function() {
          var conn = connection;
          reset();
          conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
        };
        return lift_1.operate(function(source, subscriber) {
          refCount++;
          if (!hasErrored && !hasCompleted) {
            cancelReset();
          }
          var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
          subscriber.add(function() {
            refCount--;
            if (refCount === 0 && !hasErrored && !hasCompleted) {
              resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
            }
          });
          dest.subscribe(subscriber);
          if (!connection && refCount > 0) {
            connection = new Subscriber_1.SafeSubscriber({
              next: function(value) {
                return dest.next(value);
              },
              error: function(err) {
                hasErrored = true;
                cancelReset();
                resetConnection = handleReset(reset, resetOnError, err);
                dest.error(err);
              },
              complete: function() {
                hasCompleted = true;
                cancelReset();
                resetConnection = handleReset(reset, resetOnComplete);
                dest.complete();
              }
            });
            innerFrom_1.innerFrom(source).subscribe(connection);
          }
        })(wrapperSource);
      };
    }
    exports$1.share = share;
    function handleReset(reset, on) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      if (on === true) {
        reset();
        return;
      }
      if (on === false) {
        return;
      }
      var onSubscriber = new Subscriber_1.SafeSubscriber({
        next: function() {
          onSubscriber.unsubscribe();
          reset();
        }
      });
      return innerFrom_1.innerFrom(on.apply(void 0, __spreadArray([], __read(args)))).subscribe(onSubscriber);
    }
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/shareReplay.js
var require_shareReplay = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/shareReplay.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.shareReplay = void 0;
    var ReplaySubject_1 = require_ReplaySubject();
    var share_1 = require_share();
    function shareReplay(configOrBufferSize, windowTime, scheduler) {
      var _a, _b, _c;
      var bufferSize;
      var refCount = false;
      if (configOrBufferSize && typeof configOrBufferSize === "object") {
        _a = configOrBufferSize.bufferSize, bufferSize = _a === void 0 ? Infinity : _a, _b = configOrBufferSize.windowTime, windowTime = _b === void 0 ? Infinity : _b, _c = configOrBufferSize.refCount, refCount = _c === void 0 ? false : _c, scheduler = configOrBufferSize.scheduler;
      } else {
        bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
      }
      return share_1.share({
        connector: function() {
          return new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler);
        },
        resetOnError: true,
        resetOnComplete: false,
        resetOnRefCountZero: refCount
      });
    }
    exports$1.shareReplay = shareReplay;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/single.js
var require_single = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/single.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.single = void 0;
    var EmptyError_1 = require_EmptyError();
    var SequenceError_1 = require_SequenceError();
    var NotFoundError_1 = require_NotFoundError();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function single(predicate) {
      return lift_1.operate(function(source, subscriber) {
        var hasValue = false;
        var singleValue;
        var seenValue = false;
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          seenValue = true;
          if (!predicate || predicate(value, index++, source)) {
            hasValue && subscriber.error(new SequenceError_1.SequenceError("Too many matching values"));
            hasValue = true;
            singleValue = value;
          }
        }, function() {
          if (hasValue) {
            subscriber.next(singleValue);
            subscriber.complete();
          } else {
            subscriber.error(seenValue ? new NotFoundError_1.NotFoundError("No matching values") : new EmptyError_1.EmptyError());
          }
        }));
      });
    }
    exports$1.single = single;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/skip.js
var require_skip = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/skip.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.skip = void 0;
    var filter_1 = require_filter();
    function skip(count) {
      return filter_1.filter(function(_, index) {
        return count <= index;
      });
    }
    exports$1.skip = skip;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/skipLast.js
var require_skipLast = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/skipLast.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.skipLast = void 0;
    var identity_1 = require_identity();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function skipLast(skipCount) {
      return skipCount <= 0 ? identity_1.identity : lift_1.operate(function(source, subscriber) {
        var ring = new Array(skipCount);
        var seen = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var valueIndex = seen++;
          if (valueIndex < skipCount) {
            ring[valueIndex] = value;
          } else {
            var index = valueIndex % skipCount;
            var oldValue = ring[index];
            ring[index] = value;
            subscriber.next(oldValue);
          }
        }));
        return function() {
          ring = null;
        };
      });
    }
    exports$1.skipLast = skipLast;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/skipUntil.js
var require_skipUntil = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/skipUntil.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.skipUntil = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    var noop_1 = require_noop();
    function skipUntil(notifier) {
      return lift_1.operate(function(source, subscriber) {
        var taking = false;
        var skipSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
          taking = true;
        }, noop_1.noop);
        innerFrom_1.innerFrom(notifier).subscribe(skipSubscriber);
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return taking && subscriber.next(value);
        }));
      });
    }
    exports$1.skipUntil = skipUntil;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/skipWhile.js
var require_skipWhile = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/skipWhile.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.skipWhile = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function skipWhile(predicate) {
      return lift_1.operate(function(source, subscriber) {
        var taking = false;
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return (taking || (taking = !predicate(value, index++))) && subscriber.next(value);
        }));
      });
    }
    exports$1.skipWhile = skipWhile;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/startWith.js
var require_startWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/startWith.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.startWith = void 0;
    var concat_1 = require_concat();
    var args_1 = require_args();
    var lift_1 = require_lift();
    function startWith() {
      var values = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
      }
      var scheduler = args_1.popScheduler(values);
      return lift_1.operate(function(source, subscriber) {
        (scheduler ? concat_1.concat(values, source, scheduler) : concat_1.concat(values, source)).subscribe(subscriber);
      });
    }
    exports$1.startWith = startWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/switchMap.js
var require_switchMap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/switchMap.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.switchMap = void 0;
    var innerFrom_1 = require_innerFrom();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function switchMap(project, resultSelector) {
      return lift_1.operate(function(source, subscriber) {
        var innerSubscriber = null;
        var index = 0;
        var isComplete = false;
        var checkComplete = function() {
          return isComplete && !innerSubscriber && subscriber.complete();
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
          var innerIndex = 0;
          var outerIndex = index++;
          innerFrom_1.innerFrom(project(value, outerIndex)).subscribe(innerSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(innerValue) {
            return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
          }, function() {
            innerSubscriber = null;
            checkComplete();
          }));
        }, function() {
          isComplete = true;
          checkComplete();
        }));
      });
    }
    exports$1.switchMap = switchMap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/switchAll.js
var require_switchAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/switchAll.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.switchAll = void 0;
    var switchMap_1 = require_switchMap();
    var identity_1 = require_identity();
    function switchAll() {
      return switchMap_1.switchMap(identity_1.identity);
    }
    exports$1.switchAll = switchAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/switchMapTo.js
var require_switchMapTo = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/switchMapTo.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.switchMapTo = void 0;
    var switchMap_1 = require_switchMap();
    var isFunction_1 = require_isFunction();
    function switchMapTo(innerObservable, resultSelector) {
      return isFunction_1.isFunction(resultSelector) ? switchMap_1.switchMap(function() {
        return innerObservable;
      }, resultSelector) : switchMap_1.switchMap(function() {
        return innerObservable;
      });
    }
    exports$1.switchMapTo = switchMapTo;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/switchScan.js
var require_switchScan = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/switchScan.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.switchScan = void 0;
    var switchMap_1 = require_switchMap();
    var lift_1 = require_lift();
    function switchScan(accumulator, seed) {
      return lift_1.operate(function(source, subscriber) {
        var state = seed;
        switchMap_1.switchMap(function(value, index) {
          return accumulator(state, value, index);
        }, function(_, innerValue) {
          return state = innerValue, innerValue;
        })(source).subscribe(subscriber);
        return function() {
          state = null;
        };
      });
    }
    exports$1.switchScan = switchScan;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/takeUntil.js
var require_takeUntil = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/takeUntil.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.takeUntil = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    var noop_1 = require_noop();
    function takeUntil(notifier) {
      return lift_1.operate(function(source, subscriber) {
        innerFrom_1.innerFrom(notifier).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          return subscriber.complete();
        }, noop_1.noop));
        !subscriber.closed && source.subscribe(subscriber);
      });
    }
    exports$1.takeUntil = takeUntil;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/takeWhile.js
var require_takeWhile = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/takeWhile.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.takeWhile = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function takeWhile(predicate, inclusive) {
      if (inclusive === void 0) {
        inclusive = false;
      }
      return lift_1.operate(function(source, subscriber) {
        var index = 0;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var result = predicate(value, index++);
          (result || inclusive) && subscriber.next(value);
          !result && subscriber.complete();
        }));
      });
    }
    exports$1.takeWhile = takeWhile;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/tap.js
var require_tap = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/tap.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.tap = void 0;
    var isFunction_1 = require_isFunction();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var identity_1 = require_identity();
    function tap(observerOrNext, error, complete) {
      var tapObserver = isFunction_1.isFunction(observerOrNext) || error || complete ? { next: observerOrNext, error, complete } : observerOrNext;
      return tapObserver ? lift_1.operate(function(source, subscriber) {
        var _a;
        (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
        var isUnsub = true;
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var _a2;
          (_a2 = tapObserver.next) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, value);
          subscriber.next(value);
        }, function() {
          var _a2;
          isUnsub = false;
          (_a2 = tapObserver.complete) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
          subscriber.complete();
        }, function(err) {
          var _a2;
          isUnsub = false;
          (_a2 = tapObserver.error) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver, err);
          subscriber.error(err);
        }, function() {
          var _a2, _b;
          if (isUnsub) {
            (_a2 = tapObserver.unsubscribe) === null || _a2 === void 0 ? void 0 : _a2.call(tapObserver);
          }
          (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
        }));
      }) : identity_1.identity;
    }
    exports$1.tap = tap;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/throttle.js
var require_throttle = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/throttle.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.throttle = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function throttle(durationSelector, config) {
      return lift_1.operate(function(source, subscriber) {
        var _a = config !== null && config !== void 0 ? config : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
        var hasValue = false;
        var sendValue = null;
        var throttled = null;
        var isComplete = false;
        var endThrottling = function() {
          throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
          throttled = null;
          if (trailing) {
            send();
            isComplete && subscriber.complete();
          }
        };
        var cleanupThrottling = function() {
          throttled = null;
          isComplete && subscriber.complete();
        };
        var startThrottle = function(value) {
          return throttled = innerFrom_1.innerFrom(durationSelector(value)).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
        };
        var send = function() {
          if (hasValue) {
            hasValue = false;
            var value = sendValue;
            sendValue = null;
            subscriber.next(value);
            !isComplete && startThrottle(value);
          }
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          hasValue = true;
          sendValue = value;
          !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
        }, function() {
          isComplete = true;
          !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
        }));
      });
    }
    exports$1.throttle = throttle;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/throttleTime.js
var require_throttleTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/throttleTime.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.throttleTime = void 0;
    var async_1 = require_async();
    var throttle_1 = require_throttle();
    var timer_1 = require_timer();
    function throttleTime(duration, scheduler, config) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      var duration$ = timer_1.timer(duration, scheduler);
      return throttle_1.throttle(function() {
        return duration$;
      }, config);
    }
    exports$1.throttleTime = throttleTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/timeInterval.js
var require_timeInterval = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/timeInterval.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.TimeInterval = exports$1.timeInterval = void 0;
    var async_1 = require_async();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function timeInterval(scheduler) {
      if (scheduler === void 0) {
        scheduler = async_1.asyncScheduler;
      }
      return lift_1.operate(function(source, subscriber) {
        var last = scheduler.now();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var now = scheduler.now();
          var interval = now - last;
          last = now;
          subscriber.next(new TimeInterval(value, interval));
        }));
      });
    }
    exports$1.timeInterval = timeInterval;
    var TimeInterval = /* @__PURE__ */ (function() {
      function TimeInterval2(value, interval) {
        this.value = value;
        this.interval = interval;
      }
      return TimeInterval2;
    })();
    exports$1.TimeInterval = TimeInterval;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/timeoutWith.js
var require_timeoutWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/timeoutWith.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.timeoutWith = void 0;
    var async_1 = require_async();
    var isDate_1 = require_isDate();
    var timeout_1 = require_timeout();
    function timeoutWith(due, withObservable, scheduler) {
      var first;
      var each;
      var _with;
      scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : async_1.async;
      if (isDate_1.isValidDate(due)) {
        first = due;
      } else if (typeof due === "number") {
        each = due;
      }
      if (withObservable) {
        _with = function() {
          return withObservable;
        };
      } else {
        throw new TypeError("No observable provided to switch to");
      }
      if (first == null && each == null) {
        throw new TypeError("No timeout provided.");
      }
      return timeout_1.timeout({
        first,
        each,
        scheduler,
        with: _with
      });
    }
    exports$1.timeoutWith = timeoutWith;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/timestamp.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.timestamp = void 0;
    var dateTimestampProvider_1 = require_dateTimestampProvider();
    var map_1 = require_map();
    function timestamp(timestampProvider) {
      if (timestampProvider === void 0) {
        timestampProvider = dateTimestampProvider_1.dateTimestampProvider;
      }
      return map_1.map(function(value) {
        return { value, timestamp: timestampProvider.now() };
      });
    }
    exports$1.timestamp = timestamp;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/window.js
var require_window = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/window.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.window = void 0;
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    var innerFrom_1 = require_innerFrom();
    function window(windowBoundaries) {
      return lift_1.operate(function(source, subscriber) {
        var windowSubject = new Subject_1.Subject();
        subscriber.next(windowSubject.asObservable());
        var errorHandler = function(err) {
          windowSubject.error(err);
          subscriber.error(err);
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value);
        }, function() {
          windowSubject.complete();
          subscriber.complete();
        }, errorHandler));
        innerFrom_1.innerFrom(windowBoundaries).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function() {
          windowSubject.complete();
          subscriber.next(windowSubject = new Subject_1.Subject());
        }, noop_1.noop, errorHandler));
        return function() {
          windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
          windowSubject = null;
        };
      });
    }
    exports$1.window = window;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/windowCount.js
var require_windowCount = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/windowCount.js"(exports$1) {
    var __values = exports$1 && exports$1.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.windowCount = void 0;
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    function windowCount(windowSize, startWindowEvery) {
      if (startWindowEvery === void 0) {
        startWindowEvery = 0;
      }
      var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
      return lift_1.operate(function(source, subscriber) {
        var windows = [new Subject_1.Subject()];
        var count = 0;
        subscriber.next(windows[0].asObservable());
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var e_1, _a;
          try {
            for (var windows_1 = __values(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
              var window_1 = windows_1_1.value;
              window_1.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
          var c = count - windowSize + 1;
          if (c >= 0 && c % startEvery === 0) {
            windows.shift().complete();
          }
          if (++count % startEvery === 0) {
            var window_2 = new Subject_1.Subject();
            windows.push(window_2);
            subscriber.next(window_2.asObservable());
          }
        }, function() {
          while (windows.length > 0) {
            windows.shift().complete();
          }
          subscriber.complete();
        }, function(err) {
          while (windows.length > 0) {
            windows.shift().error(err);
          }
          subscriber.error(err);
        }, function() {
          windows = null;
        }));
      });
    }
    exports$1.windowCount = windowCount;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/windowTime.js
var require_windowTime = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/windowTime.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.windowTime = void 0;
    var Subject_1 = require_Subject();
    var async_1 = require_async();
    var Subscription_1 = require_Subscription();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var arrRemove_1 = require_arrRemove();
    var args_1 = require_args();
    var executeSchedule_1 = require_executeSchedule();
    function windowTime(windowTimeSpan) {
      var _a, _b;
      var otherArgs = [];
      for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
      }
      var scheduler = (_a = args_1.popScheduler(otherArgs)) !== null && _a !== void 0 ? _a : async_1.asyncScheduler;
      var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
      var maxWindowSize = otherArgs[1] || Infinity;
      return lift_1.operate(function(source, subscriber) {
        var windowRecords = [];
        var restartOnClose = false;
        var closeWindow = function(record) {
          var window = record.window, subs = record.subs;
          window.complete();
          subs.unsubscribe();
          arrRemove_1.arrRemove(windowRecords, record);
          restartOnClose && startWindow();
        };
        var startWindow = function() {
          if (windowRecords) {
            var subs = new Subscription_1.Subscription();
            subscriber.add(subs);
            var window_1 = new Subject_1.Subject();
            var record_1 = {
              window: window_1,
              subs,
              seen: 0
            };
            windowRecords.push(record_1);
            subscriber.next(window_1.asObservable());
            executeSchedule_1.executeSchedule(subs, scheduler, function() {
              return closeWindow(record_1);
            }, windowTimeSpan);
          }
        };
        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
          executeSchedule_1.executeSchedule(subscriber, scheduler, startWindow, windowCreationInterval, true);
        } else {
          restartOnClose = true;
        }
        startWindow();
        var loop = function(cb) {
          return windowRecords.slice().forEach(cb);
        };
        var terminate = function(cb) {
          loop(function(_a2) {
            var window = _a2.window;
            return cb(window);
          });
          cb(subscriber);
          subscriber.unsubscribe();
        };
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          loop(function(record) {
            record.window.next(value);
            maxWindowSize <= ++record.seen && closeWindow(record);
          });
        }, function() {
          return terminate(function(consumer) {
            return consumer.complete();
          });
        }, function(err) {
          return terminate(function(consumer) {
            return consumer.error(err);
          });
        }));
        return function() {
          windowRecords = null;
        };
      });
    }
    exports$1.windowTime = windowTime;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/windowToggle.js
var require_windowToggle = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/windowToggle.js"(exports$1) {
    var __values = exports$1 && exports$1.__values || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
        next: function() {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.windowToggle = void 0;
    var Subject_1 = require_Subject();
    var Subscription_1 = require_Subscription();
    var lift_1 = require_lift();
    var innerFrom_1 = require_innerFrom();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var noop_1 = require_noop();
    var arrRemove_1 = require_arrRemove();
    function windowToggle(openings, closingSelector) {
      return lift_1.operate(function(source, subscriber) {
        var windows = [];
        var handleError = function(err) {
          while (0 < windows.length) {
            windows.shift().error(err);
          }
          subscriber.error(err);
        };
        innerFrom_1.innerFrom(openings).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(openValue) {
          var window = new Subject_1.Subject();
          windows.push(window);
          var closingSubscription = new Subscription_1.Subscription();
          var closeWindow = function() {
            arrRemove_1.arrRemove(windows, window);
            window.complete();
            closingSubscription.unsubscribe();
          };
          var closingNotifier;
          try {
            closingNotifier = innerFrom_1.innerFrom(closingSelector(openValue));
          } catch (err) {
            handleError(err);
            return;
          }
          subscriber.next(window.asObservable());
          closingSubscription.add(closingNotifier.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, closeWindow, noop_1.noop, handleError)));
        }, noop_1.noop));
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          var e_1, _a;
          var windowsCopy = windows.slice();
          try {
            for (var windowsCopy_1 = __values(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
              var window_1 = windowsCopy_1_1.value;
              window_1.next(value);
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        }, function() {
          while (0 < windows.length) {
            windows.shift().complete();
          }
          subscriber.complete();
        }, handleError, function() {
          while (0 < windows.length) {
            windows.shift().unsubscribe();
          }
        }));
      });
    }
    exports$1.windowToggle = windowToggle;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/windowWhen.js
var require_windowWhen = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/windowWhen.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.windowWhen = void 0;
    var Subject_1 = require_Subject();
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    function windowWhen(closingSelector) {
      return lift_1.operate(function(source, subscriber) {
        var window;
        var closingSubscriber;
        var handleError = function(err) {
          window.error(err);
          subscriber.error(err);
        };
        var openWindow = function() {
          closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
          window === null || window === void 0 ? void 0 : window.complete();
          window = new Subject_1.Subject();
          subscriber.next(window.asObservable());
          var closingNotifier;
          try {
            closingNotifier = innerFrom_1.innerFrom(closingSelector());
          } catch (err) {
            handleError(err);
            return;
          }
          closingNotifier.subscribe(closingSubscriber = OperatorSubscriber_1.createOperatorSubscriber(subscriber, openWindow, openWindow, handleError));
        };
        openWindow();
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          return window.next(value);
        }, function() {
          window.complete();
          subscriber.complete();
        }, handleError, function() {
          closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
          window = null;
        }));
      });
    }
    exports$1.windowWhen = windowWhen;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/withLatestFrom.js
var require_withLatestFrom = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/withLatestFrom.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.withLatestFrom = void 0;
    var lift_1 = require_lift();
    var OperatorSubscriber_1 = require_OperatorSubscriber();
    var innerFrom_1 = require_innerFrom();
    var identity_1 = require_identity();
    var noop_1 = require_noop();
    var args_1 = require_args();
    function withLatestFrom() {
      var inputs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
      }
      var project = args_1.popResultSelector(inputs);
      return lift_1.operate(function(source, subscriber) {
        var len = inputs.length;
        var otherValues = new Array(len);
        var hasValue = inputs.map(function() {
          return false;
        });
        var ready = false;
        var _loop_1 = function(i2) {
          innerFrom_1.innerFrom(inputs[i2]).subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
            otherValues[i2] = value;
            if (!ready && !hasValue[i2]) {
              hasValue[i2] = true;
              (ready = hasValue.every(identity_1.identity)) && (hasValue = null);
            }
          }, noop_1.noop));
        };
        for (var i = 0; i < len; i++) {
          _loop_1(i);
        }
        source.subscribe(OperatorSubscriber_1.createOperatorSubscriber(subscriber, function(value) {
          if (ready) {
            var values = __spreadArray([value], __read(otherValues));
            subscriber.next(project ? project.apply(void 0, __spreadArray([], __read(values))) : values);
          }
        }));
      });
    }
    exports$1.withLatestFrom = withLatestFrom;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/zipAll.js
var require_zipAll = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/zipAll.js"(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.zipAll = void 0;
    var zip_1 = require_zip();
    var joinAllInternals_1 = require_joinAllInternals();
    function zipAll(project) {
      return joinAllInternals_1.joinAllInternals(zip_1.zip, project);
    }
    exports$1.zipAll = zipAll;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/zip.js
var require_zip2 = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/zip.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.zip = void 0;
    var zip_1 = require_zip();
    var lift_1 = require_lift();
    function zip() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      return lift_1.operate(function(source, subscriber) {
        zip_1.zip.apply(void 0, __spreadArray([source], __read(sources))).subscribe(subscriber);
      });
    }
    exports$1.zip = zip;
  }
});

// node_modules/rxjs/dist/cjs/internal/operators/zipWith.js
var require_zipWith = __commonJS({
  "node_modules/rxjs/dist/cjs/internal/operators/zipWith.js"(exports$1) {
    var __read = exports$1 && exports$1.__read || function(o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      } catch (error) {
        e = { error };
      } finally {
        try {
          if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
          if (e) throw e.error;
        }
      }
      return ar;
    };
    var __spreadArray = exports$1 && exports$1.__spreadArray || function(to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
      return to;
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.zipWith = void 0;
    var zip_1 = require_zip2();
    function zipWith() {
      var otherInputs = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        otherInputs[_i] = arguments[_i];
      }
      return zip_1.zip.apply(void 0, __spreadArray([], __read(otherInputs)));
    }
    exports$1.zipWith = zipWith;
  }
});

// node_modules/rxjs/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/rxjs/dist/cjs/index.js"(exports$1) {
    var __createBinding = exports$1 && exports$1.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports$1 && exports$1.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports$1, "__esModule", { value: true });
    exports$1.interval = exports$1.iif = exports$1.generate = exports$1.fromEventPattern = exports$1.fromEvent = exports$1.from = exports$1.forkJoin = exports$1.empty = exports$1.defer = exports$1.connectable = exports$1.concat = exports$1.combineLatest = exports$1.bindNodeCallback = exports$1.bindCallback = exports$1.UnsubscriptionError = exports$1.TimeoutError = exports$1.SequenceError = exports$1.ObjectUnsubscribedError = exports$1.NotFoundError = exports$1.EmptyError = exports$1.ArgumentOutOfRangeError = exports$1.firstValueFrom = exports$1.lastValueFrom = exports$1.isObservable = exports$1.identity = exports$1.noop = exports$1.pipe = exports$1.NotificationKind = exports$1.Notification = exports$1.Subscriber = exports$1.Subscription = exports$1.Scheduler = exports$1.VirtualAction = exports$1.VirtualTimeScheduler = exports$1.animationFrameScheduler = exports$1.animationFrame = exports$1.queueScheduler = exports$1.queue = exports$1.asyncScheduler = exports$1.async = exports$1.asapScheduler = exports$1.asap = exports$1.AsyncSubject = exports$1.ReplaySubject = exports$1.BehaviorSubject = exports$1.Subject = exports$1.animationFrames = exports$1.observable = exports$1.ConnectableObservable = exports$1.Observable = void 0;
    exports$1.filter = exports$1.expand = exports$1.exhaustMap = exports$1.exhaustAll = exports$1.exhaust = exports$1.every = exports$1.endWith = exports$1.elementAt = exports$1.distinctUntilKeyChanged = exports$1.distinctUntilChanged = exports$1.distinct = exports$1.dematerialize = exports$1.delayWhen = exports$1.delay = exports$1.defaultIfEmpty = exports$1.debounceTime = exports$1.debounce = exports$1.count = exports$1.connect = exports$1.concatWith = exports$1.concatMapTo = exports$1.concatMap = exports$1.concatAll = exports$1.combineLatestWith = exports$1.combineLatestAll = exports$1.combineAll = exports$1.catchError = exports$1.bufferWhen = exports$1.bufferToggle = exports$1.bufferTime = exports$1.bufferCount = exports$1.buffer = exports$1.auditTime = exports$1.audit = exports$1.config = exports$1.NEVER = exports$1.EMPTY = exports$1.scheduled = exports$1.zip = exports$1.using = exports$1.timer = exports$1.throwError = exports$1.range = exports$1.race = exports$1.partition = exports$1.pairs = exports$1.onErrorResumeNext = exports$1.of = exports$1.never = exports$1.merge = void 0;
    exports$1.switchMap = exports$1.switchAll = exports$1.subscribeOn = exports$1.startWith = exports$1.skipWhile = exports$1.skipUntil = exports$1.skipLast = exports$1.skip = exports$1.single = exports$1.shareReplay = exports$1.share = exports$1.sequenceEqual = exports$1.scan = exports$1.sampleTime = exports$1.sample = exports$1.refCount = exports$1.retryWhen = exports$1.retry = exports$1.repeatWhen = exports$1.repeat = exports$1.reduce = exports$1.raceWith = exports$1.publishReplay = exports$1.publishLast = exports$1.publishBehavior = exports$1.publish = exports$1.pluck = exports$1.pairwise = exports$1.onErrorResumeNextWith = exports$1.observeOn = exports$1.multicast = exports$1.min = exports$1.mergeWith = exports$1.mergeScan = exports$1.mergeMapTo = exports$1.mergeMap = exports$1.flatMap = exports$1.mergeAll = exports$1.max = exports$1.materialize = exports$1.mapTo = exports$1.map = exports$1.last = exports$1.isEmpty = exports$1.ignoreElements = exports$1.groupBy = exports$1.first = exports$1.findIndex = exports$1.find = exports$1.finalize = void 0;
    exports$1.zipWith = exports$1.zipAll = exports$1.withLatestFrom = exports$1.windowWhen = exports$1.windowToggle = exports$1.windowTime = exports$1.windowCount = exports$1.window = exports$1.toArray = exports$1.timestamp = exports$1.timeoutWith = exports$1.timeout = exports$1.timeInterval = exports$1.throwIfEmpty = exports$1.throttleTime = exports$1.throttle = exports$1.tap = exports$1.takeWhile = exports$1.takeUntil = exports$1.takeLast = exports$1.take = exports$1.switchScan = exports$1.switchMapTo = void 0;
    var Observable_1 = require_Observable();
    Object.defineProperty(exports$1, "Observable", { enumerable: true, get: function() {
      return Observable_1.Observable;
    } });
    var ConnectableObservable_1 = require_ConnectableObservable();
    Object.defineProperty(exports$1, "ConnectableObservable", { enumerable: true, get: function() {
      return ConnectableObservable_1.ConnectableObservable;
    } });
    var observable_1 = require_observable();
    Object.defineProperty(exports$1, "observable", { enumerable: true, get: function() {
      return observable_1.observable;
    } });
    var animationFrames_1 = require_animationFrames();
    Object.defineProperty(exports$1, "animationFrames", { enumerable: true, get: function() {
      return animationFrames_1.animationFrames;
    } });
    var Subject_1 = require_Subject();
    Object.defineProperty(exports$1, "Subject", { enumerable: true, get: function() {
      return Subject_1.Subject;
    } });
    var BehaviorSubject_1 = require_BehaviorSubject();
    Object.defineProperty(exports$1, "BehaviorSubject", { enumerable: true, get: function() {
      return BehaviorSubject_1.BehaviorSubject;
    } });
    var ReplaySubject_1 = require_ReplaySubject();
    Object.defineProperty(exports$1, "ReplaySubject", { enumerable: true, get: function() {
      return ReplaySubject_1.ReplaySubject;
    } });
    var AsyncSubject_1 = require_AsyncSubject();
    Object.defineProperty(exports$1, "AsyncSubject", { enumerable: true, get: function() {
      return AsyncSubject_1.AsyncSubject;
    } });
    var asap_1 = require_asap();
    Object.defineProperty(exports$1, "asap", { enumerable: true, get: function() {
      return asap_1.asap;
    } });
    Object.defineProperty(exports$1, "asapScheduler", { enumerable: true, get: function() {
      return asap_1.asapScheduler;
    } });
    var async_1 = require_async();
    Object.defineProperty(exports$1, "async", { enumerable: true, get: function() {
      return async_1.async;
    } });
    Object.defineProperty(exports$1, "asyncScheduler", { enumerable: true, get: function() {
      return async_1.asyncScheduler;
    } });
    var queue_1 = require_queue();
    Object.defineProperty(exports$1, "queue", { enumerable: true, get: function() {
      return queue_1.queue;
    } });
    Object.defineProperty(exports$1, "queueScheduler", { enumerable: true, get: function() {
      return queue_1.queueScheduler;
    } });
    var animationFrame_1 = require_animationFrame();
    Object.defineProperty(exports$1, "animationFrame", { enumerable: true, get: function() {
      return animationFrame_1.animationFrame;
    } });
    Object.defineProperty(exports$1, "animationFrameScheduler", { enumerable: true, get: function() {
      return animationFrame_1.animationFrameScheduler;
    } });
    var VirtualTimeScheduler_1 = require_VirtualTimeScheduler();
    Object.defineProperty(exports$1, "VirtualTimeScheduler", { enumerable: true, get: function() {
      return VirtualTimeScheduler_1.VirtualTimeScheduler;
    } });
    Object.defineProperty(exports$1, "VirtualAction", { enumerable: true, get: function() {
      return VirtualTimeScheduler_1.VirtualAction;
    } });
    var Scheduler_1 = require_Scheduler();
    Object.defineProperty(exports$1, "Scheduler", { enumerable: true, get: function() {
      return Scheduler_1.Scheduler;
    } });
    var Subscription_1 = require_Subscription();
    Object.defineProperty(exports$1, "Subscription", { enumerable: true, get: function() {
      return Subscription_1.Subscription;
    } });
    var Subscriber_1 = require_Subscriber();
    Object.defineProperty(exports$1, "Subscriber", { enumerable: true, get: function() {
      return Subscriber_1.Subscriber;
    } });
    var Notification_1 = require_Notification();
    Object.defineProperty(exports$1, "Notification", { enumerable: true, get: function() {
      return Notification_1.Notification;
    } });
    Object.defineProperty(exports$1, "NotificationKind", { enumerable: true, get: function() {
      return Notification_1.NotificationKind;
    } });
    var pipe_1 = require_pipe();
    Object.defineProperty(exports$1, "pipe", { enumerable: true, get: function() {
      return pipe_1.pipe;
    } });
    var noop_1 = require_noop();
    Object.defineProperty(exports$1, "noop", { enumerable: true, get: function() {
      return noop_1.noop;
    } });
    var identity_1 = require_identity();
    Object.defineProperty(exports$1, "identity", { enumerable: true, get: function() {
      return identity_1.identity;
    } });
    var isObservable_1 = require_isObservable();
    Object.defineProperty(exports$1, "isObservable", { enumerable: true, get: function() {
      return isObservable_1.isObservable;
    } });
    var lastValueFrom_1 = require_lastValueFrom();
    Object.defineProperty(exports$1, "lastValueFrom", { enumerable: true, get: function() {
      return lastValueFrom_1.lastValueFrom;
    } });
    var firstValueFrom_1 = require_firstValueFrom();
    Object.defineProperty(exports$1, "firstValueFrom", { enumerable: true, get: function() {
      return firstValueFrom_1.firstValueFrom;
    } });
    var ArgumentOutOfRangeError_1 = require_ArgumentOutOfRangeError();
    Object.defineProperty(exports$1, "ArgumentOutOfRangeError", { enumerable: true, get: function() {
      return ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
    } });
    var EmptyError_1 = require_EmptyError();
    Object.defineProperty(exports$1, "EmptyError", { enumerable: true, get: function() {
      return EmptyError_1.EmptyError;
    } });
    var NotFoundError_1 = require_NotFoundError();
    Object.defineProperty(exports$1, "NotFoundError", { enumerable: true, get: function() {
      return NotFoundError_1.NotFoundError;
    } });
    var ObjectUnsubscribedError_1 = require_ObjectUnsubscribedError();
    Object.defineProperty(exports$1, "ObjectUnsubscribedError", { enumerable: true, get: function() {
      return ObjectUnsubscribedError_1.ObjectUnsubscribedError;
    } });
    var SequenceError_1 = require_SequenceError();
    Object.defineProperty(exports$1, "SequenceError", { enumerable: true, get: function() {
      return SequenceError_1.SequenceError;
    } });
    var timeout_1 = require_timeout();
    Object.defineProperty(exports$1, "TimeoutError", { enumerable: true, get: function() {
      return timeout_1.TimeoutError;
    } });
    var UnsubscriptionError_1 = require_UnsubscriptionError();
    Object.defineProperty(exports$1, "UnsubscriptionError", { enumerable: true, get: function() {
      return UnsubscriptionError_1.UnsubscriptionError;
    } });
    var bindCallback_1 = require_bindCallback();
    Object.defineProperty(exports$1, "bindCallback", { enumerable: true, get: function() {
      return bindCallback_1.bindCallback;
    } });
    var bindNodeCallback_1 = require_bindNodeCallback();
    Object.defineProperty(exports$1, "bindNodeCallback", { enumerable: true, get: function() {
      return bindNodeCallback_1.bindNodeCallback;
    } });
    var combineLatest_1 = require_combineLatest();
    Object.defineProperty(exports$1, "combineLatest", { enumerable: true, get: function() {
      return combineLatest_1.combineLatest;
    } });
    var concat_1 = require_concat();
    Object.defineProperty(exports$1, "concat", { enumerable: true, get: function() {
      return concat_1.concat;
    } });
    var connectable_1 = require_connectable();
    Object.defineProperty(exports$1, "connectable", { enumerable: true, get: function() {
      return connectable_1.connectable;
    } });
    var defer_1 = require_defer();
    Object.defineProperty(exports$1, "defer", { enumerable: true, get: function() {
      return defer_1.defer;
    } });
    var empty_1 = require_empty();
    Object.defineProperty(exports$1, "empty", { enumerable: true, get: function() {
      return empty_1.empty;
    } });
    var forkJoin_1 = require_forkJoin();
    Object.defineProperty(exports$1, "forkJoin", { enumerable: true, get: function() {
      return forkJoin_1.forkJoin;
    } });
    var from_1 = require_from();
    Object.defineProperty(exports$1, "from", { enumerable: true, get: function() {
      return from_1.from;
    } });
    var fromEvent_1 = require_fromEvent();
    Object.defineProperty(exports$1, "fromEvent", { enumerable: true, get: function() {
      return fromEvent_1.fromEvent;
    } });
    var fromEventPattern_1 = require_fromEventPattern();
    Object.defineProperty(exports$1, "fromEventPattern", { enumerable: true, get: function() {
      return fromEventPattern_1.fromEventPattern;
    } });
    var generate_1 = require_generate();
    Object.defineProperty(exports$1, "generate", { enumerable: true, get: function() {
      return generate_1.generate;
    } });
    var iif_1 = require_iif();
    Object.defineProperty(exports$1, "iif", { enumerable: true, get: function() {
      return iif_1.iif;
    } });
    var interval_1 = require_interval();
    Object.defineProperty(exports$1, "interval", { enumerable: true, get: function() {
      return interval_1.interval;
    } });
    var merge_1 = require_merge();
    Object.defineProperty(exports$1, "merge", { enumerable: true, get: function() {
      return merge_1.merge;
    } });
    var never_1 = require_never();
    Object.defineProperty(exports$1, "never", { enumerable: true, get: function() {
      return never_1.never;
    } });
    var of_1 = require_of();
    Object.defineProperty(exports$1, "of", { enumerable: true, get: function() {
      return of_1.of;
    } });
    var onErrorResumeNext_1 = require_onErrorResumeNext();
    Object.defineProperty(exports$1, "onErrorResumeNext", { enumerable: true, get: function() {
      return onErrorResumeNext_1.onErrorResumeNext;
    } });
    var pairs_1 = require_pairs();
    Object.defineProperty(exports$1, "pairs", { enumerable: true, get: function() {
      return pairs_1.pairs;
    } });
    var partition_1 = require_partition();
    Object.defineProperty(exports$1, "partition", { enumerable: true, get: function() {
      return partition_1.partition;
    } });
    var race_1 = require_race();
    Object.defineProperty(exports$1, "race", { enumerable: true, get: function() {
      return race_1.race;
    } });
    var range_1 = require_range();
    Object.defineProperty(exports$1, "range", { enumerable: true, get: function() {
      return range_1.range;
    } });
    var throwError_1 = require_throwError();
    Object.defineProperty(exports$1, "throwError", { enumerable: true, get: function() {
      return throwError_1.throwError;
    } });
    var timer_1 = require_timer();
    Object.defineProperty(exports$1, "timer", { enumerable: true, get: function() {
      return timer_1.timer;
    } });
    var using_1 = require_using();
    Object.defineProperty(exports$1, "using", { enumerable: true, get: function() {
      return using_1.using;
    } });
    var zip_1 = require_zip();
    Object.defineProperty(exports$1, "zip", { enumerable: true, get: function() {
      return zip_1.zip;
    } });
    var scheduled_1 = require_scheduled();
    Object.defineProperty(exports$1, "scheduled", { enumerable: true, get: function() {
      return scheduled_1.scheduled;
    } });
    var empty_2 = require_empty();
    Object.defineProperty(exports$1, "EMPTY", { enumerable: true, get: function() {
      return empty_2.EMPTY;
    } });
    var never_2 = require_never();
    Object.defineProperty(exports$1, "NEVER", { enumerable: true, get: function() {
      return never_2.NEVER;
    } });
    __exportStar(require_types(), exports$1);
    var config_1 = require_config();
    Object.defineProperty(exports$1, "config", { enumerable: true, get: function() {
      return config_1.config;
    } });
    var audit_1 = require_audit();
    Object.defineProperty(exports$1, "audit", { enumerable: true, get: function() {
      return audit_1.audit;
    } });
    var auditTime_1 = require_auditTime();
    Object.defineProperty(exports$1, "auditTime", { enumerable: true, get: function() {
      return auditTime_1.auditTime;
    } });
    var buffer_1 = require_buffer();
    Object.defineProperty(exports$1, "buffer", { enumerable: true, get: function() {
      return buffer_1.buffer;
    } });
    var bufferCount_1 = require_bufferCount();
    Object.defineProperty(exports$1, "bufferCount", { enumerable: true, get: function() {
      return bufferCount_1.bufferCount;
    } });
    var bufferTime_1 = require_bufferTime();
    Object.defineProperty(exports$1, "bufferTime", { enumerable: true, get: function() {
      return bufferTime_1.bufferTime;
    } });
    var bufferToggle_1 = require_bufferToggle();
    Object.defineProperty(exports$1, "bufferToggle", { enumerable: true, get: function() {
      return bufferToggle_1.bufferToggle;
    } });
    var bufferWhen_1 = require_bufferWhen();
    Object.defineProperty(exports$1, "bufferWhen", { enumerable: true, get: function() {
      return bufferWhen_1.bufferWhen;
    } });
    var catchError_1 = require_catchError();
    Object.defineProperty(exports$1, "catchError", { enumerable: true, get: function() {
      return catchError_1.catchError;
    } });
    var combineAll_1 = require_combineAll();
    Object.defineProperty(exports$1, "combineAll", { enumerable: true, get: function() {
      return combineAll_1.combineAll;
    } });
    var combineLatestAll_1 = require_combineLatestAll();
    Object.defineProperty(exports$1, "combineLatestAll", { enumerable: true, get: function() {
      return combineLatestAll_1.combineLatestAll;
    } });
    var combineLatestWith_1 = require_combineLatestWith();
    Object.defineProperty(exports$1, "combineLatestWith", { enumerable: true, get: function() {
      return combineLatestWith_1.combineLatestWith;
    } });
    var concatAll_1 = require_concatAll();
    Object.defineProperty(exports$1, "concatAll", { enumerable: true, get: function() {
      return concatAll_1.concatAll;
    } });
    var concatMap_1 = require_concatMap();
    Object.defineProperty(exports$1, "concatMap", { enumerable: true, get: function() {
      return concatMap_1.concatMap;
    } });
    var concatMapTo_1 = require_concatMapTo();
    Object.defineProperty(exports$1, "concatMapTo", { enumerable: true, get: function() {
      return concatMapTo_1.concatMapTo;
    } });
    var concatWith_1 = require_concatWith();
    Object.defineProperty(exports$1, "concatWith", { enumerable: true, get: function() {
      return concatWith_1.concatWith;
    } });
    var connect_1 = require_connect();
    Object.defineProperty(exports$1, "connect", { enumerable: true, get: function() {
      return connect_1.connect;
    } });
    var count_1 = require_count();
    Object.defineProperty(exports$1, "count", { enumerable: true, get: function() {
      return count_1.count;
    } });
    var debounce_1 = require_debounce();
    Object.defineProperty(exports$1, "debounce", { enumerable: true, get: function() {
      return debounce_1.debounce;
    } });
    var debounceTime_1 = require_debounceTime();
    Object.defineProperty(exports$1, "debounceTime", { enumerable: true, get: function() {
      return debounceTime_1.debounceTime;
    } });
    var defaultIfEmpty_1 = require_defaultIfEmpty();
    Object.defineProperty(exports$1, "defaultIfEmpty", { enumerable: true, get: function() {
      return defaultIfEmpty_1.defaultIfEmpty;
    } });
    var delay_1 = require_delay();
    Object.defineProperty(exports$1, "delay", { enumerable: true, get: function() {
      return delay_1.delay;
    } });
    var delayWhen_1 = require_delayWhen();
    Object.defineProperty(exports$1, "delayWhen", { enumerable: true, get: function() {
      return delayWhen_1.delayWhen;
    } });
    var dematerialize_1 = require_dematerialize();
    Object.defineProperty(exports$1, "dematerialize", { enumerable: true, get: function() {
      return dematerialize_1.dematerialize;
    } });
    var distinct_1 = require_distinct();
    Object.defineProperty(exports$1, "distinct", { enumerable: true, get: function() {
      return distinct_1.distinct;
    } });
    var distinctUntilChanged_1 = require_distinctUntilChanged();
    Object.defineProperty(exports$1, "distinctUntilChanged", { enumerable: true, get: function() {
      return distinctUntilChanged_1.distinctUntilChanged;
    } });
    var distinctUntilKeyChanged_1 = require_distinctUntilKeyChanged();
    Object.defineProperty(exports$1, "distinctUntilKeyChanged", { enumerable: true, get: function() {
      return distinctUntilKeyChanged_1.distinctUntilKeyChanged;
    } });
    var elementAt_1 = require_elementAt();
    Object.defineProperty(exports$1, "elementAt", { enumerable: true, get: function() {
      return elementAt_1.elementAt;
    } });
    var endWith_1 = require_endWith();
    Object.defineProperty(exports$1, "endWith", { enumerable: true, get: function() {
      return endWith_1.endWith;
    } });
    var every_1 = require_every();
    Object.defineProperty(exports$1, "every", { enumerable: true, get: function() {
      return every_1.every;
    } });
    var exhaust_1 = require_exhaust();
    Object.defineProperty(exports$1, "exhaust", { enumerable: true, get: function() {
      return exhaust_1.exhaust;
    } });
    var exhaustAll_1 = require_exhaustAll();
    Object.defineProperty(exports$1, "exhaustAll", { enumerable: true, get: function() {
      return exhaustAll_1.exhaustAll;
    } });
    var exhaustMap_1 = require_exhaustMap();
    Object.defineProperty(exports$1, "exhaustMap", { enumerable: true, get: function() {
      return exhaustMap_1.exhaustMap;
    } });
    var expand_1 = require_expand();
    Object.defineProperty(exports$1, "expand", { enumerable: true, get: function() {
      return expand_1.expand;
    } });
    var filter_1 = require_filter();
    Object.defineProperty(exports$1, "filter", { enumerable: true, get: function() {
      return filter_1.filter;
    } });
    var finalize_1 = require_finalize();
    Object.defineProperty(exports$1, "finalize", { enumerable: true, get: function() {
      return finalize_1.finalize;
    } });
    var find_1 = require_find();
    Object.defineProperty(exports$1, "find", { enumerable: true, get: function() {
      return find_1.find;
    } });
    var findIndex_1 = require_findIndex();
    Object.defineProperty(exports$1, "findIndex", { enumerable: true, get: function() {
      return findIndex_1.findIndex;
    } });
    var first_1 = require_first();
    Object.defineProperty(exports$1, "first", { enumerable: true, get: function() {
      return first_1.first;
    } });
    var groupBy_1 = require_groupBy();
    Object.defineProperty(exports$1, "groupBy", { enumerable: true, get: function() {
      return groupBy_1.groupBy;
    } });
    var ignoreElements_1 = require_ignoreElements();
    Object.defineProperty(exports$1, "ignoreElements", { enumerable: true, get: function() {
      return ignoreElements_1.ignoreElements;
    } });
    var isEmpty_1 = require_isEmpty();
    Object.defineProperty(exports$1, "isEmpty", { enumerable: true, get: function() {
      return isEmpty_1.isEmpty;
    } });
    var last_1 = require_last();
    Object.defineProperty(exports$1, "last", { enumerable: true, get: function() {
      return last_1.last;
    } });
    var map_1 = require_map();
    Object.defineProperty(exports$1, "map", { enumerable: true, get: function() {
      return map_1.map;
    } });
    var mapTo_1 = require_mapTo();
    Object.defineProperty(exports$1, "mapTo", { enumerable: true, get: function() {
      return mapTo_1.mapTo;
    } });
    var materialize_1 = require_materialize();
    Object.defineProperty(exports$1, "materialize", { enumerable: true, get: function() {
      return materialize_1.materialize;
    } });
    var max_1 = require_max();
    Object.defineProperty(exports$1, "max", { enumerable: true, get: function() {
      return max_1.max;
    } });
    var mergeAll_1 = require_mergeAll();
    Object.defineProperty(exports$1, "mergeAll", { enumerable: true, get: function() {
      return mergeAll_1.mergeAll;
    } });
    var flatMap_1 = require_flatMap();
    Object.defineProperty(exports$1, "flatMap", { enumerable: true, get: function() {
      return flatMap_1.flatMap;
    } });
    var mergeMap_1 = require_mergeMap();
    Object.defineProperty(exports$1, "mergeMap", { enumerable: true, get: function() {
      return mergeMap_1.mergeMap;
    } });
    var mergeMapTo_1 = require_mergeMapTo();
    Object.defineProperty(exports$1, "mergeMapTo", { enumerable: true, get: function() {
      return mergeMapTo_1.mergeMapTo;
    } });
    var mergeScan_1 = require_mergeScan();
    Object.defineProperty(exports$1, "mergeScan", { enumerable: true, get: function() {
      return mergeScan_1.mergeScan;
    } });
    var mergeWith_1 = require_mergeWith();
    Object.defineProperty(exports$1, "mergeWith", { enumerable: true, get: function() {
      return mergeWith_1.mergeWith;
    } });
    var min_1 = require_min();
    Object.defineProperty(exports$1, "min", { enumerable: true, get: function() {
      return min_1.min;
    } });
    var multicast_1 = require_multicast();
    Object.defineProperty(exports$1, "multicast", { enumerable: true, get: function() {
      return multicast_1.multicast;
    } });
    var observeOn_1 = require_observeOn();
    Object.defineProperty(exports$1, "observeOn", { enumerable: true, get: function() {
      return observeOn_1.observeOn;
    } });
    var onErrorResumeNextWith_1 = require_onErrorResumeNextWith();
    Object.defineProperty(exports$1, "onErrorResumeNextWith", { enumerable: true, get: function() {
      return onErrorResumeNextWith_1.onErrorResumeNextWith;
    } });
    var pairwise_1 = require_pairwise();
    Object.defineProperty(exports$1, "pairwise", { enumerable: true, get: function() {
      return pairwise_1.pairwise;
    } });
    var pluck_1 = require_pluck();
    Object.defineProperty(exports$1, "pluck", { enumerable: true, get: function() {
      return pluck_1.pluck;
    } });
    var publish_1 = require_publish();
    Object.defineProperty(exports$1, "publish", { enumerable: true, get: function() {
      return publish_1.publish;
    } });
    var publishBehavior_1 = require_publishBehavior();
    Object.defineProperty(exports$1, "publishBehavior", { enumerable: true, get: function() {
      return publishBehavior_1.publishBehavior;
    } });
    var publishLast_1 = require_publishLast();
    Object.defineProperty(exports$1, "publishLast", { enumerable: true, get: function() {
      return publishLast_1.publishLast;
    } });
    var publishReplay_1 = require_publishReplay();
    Object.defineProperty(exports$1, "publishReplay", { enumerable: true, get: function() {
      return publishReplay_1.publishReplay;
    } });
    var raceWith_1 = require_raceWith();
    Object.defineProperty(exports$1, "raceWith", { enumerable: true, get: function() {
      return raceWith_1.raceWith;
    } });
    var reduce_1 = require_reduce();
    Object.defineProperty(exports$1, "reduce", { enumerable: true, get: function() {
      return reduce_1.reduce;
    } });
    var repeat_1 = require_repeat();
    Object.defineProperty(exports$1, "repeat", { enumerable: true, get: function() {
      return repeat_1.repeat;
    } });
    var repeatWhen_1 = require_repeatWhen();
    Object.defineProperty(exports$1, "repeatWhen", { enumerable: true, get: function() {
      return repeatWhen_1.repeatWhen;
    } });
    var retry_1 = require_retry();
    Object.defineProperty(exports$1, "retry", { enumerable: true, get: function() {
      return retry_1.retry;
    } });
    var retryWhen_1 = require_retryWhen();
    Object.defineProperty(exports$1, "retryWhen", { enumerable: true, get: function() {
      return retryWhen_1.retryWhen;
    } });
    var refCount_1 = require_refCount();
    Object.defineProperty(exports$1, "refCount", { enumerable: true, get: function() {
      return refCount_1.refCount;
    } });
    var sample_1 = require_sample();
    Object.defineProperty(exports$1, "sample", { enumerable: true, get: function() {
      return sample_1.sample;
    } });
    var sampleTime_1 = require_sampleTime();
    Object.defineProperty(exports$1, "sampleTime", { enumerable: true, get: function() {
      return sampleTime_1.sampleTime;
    } });
    var scan_1 = require_scan();
    Object.defineProperty(exports$1, "scan", { enumerable: true, get: function() {
      return scan_1.scan;
    } });
    var sequenceEqual_1 = require_sequenceEqual();
    Object.defineProperty(exports$1, "sequenceEqual", { enumerable: true, get: function() {
      return sequenceEqual_1.sequenceEqual;
    } });
    var share_1 = require_share();
    Object.defineProperty(exports$1, "share", { enumerable: true, get: function() {
      return share_1.share;
    } });
    var shareReplay_1 = require_shareReplay();
    Object.defineProperty(exports$1, "shareReplay", { enumerable: true, get: function() {
      return shareReplay_1.shareReplay;
    } });
    var single_1 = require_single();
    Object.defineProperty(exports$1, "single", { enumerable: true, get: function() {
      return single_1.single;
    } });
    var skip_1 = require_skip();
    Object.defineProperty(exports$1, "skip", { enumerable: true, get: function() {
      return skip_1.skip;
    } });
    var skipLast_1 = require_skipLast();
    Object.defineProperty(exports$1, "skipLast", { enumerable: true, get: function() {
      return skipLast_1.skipLast;
    } });
    var skipUntil_1 = require_skipUntil();
    Object.defineProperty(exports$1, "skipUntil", { enumerable: true, get: function() {
      return skipUntil_1.skipUntil;
    } });
    var skipWhile_1 = require_skipWhile();
    Object.defineProperty(exports$1, "skipWhile", { enumerable: true, get: function() {
      return skipWhile_1.skipWhile;
    } });
    var startWith_1 = require_startWith();
    Object.defineProperty(exports$1, "startWith", { enumerable: true, get: function() {
      return startWith_1.startWith;
    } });
    var subscribeOn_1 = require_subscribeOn();
    Object.defineProperty(exports$1, "subscribeOn", { enumerable: true, get: function() {
      return subscribeOn_1.subscribeOn;
    } });
    var switchAll_1 = require_switchAll();
    Object.defineProperty(exports$1, "switchAll", { enumerable: true, get: function() {
      return switchAll_1.switchAll;
    } });
    var switchMap_1 = require_switchMap();
    Object.defineProperty(exports$1, "switchMap", { enumerable: true, get: function() {
      return switchMap_1.switchMap;
    } });
    var switchMapTo_1 = require_switchMapTo();
    Object.defineProperty(exports$1, "switchMapTo", { enumerable: true, get: function() {
      return switchMapTo_1.switchMapTo;
    } });
    var switchScan_1 = require_switchScan();
    Object.defineProperty(exports$1, "switchScan", { enumerable: true, get: function() {
      return switchScan_1.switchScan;
    } });
    var take_1 = require_take();
    Object.defineProperty(exports$1, "take", { enumerable: true, get: function() {
      return take_1.take;
    } });
    var takeLast_1 = require_takeLast();
    Object.defineProperty(exports$1, "takeLast", { enumerable: true, get: function() {
      return takeLast_1.takeLast;
    } });
    var takeUntil_1 = require_takeUntil();
    Object.defineProperty(exports$1, "takeUntil", { enumerable: true, get: function() {
      return takeUntil_1.takeUntil;
    } });
    var takeWhile_1 = require_takeWhile();
    Object.defineProperty(exports$1, "takeWhile", { enumerable: true, get: function() {
      return takeWhile_1.takeWhile;
    } });
    var tap_1 = require_tap();
    Object.defineProperty(exports$1, "tap", { enumerable: true, get: function() {
      return tap_1.tap;
    } });
    var throttle_1 = require_throttle();
    Object.defineProperty(exports$1, "throttle", { enumerable: true, get: function() {
      return throttle_1.throttle;
    } });
    var throttleTime_1 = require_throttleTime();
    Object.defineProperty(exports$1, "throttleTime", { enumerable: true, get: function() {
      return throttleTime_1.throttleTime;
    } });
    var throwIfEmpty_1 = require_throwIfEmpty();
    Object.defineProperty(exports$1, "throwIfEmpty", { enumerable: true, get: function() {
      return throwIfEmpty_1.throwIfEmpty;
    } });
    var timeInterval_1 = require_timeInterval();
    Object.defineProperty(exports$1, "timeInterval", { enumerable: true, get: function() {
      return timeInterval_1.timeInterval;
    } });
    var timeout_2 = require_timeout();
    Object.defineProperty(exports$1, "timeout", { enumerable: true, get: function() {
      return timeout_2.timeout;
    } });
    var timeoutWith_1 = require_timeoutWith();
    Object.defineProperty(exports$1, "timeoutWith", { enumerable: true, get: function() {
      return timeoutWith_1.timeoutWith;
    } });
    var timestamp_1 = require_timestamp();
    Object.defineProperty(exports$1, "timestamp", { enumerable: true, get: function() {
      return timestamp_1.timestamp;
    } });
    var toArray_1 = require_toArray();
    Object.defineProperty(exports$1, "toArray", { enumerable: true, get: function() {
      return toArray_1.toArray;
    } });
    var window_1 = require_window();
    Object.defineProperty(exports$1, "window", { enumerable: true, get: function() {
      return window_1.window;
    } });
    var windowCount_1 = require_windowCount();
    Object.defineProperty(exports$1, "windowCount", { enumerable: true, get: function() {
      return windowCount_1.windowCount;
    } });
    var windowTime_1 = require_windowTime();
    Object.defineProperty(exports$1, "windowTime", { enumerable: true, get: function() {
      return windowTime_1.windowTime;
    } });
    var windowToggle_1 = require_windowToggle();
    Object.defineProperty(exports$1, "windowToggle", { enumerable: true, get: function() {
      return windowToggle_1.windowToggle;
    } });
    var windowWhen_1 = require_windowWhen();
    Object.defineProperty(exports$1, "windowWhen", { enumerable: true, get: function() {
      return windowWhen_1.windowWhen;
    } });
    var withLatestFrom_1 = require_withLatestFrom();
    Object.defineProperty(exports$1, "withLatestFrom", { enumerable: true, get: function() {
      return withLatestFrom_1.withLatestFrom;
    } });
    var zipAll_1 = require_zipAll();
    Object.defineProperty(exports$1, "zipAll", { enumerable: true, get: function() {
      return zipAll_1.zipAll;
    } });
    var zipWith_1 = require_zipWith();
    Object.defineProperty(exports$1, "zipWith", { enumerable: true, get: function() {
      return zipWith_1.zipWith;
    } });
  }
});

// src/wallet-sdk.ts
var Rx = __toESM(require_cjs());
Number.parseInt(globalThis.process?.env?.["PROOF_SERVER_PORT"] ?? "6300", 10);
var configuration = function(indexerHttpUrl, indexerWsUrl, provingServerUrl, network = "preview", costParameters = {
  additionalFeeOverhead: 300000000000000n,
  feeBlocksMargin: 5
}) {
  return {
    networkId: network,
    costParameters,
    relayURL: new URL(indexerWsUrl),
    provingServerUrl: new URL(provingServerUrl),
    indexerClientConnection: {
      indexerHttpUrl,
      indexerWsUrl
    },
    indexerUrl: indexerWsUrl
  };
};
var initFacadeWallet = async (seed, configuration2, strSerializedState) => {
  const hdWallet = HDWallet.fromSeed(seed);
  if (hdWallet.type !== "seedOk") {
    throw new Error("Failed to initialize HDWallet");
  }
  const derivationResult = hdWallet.hdWallet.selectAccount(0).selectRoles([Roles.Zswap, Roles.NightExternal, Roles.Dust]).deriveKeysAt(0);
  if (derivationResult.type !== "keysDerived") {
    throw new Error("Failed to derive keys");
  }
  hdWallet.hdWallet.clear();
  const shieldedSecretKeys = ledger.ZswapSecretKeys.fromSeed(derivationResult.keys[Roles.Zswap]);
  const dustSecretKey = ledger.DustSecretKey.fromSeed(derivationResult.keys[Roles.Dust]);
  const unshieldedKeystore = createKeystore(derivationResult.keys[Roles.NightExternal], configuration2.networkId);
  const shieldedWallet = strSerializedState && strSerializedState.shieldedWalletState ? ShieldedWallet(configuration2).restore(strSerializedState.shieldedWalletState) : ShieldedWallet(configuration2).startWithSecretKeys(shieldedSecretKeys);
  const dustWallet = strSerializedState && strSerializedState.dustWalletState ? DustWallet(configuration2).restore(strSerializedState.dustWalletState) : DustWallet(configuration2).startWithSecretKey(dustSecretKey, ledger.LedgerParameters.initialParameters().dust);
  const unshieldedWallet = strSerializedState && strSerializedState.unshieldedWalletState ? UnshieldedWallet({
    ...configuration2,
    txHistoryStorage: new NoOpTransactionHistoryStorage()
    //此处不对交易历史进行保留
  }).restore(strSerializedState.unshieldedWalletState) : UnshieldedWallet({
    ...configuration2,
    txHistoryStorage: new NoOpTransactionHistoryStorage()
    //此处不对交易历史进行保留
  }).startWithPublicKey(PublicKey.fromKeyStore(unshieldedKeystore));
  const wallet = new WalletFacade(shieldedWallet, unshieldedWallet, dustWallet);
  await wallet.start(shieldedSecretKeys, dustSecretKey);
  return { wallet, shieldedSecretKeys, dustSecretKey, unshieldedKeystore };
};
var MidnightWalletSDK = class {
  constructor(config) {
    this.config = config;
    this.walletAddress = { shieldedAddress: "", unshieldedAddress: "", dustAddress: "" };
    this.bActiveFlag = false;
  }
  //////////////////////////////////////////
  // to generate a wallet instance
  //////////////////////////////////////////
  async initWallet(strSeed, store, strSerializedState, saveInterval = 6e5) {
    const seed = Buffer$1.from(strSeed, "hex");
    if (seed.toString("hex").toLowerCase() != strSeed.toLowerCase()) throw "bad seed";
    const ret = await initFacadeWallet(seed, this.config, strSerializedState);
    this.walletObj = ret.wallet;
    this.shieldedSecretKeys = ret.shieldedSecretKeys;
    this.unshieldedKeystore = ret.unshieldedKeystore;
    this.dustSecretKey = ret.dustSecretKey;
    const selfWallet = this.walletObj;
    const state = await Rx.firstValueFrom(this.walletObj.state());
    this.walletAddress = {
      shieldedAddress: ShieldedAddress.codec.encode(this.config.networkId, state.shielded.address).asString(),
      unshieldedAddress: UnshieldedAddress.codec.encode(this.config.networkId, state.unshielded.address).asString(),
      dustAddress: state.dust.dustAddress
    };
    const callBack = async () => {
      const state2 = await Rx.firstValueFrom(selfWallet.state());
      await store({ shieldedWalletState: state2.shielded.serialize(), unshieldedWalletState: state2.unshielded.serialize(), dustWalletState: state2.dust.serialize() });
      console.log("wallet state saved!");
      clearTimeout(this.storeTimer);
      this.storeTimer = setTimeout(callBack, saveInterval);
    };
    this.storeTimer = setTimeout(async () => {
      await callBack();
    }, saveInterval);
  }
  // to get the wallet address
  getAccountAddress() {
    return this.walletAddress;
  }
  async getBalances() {
    assert3(this.walletObj, "walletObj is not initialized!");
    let curState = await Rx.firstValueFrom(this.walletObj.state());
    new Array();
    const dustBalance = curState.dust.walletBalance(/* @__PURE__ */ new Date());
    const shieldedBlance = curState.shielded.balances;
    const unshieldedBlance = curState.unshielded.balances;
    return { dustBalance, shieldedBlance, unshieldedBlance };
  }
  async getAvailableCoins() {
    assert3(this.walletObj, "walletObj is not initialized!");
    let curState = await Rx.firstValueFrom(this.walletObj.state());
    const dustAvailableCoins = curState.dust.availableCoins;
    const shieldedAvailableCoins = curState.shielded.availableCoins;
    const unshieldedAvailableCoins = curState.unshielded.availableCoins;
    return { dustAvailableCoins, shieldedAvailableCoins, unshieldedAvailableCoins };
  }
  async uninitWallet() {
    if (this.storeTimer) {
      clearTimeout(this.storeTimer);
    }
    if (true === this.bActiveFlag) {
      await this.walletObj?.stop();
    }
    this.bActiveFlag = false;
    console.log("\n\n...wallet close done!");
  }
  getWalletInstance() {
    return this.walletObj;
  }
  getShieldedSecretKeys() {
    assert3(this.shieldedSecretKeys, "shieldedSecretKeys is undefined");
    return this.shieldedSecretKeys;
  }
  getUnshieldedKeystore() {
    assert3(this.unshieldedKeystore, "unshieldedKeystore is undefined");
    return this.unshieldedKeystore;
  }
  getDustSecretKey() {
    assert3(this.dustSecretKey, "dustSecretKey is undefined");
    return this.dustSecretKey;
  }
  async getSerializedWalletState() {
    if (!this.walletObj) return "";
    let curState = await Rx.firstValueFrom(this.walletObj.state());
    const dustWalletState = curState.dust.serialize();
    const shieldedWalletState = curState.shielded.serialize();
    const unshieldedWalletState = curState.unshielded.serialize();
    return { dustWalletState, shieldedWalletState, unshieldedWalletState };
  }
  async transferTo(transferInfo, ttl) {
    assert3(this.walletObj && this.shieldedSecretKeys && this.unshieldedKeystore && this.dustSecretKey, "wallet uninitialized");
    const unprovenTxRecipe = await this.walletObj?.transferTransaction(
      this.shieldedSecretKeys,
      this.dustSecretKey,
      transferInfo,
      ttl
    );
    const finalizedTx = await this.walletObj.finalizeTransaction(unprovenTxRecipe);
    const submittedTxHash = await this.walletObj.submitTransaction(finalizedTx);
    return submittedTxHash;
  }
};

// src/witnesses.ts
var createCrossChainPrivateState = () => ({});
var witnesses = {
  // TODO: Add witnesses
};
__compactRuntime.checkRuntimeVersion("0.11.0");
var ProposalType;
(function(ProposalType2) {
  ProposalType2[ProposalType2["AddAdmin"] = 0] = "AddAdmin";
  ProposalType2[ProposalType2["RemoveAdmin"] = 1] = "RemoveAdmin";
  ProposalType2[ProposalType2["UpdateFeeShieldedReceiver"] = 2] = "UpdateFeeShieldedReceiver";
  ProposalType2[ProposalType2["UpdateFeeUnshieldedReceiver"] = 3] = "UpdateFeeUnshieldedReceiver";
  ProposalType2[ProposalType2["UpdateTokenManager"] = 4] = "UpdateTokenManager";
  ProposalType2[ProposalType2["UpdateAdminThreshold"] = 5] = "UpdateAdminThreshold";
  ProposalType2[ProposalType2["UpdateSMGPKThreshold"] = 6] = "UpdateSMGPKThreshold";
  ProposalType2[ProposalType2["UpdateFeeCommonConfig"] = 7] = "UpdateFeeCommonConfig";
  ProposalType2[ProposalType2["SetSmgPKS"] = 8] = "SetSmgPKS";
})(ProposalType || (ProposalType = {}));
var _descriptor_0 = new __compactRuntime.CompactTypeBytes(32);
var _ZswapCoinPublicKey_0 = class {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
};
var _descriptor_1 = new _ZswapCoinPublicKey_0();
var _descriptor_2 = new __compactRuntime.CompactTypeVector(20, _descriptor_0);
var _descriptor_3 = new __compactRuntime.CompactTypeUnsignedInteger(18446744073709551615n, 8);
var _descriptor_4 = __compactRuntime.CompactTypeBoolean;
var _descriptor_5 = new __compactRuntime.CompactTypeUnsignedInteger(4294967295n, 4);
var _descriptor_6 = new __compactRuntime.CompactTypeEnum(8, 1);
var _UserAddress_0 = class {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
};
var _descriptor_7 = new _UserAddress_0();
var _descriptor_8 = new __compactRuntime.CompactTypeUnsignedInteger(340282366920938463463374607431768211455n, 16);
var _FeeConfig_0 = class {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_8.alignment());
  }
  fromValue(value_0) {
    return {
      chainId: _descriptor_5.fromValue(value_0),
      fee: _descriptor_8.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.chainId).concat(_descriptor_8.toValue(value_0.fee));
  }
};
var _descriptor_9 = new _FeeConfig_0();
var _descriptor_10 = new __compactRuntime.CompactTypeVector(29, _descriptor_1);
var _Proposal_0 = class {
  alignment() {
    return _descriptor_6.alignment().concat(_descriptor_1.alignment().concat(_descriptor_7.alignment().concat(_descriptor_8.alignment().concat(_descriptor_9.alignment().concat(_descriptor_10.alignment())))));
  }
  fromValue(value_0) {
    return {
      type: _descriptor_6.fromValue(value_0),
      addr: _descriptor_1.fromValue(value_0),
      addrUnshielded: _descriptor_7.fromValue(value_0),
      threshold: _descriptor_8.fromValue(value_0),
      feeConfig: _descriptor_9.fromValue(value_0),
      smgPubkeys: _descriptor_10.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_6.toValue(value_0.type).concat(_descriptor_1.toValue(value_0.addr).concat(_descriptor_7.toValue(value_0.addrUnshielded).concat(_descriptor_8.toValue(value_0.threshold).concat(_descriptor_9.toValue(value_0.feeConfig).concat(_descriptor_10.toValue(value_0.smgPubkeys))))));
  }
};
var _descriptor_11 = new _Proposal_0();
var _TokenPairInfo_0 = class {
  alignment() {
    return _descriptor_5.alignment().concat(_descriptor_5.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_4.alignment().concat(_descriptor_8.alignment())))));
  }
  fromValue(value_0) {
    return {
      fromChainId: _descriptor_5.fromValue(value_0),
      toChainId: _descriptor_5.fromValue(value_0),
      midnigthTokenAccount: _descriptor_0.fromValue(value_0),
      domainSep: _descriptor_0.fromValue(value_0),
      isShielded: _descriptor_4.fromValue(value_0),
      fee: _descriptor_8.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_5.toValue(value_0.fromChainId).concat(_descriptor_5.toValue(value_0.toChainId).concat(_descriptor_0.toValue(value_0.midnigthTokenAccount).concat(_descriptor_0.toValue(value_0.domainSep).concat(_descriptor_4.toValue(value_0.isShielded).concat(_descriptor_8.toValue(value_0.fee))))));
  }
};
var _descriptor_12 = new _TokenPairInfo_0();
var _descriptor_13 = new __compactRuntime.CompactTypeUnsignedInteger(65535n, 2);
var _ContractAddress_0 = class {
  alignment() {
    return _descriptor_0.alignment();
  }
  fromValue(value_0) {
    return {
      bytes: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.bytes);
  }
};
var _descriptor_14 = new _ContractAddress_0();
var _descriptor_15 = new __compactRuntime.CompactTypeUnsignedInteger(255n, 1);
new __compactRuntime.CompactTypeVector(2, _descriptor_8);
var _ReserveOfToken_0 = class {
  alignment() {
    return _descriptor_8.alignment().concat(_descriptor_4.alignment());
  }
  fromValue(value_0) {
    return {
      total: _descriptor_8.fromValue(value_0),
      isMappingToken: _descriptor_4.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_8.toValue(value_0.total).concat(_descriptor_4.toValue(value_0.isMappingToken));
  }
};
var _descriptor_17 = new _ReserveOfToken_0();
var _QualifiedShieldedCoinInfo_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_8.alignment().concat(_descriptor_3.alignment())));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_8.fromValue(value_0),
      mt_index: _descriptor_3.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_8.toValue(value_0.value).concat(_descriptor_3.toValue(value_0.mt_index))));
  }
};
var _descriptor_18 = new _QualifiedShieldedCoinInfo_0();
var _ShieldedCoinInfo_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_8.alignment()));
  }
  fromValue(value_0) {
    return {
      nonce: _descriptor_0.fromValue(value_0),
      color: _descriptor_0.fromValue(value_0),
      value: _descriptor_8.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.nonce).concat(_descriptor_0.toValue(value_0.color).concat(_descriptor_8.toValue(value_0.value)));
  }
};
var _descriptor_19 = new _ShieldedCoinInfo_0();
var _ClaimMappingTokenInfo_0 = class {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_0.alignment().concat(_descriptor_8.alignment()));
  }
  fromValue(value_0) {
    return {
      receiver: _descriptor_1.fromValue(value_0),
      domainSep: _descriptor_0.fromValue(value_0),
      amount: _descriptor_8.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.receiver).concat(_descriptor_0.toValue(value_0.domainSep).concat(_descriptor_8.toValue(value_0.amount)));
  }
};
var _descriptor_20 = new _ClaimMappingTokenInfo_0();
var _ClaimCoinInfo_0 = class {
  alignment() {
    return _descriptor_1.alignment().concat(_descriptor_18.alignment());
  }
  fromValue(value_0) {
    return {
      receiver: _descriptor_1.fromValue(value_0),
      coin: _descriptor_18.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_1.toValue(value_0.receiver).concat(_descriptor_18.toValue(value_0.coin));
  }
};
var _descriptor_21 = new _ClaimCoinInfo_0();
var _CrossProposal_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment().concat(_descriptor_4.alignment().concat(_descriptor_4.alignment().concat(_descriptor_8.alignment().concat(_descriptor_8.alignment().concat(_descriptor_1.alignment().concat(_descriptor_3.alignment()))))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_0.fromValue(value_0),
      token: _descriptor_0.fromValue(value_0),
      tokenPairId: _descriptor_5.fromValue(value_0),
      isMappingToken: _descriptor_4.fromValue(value_0),
      isShielded: _descriptor_4.fromValue(value_0),
      amount: _descriptor_8.fromValue(value_0),
      fee: _descriptor_8.fromValue(value_0),
      toAddr: _descriptor_1.fromValue(value_0),
      ttl: _descriptor_3.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.smgId).concat(_descriptor_0.toValue(value_0.token).concat(_descriptor_5.toValue(value_0.tokenPairId).concat(_descriptor_4.toValue(value_0.isMappingToken).concat(_descriptor_4.toValue(value_0.isShielded).concat(_descriptor_8.toValue(value_0.amount).concat(_descriptor_8.toValue(value_0.fee).concat(_descriptor_1.toValue(value_0.toAddr).concat(_descriptor_3.toValue(value_0.ttl)))))))));
  }
};
var _descriptor_22 = new _CrossProposal_0();
var _SmgEvent_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_22.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_0.fromValue(value_0),
      crossProposal: _descriptor_22.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.uniqueId).concat(_descriptor_22.toValue(value_0.crossProposal));
  }
};
var _descriptor_23 = new _SmgEvent_0();
var _Either_0 = class {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_1.alignment().concat(_descriptor_14.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_4.fromValue(value_0),
      left: _descriptor_1.fromValue(value_0),
      right: _descriptor_14.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.is_left).concat(_descriptor_1.toValue(value_0.left).concat(_descriptor_14.toValue(value_0.right)));
  }
};
var _descriptor_24 = new _Either_0();
var _ExecuteCrossProposalInfo_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_8.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_0.fromValue(value_0),
      coinIndex: _descriptor_8.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.uniqueId).concat(_descriptor_8.toValue(value_0.coinIndex));
  }
};
var _descriptor_25 = new _ExecuteCrossProposalInfo_0();
var _descriptor_26 = new __compactRuntime.CompactTypeVector(5, _descriptor_25);
var _VoteForCrossPropasal_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_3.alignment());
  }
  fromValue(value_0) {
    return {
      uniqueId: _descriptor_0.fromValue(value_0),
      ttl: _descriptor_3.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.uniqueId).concat(_descriptor_3.toValue(value_0.ttl));
  }
};
var _descriptor_27 = new _VoteForCrossPropasal_0();
var _descriptor_28 = new __compactRuntime.CompactTypeVector(5, _descriptor_27);
var _descriptor_29 = __compactRuntime.CompactTypeOpaqueString;
var _CrossOutBound_0 = class {
  alignment() {
    return _descriptor_0.alignment().concat(_descriptor_1.alignment().concat(_descriptor_29.alignment().concat(_descriptor_5.alignment().concat(_descriptor_0.alignment().concat(_descriptor_8.alignment().concat(_descriptor_8.alignment().concat(_descriptor_8.alignment())))))));
  }
  fromValue(value_0) {
    return {
      smgId: _descriptor_0.fromValue(value_0),
      fromAddr: _descriptor_1.fromValue(value_0),
      toAddr: _descriptor_29.fromValue(value_0),
      tokenPairId: _descriptor_5.fromValue(value_0),
      tokenAccount: _descriptor_0.fromValue(value_0),
      amount: _descriptor_8.fromValue(value_0),
      fee: _descriptor_8.fromValue(value_0),
      nonce: _descriptor_8.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_0.toValue(value_0.smgId).concat(_descriptor_1.toValue(value_0.fromAddr).concat(_descriptor_29.toValue(value_0.toAddr).concat(_descriptor_5.toValue(value_0.tokenPairId).concat(_descriptor_0.toValue(value_0.tokenAccount).concat(_descriptor_8.toValue(value_0.amount).concat(_descriptor_8.toValue(value_0.fee).concat(_descriptor_8.toValue(value_0.nonce))))))));
  }
};
var _descriptor_30 = new _CrossOutBound_0();
var _Either_1 = class {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_0.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_4.fromValue(value_0),
      left: _descriptor_0.fromValue(value_0),
      right: _descriptor_0.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.is_left).concat(_descriptor_0.toValue(value_0.left).concat(_descriptor_0.toValue(value_0.right)));
  }
};
var _descriptor_31 = new _Either_1();
var _Either_2 = class {
  alignment() {
    return _descriptor_4.alignment().concat(_descriptor_14.alignment().concat(_descriptor_7.alignment()));
  }
  fromValue(value_0) {
    return {
      is_left: _descriptor_4.fromValue(value_0),
      left: _descriptor_14.fromValue(value_0),
      right: _descriptor_7.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_4.toValue(value_0.is_left).concat(_descriptor_14.toValue(value_0.left).concat(_descriptor_7.toValue(value_0.right)));
  }
};
var _descriptor_32 = new _Either_2();
var _descriptor_35 = __compactRuntime.CompactTypeField;
var _descriptor_36 = new __compactRuntime.CompactTypeVector(2, _descriptor_0);
var _descriptor_37 = new __compactRuntime.CompactTypeVector(3, _descriptor_35);
var _descriptor_38 = new __compactRuntime.CompactTypeBytes(6);
var _CoinPreimage_0 = class {
  alignment() {
    return _descriptor_19.alignment().concat(_descriptor_4.alignment().concat(_descriptor_0.alignment().concat(_descriptor_38.alignment())));
  }
  fromValue(value_0) {
    return {
      info: _descriptor_19.fromValue(value_0),
      dataType: _descriptor_4.fromValue(value_0),
      data: _descriptor_0.fromValue(value_0),
      domain_sep: _descriptor_38.fromValue(value_0)
    };
  }
  toValue(value_0) {
    return _descriptor_19.toValue(value_0.info).concat(_descriptor_4.toValue(value_0.dataType).concat(_descriptor_0.toValue(value_0.data).concat(_descriptor_38.toValue(value_0.domain_sep))));
  }
};
var _descriptor_39 = new _CoinPreimage_0();
var _descriptor_40 = new __compactRuntime.CompactTypeVector(2, _descriptor_35);
var Contract = class {
  constructor(...args_0) {
    __publicField(this, "witnesses");
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`Contract constructor: expected 1 argument, received ${args_0.length}`);
    }
    const witnesses_0 = args_0[0];
    if (typeof witnesses_0 !== "object") {
      throw new __compactRuntime.CompactError("first (witnesses) argument to Contract constructor is not an object");
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
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "smgMint",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 238 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(uniqueId_0.buffer instanceof ArrayBuffer && uniqueId_0.BYTES_PER_ELEMENT === 1 && uniqueId_0.length === 32)) {
          __compactRuntime.typeError(
            "smgMint",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 238 char 1",
            "Bytes<32>",
            uniqueId_0
          );
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime.typeError(
            "smgMint",
            "argument 2 (argument 3 as invoked from Typescript)",
            "crosschain.compact line 238 char 1",
            "Bytes<32>",
            smgId_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "smgMint",
            "argument 3 (argument 4 as invoked from Typescript)",
            "crosschain.compact line 238 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        if (!(typeof amount_0 === "bigint" && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError(
            "smgMint",
            "argument 4 (argument 5 as invoked from Typescript)",
            "crosschain.compact line 238 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            amount_0
          );
        }
        if (!(typeof fee_0 === "bigint" && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError(
            "smgMint",
            "argument 5 (argument 6 as invoked from Typescript)",
            "crosschain.compact line 238 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            fee_0
          );
        }
        if (!(typeof toAddr_0 === "object" && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "smgMint",
            "argument 6 (argument 7 as invoked from Typescript)",
            "crosschain.compact line 238 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            toAddr_0
          );
        }
        if (!(typeof ttl_0 === "bigint" && ttl_0 >= 0n && ttl_0 <= 18446744073709551615n)) {
          __compactRuntime.typeError(
            "smgMint",
            "argument 7 (argument 8 as invoked from Typescript)",
            "crosschain.compact line 238 char 1",
            "Uint<0..18446744073709551616>",
            ttl_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(uniqueId_0).concat(_descriptor_0.toValue(smgId_0).concat(_descriptor_5.toValue(tokenPairId_0).concat(_descriptor_8.toValue(amount_0).concat(_descriptor_8.toValue(fee_0).concat(_descriptor_1.toValue(toAddr_0).concat(_descriptor_3.toValue(ttl_0))))))),
            alignment: _descriptor_0.alignment().concat(_descriptor_0.alignment().concat(_descriptor_5.alignment().concat(_descriptor_8.alignment().concat(_descriptor_8.alignment().concat(_descriptor_1.alignment().concat(_descriptor_3.alignment()))))))
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
          throw new __compactRuntime.CompactError(`userBurn: expected 5 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const smgId_0 = args_1[1];
        const toAddr_0 = args_1[2];
        const tokenPairId_0 = args_1[3];
        const coin_0 = args_1[4];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "userBurn",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 248 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
          __compactRuntime.typeError(
            "userBurn",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 248 char 1",
            "Bytes<32>",
            smgId_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "userBurn",
            "argument 3 (argument 4 as invoked from Typescript)",
            "crosschain.compact line 248 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        if (!(typeof coin_0 === "object" && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof coin_0.value === "bigint" && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError(
            "userBurn",
            "argument 4 (argument 5 as invoked from Typescript)",
            "crosschain.compact line 248 char 1",
            "struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>",
            coin_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(smgId_0).concat(_descriptor_29.toValue(toAddr_0).concat(_descriptor_5.toValue(tokenPairId_0).concat(_descriptor_19.toValue(coin_0)))),
            alignment: _descriptor_0.alignment().concat(_descriptor_29.alignment().concat(_descriptor_5.alignment().concat(_descriptor_19.alignment())))
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
          coin_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      voteMultiCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`voteMultiCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const uniqueIds_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "voteMultiCrossProposal",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 329 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(Array.isArray(uniqueIds_0) && uniqueIds_0.length === 5 && uniqueIds_0.every((t) => typeof t === "object" && t.uniqueId.buffer instanceof ArrayBuffer && t.uniqueId.BYTES_PER_ELEMENT === 1 && t.uniqueId.length === 32 && typeof t.ttl === "bigint" && t.ttl >= 0n && t.ttl <= 18446744073709551615n))) {
          __compactRuntime.typeError(
            "voteMultiCrossProposal",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 329 char 1",
            "Vector<5, struct VoteForCrossPropasal<uniqueId: Bytes<32>, ttl: Uint<0..18446744073709551616>>>",
            uniqueIds_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_28.toValue(uniqueIds_0),
            alignment: _descriptor_28.alignment()
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
      voteCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`voteCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const target_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "voteCrossProposal",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 337 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof target_0 === "object" && target_0.uniqueId.buffer instanceof ArrayBuffer && target_0.uniqueId.BYTES_PER_ELEMENT === 1 && target_0.uniqueId.length === 32 && typeof target_0.ttl === "bigint" && target_0.ttl >= 0n && target_0.ttl <= 18446744073709551615n)) {
          __compactRuntime.typeError(
            "voteCrossProposal",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 337 char 1",
            "struct VoteForCrossPropasal<uniqueId: Bytes<32>, ttl: Uint<0..18446744073709551616>>",
            target_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_27.toValue(target_0),
            alignment: _descriptor_27.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._voteCrossProposal_0(
          context,
          partialProofData,
          target_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      executeMultiCrossProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`executeMultiCrossProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const mutiEx_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "executeMultiCrossProposal",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 368 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(Array.isArray(mutiEx_0) && mutiEx_0.length === 5 && mutiEx_0.every((t) => typeof t === "object" && t.uniqueId.buffer instanceof ArrayBuffer && t.uniqueId.BYTES_PER_ELEMENT === 1 && t.uniqueId.length === 32 && typeof t.coinIndex === "bigint" && t.coinIndex >= 0n && t.coinIndex <= 340282366920938463463374607431768211455n))) {
          __compactRuntime.typeError(
            "executeMultiCrossProposal",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 368 char 1",
            "Vector<5, struct ExecuteCrossProposalInfo<uniqueId: Bytes<32>, coinIndex: Uint<0..340282366920938463463374607431768211456>>>",
            mutiEx_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_26.toValue(mutiEx_0),
            alignment: _descriptor_26.alignment()
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
      userRechargeForFee: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`userRechargeForFee: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const amount_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "userRechargeForFee",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 445 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof amount_0 === "bigint" && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError(
            "userRechargeForFee",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 445 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            amount_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_8.toValue(amount_0),
            alignment: _descriptor_8.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userRechargeForFee_0(
          context,
          partialProofData,
          amount_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      userFeeWithdrawRequest: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`userFeeWithdrawRequest: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const receiptor_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "userFeeWithdrawRequest",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 451 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof receiptor_0 === "object" && receiptor_0.bytes.buffer instanceof ArrayBuffer && receiptor_0.bytes.BYTES_PER_ELEMENT === 1 && receiptor_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "userFeeWithdrawRequest",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 451 char 1",
            "struct UserAddress<bytes: Bytes<32>>",
            receiptor_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_7.toValue(receiptor_0),
            alignment: _descriptor_7.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userFeeWithdrawRequest_0(
          context,
          partialProofData,
          receiptor_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      userClaimCoin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`userClaimCoin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const id_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "userClaimCoin",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 456 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(id_0.buffer instanceof ArrayBuffer && id_0.BYTES_PER_ELEMENT === 1 && id_0.length === 32)) {
          __compactRuntime.typeError(
            "userClaimCoin",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 456 char 1",
            "Bytes<32>",
            id_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(id_0),
            alignment: _descriptor_0.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userClaimCoin_0(context, partialProofData, id_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      userClaimMappingToken: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`userClaimMappingToken: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const id_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "userClaimMappingToken",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 464 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(id_0.buffer instanceof ArrayBuffer && id_0.BYTES_PER_ELEMENT === 1 && id_0.length === 32)) {
          __compactRuntime.typeError(
            "userClaimMappingToken",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 464 char 1",
            "Bytes<32>",
            id_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(id_0),
            alignment: _descriptor_0.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._userClaimMappingToken_0(
          context,
          partialProofData,
          id_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      addReserve: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`addReserve: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const coin_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "addReserve",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 490 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof coin_0 === "object" && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof coin_0.value === "bigint" && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError(
            "addReserve",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 490 char 1",
            "struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>",
            coin_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_19.toValue(coin_0),
            alignment: _descriptor_19.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addReserve_0(context, partialProofData, coin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      approveUserWithdrawFee: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`approveUserWithdrawFee: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const user_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "approveUserWithdrawFee",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 524 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof user_0 === "object" && user_0.bytes.buffer instanceof ArrayBuffer && user_0.bytes.BYTES_PER_ELEMENT === 1 && user_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "approveUserWithdrawFee",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 524 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            user_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(user_0),
            alignment: _descriptor_1.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._approveUserWithdrawFee_0(
          context,
          partialProofData,
          user_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      withdrawReserveOfShieldedToken: (...args_1) => {
        if (args_1.length !== 3) {
          throw new __compactRuntime.CompactError(`withdrawReserveOfShieldedToken: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const token_0 = args_1[1];
        const coinIndex_0 = args_1[2];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "withdrawReserveOfShieldedToken",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 554 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(token_0.buffer instanceof ArrayBuffer && token_0.BYTES_PER_ELEMENT === 1 && token_0.length === 32)) {
          __compactRuntime.typeError(
            "withdrawReserveOfShieldedToken",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 554 char 1",
            "Bytes<32>",
            token_0
          );
        }
        if (!(typeof coinIndex_0 === "bigint" && coinIndex_0 >= 0n && coinIndex_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError(
            "withdrawReserveOfShieldedToken",
            "argument 2 (argument 3 as invoked from Typescript)",
            "crosschain.compact line 554 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            coinIndex_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(token_0).concat(_descriptor_8.toValue(coinIndex_0)),
            alignment: _descriptor_0.alignment().concat(_descriptor_8.alignment())
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._withdrawReserveOfShieldedToken_0(
          context,
          partialProofData,
          token_0,
          coinIndex_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      withdrawReserveOfShieldedMappingToken: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`withdrawReserveOfShieldedMappingToken: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const domainSep_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "withdrawReserveOfShieldedMappingToken",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 568 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(domainSep_0.buffer instanceof ArrayBuffer && domainSep_0.BYTES_PER_ELEMENT === 1 && domainSep_0.length === 32)) {
          __compactRuntime.typeError(
            "withdrawReserveOfShieldedMappingToken",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 568 char 1",
            "Bytes<32>",
            domainSep_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(domainSep_0),
            alignment: _descriptor_0.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._withdrawReserveOfShieldedMappingToken_0(
          context,
          partialProofData,
          domainSep_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      withdrawReserveOfUnshieldedToken: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`withdrawReserveOfUnshieldedToken: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const token_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "withdrawReserveOfUnshieldedToken",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 579 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(token_0.buffer instanceof ArrayBuffer && token_0.BYTES_PER_ELEMENT === 1 && token_0.length === 32)) {
          __compactRuntime.typeError(
            "withdrawReserveOfUnshieldedToken",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 579 char 1",
            "Bytes<32>",
            token_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(token_0),
            alignment: _descriptor_0.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._withdrawReserveOfUnshieldedToken_0(
          context,
          partialProofData,
          token_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      withdrawReserveOfUnshieldedMappingToken: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`withdrawReserveOfUnshieldedMappingToken: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const domainSep_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "withdrawReserveOfUnshieldedMappingToken",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 589 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(domainSep_0.buffer instanceof ArrayBuffer && domainSep_0.BYTES_PER_ELEMENT === 1 && domainSep_0.length === 32)) {
          __compactRuntime.typeError(
            "withdrawReserveOfUnshieldedMappingToken",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 589 char 1",
            "Bytes<32>",
            domainSep_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_0.toValue(domainSep_0),
            alignment: _descriptor_0.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._withdrawReserveOfUnshieldedMappingToken_0(
          context,
          partialProofData,
          domainSep_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      transferOwner: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`transferOwner: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newOwner_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "transferOwner",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 604 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof newOwner_0 === "object" && newOwner_0.bytes.buffer instanceof ArrayBuffer && newOwner_0.bytes.BYTES_PER_ELEMENT === 1 && newOwner_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "transferOwner",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 604 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            newOwner_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(newOwner_0),
            alignment: _descriptor_1.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._transferOwner_0(
          context,
          partialProofData,
          newOwner_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      acceptOwner: (...args_1) => {
        if (args_1.length !== 1) {
          throw new __compactRuntime.CompactError(`acceptOwner: expected 1 argument (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "acceptOwner",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 609 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: { value: [], alignment: [] },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._acceptOwner_0(context, partialProofData);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setFeeShieldedReceiver: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setFeeShieldedReceiver: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newFeeReceiver_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "setFeeShieldedReceiver",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 614 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof newFeeReceiver_0 === "object" && newFeeReceiver_0.bytes.buffer instanceof ArrayBuffer && newFeeReceiver_0.bytes.BYTES_PER_ELEMENT === 1 && newFeeReceiver_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "setFeeShieldedReceiver",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 614 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            newFeeReceiver_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(newFeeReceiver_0),
            alignment: _descriptor_1.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setFeeShieldedReceiver_0(
          context,
          partialProofData,
          newFeeReceiver_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setFeeUnshieldedReceiver: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setFeeUnshieldedReceiver: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newFeeReceiver_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "setFeeUnshieldedReceiver",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 619 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof newFeeReceiver_0 === "object" && newFeeReceiver_0.bytes.buffer instanceof ArrayBuffer && newFeeReceiver_0.bytes.BYTES_PER_ELEMENT === 1 && newFeeReceiver_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "setFeeUnshieldedReceiver",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 619 char 1",
            "struct UserAddress<bytes: Bytes<32>>",
            newFeeReceiver_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_7.toValue(newFeeReceiver_0),
            alignment: _descriptor_7.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setFeeUnshieldedReceiver_0(
          context,
          partialProofData,
          newFeeReceiver_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setTokenManager: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setTokenManager: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newTokenManager_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "setTokenManager",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 624 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof newTokenManager_0 === "object" && newTokenManager_0.bytes.buffer instanceof ArrayBuffer && newTokenManager_0.bytes.BYTES_PER_ELEMENT === 1 && newTokenManager_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "setTokenManager",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 624 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            newTokenManager_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(newTokenManager_0),
            alignment: _descriptor_1.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setTokenManager_0(
          context,
          partialProofData,
          newTokenManager_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setMegerWorker: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setMegerWorker: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newMergeWorker_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "setMegerWorker",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 629 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof newMergeWorker_0 === "object" && newMergeWorker_0.bytes.buffer instanceof ArrayBuffer && newMergeWorker_0.bytes.BYTES_PER_ELEMENT === 1 && newMergeWorker_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "setMegerWorker",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 629 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            newMergeWorker_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(newMergeWorker_0),
            alignment: _descriptor_1.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setMegerWorker_0(
          context,
          partialProofData,
          newMergeWorker_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
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
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "addAdmin",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 648 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof admin_0 === "object" && admin_0.bytes.buffer instanceof ArrayBuffer && admin_0.bytes.BYTES_PER_ELEMENT === 1 && admin_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "addAdmin",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 648 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            admin_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(admin_0),
            alignment: _descriptor_1.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._addAdmin_0(context, partialProofData, admin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeAdmin: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeAdmin: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const admin_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "removeAdmin",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 654 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof admin_0 === "object" && admin_0.bytes.buffer instanceof ArrayBuffer && admin_0.bytes.BYTES_PER_ELEMENT === 1 && admin_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "removeAdmin",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 654 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            admin_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(admin_0),
            alignment: _descriptor_1.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeAdmin_0(context, partialProofData, admin_0);
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setAdminThreshold: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setAdminThreshold: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const threshold_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "setAdminThreshold",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 660 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof threshold_0 === "bigint" && threshold_0 >= 0n && threshold_0 <= 255n)) {
          __compactRuntime.typeError(
            "setAdminThreshold",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 660 char 1",
            "Uint<0..256>",
            threshold_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_15.toValue(threshold_0),
            alignment: _descriptor_15.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._setAdminThreshold_0(
          context,
          partialProofData,
          threshold_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setSmgPksks: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setSmgPksks: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const voters_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "setSmgPksks",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 666 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(Array.isArray(voters_0) && voters_0.length === 29 && voters_0.every((t) => typeof t === "object" && t.bytes.buffer instanceof ArrayBuffer && t.bytes.BYTES_PER_ELEMENT === 1 && t.bytes.length === 32))) {
          __compactRuntime.typeError(
            "setSmgPksks",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 666 char 1",
            "Vector<29, struct ZswapCoinPublicKey<bytes: Bytes<32>>>",
            voters_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
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
      updateSmgPk: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`updateSmgPk: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newVoter_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "updateSmgPk",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 681 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof newVoter_0 === "object" && newVoter_0.bytes.buffer instanceof ArrayBuffer && newVoter_0.bytes.BYTES_PER_ELEMENT === 1 && newVoter_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "updateSmgPk",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 681 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            newVoter_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_1.toValue(newVoter_0),
            alignment: _descriptor_1.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._updateSmgPk_0(
          context,
          partialProofData,
          newVoter_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      setSmgPKThreold: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`setSmgPKThreold: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const threshold_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "setSmgPKThreold",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 709 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof threshold_0 === "bigint" && threshold_0 >= 0n && threshold_0 <= 255n)) {
          __compactRuntime.typeError(
            "setSmgPKThreold",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 709 char 1",
            "Uint<0..256>",
            threshold_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_15.toValue(threshold_0),
            alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`setFeeCommonConfig: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const chainId_0 = args_1[1];
        const fee_0 = args_1[2];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "setFeeCommonConfig",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 715 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof chainId_0 === "bigint" && chainId_0 >= 0n && chainId_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "setFeeCommonConfig",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 715 char 1",
            "Uint<0..4294967296>",
            chainId_0
          );
        }
        if (!(typeof fee_0 === "bigint" && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError(
            "setFeeCommonConfig",
            "argument 2 (argument 3 as invoked from Typescript)",
            "crosschain.compact line 715 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            fee_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_5.toValue(chainId_0).concat(_descriptor_8.toValue(fee_0)),
            alignment: _descriptor_5.alignment().concat(_descriptor_8.alignment())
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
          throw new __compactRuntime.CompactError(`addTokenPair: expected 3 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenPairId_0 = args_1[1];
        const pairInfo_0 = args_1[2];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "addTokenPair",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 724 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "addTokenPair",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 724 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        if (!(typeof pairInfo_0 === "object" && typeof pairInfo_0.fromChainId === "bigint" && pairInfo_0.fromChainId >= 0n && pairInfo_0.fromChainId <= 4294967295n && typeof pairInfo_0.toChainId === "bigint" && pairInfo_0.toChainId >= 0n && pairInfo_0.toChainId <= 4294967295n && pairInfo_0.midnigthTokenAccount.buffer instanceof ArrayBuffer && pairInfo_0.midnigthTokenAccount.BYTES_PER_ELEMENT === 1 && pairInfo_0.midnigthTokenAccount.length === 32 && pairInfo_0.domainSep.buffer instanceof ArrayBuffer && pairInfo_0.domainSep.BYTES_PER_ELEMENT === 1 && pairInfo_0.domainSep.length === 32 && typeof pairInfo_0.isShielded === "boolean" && typeof pairInfo_0.fee === "bigint" && pairInfo_0.fee >= 0n && pairInfo_0.fee <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError(
            "addTokenPair",
            "argument 2 (argument 3 as invoked from Typescript)",
            "crosschain.compact line 724 char 1",
            "struct TokenPairInfo<fromChainId: Uint<0..4294967296>, toChainId: Uint<0..4294967296>, midnigthTokenAccount: Bytes<32>, domainSep: Bytes<32>, isShielded: Boolean, fee: Uint<0..340282366920938463463374607431768211456>>",
            pairInfo_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_5.toValue(tokenPairId_0).concat(_descriptor_12.toValue(pairInfo_0)),
            alignment: _descriptor_5.alignment().concat(_descriptor_12.alignment())
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
          throw new __compactRuntime.CompactError(`removeTokenPair: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const tokenPairId_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "removeTokenPair",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 736 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "removeTokenPair",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 736 char 1",
            "Uint<0..4294967296>",
            tokenPairId_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_5.toValue(tokenPairId_0),
            alignment: _descriptor_5.alignment()
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
      },
      newProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`newProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const newProposal_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "newProposal",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 742 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof newProposal_0 === "object" && typeof newProposal_0.type === "number" && newProposal_0.type >= 0 && newProposal_0.type <= 8 && typeof newProposal_0.addr === "object" && newProposal_0.addr.bytes.buffer instanceof ArrayBuffer && newProposal_0.addr.bytes.BYTES_PER_ELEMENT === 1 && newProposal_0.addr.bytes.length === 32 && typeof newProposal_0.addrUnshielded === "object" && newProposal_0.addrUnshielded.bytes.buffer instanceof ArrayBuffer && newProposal_0.addrUnshielded.bytes.BYTES_PER_ELEMENT === 1 && newProposal_0.addrUnshielded.bytes.length === 32 && typeof newProposal_0.threshold === "bigint" && newProposal_0.threshold >= 0n && newProposal_0.threshold <= 340282366920938463463374607431768211455n && typeof newProposal_0.feeConfig === "object" && typeof newProposal_0.feeConfig.chainId === "bigint" && newProposal_0.feeConfig.chainId >= 0n && newProposal_0.feeConfig.chainId <= 4294967295n && typeof newProposal_0.feeConfig.fee === "bigint" && newProposal_0.feeConfig.fee >= 0n && newProposal_0.feeConfig.fee <= 340282366920938463463374607431768211455n && Array.isArray(newProposal_0.smgPubkeys) && newProposal_0.smgPubkeys.length === 29 && newProposal_0.smgPubkeys.every((t) => typeof t === "object" && t.bytes.buffer instanceof ArrayBuffer && t.bytes.BYTES_PER_ELEMENT === 1 && t.bytes.length === 32))) {
          __compactRuntime.typeError(
            "newProposal",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 742 char 1",
            "struct Proposal<type: Enum<ProposalType, AddAdmin, RemoveAdmin, UpdateFeeShieldedReceiver, UpdateFeeUnshieldedReceiver, UpdateTokenManager, UpdateAdminThreshold, UpdateSMGPKThreshold, UpdateFeeCommonConfig, SetSmgPKS>, addr: struct ZswapCoinPublicKey<bytes: Bytes<32>>, addrUnshielded: struct UserAddress<bytes: Bytes<32>>, threshold: Uint<0..340282366920938463463374607431768211456>, feeConfig: struct FeeConfig<chainId: Uint<0..4294967296>, fee: Uint<0..340282366920938463463374607431768211456>>, smgPubkeys: Vector<29, struct ZswapCoinPublicKey<bytes: Bytes<32>>>>",
            newProposal_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_11.toValue(newProposal_0),
            alignment: _descriptor_11.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._newProposal_0(
          context,
          partialProofData,
          newProposal_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      voteProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`voteProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const proposalId_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "voteProposal",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 752 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof proposalId_0 === "bigint" && proposalId_0 >= 0n && proposalId_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "voteProposal",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 752 char 1",
            "Uint<0..4294967296>",
            proposalId_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_5.toValue(proposalId_0),
            alignment: _descriptor_5.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._voteProposal_0(
          context,
          partialProofData,
          proposalId_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      executeProposal: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`executeProposal: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const proposalId_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "executeProposal",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 761 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(typeof proposalId_0 === "bigint" && proposalId_0 >= 0n && proposalId_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "executeProposal",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 761 char 1",
            "Uint<0..4294967296>",
            proposalId_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_5.toValue(proposalId_0),
            alignment: _descriptor_5.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._executeProposal_0(
          context,
          partialProofData,
          proposalId_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      },
      removeExpiredHisTxs: (...args_1) => {
        if (args_1.length !== 2) {
          throw new __compactRuntime.CompactError(`removeExpiredHisTxs: expected 2 arguments (as invoked from Typescript), received ${args_1.length}`);
        }
        const contextOrig_0 = args_1[0];
        const txs_0 = args_1[1];
        if (!(typeof contextOrig_0 === "object" && contextOrig_0.currentQueryContext != void 0)) {
          __compactRuntime.typeError(
            "removeExpiredHisTxs",
            "argument 1 (as invoked from Typescript)",
            "crosschain.compact line 797 char 1",
            "CircuitContext",
            contextOrig_0
          );
        }
        if (!(Array.isArray(txs_0) && txs_0.length === 20 && txs_0.every((t) => t.buffer instanceof ArrayBuffer && t.BYTES_PER_ELEMENT === 1 && t.length === 32))) {
          __compactRuntime.typeError(
            "removeExpiredHisTxs",
            "argument 1 (argument 2 as invoked from Typescript)",
            "crosschain.compact line 797 char 1",
            "Vector<20, Bytes<32>>",
            txs_0
          );
        }
        const context = { ...contextOrig_0, gasCost: __compactRuntime.emptyRunningCost() };
        const partialProofData = {
          input: {
            value: _descriptor_2.toValue(txs_0),
            alignment: _descriptor_2.alignment()
          },
          output: void 0,
          publicTranscript: [],
          privateTranscriptOutputs: []
        };
        const result_0 = this._removeExpiredHisTxs_0(
          context,
          partialProofData,
          txs_0
        );
        partialProofData.output = { value: [], alignment: [] };
        return { result: result_0, context, proofData: partialProofData, gasCost: context.gasCost };
      }
    };
    this.impureCircuits = {
      smgMint: this.circuits.smgMint,
      userBurn: this.circuits.userBurn,
      voteMultiCrossProposal: this.circuits.voteMultiCrossProposal,
      voteCrossProposal: this.circuits.voteCrossProposal,
      executeMultiCrossProposal: this.circuits.executeMultiCrossProposal,
      userRechargeForFee: this.circuits.userRechargeForFee,
      userFeeWithdrawRequest: this.circuits.userFeeWithdrawRequest,
      userClaimCoin: this.circuits.userClaimCoin,
      userClaimMappingToken: this.circuits.userClaimMappingToken,
      addReserve: this.circuits.addReserve,
      approveUserWithdrawFee: this.circuits.approveUserWithdrawFee,
      withdrawReserveOfShieldedToken: this.circuits.withdrawReserveOfShieldedToken,
      withdrawReserveOfShieldedMappingToken: this.circuits.withdrawReserveOfShieldedMappingToken,
      withdrawReserveOfUnshieldedToken: this.circuits.withdrawReserveOfUnshieldedToken,
      withdrawReserveOfUnshieldedMappingToken: this.circuits.withdrawReserveOfUnshieldedMappingToken,
      transferOwner: this.circuits.transferOwner,
      acceptOwner: this.circuits.acceptOwner,
      setFeeShieldedReceiver: this.circuits.setFeeShieldedReceiver,
      setFeeUnshieldedReceiver: this.circuits.setFeeUnshieldedReceiver,
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
    if (typeof constructorContext_0 !== "object") {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'constructorContext' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!("initialZswapLocalState" in constructorContext_0)) {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript)`);
    }
    if (typeof constructorContext_0.initialZswapLocalState !== "object") {
      throw new __compactRuntime.CompactError(`Contract state constructor: expected 'initialZswapLocalState' in argument 1 (as invoked from Typescript) to be an object`);
    }
    if (!(typeof adminThresholdInit_0 === "bigint" && adminThresholdInit_0 >= 0n && adminThresholdInit_0 <= 255n)) {
      __compactRuntime.typeError(
        "Contract state constructor",
        "argument 1 (argument 2 as invoked from Typescript)",
        "crosschain.compact line 177 char 1",
        "Uint<0..256>",
        adminThresholdInit_0
      );
    }
    if (!(typeof smgPKThresholdInit_0 === "bigint" && smgPKThresholdInit_0 >= 0n && smgPKThresholdInit_0 <= 255n)) {
      __compactRuntime.typeError(
        "Contract state constructor",
        "argument 2 (argument 3 as invoked from Typescript)",
        "crosschain.compact line 177 char 1",
        "Uint<0..256>",
        smgPKThresholdInit_0
      );
    }
    const state_0 = new __compactRuntime.ContractState();
    let stateValue_0 = __compactRuntime.StateValue.newArray();
    let stateValue_3 = __compactRuntime.StateValue.newArray();
    stateValue_3 = stateValue_3.arrayPush(__compactRuntime.StateValue.newNull());
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
    state_0.data = new __compactRuntime.ChargedState(stateValue_0);
    state_0.setOperation("smgMint", new __compactRuntime.ContractOperation());
    state_0.setOperation("userBurn", new __compactRuntime.ContractOperation());
    state_0.setOperation("voteMultiCrossProposal", new __compactRuntime.ContractOperation());
    state_0.setOperation("voteCrossProposal", new __compactRuntime.ContractOperation());
    state_0.setOperation("executeMultiCrossProposal", new __compactRuntime.ContractOperation());
    state_0.setOperation("userRechargeForFee", new __compactRuntime.ContractOperation());
    state_0.setOperation("userFeeWithdrawRequest", new __compactRuntime.ContractOperation());
    state_0.setOperation("userClaimCoin", new __compactRuntime.ContractOperation());
    state_0.setOperation("userClaimMappingToken", new __compactRuntime.ContractOperation());
    state_0.setOperation("addReserve", new __compactRuntime.ContractOperation());
    state_0.setOperation("approveUserWithdrawFee", new __compactRuntime.ContractOperation());
    state_0.setOperation("withdrawReserveOfShieldedToken", new __compactRuntime.ContractOperation());
    state_0.setOperation("withdrawReserveOfShieldedMappingToken", new __compactRuntime.ContractOperation());
    state_0.setOperation("withdrawReserveOfUnshieldedToken", new __compactRuntime.ContractOperation());
    state_0.setOperation("withdrawReserveOfUnshieldedMappingToken", new __compactRuntime.ContractOperation());
    state_0.setOperation("transferOwner", new __compactRuntime.ContractOperation());
    state_0.setOperation("acceptOwner", new __compactRuntime.ContractOperation());
    state_0.setOperation("setFeeShieldedReceiver", new __compactRuntime.ContractOperation());
    state_0.setOperation("setFeeUnshieldedReceiver", new __compactRuntime.ContractOperation());
    state_0.setOperation("setTokenManager", new __compactRuntime.ContractOperation());
    state_0.setOperation("setMegerWorker", new __compactRuntime.ContractOperation());
    state_0.setOperation("addAdmin", new __compactRuntime.ContractOperation());
    state_0.setOperation("removeAdmin", new __compactRuntime.ContractOperation());
    state_0.setOperation("setAdminThreshold", new __compactRuntime.ContractOperation());
    state_0.setOperation("setSmgPksks", new __compactRuntime.ContractOperation());
    state_0.setOperation("updateSmgPk", new __compactRuntime.ContractOperation());
    state_0.setOperation("setSmgPKThreold", new __compactRuntime.ContractOperation());
    state_0.setOperation("setFeeCommonConfig", new __compactRuntime.ContractOperation());
    state_0.setOperation("addTokenPair", new __compactRuntime.ContractOperation());
    state_0.setOperation("removeTokenPair", new __compactRuntime.ContractOperation());
    state_0.setOperation("newProposal", new __compactRuntime.ContractOperation());
    state_0.setOperation("voteProposal", new __compactRuntime.ContractOperation());
    state_0.setOperation("executeProposal", new __compactRuntime.ContractOperation());
    state_0.setOperation("removeExpiredHisTxs", new __compactRuntime.ContractOperation());
    const context = __compactRuntime.createCircuitContext(__compactRuntime.dummyContractAddress(), constructorContext_0.initialZswapLocalState.coinPublicKey, state_0.data, constructorContext_0.initialPrivateState);
    const partialProofData = {
      input: { value: [], alignment: [] },
      output: void 0,
      publicTranscript: [],
      privateTranscriptOutputs: []
    };
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(0n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_3.toValue(0n),
            alignment: _descriptor_3.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(1n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(new Uint8Array(32)),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(0n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(1n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_30.toValue({ smgId: new Uint8Array(32), fromAddr: { bytes: new Uint8Array(32) }, toAddr: "", tokenPairId: 0n, tokenAccount: new Uint8Array(32), amount: 0n, fee: 0n, nonce: 0n }),
            alignment: _descriptor_30.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(2n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(3n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(4n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_3.toValue(0n),
            alignment: _descriptor_3.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(5n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(6n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(7n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(8n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(9n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(10n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(11n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_7.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(12n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(0n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(13n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(14n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(0n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(0n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_3.toValue(0n),
            alignment: _descriptor_3.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(1n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(2n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(0n),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(3n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(4n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(5n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(6n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(7n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(8n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(9n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(10n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(11n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(12n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(13n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(14n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue({ bytes: new Uint8Array(32) }),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(12n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(tmp_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_1 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(14n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(tmp_1),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_2 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(8n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(tmp_2),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_3 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(10n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(tmp_3),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(14n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(adminThresholdInit_0),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(12n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(smgPKThresholdInit_0),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    const tmp_4 = 1n;
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
          {
            value: _descriptor_13.toValue(tmp_4),
            alignment: _descriptor_13.alignment()
          }.value
        )) } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    state_0.data = context.currentQueryContext.state;
    return {
      currentContractState: state_0,
      currentPrivateState: context.currentPrivateState,
      currentZswapLocalState: context.currentZswapLocalState
    };
  }
  _some_0(value_0) {
    return { is_some: true, value: value_0 };
  }
  _none_0() {
    return {
      is_some: false,
      value: { nonce: new Uint8Array(32), color: new Uint8Array(32), value: 0n }
    };
  }
  _left_0(value_0) {
    return { is_left: true, left: value_0, right: { bytes: new Uint8Array(32) } };
  }
  _left_1(value_0) {
    return { is_left: true, left: value_0, right: new Uint8Array(32) };
  }
  _right_0(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _right_1(value_0) {
    return { is_left: false, left: { bytes: new Uint8Array(32) }, right: value_0 };
  }
  _transientHash_0(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_40, value_0);
    return result_0;
  }
  _transientHash_1(value_0) {
    const result_0 = __compactRuntime.transientHash(_descriptor_37, value_0);
    return result_0;
  }
  _persistentHash_0(value_0) {
    const result_0 = __compactRuntime.persistentHash(_descriptor_39, value_0);
    return result_0;
  }
  _persistentCommit_0(value_0, rand_0) {
    const result_0 = __compactRuntime.persistentCommit(
      _descriptor_36,
      value_0,
      rand_0
    );
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
      value: _descriptor_1.toValue(result_0),
      alignment: _descriptor_1.alignment()
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
    const result_0 = __compactRuntime.createZswapOutput(
      context,
      coin_0,
      recipient_0
    );
    partialProofData.privateTranscriptOutputs.push({
      value: [],
      alignment: []
    });
    return result_0;
  }
  _tokenType_0(domain_sep_0, contractAddress_0) {
    return this._persistentCommit_0(
      [domain_sep_0, contractAddress_0.bytes],
      new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 100, 101, 114, 105, 118, 101, 95, 116, 111, 107, 101, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    );
  }
  _mintShieldedToken_0(context, partialProofData, domain_sep_0, value_0, nonce_0, recipient_0) {
    const coin_0 = {
      nonce: nonce_0,
      color: this._tokenType_0(
        domain_sep_0,
        _descriptor_14.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(0n),
                    alignment: _descriptor_15.alignment()
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
      ),
      value: value_0
    };
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(4n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(domain_sep_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_3.toValue(value_0),
            alignment: _descriptor_3.alignment()
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
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const cm_0 = this._coinCommitment_0(coin_0, recipient_0);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(cm_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newNull().encode()
        } },
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    return coin_0;
  }
  _evolveNonce_0(index_0, nonce_0) {
    return this._upgradeFromTransient_0(this._transientHash_1([
      __compactRuntime.convertBytesToField(
        28,
        new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
        "<standard library>"
      ),
      index_0,
      this._degradeToTransient_0(nonce_0)
    ]));
  }
  _shieldedBurnAddress_0() {
    return this._left_0({ bytes: new Uint8Array(32) });
  }
  _receiveShielded_0(context, partialProofData, coin_0) {
    const recipient_0 = this._right_0(_descriptor_14.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value));
    this._createZswapOutput_0(context, partialProofData, coin_0, recipient_0);
    const tmp_0 = this._coinCommitment_0(coin_0, recipient_0);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(tmp_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newNull().encode()
        } },
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    return [];
  }
  _sendShielded_0(context, partialProofData, input_0, recipient_0, value_0) {
    const selfAddr_0 = _descriptor_14.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
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
    this._createZswapInput_0(context, partialProofData, input_0);
    const tmp_0 = this._coinNullifier_0(
      this._downcastQualifiedCoin_0(input_0),
      selfAddr_0
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(tmp_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newNull().encode()
        } },
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    let t_0;
    const change_0 = (t_0 = input_0.value, __compactRuntime.assert(
      !(t_0 < value_0),
      "result of subtraction would be negative"
    ), t_0 - value_0);
    const output_0 = {
      nonce: this._upgradeFromTransient_0(this._transientHash_0([
        __compactRuntime.convertBytesToField(
          28,
          new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101]),
          "<standard library>"
        ),
        this._degradeToTransient_0(input_0.nonce)
      ])),
      color: input_0.color,
      value: value_0
    };
    this._createZswapOutput_0(context, partialProofData, output_0, recipient_0);
    const tmp_1 = this._coinCommitment_0(output_0, recipient_0);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(tmp_1),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newNull().encode()
        } },
        { ins: { cached: true, n: 2 } },
        { swap: { n: 0 } }
      ]
    );
    if (this._equal_0(change_0, 0n)) {
      return { change: this._none_0(), sent: output_0 };
    } else {
      const changeCoin_0 = {
        nonce: this._upgradeFromTransient_0(this._transientHash_0([
          __compactRuntime.convertBytesToField(
            30,
            new Uint8Array([109, 105, 100, 110, 105, 103, 104, 116, 58, 107, 101, 114, 110, 101, 108, 58, 110, 111, 110, 99, 101, 95, 101, 118, 111, 108, 118, 101, 47, 50]),
            "<standard library>"
          ),
          this._degradeToTransient_0(input_0.nonce)
        ])),
        color: input_0.color,
        value: change_0
      };
      this._createZswapOutput_0(
        context,
        partialProofData,
        changeCoin_0,
        this._right_0(selfAddr_0)
      );
      const cm_0 = this._coinCommitment_0(
        changeCoin_0,
        this._right_0(selfAddr_0)
      );
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(cm_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newNull().encode()
          } },
          { ins: { cached: true, n: 2 } },
          { swap: { n: 0 } }
        ]
      );
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(cm_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newNull().encode()
          } },
          { ins: { cached: true, n: 2 } },
          { swap: { n: 0 } }
        ]
      );
      return { change: this._some_0(changeCoin_0), sent: output_0 };
    }
  }
  _sendImmediateShielded_0(context, partialProofData, input_0, target_0, value_0) {
    return this._sendShielded_0(
      context,
      partialProofData,
      this._upcastQualifiedCoin_0(input_0),
      target_0,
      value_0
    );
  }
  _downcastQualifiedCoin_0(coin_0) {
    return { nonce: coin_0.nonce, color: coin_0.color, value: coin_0.value };
  }
  _upcastQualifiedCoin_0(coin_0) {
    return {
      nonce: coin_0.nonce,
      color: coin_0.color,
      value: coin_0.value,
      mt_index: 0n
    };
  }
  _coinCommitment_0(coin_0, recipient_0) {
    return this._persistentHash_0({
      info: coin_0,
      dataType: recipient_0.is_left,
      data: recipient_0.is_left ? recipient_0.left.bytes : recipient_0.right.bytes,
      domain_sep: new Uint8Array([109, 100, 110, 58, 99, 99])
    });
  }
  _coinNullifier_0(coin_0, addr_0) {
    return this._persistentHash_0({
      info: coin_0,
      dataType: false,
      data: addr_0.bytes,
      domain_sep: new Uint8Array([109, 100, 110, 58, 99, 110])
    });
  }
  _blockTimeLt_0(context, partialProofData, time_0) {
    return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_3.toValue(time_0),
            alignment: _descriptor_3.alignment()
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
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(5n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(domainSep_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_3.toValue(amount_0),
            alignment: _descriptor_3.alignment()
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
      _descriptor_14.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
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
    const tmp_0 = this._left_1(color_0);
    const tmp_1 = amount_0;
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(8n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
            {
              value: _descriptor_31.toValue(tmp_0),
              alignment: _descriptor_31.alignment()
            },
            {
              value: _descriptor_32.toValue(recipient_0),
              alignment: _descriptor_32.alignment()
            }
          )).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_8.toValue(tmp_1),
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
    return color_0;
  }
  _sendUnshielded_0(context, partialProofData, color_0, amount_0, recipient_0) {
    const tmp_0 = this._left_1(color_0);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(7n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_31.toValue(tmp_0),
            alignment: _descriptor_31.alignment()
          }).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
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
    const tmp_1 = this._left_1(color_0);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(8n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell(__compactRuntime.alignedConcat(
            {
              value: _descriptor_31.toValue(tmp_1),
              alignment: _descriptor_31.alignment()
            },
            {
              value: _descriptor_32.toValue(recipient_0),
              alignment: _descriptor_32.alignment()
            }
          )).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
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
    return [];
  }
  _receiveUnshielded_0(context, partialProofData, color_0, amount_0) {
    const tmp_0 = this._left_1(color_0);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(6n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_31.toValue(tmp_0),
            alignment: _descriptor_31.alignment()
          }).encode()
        } },
        { dup: { n: 1 } },
        { dup: { n: 1 } },
        "member",
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
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
    return [];
  }
  _userLock_0(smgId_0, toAddr_0, tokenPairId_0, coin_0) {
    return [];
  }
  _smgRelease_0(uniqueId_0, smgId_0, tokenPairId_0, amount_0, toAddr_0, fee_0, ttl_0) {
    return [];
  }
  _smgMint_0(context, partialProofData, uniqueId_0, smgId_0, tokenPairId_0, amount_0, fee_0, toAddr_0, ttl_0) {
    this._addCrossProposal_0(
      context,
      partialProofData,
      uniqueId_0,
      smgId_0,
      tokenPairId_0,
      amount_0,
      toAddr_0,
      fee_0,
      ttl_0,
      true,
      true
    );
    return [];
  }
  _userBurn_0(context, partialProofData, smgId_0, toAddr_0, tokenPairId_0, coin_0) {
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(7n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_5.toValue(tokenPairId_0),
              alignment: _descriptor_5.alignment()
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
    const tokenPair_0 = _descriptor_12.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(7n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_5.toValue(tokenPairId_0),
                alignment: _descriptor_5.alignment()
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
    __compactRuntime.assert(
      this._equal_1(
        tokenPair_0.midnigthTokenAccount,
        coin_0.color
      ),
      "token color not match"
    );
    const contractFee_0 = this._getFee_0(
      context,
      partialProofData,
      tokenPairId_0
    );
    this._receiveShielded_0(context, partialProofData, coin_0);
    this._sendImmediateShielded_0(
      context,
      partialProofData,
      coin_0,
      this._shieldedBurnAddress_0(),
      coin_0.value
    );
    const tmp_0 = {
      smgId: smgId_0,
      fromAddr: this._ownPublicKey_0(context, partialProofData),
      toAddr: toAddr_0,
      tokenPairId: tokenPairId_0,
      tokenAccount: tokenPair_0.midnigthTokenAccount,
      amount: coin_0.value,
      fee: contractFee_0,
      nonce: ((t1) => {
        if (t1 > 340282366920938463463374607431768211455n) {
          throw new __compactRuntime.CompactError("crosschain.compact line 269 char 14: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
        }
        return t1;
      })(_descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value))
    };
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(1n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_30.toValue(tmp_0),
            alignment: _descriptor_30.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    if (contractFee_0 > 0n) {
      this._updateUserFee_0(
        context,
        partialProofData,
        this._ownPublicKey_0(context, partialProofData),
        contractFee_0,
        false
      );
      this._updateUnshieldedReserve_0(
        context,
        partialProofData,
        false,
        this._nativeToken_0(),
        contractFee_0,
        true
      );
    }
    this._updateTokenTotalSupply_0(
      context,
      partialProofData,
      tokenPair_0.midnigthTokenAccount,
      coin_0.value,
      false
    );
    return [];
  }
  _addCrossProposal_0(context, partialProofData, uniqueId_0, smgId_0, tokenPairId_0, amount_0, toAddr_0, fee_0, ttl_0, isMappingToken_0, isShielded_0) {
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(6n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(uniqueId_0),
              alignment: _descriptor_0.alignment()
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
    __compactRuntime.assert(
      (tmp_0 = this._ownPublicKey_0(
        context,
        partialProofData
      ), _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_1.toValue(tmp_0),
              alignment: _descriptor_1.alignment()
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
    if (_descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(4n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
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
      if (this._blockTimeLt_0(
        context,
        partialProofData,
        _descriptor_22.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(4n),
                    alignment: _descriptor_15.alignment()
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
                    value: _descriptor_0.toValue(uniqueId_0),
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
        ).value).ttl
      )) {
        __compactRuntime.assert(false, "proposal exists");
      } else {
        __compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(4n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_0.toValue(uniqueId_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            { rem: { cached: false } },
            { ins: { cached: true, n: 2 } }
          ]
        );
        __compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(5n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_0.toValue(uniqueId_0),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            { rem: { cached: false } },
            { ins: { cached: true, n: 2 } }
          ]
        );
      }
    }
    __compactRuntime.assert(
      this._blockTimeLt_0(context, partialProofData, ttl_0),
      "ttl expired"
    );
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(7n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_5.toValue(tokenPairId_0),
              alignment: _descriptor_5.alignment()
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
    const tokenPair_0 = _descriptor_12.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(7n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_5.toValue(tokenPairId_0),
                alignment: _descriptor_5.alignment()
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
    const newCrossProposal_0 = {
      smgId: smgId_0,
      token: isMappingToken_0 ? tokenPair_0.domainSep : tokenPair_0.midnigthTokenAccount,
      tokenPairId: tokenPairId_0,
      isMappingToken: isMappingToken_0,
      isShielded: isShielded_0,
      amount: amount_0,
      fee: fee_0,
      toAddr: toAddr_0,
      ttl: ttl_0
    };
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(4n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_22.toValue(newCrossProposal_0),
            alignment: _descriptor_22.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(5n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    this._voteCrossProposal_0(
      context,
      partialProofData,
      { uniqueId: uniqueId_0, ttl: ttl_0 }
    );
    const tmp_1 = 1n;
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
          {
            value: _descriptor_13.toValue(tmp_1),
            alignment: _descriptor_13.alignment()
          }.value
        )) } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _voteMultiCrossProposal_0(context, partialProofData, uniqueIds_0) {
    this._folder_0(
      context,
      partialProofData,
      ((context2, partialProofData2, t_0, target_0) => {
        if (!this._equal_2(target_0.uniqueId, new Uint8Array(32))) {
          this._voteCrossProposal_0(
            context2,
            partialProofData2,
            target_0
          );
        }
        return t_0;
      }),
      [],
      uniqueIds_0
    );
    return [];
  }
  _voteCrossProposal_0(context, partialProofData, target_0) {
    let tmp_0;
    __compactRuntime.assert(
      (tmp_0 = this._ownPublicKey_0(
        context,
        partialProofData
      ), _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_1.toValue(tmp_0),
              alignment: _descriptor_1.alignment()
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
    let tmp_1;
    __compactRuntime.assert(
      (tmp_1 = target_0.uniqueId, _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(4n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(tmp_1),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)),
      "proposal not exists"
    );
    let tmp_2;
    const proposal_0 = (tmp_2 = target_0.uniqueId, _descriptor_22.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(4n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_0.toValue(tmp_2),
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
    __compactRuntime.assert(
      this._equal_3(proposal_0.ttl, target_0.ttl),
      "ttl not match"
    );
    let tmp_3;
    if ((tmp_3 = target_0.uniqueId, _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(5n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_0.toValue(tmp_3),
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
    ).value)) >= _descriptor_15.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(12n),
                alignment: _descriptor_15.alignment()
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
      return [];
    } else {
      if (this._blockTimeGte_0(context, partialProofData, proposal_0.ttl)) {
        const tmp_4 = target_0.uniqueId;
        __compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(4n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_0.toValue(tmp_4),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            { rem: { cached: false } },
            { ins: { cached: true, n: 2 } }
          ]
        );
        const tmp_5 = target_0.uniqueId;
        __compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(5n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_0.toValue(tmp_5),
                alignment: _descriptor_0.alignment()
              }).encode()
            } },
            { rem: { cached: false } },
            { ins: { cached: true, n: 2 } }
          ]
        );
        return [];
      } else {
        let tmp_6;
        const voterIndex_0 = (tmp_6 = this._ownPublicKey_0(
          context,
          partialProofData
        ), _descriptor_15.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(0n),
                    alignment: _descriptor_15.alignment()
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
                    value: _descriptor_1.toValue(tmp_6),
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
        let tmp_7;
        __compactRuntime.assert(
          !(tmp_7 = target_0.uniqueId, _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                      value: _descriptor_15.toValue(2n),
                      alignment: _descriptor_15.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_15.toValue(5n),
                      alignment: _descriptor_15.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_0.toValue(tmp_7),
                      alignment: _descriptor_0.alignment()
                    }
                  }
                ]
              } },
              { push: {
                storage: false,
                value: __compactRuntime.StateValue.newCell({
                  value: _descriptor_15.toValue(voterIndex_0),
                  alignment: _descriptor_15.alignment()
                }).encode()
              } },
              "member",
              { popeq: {
                cached: true,
                result: void 0
              } }
            ]
          ).value)),
          "already voted"
        );
        const tmp_8 = target_0.uniqueId;
        __compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(5n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(tmp_8),
                    alignment: _descriptor_0.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_15.toValue(voterIndex_0),
                alignment: _descriptor_15.alignment()
              }).encode()
            } },
            { push: {
              storage: true,
              value: __compactRuntime.StateValue.newNull().encode()
            } },
            { ins: { cached: false, n: 1 } },
            { ins: { cached: true, n: 3 } }
          ]
        );
        let tmp_9;
        if ((tmp_9 = target_0.uniqueId, _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(5n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_0.toValue(tmp_9),
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
        ).value)) >= _descriptor_15.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(12n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { popeq: {
              cached: false,
              result: void 0
            } }
          ]
        ).value) && proposal_0.fee > 0n) {
          if (proposal_0.isShielded) {
            this._updateShieldedReserve_0(
              context,
              partialProofData,
              proposal_0.isMappingToken,
              proposal_0.token,
              proposal_0.fee,
              true
            );
          } else {
            this._updateUnshieldedReserve_0(
              context,
              partialProofData,
              proposal_0.isMappingToken,
              proposal_0.token,
              proposal_0.fee,
              true
            );
          }
        }
        return [];
      }
    }
  }
  _executeMultiCrossProposal_0(context, partialProofData, mutiEx_0) {
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(2n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    this._folder_1(
      context,
      partialProofData,
      ((context2, partialProofData2, t_0, exCp_0) => {
        if (!this._equal_4(exCp_0.uniqueId, new Uint8Array(32))) {
          this._executeCrossProposal_0(
            context2,
            partialProofData2,
            exCp_0.uniqueId,
            exCp_0.coinIndex
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
    __compactRuntime.assert(delta_0 > 0n, "delta must be positive");
    const oldTotalSupply_0 = _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(11n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(token_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value) ? _descriptor_8.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(11n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_0.toValue(token_0),
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
    ).value) : 0n;
    __compactRuntime.assert(
      isAdd_0 || oldTotalSupply_0 >= delta_0,
      "delta must be less than or equal to oldTotalSupply"
    );
    const newTotalSupply_0 = isAdd_0 ? oldTotalSupply_0 + delta_0 : (__compactRuntime.assert(
      !(oldTotalSupply_0 < delta_0),
      "result of subtraction would be negative"
    ), oldTotalSupply_0 - delta_0);
    if (this._equal_5(newTotalSupply_0, 0n)) {
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(11n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    } else {
      const tmp_0 = ((t1) => {
        if (t1 > 340282366920938463463374607431768211455n) {
          throw new __compactRuntime.CompactError("crosschain.compact line 387 char 52: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
        }
        return t1;
      })(newTotalSupply_0);
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(11n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_8.toValue(tmp_0),
              alignment: _descriptor_8.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    return [];
  }
  _executeCrossProposal_0(context, partialProofData, uniqueId_0, coinIndex_0) {
    __compactRuntime.assert(
      this._equal_6(
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(14n),
                    alignment: _descriptor_15.alignment()
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
      "only mergeWorker can executeCrossProposal "
    );
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(4n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(uniqueId_0),
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
      "crossproposal not exists"
    );
    __compactRuntime.assert(
      _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(5n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_0.toValue(uniqueId_0),
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
      ).value) >= _descriptor_15.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(12n),
                  alignment: _descriptor_15.alignment()
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
      "not enough votes"
    );
    const proposal_0 = _descriptor_22.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(4n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_0.toValue(uniqueId_0),
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
    if (proposal_0.isMappingToken === false) {
      __compactRuntime.assert(
        _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(3n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_8.toValue(coinIndex_0),
                alignment: _descriptor_8.alignment()
              }).encode()
            } },
            "member",
            { popeq: {
              cached: true,
              result: void 0
            } }
          ]
        ).value),
        "coin not exists"
      );
      const coinInput_0 = _descriptor_18.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(3n),
                  alignment: _descriptor_15.alignment()
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
                  value: _descriptor_8.toValue(coinIndex_0),
                  alignment: _descriptor_8.alignment()
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
      __compactRuntime.assert(
        this._equal_7(coinInput_0.value, proposal_0.amount),
        "coin value not match"
      );
      const tmp_0 = { receiver: proposal_0.toAddr, coin: coinInput_0 };
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(9n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(uniqueId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_21.toValue(tmp_0),
              alignment: _descriptor_21.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(3n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_8.toValue(coinIndex_0),
              alignment: _descriptor_8.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    } else {
      const tmp_1 = {
        receiver: proposal_0.toAddr,
        domainSep: proposal_0.token,
        amount: proposal_0.amount
      };
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(10n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(uniqueId_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_20.toValue(tmp_1),
              alignment: _descriptor_20.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
      let tmp_2;
      const tokenPair_0 = (tmp_2 = proposal_0.tokenPairId, _descriptor_12.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(7n),
                  alignment: _descriptor_15.alignment()
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
                  value: _descriptor_5.toValue(tmp_2),
                  alignment: _descriptor_5.alignment()
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
      this._updateTokenTotalSupply_0(
        context,
        partialProofData,
        tokenPair_0.midnigthTokenAccount,
        proposal_0.amount,
        true
      );
    }
    const tmp_3 = { uniqueId: uniqueId_0, crossProposal: proposal_0 };
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_23.toValue(tmp_3),
            alignment: _descriptor_23.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newNull().encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    const tmp_4 = proposal_0.ttl;
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(6n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_3.toValue(tmp_4),
            alignment: _descriptor_3.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(4n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(5n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(uniqueId_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _addTreasuryCoin_0(context, partialProofData, coin_0) {
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(4n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
          {
            value: _descriptor_13.toValue(tmp_0),
            alignment: _descriptor_13.alignment()
          }.value
        )) } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    const tmp_1 = ((t1) => {
      if (t1 > 340282366920938463463374607431768211455n) {
        throw new __compactRuntime.CompactError("crosschain.compact line 421 char 28: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
      }
      return t1;
    })(_descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(4n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value));
    const tmp_2 = this._right_0(_descriptor_14.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value));
    __compactRuntime.hasCoinCommitment(context, coin_0, tmp_2) ? __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(3n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_8.toValue(tmp_1),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { dup: { n: 7 } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell(__compactRuntime.runtimeCoinCommitment(
            {
              value: _descriptor_19.toValue(coin_0),
              alignment: _descriptor_19.alignment()
            },
            {
              value: _descriptor_24.toValue(tmp_2),
              alignment: _descriptor_24.alignment()
            }
          )).encode()
        } },
        { idx: {
          cached: true,
          pushPath: false,
          path: [
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            { tag: "stack" }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_19.toValue(coin_0),
            alignment: _descriptor_19.alignment()
          }).encode()
        } },
        { swap: { n: 0 } },
        { concat: {
          cached: true,
          n: 91
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
    ) : (() => {
      throw new __compactRuntime.CompactError(`crosschain.compact line 421 char 3: Coin commitment not found. Check the coin has been received (or call 'createZswapOutput')`);
    })();
    return [];
  }
  _getFee_0(context, partialProofData, tokenPairId_0) {
    const tokenPair_0 = _descriptor_12.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(7n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_5.toValue(tokenPairId_0),
                alignment: _descriptor_5.alignment()
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
    if (this._equal_8(tokenPair_0.fee, 0n)) {
      let tmp_0;
      if (tmp_0 = tokenPair_0.toChainId, _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(9n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_5.toValue(tmp_0),
              alignment: _descriptor_5.alignment()
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
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(9n),
                    alignment: _descriptor_15.alignment()
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
                    value: _descriptor_5.toValue(tmp_1),
                    alignment: _descriptor_5.alignment()
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
  _userRechargeForFee_0(context, partialProofData, amount_0) {
    this._receiveUnshielded_0(
      context,
      partialProofData,
      this._nativeToken_0(),
      amount_0
    );
    this._updateUserFee_0(
      context,
      partialProofData,
      this._ownPublicKey_0(context, partialProofData),
      amount_0,
      true
    );
    return [];
  }
  _userFeeWithdrawRequest_0(context, partialProofData, receiptor_0) {
    const tmp_0 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(8n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(tmp_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_7.toValue(receiptor_0),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _userClaimCoin_0(context, partialProofData, id_0) {
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(9n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(id_0),
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
      "coin not exists"
    );
    const claimCoinInfo_0 = _descriptor_21.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(9n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_0.toValue(id_0),
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
    __compactRuntime.assert(
      this._equal_9(
        claimCoinInfo_0.receiver,
        this._ownPublicKey_0(
          context,
          partialProofData
        )
      ),
      "not receiver"
    );
    this._sendShielded_0(
      context,
      partialProofData,
      claimCoinInfo_0.coin,
      this._left_0(claimCoinInfo_0.receiver),
      claimCoinInfo_0.coin.value
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(9n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(id_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _userClaimMappingToken_0(context, partialProofData, id_0) {
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(10n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(id_0),
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
      "mapping token not exists"
    );
    const claimMappingTokenInfo_0 = _descriptor_20.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(10n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_0.toValue(id_0),
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
    __compactRuntime.assert(
      this._equal_10(
        claimMappingTokenInfo_0.receiver,
        this._ownPublicKey_0(
          context,
          partialProofData
        )
      ),
      "not receiver"
    );
    const tmp_0 = this._evolveNonce_0(
      ((t1) => {
        if (t1 > 18446744073709551615n) {
          throw new __compactRuntime.CompactError("crosschain.compact line 468 char 23: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 18446744073709551615");
        }
        return t1;
      })(_descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)),
      _descriptor_0.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
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
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(1n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(tmp_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    this._mintShieldedToken_0(
      context,
      partialProofData,
      claimMappingTokenInfo_0.domainSep,
      ((t1) => {
        if (t1 > 18446744073709551615n) {
          throw new __compactRuntime.CompactError("crosschain.compact line 469 char 53: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 18446744073709551615");
        }
        return t1;
      })(claimMappingTokenInfo_0.amount),
      _descriptor_0.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
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
      this._left_0(claimMappingTokenInfo_0.receiver)
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(10n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(id_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _updateUserFee_0(context, partialProofData, user_0, delta_0, isAdd_0) {
    __compactRuntime.assert(delta_0 > 0n, "delta must be positive");
    let tmp_0, tmp_1;
    const oldBalance_0 = (tmp_0 = this._ownPublicKey_0(context, partialProofData), _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(7n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(tmp_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value)) ? (tmp_1 = this._ownPublicKey_0(context, partialProofData), _descriptor_8.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(7n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_1.toValue(tmp_1),
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
    ).value)) : 0n;
    __compactRuntime.assert(
      isAdd_0 || oldBalance_0 >= delta_0,
      "userFeeBalance not enough"
    );
    const newBalance_0 = isAdd_0 ? oldBalance_0 + delta_0 : (__compactRuntime.assert(
      !(oldBalance_0 < delta_0),
      "result of subtraction would be negative"
    ), oldBalance_0 - delta_0);
    if (this._equal_11(newBalance_0, 0n)) {
      const tmp_2 = this._ownPublicKey_0(context, partialProofData);
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(7n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_1.toValue(tmp_2),
              alignment: _descriptor_1.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    } else {
      const tmp_3 = this._ownPublicKey_0(context, partialProofData);
      const tmp_4 = ((t1) => {
        if (t1 > 340282366920938463463374607431768211455n) {
          throw new __compactRuntime.CompactError("crosschain.compact line 482 char 43: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
        }
        return t1;
      })(newBalance_0);
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(7n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_1.toValue(tmp_3),
              alignment: _descriptor_1.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_8.toValue(tmp_4),
              alignment: _descriptor_8.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    return [];
  }
  _addReserve_0(context, partialProofData, coin_0) {
    this._receiveShielded_0(context, partialProofData, coin_0);
    this._addTreasuryCoin_0(context, partialProofData, coin_0);
    this._updateShieldedReserve_0(
      context,
      partialProofData,
      false,
      coin_0.color,
      coin_0.value,
      true
    );
    return [];
  }
  _updateShieldedReserve_0(context, partialProofData, isMappingToken_0, token_0, delta_0, isAdd_0) {
    __compactRuntime.assert(delta_0 > 0n, "delta must be positive");
    const oldAmount_0 = _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(5n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(token_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value) ? _descriptor_17.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(5n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_0.toValue(token_0),
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
    ).value).total : 0n;
    __compactRuntime.assert(
      isAdd_0 || oldAmount_0 >= delta_0,
      "delta must be less than or equal to oldAmount"
    );
    const newAmount_0 = isAdd_0 ? oldAmount_0 + delta_0 : (__compactRuntime.assert(
      !(oldAmount_0 < delta_0),
      "result of subtraction would be negative"
    ), oldAmount_0 - delta_0);
    if (this._equal_12(newAmount_0, 0n)) {
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(5n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
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
            throw new __compactRuntime.CompactError("crosschain.compact line 506 char 76: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
          }
          return t1;
        })(newAmount_0),
        isMappingToken: isMappingToken_0
      };
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(5n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_17.toValue(tmp_0),
              alignment: _descriptor_17.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    return [];
  }
  _updateUnshieldedReserve_0(context, partialProofData, isMappingToken_0, token_0, delta_0, isAdd_0) {
    __compactRuntime.assert(delta_0 > 0n, "delta must be positive");
    const oldAmount_0 = _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(6n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(token_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value) ? _descriptor_17.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(6n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_0.toValue(token_0),
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
    ).value).total : 0n;
    __compactRuntime.assert(
      isAdd_0 || oldAmount_0 >= delta_0,
      "delta must be less than or equal to oldAmount"
    );
    const newAmount_0 = isAdd_0 ? oldAmount_0 + delta_0 : (__compactRuntime.assert(
      !(oldAmount_0 < delta_0),
      "result of subtraction would be negative"
    ), oldAmount_0 - delta_0);
    if (this._equal_13(newAmount_0, 0n)) {
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(6n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
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
            throw new __compactRuntime.CompactError("crosschain.compact line 520 char 78: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 340282366920938463463374607431768211455");
          }
          return t1;
        })(newAmount_0),
        isMappingToken: isMappingToken_0
      };
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(6n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_17.toValue(tmp_0),
              alignment: _descriptor_17.alignment()
            }).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    return [];
  }
  _approveUserWithdrawFee_0(context, partialProofData, user_0) {
    __compactRuntime.assert(
      this._equal_14(
        this._ownPublicKey_0(
          context,
          partialProofData
        ),
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(10n),
                    alignment: _descriptor_15.alignment()
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
      "only feeShieldedReceiver can approveUserWithDrawFee"
    );
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(7n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_1.toValue(user_0),
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
      "userFeeBalance not exists"
    );
    const userFeeBalanceInfo_0 = _descriptor_8.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(7n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_1.toValue(user_0),
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
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(8n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_1.toValue(user_0),
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
      "userFeeWithdrawAddress not exists"
    );
    const receiptor_0 = _descriptor_7.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(8n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_1.toValue(user_0),
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
    this._updateUserFee_0(
      context,
      partialProofData,
      user_0,
      userFeeBalanceInfo_0,
      false
    );
    this._sendUnshielded_0(
      context,
      partialProofData,
      this._nativeToken_0(),
      userFeeBalanceInfo_0,
      this._right_1(receiptor_0)
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(8n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(user_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _withdrawReserveOfShieldedToken_0(context, partialProofData, token_0, coinIndex_0) {
    __compactRuntime.assert(
      this._equal_15(
        this._ownPublicKey_0(
          context,
          partialProofData
        ),
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(10n),
                    alignment: _descriptor_15.alignment()
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
      "only feeShieldedReceiver can withdrawReserveOfShieldedToken"
    );
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(5n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
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
      "fee of specified token not exists"
    );
    const reserveInfo_0 = _descriptor_17.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(5n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_0.toValue(token_0),
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
    __compactRuntime.assert(
      reserveInfo_0.isMappingToken === false,
      "only native token can be executed"
    );
    const coinInput_0 = _descriptor_18.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(3n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_8.toValue(coinIndex_0),
                alignment: _descriptor_8.alignment()
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
    __compactRuntime.assert(
      coinInput_0.value <= reserveInfo_0.total,
      "not enough reserve"
    );
    this._sendShielded_0(
      context,
      partialProofData,
      coinInput_0,
      this._left_0(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(10n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value)),
      coinInput_0.value
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(3n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_8.toValue(coinIndex_0),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    this._updateShieldedReserve_0(
      context,
      partialProofData,
      false,
      token_0,
      coinInput_0.value,
      false
    );
    return [];
  }
  _withdrawReserveOfShieldedMappingToken_0(context, partialProofData, domainSep_0) {
    __compactRuntime.assert(
      this._equal_16(
        this._ownPublicKey_0(
          context,
          partialProofData
        ),
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(10n),
                    alignment: _descriptor_15.alignment()
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
      "only feeShieldedReceiver can withdrawReserveOfShieldedMappingToken"
    );
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(5n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(domainSep_0),
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
      "reserver of specified domainSep not exists"
    );
    const reserveInfo_0 = _descriptor_17.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(5n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_0.toValue(domainSep_0),
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
    __compactRuntime.assert(
      reserveInfo_0.isMappingToken === true,
      "only mapping token can be executed"
    );
    const tmp_0 = this._evolveNonce_0(
      ((t1) => {
        if (t1 > 18446744073709551615n) {
          throw new __compactRuntime.CompactError("crosschain.compact line 574 char 23: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 18446744073709551615");
        }
        return t1;
      })(_descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)),
      _descriptor_0.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
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
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(1n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(tmp_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    this._mintShieldedToken_0(
      context,
      partialProofData,
      domainSep_0,
      ((t1) => {
        if (t1 > 18446744073709551615n) {
          throw new __compactRuntime.CompactError("crosschain.compact line 575 char 42: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 18446744073709551615");
        }
        return t1;
      })(reserveInfo_0.total),
      _descriptor_0.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
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
      this._left_0(_descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(10n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value))
    );
    this._updateShieldedReserve_0(
      context,
      partialProofData,
      true,
      domainSep_0,
      reserveInfo_0.total,
      false
    );
    return [];
  }
  _withdrawReserveOfUnshieldedToken_0(context, partialProofData, token_0) {
    __compactRuntime.assert(
      this._equal_17(
        this._ownPublicKey_0(
          context,
          partialProofData
        ),
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(10n),
                    alignment: _descriptor_15.alignment()
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
      "only feeShieldedReceiver can withdrawReserveOfUnshieldedToken"
    );
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(5n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(token_0),
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
      "fee of specified token not exists"
    );
    const reserveInfo_0 = _descriptor_17.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(6n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_0.toValue(token_0),
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
    __compactRuntime.assert(
      reserveInfo_0.isMappingToken === false,
      "only native token can be executed"
    );
    this._sendUnshielded_0(
      context,
      partialProofData,
      token_0,
      reserveInfo_0.total,
      this._right_1(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(11n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value))
    );
    this._updateUnshieldedReserve_0(
      context,
      partialProofData,
      true,
      token_0,
      reserveInfo_0.total,
      false
    );
    return [];
  }
  _withdrawReserveOfUnshieldedMappingToken_0(context, partialProofData, domainSep_0) {
    __compactRuntime.assert(
      this._equal_18(
        this._ownPublicKey_0(
          context,
          partialProofData
        ),
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(10n),
                    alignment: _descriptor_15.alignment()
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
      "only feeShieldedReceiver can withdrawReserveOfUnshieldedMappingToken"
    );
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(5n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(domainSep_0),
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
      "reserver of specified domainSep not exists"
    );
    const reserveInfo_0 = _descriptor_17.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(5n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_0.toValue(domainSep_0),
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
    __compactRuntime.assert(
      reserveInfo_0.isMappingToken === true,
      "only mapping token can be executed"
    );
    this._mintUnshieldedToken_0(
      context,
      partialProofData,
      domainSep_0,
      ((t1) => {
        if (t1 > 18446744073709551615n) {
          throw new __compactRuntime.CompactError("crosschain.compact line 596 char 44: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 18446744073709551615");
        }
        return t1;
      })(reserveInfo_0.total),
      this._right_1(_descriptor_7.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(11n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: false,
            result: void 0
          } }
        ]
      ).value))
    );
    this._updateUnshieldedReserve_0(
      context,
      partialProofData,
      true,
      domainSep_0,
      reserveInfo_0.total,
      false
    );
    return [];
  }
  _transferOwner_0(context, partialProofData, newOwner_0) {
    __compactRuntime.assert(
      this._equal_19(
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(12n),
                    alignment: _descriptor_15.alignment()
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
      "only owner can transfer ownership"
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(13n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(newOwner_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _acceptOwner_0(context, partialProofData) {
    __compactRuntime.assert(
      this._equal_20(
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(13n),
                    alignment: _descriptor_15.alignment()
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
      "only pending owner can accept ownership"
    );
    const tmp_0 = _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(13n),
                alignment: _descriptor_15.alignment()
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
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(12n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(tmp_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _setFeeShieldedReceiver_0(context, partialProofData, newFeeReceiver_0) {
    __compactRuntime.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "not admin authorized"
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(10n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(newFeeReceiver_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _setFeeUnshieldedReceiver_0(context, partialProofData, newFeeReceiver_0) {
    __compactRuntime.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "not admin authorized"
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(11n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_7.toValue(newFeeReceiver_0),
            alignment: _descriptor_7.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _setTokenManager_0(context, partialProofData, newTokenManager_0) {
    __compactRuntime.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "not admin authorized"
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(8n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(newTokenManager_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _setMegerWorker_0(context, partialProofData, newMergeWorker_0) {
    __compactRuntime.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "not admin authorized"
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(14n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(newMergeWorker_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _mergeTreasuryCoin_0(coins_0) {
    return [];
  }
  _addAdmin_0(context, partialProofData, admin_0) {
    __compactRuntime.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "not admin authorized"
    );
    __compactRuntime.assert(
      !_descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(13n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_1.toValue(admin_0),
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
      "admin already exists"
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(13n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(admin_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_4.toValue(true),
            alignment: _descriptor_4.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _removeAdmin_0(context, partialProofData, admin_0) {
    __compactRuntime.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "not admin authorized"
    );
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(13n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_1.toValue(admin_0),
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
      "admin does not exist"
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(13n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(admin_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _setAdminThreshold_0(context, partialProofData, threshold_0) {
    __compactRuntime.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "not admin authorized"
    );
    __compactRuntime.assert(
      threshold_0 <= _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(13n),
                  alignment: _descriptor_15.alignment()
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
      "threshold must be less than or equal to the number of admins"
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(14n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(threshold_0),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _setSmgPksks_0(context, partialProofData, voters_0) {
    __compactRuntime.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "only owner can set smg pks"
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(0n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
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
        __compactRuntime.assert(
          !_descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                      value: _descriptor_15.toValue(1n),
                      alignment: _descriptor_15.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_15.toValue(0n),
                      alignment: _descriptor_15.alignment()
                    }
                  }
                ]
              } },
              { push: {
                storage: false,
                value: __compactRuntime.StateValue.newCell({
                  value: _descriptor_1.toValue(voter_0),
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
          "smg voter Repeatedly adding"
        );
        if (!this._equal_21(voter_0, { bytes: new Uint8Array(32) })) {
          __compactRuntime.queryLedgerState(
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
                      value: _descriptor_15.toValue(1n),
                      alignment: _descriptor_15.alignment()
                    }
                  },
                  {
                    tag: "value",
                    value: {
                      value: _descriptor_15.toValue(0n),
                      alignment: _descriptor_15.alignment()
                    }
                  }
                ]
              } },
              { push: {
                storage: false,
                value: __compactRuntime.StateValue.newCell({
                  value: _descriptor_1.toValue(voter_0),
                  alignment: _descriptor_1.alignment()
                }).encode()
              } },
              { push: {
                storage: true,
                value: __compactRuntime.StateValue.newCell({
                  value: _descriptor_15.toValue(index_0),
                  alignment: _descriptor_15.alignment()
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
              throw new __compactRuntime.CompactError("crosschain.compact line 674 char 14: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 255");
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
  _updateSmgPk_0(context, partialProofData, newVoter_0) {
    let tmp_0;
    __compactRuntime.assert(
      (tmp_0 = this._ownPublicKey_0(
        context,
        partialProofData
      ), _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_1.toValue(tmp_0),
              alignment: _descriptor_1.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)),
      "voter does not exist"
    );
    __compactRuntime.assert(
      !_descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_1.toValue(newVoter_0),
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
      "the new voter exist"
    );
    let tmp_1;
    const index_0 = (tmp_1 = this._ownPublicKey_0(context, partialProofData), _descriptor_15.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_1.toValue(tmp_1),
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
    const tmp_2 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(tmp_2),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(newVoter_0),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(index_0),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _checkAdminAuthorized_0(context, partialProofData) {
    const isOwner_0 = this._equal_22(
      _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(12n),
                  alignment: _descriptor_15.alignment()
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
    let tmp_0, tmp_1;
    const isAdminAuthorized_0 = (tmp_1 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value), _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(3n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(tmp_1),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value)) && (tmp_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value), _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(3n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_5.toValue(tmp_0),
                alignment: _descriptor_5.alignment()
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
    ).value)) >= _descriptor_15.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(14n),
                alignment: _descriptor_15.alignment()
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
    return isOwner_0 && this._equal_23(
      _descriptor_15.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(14n),
                  alignment: _descriptor_15.alignment()
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
    __compactRuntime.assert(
      this._checkAdminAuthorized_0(
        context,
        partialProofData
      ),
      "not admin authorized"
    );
    __compactRuntime.assert(
      threshold_0 <= _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
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
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(12n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(threshold_0),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    return [];
  }
  _setFeeCommonConfig_0(context, partialProofData, chainId_0, fee_0) {
    __compactRuntime.assert(
      this._equal_24(
        this._ownPublicKey_0(
          context,
          partialProofData
        ),
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(8n),
                    alignment: _descriptor_15.alignment()
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
    if (_descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(9n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(chainId_0),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value)) {
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(9n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_5.toValue(chainId_0),
              alignment: _descriptor_5.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(9n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(chainId_0),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_8.toValue(fee_0),
            alignment: _descriptor_8.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _addTokenPair_0(context, partialProofData, tokenPairId_0, pairInfo_0) {
    __compactRuntime.assert(
      this._equal_25(
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(8n),
                    alignment: _descriptor_15.alignment()
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
    __compactRuntime.assert(
      !_descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(7n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_5.toValue(tokenPairId_0),
              alignment: _descriptor_5.alignment()
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
    if (!this._equal_26(pairInfo_0.domainSep, new Uint8Array(32))) {
      const expectColor_0 = this._tokenType_0(
        pairInfo_0.domainSep,
        _descriptor_14.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(0n),
                    alignment: _descriptor_15.alignment()
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
      __compactRuntime.assert(
        this._equal_27(
          pairInfo_0.midnigthTokenAccount,
          expectColor_0
        ),
        "midnigthTokenAccount is not valid"
      );
    }
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(7n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(tokenPairId_0),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_12.toValue(pairInfo_0),
            alignment: _descriptor_12.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _removeTokenPair_0(context, partialProofData, tokenPairId_0) {
    __compactRuntime.assert(
      this._equal_28(
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(8n),
                    alignment: _descriptor_15.alignment()
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
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(7n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_5.toValue(tokenPairId_0),
              alignment: _descriptor_5.alignment()
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
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(7n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(tokenPairId_0),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    return [];
  }
  _newProposal_0(context, partialProofData, newProposal_0) {
    __compactRuntime.assert(
      newProposal_0.type !== 7 && newProposal_0.type !== 4,
      "ProposalType not supoorted"
    );
    const tmp_0 = 1n;
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { addi: { immediate: parseInt(__compactRuntime.valueToBigInt(
          {
            value: _descriptor_13.toValue(tmp_0),
            alignment: _descriptor_13.alignment()
          }.value
        )) } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    const tmp_1 = ((t1) => {
      if (t1 > 4294967295n) {
        throw new __compactRuntime.CompactError("crosschain.compact line 746 char 20: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 4294967295");
      }
      return t1;
    })(_descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value));
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(tmp_1),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_11.toValue(newProposal_0),
            alignment: _descriptor_11.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    const tmp_2 = ((t1) => {
      if (t1 > 4294967295n) {
        throw new __compactRuntime.CompactError("crosschain.compact line 747 char 32: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 4294967295");
      }
      return t1;
    })(_descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(0n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value));
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(3n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(tmp_2),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newMap(
            new __compactRuntime.StateMap()
          ).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    this._voteProposal_0(
      context,
      partialProofData,
      ((t1) => {
        if (t1 > 4294967295n) {
          throw new __compactRuntime.CompactError("crosschain.compact line 748 char 16: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 4294967295");
        }
        return t1;
      })(_descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value))
    );
    return [];
  }
  _voteProposal_0(context, partialProofData, proposalId_0) {
    let tmp_0;
    __compactRuntime.assert(
      (tmp_0 = this._ownPublicKey_0(
        context,
        partialProofData
      ), _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(13n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_1.toValue(tmp_0),
              alignment: _descriptor_1.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value)),
      "only admin can vote proposal"
    );
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_5.toValue(proposalId_0),
              alignment: _descriptor_5.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "proposal does not exist"
    );
    const tmp_1 = this._ownPublicKey_0(context, partialProofData);
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(3n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_5.toValue(proposalId_0),
                alignment: _descriptor_5.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_1.toValue(tmp_1),
            alignment: _descriptor_1.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newNull().encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 3 } }
      ]
    );
    return [];
  }
  _executeProposal_0(context, partialProofData, proposalId_0) {
    __compactRuntime.assert(
      _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(3n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_5.toValue(proposalId_0),
              alignment: _descriptor_5.alignment()
            }).encode()
          } },
          "member",
          { popeq: {
            cached: true,
            result: void 0
          } }
        ]
      ).value),
      "proposal does not exist"
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(2n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(proposalId_0),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    let tmp_0;
    const currentProposal_0 = (tmp_0 = _descriptor_5.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { popeq: {
          cached: false,
          result: void 0
        } }
      ]
    ).value), _descriptor_11.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
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
                value: _descriptor_5.toValue(tmp_0),
                alignment: _descriptor_5.alignment()
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
    if (currentProposal_0.type === 0) {
      this._addAdmin_0(context, partialProofData, currentProposal_0.addr);
    } else {
      if (currentProposal_0.type === 1) {
        this._removeAdmin_0(context, partialProofData, currentProposal_0.addr);
      } else {
        if (currentProposal_0.type === 2) {
          this._setFeeShieldedReceiver_0(
            context,
            partialProofData,
            currentProposal_0.addr
          );
        } else {
          if (currentProposal_0.type === 3) {
            this._setFeeUnshieldedReceiver_0(
              context,
              partialProofData,
              currentProposal_0.addrUnshielded
            );
          } else {
            if (currentProposal_0.type === 4) {
              this._setTokenManager_0(
                context,
                partialProofData,
                currentProposal_0.addr
              );
            } else {
              if (currentProposal_0.type === 5) {
                this._setAdminThreshold_0(
                  context,
                  partialProofData,
                  ((t1) => {
                    if (t1 > 255n) {
                      throw new __compactRuntime.CompactError("crosschain.compact line 778 char 23: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 255");
                    }
                    return t1;
                  })(currentProposal_0.threshold)
                );
              } else {
                if (currentProposal_0.type === 6) {
                  this._setSmgPKThreold_0(
                    context,
                    partialProofData,
                    ((t1) => {
                      if (t1 > 255n) {
                        throw new __compactRuntime.CompactError("crosschain.compact line 780 char 21: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 255");
                      }
                      return t1;
                    })(currentProposal_0.threshold)
                  );
                } else {
                  if (currentProposal_0.type === 7) {
                    this._setFeeCommonConfig_0(
                      context,
                      partialProofData,
                      currentProposal_0.feeConfig.chainId,
                      currentProposal_0.feeConfig.fee
                    );
                  } else {
                    if (currentProposal_0.type === 8) {
                      this._setSmgPksks_0(
                        context,
                        partialProofData,
                        currentProposal_0.smgPubkeys
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(1n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(proposalId_0),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(3n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(proposalId_0),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        { rem: { cached: false } },
        { ins: { cached: true, n: 2 } }
      ]
    );
    const tmp_1 = 0n;
    __compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_15.toValue(2n),
            alignment: _descriptor_15.alignment()
          }).encode()
        } },
        { push: {
          storage: true,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_5.toValue(tmp_1),
            alignment: _descriptor_5.alignment()
          }).encode()
        } },
        { ins: { cached: false, n: 1 } },
        { ins: { cached: true, n: 1 } }
      ]
    );
    if (currentProposal_0.type === 1) {
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_15.toValue(1n),
              alignment: _descriptor_15.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime.StateValue.newMap(
              new __compactRuntime.StateMap()
            ).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 1 } }
        ]
      );
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_15.toValue(3n),
              alignment: _descriptor_15.alignment()
            }).encode()
          } },
          { push: {
            storage: true,
            value: __compactRuntime.StateValue.newMap(
              new __compactRuntime.StateMap()
            ).encode()
          } },
          { ins: { cached: false, n: 1 } },
          { ins: { cached: true, n: 1 } }
        ]
      );
    }
    return [];
  }
  _removeExpiredHisTxs_0(context, partialProofData, txs_0) {
    __compactRuntime.assert(
      this._equal_29(
        _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(12n),
                    alignment: _descriptor_15.alignment()
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
      "not admin authorized"
    );
    this._folder_3(
      context,
      partialProofData,
      ((context2, partialProofData2, t_0, tx_0) => {
        this._removeExpiredHisTx_0(context2, partialProofData2, tx_0);
        return t_0;
      }),
      [],
      txs_0
    );
    return [];
  }
  _removeExpiredHisTx_0(context, partialProofData, tx_0) {
    if (_descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                value: _descriptor_15.toValue(2n),
                alignment: _descriptor_15.alignment()
              }
            },
            {
              tag: "value",
              value: {
                value: _descriptor_15.toValue(6n),
                alignment: _descriptor_15.alignment()
              }
            }
          ]
        } },
        { push: {
          storage: false,
          value: __compactRuntime.StateValue.newCell({
            value: _descriptor_0.toValue(tx_0),
            alignment: _descriptor_0.alignment()
          }).encode()
        } },
        "member",
        { popeq: {
          cached: true,
          result: void 0
        } }
      ]
    ).value) && this._blockTimeGte_0(
      context,
      partialProofData,
      ((t1) => {
        if (t1 > 18446744073709551615n) {
          throw new __compactRuntime.CompactError("crosschain.compact line 805 char 51: cast from Field or Uint value to smaller Uint value failed: " + t1 + " is greater than 18446744073709551615");
        }
        return t1;
      })(_descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(6n),
                  alignment: _descriptor_15.alignment()
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
                  value: _descriptor_0.toValue(tx_0),
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
      ).value) + 3600n * 24n * 60n)
    )) {
      __compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(6n),
                  alignment: _descriptor_15.alignment()
                }
              }
            ]
          } },
          { push: {
            storage: false,
            value: __compactRuntime.StateValue.newCell({
              value: _descriptor_0.toValue(tx_0),
              alignment: _descriptor_0.alignment()
            }).encode()
          } },
          { rem: { cached: false } },
          { ins: { cached: true, n: 2 } }
        ]
      );
    }
    return [];
  }
  _equal_0(x0, y0) {
    if (x0 !== y0) {
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
  _folder_0(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 5; i++) {
      x = f(context, partialProofData, x, a0[i]);
    }
    return x;
  }
  _equal_3(x0, y0) {
    if (x0 !== y0) {
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
  _folder_1(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 5; i++) {
      x = f(context, partialProofData, x, a0[i]);
    }
    return x;
  }
  _equal_5(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_6(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_7(x0, y0) {
    if (x0 !== y0) {
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
  _equal_9(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_10(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_11(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_12(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_13(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_14(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
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
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
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
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_21(x0, y0) {
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
  _equal_23(x0, y0) {
    if (x0 !== y0) {
      return false;
    }
    return true;
  }
  _equal_24(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_25(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_26(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_27(x0, y0) {
    if (!x0.every((x, i) => y0[i] === x)) {
      return false;
    }
    return true;
  }
  _equal_28(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _equal_29(x0, y0) {
    {
      let x1 = x0.bytes;
      let y1 = y0.bytes;
      if (!x1.every((x, i) => y1[i] === x)) {
        return false;
      }
    }
    return true;
  }
  _folder_3(context, partialProofData, f, x, a0) {
    for (let i = 0; i < 20; i++) {
      x = f(context, partialProofData, x, a0[i]);
    }
    return x;
  }
};
function ledger2(stateOrChargedState) {
  const state = stateOrChargedState instanceof __compactRuntime.StateValue ? stateOrChargedState : stateOrChargedState.state;
  const chargedState = stateOrChargedState instanceof __compactRuntime.StateValue ? new __compactRuntime.ChargedState(stateOrChargedState) : stateOrChargedState;
  const context = {
    currentQueryContext: new __compactRuntime.QueryContext(chargedState, __compactRuntime.dummyContractAddress()),
    costModel: __compactRuntime.CostModel.initialCostModel()
  };
  const partialProofData = {
    input: { value: [], alignment: [] },
    output: void 0,
    publicTranscript: [],
    privateTranscriptOutputs: []
  };
  return {
    get crossCounter() {
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
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
    get nonce() {
      return _descriptor_0.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
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
    smgTxSigners: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(0n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(0n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 30 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(0n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 30 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_15.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(0n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[0];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_1.fromValue(key.value), _descriptor_15.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get latestOutBoundCrosstxInfo() {
      return _descriptor_30.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const elem_0 = args_0[0];
        if (!(typeof elem_0 === "object" && elem_0.uniqueId.buffer instanceof ArrayBuffer && elem_0.uniqueId.BYTES_PER_ELEMENT === 1 && elem_0.uniqueId.length === 32 && typeof elem_0.crossProposal === "object" && elem_0.crossProposal.smgId.buffer instanceof ArrayBuffer && elem_0.crossProposal.smgId.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.smgId.length === 32 && elem_0.crossProposal.token.buffer instanceof ArrayBuffer && elem_0.crossProposal.token.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.token.length === 32 && typeof elem_0.crossProposal.tokenPairId === "bigint" && elem_0.crossProposal.tokenPairId >= 0n && elem_0.crossProposal.tokenPairId <= 4294967295n && typeof elem_0.crossProposal.isMappingToken === "boolean" && typeof elem_0.crossProposal.isShielded === "boolean" && typeof elem_0.crossProposal.amount === "bigint" && elem_0.crossProposal.amount >= 0n && elem_0.crossProposal.amount <= 340282366920938463463374607431768211455n && typeof elem_0.crossProposal.fee === "bigint" && elem_0.crossProposal.fee >= 0n && elem_0.crossProposal.fee <= 340282366920938463463374607431768211455n && typeof elem_0.crossProposal.toAddr === "object" && elem_0.crossProposal.toAddr.bytes.buffer instanceof ArrayBuffer && elem_0.crossProposal.toAddr.bytes.BYTES_PER_ELEMENT === 1 && elem_0.crossProposal.toAddr.bytes.length === 32 && typeof elem_0.crossProposal.ttl === "bigint" && elem_0.crossProposal.ttl >= 0n && elem_0.crossProposal.ttl <= 18446744073709551615n)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 33 char 1",
            "struct SmgEvent<uniqueId: Bytes<32>, crossProposal: struct CrossProposal<smgId: Bytes<32>, token: Bytes<32>, tokenPairId: Uint<0..4294967296>, isMappingToken: Boolean, isShielded: Boolean, amount: Uint<0..340282366920938463463374607431768211456>, fee: Uint<0..340282366920938463463374607431768211456>, toAddr: struct ZswapCoinPublicKey<bytes: Bytes<32>>, ttl: Uint<0..18446744073709551616>>>",
            elem_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_23.toValue(elem_0),
                alignment: _descriptor_23.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[2];
        return self_0.asMap().keys().map((elem) => _descriptor_23.fromValue(elem.value))[Symbol.iterator]();
      }
    },
    treasuryCoins: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(3n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(3n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 36 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(3n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_8.toValue(key_0),
                alignment: _descriptor_8.alignment()
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 340282366920938463463374607431768211455n)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 36 char 1",
            "Uint<0..340282366920938463463374607431768211456>",
            key_0
          );
        }
        return _descriptor_18.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(3n),
                    alignment: _descriptor_15.alignment()
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
                    value: _descriptor_8.toValue(key_0),
                    alignment: _descriptor_8.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[3];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_8.fromValue(key.value), _descriptor_18.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get treasuryCoinCounter() {
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(4n),
                  alignment: _descriptor_15.alignment()
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
    reserveOfAllShieldedToken: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(5n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(5n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 38 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(5n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 38 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_17.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(5n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[5];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_17.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    reserveOfAllUnshieldedToken: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(6n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(6n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 39 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(6n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 39 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_17.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(6n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[6];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_17.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    tokenPairs: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(7n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(7n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 42 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(7n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_5.toValue(key_0),
                alignment: _descriptor_5.alignment()
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 42 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_12.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(7n),
                    alignment: _descriptor_15.alignment()
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
                    value: _descriptor_5.toValue(key_0),
                    alignment: _descriptor_5.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[7];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_5.fromValue(key.value), _descriptor_12.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get tokenManager() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(8n),
                  alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(9n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(9n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 46 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(9n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_5.toValue(key_0),
                alignment: _descriptor_5.alignment()
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 46 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(9n),
                    alignment: _descriptor_15.alignment()
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
                    value: _descriptor_5.toValue(key_0),
                    alignment: _descriptor_5.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[9];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_5.fromValue(key.value), _descriptor_8.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get feeShieldedReceiver() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(10n),
                  alignment: _descriptor_15.alignment()
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
    get feeUnshieldedReceiver() {
      return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(11n),
                  alignment: _descriptor_15.alignment()
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
      return _descriptor_15.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(12n),
                  alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(13n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(13n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 56 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(13n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 56 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(13n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[1].asArray()[13];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_1.fromValue(key.value), _descriptor_4.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get adminThreshold() {
      return _descriptor_15.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(1n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(14n),
                  alignment: _descriptor_15.alignment()
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
      return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(0n),
                  alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 61 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_5.toValue(key_0),
                alignment: _descriptor_5.alignment()
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 61 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_11.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(1n),
                    alignment: _descriptor_15.alignment()
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
                    value: _descriptor_5.toValue(key_0),
                    alignment: _descriptor_5.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[1];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_5.fromValue(key.value), _descriptor_11.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get currentExcuteProposalId() {
      return _descriptor_5.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(3n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(3n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 63 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(3n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_5.toValue(key_0),
                alignment: _descriptor_5.alignment()
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "bigint" && key_0 >= 0n && key_0 <= 4294967295n)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 63 char 1",
            "Uint<0..4294967296>",
            key_0
          );
        }
        if (state.asArray()[2].asArray()[3].asMap().get({
          value: _descriptor_5.toValue(key_0),
          alignment: _descriptor_5.alignment()
        }) === void 0) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                        value: _descriptor_15.toValue(2n),
                        alignment: _descriptor_15.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_15.toValue(3n),
                        alignment: _descriptor_15.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_5.toValue(key_0),
                        alignment: _descriptor_5.alignment()
                      }
                    }
                  ]
                } },
                "size",
                { push: {
                  storage: false,
                  value: __compactRuntime.StateValue.newCell({
                    value: _descriptor_3.toValue(0n),
                    alignment: _descriptor_3.alignment()
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
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                        value: _descriptor_15.toValue(2n),
                        alignment: _descriptor_15.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_15.toValue(3n),
                        alignment: _descriptor_15.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_5.toValue(key_0),
                        alignment: _descriptor_5.alignment()
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
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const elem_0 = args_1[0];
            if (!(typeof elem_0 === "object" && elem_0.bytes.buffer instanceof ArrayBuffer && elem_0.bytes.BYTES_PER_ELEMENT === 1 && elem_0.bytes.length === 32)) {
              __compactRuntime.typeError(
                "member",
                "argument 1",
                "crosschain.compact line 63 char 45",
                "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
                elem_0
              );
            }
            return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                        value: _descriptor_15.toValue(2n),
                        alignment: _descriptor_15.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_15.toValue(3n),
                        alignment: _descriptor_15.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_5.toValue(key_0),
                        alignment: _descriptor_5.alignment()
                      }
                    }
                  ]
                } },
                { push: {
                  storage: false,
                  value: __compactRuntime.StateValue.newCell({
                    value: _descriptor_1.toValue(elem_0),
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
          [Symbol.iterator](...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[2].asArray()[3].asMap().get({
              value: _descriptor_5.toValue(key_0),
              alignment: _descriptor_5.alignment()
            });
            return self_0.asMap().keys().map((elem) => _descriptor_1.fromValue(elem.value))[Symbol.iterator]();
          }
        };
      }
    },
    crossProposal: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(4n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(4n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 66 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(4n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 66 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_22.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(4n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[4];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_22.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    crossProposalVoters: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(5n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(5n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 67 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(5n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 67 char 1",
            "Bytes<32>",
            key_0
          );
        }
        if (state.asArray()[2].asArray()[5].asMap().get({
          value: _descriptor_0.toValue(key_0),
          alignment: _descriptor_0.alignment()
        }) === void 0) {
          throw new __compactRuntime.CompactError(`Map value undefined for ${key_0}`);
        }
        return {
          isEmpty(...args_1) {
            if (args_1.length !== 0) {
              throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                        value: _descriptor_15.toValue(2n),
                        alignment: _descriptor_15.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_15.toValue(5n),
                        alignment: _descriptor_15.alignment()
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
                  value: __compactRuntime.StateValue.newCell({
                    value: _descriptor_3.toValue(0n),
                    alignment: _descriptor_3.alignment()
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
              throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_1.length}`);
            }
            return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                        value: _descriptor_15.toValue(2n),
                        alignment: _descriptor_15.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_15.toValue(5n),
                        alignment: _descriptor_15.alignment()
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
              throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_1.length}`);
            }
            const elem_0 = args_1[0];
            if (!(typeof elem_0 === "bigint" && elem_0 >= 0n && elem_0 <= 255n)) {
              __compactRuntime.typeError(
                "member",
                "argument 1",
                "crosschain.compact line 67 char 51",
                "Uint<0..256>",
                elem_0
              );
            }
            return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                        value: _descriptor_15.toValue(2n),
                        alignment: _descriptor_15.alignment()
                      }
                    },
                    {
                      tag: "value",
                      value: {
                        value: _descriptor_15.toValue(5n),
                        alignment: _descriptor_15.alignment()
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
                  value: __compactRuntime.StateValue.newCell({
                    value: _descriptor_15.toValue(elem_0),
                    alignment: _descriptor_15.alignment()
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
              throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_1.length}`);
            }
            const self_0 = state.asArray()[2].asArray()[5].asMap().get({
              value: _descriptor_0.toValue(key_0),
              alignment: _descriptor_0.alignment()
            });
            return self_0.asMap().keys().map((elem) => _descriptor_15.fromValue(elem.value))[Symbol.iterator]();
          }
        };
      }
    },
    crossProposalHis: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(6n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(6n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 69 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(6n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 69 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(6n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[6];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_3.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    userFeeBalance: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(7n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(7n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 70 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(7n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 70 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(7n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[7];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_1.fromValue(key.value), _descriptor_8.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    userFeeWithdrawAddress: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(8n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(8n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 71 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(8n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(typeof key_0 === "object" && key_0.bytes.buffer instanceof ArrayBuffer && key_0.bytes.BYTES_PER_ELEMENT === 1 && key_0.bytes.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 71 char 1",
            "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
            key_0
          );
        }
        return _descriptor_7.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(8n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[8];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_1.fromValue(key.value), _descriptor_7.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    coinToBeClaimed: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(9n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(9n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 72 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(9n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 72 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_21.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(9n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[9];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_21.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    mappingTokenToBeClaim: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(10n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(10n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 73 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(10n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 73 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_20.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(10n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[10];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_20.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    mappintTokenTotalSupply: {
      isEmpty(...args_0) {
        if (args_0.length !== 0) {
          throw new __compactRuntime.CompactError(`isEmpty: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(11n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            "size",
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
                value: _descriptor_3.toValue(0n),
                alignment: _descriptor_3.alignment()
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
          throw new __compactRuntime.CompactError(`size: expected 0 arguments, received ${args_0.length}`);
        }
        return _descriptor_3.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(11n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`member: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "member",
            "argument 1",
            "crosschain.compact line 75 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_4.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(11n),
                    alignment: _descriptor_15.alignment()
                  }
                }
              ]
            } },
            { push: {
              storage: false,
              value: __compactRuntime.StateValue.newCell({
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
          throw new __compactRuntime.CompactError(`lookup: expected 1 argument, received ${args_0.length}`);
        }
        const key_0 = args_0[0];
        if (!(key_0.buffer instanceof ArrayBuffer && key_0.BYTES_PER_ELEMENT === 1 && key_0.length === 32)) {
          __compactRuntime.typeError(
            "lookup",
            "argument 1",
            "crosschain.compact line 75 char 1",
            "Bytes<32>",
            key_0
          );
        }
        return _descriptor_8.fromValue(__compactRuntime.queryLedgerState(
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
                    value: _descriptor_15.toValue(2n),
                    alignment: _descriptor_15.alignment()
                  }
                },
                {
                  tag: "value",
                  value: {
                    value: _descriptor_15.toValue(11n),
                    alignment: _descriptor_15.alignment()
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
          throw new __compactRuntime.CompactError(`iter: expected 0 arguments, received ${args_0.length}`);
        }
        const self_0 = state.asArray()[2].asArray()[11];
        return self_0.asMap().keys().map((key) => {
          const value = self_0.asMap().get(key).asCell();
          return [_descriptor_0.fromValue(key.value), _descriptor_8.fromValue(value.value)];
        })[Symbol.iterator]();
      }
    },
    get owner() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(12n),
                  alignment: _descriptor_15.alignment()
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
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(13n),
                  alignment: _descriptor_15.alignment()
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
    get mergeWorker() {
      return _descriptor_1.fromValue(__compactRuntime.queryLedgerState(
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
                  value: _descriptor_15.toValue(2n),
                  alignment: _descriptor_15.alignment()
                }
              },
              {
                tag: "value",
                value: {
                  value: _descriptor_15.toValue(14n),
                  alignment: _descriptor_15.alignment()
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
  currentQueryContext: new __compactRuntime.QueryContext(new __compactRuntime.ContractState().data, __compactRuntime.dummyContractAddress())
});
var _dummyContract = new Contract({});
var pureCircuits = {
  userLock: (...args_0) => {
    if (args_0.length !== 4) {
      throw new __compactRuntime.CompactError(`userLock: expected 4 arguments (as invoked from Typescript), received ${args_0.length}`);
    }
    const smgId_0 = args_0[0];
    const toAddr_0 = args_0[1];
    const tokenPairId_0 = args_0[2];
    const coin_0 = args_0[3];
    if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
      __compactRuntime.typeError(
        "userLock",
        "argument 1",
        "crosschain.compact line 196 char 1",
        "Bytes<32>",
        smgId_0
      );
    }
    if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
      __compactRuntime.typeError(
        "userLock",
        "argument 3",
        "crosschain.compact line 196 char 1",
        "Uint<0..4294967296>",
        tokenPairId_0
      );
    }
    if (!(typeof coin_0 === "object" && coin_0.nonce.buffer instanceof ArrayBuffer && coin_0.nonce.BYTES_PER_ELEMENT === 1 && coin_0.nonce.length === 32 && coin_0.color.buffer instanceof ArrayBuffer && coin_0.color.BYTES_PER_ELEMENT === 1 && coin_0.color.length === 32 && typeof coin_0.value === "bigint" && coin_0.value >= 0n && coin_0.value <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError(
        "userLock",
        "argument 4",
        "crosschain.compact line 196 char 1",
        "struct ShieldedCoinInfo<nonce: Bytes<32>, color: Bytes<32>, value: Uint<0..340282366920938463463374607431768211456>>",
        coin_0
      );
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
      __compactRuntime.typeError(
        "smgRelease",
        "argument 1",
        "crosschain.compact line 226 char 1",
        "Bytes<32>",
        uniqueId_0
      );
    }
    if (!(smgId_0.buffer instanceof ArrayBuffer && smgId_0.BYTES_PER_ELEMENT === 1 && smgId_0.length === 32)) {
      __compactRuntime.typeError(
        "smgRelease",
        "argument 2",
        "crosschain.compact line 226 char 1",
        "Bytes<32>",
        smgId_0
      );
    }
    if (!(typeof tokenPairId_0 === "bigint" && tokenPairId_0 >= 0n && tokenPairId_0 <= 4294967295n)) {
      __compactRuntime.typeError(
        "smgRelease",
        "argument 3",
        "crosschain.compact line 226 char 1",
        "Uint<0..4294967296>",
        tokenPairId_0
      );
    }
    if (!(typeof amount_0 === "bigint" && amount_0 >= 0n && amount_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError(
        "smgRelease",
        "argument 4",
        "crosschain.compact line 226 char 1",
        "Uint<0..340282366920938463463374607431768211456>",
        amount_0
      );
    }
    if (!(typeof toAddr_0 === "object" && toAddr_0.bytes.buffer instanceof ArrayBuffer && toAddr_0.bytes.BYTES_PER_ELEMENT === 1 && toAddr_0.bytes.length === 32)) {
      __compactRuntime.typeError(
        "smgRelease",
        "argument 5",
        "crosschain.compact line 226 char 1",
        "struct ZswapCoinPublicKey<bytes: Bytes<32>>",
        toAddr_0
      );
    }
    if (!(typeof fee_0 === "bigint" && fee_0 >= 0n && fee_0 <= 340282366920938463463374607431768211455n)) {
      __compactRuntime.typeError(
        "smgRelease",
        "argument 6",
        "crosschain.compact line 226 char 1",
        "Uint<0..340282366920938463463374607431768211456>",
        fee_0
      );
    }
    if (!(typeof ttl_0 === "bigint" && ttl_0 >= 0n && ttl_0 <= 18446744073709551615n)) {
      __compactRuntime.typeError(
        "smgRelease",
        "argument 7",
        "crosschain.compact line 226 char 1",
        "Uint<0..18446744073709551616>",
        ttl_0
      );
    }
    return _dummyContract._smgRelease_0(
      uniqueId_0,
      smgId_0,
      tokenPairId_0,
      amount_0,
      toAddr_0,
      fee_0,
      ttl_0
    );
  },
  mergeTreasuryCoin: (...args_0) => {
    if (args_0.length !== 1) {
      throw new __compactRuntime.CompactError(`mergeTreasuryCoin: expected 1 argument (as invoked from Typescript), received ${args_0.length}`);
    }
    const coins_0 = args_0[0];
    if (!(Array.isArray(coins_0) && coins_0.length === 2 && coins_0.every((t) => typeof t === "bigint" && t >= 0n && t <= 340282366920938463463374607431768211455n))) {
      __compactRuntime.typeError(
        "mergeTreasuryCoin",
        "argument 1",
        "crosschain.compact line 635 char 1",
        "Vector<2, Uint<0..340282366920938463463374607431768211456>>",
        coins_0
      );
    }
    return _dummyContract._mergeTreasuryCoin_0(coins_0);
  }
};
var CrossChainPrivateStateId = "crossChainPrivateState";
function getDirname() {
  if (typeof import.meta?.url === "string") {
    return import.meta.url;
  }
  return __dirname;
}
var currentDir = path.resolve(new URL(getDirname()).pathname, "..");
var ZKConfig = {
  privateStateStoreName: "crosschain-private-state",
  zkConfigPath: path.resolve(currentDir, "managed", "crosschain")
};
var shieldedCoinInfo = (token, value) => encodeShieldedCoinInfo(createShieldedCoinInfo(token, value));
var fromHexWithOrNoPrefix = (hex) => {
  if (hex.startsWith("0x")) {
    return fromHex(hex.slice(2));
  }
  return fromHex(hex);
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
var createWalletAndMidnightProvider = async (wallet) => {
  const walletFacade = wallet.getWalletInstance();
  assert3(walletFacade, "wallet not initialized");
  return {
    getCoinPublicKey: () => wallet.getShieldedSecretKeys().coinPublicKey,
    //() => state.shielded.coinPublicKey.toHexString(),
    getEncryptionPublicKey: () => wallet.getShieldedSecretKeys().encryptionPublicKey,
    balanceTx(tx, newCoins, ttl) {
      return walletFacade.balanceTransaction(wallet.getShieldedSecretKeys(), wallet.getDustSecretKey(), tx, ttl ? ttl : new Date(Date.now() + 1800 * 1e3));
    },
    submitTx(tx) {
      return walletFacade.submitTransaction(tx);
    }
  };
};
var MAX_SIGNER_COUNT = 29;
var CrossChainApi = class _CrossChainApi {
  constructor() {
    this.MaxSmgSignators = 29;
    this.MaxMergeCoins = 4;
  }
  async init(config, wallet) {
    const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
    new NodeZkConfigProvider(ZKConfig.zkConfigPath);
    this.providers = {
      privateStateProvider: levelPrivateStateProvider({
        privateStateStoreName: "CCPSSN",
        walletProvider: walletAndMidnightProvider
      }),
      publicDataProvider: indexerPublicDataProvider(config.indexer, config.indexerWS),
      zkConfigProvider: new NodeZkConfigProvider(ZKConfig.zkConfigPath),
      // proofProvider: httpClientProofProvider(config.proofServer, zkConfigProvider),
      proofProvider: httpClientProofProvider(config.proofServer),
      walletProvider: walletAndMidnightProvider,
      midnightProvider: walletAndMidnightProvider
    };
  }
  async setWallet(wallet) {
    const walletAndMidnightProvider = await createWalletAndMidnightProvider(wallet);
    this.providers = {
      ...this.providers,
      walletProvider: walletAndMidnightProvider,
      midnightProvider: walletAndMidnightProvider
    };
  }
  async deployContract(adminThreshold, smgPkThreshold, signingKey) {
    this.crossChainContract = await deployContract(this.providers, {
      contract: crosschainContractInstance,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {},
      signingKey,
      args: [BigInt(adminThreshold), BigInt(smgPkThreshold)]
    });
    return this.crossChainContract.deployTxData.public.contractAddress;
  }
  async join(contractAddress) {
    this.crossChainContract = await findDeployedContract(this.providers, {
      contractAddress,
      contract: crosschainContractInstance,
      privateStateId: CrossChainPrivateStateId,
      initialPrivateState: {}
    });
  }
  checkCrossData(uniqueId, smgId, tokenPairId, amount, fee, toAddr, coins, ttl) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    assert3(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const smgId_0 = Buffer.from(smgId, "hex");
    assert3(smgId_0.length === 32, `smgId must be 32 bytes long`);
    const tokenPairId_0 = BigInt(tokenPairId);
    const amount_0 = BigInt(amount);
    const fee_0 = BigInt(fee);
    const toAddr_0 = { bytes: getCoinPublicKeyFromShieldAddress(toAddr) };
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
      const totalSupply = ledger3?.mappintTokenTotalSupply.member(token_0) ? ledger3?.mappintTokenTotalSupply.lookup(token_0).toString(10) : "0";
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
        smgId: toHex(crossTxInfo.smgId),
        token: toHex(crossTxInfo.token),
        tokenPairId: crossTxInfo.tokenPairId.toString(10),
        amount: crossTxInfo.amount.toString(10),
        fee: crossTxInfo.fee.toString(10),
        toAddr: crossTxInfo.toAddr,
        ttl: crossTxInfo.ttl.toString(10)
      };
    }
  }
  static parseContractState(stateHex) {
    const state = ContractState.deserialize(Buffer.from(stateHex, "hex"));
    return ledger2(state.data);
  }
  static currentExecuteCrossProposal(ledger3) {
    let res = [];
    for (const smgEvent of ledger3.currentExecuteCrossProposal) {
      res.push({
        smgId: toHex(smgEvent.crossProposal.smgId),
        uniqueId: toHex(smgEvent.uniqueId),
        token: toHex(smgEvent.crossProposal.token),
        tokenPairId: smgEvent.crossProposal.tokenPairId.toString(10),
        isMappingToken: smgEvent.crossProposal.isMappingToken,
        amount: smgEvent.crossProposal.amount.toString(10),
        fee: smgEvent.crossProposal.fee.toString(10),
        toAddr: toHex(smgEvent.crossProposal.toAddr.bytes),
        ttl: smgEvent.crossProposal.ttl.toString(10)
      });
    }
    return res;
  }
  static latestOutBoundCrosstxInfo(ledger3) {
    if (ledger3.latestOutBoundCrosstxInfo.nonce === 0n) {
      return;
    } else {
      return {
        smgId: toHex(ledger3.latestOutBoundCrosstxInfo.smgId),
        fromAddr: toHex(ledger3.latestOutBoundCrosstxInfo.fromAddr.bytes),
        toAddr: ledger3.latestOutBoundCrosstxInfo.toAddr,
        tokenPairId: ledger3.latestOutBoundCrosstxInfo.tokenPairId.toString(10),
        tokenAccount: ledger3.latestOutBoundCrosstxInfo.tokenAccount,
        amount: ledger3.latestOutBoundCrosstxInfo.amount.toString(10),
        fee: ledger3.latestOutBoundCrosstxInfo.fee.toString(10),
        nonce: ledger3.latestOutBoundCrosstxInfo.nonce.toString(10)
      };
    }
  }
  async isVoter(ledger3, voter) {
    let voterPK;
    if (voter) {
      voterPK = getCoinPublicKeyFromShieldAddress(voter);
    } else {
      voterPK = fromHex(this.providers.walletProvider.getCoinPublicKey());
    }
    return ledger3.smgTxSigners.member({ bytes: voterPK });
  }
  async getUnVotedCrossProposal(ledger3, voter) {
    let voterPK;
    if (voter) {
      voterPK = getCoinPublicKeyFromShieldAddress(voter);
    } else {
      voterPK = fromHex(this.providers.walletProvider.getCoinPublicKey());
    }
    if (!this.isVoter(ledger3, voter)) return [];
    const voterIndex = ledger3.smgTxSigners.lookup({ bytes: voterPK });
    let res = [];
    for (const [uniquId, _] of ledger3.crossProposal) {
      const voters = ledger3.crossProposalVoters.lookup(uniquId);
      if (voters.size() >= ledger3.smgPKThreshold) continue;
      if (voters.member(voterIndex)) continue;
      else {
        const crossTxInfo = _CrossChainApi.getCrossTxInfo(ledger3, toHex(uniquId));
        res.push(crossTxInfo);
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
          uniqueId: toHex(uniquId),
          smgId: toHex(crossProposal.smgId),
          tokenPairId: crossProposal.tokenPairId.toString(10),
          token: toHex(crossProposal.token),
          amount: crossProposal.amount.toString(10),
          fee: crossProposal.fee.toString(10),
          toAddr: toHex(crossProposal.toAddr.bytes),
          ttl: crossProposal.ttl.toString(10)
        });
      }
    }
    return res;
  }
  /////////////////////////////////////////////////  Cross Tx  /////////////////////////////////////////////////////////////
  async userLock(smgId, toAddress, tokenPair, amount) {
  }
  async smgRelease(uniqueId, smgId, tokenPair, amount, fee, toAddr, ttl) {
  }
  async smgMint(uniqueId, smgId, tokenPair, amount, fee, toAddr, ttl) {
    const proof = this.checkCrossData(uniqueId, smgId, tokenPair, amount, fee, toAddr, void 0, ttl);
    const finalizedTxData = await this.crossChainContract.callTx.smgMint(proof.uniqueId, proof.smgId, proof.tokenPairId, proof.amount, proof.fee, proof.toAddr, proof.ttl);
    return finalizedTxData;
  }
  async userBurn(smgId, toAddress, tokenPair, amount) {
    const smgId_0 = Buffer.from(smgId, "hex");
    assert3(smgId_0.length === 32, `smgId must be 32 bytes long`);
    const tokenPair_0 = BigInt(tokenPair);
    const pairInfo = await this.getTokenPairInfo(tokenPair_0);
    assert3(pairInfo, `tokenPairId ${tokenPair} not found`);
    const amount_0 = BigInt(amount);
    const token = decodeRawTokenType(pairInfo.midnigthTokenAccount);
    const coin_0 = shieldedCoinInfo(token, amount_0);
    const finalizedTxData = await this.crossChainContract.callTx.userBurn(smgId_0, toAddress, tokenPair_0, coin_0);
    return finalizedTxData;
  }
  async voteCrossProposal(uniqueId, ttl) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    const ttl_0 = BigInt(ttl);
    assert3(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const finalizedTxData = await this.crossChainContract.callTx.voteCrossProposal({ uniqueId: uniqueId_0, ttl: ttl_0 });
    return finalizedTxData;
  }
  async voteMultiCrossProposal(uniqueIds) {
    const uniqueIds_0 = uniqueIds.map((item) => {
      const uniqueId_0 = Buffer.from(item.uniqueId, "hex");
      const ttl_0 = BigInt(item.ttl);
      assert3(uniqueId_0.length === 32, `uniqueId(${uniqueId_0}) must be 32 bytes long`);
      return { uniqueId: uniqueId_0, ttl: ttl_0 };
    });
    assert3(uniqueIds_0.length <= 5 && uniqueIds_0.length > 0, `uniqueIds length must be between 1 and 5`);
    for (let index = uniqueIds_0.length; index < 5; index++) {
      uniqueIds_0.push({ uniqueId: Buffer.alloc(32), ttl: BigInt(0) });
    }
    const finalizedTxData = await this.crossChainContract.callTx.voteMultiCrossProposal(uniqueIds_0);
    return finalizedTxData;
  }
  async executeCrossProposal(uniqueId, coinIndex) {
  }
  async executeMultiCrossProposal(uniqueIds) {
    const uniqueIds_0 = uniqueIds.map((item) => {
      const uniqueId_0 = Buffer.from(item.uniqueId, "hex");
      assert3(uniqueId_0.length === 32, `uniqueId(${item.uniqueId}) must be 32 bytes long`);
      let coinIndex_0 = BigInt(0);
      if (item.coinIndex) {
        coinIndex_0 = BigInt(item.coinIndex);
      }
      return { uniqueId: uniqueId_0, coinIndex: coinIndex_0 };
    });
    assert3(uniqueIds_0.length <= 5 && uniqueIds_0.length > 0, `uniqueIds must be between 1 and 5`);
    for (let index = uniqueIds_0.length; index < 5; index++) {
      uniqueIds_0.push({ uniqueId: Buffer.alloc(32), coinIndex: BigInt(0) });
    }
    const finalizedTxData = await this.crossChainContract.callTx.executeMultiCrossProposal(uniqueIds_0);
    return finalizedTxData;
  }
  async userRechargeForFee(amount) {
    const amount_0 = BigInt(amount);
    const finalizedTxData = await this.crossChainContract.callTx.userRechargeForFee(amount_0);
    return finalizedTxData;
  }
  async approveUserWithdrawFee(user) {
    const key_0 = { bytes: getCoinPublicKeyFromShieldAddress(user) };
    const ledgerState = await this.getLedgerState();
    assert3(ledgerState != null, `ledgerState is null`);
    const finalizedTxData = await this.crossChainContract.callTx.approveUserWithdrawFee(key_0);
    return finalizedTxData;
  }
  async userClaim(uniqueId, isMappingToken) {
    if (isMappingToken) {
      return this.userClaimMappingToken(uniqueId);
    } else {
      return this.userClaimCoin(uniqueId);
    }
  }
  async userFeeWithdrawRequest(receiptor) {
    const receiptor_0 = { bytes: encodeUserAddress(receiptor) };
    const finalizedTxData = await this.crossChainContract.callTx.userFeeWithdrawRequest(receiptor_0);
    return finalizedTxData;
  }
  async userClaimCoin(uniqueId) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    assert3(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const finalizedTxData = await this.crossChainContract.callTx.userClaimCoin(uniqueId_0);
    return finalizedTxData;
  }
  async userClaimMappingToken(uniqueId) {
    const uniqueId_0 = Buffer.from(uniqueId, "hex");
    assert3(uniqueId_0.length === 32, `uniqueId must be 32 bytes long`);
    const finalizedTxData = await this.crossChainContract.callTx.userClaimMappingToken(uniqueId_0);
    return finalizedTxData;
  }
  async addReserve(token, amount) {
    const amount_0 = BigInt(amount);
    const coin_0 = shieldedCoinInfo(token.raw, amount_0);
    const finalizedTxData = await this.crossChainContract.callTx.addReserve(coin_0);
    return finalizedTxData;
  }
  async withdrawReserveOfShieldedToken(token, coinIndex) {
    assert3(token.tag == "shielded", "not shielded token");
    const coinIndex_0 = BigInt(coinIndex);
    const token_0 = encodeRawTokenType(token.raw);
    const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfShieldedToken(token_0, coinIndex_0);
    return finalizedTxData;
  }
  async withdrawReserveOfShieldedMappingToken(domainSep) {
    assert3(domainSep.length <= 64, "domainsep length must <= 64");
    const token_0 = pad(domainSep, 32);
    const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfShieldedMappingToken(token_0);
    return finalizedTxData;
  }
  async withdrawReserveOfUnshieldedToken(token) {
    assert3(token.tag == "unshielded", "not shielded token");
    const token_0 = encodeRawTokenType(token.raw);
    const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfUnshieldedToken(token_0);
    return finalizedTxData;
  }
  async withdrawReserveOfUnshieldedMappingToken(domainSep) {
    assert3(domainSep.length <= 64, "domainsep length must <= 64");
    const token_0 = pad(domainSep, 32);
    const finalizedTxData = await this.crossChainContract.callTx.withdrawReserveOfUnshieldedMappingToken(token_0);
    return finalizedTxData;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async getLedgerState() {
    assertIsContractAddress(this.crossChainContract?.deployTxData.public.contractAddress);
    const state = await this.providers.publicDataProvider.queryContractState(this.crossChainContract?.deployTxData.public.contractAddress).then((contractState) => contractState != null ? ledger2(contractState.data) : null);
    return state;
  }
  ///////////////////////////////////////////////        management      ////////////////////////////////////////////////////////
  async transferOwner(newOwner) {
    const newOwner_0 = { bytes: getCoinPublicKeyFromShieldAddress(newOwner) };
    const finalizedTxData = await this.crossChainContract.callTx.transferOwner(newOwner_0);
    return finalizedTxData;
  }
  async acceptOwner() {
    const finalizedTxData = await this.crossChainContract.callTx.acceptOwner();
    return finalizedTxData;
  }
  async updateSmgPk(newVoter) {
    const newVoter_0 = { bytes: getCoinPublicKeyFromShieldAddress(newVoter) };
    const finalizedTxData = await this.crossChainContract.callTx.updateSmgPk(newVoter_0);
    return finalizedTxData;
  }
  async setFeeShieldedReceiver(feeReceiver) {
    const feeReceiver_0 = { bytes: getCoinPublicKeyFromShieldAddress(feeReceiver) };
    const finalizedTxData = await this.crossChainContract.callTx.setFeeShieldedReceiver(feeReceiver_0);
    return finalizedTxData;
  }
  async setFeeUnshieldedReceiver(feeReceiver) {
    const feeReceiver_0 = { bytes: encodeUserAddress(feeReceiver) };
    const finalizedTxData = await this.crossChainContract.callTx.setFeeUnshieldedReceiver(feeReceiver_0);
    return finalizedTxData;
  }
  async setTokenManager(tokenManager) {
    const tokenManager_0 = { bytes: getCoinPublicKeyFromShieldAddress(tokenManager) };
    const finalizedTxData = await this.crossChainContract.callTx.setTokenManager(tokenManager_0);
    return finalizedTxData;
  }
  async setMegerWorker(mergeWorker) {
    const megerWorker_0 = { bytes: getCoinPublicKeyFromShieldAddress(mergeWorker) };
    const finalizedTxData = await this.crossChainContract.callTx.setMegerWorker(megerWorker_0);
    return finalizedTxData;
  }
  // async mergeTreasuryCoin(coins: bigint[] | number[] | string[]): Promise<FinalizedCallTxData<CrossChainContract, "mergeTreasuryCoin">>{
  //   if (coins.length != 2) throw 'can only merge 2 coins';
  //   const coins_0 = coins.map(coin => BigInt(coin));
  //   const finalizedTxData = await this.crossChainContract.callTx.mergeTreasuryCoin(coins_0);
  //   return finalizedTxData;
  // }
  async addAdmin(admin) {
    const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
    const finalizedTxData = await this.crossChainContract.callTx.addAdmin(admin_0);
    return finalizedTxData;
  }
  async removeAdmin(admin) {
    const admin_0 = { bytes: getCoinPublicKeyFromShieldAddress(admin) };
    const finalizedTxData = await this.crossChainContract.callTx.removeAdmin(admin_0);
    return finalizedTxData;
  }
  async setAdminThreshold(threshold) {
    const threshold_0 = BigInt(threshold);
    if (threshold_0 < 1n) throw "threshold must be greater than 0";
    const finalizedTxData = await this.crossChainContract.callTx.setAdminThreshold(threshold_0);
    return finalizedTxData;
  }
  async setSmgPksks(voters) {
    assert3(voters.length > 0, "voters must not be empty");
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
  async addTokenPair(tokenPairId, fromChainId, toChainId, midnigthTokenAccount, isShielded, domainSep, fee) {
    const tokenPairId_0 = BigInt(tokenPairId);
    const fromChainId_0 = BigInt(fromChainId);
    const toChainId_0 = BigInt(toChainId);
    const midnigtAccount_0 = encodeRawTokenType(midnigthTokenAccount);
    const domainSep_0 = pad(domainSep, 32);
    if (domainSep) {
      const expectedTokenType = rawTokenType(domainSep_0, this.crossChainContract.deployTxData.public.contractAddress);
      assert3(expectedTokenType == midnigthTokenAccount, `token type not match ,${expectedTokenType} expected but got ${midnigthTokenAccount}`);
    }
    const fee_0 = BigInt(fee);
    const tokenPair = {
      fromChainId: fromChainId_0,
      toChainId: toChainId_0,
      midnigthTokenAccount: midnigtAccount_0,
      isShielded,
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
  async newProposal(proposal) {
    const finalizedTxData = await this.crossChainContract.callTx.newProposal(proposal);
    return finalizedTxData;
  }
  async addAdminProposal(addr) {
    const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.type = ProposalType.AddAdmin;
    proposal.addr = addr_0;
    return await this.crossChainContract.callTx.newProposal(proposal);
  }
  async removeAdminProposal(addr) {
    const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.type = ProposalType.RemoveAdmin;
    proposal.addr = addr_0;
    return await this.crossChainContract.callTx.newProposal(proposal);
  }
  async updateFeeShieldedReceiverProposal(addr) {
    const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.type = ProposalType.UpdateFeeShieldedReceiver;
    proposal.addr = addr_0;
    return await this.crossChainContract.callTx.newProposal(proposal);
  }
  async updateFeeUnshieldedReceiverProposal(addr) {
    const addr_0 = { bytes: encodeUserAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.type = ProposalType.UpdateFeeUnshieldedReceiver;
    proposal.addr = addr_0;
    return await this.crossChainContract.callTx.newProposal(proposal);
  }
  async updateTokenManagerProposal(addr) {
    const addr_0 = { bytes: getCoinPublicKeyFromShieldAddress(addr) };
    let proposal = this.defaultProsal();
    proposal.type = ProposalType.UpdateTokenManager;
    proposal.addr = addr_0;
    return await this.crossChainContract.callTx.newProposal(proposal);
  }
  async updateAdminThresholdProposal(threshold) {
    const threshold_0 = BigInt(threshold);
    let proposal = this.defaultProsal();
    proposal.type = ProposalType.UpdateAdminThreshold;
    proposal.threshold = threshold_0;
    return await this.crossChainContract.callTx.newProposal(proposal);
  }
  defaultProsal() {
    return {
      type: ProposalType.UpdateAdminThreshold,
      addr: { bytes: fromHexWithOrNoPrefix("") },
      addrUnshielded: { bytes: fromHexWithOrNoPrefix("") },
      threshold: BigInt(0),
      feeConfig: { fee: BigInt(0), chainId: BigInt(0) },
      smgPubkeys: new Array(this.MaxSmgSignators).fill({ x: 0n, y: 0n })
    };
  }
  async updateSMGPKThresholdProposal(threshold) {
    const threshold_0 = BigInt(threshold);
    let proposal = this.defaultProsal();
    proposal.type = ProposalType.UpdateSMGPKThreshold;
    proposal.threshold = threshold_0;
    return await this.crossChainContract.callTx.newProposal(proposal);
  }
  async updateFeeCommonConfigProposal(chainId, fee) {
    const chainId_0 = BigInt(chainId);
    const fee_0 = BigInt(fee);
    let proposal = this.defaultProsal();
    proposal.type = ProposalType.UpdateFeeCommonConfig;
    proposal.feeConfig = { fee: fee_0, chainId: chainId_0 };
    return await this.crossChainContract.callTx.newProposal(proposal);
  }
  //////////////////////////////////////////////////////////////////////////////////////////
  async voteProposal(proposalId) {
    const proposalId_0 = BigInt(proposalId);
    const finalizedTxData = await this.crossChainContract.callTx.voteProposal(proposalId_0);
    return finalizedTxData;
  }
  async executeProposal(proposalId) {
    const proposalId_0 = BigInt(proposalId);
    const finalizedTxData = await this.crossChainContract.callTx.executeProposal(proposalId_0);
    return finalizedTxData;
  }
  async removeExpiredHisTxs(txs) {
    assert3(txs.length <= 20, "txs length should be less than 20");
    const txs_0 = txs.map((tx) => Buffer.from(tx, "hex"));
    for (let index = txs_0.length; index < 20; index++) {
      txs_0.push(Buffer.alloc(32));
    }
    const finalizedTxData = await this.crossChainContract.callTx.removeExpiredHisTxs(txs_0);
    return finalizedTxData;
  }
  async updateContractAuthority(newKey) {
    return await this.crossChainContract.contractMaintenanceTx.replaceAuthority(newKey);
  }
  async upgradeContract(circuitId, newCircuitHex) {
    let newVK;
    if (newCircuitHex) {
      newVK = createVerifierKey(fromHex(newCircuitHex));
    } else {
      newVK = await this.providers.zkConfigProvider.getVerifierKey(circuitId);
    }
    await this.crossChainContract.circuitMaintenanceTx[circuitId].removeVerifierKey();
    const res2 = await this.crossChainContract.circuitMaintenanceTx[circuitId].insertVerifierKey(newVK);
    return res2;
  }
};
var upgradeContractCircuit = async (providers, contractAddress, circuitId, newVkHex) => {
  assertIsContractAddress(contractAddress);
  let newVk;
  if (newVkHex) {
    newVk = createVerifierKey(fromHex(newVkHex));
  } else {
    newVk = await providers.zkConfigProvider.getVerifierKey(circuitId);
  }
  return await submitInsertVerifierKeyTx(providers, contractAddress, circuitId, newVk);
};
var removeContractCircuit = async (providers, contractAddress, circuitId) => {
  assertIsContractAddress(contractAddress);
  return await submitRemoveVerifierKeyTx(providers, contractAddress, circuitId);
};
var getTreasuryCoinsFromState = (state) => {
  let treasuryCoins = /* @__PURE__ */ new Map();
  console.log("treasuryCoins size:", state.treasuryCoins.size());
  for (const [coinId, coin] of state.treasuryCoins) {
    const tokenType = decodeRawTokenType(coin.color);
    if (!treasuryCoins.has(tokenType)) {
      treasuryCoins.set(tokenType, /* @__PURE__ */ new Map());
    }
    treasuryCoins.get(tokenType)?.set(coinId, coin);
  }
  return treasuryCoins;
};
var genSigningKey = () => {
  return sampleSigningKey();
};
var getCoinPublicKeyFromShieldAddress = (shieldAddr) => {
  const tmp1 = MidnightBech32m.parse(shieldAddr);
  const tmp2 = ShieldedAddress.codec.decode(tmp1.network, tmp1);
  return tmp2.coinPublicKey.data;
};
var initNetwork = (network) => {
  setNetworkId(network);
};

export { CrossChainApi, CrossChainPrivateStateId, MidnightWalletSDK, ZKConfig, configuration, createCrossChainPrivateState, createWalletAndMidnightProvider, crosschainContractInstance, currentDir, genSigningKey, getCoinPublicKeyFromShieldAddress, getDirname, getTreasuryCoinsFromState, initFacadeWallet, initNetwork, pad, removeContractCircuit, upgradeContractCircuit, witnesses };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map