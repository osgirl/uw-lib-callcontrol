const EslServer = require('../../src/servers/esl');

const mockEslSocket = () => {
  stubbedSocket = {
    command: (command) => Promise.resolve(),
    api: (address) => Promise.resolve(),
    execute: (what, details) => Promise.resolve()
  };

  sinon.spy(stubbedSocket, 'command');
  sinon.spy(stubbedSocket, 'api');
  sinon.spy(stubbedSocket, 'execute');

  return stubbedSocket;
};

describe('EslServer', () => {
  /** var EslServer **/
  let callServer;

  beforeEach(() => {
    callServer = new EslServer();
  })

  it('can answer call when socket not yet registered', () => {
    callId = 1;
    const socket = mockEslSocket();

    return callServer.answerCall(callId, {socket})
      .then(() => socket.command.should.have.been.calledWith('answer'));
  })

  it('can answer call when socket already registered', () => {
    callId = 2;
    const socket = mockEslSocket();
    callServer._registerSocket(callId, socket);

    return callServer.answerCall(callId, {})
      .then(() => socket.command.should.have.been.calledWith('answer'));
  })

  it('can bridge call to address', () => {
    callId = 3;
    const socket = mockEslSocket();
    callServer._registerSocket(callId, socket);

    return callServer.bridgeCall(callId, 'some/address/')
      .then(() => socket.api.should.have.been.called);
  })

  it('can hold call', () => {
    callId = 4;
    const socket = mockEslSocket();
    callServer._registerSocket(callId, socket);

    return callServer.holdCall(callId)
      .then(() => socket.execute.should.have.been.called);
  })

  it('registers socket and answers call when call has started', () => {
    const callId = 5;
    const socket = mockEslSocket();

    callServer._driver.emit('call.started', {callId, socket});

    socket.command.should.have.been.calledWith('answer');
    callServer._getSocket(callId).should.equal(socket);
  })

  it('can terminate call', () => {
    callId = 6;
    const socket = mockEslSocket();
    callServer._registerSocket(callId, socket);

    return callServer.terminateCall(callId)
      .then(() => socket.api.should.have.been.called);
  })

})
