const EventEmitter = require('events').EventEmitter;

module.exports = class Driver extends EventEmitter {

  constructor() {
    super();
  }

	answerCall(callId) {
		throw new Error('Not implemented');
	}

	bridgeCall(callId, address) {
		throw new Error('Not implemented');
	}

	holdCall(callId) {
		throw new Error('Not implemented');
	}

  createServer(handler) {
		throw new Error('Not implemented');
  }

};
