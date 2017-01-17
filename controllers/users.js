/**
 * Created by hikingyo on 15/12/16.
 */
const express = require("express");
"use strict";
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

module.exports = router;
