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

const demos = require("../index");

let result = demos.traceroute("google.com", ["-6"]);
console.log(result.stdout.toString("utf8"));

