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
    console.log('DIALLING ELEPHANT');
    this._getSocket(callId).event_json('CHANNEL_ANSWER');
    this._getSocket(callId).filter('variable_conference', 'elephant');

    return this._getSocket(callId).api('conference ' + callId + '++flags{moderator} dial {conference=elephant}sofia/gateway/partner/' + address)
  }

  terminateCall(callId) {
    console.log('TERINATING ESL DIRECTLY:', callId);
    this._getSocket(callId).event_json('CHANNEL_HANGUP');
    this._getSocket(callId).filter('variable_conference_name',callId);
    return this._getSocket(callId).execute('conference ' + callId + ' hup all')
  }

}

module.exports = EslServer;
