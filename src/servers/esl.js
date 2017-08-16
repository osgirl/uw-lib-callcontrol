const EslDriver = require('../drivers/esl');
const SocketServer = require('./socket');

class EslServer extends SocketServer {

  constructor() {
    super(new EslDriver());
  }

  answerCall(callId, {socket}) {
    socket = socket || this._getSocket(callId);
    return socket.command('answer');
  }

  holdCall(callId) {
    return this._getSocket(callId).execute('conference', callId + '@video-mcu-stereo++flags{mintwo}')
  }

  bridgeCall(callId, address) {
    return this._getSocket(callId).api('conference ' + callId + '++flags{moderator} dial sofia/gateway/partner/' + address)
  }

  terminateCall(callId) {
    return this._getSocket(callId).api('conference ' + callId + ' hup all')
  }

}

module.exports = EslServer;
