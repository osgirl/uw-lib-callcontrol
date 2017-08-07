const MockSocketDriver = require('../drivers/mockSocket');
const SocketServer = require('./socket');

class MockSocketServer extends SocketServer {

  constructor() {
    super(new MockSocketDriver());
  }

  answerCall(callId, {socket}) {
    const socket = socket || this._getSocket(callId);
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

}

module.exports = MockSocketServer;