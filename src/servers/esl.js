const EslDriver = require('../drivers/esl');
const CallServer = require('../callServer');

module.export = class EslServer extends CallServer {

  constructor() {
    super(new EslDriver());
  }

}
