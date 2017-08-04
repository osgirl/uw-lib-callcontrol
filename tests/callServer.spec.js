const net = require('net');
const MockSocketDriver = require('../src/drivers/mockSocket');
const CallDriver = require('../src/callDriver');
const CallServer = require('../src/callServer');

const mockCall = (serverPort) => {
	const conn = new net.Socket();
	const span = 1;//(Math.floor(Math.random() * (10000 - 5000)) + 5000) * 2;

	conn.on('connect', () => {
		setTimeout(() => {
			conn.destroy();
		}, span)
	});

	conn.on('error', (e) => {throw new Error('mock call error')});
	conn.connect(serverPort);

	return conn;
};

describe('CallServer', () => {
	/** var CallServer **/
	let server;
	/** var CallDriver **/
	let driver;

	beforeEach(() => {
		driver = new MockSocketDriver();
		server = new CallServer(driver);
	})

	// it('starts to listen and answer calls', () => {
	// 	let eventEmitted = false;
	//
	// 	server.on('call.started', () => {
	// 		eventEmitted = true;
	//
	// 		console.log('EVENT EMITTED');
	// 	})
	//
	// 	return server.start(8082)
	// 		.then(() => {
	// 			mockCall(8082);
	// 		})
	// 		.then(() => {
	// 			eventEmitted.should.be.false;
	// 			console.log('HERE');
	// 		});
	// });

	it('starts to listen and answer calls', async() => {
		server.on('call.started', () => {
			console.log('EVENT EMITTED');
		})

		await server.start(8082);

		mockCall(9999);

		console.log('END');
	});
})