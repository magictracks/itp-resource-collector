// TODO: make DB, schema, etc.
var db = require('../models');
const rp = require('request-promise');

exports.addIssue = function(req, res){

			// let url = 'https://api.github.com/repos/joeyklee/itp-tagged-resources/issues'
			// TODO: make a post request to the github API using the accessToken 
			db.User.findOne({username: req.user.username})
			  .then(function(user){
					console.log(req.body)	
					console.log(user);
					let options = {
						method: 'POST',
						uri: `https://api.github.com/repos/joeyklee/itp-tagged-resources/issues?access_token=${user.accessToken}`, //
						body: req.body,
						json:true,
						headers: {
							"User-Agent": `${user.username}`,
							"Content-Type": "application/json",
							"Authentication": `token ${user.accessToken}`
						}
					}

					rp(options).then(data => {
						console.log(data);
						res.send("done!")	
					}).catch(function (err) {
		        // POST failed...
		        console.log(err);
			    });

					 
			  })
	}


module.exports = exports;

