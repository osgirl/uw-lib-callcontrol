const net = require('net');
const uuid = require('uuid');
const CallDriver = require('../callDriver');

class MockSocketDriver extends CallDriver {

  constructor() {
    super();
  }

  createServer() {
    return net.createServer((socket) => {
      const callId = uuid.v4();

      socket.on('end', () => {
        this.emit('call.ended', callId);
      })

      socket.on('call.bridged', () => {
        this.emit('call.bridged', callId);
      })

      this.emit('call.started', {callId, socket});

    });
  }

}

module.exports = MockSocketDriver;
