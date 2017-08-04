const EventEmitter = require('events').EventEmitter;

module.exports = class CallDriver extends EventEmitter {

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

  createServer(callHandler) {
		throw new Error('Not implemented');
  }

};
