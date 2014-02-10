/*  
 *  Plumber
 *  Proxies TCP sockets to Websockets
 *
 *  Copyright (c) 2014 JibSales <sean@jibsales.com>
 */

 // -- Load native modules
var net = require('net');
var http = require('http');
var util = require ("util");
var events = require('events');

// -- Load npm modules
var sockjs = require('sockjs');
var async = require('async');

// -- Load local modules
var Framer = require('./framer');

/*
 *  Create and export our main Bridge object
 */
var Plumber = function (config) {

  var self = this;

  // -- Set configuration
  this.config = config || {};
  // if (!this.config['tcp-port']) throw new Error('No port defined for the tcp server');
  this.config['path'] = this.config['path'] || '/sock';

  // -- Extend EventEmitter
  events.EventEmitter.call(this);
  
  // -- Create SockJS server
  this.clients = [];
  this._wsServer = sockjs.createServer();
  this._wsServer.on('connection', this._wsHandler.bind(this));
}

// -- Inherit from EventEmitter
util.inherits(Plumber, events.EventEmitter);

// -- 
Plumber.prototype._tcpHandler = function (sock) {
  this.tcp = sock;
  this.ws.pipe(this.tcp, { end: false });
  this.tcp.pipe(new Framer()).pipe(this.ws, { end: false });
}

Plumber.prototype._wsHandler = function (socket) {

  var self = this;

  // socket.on('data', function (data) {
  //   var message = JSON.parse(data);
    // if ('init' === message.event) {
      var client = {};
      client.ws = socket;
      client._tcpServer = net.createServer(self._tcpHandler.bind(client));
      client._tcpServer.listen(self.config['tcp-port'] || 0, function () {
        self.emit('ready', client);
      });
      self.clients.push(client);
  //   }
  // });

  // -- Clean up when socket closes
  socket.on('close', function () {
    var index = self.clients.indexOf(this);
    var client = self.clients.splice(index, 1).pop();
    client._tcpServer.close();
  });

}

// -- Hoist #installHandlers()
Plumber.prototype.install = function (server) {
  this._wsServer.installHandlers(server, { prefix: this.config['path'] });
}

// -- Define Exports API
module.exports = Plumber;