require('./sourcemap-register.js');module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(109);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 76:
/***/ (function(module) {

"use strict";

const encodings = new Set(['json', 'buffer', 'string'])

module.exports = mkrequest => (...args) => {
  const statusCodes = new Set()
  let method
  let encoding
  let headers
  let baseurl = ''

  args.forEach(arg => {
    if (typeof arg === 'string') {
      if (arg.toUpperCase() === arg) {
        if (method) {
          const msg = `Can't set method to ${arg}, already set to ${method}.`
          throw new Error(msg)
        } else {
          method = arg
        }
      } else if (arg.startsWith('http:') || arg.startsWith('https:')) {
        baseurl = arg
      } else {
        if (encodings.has(arg)) {
          encoding = arg
        } else {
          throw new Error(`Unknown encoding, ${arg}`)
        }
      }
    } else if (typeof arg === 'number') {
      statusCodes.add(arg)
    } else if (typeof arg === 'object') {
      if (Array.isArray(arg) || arg instanceof Set) {
        arg.forEach(code => statusCodes.add(code))
      } else {
        if (headers) {
          throw new Error('Cannot set headers twice.')
        }
        headers = arg
      }
    } else {
      throw new Error(`Unknown type: ${typeof arg}`)
    }
  })

  if (!method) method = 'GET'
  if (statusCodes.size === 0) {
    statusCodes.add(200)
  }

  return mkrequest(statusCodes, method, encoding, headers, baseurl)
}


/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 89:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";
/* globals atob, btoa, crypto */
/* istanbul ignore file */

const bytes = __webpack_require__(391)

bytes.from = (_from, _encoding) => {
  if (_from instanceof DataView) return _from
  if (_from instanceof ArrayBuffer) return new DataView(_from)
  let buffer
  if (typeof _from === 'string') {
    if (!_encoding) {
      _encoding = 'utf-8'
    } else if (_encoding === 'base64') {
      buffer = Uint8Array.from(atob(_from), c => c.charCodeAt(0)).buffer
      return new DataView(buffer)
    }
    if (_encoding !== 'utf-8') throw new Error('Browser support for encodings other than utf-8 not implemented')
    return new DataView((new TextEncoder()).encode(_from).buffer)
  } else if (typeof _from === 'object') {
    if (ArrayBuffer.isView(_from)) {
      if (_from.byteLength === _from.buffer.byteLength) return new DataView(_from.buffer)
      else return new DataView(_from.buffer, _from.byteOffset, _from.byteLength)
    }
  }
  throw new Error('Unkown type. Cannot convert to ArrayBuffer')
}

bytes.toString = (_from, encoding) => {
  _from = bytes(_from, encoding)
  const uint = new Uint8Array(_from.buffer, _from.byteOffset, _from.byteLength)
  const str = String.fromCharCode(...uint)
  if (encoding === 'base64') {
    /* would be nice to find a way to do this directly from a buffer
     * instead of doing two string conversions
     */
    return btoa(str)
  } else {
    return str
  }
}

bytes.native = (_from, encoding) => {
  if (_from instanceof Uint8Array) return _from
  _from = bytes.from(_from, encoding)
  return new Uint8Array(_from.buffer, _from.byteOffset, _from.byteLength)
}

if (process.browser) bytes._randomFill = (...args) => crypto.getRandomValues(...args)

module.exports = bytes


/***/ }),

/***/ 109:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(__webpack_require__(186));
const promote_1 = __webpack_require__(729);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = core.getInput('url');
            const username = core.getInput('username');
            const password = core.getInput('password');
            const source = core.getInput('sourceRepo');
            const targetRepo = core.getInput('targetRepo');
            const dockerRepository = core.getInput('dockerRepository');
            const tag = core.getInput('tag');
            const targetTag = core.getInput('targetTag');
            const copy = core.getInput('copy') === 'true';
            core.debug(`artifactory-promote-action
==========================
URL: ${url}
Source repo: ${source}
Target repo: ${targetRepo}
Docker repository: ${dockerRepository}
Tag: ${tag}
Target tag: ${targetTag}
Copy: ${copy}`);
            yield promote_1.promote(url, username, password, source, targetRepo, dockerRepository, tag, targetTag, copy);
            const action = copy ? 'copied' : 'moved';
            const sourceTag = tag ? `:${tag}` : '';
            const promotedTag = targetTag ? `:${targetTag}` : sourceTag;
            core.info(`${action} image ${dockerRepository}${sourceTag} from ${source} to ${targetRepo} as ${dockerRepository}${promotedTag}`);
            core.setOutput('image', `${dockerRepository}${promotedTag}`);
        }
        catch (error) {
            core.debug(`error: ${error}`);
            core.setFailed(error.message);
        }
    });
}
run();


