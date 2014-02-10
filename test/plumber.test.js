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
  describe('Object Instantiation', function () {
    var plumber = new Plumber({
      'tcp-port': 21000
    });
    it('should be an instance of plumber', function () {
      plumber.should.be.an.instanceOf(Plumber);
    });
    it('should create a config hash', function () {
      plumber.should.have.property('config');
      plumber.config.should.be.type('object');
    });
    it('should create a websocket server', function () {
      plumber.should.have.property('_wsServer');
    });
    it('should create a tcp server', function () {
      plumber.should.have.property('_tcpServer');
      plumber._tcpServer.should.be.type('object');
      plumber._tcpServer.should.be.an.instanceOf(net.Server);
    });
    describe('when not given a tcp port', function () {
      it('should throw an error', function () {
        try {
          var plumber = new Plumber();
        } catch (e) {
          e.message.should.eql('No port defined for the tcp server');
        }
      });
    });
    describe('when not given a path', function () {
      it('should default to /sock', function () {
        var plumber = new Plumber({
          'tcp-port': 21000
        });
        plumber.config.should.have.property('path', '/sock');
      });
    });

  });
  describe('Events', function () {
    describe('when \'connection\' event is emitted', function () {
      it('should pass a websocket object');
      it('should pass a tcp socket object');
    });
  });
});