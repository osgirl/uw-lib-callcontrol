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
    this._getSocket(callId).event_json('CHANNEL_HANGUP');
    this._getSocket(callId).filter('variable_conference_name', callId);
    return this._getSocket(callId).execute('conference', callId + '@video-mcu-stereo++flags{mintwo}')
  }

  bridgeCall(callId, address) {
    this._getSocket(callId).event_json('CHANNEL_ANSWER');
    this._getSocket(callId).filter('variable_conference', callId);
    return this._getSocket(callId).bgapi('conference ' + callId + '++flags{moderator} dial {conference=' + callId + '}sofia/gateway/partner/' + address)
  }

  terminateCall(callId) {
    return this._getSocket(callId).execute('conference ' + callId + ' hup all')
  }

}

module.exports = EslServer;
