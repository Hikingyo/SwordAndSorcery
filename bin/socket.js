"use strict";
/**
 * Created by hikingyo on 15/01/17.
 */

const debug = require('debug');
const socketDebug = debug('SAS:socket');
//var parser = require('./message-parser');
const io = require("socket.io")();
const GameService = require('./GameService');
const _gameservice = new GameService();

function SwSsocket(srv, opts) {
	socketDebug("Socket on air");
	io.attach(srv, opts);
	return io;

}

/**
 * Event listener for socket
 */

function _onDisconnect() {
	socketDebug('user disconnected');
	this.handshake.session.isConnected = false;
	this.handshake.session.save();
}

/**
 * Check if user have already a valide session
 * @private
 */
function _userIncoming() {
	socketDebug('User incoming');
	// check if already a user for the session
	if (_checkSession(this)) {
		let user = this.handshake.session.user;
		this.handshake.session.isConnected = true;
		let node = _gameservice.getNode(this.handshake.session.actualNode, this.handshake.session.actualNodeData);
		this.handshake.session.save();
		this.emit('alreadyLogged', {user: JSON.stringify(user)});
		// TODO remove the emit to gameservice. Add possible action to avoid hack
		this.emit('nextNode', JSON.stringify(node));
	}
	else {
		this.emit('notLogged');
	}
}

function _addUser(username) {
	// Creating a new user and store him in session
	const user = _gameservice.createUser(username);
	this.handshake.session.user = user;
	this.handshake.session.isConnected = true;
	// Get the first node of the game
	const node = _gameservice.getNode('Welcome', {userName: user.getName});
	this.handshake.session.actualNode = node.name;
	this.handshake.session.actualNodeData = {userName: user.name};
	// We store the possible user action to prevent hack
	this.handshake.session.possibleAction = node.useractions;
	this.handshake.session.save();
	// Then emit to client
	this.emit('connected', {user: JSON.stringify(user)});
	this.emit('nextNode', JSON.stringify(node));
}


function _userAction(data) {
	// TODO security check from session.useractions
	const userAction = _gameservice.userAction(data);
	if (!userAction) {
		socketDebug('[socket._userAction] Bad action requested ' + data.event);
		this.emit('SASerror', 'Bad action requested');
	}
	else{
		this.handshake.session.actualNode = userAction.data.name;
		this.handshake.session.actualNodeData = {};
		// We store the possible user action to prevent hack
		this.handshake.session.possibleAction = userAction.data.useractions;
		this.handshake.session.save();
		this.emit(userAction.event, JSON.stringify(userAction.data));
	}
}

/**
 * Check if player was ingame
 * @returns {boolean}
 * @private
 */
function _checkSession(socket) {
	socket.handshake.session.reload((err) => {
		if (err !== undefined) {
			socketDebug('[socket.handshake] : ' + err);
		}
	});
	if (typeof socket.handshake.session.user !== 'undefined') {
		socketDebug('User already connected');
		return true;
	}
	return false;
}

/**
 * Add listeners to the socket
 */

io.on('connection', (socket) => {
	socketDebug('Socket connected');
	socket.on('disconnect', _onDisconnect);
	socket.on('userIncoming', _userIncoming);
	socket.on('action', _userAction);
	socket.on('add user', _addUser);
});

module.exports = SwSsocket;
