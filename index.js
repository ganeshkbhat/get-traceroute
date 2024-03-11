/**
 * 
 * Package: 
 * Author: Ganesh B
 * Description: 
 * Install: npm i  --save
 * Github: https://github.com/ganeshkbhat/
 * npmjs Link: https://www.npmjs.com/package/
 * File: 
 * File Description: 
 * 
*/

/* eslint no-console: 0 */

'use strict';

var cp = require('child_process');

function isObject(obj) {
  return obj !== null && obj !== undefined && typeof obj === 'object' && !Array.isArray(obj);
}

function toBoolean(bool) {
  if (bool === 'false') bool = false;
  return !!bool;
}

function normaliseOptions(options) {
  let DEFAULTS = Object.freeze({ encoding: 'utf8', silent: false, stdio: "pipe", cwd: process.cwd() });
  if (!isObject(options)) {
    options = {};
  } else {
    if (typeof options.silent !== 'undefined') {
      options.silent = toBoolean(options.silent);
    }
  }
  return Object.assign({}, DEFAULTS, options);
}

function traceroute(hostIP, args = [], options = {}, noroot = true) {
  options = normaliseOptions(options);
  let error, stdout, stderr, code, ok;
  let command = ("win32" === process.platform) ? "cmd /C; " : "sh -c; ";
  try {
    error = null
    stdout = cp.execSync(("win32" === process.platform) ? "tracert" : (!!noroot) ? "tracepath" : "traceroute", [...args, hostIP], options)
    stderr = ''
    code = 0
    ok = true
  } catch (e) {
    error = e
    stdout = e.stdout
    stderr = e.stderr
    code = e.status || 1 /* istanbul ignore next */
    ok = false
  }

  return {
    error: error,
    stdout: stdout,
    stderr: stderr,
    code: code,
    ok: ok
  }
}

module.exports.traceroute = traceroute;
module.exports.default = traceroute;
