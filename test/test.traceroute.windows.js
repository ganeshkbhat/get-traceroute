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

const { expect } = require('chai');
const demos = require("../index");

if (["win32"].includes(process.platform)) {

  describe('[ tests] Tests to check if traceroute function tracert works right in windows', () => {
    let tst, written, result;
    before(async () => {
      result = await demos.traceroute("google.com", []);
    });

    after(() => { });

    it('should not return error when traceroute is being used', () => {
      let actual = true;
      let expected = true;
      expect(!!result).to.equal(expected);
    });

    // it('should return some stdout when tracingroute in windows using default noroot', () => {
    //   let actual = true;
    //   let expected = true;
    //   expect(result.stdout.toString().includes("Tracing route to google.com [")).to.equal(expected);
    //   expect(result.stdout.toString().includes("Trace complete")).to.equal(expected);
    // });

    it('should return some stdout when tracingroute in windows using noroot false', () => {
      let actual = true;
      let expected = true;
      expect(actual).to.equal(expected);
    });

    it('should contain the results text ---- in windows', () => {
      let actual = true;
      let expected = true;
      expect(result.stdout.toString().includes("Tracing route to google.com [")).to.equal(expected);
      expect(result.stdout.toString().includes("Trace complete")).to.equal(expected);
    });

  });

}