/***/ }),

/***/ 113:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";

const http = __webpack_require__(605)
const https = __webpack_require__(211)
const { URL } = __webpack_require__(835)
const isStream = __webpack_require__(394)
const caseless = __webpack_require__(684)
const bytes = __webpack_require__(734)
const bent = __webpack_require__(76)
const zlib = __webpack_require__(761)
const { PassThrough } = __webpack_require__(413)

const compression = {}

/* istanbul ignore else */
if (zlib.createBrotliDecompress) compression.br = () => zlib.createBrotliDecompress()
/* istanbul ignore else */
if (zlib.createGunzip) compression.gzip = () => zlib.createGunzip()
/* istanbul ignore else */
if (zlib.createInflate) compression.deflate = () => zlib.createInflate()

const acceptEncoding = Object.keys(compression).join(', ')

const getResponse = resp => {
  const ret = new PassThrough()
  ret.statusCode = resp.statusCode
  ret.status = resp.statusCode
  ret.statusMessage = resp.statusMessage
  ret.headers = resp.headers
  ret._response = resp
  if (ret.headers['content-encoding']) {
    const encodings = ret.headers['content-encoding'].split(', ').reverse()
    while (encodings.length) {
      const enc = encodings.shift()
      if (compression[enc]) {
        const decompress = compression[enc]()
        decompress.on('error', (e) => ret.emit('error', new Error('ZBufError', e)))
        resp = resp.pipe(decompress)
      } else {
        break
      }
    }
  }
  return resp.pipe(ret)
}

class StatusError extends Error {
  constructor (res, ...params) {
    super(...params)

    Error.captureStackTrace(this, StatusError)
    this.name = 'StatusError'
    this.message = res.statusMessage
    this.statusCode = res.statusCode
    this.json = res.json
    this.text = res.text
    this.arrayBuffer = res.arrayBuffer
    this.headers = res.headers
    let buffer
    const get = () => {
      if (!buffer) buffer = this.arrayBuffer()
      return buffer
    }
    Object.defineProperty(this, 'responseBody', { get })
  }
}

const getBuffer = stream => new Promise((resolve, reject) => {
  const parts = []
  stream.on('error', reject)
  stream.on('end', () => resolve(Buffer.concat(parts)))
  stream.on('data', d => parts.push(d))
})

const decodings = res => {
  let _buffer
  res.arrayBuffer = () => {
    if (!_buffer) {
      _buffer = getBuffer(res)
      return _buffer
    } else {
      throw new Error('body stream is locked')
    }
  }
  res.text = () => res.arrayBuffer().then(buff => buff.toString())
  res.json = async () => {
    const str = await res.text()
    try {
      return JSON.parse(str)
    } catch (e) {
      e.message += `str"${str}"`
      throw e
    }
  }
}

const mkrequest = (statusCodes, method, encoding, headers, baseurl) => (_url, body = null, _headers = {}) => {
  _url = baseurl + (_url || '')
  const parsed = new URL(_url)
  let h
  if (parsed.protocol === 'https:') {
    h = https
  } else if (parsed.protocol === 'http:') {
    h = http
  } else {
    throw new Error(`Unknown protocol, ${parsed.protocol}`)
  }
  const request = {
    path: parsed.pathname + parsed.search,
    port: parsed.port,
    method: method,
    headers: { ...(headers || {}), ..._headers },
    hostname: parsed.hostname
  }
  if (parsed.username || parsed.password) {
    request.auth = [parsed.username, parsed.password].join(':')
  }
  const c = caseless(request.headers)
  if (encoding === 'json') {
    if (!c.get('accept')) {
      c.set('accept', 'application/json')
    }
  }
  if (!c.has('accept-encoding')) {
    c.set('accept-encoding', acceptEncoding)
  }
  return new Promise((resolve, reject) => {
    const req = h.request(request, async res => {
      res = getResponse(res)
      res.on('error', reject)
      decodings(res)
      res.status = res.statusCode
      if (!statusCodes.has(res.statusCode)) {
        return reject(new StatusError(res))
      }

      if (!encoding) return resolve(res)
      else {
        /* istanbul ignore else */
        if (encoding === 'buffer') {
          resolve(res.arrayBuffer())
        } else if (encoding === 'json') {
          resolve(res.json())
        } else if (encoding === 'string') {
          resolve(res.text())
        }
      }
    })
    req.on('error', reject)
    if (body) {
      if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) {
        body = bytes.native(body)
      }
      if (Buffer.isBuffer(body)) {
        // noop
      } else if (typeof body === 'string') {
        body = Buffer.from(body)
      } else if (isStream(body)) {
        body.pipe(req)
        body = null
      } else if (typeof body === 'object') {
        if (!c.has('content-type')) {
          req.setHeader('content-type', 'application/json')
        }
        body = Buffer.from(JSON.stringify(body))
      } else {
        reject(new Error('Unknown body type.'))
      }
      if (body) {
        req.setHeader('content-length', body.length)
        req.end(body)
      }
    } else {
      req.end()
    }
  })
}

