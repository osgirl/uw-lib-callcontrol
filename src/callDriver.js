const EventEmitter = require('events').EventEmitter;

module.exports = class CallDriver extends EventEmitter {

  constructor() {
    super();
  }

  createServer(callHandler) {
    throw new Error('Not implemented');
  }

};
