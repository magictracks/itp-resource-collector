var express = require('express');
var router = express.Router();
// var db = require("../models");
var helpers = require("../helpers/issues");

router.route('/add')
 .post(require('connect-ensure-login').ensureLoggedIn(), helpers.addIssue)


module.exports = router;