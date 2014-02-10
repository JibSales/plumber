/*  
 *  Parser Tests
 *
 *  Copyright (c) 2014 JibSales <sean@jibsales.com>
 */

 // -- Load native modules
 var fs = require('fs');
 
 // -- Load npm modules
 var should = require('should');
 
 // -- Load local modules
 var Framer = require('../lib/framer');

describe.skip('Framer', function () {
  var framer = new Framer();
  it('should split lines by newline character', function (done) {
    var readStream = fs.createReadStream('package.json')
    readStream.on('open', function () {
      // readStream.pipe(framer).pipe(process.stdout);
    });
    readStream.on('end', function () {
      done();
    });
    readStream.on('error', function (error) {
      done(error);
    });
  });
});