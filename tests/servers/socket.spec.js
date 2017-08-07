const CallDriver = require('../../src/callDriver');
const SocketServer = require('../../src/servers/socket');

describe('SocketServer', () => {
  /** var SocketServer **/
  let callServer;
  /** var CallDriver **/
  let driver;

  beforeEach(() => {
    driver = new CallDriver();
    callServer = new SocketServer(driver);

    callServer.answerCall = (callId) => Promise.resolve();

    sinon.spy(callServer, 'answerCall');
  })

  it('does not have any sockets registered when created', () => {
    callServer._socketRegistry.size.should.equal(0);
  })

  it('registers socket when call has started', () => {
    driver.emit('call.started', {callId: 123, socket: 'socket'});

    callServer._socketRegistry.size.should.equal(1);
    callServer._getSocket(123).should.equal('socket');

    driver.emit('call.started', {callId: 124, socket: 'socket2'});

    callServer._socketRegistry.size.should.equal(2);
    callServer._getSocket(124).should.equal('socket2');
  })

  it('unregisters socket when call has ended', () => {
    driver.emit('call.started', {callId: 123, socket: 'socket'});
    driver.emit('call.started', {callId: 124, socket: 'socket2'});
    driver.emit('call.ended', 123);

    callServer._socketRegistry.size.should.equal(1);
    expect(callServer._getSocket(123)).to.be.undefined;
    callServer._getSocket(124).should.equal('socket2');
  })
})