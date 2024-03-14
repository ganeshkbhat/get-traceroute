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

const { isIPv4, isIPv6 } = require("net");
var cp = require('child_process');
const { pipeline } = require('stream');
const { platform } = process;


function isObject(obj) {
  return obj !== null && obj !== undefined && typeof obj === 'object' && !Array.isArray(obj);
}

function toBoolean(bool) {
  if (bool === 'false') bool = false;
  return !!bool;
}

function isDomain(domainaddress) {
  return isValidDomain(domainaddress)
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

function isUrl(urlString) {
  var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}

/**
 *
 *
 * @param {*} urlString
 * @return {*} 
 */
function isDomain(urlString) {
  var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    // below
    '(\\:\\d+))');  // validate port
  // or below
  //  '(\\:\\d+))?(\\/[-a-z\\d%_.~+]*)*' + ''); // validate port and path
  // continue all next for URL
  // '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  // '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
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
 * https://support.opendns.com/hc/en-us/articles/227989007-How-to-Running-a-TCP-Traceroute
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

function downloadWinPcap() {
  // // https://www.winpcap.org/install/bin/WinPcap_4_1_3.exe
  // const https = require('node:https');
  // https.get('https://www.winpcap.org/install/bin/WinPcap_4_1_3.exe', (res) => { 
  //   console.log('statusCode:', res.statusCode); console.log('headers:', res.headers); console.log('body:', res.body); 
  // }).on('error', (e) => { console.error(e); });
}

function downloadTraceTCP() {
  // // https://github.com/0xcafed00d/tracetcp/releases/download/v1.0.3/tracetcp_v1.0.3.zip
  // const https = require('node:https');
  // https.get('https://github.com/0xcafed00d/tracetcp/releases/download/v1.0.3/tracetcp_v1.0.3.zip', (res) => {
  //   console.log('statusCode:', res.statusCode);
  //   console.log('headers:', res.headers);
  //   console.log('body:', res.body);
  // }).on('error', (e) => {
  //   console.error(e);
  // });
}

module.exports.traceroute = traceroute;
// module.exports.tcptraceroute = tcptraceroute; 
module.exports.isIPv4 = isIPv4;
module.exports.isIPv6 = isIPv6;
module.exports.isDomain = isDomain;
module.exports.isUrl = isUrl;
module.exports.default = { traceroute, isIPv4, isIPv6, isDomain, isUrl };
