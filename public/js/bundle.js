(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __export = (target, all3) => {
    for (var name in all3)
      __defProp(target, name, { get: all3[name], enumerable: true });
  };

  // node_modules/axios/lib/helpers/bind.js
  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }
  var init_bind = __esm({
    "node_modules/axios/lib/helpers/bind.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/utils.js
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
  }
  function isArrayBufferView(val) {
    let result;
    if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
      result = ArrayBuffer.isView(val);
    } else {
      result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
  }
  function getGlobal() {
    if (typeof globalThis !== "undefined") return globalThis;
    if (typeof self !== "undefined") return self;
    if (typeof window !== "undefined") return window;
    if (typeof global !== "undefined") return global;
    return {};
  }
  function forEach(obj, fn, { allOwnKeys = false } = {}) {
    if (obj === null || typeof obj === "undefined") {
      return;
    }
    let i;
    let l;
    if (typeof obj !== "object") {
      obj = [obj];
    }
    if (isArray(obj)) {
      for (i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      if (isBuffer(obj)) {
        return;
      }
      const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
      const len = keys.length;
      let key;
      for (i = 0; i < len; i++) {
        key = keys[i];
        fn.call(null, obj[key], key, obj);
      }
    }
  }
  function findKey(obj, key) {
    if (isBuffer(obj)) {
      return null;
    }
    key = key.toLowerCase();
    const keys = Object.keys(obj);
    let i = keys.length;
    let _key;
    while (i-- > 0) {
      _key = keys[i];
      if (key === _key.toLowerCase()) {
        return _key;
      }
    }
    return null;
  }
  function merge(...objs) {
    const { caseless, skipUndefined } = isContextDefined(this) && this || {};
    const result = {};
    const assignValue = (val, key) => {
      if (key === "__proto__" || key === "constructor" || key === "prototype") {
        return;
      }
      const targetKey = caseless && typeof key === "string" && findKey(result, key) || key;
      const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : void 0;
      if (isPlainObject(existing) && isPlainObject(val)) {
        result[targetKey] = merge(existing, val);
      } else if (isPlainObject(val)) {
        result[targetKey] = merge({}, val);
      } else if (isArray(val)) {
        result[targetKey] = val.slice();
      } else if (!skipUndefined || !isUndefined(val)) {
        result[targetKey] = val;
      }
    };
    for (let i = 0, l = objs.length; i < l; i++) {
      const source = objs[i];
      if (!source || isBuffer(source)) {
        continue;
      }
      forEach(source, assignValue);
      if (typeof source !== "object" || isArray(source)) {
        continue;
      }
      const symbols = Object.getOwnPropertySymbols(source);
      for (let j = 0; j < symbols.length; j++) {
        const symbol = symbols[j];
        if (propertyIsEnumerable.call(source, symbol)) {
          assignValue(source[symbol], symbol);
        }
      }
    }
    return result;
  }
  function isSpecCompliantForm(thing) {
    return !!(thing && isFunction(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
  }
  var toString, getPrototypeOf, iterator, toStringTag, hasOwnProperty, isUnsafeObjectKey, isPrototypeBoundary, isSafeAndFullyMutable, hasOwnInPrototypeChain, getSafeProp, toSafeFlatObject, kindOf, kindOfTest, typeOfTest, isArray, isUndefined, isArrayBuffer, isString, isFunction, isNumber, isObject, isBoolean, isPlainObject, isEmptyObject, isDate, isFile, isReactNativeBlob, isReactNative, isBlob, isFileList, isSet, isStream, G, FormDataCtor, isFormData, isURLSearchParams, isReadableStream, isRequest, isResponse, isHeaders, trim, _global, isContextDefined, extend, stripBOM, inherits, toFlatObject, endsWith, toArray, isTypedArray, forEachEntry, matchAll, isHTMLForm, toCamelCase, propertyIsEnumerable, isRegExp, reduceDescriptors, freezeMethods, toObjectSet, noop, toFiniteNumber, toJSONObject, isAsyncFn, isThenable, _setImmediate, asap, isIterable, isSafeIterable, utils_default;
  var init_utils = __esm({
    "node_modules/axios/lib/utils.js"() {
      "use strict";
      init_bind();
      ({ toString } = Object.prototype);
      ({ getPrototypeOf } = Object);
      ({ iterator, toStringTag } = Symbol);
      hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
      isUnsafeObjectKey = (prop) => typeof prop === "string" && (prop === "__proto__" || prop === "constructor" || prop === "prototype");
      isPrototypeBoundary = (obj, prototype2, source) => obj === Object.prototype || !source && prototype2 === null;
      isSafeAndFullyMutable = (obj) => {
        if (!Object.isExtensible(obj)) {
          return false;
        }
        const props = Object.getOwnPropertyNames(obj);
        if (Object.getOwnPropertySymbols) {
          props.push(...Object.getOwnPropertySymbols(obj));
        }
        return props.every((prop) => {
          if (isUnsafeObjectKey(prop)) {
            return false;
          }
          const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
          return !!descriptor && descriptor.configurable && descriptor.writable === true;
        });
      };
      hasOwnInPrototypeChain = (thing, prop) => {
        let obj = thing;
        const seen = [];
        while (obj != null) {
          if (seen.indexOf(obj) !== -1) {
            return false;
          }
          seen.push(obj);
          const prototype2 = getPrototypeOf(obj);
          if (isPrototypeBoundary(obj, prototype2, obj === thing)) {
            return false;
          }
          if (hasOwnProperty(obj, prop)) {
            return true;
          }
          obj = prototype2;
        }
        return false;
      };
      getSafeProp = (obj, prop) => obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : void 0;
      toSafeFlatObject = (thing) => {
        if (thing == null || typeof thing !== "object" && typeof thing !== "function") {
          return thing;
        }
        const sourcePrototype = getPrototypeOf(thing);
        if (sourcePrototype === null && isSafeAndFullyMutable(thing)) {
          return thing;
        }
        const result = /* @__PURE__ */ Object.create(null);
        const merged = /* @__PURE__ */ Object.create(null);
        const seen = [];
        let current = thing;
        while (current != null) {
          if (seen.indexOf(current) !== -1) {
            break;
          }
          seen.push(current);
          const prototype2 = current === thing ? sourcePrototype : getPrototypeOf(current);
          if (isPrototypeBoundary(current, prototype2, current === thing)) {
            break;
          }
          const props = Object.getOwnPropertyNames(current);
          if (Object.getOwnPropertySymbols) {
            props.push(...Object.getOwnPropertySymbols(current));
          }
          for (const prop of props) {
            if (isUnsafeObjectKey(prop)) {
              continue;
            }
            if (!hasOwnProperty(merged, prop)) {
              result[prop] = thing[prop];
              merged[prop] = true;
            }
          }
          current = prototype2;
        }
        return result;
      };
      kindOf = /* @__PURE__ */ ((cache) => (thing) => {
        const str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
      })(/* @__PURE__ */ Object.create(null));
      kindOfTest = (type) => {
        type = type.toLowerCase();
        return (thing) => kindOf(thing) === type;
      };
      typeOfTest = (type) => (thing) => typeof thing === type;
      ({ isArray } = Array);
      isUndefined = typeOfTest("undefined");
      isArrayBuffer = kindOfTest("ArrayBuffer");
      isString = typeOfTest("string");
      isFunction = typeOfTest("function");
      isNumber = typeOfTest("number");
      isObject = (thing) => thing !== null && typeof thing === "object";
      isBoolean = (thing) => thing === true || thing === false;
      isPlainObject = (val) => {
        if (!isObject(val)) {
          return false;
        }
        const prototype2 = getPrototypeOf(val);
        return (prototype2 === null || prototype2 === Object.prototype || getPrototypeOf(prototype2) === null) && // Treat safe own/inherited Symbol.toStringTag or Symbol.iterator members as
        // evidence the value is tagged/iterable, while ignoring members reachable
        // only through shared or terminal prototype boundaries.
        !hasOwnInPrototypeChain(val, toStringTag) && !hasOwnInPrototypeChain(val, iterator);
      };
      isEmptyObject = (val) => {
        if (!isObject(val) || isBuffer(val)) {
          return false;
        }
        try {
          return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
        } catch (e) {
          return false;
        }
      };
      isDate = kindOfTest("Date");
      isFile = kindOfTest("File");
      isReactNativeBlob = (value) => {
        return !!(value && typeof value.uri !== "undefined");
      };
      isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
      isBlob = kindOfTest("Blob");
      isFileList = kindOfTest("FileList");
      isSet = kindOfTest("Set");
      isStream = (val) => isObject(val) && isFunction(val.pipe);
      G = getGlobal();
      FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
      isFormData = (thing) => {
        if (!thing) return false;
        if (FormDataCtor && thing instanceof FormDataCtor) return true;
        const proto = getPrototypeOf(thing);
        if (!proto || proto === Object.prototype) return false;
        if (!isFunction(thing.append)) return false;
        const kind = kindOf(thing);
        return kind === "formdata" || // detect form-data instance
        kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]";
      };
      isURLSearchParams = kindOfTest("URLSearchParams");
      [isReadableStream, isRequest, isResponse, isHeaders] = [
        "ReadableStream",
        "Request",
        "Response",
        "Headers"
      ].map(kindOfTest);
      trim = (str) => {
        return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
      };
      _global = (() => {
        if (typeof globalThis !== "undefined") return globalThis;
        return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
      })();
      isContextDefined = (context) => !isUndefined(context) && context !== _global;
      extend = (a, b, thisArg, { allOwnKeys } = {}) => {
        forEach(
          b,
          (val, key) => {
            if (thisArg && isFunction(val)) {
              Object.defineProperty(a, key, {
                // Null-proto descriptor so a polluted Object.prototype.get cannot
                // hijack defineProperty's accessor-vs-data resolution.
                __proto__: null,
                value: bind(val, thisArg),
                writable: true,
                enumerable: true,
                configurable: true
              });
            } else {
              Object.defineProperty(a, key, {
                __proto__: null,
                value: val,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          },
          { allOwnKeys }
        );
        return a;
      };
      stripBOM = (content) => {
        if (content.charCodeAt(0) === 65279) {
          content = content.slice(1);
        }
        return content;
      };
      inherits = (constructor, superConstructor, props, descriptors) => {
        constructor.prototype = Object.create(superConstructor.prototype, descriptors);
        Object.defineProperty(constructor.prototype, "constructor", {
          __proto__: null,
          value: constructor,
          writable: true,
          enumerable: false,
          configurable: true
        });
        Object.defineProperty(constructor, "super", {
          __proto__: null,
          value: superConstructor.prototype
        });
        props && Object.assign(constructor.prototype, props);
      };
      toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
        let props;
        let i;
        let prop;
        const merged = {};
        destObj = destObj || {};
        if (sourceObj == null) return destObj;
        do {
          props = Object.getOwnPropertyNames(sourceObj);
          i = props.length;
          while (i-- > 0) {
            prop = props[i];
            if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
              destObj[prop] = sourceObj[prop];
              merged[prop] = true;
            }
          }
          sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
        } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
        return destObj;
      };
      endsWith = (str, searchString, position) => {
        str = String(str);
        if (position === void 0 || position > str.length) {
          position = str.length;
        }
        position -= searchString.length;
        const lastIndex = str.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
      };
      toArray = (thing) => {
        if (!thing) return null;
        if (isArray(thing)) return thing;
        let i = thing.length;
        if (!isNumber(i)) return null;
        const arr = new Array(i);
        while (i-- > 0) {
          arr[i] = thing[i];
        }
        return arr;
      };
      isTypedArray = /* @__PURE__ */ ((TypedArray) => {
        return (thing) => {
          return TypedArray && thing instanceof TypedArray;
        };
      })(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
      forEachEntry = (obj, fn) => {
        const generator = obj && obj[iterator];
        const _iterator = generator.call(obj);
        let result;
        while ((result = _iterator.next()) && !result.done) {
          const pair = result.value;
          fn.call(obj, pair[0], pair[1]);
        }
      };
      matchAll = (regExp, str) => {
        let matches;
        const arr = [];
        while ((matches = regExp.exec(str)) !== null) {
          arr.push(matches);
        }
        return arr;
      };
      isHTMLForm = kindOfTest("HTMLFormElement");
      toCamelCase = (str) => {
        return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
          return p1.toUpperCase() + p2;
        });
      };
      ({ propertyIsEnumerable } = Object.prototype);
      isRegExp = kindOfTest("RegExp");
      reduceDescriptors = (obj, reducer) => {
        const descriptors = Object.getOwnPropertyDescriptors(obj);
        const reducedDescriptors = {};
        forEach(descriptors, (descriptor, name) => {
          let ret;
          if ((ret = reducer(descriptor, name, obj)) !== false) {
            reducedDescriptors[name] = ret || descriptor;
          }
        });
        Object.defineProperties(obj, reducedDescriptors);
      };
      freezeMethods = (obj) => {
        reduceDescriptors(obj, (descriptor, name) => {
          if (isFunction(obj) && ["arguments", "caller", "callee"].includes(name)) {
            return false;
          }
          const value = obj[name];
          if (!isFunction(value)) return;
          descriptor.enumerable = false;
          if ("writable" in descriptor) {
            descriptor.writable = false;
            return;
          }
          if (!descriptor.set) {
            descriptor.set = () => {
              throw Error("Can not rewrite read-only method '" + name + "'");
            };
          }
        });
      };
      toObjectSet = (arrayOrString, delimiter) => {
        const obj = {};
        const define = (arr) => {
          arr.forEach((value) => {
            obj[value] = true;
          });
        };
        isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
        return obj;
      };
      noop = () => {
      };
      toFiniteNumber = (value, defaultValue) => {
        return value != null && Number.isFinite(value = +value) ? value : defaultValue;
      };
      toJSONObject = (obj) => {
        const visited = /* @__PURE__ */ new WeakSet();
        const visit = (source) => {
          if (isObject(source)) {
            if (visited.has(source)) {
              return;
            }
            if (isBuffer(source)) {
              return source;
            }
            if (!("toJSON" in source)) {
              visited.add(source);
              let target;
              if (isSet(source)) {
                target = [];
                for (const value of source) {
                  const reducedValue = visit(value);
                  !isUndefined(reducedValue) && target.push(reducedValue);
                }
              } else {
                target = isArray(source) ? [] : {};
                forEach(source, (value, key) => {
                  const reducedValue = visit(value);
                  !isUndefined(reducedValue) && (target[key] = reducedValue);
                });
              }
              visited.delete(source);
              return target;
            }
          }
          return source;
        };
        return visit(obj);
      };
      isAsyncFn = kindOfTest("AsyncFunction");
      isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
      _setImmediate = ((setImmediateSupported, postMessageSupported) => {
        if (setImmediateSupported) {
          return setImmediate;
        }
        return postMessageSupported ? ((token, callbacks) => {
          _global.addEventListener(
            "message",
            ({ source, data }) => {
              if (source === _global && data === token) {
                callbacks.length && callbacks.shift()();
              }
            },
            false
          );
          return (cb) => {
            callbacks.push(cb);
            _global.postMessage(token, "*");
          };
        })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
      })(typeof setImmediate === "function", isFunction(_global.postMessage));
      asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
      isIterable = (thing) => thing != null && isFunction(thing[iterator]);
      isSafeIterable = (thing) => thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);
      utils_default = {
        isArray,
        isArrayBuffer,
        isBuffer,
        isFormData,
        isArrayBufferView,
        isString,
        isNumber,
        isBoolean,
        isObject,
        isPlainObject,
        isEmptyObject,
        isReadableStream,
        isRequest,
        isResponse,
        isHeaders,
        isUndefined,
        isDate,
        isFile,
        isReactNativeBlob,
        isReactNative,
        isBlob,
        isRegExp,
        isFunction,
        isStream,
        isURLSearchParams,
        isTypedArray,
        isFileList,
        forEach,
        merge,
        extend,
        trim,
        stripBOM,
        inherits,
        toFlatObject,
        kindOf,
        kindOfTest,
        endsWith,
        toArray,
        forEachEntry,
        matchAll,
        isHTMLForm,
        hasOwnProperty,
        hasOwnProp: hasOwnProperty,
        // an alias to avoid ESLint no-prototype-builtins detection
        hasOwnInPrototypeChain,
        getSafeProp,
        toSafeFlatObject,
        reduceDescriptors,
        freezeMethods,
        toObjectSet,
        toCamelCase,
        noop,
        toFiniteNumber,
        findKey,
        global: _global,
        isContextDefined,
        isSpecCompliantForm,
        toJSONObject,
        isAsyncFn,
        isThenable,
        setImmediate: _setImmediate,
        asap,
        isIterable,
        isSafeIterable
      };
    }
  });

  // node_modules/axios/lib/helpers/parseHeaders.js
  var ignoreDuplicateOf, parseHeaders_default;
  var init_parseHeaders = __esm({
    "node_modules/axios/lib/helpers/parseHeaders.js"() {
      "use strict";
      init_utils();
      ignoreDuplicateOf = utils_default.toObjectSet([
        "age",
        "authorization",
        "content-length",
        "content-type",
        "etag",
        "expires",
        "from",
        "host",
        "if-modified-since",
        "if-unmodified-since",
        "last-modified",
        "location",
        "max-forwards",
        "proxy-authorization",
        "referer",
        "retry-after",
        "user-agent"
      ]);
      parseHeaders_default = (rawHeaders) => {
        const parsed = {};
        let key;
        let val;
        let i;
        rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
          i = line.indexOf(":");
          key = line.substring(0, i).trim().toLowerCase();
          val = line.substring(i + 1).trim();
          const hasKey = utils_default.hasOwnProp(parsed, key);
          if (!key || hasKey && utils_default.hasOwnProp(ignoreDuplicateOf, key)) {
            return;
          }
          if (key === "set-cookie") {
            if (hasKey) {
              parsed[key].push(val);
            } else {
              parsed[key] = [val];
            }
          } else {
            parsed[key] = hasKey ? parsed[key] + ", " + val : val;
          }
        });
        return parsed;
      };
    }
  });

  // node_modules/axios/lib/helpers/sanitizeHeaderValue.js
  function trimSPorHTAB(str) {
    let start = 0;
    let end = str.length;
    while (start < end) {
      const code = str.charCodeAt(start);
      if (code !== 9 && code !== 32) {
        break;
      }
      start += 1;
    }
    while (end > start) {
      const code = str.charCodeAt(end - 1);
      if (code !== 9 && code !== 32) {
        break;
      }
      end -= 1;
    }
    return start === 0 && end === str.length ? str : str.slice(start, end);
  }
  function sanitizeValue(value, invalidChars) {
    if (utils_default.isArray(value)) {
      return value.map((item) => sanitizeValue(item, invalidChars));
    }
    return trimSPorHTAB(String(value).replace(invalidChars, ""));
  }
  function toByteStringHeaderObject(headers) {
    const byteStringHeaders = /* @__PURE__ */ Object.create(null);
    utils_default.forEach(headers.toJSON(), (value, header) => {
      byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
    });
    return byteStringHeaders;
  }
  var INVALID_UNICODE_HEADER_VALUE_CHARS, INVALID_BYTE_STRING_HEADER_VALUE_CHARS, sanitizeHeaderValue, sanitizeByteStringHeaderValue;
  var init_sanitizeHeaderValue = __esm({
    "node_modules/axios/lib/helpers/sanitizeHeaderValue.js"() {
      "use strict";
      init_utils();
      INVALID_UNICODE_HEADER_VALUE_CHARS = new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g");
      INVALID_BYTE_STRING_HEADER_VALUE_CHARS = new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
      sanitizeHeaderValue = (value) => sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);
      sanitizeByteStringHeaderValue = (value) => sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);
    }
  });

  // node_modules/axios/lib/core/AxiosHeaders.js
  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }
  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }
    return utils_default.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
  }
  function parseTokens(str) {
    const tokens = /* @__PURE__ */ Object.create(null);
    const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    let match;
    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }
    return tokens;
  }
  function trimOWS(value) {
    let start = 0;
    let end = value.length;
    while (start < end) {
      const code = value.charCodeAt(start);
      if (code !== 9 && code !== 32) {
        break;
      }
      start += 1;
    }
    while (end > start) {
      const code = value.charCodeAt(end - 1);
      if (code !== 9 && code !== 32) {
        break;
      }
      end -= 1;
    }
    return start === 0 && end === value.length ? value : value.slice(start, end);
  }
  function decodeQuotedString(value) {
    const last = value.length - 1;
    if (last < 1 || value.charCodeAt(0) !== 34 || value.charCodeAt(last) !== 34) {
      return value;
    }
    let decoded = "";
    for (let i = 1; i < last; i++) {
      const code = value.charCodeAt(i);
      if (code === 34) {
        return value;
      }
      if (code === 92) {
        i += 1;
        if (i >= last) {
          return value;
        }
      }
      decoded += value[i];
    }
    return decoded;
  }
  function parseParameters(value) {
    const parameters = /* @__PURE__ */ Object.create(null);
    const str = String(value);
    let start = 0;
    let quoted = false;
    let escaped = false;
    function parseParameter(end) {
      const part = trimOWS(str.slice(start, end));
      const equals = part.indexOf("=");
      if (equals < 1) {
        return;
      }
      const name = trimOWS(part.slice(0, equals));
      if (!parameterNameRE.test(name)) {
        return;
      }
      const normalizedName = name.toLowerCase();
      if (normalizedName === "__proto__" || normalizedName === "constructor" || normalizedName === "prototype") {
        return;
      }
      const parameterValue = trimOWS(part.slice(equals + 1));
      parameters[normalizedName] = decodeQuotedString(parameterValue);
    }
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (quoted) {
        if (escaped) {
          escaped = false;
        } else if (code === 92) {
          escaped = true;
        } else if (code === 34) {
          quoted = false;
        }
      } else if (code === 34) {
        quoted = true;
      } else if (code === 44 || code === 59) {
        parseParameter(i);
        start = i + 1;
      }
    }
    parseParameter(str.length);
    return parameters;
  }
  function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
    if (utils_default.isFunction(filter2)) {
      return filter2.call(this, value, header);
    }
    if (isHeaderNameFilter) {
      value = header;
    }
    if (!utils_default.isString(value)) return;
    if (utils_default.isString(filter2)) {
      return value.indexOf(filter2) !== -1;
    }
    if (utils_default.isRegExp(filter2)) {
      return filter2.test(value);
    }
  }
  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }
  function buildAccessors(obj, header) {
    const accessorName = utils_default.toCamelCase(" " + header);
    ["get", "set", "has"].forEach((methodName) => {
      Object.defineProperty(obj, methodName + accessorName, {
        // Null-proto descriptor so a polluted Object.prototype.get cannot turn
        // this data descriptor into an accessor descriptor on the way in.
        __proto__: null,
        value: function(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }
  var $internals, parameterNameRE, isValidHeaderName, AxiosHeaders, AxiosHeaders_default;
  var init_AxiosHeaders = __esm({
    "node_modules/axios/lib/core/AxiosHeaders.js"() {
      "use strict";
      init_utils();
      init_parseHeaders();
      init_sanitizeHeaderValue();
      $internals = /* @__PURE__ */ Symbol("internals");
      parameterNameRE = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
      isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
      AxiosHeaders = class {
        constructor(headers) {
          headers && this.set(headers);
        }
        set(header, valueOrRewrite, rewrite) {
          const self2 = this;
          function setHeader(_value, _header, _rewrite) {
            const lHeader = normalizeHeader(_header);
            if (!lHeader) {
              return;
            }
            const key = utils_default.findKey(self2, lHeader);
            if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
              self2[key || _header] = normalizeValue(_value);
            }
          }
          const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
          if (utils_default.isPlainObject(header) || header instanceof this.constructor) {
            setHeaders(header, valueOrRewrite);
          } else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
            setHeaders(parseHeaders_default(header), valueOrRewrite);
          } else if (utils_default.isObject(header) && utils_default.isSafeIterable(header)) {
            let obj = /* @__PURE__ */ Object.create(null), dest, key;
            for (const entry of header) {
              if (!utils_default.isArray(entry)) {
                throw new TypeError("Object iterator must return a key-value pair");
              }
              key = entry[0];
              if (utils_default.hasOwnProp(obj, key)) {
                dest = obj[key];
                obj[key] = utils_default.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]];
              } else {
                obj[key] = entry[1];
              }
            }
            setHeaders(obj, valueOrRewrite);
          } else {
            header != null && setHeader(valueOrRewrite, header, rewrite);
          }
          return this;
        }
        get(header, parser) {
          header = normalizeHeader(header);
          if (header) {
            const key = utils_default.findKey(this, header);
            if (key) {
              const value = this[key];
              if (!parser) {
                return value;
              }
              if (parser === true) {
                return parseTokens(value);
              }
              if (utils_default.isFunction(parser)) {
                return parser.call(this, value, key);
              }
              if (utils_default.isRegExp(parser)) {
                return parser.exec(value);
              }
              throw new TypeError("parser must be boolean|regexp|function");
            }
          }
        }
        has(header, matcher) {
          header = normalizeHeader(header);
          if (header) {
            const key = utils_default.findKey(this, header);
            return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
          }
          return false;
        }
        delete(header, matcher) {
          const self2 = this;
          let deleted = false;
          function deleteHeader(_header) {
            _header = normalizeHeader(_header);
            if (_header) {
              const key = utils_default.findKey(self2, _header);
              if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
                delete self2[key];
                deleted = true;
              }
            }
          }
          if (utils_default.isArray(header)) {
            header.forEach(deleteHeader);
          } else {
            deleteHeader(header);
          }
          return deleted;
        }
        clear(matcher) {
          const keys = Object.keys(this);
          let i = keys.length;
          let deleted = false;
          while (i--) {
            const key = keys[i];
            if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
              delete this[key];
              deleted = true;
            }
          }
          return deleted;
        }
        normalize(format) {
          const self2 = this;
          const headers = {};
          utils_default.forEach(this, (value, header) => {
            const key = utils_default.findKey(headers, header);
            if (key) {
              self2[key] = normalizeValue(value);
              delete self2[header];
              return;
            }
            const normalized = format ? formatHeader(header) : String(header).trim();
            if (normalized !== header) {
              delete self2[header];
            }
            self2[normalized] = normalizeValue(value);
            headers[normalized] = true;
          });
          return this;
        }
        concat(...targets) {
          return this.constructor.concat(this, ...targets);
        }
        toJSON(asStrings) {
          const obj = /* @__PURE__ */ Object.create(null);
          utils_default.forEach(this, (value, header) => {
            value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
          });
          return obj;
        }
        [Symbol.iterator]() {
          return Object.entries(this.toJSON())[Symbol.iterator]();
        }
        toString() {
          return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
        }
        getSetCookie() {
          const value = this.get("set-cookie");
          return utils_default.isArray(value) ? value : value == null || value === false ? [] : [value];
        }
        get [Symbol.toStringTag]() {
          return "AxiosHeaders";
        }
        static from(thing) {
          return thing instanceof this ? thing : new this(thing);
        }
        static parseParameters(value) {
          return parseParameters(value);
        }
        static concat(first, ...targets) {
          const computed = new this(first);
          targets.forEach((target) => computed.set(target));
          return computed;
        }
        static accessor(header) {
          const internals = this[$internals] = this[$internals] = {
            accessors: {}
          };
          const accessors = internals.accessors;
          const prototype2 = this.prototype;
          function defineAccessor(_header) {
            const lHeader = normalizeHeader(_header);
            if (!accessors[lHeader]) {
              buildAccessors(prototype2, _header);
              accessors[lHeader] = true;
            }
          }
          utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
          return this;
        }
      };
      AxiosHeaders.accessor([
        "Content-Type",
        "Content-Length",
        "Accept",
        "Accept-Encoding",
        "User-Agent",
        "Authorization"
      ]);
      utils_default.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
        let mapped = key[0].toUpperCase() + key.slice(1);
        return {
          get: () => value,
          set(headerValue) {
            this[mapped] = headerValue;
          }
        };
      });
      utils_default.freezeMethods(AxiosHeaders);
      AxiosHeaders_default = AxiosHeaders;
    }
  });

  // node_modules/axios/lib/core/AxiosError.js
  function hasOwnOrPrototypeToJSON(source) {
    if (utils_default.hasOwnProp(source, "toJSON")) {
      return true;
    }
    let prototype2 = Object.getPrototypeOf(source);
    while (prototype2 && prototype2 !== Object.prototype) {
      if (utils_default.hasOwnProp(prototype2, "toJSON")) {
        return true;
      }
      prototype2 = Object.getPrototypeOf(prototype2);
    }
    return false;
  }
  function redactConfig(config, redactKeys) {
    const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
    const seen = [];
    const visit = (source) => {
      if (source === null || typeof source !== "object") return source;
      if (utils_default.isBuffer(source)) return source;
      if (seen.indexOf(source) !== -1) return void 0;
      if (source instanceof AxiosHeaders_default) {
        source = source.toJSON();
      }
      seen.push(source);
      let result;
      if (utils_default.isArray(source)) {
        result = [];
        source.forEach((v, i) => {
          const reducedValue = visit(v);
          if (!utils_default.isUndefined(reducedValue)) {
            result[i] = reducedValue;
          }
        });
      } else {
        if (!utils_default.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
          seen.pop();
          return source;
        }
        result = /* @__PURE__ */ Object.create(null);
        for (const [key, value] of Object.entries(source)) {
          const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
          if (!utils_default.isUndefined(reducedValue)) {
            result[key] = reducedValue;
          }
        }
      }
      seen.pop();
      return result;
    };
    return visit(config);
  }
  function stringifySafely(value) {
    try {
      return String(value);
    } catch (err) {
      return "";
    }
  }
  function aggregateErrorMessage(error) {
    const message = error.errors.map((entry) => {
      try {
        return entry && entry.message ? stringifySafely(entry.message) : stringifySafely(entry);
      } catch (err) {
        return "";
      }
    }).filter(Boolean).join("; ");
    return message || error.name || "AggregateError";
  }
  var REDACTED, AxiosError, AxiosError_default;
  var init_AxiosError = __esm({
    "node_modules/axios/lib/core/AxiosError.js"() {
      "use strict";
      init_utils();
      init_AxiosHeaders();
      REDACTED = "[REDACTED ****]";
      AxiosError = class _AxiosError extends Error {
        static from(error, code, config, request, response, customProps) {
          let message = error.message;
          if (!message && utils_default.isArray(error.errors) && error.errors.length) {
            message = aggregateErrorMessage(error);
          }
          const axiosError = new _AxiosError(message, code || error.code, config, request, response);
          Object.defineProperty(axiosError, "cause", {
            __proto__: null,
            value: error,
            writable: true,
            enumerable: false,
            configurable: true
          });
          axiosError.name = error.name;
          if (error.status != null && axiosError.status == null) {
            axiosError.status = error.status;
          }
          customProps && Object.assign(axiosError, customProps);
          return axiosError;
        }
        /**
         * Create an Error with the specified message, config, error code, request and response.
         *
         * @param {string} message The error message.
         * @param {string} [code] The error code (for example, 'ECONNABORTED').
         * @param {Object} [config] The config.
         * @param {Object} [request] The request.
         * @param {Object} [response] The response.
         *
         * @returns {Error} The created error.
         */
        constructor(message, code, config, request, response) {
          super(message);
          Object.defineProperty(this, "message", {
            // Null-proto descriptor so a polluted Object.prototype.get cannot turn
            // this data descriptor into an accessor descriptor on the way in.
            __proto__: null,
            value: message,
            enumerable: true,
            writable: true,
            configurable: true
          });
          this.name = "AxiosError";
          this.isAxiosError = true;
          code && (this.code = code);
          config && (this.config = config);
          request && (this.request = request);
          if (response) {
            this.response = response;
            this.status = response.status;
          }
        }
        toJSON() {
          const config = this.config;
          const redactKeys = config && utils_default.hasOwnProp(config, "redact") ? config.redact : void 0;
          const serializedConfig = utils_default.isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : utils_default.toJSONObject(config);
          return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: serializedConfig,
            code: this.code,
            status: this.status
          };
        }
      };
      AxiosError.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
      AxiosError.ERR_BAD_OPTION = "ERR_BAD_OPTION";
      AxiosError.ECONNABORTED = "ECONNABORTED";
      AxiosError.ETIMEDOUT = "ETIMEDOUT";
      AxiosError.ECONNREFUSED = "ECONNREFUSED";
      AxiosError.ERR_NETWORK = "ERR_NETWORK";
      AxiosError.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
      AxiosError.ERR_DEPRECATED = "ERR_DEPRECATED";
      AxiosError.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
      AxiosError.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
      AxiosError.ERR_CANCELED = "ERR_CANCELED";
      AxiosError.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
      AxiosError.ERR_INVALID_URL = "ERR_INVALID_URL";
      AxiosError.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
      AxiosError_default = AxiosError;
    }
  });

  // node_modules/axios/lib/helpers/null.js
  var null_default;
  var init_null = __esm({
    "node_modules/axios/lib/helpers/null.js"() {
      null_default = null;
    }
  });

  // node_modules/axios/lib/helpers/toFormData.js
  function isVisitable(thing) {
    return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
  }
  function removeBrackets(key) {
    return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
  }
  function renderKey(path, key, dots) {
    if (!path) return key;
    return path.concat(key).map(function each(token, i) {
      token = removeBrackets(token);
      return !dots && i ? "[" + token + "]" : token;
    }).join(dots ? "." : "");
  }
  function isFlatArray(arr) {
    return utils_default.isArray(arr) && !arr.some(isVisitable);
  }
  function toFormData(obj, formData, options) {
    if (!utils_default.isObject(obj)) {
      throw new TypeError("target must be an object");
    }
    formData = formData || new (null_default || FormData)();
    const option = (name, fallback) => {
      const value = utils_default.getSafeProp(options, name);
      return utils_default.isUndefined(value) ? fallback : value;
    };
    const metaTokens = option("metaTokens", true);
    const visitor = option("visitor") || defaultVisitor;
    const dots = option("dots", false);
    const indexes = option("indexes", false);
    const _Blob = option("Blob") || typeof Blob !== "undefined" && Blob;
    const maxDepth = option("maxDepth", DEFAULT_FORM_DATA_MAX_DEPTH);
    const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
    const stack = [];
    if (!utils_default.isFunction(visitor)) {
      throw new TypeError("visitor must be a function");
    }
    function convertValue(value) {
      if (value === null) return "";
      if (utils_default.isDate(value)) {
        return value.toISOString();
      }
      if (utils_default.isBoolean(value)) {
        return value.toString();
      }
      if (!useBlob && utils_default.isBlob(value)) {
        throw new AxiosError_default("Blob is not supported. Use a Buffer instead.");
      }
      if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
        if (useBlob && typeof _Blob === "function") {
          return new _Blob([value]);
        }
        if (null_default && null_default.isBufferAvailable()) {
          return null_default.from(value);
        }
        throw new AxiosError_default(
          "Blob is not supported. Use a Buffer instead.",
          AxiosError_default.ERR_NOT_SUPPORT
        );
      }
      return value;
    }
    function throwIfMaxDepthExceeded(depth) {
      if (depth > maxDepth) {
        throw new AxiosError_default(
          "Object is too deeply nested (" + depth + " levels). Max depth: " + maxDepth,
          AxiosError_default.ERR_FORM_DATA_DEPTH_EXCEEDED
        );
      }
    }
    function stringifyWithDepthLimit(value, depth) {
      if (maxDepth === Infinity) {
        return JSON.stringify(value);
      }
      const ancestors = [];
      return JSON.stringify(value, function limitDepth(_key, currentValue) {
        if (!utils_default.isObject(currentValue)) {
          return currentValue;
        }
        while (ancestors.length && ancestors[ancestors.length - 1] !== this) {
          ancestors.pop();
        }
        ancestors.push(currentValue);
        throwIfMaxDepthExceeded(depth + ancestors.length - 1);
        return currentValue;
      });
    }
    function defaultVisitor(value, key, path) {
      let arr = value;
      if (utils_default.isReactNative(formData) && utils_default.isReactNativeBlob(value)) {
        formData.append(renderKey(path, key, dots), convertValue(value));
        return false;
      }
      if (value && !path && typeof value === "object") {
        if (utils_default.endsWith(key, "{}")) {
          key = metaTokens ? key : key.slice(0, -2);
          value = stringifyWithDepthLimit(value, 1);
        } else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
          key = removeBrackets(key);
          arr.forEach(function each(el, index) {
            !(utils_default.isUndefined(el) || el === null) && formData.append(
              // eslint-disable-next-line no-nested-ternary
              indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
              convertValue(el)
            );
          });
          return false;
        }
      }
      if (isVisitable(value)) {
        return true;
      }
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    const exposedHelpers = Object.assign(predicates, {
      defaultVisitor,
      convertValue,
      isVisitable
    });
    function build(value, path, depth = 0) {
      if (utils_default.isUndefined(value)) return;
      throwIfMaxDepthExceeded(depth);
      if (stack.indexOf(value) !== -1) {
        throw new Error("Circular reference detected in " + path.join("."));
      }
      stack.push(value);
      utils_default.forEach(value, function each(el, key) {
        const result = !(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers);
        if (result === true) {
          build(el, path ? path.concat(key) : [key], depth + 1);
        }
      });
      stack.pop();
    }
    if (!utils_default.isObject(obj)) {
      throw new TypeError("data must be an object");
    }
    build(obj);
    return formData;
  }
  var DEFAULT_FORM_DATA_MAX_DEPTH, predicates, toFormData_default;
  var init_toFormData = __esm({
    "node_modules/axios/lib/helpers/toFormData.js"() {
      "use strict";
      init_utils();
      init_AxiosError();
      init_null();
      init_null();
      DEFAULT_FORM_DATA_MAX_DEPTH = 100;
      predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
        return /^is[A-Z]/.test(prop);
      });
      toFormData_default = toFormData;
    }
  });

  // node_modules/axios/lib/helpers/AxiosURLSearchParams.js
  function encode(str) {
    const charMap = {
      "!": "%21",
      "'": "%27",
      "(": "%28",
      ")": "%29",
      "~": "%7E",
      "%20": "+"
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
      return charMap[match];
    });
  }
  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData_default(params, this, options);
  }
  var prototype, AxiosURLSearchParams_default;
  var init_AxiosURLSearchParams = __esm({
    "node_modules/axios/lib/helpers/AxiosURLSearchParams.js"() {
      "use strict";
      init_toFormData();
      prototype = AxiosURLSearchParams.prototype;
      prototype.append = function append(name, value) {
        this._pairs.push([name, value]);
      };
      prototype.toString = function toString2(encoder) {
        const _encode = encoder ? (value) => encoder.call(this, value, encode) : encode;
        return this._pairs.map(function each(pair) {
          return _encode(pair[0]) + "=" + _encode(pair[1]);
        }, "").join("&");
      };
      AxiosURLSearchParams_default = AxiosURLSearchParams;
    }
  });

  // node_modules/axios/lib/helpers/buildURL.js
  function encode2(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
  }
  function buildURL(url, params, options) {
    if (!params) {
      return url;
    }
    url = url || "";
    const _options = utils_default.isFunction(options) ? {
      serialize: options
    } : options;
    const _encode = utils_default.getSafeProp(_options, "encode") || encode2;
    const serializeFn = utils_default.getSafeProp(_options, "serialize");
    let serializedParams;
    if (serializeFn) {
      serializedParams = serializeFn(params, _options);
    } else {
      serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams_default(params, _options).toString(_encode);
    }
    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }
      url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  var init_buildURL = __esm({
    "node_modules/axios/lib/helpers/buildURL.js"() {
      "use strict";
      init_utils();
      init_AxiosURLSearchParams();
    }
  });

  // node_modules/axios/lib/core/InterceptorManager.js
  function countHandlers(handlers) {
    return handlers ? handlers.length : 0;
  }
  function trimHandlers(handlers) {
    if (!handlers) {
      return;
    }
    while (handlers.length && handlers[handlers.length - 1] === null) {
      handlers.pop();
    }
  }
  function syncHandlerEntries(manager, internals) {
    const handlers = manager.handlers;
    const length = countHandlers(handlers);
    if (handlers !== internals.handlersRef) {
      internals.handlersRef = handlers;
      internals.handlerEntries.clear();
    } else if (length !== internals.handlersLength) {
      if (!length) {
        internals.handlerEntries.clear();
      } else {
        internals.handlerEntries.forEach(function removeStaleEntry(entry, id) {
          if (handlers[entry.index] !== entry.handler) {
            internals.handlerEntries.delete(id);
          }
        });
      }
    }
    internals.handlersLength = length;
  }
  var $internals2, InterceptorManager, InterceptorManager_default;
  var init_InterceptorManager = __esm({
    "node_modules/axios/lib/core/InterceptorManager.js"() {
      "use strict";
      init_utils();
      $internals2 = /* @__PURE__ */ Symbol("internals");
      InterceptorManager = class {
        constructor() {
          this.handlers = [];
          this[$internals2] = {
            handlersRef: this.handlers,
            handlersLength: this.handlers.length,
            handlerEntries: /* @__PURE__ */ new Map(),
            iterationDepth: 0,
            nextId: 0
          };
        }
        /**
         * Add a new interceptor to the stack
         *
         * @param {Function} fulfilled The function to handle `then` for a `Promise`
         * @param {Function} rejected The function to handle `reject` for a `Promise`
         * @param {Object} options The options for the interceptor, synchronous and runWhen
         *
         * @return {Number} An ID used to remove interceptor later
         */
        use(fulfilled, rejected, options) {
          const handler = {
            fulfilled,
            rejected,
            synchronous: options ? options.synchronous : false,
            runWhen: options ? options.runWhen : null
          };
          const internals = this[$internals2];
          if (this.handlers == null) {
            this.handlers = [];
          }
          syncHandlerEntries(this, internals);
          const id = internals.nextId++;
          this.handlers.push(handler);
          internals.handlerEntries.set(id, {
            handler,
            index: this.handlers.length - 1
          });
          internals.handlersLength = this.handlers.length;
          return id;
        }
        /**
         * Remove an interceptor from the stack
         *
         * @param {Number} id The ID that was returned by `use`
         *
         * @returns {void}
         */
        eject(id) {
          const internals = this[$internals2];
          syncHandlerEntries(this, internals);
          const entry = internals.handlerEntries.get(id);
          if (entry) {
            internals.handlerEntries.delete(id);
            if (this.handlers[entry.index] !== entry.handler) {
              return;
            }
            this.handlers[entry.index] = null;
            if (!internals.iterationDepth) {
              trimHandlers(this.handlers);
              internals.handlersLength = this.handlers.length;
            }
          }
        }
        /**
         * Clear all interceptors from the stack
         *
         * @returns {void}
         */
        clear() {
          if (this.handlers) {
            this.handlers = [];
            syncHandlerEntries(this, this[$internals2]);
          }
        }
        /**
         * Iterate over all the registered interceptors
         *
         * This method is particularly useful for skipping over any
         * interceptors that may have become `null` calling `eject`.
         *
         * @param {Function} fn The function to call for each interceptor
         *
         * @returns {void}
         */
        forEach(fn) {
          const internals = this[$internals2];
          syncHandlerEntries(this, internals);
          internals.iterationDepth++;
          try {
            utils_default.forEach(this.handlers, function forEachHandler(h) {
              if (h !== null) {
                fn(h);
              }
            });
          } finally {
            if (!--internals.iterationDepth) {
              syncHandlerEntries(this, internals);
              trimHandlers(this.handlers);
              internals.handlersLength = countHandlers(this.handlers);
            }
          }
        }
      };
      InterceptorManager_default = InterceptorManager;
    }
  });

  // node_modules/axios/lib/defaults/transitional.js
  var transitional_default;
  var init_transitional = __esm({
    "node_modules/axios/lib/defaults/transitional.js"() {
      "use strict";
      transitional_default = {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false,
        legacyInterceptorReqResOrdering: true,
        advertiseZstdAcceptEncoding: false,
        validateStatusUndefinedResolves: true
      };
    }
  });

  // node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
  var URLSearchParams_default;
  var init_URLSearchParams = __esm({
    "node_modules/axios/lib/platform/browser/classes/URLSearchParams.js"() {
      "use strict";
      init_AxiosURLSearchParams();
      URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams_default;
    }
  });

  // node_modules/axios/lib/platform/browser/classes/FormData.js
  var FormData_default;
  var init_FormData = __esm({
    "node_modules/axios/lib/platform/browser/classes/FormData.js"() {
      "use strict";
      FormData_default = typeof FormData !== "undefined" ? FormData : null;
    }
  });

  // node_modules/axios/lib/platform/browser/classes/Blob.js
  var Blob_default;
  var init_Blob = __esm({
    "node_modules/axios/lib/platform/browser/classes/Blob.js"() {
      "use strict";
      Blob_default = typeof Blob !== "undefined" ? Blob : null;
    }
  });

  // node_modules/axios/lib/platform/browser/index.js
  var browser_default;
  var init_browser = __esm({
    "node_modules/axios/lib/platform/browser/index.js"() {
      init_URLSearchParams();
      init_FormData();
      init_Blob();
      browser_default = {
        isBrowser: true,
        classes: {
          URLSearchParams: URLSearchParams_default,
          FormData: FormData_default,
          Blob: Blob_default
        },
        protocols: ["http", "https", "file", "blob", "url", "data"]
      };
    }
  });

  // node_modules/axios/lib/platform/common/utils.js
  var utils_exports = {};
  __export(utils_exports, {
    hasBrowserEnv: () => hasBrowserEnv,
    hasStandardBrowserEnv: () => hasStandardBrowserEnv,
    hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
    navigator: () => _navigator,
    origin: () => origin
  });
  var hasBrowserEnv, _navigator, hasStandardBrowserEnv, hasStandardBrowserWebWorkerEnv, origin;
  var init_utils2 = __esm({
    "node_modules/axios/lib/platform/common/utils.js"() {
      hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
      _navigator = typeof navigator === "object" && navigator || void 0;
      hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
      hasStandardBrowserWebWorkerEnv = (() => {
        return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
        self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
      })();
      origin = hasBrowserEnv && window.location.href || "http://localhost";
    }
  });

  // node_modules/axios/lib/platform/index.js
  var platform_default;
  var init_platform = __esm({
    "node_modules/axios/lib/platform/index.js"() {
      init_browser();
      init_utils2();
      platform_default = {
        ...utils_exports,
        ...browser_default
      };
    }
  });

  // node_modules/axios/lib/helpers/toURLEncodedForm.js
  function toURLEncodedForm(data, options) {
    return toFormData_default(data, new platform_default.classes.URLSearchParams(), {
      visitor: function(value, key, path, helpers) {
        if (platform_default.isNode && utils_default.isBuffer(value)) {
          this.append(key, value.toString("base64"));
          return false;
        }
        return helpers.defaultVisitor.apply(this, arguments);
      },
      ...options
    });
  }
  var init_toURLEncodedForm = __esm({
    "node_modules/axios/lib/helpers/toURLEncodedForm.js"() {
      "use strict";
      init_utils();
      init_toFormData();
      init_platform();
    }
  });

  // node_modules/axios/lib/helpers/formDataToJSON.js
  function throwIfDepthExceeded(index) {
    if (index > MAX_DEPTH) {
      throw new AxiosError_default(
        "FormData field is too deeply nested (" + index + " levels). Max depth: " + MAX_DEPTH,
        AxiosError_default.ERR_FORM_DATA_DEPTH_EXCEEDED
      );
    }
  }
  function parsePropPath(name) {
    const path = [];
    const pattern = /[^.[\]]+|\[([^.[\]]*)]/g;
    let match;
    while ((match = pattern.exec(name)) !== null) {
      throwIfDepthExceeded(path.length);
      path.push(match[0] === "[]" ? "" : match[1] || match[0]);
    }
    return path;
  }
  function arrayToObject(arr) {
    const obj = {};
    const keys = Object.keys(arr);
    let i;
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      obj[key] = arr[key];
    }
    return obj;
  }
  function formDataToJSON(formData) {
    function buildPath(path, value, target, index) {
      throwIfDepthExceeded(index);
      let name = path[index++];
      if (name === "__proto__") return true;
      const isNumericKey = Number.isFinite(+name);
      const isLast = index >= path.length;
      name = !name && utils_default.isArray(target) ? target.length : name;
      if (isLast) {
        if (utils_default.hasOwnProp(target, name)) {
          target[name] = utils_default.isArray(target[name]) ? target[name].concat(value) : [target[name], value];
        } else {
          target[name] = value;
        }
        return !isNumericKey;
      }
      if (!utils_default.hasOwnProp(target, name) || !utils_default.isObject(target[name])) {
        target[name] = [];
      }
      const result = buildPath(path, value, target[name], index);
      if (result && utils_default.isArray(target[name])) {
        target[name] = arrayToObject(target[name]);
      }
      return !isNumericKey;
    }
    if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
      const obj = {};
      utils_default.forEachEntry(formData, (name, value) => {
        buildPath(parsePropPath(name), value, obj, 0);
      });
      return obj;
    }
    return null;
  }
  var MAX_DEPTH, formDataToJSON_default;
  var init_formDataToJSON = __esm({
    "node_modules/axios/lib/helpers/formDataToJSON.js"() {
      "use strict";
      init_utils();
      init_AxiosError();
      init_toFormData();
      MAX_DEPTH = DEFAULT_FORM_DATA_MAX_DEPTH;
      formDataToJSON_default = formDataToJSON;
    }
  });

  // node_modules/axios/lib/core/methodList.js
  var methodList, methodList_default;
  var init_methodList = __esm({
    "node_modules/axios/lib/core/methodList.js"() {
      "use strict";
      methodList = Object.freeze([
        "get",
        "delete",
        "head",
        "options",
        "post",
        "put",
        "patch",
        "purge",
        "link",
        "unlink",
        "query"
      ]);
      methodList_default = methodList;
    }
  });

  // node_modules/axios/lib/defaults/index.js
  function stringifySafely2(rawValue, parser, encoder) {
    if (utils_default.isString(rawValue)) {
      try {
        (parser || JSON.parse)(rawValue);
        return utils_default.trim(rawValue);
      } catch (e) {
        if (e.name !== "SyntaxError") {
          throw e;
        }
      }
    }
    return (encoder || JSON.stringify)(rawValue);
  }
  var own, defaults, defaults_default;
  var init_defaults = __esm({
    "node_modules/axios/lib/defaults/index.js"() {
      "use strict";
      init_utils();
      init_AxiosError();
      init_transitional();
      init_toFormData();
      init_toURLEncodedForm();
      init_platform();
      init_formDataToJSON();
      init_methodList();
      own = (obj, key) => obj != null && utils_default.hasOwnProp(obj, key) ? obj[key] : void 0;
      defaults = {
        transitional: transitional_default,
        adapter: ["xhr", "http", "fetch"],
        transformRequest: [
          function transformRequest(data, headers) {
            const contentType = headers.getContentType() || "";
            const hasJSONContentType = contentType.indexOf("application/json") > -1;
            const isObjectPayload = utils_default.isObject(data);
            if (isObjectPayload && utils_default.isHTMLForm(data)) {
              data = new FormData(data);
            }
            const isFormData2 = utils_default.isFormData(data);
            if (isFormData2) {
              return hasJSONContentType ? JSON.stringify(formDataToJSON_default(data)) : data;
            }
            if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) {
              return data;
            }
            if (utils_default.isArrayBufferView(data)) {
              return data.buffer;
            }
            if (utils_default.isURLSearchParams(data)) {
              headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
              return data.toString();
            }
            let isFileList2;
            if (isObjectPayload) {
              const formSerializer = own(this, "formSerializer");
              if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
                return toURLEncodedForm(data, formSerializer).toString();
              }
              if ((isFileList2 = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
                const env = own(this, "env");
                const _FormData = env && env.FormData;
                return toFormData_default(
                  isFileList2 ? { "files[]": data } : data,
                  _FormData && new _FormData(),
                  formSerializer
                );
              }
            }
            if (isObjectPayload || hasJSONContentType) {
              headers.setContentType("application/json", false);
              return stringifySafely2(data);
            }
            return data;
          }
        ],
        transformResponse: [
          function transformResponse(data) {
            const transitional2 = own(this, "transitional") || defaults.transitional;
            const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
            const responseType = own(this, "responseType");
            const JSONRequested = responseType === "json";
            if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) {
              return data;
            }
            if (data && utils_default.isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
              const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
              const strictJSONParsing = !silentJSONParsing && JSONRequested;
              try {
                return JSON.parse(data, own(this, "parseReviver"));
              } catch (e) {
                if (strictJSONParsing) {
                  if (e.name === "SyntaxError") {
                    throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_RESPONSE, this, null, own(this, "response"));
                  }
                  throw e;
                }
              }
            }
            return data;
          }
        ],
        /**
         * A timeout in milliseconds to abort a request. If set to 0 (default) a
         * timeout is not created.
         */
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        env: {
          FormData: platform_default.classes.FormData,
          Blob: platform_default.classes.Blob
        },
        validateStatus: function validateStatus(status) {
          return status >= 200 && status < 300;
        },
        headers: {
          common: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": void 0
          }
        }
      };
      utils_default.forEach(methodList_default, (method) => {
        defaults.headers[method] = {};
      });
      defaults_default = defaults;
    }
  });

  // node_modules/axios/lib/core/transformData.js
  function transformData(fns, response) {
    const config = this || defaults_default;
    const context = response || config;
    const headers = AxiosHeaders_default.from(context.headers);
    let data = context.data;
    utils_default.forEach(fns, function transform(fn) {
      data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
    });
    headers.normalize();
    return data;
  }
  var init_transformData = __esm({
    "node_modules/axios/lib/core/transformData.js"() {
      "use strict";
      init_utils();
      init_defaults();
      init_AxiosHeaders();
    }
  });

  // node_modules/axios/lib/cancel/isCancel.js
  function isCancel(value) {
    return !!(value && value.__CANCEL__);
  }
  var init_isCancel = __esm({
    "node_modules/axios/lib/cancel/isCancel.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/cancel/CanceledError.js
  var CanceledError, CanceledError_default;
  var init_CanceledError = __esm({
    "node_modules/axios/lib/cancel/CanceledError.js"() {
      "use strict";
      init_AxiosError();
      CanceledError = class extends AxiosError_default {
        /**
         * A `CanceledError` is an object that is thrown when an operation is canceled.
         *
         * @param {string=} message The message.
         * @param {Object=} config The config.
         * @param {Object=} request The request.
         *
         * @returns {CanceledError} The created error.
         */
        constructor(message, config, request) {
          super(message == null ? "canceled" : message, AxiosError_default.ERR_CANCELED, config, request);
          this.name = "CanceledError";
          this.__CANCEL__ = true;
        }
      };
      CanceledError_default = CanceledError;
    }
  });

  // node_modules/axios/lib/core/settle.js
  function settle(resolve, reject, response) {
    const validateStatus2 = response.config.validateStatus;
    if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
      resolve(response);
    } else {
      reject(new AxiosError_default(
        "Request failed with status code " + response.status,
        response.status >= 400 && response.status < 500 ? AxiosError_default.ERR_BAD_REQUEST : AxiosError_default.ERR_BAD_RESPONSE,
        response.config,
        response.request,
        response
      ));
    }
  }
  var init_settle = __esm({
    "node_modules/axios/lib/core/settle.js"() {
      "use strict";
      init_AxiosError();
    }
  });

  // node_modules/axios/lib/helpers/normalizeURLForProtocolCheck.js
  function normalizeURLForProtocolCheck(url) {
    if (typeof url !== "string") {
      return url;
    }
    let start = 0;
    while (start < url.length && url.charCodeAt(start) <= 32) {
      start++;
    }
    return url.slice(start).replace(urlParserControlCharacters, "");
  }
  var urlParserControlCharacters;
  var init_normalizeURLForProtocolCheck = __esm({
    "node_modules/axios/lib/helpers/normalizeURLForProtocolCheck.js"() {
      "use strict";
      urlParserControlCharacters = /[\t\n\r]/g;
    }
  });

  // node_modules/axios/lib/helpers/parseProtocol.js
  function parseProtocol(url) {
    const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
    return match && match[1] || "";
  }
  var init_parseProtocol = __esm({
    "node_modules/axios/lib/helpers/parseProtocol.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/helpers/speedometer.js
  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    const bytes = new Array(samplesCount);
    const timestamps = new Array(samplesCount);
    let head = 0;
    let tail = 0;
    let firstSampleTS;
    min = min !== void 0 ? min : 1e3;
    return function push(chunkLength) {
      const now = Date.now();
      const startedAt = timestamps[tail];
      if (!firstSampleTS) {
        firstSampleTS = now;
      }
      bytes[head] = chunkLength;
      timestamps[head] = now;
      let i = tail;
      let bytesCount = 0;
      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }
      head = (head + 1) % samplesCount;
      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }
      if (now - firstSampleTS < min) {
        return;
      }
      const passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
    };
  }
  var speedometer_default;
  var init_speedometer = __esm({
    "node_modules/axios/lib/helpers/speedometer.js"() {
      "use strict";
      speedometer_default = speedometer;
    }
  });

  // node_modules/axios/lib/helpers/throttle.js
  function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1e3 / freq;
    let lastArgs;
    let timer;
    const invoke = (args, now = Date.now()) => {
      timestamp = now;
      lastArgs = null;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn(...args);
    };
    const throttled = (...args) => {
      const now = Date.now();
      const passed = now - timestamp;
      if (passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };
    const flush = () => lastArgs && invoke(lastArgs);
    const flushWith = (...args) => invoke(args);
    return [throttled, flush, flushWith];
  }
  var throttle_default;
  var init_throttle = __esm({
    "node_modules/axios/lib/helpers/throttle.js"() {
      throttle_default = throttle;
    }
  });

  // node_modules/axios/lib/helpers/progressEventReducer.js
  var progressEventReducer, progressEventDecorator, asyncDecorator;
  var init_progressEventReducer = __esm({
    "node_modules/axios/lib/helpers/progressEventReducer.js"() {
      init_speedometer();
      init_throttle();
      init_utils();
      progressEventReducer = (listener, isDownloadStream, freq = 3) => {
        let bytesNotified = 0;
        const _speedometer = speedometer_default(50, 250);
        return throttle_default((e) => {
          if (!e || !utils_default.isNumber(e.loaded)) {
            return;
          }
          const rawLoaded = e.loaded;
          const total = e.lengthComputable ? e.total : void 0;
          const loaded = Math.max(0, total != null ? Math.min(rawLoaded, total) : rawLoaded);
          const progressBytes = Math.max(0, loaded - bytesNotified);
          const rate = _speedometer(progressBytes);
          bytesNotified = Math.max(bytesNotified, loaded);
          const data = {
            loaded,
            total,
            progress: total ? loaded / total : void 0,
            bytes: progressBytes,
            rate: rate ? rate : void 0,
            estimated: rate && total ? (total - loaded) / rate : void 0,
            event: e,
            lengthComputable: total != null,
            [isDownloadStream ? "download" : "upload"]: true
          };
          listener(data);
        }, freq);
      };
      progressEventDecorator = (total, throttled) => {
        const lengthComputable = total != null;
        return [
          (loaded) => throttled[0]({
            lengthComputable,
            total,
            loaded
          }),
          throttled[1]
        ];
      };
      asyncDecorator = (fn, scheduler = utils_default.asap) => (...args) => scheduler(() => fn(...args));
    }
  });

  // node_modules/axios/lib/helpers/isURLSameOrigin.js
  var isURLSameOrigin_default;
  var init_isURLSameOrigin = __esm({
    "node_modules/axios/lib/helpers/isURLSameOrigin.js"() {
      init_platform();
      isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
        url = new URL(url, platform_default.origin);
        return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
      })(
        new URL(platform_default.origin),
        platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)
      ) : () => true;
    }
  });

  // node_modules/axios/lib/helpers/cookies.js
  var cookies_default;
  var init_cookies = __esm({
    "node_modules/axios/lib/helpers/cookies.js"() {
      init_utils();
      init_platform();
      cookies_default = platform_default.hasStandardBrowserEnv ? (
        // Standard browser envs support document.cookie
        {
          write(name, value, expires, path, domain, secure, sameSite) {
            if (typeof document === "undefined") return;
            const cookie = [`${name}=${encodeURIComponent(value)}`];
            if (utils_default.isNumber(expires)) {
              cookie.push(`expires=${new Date(expires).toUTCString()}`);
            }
            if (utils_default.isString(path)) {
              cookie.push(`path=${path}`);
            }
            if (utils_default.isString(domain)) {
              cookie.push(`domain=${domain}`);
            }
            if (secure === true) {
              cookie.push("secure");
            }
            if (utils_default.isString(sameSite)) {
              cookie.push(`SameSite=${sameSite}`);
            }
            document.cookie = cookie.join("; ");
          },
          read(name) {
            if (typeof document === "undefined") return null;
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].replace(/^\s+/, "");
              const eq = cookie.indexOf("=");
              if (eq !== -1 && cookie.slice(0, eq) === name) {
                try {
                  return decodeURIComponent(cookie.slice(eq + 1));
                } catch (e) {
                  return cookie.slice(eq + 1);
                }
              }
            }
            return null;
          },
          remove(name) {
            this.write(name, "", Date.now() - 864e5, "/");
          }
        }
      ) : (
        // Non-standard browser env (web workers, react-native) lack needed support.
        {
          write() {
          },
          read() {
            return null;
          },
          remove() {
          }
        }
      );
    }
  });

  // node_modules/axios/lib/helpers/isAbsoluteURL.js
  function isAbsoluteURL(url) {
    if (typeof url !== "string") {
      return false;
    }
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
  }
  var init_isAbsoluteURL = __esm({
    "node_modules/axios/lib/helpers/isAbsoluteURL.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/helpers/combineURLs.js
  function combineURLs(baseURL, relativeURL) {
    if (!relativeURL) {
      return baseURL;
    }
    let end = baseURL.length;
    while (end > 0 && baseURL.charCodeAt(end - 1) === 47) {
      end--;
    }
    return baseURL.slice(0, end) + "/" + relativeURL.replace(/^\/+/, "");
  }
  var init_combineURLs = __esm({
    "node_modules/axios/lib/helpers/combineURLs.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/core/buildFullPath.js
  function redactFragment(fragment) {
    if (!fragment) {
      return fragment;
    }
    return fragment.replace(/(^|&)([^=&]*=)?[^&]+/g, (match, separator, parameterName = "") => {
      return `${separator}${parameterName}${REDACTED}`;
    });
  }
  function redactSensitiveURLParts(url) {
    const redactedURL = url.replace(/^(https?:\/{0,2})[^/?#]*@/i, `$1${REDACTED}@`);
    const fragmentIndex = redactedURL.indexOf("#");
    const urlWithoutFragment = fragmentIndex === -1 ? redactedURL : redactedURL.slice(0, fragmentIndex);
    const redactedURLWithoutFragment = urlWithoutFragment.replace(
      /([?&][^=&#]*=)[^&#]*/g,
      `$1${REDACTED}`
    );
    if (fragmentIndex === -1) {
      return redactedURLWithoutFragment;
    }
    return `${redactedURLWithoutFragment}#${redactFragment(redactedURL.slice(fragmentIndex + 1))}`;
  }
  function assertValidHttpProtocolURL(url, config) {
    if (typeof url === "string") {
      const normalizedURL = normalizeURLForProtocolCheck(url);
      if (malformedHttpProtocol.test(normalizedURL)) {
        throw new AxiosError_default(
          `Invalid URL ${JSON.stringify(redactSensitiveURLParts(normalizedURL))}: missing "//" after protocol`,
          AxiosError_default.ERR_INVALID_URL,
          config
        );
      }
    }
  }
  function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
    assertValidHttpProtocolURL(requestedURL, config);
    let isRelativeUrl = !isAbsoluteURL(requestedURL);
    if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
      assertValidHttpProtocolURL(baseURL, config);
      return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
  }
  var malformedHttpProtocol;
  var init_buildFullPath = __esm({
    "node_modules/axios/lib/core/buildFullPath.js"() {
      "use strict";
      init_AxiosError();
      init_isAbsoluteURL();
      init_combineURLs();
      init_normalizeURLForProtocolCheck();
      malformedHttpProtocol = /^https?:(?!\/\/)/i;
    }
  });

  // node_modules/axios/lib/core/mergeConfig.js
  function mergeConfig(config1, config2) {
    config1 = config1 || {};
    config2 = config2 || {};
    const config = /* @__PURE__ */ Object.create(null);
    Object.defineProperty(config, "hasOwnProperty", {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: Object.prototype.hasOwnProperty,
      enumerable: false,
      writable: true,
      configurable: true
    });
    function getMergedValue(target, source, prop, caseless) {
      if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) {
        return utils_default.merge.call({ caseless }, target, source);
      } else if (utils_default.isPlainObject(source)) {
        return utils_default.merge({}, source);
      } else if (utils_default.isArray(source)) {
        return source.slice();
      }
      return source;
    }
    function mergeDeepProperties(a, b, prop, caseless) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(a, b, prop, caseless);
      } else if (!utils_default.isUndefined(a)) {
        return getMergedValue(void 0, a, prop, caseless);
      }
    }
    function valueFromConfig2(a, b) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(void 0, b);
      }
    }
    function defaultToConfig2(a, b) {
      if (!utils_default.isUndefined(b)) {
        return getMergedValue(void 0, b);
      } else if (!utils_default.isUndefined(a)) {
        return getMergedValue(void 0, a);
      }
    }
    function getMergedTransitionalOption(prop) {
      const transitional2 = utils_default.hasOwnProp(config2, "transitional") ? config2.transitional : void 0;
      if (!utils_default.isUndefined(transitional2)) {
        if (utils_default.isPlainObject(transitional2)) {
          if (utils_default.hasOwnProp(transitional2, prop)) {
            return transitional2[prop];
          }
        } else {
          return void 0;
        }
      }
      const transitional1 = utils_default.hasOwnProp(config1, "transitional") ? config1.transitional : void 0;
      if (utils_default.isPlainObject(transitional1) && utils_default.hasOwnProp(transitional1, prop)) {
        return transitional1[prop];
      }
      return void 0;
    }
    function mergeDirectKeys(a, b, prop) {
      if (utils_default.hasOwnProp(config2, prop)) {
        return getMergedValue(a, b);
      } else if (utils_default.hasOwnProp(config1, prop)) {
        return getMergedValue(void 0, a);
      }
    }
    const mergeMap = {
      url: valueFromConfig2,
      method: valueFromConfig2,
      data: valueFromConfig2,
      baseURL: defaultToConfig2,
      transformRequest: defaultToConfig2,
      transformResponse: defaultToConfig2,
      paramsSerializer: defaultToConfig2,
      timeout: defaultToConfig2,
      timeoutErrorMessage: defaultToConfig2,
      withCredentials: defaultToConfig2,
      withXSRFToken: defaultToConfig2,
      adapter: defaultToConfig2,
      responseType: defaultToConfig2,
      xsrfCookieName: defaultToConfig2,
      xsrfHeaderName: defaultToConfig2,
      onUploadProgress: defaultToConfig2,
      onDownloadProgress: defaultToConfig2,
      decompress: defaultToConfig2,
      maxContentLength: defaultToConfig2,
      maxBodyLength: defaultToConfig2,
      beforeRedirect: defaultToConfig2,
      transport: defaultToConfig2,
      httpAgent: defaultToConfig2,
      httpsAgent: defaultToConfig2,
      cancelToken: defaultToConfig2,
      socketPath: defaultToConfig2,
      allowedSocketPaths: defaultToConfig2,
      responseEncoding: defaultToConfig2,
      validateStatus: mergeDirectKeys,
      headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
    };
    utils_default.forEach(ownEnumerableKeys({ ...config1, ...config2 }), function computeConfigValue(prop) {
      if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
      const merge2 = utils_default.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
      const a = utils_default.hasOwnProp(config1, prop) ? config1[prop] : void 0;
      const b = utils_default.hasOwnProp(config2, prop) ? config2[prop] : void 0;
      const configValue = merge2(a, b, prop);
      utils_default.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
    });
    if (utils_default.hasOwnProp(config2, "validateStatus") && utils_default.isUndefined(config2.validateStatus) && getMergedTransitionalOption("validateStatusUndefinedResolves") === false) {
      if (utils_default.hasOwnProp(config1, "validateStatus")) {
        config.validateStatus = getMergedValue(void 0, config1.validateStatus);
      } else {
        delete config.validateStatus;
      }
    }
    return config;
  }
  var headersToObject, ownEnumerableKeys;
  var init_mergeConfig = __esm({
    "node_modules/axios/lib/core/mergeConfig.js"() {
      "use strict";
      init_utils();
      init_AxiosHeaders();
      headersToObject = (thing) => thing instanceof AxiosHeaders_default ? { ...thing } : thing;
      ownEnumerableKeys = (thing) => {
        if (Object.getOwnPropertySymbols && Object.getOwnPropertyDescriptor) {
          return Object.keys(thing).concat(
            Object.getOwnPropertySymbols(thing).filter(
              (symbol) => Object.getOwnPropertyDescriptor(thing, symbol).enumerable
            )
          );
        }
        return Object.keys(thing);
      };
    }
  });

  // node_modules/axios/lib/core/setFormDataHeaders.js
  function setFormDataHeaders(headers, formHeaders, policy) {
    if (policy !== "content-only") {
      headers.set(formHeaders);
      return;
    }
    Object.entries(formHeaders || {}).forEach(([key, val]) => {
      if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) {
        headers.set(key, val);
      }
    });
  }
  var FORM_DATA_CONTENT_HEADERS;
  var init_setFormDataHeaders = __esm({
    "node_modules/axios/lib/core/setFormDataHeaders.js"() {
      "use strict";
      FORM_DATA_CONTENT_HEADERS = ["content-type", "content-length"];
    }
  });

  // node_modules/axios/lib/helpers/resolveConfig.js
  function resolveConfig(config) {
    const newConfig = mergeConfig({}, config);
    const own2 = (key) => utils_default.hasOwnProp(newConfig, key) ? newConfig[key] : void 0;
    const data = own2("data");
    let withXSRFToken = own2("withXSRFToken");
    const xsrfHeaderName = own2("xsrfHeaderName");
    const xsrfCookieName = own2("xsrfCookieName");
    let headers = own2("headers");
    const auth = own2("auth");
    const baseURL = own2("baseURL");
    const allowAbsoluteUrls = own2("allowAbsoluteUrls");
    const url = own2("url");
    newConfig.headers = headers = AxiosHeaders_default.from(headers);
    newConfig.url = buildURL(
      buildFullPath(baseURL, url, allowAbsoluteUrls, newConfig),
      own2("params"),
      own2("paramsSerializer")
    );
    if (auth) {
      const username = utils_default.getSafeProp(auth, "username") || "";
      const password = utils_default.getSafeProp(auth, "password") || "";
      try {
        headers.set(
          "Authorization",
          "Basic " + btoa(username + ":" + (password ? encodeUTF8(password) : ""))
        );
      } catch (e) {
        throw AxiosError_default.from(e, AxiosError_default.ERR_BAD_OPTION_VALUE, config);
      }
    }
    if (utils_default.isFormData(data)) {
      const getHeaders = utils_default.getSafeProp(data, "getHeaders");
      if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv || utils_default.isReactNative(data)) {
        headers.setContentType(void 0);
      } else if (utils_default.isFunction(getHeaders)) {
        setFormDataHeaders(headers, getHeaders.call(data), own2("formDataHeaderPolicy"));
      }
    }
    if (platform_default.hasStandardBrowserEnv) {
      if (utils_default.isFunction(withXSRFToken)) {
        withXSRFToken = withXSRFToken(newConfig);
      }
      const shouldSendXSRF = withXSRFToken === true || withXSRFToken == null && isURLSameOrigin_default(newConfig.url);
      if (shouldSendXSRF) {
        const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
        if (xsrfValue) {
          headers.set(xsrfHeaderName, xsrfValue);
        }
      }
    }
    return newConfig;
  }
  var encodeUTF8, resolveConfig_default;
  var init_resolveConfig = __esm({
    "node_modules/axios/lib/helpers/resolveConfig.js"() {
      init_platform();
      init_utils();
      init_AxiosError();
      init_isURLSameOrigin();
      init_cookies();
      init_buildFullPath();
      init_mergeConfig();
      init_AxiosHeaders();
      init_setFormDataHeaders();
      init_buildURL();
      encodeUTF8 = (str) => encodeURIComponent(str).replace(
        /%([0-9A-F]{2})/gi,
        (_, hex) => String.fromCharCode(parseInt(hex, 16))
      );
      resolveConfig_default = resolveConfig;
    }
  });

  // node_modules/axios/lib/adapters/xhr.js
  var isXHRAdapterSupported, xhr_default;
  var init_xhr = __esm({
    "node_modules/axios/lib/adapters/xhr.js"() {
      init_utils();
      init_settle();
      init_transitional();
      init_AxiosError();
      init_CanceledError();
      init_normalizeURLForProtocolCheck();
      init_parseProtocol();
      init_platform();
      init_AxiosHeaders();
      init_progressEventReducer();
      init_resolveConfig();
      init_sanitizeHeaderValue();
      isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
      xhr_default = isXHRAdapterSupported && function(config) {
        return new Promise(function dispatchXhrRequest(resolve, reject) {
          const _config = resolveConfig_default(config);
          let requestData = _config.data;
          const requestHeaders = AxiosHeaders_default.from(_config.headers).normalize();
          let { responseType, onUploadProgress, onDownloadProgress } = _config;
          let onCanceled;
          let uploadThrottled, downloadThrottled;
          let flushUpload, flushDownload, flushDownloadWithEvent;
          function done() {
            flushUpload && flushUpload();
            flushDownload && flushDownload();
            _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
            _config.signal && _config.signal.removeEventListener("abort", onCanceled);
          }
          let request = new XMLHttpRequest();
          request.open(_config.method.toUpperCase(), _config.url, true);
          request.timeout = _config.timeout;
          function onloadend(event) {
            if (!request) {
              return;
            }
            if (request.status === 0 && (parseProtocol(normalizeURLForProtocolCheck(_config.url)) || parseProtocol(platform_default.origin)) !== "file" && !(request.responseURL && request.responseURL.startsWith("file:"))) {
              reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
              done();
              request = null;
              return;
            }
            try {
              if (event) {
                flushDownloadWithEvent && flushDownloadWithEvent(event);
              } else {
                flushDownload && flushDownload();
              }
            } catch (err) {
              setTimeout(() => {
                throw err;
              });
            }
            if (!request) {
              return;
            }
            const responseHeaders = AxiosHeaders_default.from(
              "getAllResponseHeaders" in request && request.getAllResponseHeaders()
            );
            const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
            const response = {
              data: responseData,
              status: request.status,
              statusText: request.statusText,
              headers: responseHeaders,
              config,
              request
            };
            settle(
              function _resolve(value) {
                resolve(value);
                done();
              },
              function _reject(err) {
                reject(err);
                done();
              },
              response
            );
            request = null;
          }
          if ("onloadend" in request) {
            request.onloadend = onloadend;
          } else {
            request.onreadystatechange = function handleLoad() {
              if (!request || request.readyState !== 4) {
                return;
              }
              if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith("file:"))) {
                return;
              }
              setTimeout(onloadend);
            };
          }
          request.onabort = function handleAbort() {
            if (!request) {
              return;
            }
            reject(new AxiosError_default("Request aborted", AxiosError_default.ECONNABORTED, config, request));
            done();
            request = null;
          };
          request.onerror = function handleError(event) {
            const msg = event && event.message ? event.message : "Network Error";
            const err = new AxiosError_default(msg, AxiosError_default.ERR_NETWORK, config, request);
            err.event = event || null;
            reject(err);
            done();
            request = null;
          };
          request.ontimeout = function handleTimeout() {
            let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
            const transitional2 = _config.transitional || transitional_default;
            if (_config.timeoutErrorMessage) {
              timeoutErrorMessage = _config.timeoutErrorMessage;
            }
            reject(
              new AxiosError_default(
                timeoutErrorMessage,
                transitional2.clarifyTimeoutError ? AxiosError_default.ETIMEDOUT : AxiosError_default.ECONNABORTED,
                config,
                request
              )
            );
            done();
            request = null;
          };
          requestData === void 0 && requestHeaders.setContentType(null);
          if ("setRequestHeader" in request) {
            utils_default.forEach(toByteStringHeaderObject(requestHeaders), function setRequestHeader(val, key) {
              request.setRequestHeader(key, val);
            });
          }
          if (!utils_default.isUndefined(_config.withCredentials)) {
            request.withCredentials = !!_config.withCredentials;
          }
          if (responseType && responseType !== "json") {
            request.responseType = _config.responseType;
          }
          if (onDownloadProgress) {
            [downloadThrottled, flushDownload, flushDownloadWithEvent] = progressEventReducer(
              onDownloadProgress,
              true
            );
            request.addEventListener("progress", downloadThrottled);
          }
          if (onUploadProgress && request.upload) {
            [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
            request.upload.addEventListener("progress", uploadThrottled);
            request.upload.addEventListener("loadend", flushUpload);
          }
          if (_config.cancelToken || _config.signal) {
            onCanceled = (cancel) => {
              if (!request) {
                return;
              }
              reject(!cancel || cancel.type ? new CanceledError_default(null, config, request) : cancel);
              request.abort();
              done();
              request = null;
            };
            _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
            if (_config.signal) {
              _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
            }
          }
          const protocol = parseProtocol(_config.url);
          if (protocol && !platform_default.protocols.includes(protocol)) {
            reject(
              new AxiosError_default(
                "Unsupported protocol " + protocol + ":",
                AxiosError_default.ERR_BAD_REQUEST,
                config
              )
            );
            done();
            return;
          }
          request.send(requestData || null);
        });
      };
    }
  });

  // node_modules/axios/lib/helpers/composeSignals.js
  var composeSignals, composeSignals_default;
  var init_composeSignals = __esm({
    "node_modules/axios/lib/helpers/composeSignals.js"() {
      init_CanceledError();
      init_AxiosError();
      init_utils();
      composeSignals = (signals, timeout) => {
        signals = signals ? signals.filter(Boolean) : [];
        if (!timeout && !signals.length) {
          return;
        }
        const controller = new AbortController();
        let aborted = false;
        const onabort = function(reason) {
          if (!aborted) {
            aborted = true;
            unsubscribe();
            const err = reason instanceof Error ? reason : this.reason;
            controller.abort(
              err instanceof AxiosError_default ? err : new CanceledError_default(err instanceof Error ? err.message : err)
            );
          }
        };
        let timer = timeout && setTimeout(() => {
          timer = null;
          onabort(new AxiosError_default(`timeout of ${timeout}ms exceeded`, AxiosError_default.ETIMEDOUT));
        }, timeout);
        const unsubscribe = () => {
          if (!signals) {
            return;
          }
          timer && clearTimeout(timer);
          timer = null;
          signals.forEach((signal2) => {
            signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
          });
          signals = null;
        };
        signals.forEach((signal2) => {
          if (aborted) {
            return;
          }
          if (signal2.aborted) {
            onabort.call(signal2);
            return;
          }
          signal2.addEventListener("abort", onabort, { once: true });
        });
        const { signal } = controller;
        signal.unsubscribe = () => utils_default.asap(unsubscribe);
        return signal;
      };
      composeSignals_default = composeSignals;
    }
  });

  // node_modules/axios/lib/helpers/trackStream.js
  var streamChunk, readBytes, readStream, trackStream;
  var init_trackStream = __esm({
    "node_modules/axios/lib/helpers/trackStream.js"() {
      streamChunk = function* (chunk, chunkSize) {
        let len = chunk.byteLength;
        if (!chunkSize || len < chunkSize) {
          yield chunk;
          return;
        }
        let pos = 0;
        let end;
        while (pos < len) {
          end = pos + chunkSize;
          yield chunk.slice(pos, end);
          pos = end;
        }
      };
      readBytes = async function* (iterable, chunkSize) {
        for await (const chunk of readStream(iterable)) {
          yield* streamChunk(chunk, chunkSize);
        }
      };
      readStream = async function* (stream) {
        if (stream[Symbol.asyncIterator]) {
          yield* stream;
          return;
        }
        const reader = stream.getReader();
        try {
          for (; ; ) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            yield value;
          }
        } finally {
          await reader.cancel();
        }
      };
      trackStream = (stream, chunkSize, onProgress, onFinish) => {
        const iterator3 = readBytes(stream, chunkSize);
        let bytes = 0;
        let done;
        let _onFinish = (e) => {
          if (!done) {
            done = true;
            onFinish && onFinish(e);
          }
        };
        return new ReadableStream(
          {
            async pull(controller) {
              try {
                const { done: done2, value } = await iterator3.next();
                if (done2) {
                  _onFinish();
                  controller.close();
                  return;
                }
                let len = value.byteLength;
                if (onProgress) {
                  let loadedBytes = bytes += len;
                  onProgress(loadedBytes);
                }
                controller.enqueue(new Uint8Array(value));
              } catch (err) {
                _onFinish(err);
                throw err;
              }
            },
            cancel(reason) {
              _onFinish(reason);
              return iterator3.return();
            }
          },
          {
            highWaterMark: 2
          }
        );
      };
    }
  });

  // node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js
  function estimateDataURLDecodedBytes(url) {
    const fragmentIndex = typeof url === "string" ? url.indexOf("#") : -1;
    return estimateDataURLBytes(
      fragmentIndex === -1 ? url : url.slice(0, fragmentIndex),
      estimatePercentDecodedBase64Bytes
    );
  }
  var isHexDigit, isPercentEncodedByte, hexValue, isBase64Char, isBase64Whitespace, base64Bytes, estimateBase64BufferAllocation, estimatePercentDecodedBase64Bytes, estimateDataURLBytes;
  var init_estimateDataURLDecodedBytes = __esm({
    "node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js"() {
      isHexDigit = (charCode) => charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 70 || charCode >= 97 && charCode <= 102;
      isPercentEncodedByte = (str, i, len) => i + 2 < len && isHexDigit(str.charCodeAt(i + 1)) && isHexDigit(str.charCodeAt(i + 2));
      hexValue = (charCode) => charCode <= 57 ? charCode - 48 : (charCode & 223) - 55;
      isBase64Char = (charCode) => charCode >= 65 && charCode <= 90 || // A-Z
      charCode >= 97 && charCode <= 122 || // a-z
      charCode >= 48 && charCode <= 57 || // 0-9
      charCode === 43 || // +
      charCode === 47 || // /
      charCode === 45 || // - (base64url)
      charCode === 95;
      isBase64Whitespace = (charCode) => charCode === 9 || charCode === 10 || charCode === 12 || charCode === 13 || charCode === 32;
      base64Bytes = (significant) => {
        const groups = Math.floor(significant / 4);
        const remainder = significant % 4;
        return groups * 3 + (remainder === 2 ? 1 : remainder === 3 ? 2 : 0);
      };
      estimateBase64BufferAllocation = (body) => {
        const len = body.length;
        let padding = 0;
        if (len > 0 && body.charCodeAt(len - 1) === 61) {
          padding++;
          if (len > 1 && body.charCodeAt(len - 2) === 61) {
            padding++;
          }
        }
        return Math.floor((len - padding) * 3 / 4);
      };
      estimatePercentDecodedBase64Bytes = (body) => {
        const len = body.length;
        let significant = 0;
        let padding = 0;
        let invalid = false;
        for (let i = 0; i < len; i++) {
          let code = body.charCodeAt(i);
          if (code === 37 && isPercentEncodedByte(body, i, len)) {
            code = hexValue(body.charCodeAt(i + 1)) * 16 + hexValue(body.charCodeAt(i + 2));
            i += 2;
          }
          if (isBase64Whitespace(code)) {
            continue;
          }
          if (code === 61) {
            padding++;
            continue;
          }
          if (!isBase64Char(code) || padding > 0) {
            invalid = true;
            continue;
          }
          significant++;
        }
        if (invalid || padding > 2 || padding > 0 && (significant + padding) % 4 !== 0 || significant % 4 === 1) {
          return estimateBase64BufferAllocation(body);
        }
        return base64Bytes(significant);
      };
      estimateDataURLBytes = (url, estimateBase64) => {
        if (!url || typeof url !== "string") return 0;
        if (!url.startsWith("data:")) return 0;
        const comma = url.indexOf(",");
        if (comma < 0) return 0;
        const meta = url.slice(5, comma);
        const body = url.slice(comma + 1);
        const isBase64 = /;base64/i.test(meta);
        if (isBase64) {
          return estimateBase64(body);
        }
        let bytes = 0;
        for (let i = 0, len = body.length; i < len; i++) {
          const c = body.charCodeAt(i);
          if (c === 37 && isPercentEncodedByte(body, i, len)) {
            bytes += 1;
            i += 2;
          } else if (c < 128) {
            bytes += 1;
          } else if (c < 2048) {
            bytes += 2;
          } else if (c >= 55296 && c <= 56319 && i + 1 < len) {
            const next = body.charCodeAt(i + 1);
            if (next >= 56320 && next <= 57343) {
              bytes += 4;
              i++;
            } else {
              bytes += 3;
            }
          } else {
            bytes += 3;
          }
        }
        return bytes;
      };
    }
  });

  // node_modules/axios/lib/env/data.js
  var VERSION;
  var init_data = __esm({
    "node_modules/axios/lib/env/data.js"() {
      VERSION = "1.20.0";
    }
  });

  // node_modules/axios/lib/adapters/fetch.js
  var DEFAULT_CHUNK_SIZE, DEFAULT_REQUEST_OPTIONS, isFunction2, encodeUTF82, decodeURIComponentSafe, test, maybeWithAuthCredentials, factory, seedCache, getFetch, adapter;
  var init_fetch = __esm({
    "node_modules/axios/lib/adapters/fetch.js"() {
      init_platform();
      init_utils();
      init_AxiosError();
      init_composeSignals();
      init_trackStream();
      init_AxiosHeaders();
      init_progressEventReducer();
      init_resolveConfig();
      init_settle();
      init_estimateDataURLDecodedBytes();
      init_data();
      init_sanitizeHeaderValue();
      DEFAULT_CHUNK_SIZE = 64 * 1024;
      DEFAULT_REQUEST_OPTIONS = {
        cache: "default",
        redirect: "follow",
        referrer: "about:client",
        referrerPolicy: "",
        mode: "cors",
        integrity: "",
        keepalive: false,
        priority: "auto",
        window: null
      };
      ({ isFunction: isFunction2 } = utils_default);
      encodeUTF82 = (str) => encodeURIComponent(str).replace(
        /%([0-9A-F]{2})/gi,
        (_, hex) => String.fromCharCode(parseInt(hex, 16))
      );
      decodeURIComponentSafe = (value) => {
        if (!utils_default.isString(value)) {
          return value;
        }
        try {
          return decodeURIComponent(value);
        } catch (error) {
          return value;
        }
      };
      test = (fn, ...args) => {
        try {
          return !!fn(...args);
        } catch (e) {
          return false;
        }
      };
      maybeWithAuthCredentials = (url) => {
        const protocolIndex = url.indexOf("://");
        let urlToCheck = url;
        if (protocolIndex !== -1) {
          urlToCheck = urlToCheck.slice(protocolIndex + 3);
        }
        return urlToCheck.includes("@") || urlToCheck.includes(":");
      };
      factory = (env) => {
        const globalObject = utils_default.global !== void 0 && utils_default.global !== null ? utils_default.global : globalThis;
        const { ReadableStream: ReadableStream2, TextEncoder } = globalObject;
        env = utils_default.merge.call(
          {
            skipUndefined: true
          },
          {
            Request: globalObject.Request,
            Response: globalObject.Response
          },
          env
        );
        const { fetch: envFetch, Request, Response } = env;
        const isFetchSupported = envFetch ? isFunction2(envFetch) : typeof fetch === "function";
        const isRequestSupported = isFunction2(Request);
        const isResponseSupported = isFunction2(Response);
        if (!isFetchSupported) {
          return false;
        }
        const isReadableStreamSupported = isFetchSupported && isFunction2(ReadableStream2);
        const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
        const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
          let duplexAccessed = false;
          const request = new Request(platform_default.origin, {
            body: new ReadableStream2(),
            method: "POST",
            get duplex() {
              duplexAccessed = true;
              return "half";
            }
          });
          const hasContentType = request.headers.has("Content-Type");
          if (request.body != null) {
            request.body.cancel();
          }
          return duplexAccessed && !hasContentType;
        });
        const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
        const resolvers = {
          stream: supportsResponseStream && ((res) => res.body)
        };
        isFetchSupported && (() => {
          ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
            !resolvers[type] && (resolvers[type] = (res, config) => {
              let method = res && res[type];
              if (method) {
                return method.call(res);
              }
              throw new AxiosError_default(
                `Response type '${type}' is not supported`,
                AxiosError_default.ERR_NOT_SUPPORT,
                config
              );
            });
          });
        })();
        const getBodyLength = async (body) => {
          if (body == null) {
            return 0;
          }
          if (utils_default.isBlob(body)) {
            return body.size;
          }
          if (utils_default.isSpecCompliantForm(body)) {
            const _request = new Request(platform_default.origin, {
              method: "POST",
              body
            });
            return (await _request.arrayBuffer()).byteLength;
          }
          if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) {
            return body.byteLength;
          }
          if (utils_default.isURLSearchParams(body)) {
            body = body + "";
          }
          if (utils_default.isString(body)) {
            return (await encodeText(body)).byteLength;
          }
        };
        const resolveBodyLength = async (headers, body) => {
          const length = utils_default.toFiniteNumber(headers.getContentLength());
          return length == null ? getBodyLength(body) : length;
        };
        return async (config) => {
          let {
            url,
            method,
            data,
            signal,
            cancelToken,
            timeout,
            onDownloadProgress,
            onUploadProgress,
            responseType,
            headers,
            withCredentials = "same-origin",
            fetchOptions,
            maxContentLength,
            maxBodyLength,
            maxRedirects
          } = resolveConfig_default(config);
          const hasMaxContentLength = utils_default.isNumber(maxContentLength) && maxContentLength > -1;
          const hasMaxBodyLength = utils_default.isNumber(maxBodyLength) && maxBodyLength > -1;
          const own2 = (key) => utils_default.hasOwnProp(config, key) ? config[key] : void 0;
          let _fetch = envFetch || fetch;
          responseType = responseType ? (responseType + "").toLowerCase() : "text";
          let composedSignal = composeSignals_default(
            [signal, cancelToken && cancelToken.toAbortSignal()],
            timeout
          );
          let request = null;
          const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
            composedSignal.unsubscribe();
          });
          let requestContentLength;
          let pendingBodyError = null;
          const maxBodyLengthError = () => new AxiosError_default(
            "Request body larger than maxBodyLength limit",
            AxiosError_default.ERR_BAD_REQUEST,
            config,
            request
          );
          try {
            let auth = void 0;
            const configAuth = own2("auth");
            if (configAuth) {
              const username = utils_default.getSafeProp(configAuth, "username") || "";
              const password = utils_default.getSafeProp(configAuth, "password") || "";
              auth = {
                username,
                password
              };
            }
            if (maybeWithAuthCredentials(url)) {
              const parsedURL = new URL(url, platform_default.origin);
              if (!auth && (parsedURL.username || parsedURL.password)) {
                const urlUsername = decodeURIComponentSafe(parsedURL.username);
                const urlPassword = decodeURIComponentSafe(parsedURL.password);
                auth = {
                  username: urlUsername,
                  password: urlPassword
                };
              }
              if (parsedURL.username || parsedURL.password) {
                parsedURL.username = "";
                parsedURL.password = "";
                url = parsedURL.href;
              }
            }
            if (auth) {
              headers.delete("authorization");
              headers.set(
                "Authorization",
                "Basic " + btoa(encodeUTF82((auth.username || "") + ":" + (auth.password || "")))
              );
            }
            if (hasMaxContentLength && typeof url === "string" && url.startsWith("data:")) {
              const estimated = estimateDataURLDecodedBytes(url);
              if (estimated > maxContentLength) {
                throw new AxiosError_default(
                  "maxContentLength size of " + maxContentLength + " exceeded",
                  AxiosError_default.ERR_BAD_RESPONSE,
                  config,
                  request
                );
              }
            }
            if (hasMaxBodyLength && method !== "get" && method !== "head") {
              const outboundLength = await getBodyLength(data);
              if (typeof outboundLength === "number" && isFinite(outboundLength)) {
                requestContentLength = outboundLength;
                if (outboundLength > maxBodyLength) {
                  throw maxBodyLengthError();
                }
              }
            }
            const mustEnforceStreamBody = hasMaxBodyLength && (utils_default.isReadableStream(data) || utils_default.isStream(data));
            const trackRequestStream = (stream, onProgress, flush) => trackStream(
              stream,
              DEFAULT_CHUNK_SIZE,
              (loadedBytes) => {
                if (hasMaxBodyLength && loadedBytes > maxBodyLength) {
                  throw pendingBodyError = maxBodyLengthError();
                }
                onProgress && onProgress(loadedBytes);
              },
              flush
            );
            if (supportsRequestStream && method !== "get" && method !== "head" && (onUploadProgress || mustEnforceStreamBody)) {
              requestContentLength = requestContentLength == null ? await resolveBodyLength(headers, data) : requestContentLength;
              if (requestContentLength !== 0 || mustEnforceStreamBody) {
                let _request = new Request(url, {
                  method: "POST",
                  body: data,
                  duplex: "half"
                });
                let contentTypeHeader;
                if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
                  headers.setContentType(contentTypeHeader);
                }
                if (_request.body) {
                  const [onProgress, flush] = onUploadProgress && progressEventDecorator(
                    requestContentLength,
                    progressEventReducer(asyncDecorator(onUploadProgress))
                  ) || [];
                  data = trackRequestStream(_request.body, onProgress, flush);
                }
              }
            } else if (mustEnforceStreamBody && !isRequestSupported && isReadableStreamSupported && method !== "get" && method !== "head") {
              data = trackRequestStream(data);
            } else if (mustEnforceStreamBody && isRequestSupported && !supportsRequestStream && method !== "get" && method !== "head") {
              throw new AxiosError_default(
                "Stream request bodies are not supported by the current fetch implementation",
                AxiosError_default.ERR_NOT_SUPPORT,
                config,
                request
              );
            }
            if (!utils_default.isString(withCredentials)) {
              withCredentials = withCredentials ? "include" : "omit";
            }
            const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
            if (utils_default.isFormData(data)) {
              const contentType = headers.getContentType();
              if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) {
                headers.delete("content-type");
              }
            }
            headers.set("User-Agent", "axios/" + VERSION, false);
            const safeFetchOptions = fetchOptions == null ? fetchOptions : Object.assign(/* @__PURE__ */ Object.create(null), fetchOptions);
            if (safeFetchOptions) {
              delete safeFetchOptions.body;
              delete safeFetchOptions.headers;
              delete safeFetchOptions.method;
              delete safeFetchOptions.signal;
              delete safeFetchOptions.duplex;
              delete safeFetchOptions.credentials;
            }
            const resolvedOptions = Object.assign(/* @__PURE__ */ Object.create(null), safeFetchOptions, {
              signal: composedSignal,
              method: method.toUpperCase(),
              headers: toByteStringHeaderObject(headers.normalize()),
              body: data,
              duplex: "half",
              credentials: isCredentialsSupported ? withCredentials : void 0
            });
            if (isRequestSupported) {
              utils_default.forEach(DEFAULT_REQUEST_OPTIONS, (value, key) => {
                if (resolvedOptions[key] === void 0) {
                  resolvedOptions[key] = value;
                }
              });
              if (resolvedOptions.signal === void 0) {
                resolvedOptions.signal = null;
              }
              if (resolvedOptions.body === void 0) {
                resolvedOptions.body = null;
              }
            }
            if (maxRedirects === 0) {
              resolvedOptions.redirect = "manual";
              if (safeFetchOptions) {
                safeFetchOptions.redirect = "manual";
              }
            }
            request = isRequestSupported && new Request(url, resolvedOptions);
            let response = await (isRequestSupported ? _fetch(request, safeFetchOptions) : _fetch(url, resolvedOptions));
            const responseHeaders = AxiosHeaders_default.from(response.headers);
            if (hasMaxContentLength) {
              const declaredLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
              if (declaredLength != null && declaredLength > maxContentLength) {
                throw new AxiosError_default(
                  "maxContentLength size of " + maxContentLength + " exceeded",
                  AxiosError_default.ERR_BAD_RESPONSE,
                  config,
                  request
                );
              }
            }
            const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
            if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe)) {
              const options = {};
              ["status", "statusText", "headers"].forEach((prop) => {
                options[prop] = response[prop];
              });
              const responseContentLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
              const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
                responseContentLength,
                progressEventReducer(asyncDecorator(onDownloadProgress), true)
              ) || [];
              let bytesRead = 0;
              const onChunkProgress = (loadedBytes) => {
                if (hasMaxContentLength) {
                  bytesRead = loadedBytes;
                  if (bytesRead > maxContentLength) {
                    throw new AxiosError_default(
                      "maxContentLength size of " + maxContentLength + " exceeded",
                      AxiosError_default.ERR_BAD_RESPONSE,
                      config,
                      request
                    );
                  }
                }
                onProgress && onProgress(loadedBytes);
              };
              response = new Response(
                trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
                  flush && flush();
                  unsubscribe && unsubscribe();
                }),
                options
              );
            }
            responseType = responseType || "text";
            let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](
              response,
              config
            );
            if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
              let materializedSize;
              if (responseData != null) {
                if (typeof responseData.byteLength === "number") {
                  materializedSize = responseData.byteLength;
                } else if (typeof responseData.size === "number") {
                  materializedSize = responseData.size;
                } else if (typeof responseData === "string") {
                  materializedSize = typeof TextEncoder === "function" ? new TextEncoder().encode(responseData).byteLength : responseData.length;
                }
              }
              if (typeof materializedSize === "number" && materializedSize > maxContentLength) {
                throw new AxiosError_default(
                  "maxContentLength size of " + maxContentLength + " exceeded",
                  AxiosError_default.ERR_BAD_RESPONSE,
                  config,
                  request
                );
              }
            }
            !isStreamResponse && unsubscribe && unsubscribe();
            return await new Promise((resolve, reject) => {
              settle(resolve, reject, {
                data: responseData,
                headers: AxiosHeaders_default.from(response.headers),
                status: response.status,
                statusText: response.statusText,
                config,
                request
              });
            });
          } catch (err) {
            unsubscribe && unsubscribe();
            if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof AxiosError_default) {
              const canceledError = composedSignal.reason;
              canceledError.config = config;
              request && (canceledError.request = request);
              if (err !== canceledError) {
                Object.defineProperty(canceledError, "cause", {
                  __proto__: null,
                  value: err,
                  writable: true,
                  enumerable: false,
                  configurable: true
                });
              }
              throw canceledError;
            }
            if (pendingBodyError) {
              request && !pendingBodyError.request && (pendingBodyError.request = request);
              throw pendingBodyError;
            }
            if (err instanceof AxiosError_default) {
              request && !err.request && (err.request = request);
              throw err;
            }
            if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
              const networkError = new AxiosError_default(
                "Network Error",
                AxiosError_default.ERR_NETWORK,
                config,
                request,
                err && err.response
              );
              Object.defineProperty(networkError, "cause", {
                __proto__: null,
                value: err.cause || err,
                writable: true,
                enumerable: false,
                configurable: true
              });
              throw networkError;
            }
            throw AxiosError_default.from(err, err && err.code, config, request, err && err.response);
          }
        };
      };
      seedCache = /* @__PURE__ */ new Map();
      getFetch = (config) => {
        let env = config && config.env || {};
        const { fetch: fetch2, Request, Response } = env;
        const seeds = [Request, Response, fetch2];
        let len = seeds.length, i = len, seed, target, map = seedCache;
        while (i--) {
          seed = seeds[i];
          target = map.get(seed);
          target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
          map = target;
        }
        return target;
      };
      adapter = getFetch();
    }
  });

  // node_modules/axios/lib/adapters/adapters.js
  function getAdapter(adapters, config) {
    adapters = utils_default.isArray(adapters) ? adapters : [adapters];
    const { length } = adapters;
    let nameOrAdapter;
    let adapter2;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;
      adapter2 = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter2 = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter2 === void 0) {
          throw new AxiosError_default(`Unknown adapter '${id}'`);
        }
      }
      if (adapter2 && (utils_default.isFunction(adapter2) || (adapter2 = adapter2.get(config)))) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter2;
    }
    if (!adapter2) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError_default(
        `There is no suitable adapter to dispatch the request ` + s,
        AxiosError_default.ERR_NOT_SUPPORT
      );
    }
    return adapter2;
  }
  var knownAdapters, renderReason, isResolvedHandle, adapters_default;
  var init_adapters = __esm({
    "node_modules/axios/lib/adapters/adapters.js"() {
      init_utils();
      init_null();
      init_xhr();
      init_fetch();
      init_AxiosError();
      knownAdapters = {
        http: null_default,
        xhr: xhr_default,
        fetch: {
          get: getFetch
        }
      };
      utils_default.forEach(knownAdapters, (fn, value) => {
        if (fn) {
          try {
            Object.defineProperty(fn, "name", { __proto__: null, value });
          } catch (e) {
          }
          Object.defineProperty(fn, "adapterName", { __proto__: null, value });
        }
      });
      renderReason = (reason) => `- ${reason}`;
      isResolvedHandle = (adapter2) => utils_default.isFunction(adapter2) || adapter2 === null || adapter2 === false;
      adapters_default = {
        /**
         * Resolve an adapter from a list of adapter names or functions.
         * @type {Function}
         */
        getAdapter,
        /**
         * Exposes all known adapters
         * @type {Object<string, Function|Object>}
         */
        adapters: knownAdapters
      };
    }
  });

  // node_modules/axios/lib/core/dispatchRequest.js
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
      throw new CanceledError_default(null, config);
    }
  }
  function dispatchRequest(_config) {
    const config = utils_default.toSafeFlatObject(_config);
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders_default.from(utils_default.getSafeProp(config, "headers"));
    config.data = transformData.call(config, config.transformRequest);
    if (["post", "put", "patch"].indexOf(config.method) !== -1) {
      config.headers.setContentType("application/x-www-form-urlencoded", false);
    }
    const adapter2 = adapters_default.getAdapter(config.adapter || defaults_default.adapter, config);
    return adapter2(config).then(
      function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        config.response = response;
        try {
          response.data = transformData.call(config, config.transformResponse, response);
        } finally {
          delete config.response;
        }
        response.headers = AxiosHeaders_default.from(response.headers);
        return response;
      },
      function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            config.response = reason.response;
            try {
              reason.response.data = transformData.call(
                config,
                config.transformResponse,
                reason.response
              );
            } finally {
              delete config.response;
            }
            reason.response.headers = AxiosHeaders_default.from(reason.response.headers);
          }
        }
        return Promise.reject(reason);
      }
    );
  }
  var init_dispatchRequest = __esm({
    "node_modules/axios/lib/core/dispatchRequest.js"() {
      "use strict";
      init_transformData();
      init_isCancel();
      init_defaults();
      init_CanceledError();
      init_AxiosHeaders();
      init_adapters();
      init_utils();
    }
  });

  // node_modules/axios/lib/helpers/validator.js
  function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== "object" || options === null) {
      throw new AxiosError_default("options must be an object", AxiosError_default.ERR_BAD_OPTION_VALUE);
    }
    const keys = Object.keys(options);
    let i = keys.length;
    while (i-- > 0) {
      const opt = keys[i];
      const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : void 0;
      if (validator) {
        const value = options[opt];
        const result = value === void 0 || validator(value, opt, options);
        if (result !== true) {
          throw new AxiosError_default(
            "option " + opt + " must be " + result,
            AxiosError_default.ERR_BAD_OPTION_VALUE
          );
        }
        continue;
      }
      if (allowUnknown !== true) {
        throw new AxiosError_default("Unknown option " + opt, AxiosError_default.ERR_BAD_OPTION);
      }
    }
  }
  var validators, deprecatedWarnings, validator_default;
  var init_validator = __esm({
    "node_modules/axios/lib/helpers/validator.js"() {
      "use strict";
      init_data();
      init_AxiosError();
      validators = {};
      ["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
        validators[type] = function validator(thing) {
          return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
        };
      });
      deprecatedWarnings = {};
      validators.transitional = function transitional(validator, version, message) {
        function formatMessage(opt, desc) {
          return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
        }
        return (value, opt, opts) => {
          if (validator === false) {
            throw new AxiosError_default(
              formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
              AxiosError_default.ERR_DEPRECATED
            );
          }
          if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            console.warn(
              formatMessage(
                opt,
                " has been deprecated since v" + version + " and will be removed in the near future"
              )
            );
          }
          return validator ? validator(value, opt, opts) : true;
        };
      };
      validators.spelling = function spelling(correctSpelling) {
        return (value, opt) => {
          console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
          return true;
        };
      };
      validator_default = {
        assertOptions,
        validators
      };
    }
  });

  // node_modules/axios/lib/core/Axios.js
  var validators2, Axios, Axios_default;
  var init_Axios = __esm({
    "node_modules/axios/lib/core/Axios.js"() {
      "use strict";
      init_utils();
      init_buildURL();
      init_InterceptorManager();
      init_dispatchRequest();
      init_mergeConfig();
      init_buildFullPath();
      init_methodList();
      init_validator();
      init_AxiosHeaders();
      init_transitional();
      validators2 = validator_default.validators;
      Axios = class {
        constructor(instanceConfig) {
          this.defaults = instanceConfig || {};
          this.interceptors = {
            request: new InterceptorManager_default(),
            response: new InterceptorManager_default()
          };
        }
        /**
         * Dispatch a request
         *
         * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
         * @param {?Object} config
         *
         * @returns {Promise} The Promise to be fulfilled
         */
        async request(configOrUrl, config) {
          try {
            return await this._request(configOrUrl, config);
          } catch (err) {
            if (err instanceof Error) {
              try {
                let dummy = {};
                Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
                const dummyStack = dummy.stack;
                let stack = "";
                if (typeof dummyStack === "string") {
                  const firstNewlineIndex = dummyStack.indexOf("\n");
                  stack = firstNewlineIndex === -1 ? "" : dummyStack.slice(firstNewlineIndex + 1);
                }
                if (!err.stack) {
                  err.stack = stack;
                } else if (stack) {
                  const firstNewlineIndex = stack.indexOf("\n");
                  const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf("\n", firstNewlineIndex + 1);
                  const stackWithoutTwoTopLines = secondNewlineIndex === -1 ? "" : stack.slice(secondNewlineIndex + 1);
                  if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) {
                    err.stack += "\n" + stack;
                  }
                }
              } catch (e) {
              }
            }
            throw err;
          }
        }
        _request(configOrUrl, config) {
          if (typeof configOrUrl === "string") {
            config = config || {};
            config.url = configOrUrl;
          } else {
            config = configOrUrl || {};
          }
          config = mergeConfig(this.defaults, config);
          const { transitional: transitional2, paramsSerializer, headers } = config;
          if (transitional2 !== void 0) {
            validator_default.assertOptions(
              transitional2,
              {
                silentJSONParsing: validators2.transitional(validators2.boolean),
                forcedJSONParsing: validators2.transitional(validators2.boolean),
                clarifyTimeoutError: validators2.transitional(validators2.boolean),
                legacyInterceptorReqResOrdering: validators2.transitional(validators2.boolean),
                advertiseZstdAcceptEncoding: validators2.transitional(validators2.boolean),
                validateStatusUndefinedResolves: validators2.transitional(validators2.boolean)
              },
              false
            );
          }
          if (paramsSerializer != null) {
            if (utils_default.isFunction(paramsSerializer)) {
              config.paramsSerializer = {
                serialize: paramsSerializer
              };
            } else {
              validator_default.assertOptions(
                paramsSerializer,
                {
                  encode: validators2.function,
                  serialize: validators2.function
                },
                true
              );
            }
          }
          if (config.allowAbsoluteUrls !== void 0) {
          } else if (this.defaults.allowAbsoluteUrls !== void 0) {
            config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
          } else {
            config.allowAbsoluteUrls = true;
          }
          validator_default.assertOptions(
            config,
            {
              baseUrl: validators2.spelling("baseURL"),
              withXsrfToken: validators2.spelling("withXSRFToken")
            },
            true
          );
          config.method = (utils_default.getSafeProp(config, "method") || utils_default.getSafeProp(this.defaults, "method") || "get").toLowerCase();
          let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
          headers && utils_default.forEach(methodList_default.concat("common"), (method) => {
            delete headers[method];
          });
          config.headers = AxiosHeaders_default.concat(contextHeaders, headers);
          const requestInterceptorChain = [];
          let synchronousRequestInterceptors = true;
          this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
            if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
              return;
            }
            synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
            const transitional3 = config.transitional || transitional_default;
            const legacyInterceptorReqResOrdering = transitional3 && transitional3.legacyInterceptorReqResOrdering;
            if (legacyInterceptorReqResOrdering) {
              requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
            } else {
              requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
            }
          });
          const responseInterceptorChain = [];
          this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
          });
          let promise;
          let i = 0;
          let len;
          if (!synchronousRequestInterceptors) {
            const chain = [dispatchRequest.bind(this), void 0];
            chain.unshift(...requestInterceptorChain);
            chain.push(...responseInterceptorChain);
            len = chain.length;
            promise = Promise.resolve(config);
            while (i < len) {
              promise = promise.then(chain[i++], chain[i++]);
            }
            return promise;
          }
          len = requestInterceptorChain.length;
          let newConfig = config;
          while (i < len) {
            const onFulfilled = requestInterceptorChain[i++];
            const onRejected = requestInterceptorChain[i++];
            try {
              newConfig = onFulfilled ? onFulfilled(newConfig) : newConfig;
            } catch (error) {
              if (!onRejected) {
                promise = Promise.reject(error);
                break;
              }
              try {
                const rejectedResult = onRejected.call(this, error);
                if (utils_default.isThenable(rejectedResult)) {
                  promise = Promise.resolve(rejectedResult).then(
                    () => dispatchRequest.call(this, newConfig)
                  );
                }
              } catch (rejectedError) {
                promise = Promise.reject(rejectedError);
              }
              break;
            }
          }
          if (!promise) {
            try {
              promise = dispatchRequest.call(this, newConfig);
            } catch (error) {
              promise = Promise.reject(error);
            }
          }
          i = 0;
          len = responseInterceptorChain.length;
          while (i < len) {
            promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
          }
          return promise;
        }
        getUri(config) {
          config = mergeConfig(this.defaults, config);
          const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls, config);
          return buildURL(fullPath, config.params, config.paramsSerializer);
        }
      };
      utils_default.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
        Axios.prototype[method] = function(url, config) {
          return this.request(
            mergeConfig(config || {}, {
              method,
              url,
              data: config && utils_default.hasOwnProp(config, "data") ? config.data : void 0
            })
          );
        };
      });
      utils_default.forEach(["post", "put", "patch", "query"], function forEachMethodWithData(method) {
        function generateHTTPMethod(isForm) {
          return function httpMethod(url, data, config) {
            return this.request(
              mergeConfig(config || {}, {
                method,
                headers: isForm ? {
                  "Content-Type": "multipart/form-data"
                } : {},
                url,
                data
              })
            );
          };
        }
        Axios.prototype[method] = generateHTTPMethod();
        if (method !== "query") {
          Axios.prototype[method + "Form"] = generateHTTPMethod(true);
        }
      });
      Axios_default = Axios;
    }
  });

  // node_modules/axios/lib/cancel/CancelToken.js
  var CancelToken, CancelToken_default;
  var init_CancelToken = __esm({
    "node_modules/axios/lib/cancel/CancelToken.js"() {
      "use strict";
      init_CanceledError();
      CancelToken = class _CancelToken {
        constructor(executor) {
          if (typeof executor !== "function") {
            throw new TypeError("executor must be a function.");
          }
          let resolvePromise;
          this.promise = new Promise(function promiseExecutor(resolve) {
            resolvePromise = resolve;
          });
          const token = this;
          this.promise.then((cancel) => {
            if (!token._listeners) return;
            let i = token._listeners.length;
            while (i-- > 0) {
              token._listeners[i](cancel);
            }
            token._listeners = null;
          });
          this.promise.then = (onfulfilled) => {
            let _resolve;
            const promise = new Promise((resolve) => {
              token.subscribe(resolve);
              _resolve = resolve;
            }).then(onfulfilled);
            promise.cancel = function reject() {
              token.unsubscribe(_resolve);
            };
            return promise;
          };
          executor(function cancel(message, config, request) {
            if (token.reason) {
              return;
            }
            token.reason = new CanceledError_default(message, config, request);
            resolvePromise(token.reason);
          });
        }
        /**
         * Throws a `CanceledError` if cancellation has been requested.
         */
        throwIfRequested() {
          if (this.reason) {
            throw this.reason;
          }
        }
        /**
         * Subscribe to the cancel signal
         */
        subscribe(listener) {
          if (this.reason) {
            listener(this.reason);
            return;
          }
          if (this._listeners) {
            this._listeners.push(listener);
          } else {
            this._listeners = [listener];
          }
        }
        /**
         * Unsubscribe from the cancel signal
         */
        unsubscribe(listener) {
          if (!this._listeners) {
            return;
          }
          const index = this._listeners.indexOf(listener);
          if (index !== -1) {
            this._listeners.splice(index, 1);
          }
        }
        toAbortSignal() {
          const controller = new AbortController();
          const abort = (err) => {
            controller.abort(err);
          };
          this.subscribe(abort);
          controller.signal.unsubscribe = () => this.unsubscribe(abort);
          return controller.signal;
        }
        /**
         * Returns an object that contains a new `CancelToken` and a function that, when called,
         * cancels the `CancelToken`.
         */
        static source() {
          let cancel;
          const token = new _CancelToken(function executor(c) {
            cancel = c;
          });
          return {
            token,
            cancel
          };
        }
      };
      CancelToken_default = CancelToken;
    }
  });

  // node_modules/axios/lib/helpers/spread.js
  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }
  var init_spread = __esm({
    "node_modules/axios/lib/helpers/spread.js"() {
      "use strict";
    }
  });

  // node_modules/axios/lib/helpers/isAxiosError.js
  function isAxiosError(payload) {
    return utils_default.isObject(payload) && payload.isAxiosError === true;
  }
  var init_isAxiosError = __esm({
    "node_modules/axios/lib/helpers/isAxiosError.js"() {
      "use strict";
      init_utils();
    }
  });

  // node_modules/axios/lib/helpers/HttpStatusCode.js
  var HttpStatusCode, HttpStatusCode_default;
  var init_HttpStatusCode = __esm({
    "node_modules/axios/lib/helpers/HttpStatusCode.js"() {
      HttpStatusCode = {
        Continue: 100,
        SwitchingProtocols: 101,
        Processing: 102,
        EarlyHints: 103,
        Ok: 200,
        Created: 201,
        Accepted: 202,
        NonAuthoritativeInformation: 203,
        NoContent: 204,
        ResetContent: 205,
        PartialContent: 206,
        MultiStatus: 207,
        AlreadyReported: 208,
        ImUsed: 226,
        MultipleChoices: 300,
        MovedPermanently: 301,
        Found: 302,
        SeeOther: 303,
        NotModified: 304,
        UseProxy: 305,
        Unused: 306,
        TemporaryRedirect: 307,
        PermanentRedirect: 308,
        BadRequest: 400,
        Unauthorized: 401,
        PaymentRequired: 402,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        ProxyAuthenticationRequired: 407,
        RequestTimeout: 408,
        Conflict: 409,
        Gone: 410,
        LengthRequired: 411,
        PreconditionFailed: 412,
        /**
         * @deprecated Use `ContentTooLarge` instead.
         */
        PayloadTooLarge: 413,
        ContentTooLarge: 413,
        UriTooLong: 414,
        UnsupportedMediaType: 415,
        RangeNotSatisfiable: 416,
        ExpectationFailed: 417,
        ImATeapot: 418,
        MisdirectedRequest: 421,
        /**
         * @deprecated Use `UnprocessableContent` instead.
         */
        UnprocessableEntity: 422,
        UnprocessableContent: 422,
        Locked: 423,
        FailedDependency: 424,
        TooEarly: 425,
        UpgradeRequired: 426,
        PreconditionRequired: 428,
        TooManyRequests: 429,
        RequestHeaderFieldsTooLarge: 431,
        UnavailableForLegalReasons: 451,
        InternalServerError: 500,
        NotImplemented: 501,
        BadGateway: 502,
        ServiceUnavailable: 503,
        GatewayTimeout: 504,
        HttpVersionNotSupported: 505,
        VariantAlsoNegotiates: 506,
        InsufficientStorage: 507,
        LoopDetected: 508,
        NotExtended: 510,
        NetworkAuthenticationRequired: 511,
        WebServerReturnsAnUnknownError: 520,
        WebServerIsDown: 521,
        ConnectionTimedOut: 522,
        OriginIsUnreachable: 523,
        TimeoutOccurred: 524,
        SslHandshakeFailed: 525,
        InvalidSslCertificate: 526
      };
      Object.entries(HttpStatusCode).forEach(([key, value]) => {
        if (HttpStatusCode[value] === void 0) {
          HttpStatusCode[value] = key;
        }
      });
      HttpStatusCode_default = HttpStatusCode;
    }
  });

  // node_modules/axios/lib/axios.js
  function createInstance(defaultConfig) {
    const context = new Axios_default(defaultConfig);
    const instance = bind(Axios_default.prototype.request, context);
    utils_default.extend(instance, Axios_default.prototype, context, { allOwnKeys: true });
    utils_default.extend(instance, context, null, { allOwnKeys: true });
    instance.create = function create2(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
  }
  var axios, axios_default;
  var init_axios = __esm({
    "node_modules/axios/lib/axios.js"() {
      "use strict";
      init_utils();
      init_bind();
      init_Axios();
      init_mergeConfig();
      init_defaults();
      init_formDataToJSON();
      init_CanceledError();
      init_CancelToken();
      init_isCancel();
      init_data();
      init_toFormData();
      init_AxiosError();
      init_spread();
      init_isAxiosError();
      init_AxiosHeaders();
      init_adapters();
      init_HttpStatusCode();
      axios = createInstance(defaults_default);
      axios.Axios = Axios_default;
      axios.CanceledError = CanceledError_default;
      axios.CancelToken = CancelToken_default;
      axios.isCancel = isCancel;
      axios.VERSION = VERSION;
      axios.toFormData = toFormData_default;
      axios.AxiosError = AxiosError_default;
      axios.Cancel = axios.CanceledError;
      axios.all = function all(promises) {
        return Promise.all(promises);
      };
      axios.spread = spread;
      axios.isAxiosError = isAxiosError;
      axios.mergeConfig = mergeConfig;
      axios.AxiosHeaders = AxiosHeaders_default;
      axios.formToJSON = (thing) => formDataToJSON_default(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
      axios.getAdapter = adapters_default.getAdapter;
      axios.HttpStatusCode = HttpStatusCode_default;
      axios.default = axios;
      axios_default = axios;
    }
  });

  // node_modules/axios/index.js
  var Axios2, AxiosError2, CanceledError2, isCancel2, CancelToken2, VERSION2, all2, Cancel, isAxiosError2, spread2, toFormData2, AxiosHeaders2, HttpStatusCode2, formToJSON, getAdapter2, mergeConfig2, create;
  var init_axios2 = __esm({
    "node_modules/axios/index.js"() {
      init_axios();
      ({
        Axios: Axios2,
        AxiosError: AxiosError2,
        CanceledError: CanceledError2,
        isCancel: isCancel2,
        CancelToken: CancelToken2,
        VERSION: VERSION2,
        all: all2,
        Cancel,
        isAxiosError: isAxiosError2,
        spread: spread2,
        toFormData: toFormData2,
        AxiosHeaders: AxiosHeaders2,
        HttpStatusCode: HttpStatusCode2,
        formToJSON,
        getAdapter: getAdapter2,
        mergeConfig: mergeConfig2,
        create
      } = axios_default);
    }
  });

  // public/js/alert.js
  var hideAlert, showAlert;
  var init_alert = __esm({
    "public/js/alert.js"() {
      hideAlert = () => {
        const el = document.querySelector(".alert");
        if (el) el.parentElement.removeChild(el);
      };
      showAlert = (type, message) => {
        hideAlert();
        const markup = `<div class='alert alert--${type}'>${message}</div>`;
        document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
        window.setTimeout(hideAlert, 4500);
      };
    }
  });

  // public/js/login.js
  var getCsrf, login, logout;
  var init_login = __esm({
    "public/js/login.js"() {
      init_axios2();
      init_alert();
      getCsrf = () => document.getElementById("_csrf").value;
      login = async (email, password) => {
        const token = getCsrf();
        try {
          const res = await axios_default({
            method: "POST",
            url: `${"http://localhost:8000"}/api/v1/users/auth/login`,
            data: {
              email,
              password
            },
            headers: {
              "x-csrf-token": token
            },
            withCredentials: true
          });
          if (res.data.status === "success") {
            showAlert("success", "Logged in successfully");
            window.setTimeout(() => {
              location.assign("/");
            }, 1500);
          }
        } catch (err) {
          console.log(err);
          showAlert("error", err.response?.data?.message);
        }
      };
      logout = async () => {
        try {
          const res = await axios_default({
            method: "GET",
            url: `${"http://localhost:8000"}/api/v1/users/auth/logout`
          });
          if (res.data.status === "success") location.assign("/");
        } catch (err) {
          showAlert("error", err.response.data.message);
        }
      };
    }
  });

  // public/js/changeStyle.js
  var changeStyle;
  var init_changeStyle = __esm({
    "public/js/changeStyle.js"() {
      changeStyle = () => {
        document.body.classList.toggle("dark-mode-bg");
        const elements = [];
        const header = document.querySelector(".header");
        const footer = document.querySelector(".footer");
        const footerT = document.querySelector(".footer-text");
        const forms = document.querySelectorAll(".form");
        const formInput = document.querySelector(".form__input");
        const btn = document.querySelectorAll(".btn");
        const links = document.querySelectorAll(".nav__el");
        const dashboard = document.querySelector(".dashboard__container");
        const table = document.querySelector(".milestones__table");
        const update2 = document.querySelector(".milestones__update");
        const checkbox = document.querySelector(".checkbox-table");
        elements.push(header, footer, footerT, dashboard, table, update2);
        elements.forEach((el) => {
          if (el) el.classList.toggle("dark-mode-el");
        });
        if (formInput) formInput.classList.toggle("dark-mode-input");
        btn.forEach((btn2) => {
          btn2.classList.toggle("dark-mode-btn");
        });
        links.forEach((link) => {
          link.classList.toggle("dark-mode-btn");
        });
        if (forms)
          forms.forEach((form) => {
            form.classList.toggle("dark-mode-el");
          });
        const boxes = document.querySelectorAll(".shipment-box");
        if (boxes) {
          boxes.forEach((box) => {
            box.classList.toggle("dark-mode-container");
          });
        }
        const labels = document.querySelectorAll(".shipment-box_label");
        if (labels)
          labels.forEach((label) => {
            label.classList.toggle("dark-mode-span");
          });
        const inputs = document.querySelectorAll(".form__input");
        if (inputs)
          inputs.forEach((input) => {
            input.classList.toggle("dark-mode-container");
          });
        if (checkbox) checkbox.classList.toggle("dark-mode-container");
        if (document.body.classList.contains("dark-mode-bg")) {
          localStorage.setItem("theme", "dark-mode");
        } else {
          localStorage.setItem("theme", "");
        }
      };
    }
  });

  // public/js/opsFunctions.js
  var getCsrf2, viewShipmentLogs, updateTimeline, getTable, getDogs;
  var init_opsFunctions = __esm({
    "public/js/opsFunctions.js"() {
      init_axios2();
      init_alert();
      getCsrf2 = () => document.getElementById("_csrf").value;
      viewShipmentLogs = async (id) => {
        const userid = id;
        try {
          const res = await axios_default({
            method: "GET",
            url: `${"http://localhost:8000"}/api/v1/users/${userid}/shipmentlogs`
          });
          if (res.data.status === "success") {
            showAlert("success", "User shipments loaded");
            const data = JSON.stringify(res.data.data.data, null, 4);
            document.querySelector(".shipment-logs").textContent = data;
          }
        } catch (err) {
          showAlert("error", err.response.data.msg);
        }
      };
      updateTimeline = async (docId, data) => {
        const token = getCsrf2();
        const id = docId;
        const newData = { ...data };
        try {
          const res = await axios_default({
            method: "PATCH",
            url: `${"http://localhost:8000"}/api/v1/data/timeline/${id}`,
            data: newData,
            headers: {
              "x-csrf-token": token
            },
            withCredentials: true
          });
          if (res.data.status === "success") {
            showAlert("success", "Timeline updated successfully!");
            window.setTimeout(() => {
              location.reload();
            }, 4600);
          }
        } catch (err) {
          showAlert("error", err.response.data.msg);
        }
      };
      getTable = async (name, id) => {
        let [x, ...arr] = name;
        x = x.toLowerCase();
        arr.unshift(x);
        const selection = arr.join("");
        try {
          const res = await axios_default({
            method: "GET",
            url: `${"http://localhost:8000"}/api/v1/data/${selection}/${id}`
          });
          if (res.data.status === "success") {
            const markupShipment = `<div class="shipment-box-detail"> <span class="shipment-box_label"> ${JSON.stringify(res.data.data.document, null, 4).replaceAll('"', "")}</span></div>`;
            Object.keys(res.data.data.document).forEach((key) => {
              document.querySelector(".field-select").insertAdjacentHTML("afterbegin", `<option>${key}</option>`);
            });
            document.querySelector(".shipment-box").insertAdjacentHTML("afterbegin", markupShipment);
          }
        } catch (err) {
          showAlert("error", err.response.data.message);
        }
      };
      getDogs = async () => {
        try {
          const res = await axios_default({
            method: "GET",
            url: "https://dog.ceo/api/breeds/image/random"
          });
          if (res.data.status === "success") {
            console.log(res.data);
            const breed = res.data.message.split("/")[4];
            document.querySelector(".main").insertAdjacentHTML(
              "afterbegin",
              `<h1> Random dog!\u{1F436} ${breed}</h1> <img src="${res.data.message}">`
            );
          }
        } catch (err) {
          console.log(err);
        }
      };
    }
  });

  // public/js/submitData.js
  var getCsrf3, submit, update;
  var init_submitData = __esm({
    "public/js/submitData.js"() {
      "use strict";
      init_axios2();
      init_alert();
      getCsrf3 = () => document.getElementById("_csrf").value;
      submit = async (dataObj, type) => {
        const token = getCsrf3();
        const url = type === "master" ? `${"http://localhost:8000"}/api/v1/data` : `${"http://localhost:8000"}/api/v1/data/${type}`;
        const localObj = { ...dataObj };
        try {
          const res = await axios_default({
            method: "POST",
            url,
            data: localObj,
            headers: {
              "x-csrf-token": token
            },
            withCredentials: true
          });
          if (res.data.status === "success") {
            showAlert("success", "Data submitted successfully");
            let data = JSON.stringify(res.data.data.data, null, 4);
            document.querySelector(".data-preview").textContent = data;
          }
        } catch (err) {
          showAlert("error", err.response.data.message);
        }
      };
      update = async (dataObj, table, id) => {
        const token = getCsrf3();
        const localObj = { ...dataObj };
        const url = `${"http://localhost:8000"}/api/v1/data/${table}/${id}`;
        try {
          const res = await axios_default({
            method: "PATCH",
            url,
            data: localObj,
            headers: {
              "x-csrf-token": token
            },
            withCredentials: true
          });
          if (res.data.status === "success") {
            showAlert("success", "Data submitted successfully");
          }
        } catch (err) {
          showAlert("error", err.response.data.message);
        }
      };
    }
  });

  // public/js/data.js
  var customerIdArray, consigneesIdArray, iterator2, toggleHidden, initialize, setObject, metaArray;
  var init_data2 = __esm({
    "public/js/data.js"() {
      customerIdArray = [
        "userId",
        "companyName_1",
        "phoneLandline_1",
        "phoneMobile_1",
        "emailPri",
        "emailSec",
        "addressLine1_1",
        "addressLine2_1",
        "addressLine3_1",
        "country_1"
      ];
      consigneesIdArray = [
        "consigneesMasterId",
        "companyName_2",
        "phoneLandline_2",
        "phoneMobile_2",
        "emailPri_1",
        "emailSec_1",
        "addressLine1_2",
        "addressLine2_2",
        "addressLine3_2",
        "country_2"
      ];
      iterator2 = (obj, str) => {
        for (let x of Object.keys(obj)) {
          if (x === str) return x;
        }
        return void 0;
      };
      toggleHidden = (el) => {
        const [a, b, c, d] = el;
        a.classList.add("hidden");
        b.classList.add("hidden");
        c.classList.remove("hidden");
        d.classList.remove("hidden");
      };
      initialize = (el) => {
        el.classList.add("hidden");
      };
      setObject = (arr) => {
        const object = {};
        for (const key of arr) {
          object[key] = null;
        }
        arr.forEach((el) => {
          const node = document.getElementById(el);
          if (!node) return;
          let key = iterator2(object, el);
          object[key] = node.value;
        });
        return object;
      };
      metaArray = [
        {
          name: "Shipment-details",
          array: [
            "incoterms",
            "mode",
            "routing",
            "goodsDescriptions",
            "packagingType",
            "containerSpecs",
            "containerQty",
            "numItems",
            "grossWeightKg",
            "netWeightKg",
            "cbm",
            "handlingRequirements",
            "dangerousGoods",
            "codeDrg",
            "detailsMasterId"
          ]
        },
        {
          name: "Conveyance",
          array: [
            "loadPort",
            "portTransShip",
            "portDischarge",
            "inlandDestination",
            "finalDelivery",
            "airlineName",
            "billMasterAirway",
            "billHouseAirway",
            "flightNum1",
            "flightDate1",
            "flightNum2",
            "flightDate2",
            "etd",
            "eta",
            "shippingLineName",
            "vesselName",
            "voyageNum",
            "oceanBoLnum",
            "houseBoLnum",
            "containerNum",
            "sealNum",
            "shippedOnboardDate",
            "etaFinalPort",
            "truckRegNo",
            "truckType",
            "conveyanceMasterId"
          ]
        },
        {
          name: "Customs",
          array: [
            "agent",
            "agentCode",
            "bOeNum",
            "bOeReleaseDate",
            "bOeAssessDate",
            "releaseDepot",
            "lrnNum",
            "mrnNum",
            "customsMasterId"
          ]
        },
        {
          name: "Financials",
          array: [
            "shipperInvoiceNum",
            "invoiceDate",
            "invoiceAmount",
            "currency",
            "tradeRef",
            "apnNum",
            "bank",
            "apnDate",
            "financialsMasterId"
          ]
        },
        {
          name: "Shippers",
          array: [
            "shippersMasterId",
            "companyName",
            "contactName",
            "phoneLandline",
            "phoneMobile",
            "emailPrimary",
            "emailSecondary",
            "addressLine1",
            "addressLine2",
            "addressLine3",
            "country"
          ]
        },
        {
          name: "Timelines",
          array: [
            "cargo_collected",
            "received",
            "cargo_packed",
            "depot_lrd",
            "cargo_loaded",
            "cargo_departed",
            "obl_awb",
            "anf_pre",
            "customer",
            "payment",
            "line",
            "clearing",
            "delivery",
            "signed",
            "sars",
            "cargo_arrived",
            "cargo_released",
            "cargo_unpacked",
            "cargo_delivered",
            "doc"
          ]
        },
        {
          name: "Customers",
          array: [
            "userId",
            "companyName",
            "phoneLandline",
            "phoneMobile",
            "emailPri",
            "emailSec",
            "addressLine1",
            "addressLine2",
            "addressLine3",
            "country"
          ]
        },
        {
          name: "Consignees",
          array: [
            "consigneesMasterId",
            "companyName",
            "phoneLandline",
            "phoneMobile",
            "emailPri",
            "emailSec",
            "addressLine1",
            "addressLine2",
            "addressLine3",
            "country"
          ]
        }
      ];
    }
  });

  // public/js/index.js
  var require_index = __commonJS({
    "public/js/index.js"() {
      init_login();
      init_changeStyle();
      init_opsFunctions();
      init_submitData();
      init_data2();
      console.log("page origin:", window.location.origin);
      var currentTheme = localStorage.getItem("theme");
      if (currentTheme) {
        changeStyle();
      }
      if (document.querySelector(".main--dogs")) getDogs();
      var logOutBtn = document.querySelector(".nav__el--logout");
      var loginForm = document.querySelector(".login-form");
      var submitDataForm = document.querySelector(".data-form__master");
      var submitShipperForm = document.querySelector(".data-form__shipper");
      var submitFinancialsForm = document.querySelector(".data-form__financials");
      var submitCustomsForm = document.querySelector(".data-form__customs");
      var submitDetailsForm = document.querySelector(".data-form__details");
      var submitConveyanceForm = document.querySelector(".data-form__conveyance");
      var timelineForm = document.querySelector(".data-form__timeline");
      var customersForm = document.querySelector(".data-form__customers");
      var consigneesForm = document.querySelector(".data-form__consignees");
      var themeBtn = document.querySelector(".theme");
      var viewDbxBtn = document.querySelector(".view-dbx");
      var checkboxes = document.querySelectorAll("ul input");
      var submitBtn = document.querySelector(".submit");
      var nextBtn1 = document.querySelector(".next1");
      var nextBtn2 = document.querySelector(".next2");
      var nextBtn3 = document.querySelector(".next3");
      var nextBtn4 = document.querySelector(".next4");
      var nextBtn5 = document.querySelector(".next5");
      var nextBtn6 = document.querySelector(".next6");
      var nextBtn7 = document.querySelector(".next7");
      var backBtn = document.querySelector(".back");
      var showCustomerFormBtn = document.querySelector(".show-form");
      var dbUpdateSelect1 = document.querySelector(".db-select");
      var dbUpdateBtn1 = document.querySelector(".update-select");
      var dbUpdateId = document.querySelector(".document-id");
      var fieldAddBtn = document.querySelector(".update-add1");
      var fieldSelector = document.querySelector(".field-select");
      var updateForm = document.querySelector(".update-form");
      var updateContainer = document.querySelector(".dashboard__container");
      var formElements = [];
      formElements.push(
        submitShipperForm,
        submitFinancialsForm,
        submitCustomsForm,
        submitDetailsForm,
        submitConveyanceForm,
        timelineForm,
        customersForm,
        consigneesForm,
        nextBtn2,
        nextBtn3,
        nextBtn4,
        nextBtn5,
        nextBtn6,
        nextBtn7,
        backBtn
      );
      for (const el of formElements) if (el) initialize(el);
      if (loginForm)
        loginForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;
          login(email, password);
        });
      if (logOutBtn) logOutBtn.addEventListener("click", logout);
      themeBtn.addEventListener("click", changeStyle);
      var id;
      if (submitBtn) {
        submitBtn.addEventListener("click", () => {
          for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
              const idStr = document.querySelector(`.user-li--${i}`).textContent.split("/")[1];
              id = idStr;
            }
          }
        });
      }
      if (viewDbxBtn) {
        viewDbxBtn.addEventListener("click", () => {
          viewShipmentLogs(id);
        });
      }
      if (submitDataForm)
        submitDataForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const object = {};
          object.shipment_file_id = document.getElementById("shipment_file_id").value;
          object.users = document.getElementById("users").value;
          object.CustomerId = document.getElementById("CustomerId").value;
          submit(object, "master");
        });
      if (submitShipperForm)
        submitShipperForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const shipperObj = setObject(
            metaArray.find((el) => el.name === "Shippers").array
          );
          submit(shipperObj, "shippers");
        });
      if (submitFinancialsForm)
        submitFinancialsForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const financialsObj = setObject(
            metaArray.find((el) => el.name === "Financials").array
          );
          submit(financialsObj, "financials");
        });
      if (submitCustomsForm)
        submitCustomsForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const customsObj = setObject(
            metaArray.find((el) => el.name === "Customs").array
          );
          submit(customsObj, "customs");
        });
      if (submitDetailsForm)
        submitDetailsForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const detailsObj = setObject(
            metaArray.find((el) => el.name === "Shipment-details").array
          );
          submit(detailsObj, "shipment-details");
        });
      if (submitConveyanceForm)
        submitConveyanceForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const conveyanceObj = setObject(
            metaArray.find((el) => el.name === "Conveyance").array
          );
          submit(conveyanceObj, "conveyance");
        });
      if (timelineForm)
        timelineForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const object = {};
          object.timelineMasterId = document.getElementById("timelineMasterId").value;
          submit(object, "timeline");
        });
      if (customersForm)
        customersForm.addEventListener("submit", (e) => {
          e.preventDefault();
          let object = {};
          for (const key of metaArray.find((el) => el.name === "Customers").array) {
            object[key] = null;
          }
          customerIdArray.forEach((el) => {
            const node = document.getElementById(el);
            if (!node) return;
            el = el.split("_");
            let key = iterator2(object, el[0]);
            object[key] = node.value;
          });
          submit(object, "customers");
        });
      if (consigneesForm)
        consigneesForm.addEventListener("submit", (e) => {
          e.preventDefault();
          let object = {};
          for (const key of metaArray.find((el) => el.name === "Consignees").array) {
            object[key] = null;
          }
          consigneesIdArray.forEach((el) => {
            const node = document.getElementById(el);
            if (!node) return;
            el = el.split("_");
            let key = iterator2(object, el[0]);
            object[key] = node.value;
          });
          submit(object, "consignees");
        });
      if (nextBtn1)
        nextBtn1.addEventListener("click", () => {
          toggleHidden([nextBtn1, submitDataForm, submitShipperForm, nextBtn2]);
          updateContainer.classList.add("hidden");
        });
      if (nextBtn2)
        nextBtn2.addEventListener(
          "click",
          () => toggleHidden([nextBtn2, submitShipperForm, submitDetailsForm, nextBtn3])
        );
      if (nextBtn3)
        nextBtn3.addEventListener(
          "click",
          () => toggleHidden([nextBtn3, submitDetailsForm, submitFinancialsForm, nextBtn4])
        );
      if (nextBtn4)
        nextBtn4.addEventListener(
          "click",
          () => toggleHidden([nextBtn4, submitFinancialsForm, submitCustomsForm, nextBtn5])
        );
      if (nextBtn5)
        nextBtn5.addEventListener(
          "click",
          () => toggleHidden([nextBtn5, submitCustomsForm, submitConveyanceForm, nextBtn6])
        );
      if (nextBtn6)
        nextBtn6.addEventListener(
          "click",
          () => toggleHidden([nextBtn6, submitConveyanceForm, timelineForm, nextBtn7])
        );
      if (nextBtn7)
        nextBtn7.addEventListener(
          "click",
          () => toggleHidden([nextBtn7, timelineForm, consigneesForm, backBtn])
        );
      if (backBtn)
        backBtn.addEventListener("click", () => {
          formElements.forEach((el) => initialize(el));
          nextBtn1.classList.remove("hidden");
          updateContainer.classList.remove("hidden");
          submitDataForm.classList.remove("hidden");
        });
      var hidden = true;
      if (showCustomerFormBtn)
        showCustomerFormBtn.addEventListener("click", () => {
          if (hidden) {
            customersForm.classList.remove("hidden");
            hidden = false;
          } else if (!hidden) {
            customersForm.classList.add("hidden");
            hidden = true;
          }
        });
      var milestoneBool = document.querySelectorAll("td");
      if (milestoneBool)
        milestoneBool.forEach((el) => {
          if (el.textContent === "true") el.classList.add("truthy");
        });
      if (document.querySelector(".timeline-select"))
        document.querySelector(".timeline-id__submit").addEventListener("click", () => {
          const timelineId = document.querySelector(".timeline-id").value;
          let object = {};
          for (const x of metaArray.find((el) => el.name === "Timelines").array) {
            object[x] = null;
          }
          let input = document.querySelector(".timeline-select").value;
          input = input.replace("/", " ");
          let arr = input.split(" ");
          for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].toLowerCase();
          }
          if (arr.length >= 3) arr.pop();
          let arrCopy = [...arr];
          arr = arr.join("_");
          let key;
          metaArray.find((el) => el.name === "Timelines").array.forEach((el) => {
            if (arr.includes(el)) {
              key = el;
            }
          });
          object[key] = "true";
          const dateInput = document.querySelector(".timeline-date").value;
          for (let i = 0; i <= 3; i++) {
            while (arrCopy.length >= 3) {
              arrCopy.pop();
            }
          }
          arrCopy.push("date");
          arrCopy = arrCopy.join("_");
          object[arrCopy] = dateInput;
          updateTimeline(timelineId, object);
        });
      if (dbUpdateBtn1)
        dbUpdateBtn1.addEventListener("click", () => {
          const selection = dbUpdateSelect1.value;
          const id2 = dbUpdateId.value;
          getTable(selection, id2);
        });
      if (fieldAddBtn)
        fieldAddBtn.addEventListener("click", (e) => {
          e.preventDefault();
          const selection = fieldSelector.value;
          const markup = `<div class="form__group">
  <label class="form__label" for="${selection}">
    ${selection.toUpperCase()}
  </label>
  <input class="form__input" id="${selection}">
</div>`;
          document.querySelector(".update-form").insertAdjacentHTML("afterbegin", markup);
        });
      if (updateForm)
        updateForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const tableSelection = dbUpdateSelect1.value;
          const object = {};
          metaArray.forEach((obj) => {
            if (tableSelection === obj.name) {
              obj.array.forEach((el) => {
                const node = document.getElementById(el);
                if (!node) return;
                let key = el;
                object[key] = node.value;
              });
            }
          });
          const route = tableSelection.toLowerCase();
          const id2 = dbUpdateId.value;
          update(object, route, id2);
        });
    }
  });
  require_index();
})();
