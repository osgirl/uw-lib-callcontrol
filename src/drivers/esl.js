const esl = require('esl');
const uuid = require('uuid');
const CallDriver = require('../driver');

class EslDriver extends CallDriver {

  constructor() {
    super();
    this.callRegistry = new Map();
  }

  answerCall(callId) {
    return this.callRegistry.get(callId).command('answer');
  }

  bridgeCall(callId, address) {
    return this.callRegistry.get(callId).api('conference ' + callId + '-${domain_name}++flags{moderator} dial sofia/gateway/partner/' + address)
  }

  holdCall(callId) {
    return this.callRegistry.get(callId).execute('conference', callId + '-${domain_name}@video-mcu-stereo++flags{mintwo}')
  }

  createServer(callHandler) {
    const register = (callId, socket) => {
      this.callRegistry.set(callId, socket);
    }
    const unregister = (callId) => {
      this.callRegistry.delete(callId);
    };
    const emitEnd = (callId) => this.emit('call.ended', callId);

    const eslServer = esl.server({all_events: true}, function () {
      const callId = uuid.v4();
      const socket = this;

      socket.on('CHANNEL_HANGUP', (...args) => {
        unregister(callId);
        emitEnd(callId);
      });

      register(callId, socket);
      callHandler(callId);
    });

    return eslServer;
  }

}

module.exports = EslDriver;
