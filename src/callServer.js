const EventEmitter = require('events').EventEmitter;

class CallServer extends EventEmitter {

  constructor(driver) {
    super();
    this.driver = driver;

    this.driver.on('call_end', (callId) => {
      this.emit('call_end', callId);
    })
  }

	answerCall(callId) {
    return this.driver.answerCall(callId);
  }

	bridgeCall(callId, address) {
    return this.driver.bridgeCall(callId, address);
	}

	holdCall(callId) {
    return this.driver.holdCall(callId);
	}

	build(func) {
    return this.driver.createServer(func);
	}
}

module.exports = CallServer;
