const MockSocketDriver = require('../drivers/mockSocket');
const CallServer = require('../callServer');

class MockSocketServer extends CallServer {

	constructor() {
		super(new MockSocketDriver());
	}
}

module.exports = MockSocketServer;