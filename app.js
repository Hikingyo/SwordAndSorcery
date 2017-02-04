/**
 * Created by hikingyo on 15/12/16.
 */
"use strict";

const express = require("express");
let session = require("express-session");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')('th3BetterG4meEveR');
const less_middleware = require("less-middleware");
const main = require("./controllers/main");
const users = require("./controllers/users");
const session_file_store = require("session-file-store");

const fileStore = session_file_store(session);
const app = express();

// Session handler setup
session = app.use(session({
	store: new fileStore(),
	secret: 'th3BetterG4meEveR',
	name: 'swordandsorcery',
	resave: true,
	proxy: undefined,
	saveUninitialized: true,
	cookie: {
		path: '/',
		httpOnly: true,
		secure: false,
		maxAge: null
	}
}));
let views_path = 'public';
// View Engine Setup
if(app.get('env') === 'dev'){
	views_path = 'views';
}
app.set('views', path.join(__dirname, views_path));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser);
//app.use(less_middleware(path.join(__dirname, 'resources')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// Setup routing
app.use('/', main);
app.use('/users', users);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	let err = new Error('Not Found');
	next(err);
});

/* Error Handler */

// Development error handler, will print stack trace
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// Production error handler, no stracktraces leaked to user
// TODO serve error_xx page
else {
	app.use((err, req, res, next) => {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}

app.getSession = function () {
	return session;
};

app.getCookieParser = function () {
	return cookieParser;
};

module.exports = app;
