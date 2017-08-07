const CallServer = require('../callServer');

class SocketServer extends CallServer {

  constructor(driver) {
    super(driver);
    this._socketRegistry = new Map();

    this.driver.on('call.started', ({callId, socket}) => {
      this._registerSocket(callId, socket);
    });

    this.driver.on('call.ended', (callId) => {
      this._unregisterSocket(callId);
    });
  }

  _registerSocket(callId, socket) {
    this._socketRegistry.set(callId, socket);
  }

  _unregisterSocket(callId) {
    this._socketRegistry.delete(callId);
  }

  _getSocket(callId) {
    return this._socketRegistry.get(callId);
  }
}

module.exports = SocketServer;