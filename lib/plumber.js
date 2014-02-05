/*  
 *  Bridge
 *  Connects a Sockjs server to a TCP socket server
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
var Bridge = function (config) {
  this.config = config || {};
  this.init();
}

// -- Inherit from EventEmitter
util.inherits(Bridge, events.EventEmitter);

// -- Our init function
Bridge.prototype.init = function () {
  var self = this;

  async.parallel({
    tcp: function (done) {
      self._tcp = net.createServer().on('connection', function (sock) {
        self.emit('tcp::connection', sock);
        done(null, sock);
      }).on('close', function () {
        self.emit('tcp::close');
      });;
    },
    ws: function (done) {
      self._ws = sockjs.createServer().on('connection', function (sock) {
        self.emit('tcp::connection', sock);
        done(null, sock);
      }).on('close', function () {
        self.emit('ws::close');
      });;
    }
  }, function (err, sockets) {
    self.sockets = sockets;
    self.emit('connection', sockets);
  });

}

// -- Hoist #installHandlers()
Bridge.prototype.install = function (server) {
  this._ws.installHandlers(server, { prefix: this.config['path'] });
}

// -- Start the TCP server
Bridge.prototype.start = function () {
  this._tcp.listen(this.config['tcp-port']);
}

// -- Define Exports API
module.exports = Bridge;