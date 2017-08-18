const MockSocketServer = require('../../src/servers/mockSocket');

const mockSocket = () => {
  stubbedSocket = {
    write: (text, encoding) => Promise.resolve(),
    end: () => Promise.resolve(),
    emit: () => Promise.resolve()
  };
  sinon.spy(stubbedSocket, 'write');
  sinon.spy(stubbedSocket, 'end');

  return stubbedSocket;
};

describe('MockSocketServer', () => {
  /** var MockSocketServer **/
  let callServer;

  beforeEach(() => {
    callServer = new MockSocketServer();
  })

  it('can answer call when socket not yet registered', () => {
    callId = 1;
    const socket = mockSocket();

    return callServer.answerCall(callId, {socket})
      .then(() => socket.write.should.have.been.calledWith('Answering 1\n'));
  })

  it('can answer call when socket already registered', () => {
    callId = 2;
    const socket = mockSocket();
    callServer._registerSocket(callId, socket);

    return callServer.answerCall(callId, {})
      .then(() => socket.write.should.have.been.calledWith('Answering 2\n'));
  })

  it('can bridge call to address', () => {
    callId = 3;
    const socket = mockSocket();
    callServer._registerSocket(callId, socket);

    return callServer.bridgeCall(callId, 'some/address/')
      .then(() => socket.write.should.have.been.calledWith('Bridging 3 to some/address/\n'));
  })

  it('can hold call', () => {
    callId = 4;
    const socket = mockSocket();
    callServer._registerSocket(callId, socket);

    return callServer.holdCall(callId)
      .then(() => socket.write.should.have.been.calledWith('Holding 4\n'));
  })

  it('registers socket and answers call when call has started', () => {
    const callId = 5;
    const socket = mockSocket();

    callServer._driver.emit('call.started', {callId, socket});

    socket.write.should.have.been.called;
    callServer._getSocket(callId).should.equal(socket);
  })

  it('can terminate call', () => {
    callId = 6;
    const socket = mockSocket();
    callServer._registerSocket(callId, socket);

    return callServer.terminateCall(callId)
      .then(() => socket.end.should.have.been.called);
  })

})
