/*  
 *  Plumber Tests
 *
 *  Copyright (c) 2014 JibSales <sean@jibsales.com>
 */

 // -- Load native modules
 var net = require('net');
 var http = require('http');
 // -- Load npm modules
 var should = require('should');
 // -- Load local modules
 var Plumber = require('../lib/plumber');

describe('Plumber', function () {
  describe('when \'connection\' event is emitted', function () {

    it('should pass a websocket object', function (done) {
      var plumber = new Plumber({
        'tcp-port': 3001,
        'path': '/sock'
      });
      plumber.on('hello', function (sockets) {
        // sockets.should.be.a('object');
        // sockets.should.have.property('tcp');
        // sockets.should.have.property('ws');
        done();
      });
      plumber.hello();
    });
    it('should pass a tcp socket object');
  });
  describe('when not given a tcp port', function () {
    it('should throw an error');
  });
  describe('when not given a path', function () {
    it('should default to /sock');
  });
});