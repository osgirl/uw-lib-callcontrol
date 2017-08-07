const EslDriver = require('../../src/drivers/esl');

describe('EslDriver', () => {
  /** var EslDriver **/
  let callDriver;

  beforeEach(() => {
    callDriver = new EslDriver();
  })

  it('can create server', () => {
    const result = callDriver.createServer();

    expect(result).to.be.an('object');
    expect(result.listen).to.be.a('function');
    expect(result.on).to.be.a('function');
  })
})