#!/usr/bin/env/node
"use strict";

const app = require('../app');
const http = require('http');
const debug = require('debug');
const serverDebug = debug('SAS:server');
const SwSsocket = require('./socket');
const sharedsession = require("express-socket.io-session");


function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}
/**
 * Get port used from environment ans store in Express
 */

const port = normalizePort(process.env.PORT || 3000);

app.set("port", port);

/**
 * Security check point
 */
app.disable('x-powered-by');
app.set('trusty proxy', 1);

/**
 * Create the HTPP server
 */

const httpServer = http.createServer(app);

/**
 * Create Socket Handler
 */
const session = app.getSession();
const cookieParser = app.getCookieParser();
const socketHandler = SwSsocket(httpServer);
socketHandler.use(sharedsession(session, cookieParser, {}));

/**
 * Listen on provided port, on all interfaces.
 */

httpServer.listen(port);

httpServer.on('error', _onError);
httpServer.on('listening', _onListening);

/**
 * Event Listener for HTPP Server
 */

function _onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific error with message
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' require elevated privileges.');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use.');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function _onListening(){
	let addr = httpServer.address();
	let bind = typeof addr === 'string' ? 'Pipe ' + addr : 'Port ' + addr.port;
	serverDebug('Listening on port' + bind);
}

