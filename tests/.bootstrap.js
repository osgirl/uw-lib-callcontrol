process.env.NODE_ENV = 'test';

global.sinon = require('sinon');
const chai = require('chai');

chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));

global.expect = chai.expect;
global.should = chai.should();