module.exports = bent(mkrequest)


/***/ }),

/***/ 186:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(351);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = command_1.toCommandValue(val);
    process.env[name] = convertedVal;
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command_1.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 211:
/***/ (function(module) {

module.exports = require("https");

/***/ }),

/***/ 351:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(__webpack_require__(87));
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
function escapeData(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 391:
/***/ (function(module) {

"use strict";


const length = (a, b) => {
  if (a.byteLength === b.byteLength) return a.byteLength
  else if (a.byteLength > b.byteLength) return a.byteLength
  return b.byteLength
}

const bytes = (_from, encoding) => bytes.from(_from, encoding)

bytes.sorter = (a, b) => {
  a = bytes(a)
  b = bytes(b)
  const len = length(a, b)
  let i = 0
  while (i < (len - 1)) {
    if (i >= a.byteLength) return 1
    else if (i >= b.byteLength) return -1

    if (a.getUint8(i) < b.getUint8(i)) return -1
    else if (a.getUint8(i) > b.getUint8(i)) return 1
    i++
  }
  return 0
}

bytes.compare = (a, b) => !bytes.sorter(a, b)
bytes.memcopy = (_from, encoding) => {
  const b = bytes(_from, encoding)
  return b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength)
}
bytes.arrayBuffer = (_from, encoding) => {
  _from = bytes(_from, encoding)
  if (_from.buffer.byteLength === _from.byteLength) return _from.buffer
  return _from.buffer.slice(_from.byteOffset, _from.byteOffset + _from.byteLength)
}
const sliceOptions = (_from, start = 0, end = null) => {
  _from = bytes(_from)
  end = (end === null ? _from.byteLength : end) - start
  return [_from.buffer, _from.byteOffset + start, end]
}
bytes.slice = (_from, start, end) => new DataView(...sliceOptions(_from, start, end))

bytes.memcopySlice = (_from, start, end) => {
  const [buffer, offset, length] = sliceOptions(_from, start, end)
  return buffer.slice(offset, length + offset)
}
bytes.typedArray = (_from, _Class = Uint8Array) => {
  _from = bytes(_from)
  return new _Class(_from.buffer, _from.byteOffset, _from.byteLength / _Class.BYTES_PER_ELEMENT)
}

bytes.concat = (_from) => {
  _from = Array.from(_from)
  _from = _from.map(b => bytes(b))
  const length = _from.reduce((x, y) => x + y.byteLength, 0)
  const ret = new Uint8Array(length)
  let i = 0
  for (const part of _from) {
    const view = bytes.typedArray(part)
    ret.set(view, i)
    i += view.byteLength
  }
  return ret.buffer
}

const maxEntropy = 65536

bytes.random = length => {
  const ab = new ArrayBuffer(length)
  if (length > maxEntropy) {
    let i = 0
    while (i < ab.byteLength) {
      let len
      if (i + maxEntropy > ab.byteLength) len = ab.byteLength - i
      else len = maxEntropy
      const view = new Uint8Array(ab, i, len)
      i += maxEntropy
      bytes._randomFill(view)
    }
  } else {
    const view = new Uint8Array(ab)
    bytes._randomFill(view)
  }
  return ab
}

module.exports = bytes


/***/ }),

/***/ 394:
/***/ (function(module) {

"use strict";


const isStream = stream =>
	stream !== null &&
	typeof stream === 'object' &&
	typeof stream.pipe === 'function';

isStream.writable = stream =>
	isStream(stream) &&
	stream.writable !== false &&
	typeof stream._write === 'function' &&
	typeof stream._writableState === 'object';

isStream.readable = stream =>
	isStream(stream) &&
	stream.readable !== false &&
	typeof stream._read === 'function' &&
	typeof stream._readableState === 'object';

isStream.duplex = stream =>
	isStream.writable(stream) &&
	isStream.readable(stream);

isStream.transform = stream =>
	isStream.duplex(stream) &&
	typeof stream._transform === 'function' &&
	typeof stream._transformState === 'object';

module.exports = isStream;


/***/ }),

