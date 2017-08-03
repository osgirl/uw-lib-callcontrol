

class CallServer {

  constructor(driver) {
    this.driver = driver;
  }

	answerCall(callId) {
    return this.driver.answer(callId);
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
