const EventEmitter = require('events').EventEmitter;

class CallServer extends EventEmitter {

  constructor(driver) {
    super();
    this._driver = driver;

    this._driver.on('call.started', (args) => this._acceptCall(args));

    this._driver.on('call.ended', (callId) => {
      this.emit('call.ended', callId);
    })

    this._driver.on('call.bridged', (callId) => {
      this.emit('call.bridged', callId);
    })

  }

  _acceptCall(args) {
    const { callId } = args;

    return this.answerCall(callId, args)
      .then(() => {
        this.emit('call.started', callId);
      });
  }

  answerCall(callId, args) {
    throw new Error('Not implemented');
  }

  bridgeCall(callId, address) {
    throw new Error('Not implemented');
  }

  holdCall(callId) {
    throw new Error('Not implemented');
  }

  terminateCall(callId) {
    throw new Error('Not implemented');
  }

  start(port) {
    const server = this._driver.createServer();

    return new Promise((resolve, reject) => {
      server.on('listening', resolve);
      server.on('error', reject);
      server.listen(port);
    });
  }
}

module.exports = CallServer;
