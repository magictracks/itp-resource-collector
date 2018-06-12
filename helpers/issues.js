// TODO: make DB, schema, etc.
var db = require('../models');
const rp = require('request-promise');

exports.addIssue = function(req, res){

			// let url = 'https://api.github.com/repos/joeyklee/itp-tagged-resources/issues'
			// TODO: make a post request to the github API using the accessToken 
			db.User.findOne({username: req.user.username})
			  .then(function(user){
					console.log(req.body)			
					let options = {
						uri: `https://api.github.com/repos/joeyklee/itp-tagged-resources/issues`,
						type:"POST",
						body: req.body,
						headers: {
							"User-Agent": `${req.user.username}`,
							"Authentication": `token ${req.user.accessToken}`
						}
					}

					rp(options).then(data => {
						console.log(data);
						res.send("done!")	
					})

					 
			  })
	}


module.exports = exports;

