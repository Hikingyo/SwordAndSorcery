"use strict";
/**
 * Created by hikingyo on 15/01/17.
 */

const debug  = require('debug');
const socketDebug = debug('SAS:socket');
//var parser = require('./message-parser');
const io = require("socket.io")();
const User = require('./../Entity/User');

function SwSsocket(srv, opts){
	socketDebug("Socket on air");
	io.attach(srv, opts);
	return io;

}

/**
 * Event listener for socket
 */

function _onDisconnect(){
	socketDebug('user disconnected');
}

function _addUser (username){
	let user;
	socketDebug('New user named "' + username + '"');
	// check if already a user for the session
	if(this.handshake.session.user !== 'undefined'){
		// we store User in the socket session for this client
		user = new User(username);
		this.handshake.session.user = user;
	}
	else{
		user = this.handshake.session.user;
	}
	this.emit('logged', {user : JSON.stringify(user)});
	this.handshake.session.save();
}

function _userAction(actionType, ...args){

}

/**
 * Add listeners to the socket
 */

io.on('connection', (socket) =>{
	socket.addedUser = false;

	socketDebug('Socket connected');
	socket.on('disconnect', _onDisconnect);
	socket.on('add user',_addUser);
	socket.on('action', _userAction);
});

module.exports = SwSsocket;
