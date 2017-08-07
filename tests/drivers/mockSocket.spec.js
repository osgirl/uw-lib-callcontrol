const MockSocketDriver = require('../../src/drivers/mockSocket');

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
})