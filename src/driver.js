

module.exports = class Driver {

  registerCall(callId) {
    throw new Error('Not implemented');
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
