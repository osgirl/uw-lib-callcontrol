const esl = require('esl');
const uuid = require('uuid');
const Driver = require('../driver');

class EslDriver extends Driver {

  constructor() {
    super();
    this.callRegistry = new Map();
  }

  answerCall(callId) {
    return this.callRegistry[callId].command('answer');
  }

  bridgeCall(callId, address) {
    return this.callRegistry[callId].api('conference ' + callId + '-${domain_name}++flags{moderator} dial sofia/gateway/partner/' + address)
  }

  holdCall(callId) {
    return this.callRegistry[callId].execute('conference', callId + '-${domain_name}@video-mcu-stereo++flags{mintwo}')
  }

  createServer(func) {
    const register = (callId, socket) => {
      this.callRegistry.set(callId, socket);
    }
    const unregister = (callId) => {
      this.callRegistry.delete(callId);
    };
    const emitEnd = (callId) => this.emit('call_end', callId);

    const eslServer = esl.server({all_events: true}, function () {
      const callId = uuid.v4();
      const socket = this;

      socket.on('CHANNEL_HANGUP', (...args) => {
        unregister(callId);
        emitEnd(callId);
      });

      register(callId, socket);
      func(callId);
    });

    return eslServer;

  }

}

module.exports = EslDriver;
