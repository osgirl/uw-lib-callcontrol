const MockSocketDriver = require('../drivers/mockSocket');
const SocketServer = require('./socket');

class MockSocketServer extends SocketServer {

  constructor() {
    super(new MockSocketDriver());
  }

  answerCall(callId, {socket}) {
    socket = socket || this._getSocket(callId);
    return Promise.resolve(socket.write(`Answering ${callId}\n`, "utf8"));
  }

  bridgeCall(callId, address) {
    const socket = this._getSocket(callId);
    socket.write(`Bridging ${callId} to ${address}\n`, "utf8");
    socket.emit('call.bridged');
  }

  holdCall(callId) {
    const socket = this._getSocket(callId);
    socket.write(`Holding ${callId}\n`, "utf8");
  }

  terminateCall(callId) {
    const socket = this._getSocket(callId);
    socket.end();
  }

}

module.exports = MockSocketServer;
