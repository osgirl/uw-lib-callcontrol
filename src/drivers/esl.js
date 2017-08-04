const esl = require('esl');
const uuid = require('uuid');
const SocketDriver = require('./socket');

class EslDriver extends SocketDriver {

  constructor() {
    super();
  }

  answerCall(callId) {
    return this._getSocket(callId).command('answer');
  }

  bridgeCall(callId, address) {
    return this._getSocket(callId).api('conference ' + callId + '-${domain_name}++flags{moderator} dial sofia/gateway/partner/' + address)
  }

  holdCall(callId) {
    return this._getSocket(callId).execute('conference', callId + '-${domain_name}@video-mcu-stereo++flags{mintwo}')
  }

  createServer(callHandler) {
    const register = (callId, socket) => {
      this._register(callId, socket);
    }
    const unregister = (callId) => {
      this._unregister(callId);
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
