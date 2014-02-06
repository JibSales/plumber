/*  
 *  Plumber
 *  Proxies TCP sockets to Websockets
 *
 *  Copyright (c) 2014 JibSales <sean@jibsales.com>
 */

 // -- Load native modules
var net = require('net');
var util = require ("util");
var events = require('events');

// -- Load npm modules
var sockjs = require('sockjs');
var async = require('async');

/*
 *  Create and export our main Bridge object
 */
var Plumber = function (config) {
  this.config = config || {};
  events.EventEmitter.call(this);
  this.init();
}

// -- Inherit from EventEmitter
util.inherits(Plumber, events.EventEmitter);

// -- Our init function
Plumber.prototype.init = function () {
  this.emit('hello');
  this._tcp = net.createServer();
  this._ws = sockjs.createServer();
}

Plumber.prototype.hello = function () {
  // this.emit('hello');
}

// -- Hoist #installHandlers()
Plumber.prototype.install = function (server) {
  this._ws.installHandlers(server, { prefix: this.config['path'] || '/sock' });
}

// -- Start the TCP server
Plumber.prototype.start = function () {
  if (!this.config['tcp-port']) throw new Error('No port defined for the tcp server');
  this._tcp.listen(this.config['tcp-port']);
}

// -- Define Exports API
module.exports = Plumber;