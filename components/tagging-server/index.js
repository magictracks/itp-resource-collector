const express = require('express'),
			app = express(),
			port = process.env.PORT || 5000,
			bodyParser = require('body-parser'),
			mongoose = require("mongoose"),
			rp = require('request-promise'),
			cors = require('cors');

// App settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

// Get the db as spec'd in the models directory
// includes an index which gathers all the schema together
const db = require("./models");

//Bind connection to error event (to get notification of connection errors)
// NOTE: db.Resource
// could also be db.User...etc etc remember we pull from /models/...
db.Resource.on('error', console.error.bind(console, 'MongoDB connection error:'));



// send me to this link
app.get('/', (req, res) => {
	res.send("Hello!");
})


// TODO: auth stuff






// API endpoints here
/**
@ GET: /api/resources
@ Send all the resources as json
@*/
app.get('/api/resources', (req, res, next) => {

	db.Resource.find()
		.then(function(todos){
		    res.json(todos);
		})
		.catch(function(err){
		    res.send(err);
		})

})

/**
@ POST/PUT: /api/resources
@ Find a resource based on the url
@ if it exists, then update it 
@ if it doesn't exist, then add it

TODO:
- create k,v pairs from array items
- increment each unique item
@*/

app.post('/api/resources', (req, res, next) => {

	db.Resource.findOneAndUpdate(
		{"url": req.body.url}, 
		{
			$push:{
				"tags": req.body.tags, 
				"checkedTypes":req.body.checkedTypes,
				"levelRating":req.body.levelRating,
				"timeCommitment":req.body.timeCommitment,
				"submittedBy":req.body.submittedBy
			},
			"desc": req.body.desc,
			"title": req.body.title,
			"imageUrl": req.body.imageUrl,
			"keywordExtraction":req.body.keywordExtraction,
			"url": req.body.url
		}, 
		{upsert:true, new:true})
	.then(function(updatedResource){
	    res.json(updatedResource);
	})
	.catch(function(err){
	    res.send(err);
	})

});







app.listen(port , () => {
  console.log('App listening on port ' + port) 
});