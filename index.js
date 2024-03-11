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
const { platform } = process;


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

/**
 *
 *
 * @param {*} hostIP `domain` or `IPV4` or `IPV6`
 * @param {*} [args=[]] Use the `tracert`, or `tracepath` [`noroot: true`], or `traceroute` [`noroot: false`] arguments
 * @param {*} [options={}] `default` { encoding: 'utf8', silent: false, stdio: "pipe", cwd: cwd }
 * @param {boolean} [noroot=true] `true`
 * @return {*} 
 */
async function traceroute(hostIP, args = [], options = {}, noroot = true) {
  let cmd = platform === "win32" ? "tracert" : (!!noroot) ? "tracepath" : "traceroute";
  return await cp.spawnSync(cmd, [...args, hostIP], normaliseOptions(options));
}

/**
 *
 * 
 * TraceTCP requires the WinPcap library which can be download below
 * WinPcap - http://www.winpcap.org/install/default.htm
 * TraceTCP - https://github.com/SimulatedSimian/tracetcp/releases
 *
 * @param {*} hostIP `domain` or `IPV4` or `IPV6`
 * @param {*} [args=[]] Use the `tracert`, or `tracepath` [`noroot: true`], or `traceroute` [`noroot: false`] arguments
 * @param {*} [options={}] `default` { encoding: 'utf8', silent: false, stdio: "pipe", cwd: cwd }
 * @param {boolean} [noroot=true] `true`
 * @return {*} 
 */
async function tcptraceroute(hostIP, args = [], options = {}, noroot = false) {
  let cmd = platform === "win32" ? "tracetcp" : "sudo tcptraceroute";
  return await cp.spawnSync(cmd, [...args, hostIP], normaliseOptions(options));
}

module.exports.traceroute = traceroute;
module.exports.tcptraceroute = tcptraceroute
module.exports.default = { traceroute, tcptraceroute };
