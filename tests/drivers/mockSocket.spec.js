const MockSocketDriver = require('../../src/drivers/mockSocket');
const net = require('net');

const createSocketClient = () => {
	return new net.Socket();
}


describe('MockSocketDriver', () => {
  /** var MockSocketDriver **/
  let callDriver;

  beforeEach(() => {
    callDriver = new MockSocketDriver();
  })

  it('can create server', () => {
    const result = callDriver.createServer();

    expect(result).to.be.an('object');
    expect(result.listen).to.be.a('function');
    expect(result.on).to.be.a('function');
  })



  it('emits call.started if there is a succesful socket connection', (done) => {
    const server = callDriver.createServer();
    const socketPort = 1234;
    server.listen(socketPort);

    const socketClient = createSocketClient();

    callDriver.on('call.started', () => {
      server.close();
      socketClient.destroy();
      done();
    });
    socketClient.connect(socketPort)
  })

  it('fail to emit call.started if there is a unsuccesful socket connection', (done) => {
    const server = callDriver.createServer();
    server.listen(1234);

    const socketClient = createSocketClient();

    socketClient.on('error', (e) => {
      server.close();
      done();
    });
    socketClient.connect(1235);
  })

  it.only('emits call.ended event on the socket end', (done) => {
    const server = callDriver.createServer();
    const socketPort = 1234;
    server.listen(socketPort);

    const socketClient = createSocketClient();

    callDriver.on('call.ended', () => {
      server.close();
      done();
    });

    socketClient.connect(socketPort);
    socketClient.destroy();

  })



})
