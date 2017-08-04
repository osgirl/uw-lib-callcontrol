const CallDriver = require('../callDriver');

class SocketDriver extends CallDriver {

	constructor() {
		super();
		this.callRegistry = new Map();
	}

	_register(callId, socket) {
		this.callRegistry.set(callId, socket);
	}

	_unregister(callId) {
		this.callRegistry.delete(callId);
	}

	_getSocket(callId) {
		return this.callRegistry.get(callId);
	}
}

module.exports = SocketDriver;