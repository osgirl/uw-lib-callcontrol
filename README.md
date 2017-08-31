[![CircleCI](https://circleci.com/gh/utilitywarehouse/uw-lib-callcontrol.svg?style=svg)](https://circleci.com/gh/utilitywarehouse/uw-lib-callcontrol)

# uw-lib-callcontrol
Voice call servers

# Purpose
The library simplifies the development of telephony related applications in node.js by abstracting a CallServer.  
Additionally, it abstracts a socket CallServer.

It also provides some concrete implementations of the CallServer --- currently, two: ESL and MockSocket.

# ESL (FreeSWITCH Event Socket Library) CallServer
ESL CallServer implements FreeSWITCH Socket Outbound protocol to manage FreeSWITCH PBX: 
https://freeswitch.org/confluence/display/FREESWITCH/Event+Socket+Outbound

# MockSocket CallServer
Provides the developer with an environment, where a call is represented as a web socket, without the need for an actual 
media server in place.

# Supported methods
A CallServer can perform the following:

 - `start(port)` --- starts listening on the _port_,
 - `answerCall(callId, additionalArgs)` --- answers the incoming call request for further processing,
 - `holdCall(callId)` --- puts the call on hold until next instructions appear,
 - `bridgeCall(callId, address)` --- bridges the existing call with remote destination _address_,
 - `terminateCall(callId)` --- terminates the active call,

TODO:
 - `transferCall(callId, address)` --- forwards the active call to another destination,
 - `say(text)` --- pronounces the text into the voice channel.

# Events
CallServer emits the following events with the value of call ID:

 - `call.started` --- on an incoming call; the CallServer automatically answers that call, prior to emitting the event;
 - `call.bridged` --- when the call has been bridged to a remote destination;
 - `call.ended` --- when the call has been terminated.

Use `CallServer.on(EVENT_NAME, (callId) => { /* what to do */ })` to listen for an event and act whenever it occurs.

# Tests
Tests can be found in the tests/ folder: `make test` or `make test-coverage` to run them.

# Example usage
```
const callServer = new EslServer();   

callServer.start(8082);   

callServer.on('call.started', async (callId) => {
  log('Call started:', callId);
  await callServer.holdCall(callId);
});   
```
