const EventEmitter = require('events').EventEmitter;

module.exports = class CallDriver extends EventEmitter {

  constructor() {
    super();
  }

  createServer() {
    throw new Error('Not implemented');
  }

};
