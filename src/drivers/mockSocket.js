const net = require('net');
const uuid = require('uuid');
const SocketDriver = require('./socket');

class MockSocketDriver extends SocketDriver {

	constructor() {
		super();
	}

	answerCall(callId) {
		const socket = this._getSocket(callId);
		return Promise.resolve(socket.write(`Answering ${callId}\n`, "utf8"));
	}

	bridgeCall(callId, address) {
		const socket = this._getSocket(callId);
		return Promise.resolve(socket.write(`Bridging ${callId} to ${uri}\n`, "utf8"));
	}

	holdCall(callId) {
		const socket = this._getSocket(callId);
		return Promise.resolve(socket.write(`Holding ${callId}\n`, "utf8"));
	}

	createServer(callHandler) {
		return net.createServer((socket) => {
			const callId = uuid.v4();

			this._register(callId, socket);
			callHandler(callId);
		});
	}

}

module.exports = MockSocketDriver;