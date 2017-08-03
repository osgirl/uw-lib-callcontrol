const EventEmitter = require('events').EventEmitter;

class CallController extends EventEmitter {

	constructor(driver) {
		super();
		this.driver = driver;

    this.driver.on('call_end', (callId) => {
      this.emit('call_end', callId);
    })
	}

	answerCall(callId) {
		this.driver.answerCall(callId).then(() => {
			this.emit('call', callId);
		})
	}

  bridgeCall(callId, address) {
    return this.driver.bridgeCall(callId, address);
	}

	holdCall(callId) {
    return this.driver.holdCall(callId);
	}

	startServer(port) {
		const server = this.driver.createServer(
      (call) => this.answerCall(call)
    );

		return new Promise((resolve, reject) => {
			server.on('listening', resolve)
			server.on('error', reject)
			server.listen(port)
		});
	}
}

module.exports = CallController;
