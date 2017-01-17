const express = require("express");
let main = express.Router();

/* GET home page. */
main.get('/', function (req, res, next) {
	res.render('index', {title: 'S&S'});
});

module.exports = main;
