const EventEmitter = require('events').EventEmitter;

class CallController extends EventEmitter {

	constructor(server) {
		super();
		this.server = server;
	}

	handle(callId) {
		this.server.answerCall(callId).then(() => {
			this.emit('call', callId)
		})
	}

	start(port) {
		const server = this.server.build((call) => this.handle(call));

		return new Promise((resolve, reject) => {
			server.on('listening', resolve)
			server.on('error', reject)
			server.listen(port)
		});
	}
}

module.exports = CallController;
