const esl = require('esl');
const uuid = require('uuid');
const Driver = require('../driver');

class EslDriver extends Driver {

  constructor() {
    this.callRegistry = {};
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
      this.callRegistry[callId] = socket;
    }

    const eslServer = esl.server({all_events: true}, () => {
      const socket = this;
      const callId = uuid.v4();
      register(callId, socket);
      func(callId);
    });

    return eslServer;

  }

}

module.exports = EslDriver;
