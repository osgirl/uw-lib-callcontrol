# uw-lib-callcontrol
Library for simplifying voice calls usage in projects

# Purpose
The library brings simplicity to development telephony related applications in node.js.
You can use CallServer() and one of two supported drivers: ESL and Socket.

# ESL (Freeswitch Event Socket Library)
ESL driver implements Freeswitch Socket Outbound protocol to manage Freeswitch PBX: https://freeswitch.org/confluence/display/FREESWITCH/Event+Socket+Outbound

# Socket
A call can be represented as a web socket, and it  lets the developer have environment without need to have the actual media server in place.

# Supported methods
The CallServer performs the following:
 - start(_port_) - start the server listening on the _port_,
 - answerCall(callId) - answers the incoming call request for further processing,
 - holdCall(callId) - puts the call on hold until the next instructions appear,
 - bridgeCall(callId, _address_) - bridges the existing call with remote destination _address_,

TODO:
 - hangupCall(callId) - terminates the active call,
 - transfer(callId, address) - forward active call to another destination,
 - say(text) - text to speech engine will pronounce the text into the voice channel.

# Events
use CallServer.on(EVENT_NAME) in the code:

 - call.started
 - call.ended

 TODO:
 - call.answered

# Tests
Tests can be found in the tests/ folder: `make test` or `make test-coverage`

# Example usage
```
const port = process.env.CALL_SERVER_PORT || 8082;
eslServer.start(port);

eslServer.on("call.started", async (callId) => {
	await eslServer.holdCall(callId);
	const call = new Call(callId);

	eslServer.on('call.ended', (callId) => {
			console.log('the call has ended: ', callId);
	})
});
```

# Ready examples
Working example with ESL can be found here:
https://github.com/utilitywarehouse/uw-callqueue-framework/blob/poc-with-lib-callcontrol/examples/eslServer.js

Working example with Sockets can be found here:
https://github.com/utilitywarehouse/uw-callqueue-framework/blob/poc-with-lib-callcontrol/examples/sockets.js
