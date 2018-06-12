var express = require('express');
var router = express.Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
// var db = require("../models");
var helpers = require("../helpers/auth");

router.route('/')
 .get(passport.authenticate('github', {scope:"public_repo"}))

router.route('/callback')
	.get(passport.authenticate('github', { failureRedirect: '/error', scope:"public_repo" }), helpers.githubAuthRedirect)
  
module.exports = router;