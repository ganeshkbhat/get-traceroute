# get-traceroute
module to get the traceroute of an IP Address

#### USAGE

`.traceroute`

```
/**
 *
 *
 * @param {*} hostIP `domain` or `IPV4` or `IPV6`
 * @param {*} [args=[]] Use the `tracert`, or `tracepath` [`noroot: true`], or `traceroute` [`noroot: false`] arguments
 * @param {*} [options={}] `default` { encoding: 'utf8', silent: false, stdio: "pipe", cwd: cwd }
 * @param {boolean} [noroot=true] `true`
 * @return {*} 
 */
 ```


`.traceroute("domain.com", ["-6"], {})`


```
const netroutes = require("get-traceroute");

(async () => {
  let result = await netroutes.traceroute("google.com", []);
  console.log(result.stdout.toString());
})()

```

`tcptraceroute`

```
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
 ```

`.tcptraceroute("domain.com", ["-6"], {})`

```
const netroutes = require("get-traceroute");

(async () => {
  let result = await netroutes.tcptraceroute("google.com", []);
  console.log(result.stdout.toString());
})()

```

