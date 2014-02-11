/*  
 *  Frame Parser
 *  Frames packets delimited by an optional character
 *
 *  Copyright (c) 2014 JibSales <sean@jibsales.com>
 */

// -- Load native modules
var stream = require('stream');
var util = require('util');

var Framer = module.exports = function (config) {
  this.config = config || {};
  this.config['delimiter'] = this.config['delimiter'] || '\n';
  stream.Transform.call(this);
}

util.inherits(Framer, stream.Transform);

// -- Frame parsing logic
Framer.prototype._transform = function (chunk, encoding, callback) {
  // Create an in memory buffer of incoming packets
  this.buffer = this.buffer ? this.buffer : '';
  
  // Collect data to parse
  var data = this.buffer + chunk.toString();
  
  // Split by delimiter
  var split = data.split(this.config['delimiter']);

  // Reconstruct the buffer
  this.buffer = split.pop();

  // Push each frame down the tube
  var self = this;
  split.forEach(function (frame) { 
    self.push(frame); 
  });

  // Continuation
  callback();
};

// -- Dump the buffer when the stream ends
Framer.prototype._flush = function (callback) {
  this.push(this.buffer);
  callback();
}