/***/ 413:
/***/ (function(module) {

module.exports = require("stream");

/***/ }),

/***/ 417:
/***/ (function(module) {

module.exports = require("crypto");

/***/ }),

/***/ 605:
/***/ (function(module) {

module.exports = require("http");

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 684:
/***/ (function(module) {

function Caseless (dict) {
  this.dict = dict || {}
}
Caseless.prototype.set = function (name, value, clobber) {
  if (typeof name === 'object') {
    for (var i in name) {
      this.set(i, name[i], value)
    }
  } else {
    if (typeof clobber === 'undefined') clobber = true
    var has = this.has(name)

    if (!clobber && has) this.dict[has] = this.dict[has] + ',' + value
    else this.dict[has || name] = value
    return has
  }
}
Caseless.prototype.has = function (name) {
  var keys = Object.keys(this.dict)
    , name = name.toLowerCase()
    ;
  for (var i=0;i<keys.length;i++) {
    if (keys[i].toLowerCase() === name) return keys[i]
  }
  return false
}
Caseless.prototype.get = function (name) {
  name = name.toLowerCase()
  var result, _key
  var headers = this.dict
  Object.keys(headers).forEach(function (key) {
    _key = key.toLowerCase()
    if (name === _key) result = headers[key]
  })
  return result
}
Caseless.prototype.swap = function (name) {
  var has = this.has(name)
  if (has === name) return
  if (!has) throw new Error('There is no header than matches "'+name+'"')
  this.dict[name] = this.dict[has]
  delete this.dict[has]
}
Caseless.prototype.del = function (name) {
  var has = this.has(name)
  return delete this.dict[has || name]
}

module.exports = function (dict) {return new Caseless(dict)}
module.exports.httpify = function (resp, headers) {
  var c = new Caseless(headers)
  resp.setHeader = function (key, value, clobber) {
    if (typeof value === 'undefined') return
    return c.set(key, value, clobber)
  }
  resp.hasHeader = function (key) {
    return c.has(key)
  }
  resp.getHeader = function (key) {
    return c.get(key)
  }
  resp.removeHeader = function (key) {
    return c.del(key)
  }
  resp.headers = c.dict
  return c
}


/***/ }),

/***/ 729:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promote = void 0;
const core = __importStar(__webpack_require__(186));
const bent_1 = __importDefault(__webpack_require__(113));
function promote(url, username, password, source, targetRepo, dockerRepository, tag, targetTag, copy) {
    return __awaiter(this, void 0, void 0, function* () {
        const payload = {
            targetRepo,
            dockerRepository,
            copy
        };
        if (tag) {
            payload.tag = tag;
        }
        if (targetTag) {
            payload.targetTag = targetTag;
        }
        const post = bent_1.default(url, 'POST');
        const auth = Buffer.from(`${username}:${password}`).toString('base64');
        core.debug(`POST to ${url}/artifactory/api/docker/${source}/v2/promote with payload: ${payload}`);
        return post(`/artifactory/api/docker/${source}/v2/promote`, payload, {
            Authorization: `Basic ${auth}`
        });
    });
}
exports.promote = promote;


/***/ }),

/***/ 734:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";

const crypto = __webpack_require__(417)
const fallback = __webpack_require__(89).from
const bytes = __webpack_require__(391)

bytes.from = (_from, encoding) => {
  if (_from instanceof DataView) return _from
  if (_from instanceof ArrayBuffer) return new DataView(_from)
  if (typeof _from === 'string') {
    _from = Buffer.from(_from, encoding)
  }
  if (Buffer.isBuffer(_from)) {
    return new DataView(_from.buffer, _from.byteOffset, _from.byteLength)
  }
  return fallback(_from, encoding)
}
bytes.toString = (_from, encoding) => {
  _from = bytes(_from)
  return Buffer.from(_from.buffer, _from.byteOffset, _from.byteLength).toString(encoding)
}

bytes.native = (_from, encoding) => {
  if (Buffer.isBuffer(_from)) return _from
  _from = bytes(_from, encoding)
  return Buffer.from(_from.buffer, _from.byteOffset, _from.byteLength)
}

bytes._randomFill = crypto.randomFillSync

module.exports = bytes


/***/ }),

/***/ 761:
/***/ (function(module) {

module.exports = require("zlib");

/***/ }),

/***/ 835:
/***/ (function(module) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map