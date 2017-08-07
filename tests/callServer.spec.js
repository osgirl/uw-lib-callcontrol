const CallDriver = require('../src/callDriver');
const CallServer = require('../src/callServer');

const mockServer = () => {
  const stubbedServer = {
    listen: (port) => {},
    on: (eventName, func) => func()
  };

  sinon.spy(stubbedServer, 'listen');
  return stubbedServer;
}

const mockCallDriver = (serverCreatedByDriver) => {
  const stubbedDriver = new CallDriver();

  stubbedDriver.createServer = () => serverCreatedByDriver;
  sinon.spy(stubbedDriver, 'createServer');

  return stubbedDriver;
};

describe('CallServer', () => {
  /** var CallServer **/
  let callServer;
  /** var CallDriver **/
  let driver;
  let serverCreatedByDriver;

  beforeEach(() => {
    serverCreatedByDriver = mockServer();
    driver = mockCallDriver(serverCreatedByDriver);
    callServer = new CallServer(driver);

    callServer.answerCall = (callId) => Promise.resolve();
    callServer.holdCall = (callId) => Promise.resolve();
    callServer.bridgeCall = (callId, address) => Promise.resolve();

    sinon.spy(callServer, 'answerCall');
  })

  it('listens for calls on given port when started', async () => {
    await callServer.start(1234);

    driver.createServer.should.have.been.called;
    serverCreatedByDriver.listen.should.have.been.calledWith(1234);
  })

  it('answers call when it has started', () => {
      const callId = 1;
      const socket = {};
      
      driver.emit('call.started', {callId, socket});
      callServer.answerCall.should.have.been.calledWith(callId, {callId, socket});
  })

  // it('emits call.started event when the call has started!', async () => {
  //   let eventEmitted = false;
  //   callServer.on('call.started', callId => {
  //     eventEmitted = true;
  //     console.log('CALL STARTED EMITTED BY SERVER');
  //   })
  //
  //   return callServer.start(1234)
  //     .then(() => {
  //       const callId = 1;
  //       const socket = {};
  //
  //       driver.emit('call.started', {callId, socket});
  //       eventEmitted.should.be.true;
  //     })
  // })

})
