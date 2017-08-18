const esl = require('esl');
const uuid = require('uuid');
const CallDriver = require('../callDriver');

class EslDriver extends CallDriver {

  constructor() {
    super();
  }

  createServer() {
    const emitStart = (callId, socket) => this.emit('call.started', {callId, socket});
    const emitEnd = (callId) => this.emit('call.ended', callId);
    const emitBridged = (callId) => this.emit('call.bridged', callId);

    return esl.server({all_events: true}, function () {
      const callId = uuid.v4();
      const socket = this;

      socket.on('CHANNEL_HANGUP', (...args) => {
        emitEnd(callId);
      });

      socket.on('CHANNEL_ANSWER', (...args) => {
        emitBridged(callId);
      });

      emitStart(callId, socket);
    });
  }

}

module.exports = EslDriver;
