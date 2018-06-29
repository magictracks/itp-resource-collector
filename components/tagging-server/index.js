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
		.then(function(resources){
		    res.json(resources);
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
function createCounterJson(arr){
	const output = arr.map((item) => {
		return {property: item, count: 1};
	})
	return output;
}


app.post('/api/resources', (req, res, next) => {

	let incomingResource = Object.assign({}, req.body);
	incomingResource.tags = createCounterJson(incomingResource.tags)
	incomingResource.checkedTypes = createCounterJson(incomingResource.checkedTypes)
	incomingResource.levelRating = createCounterJson(incomingResource.levelRating)
	incomingResource.timeCommitment = createCounterJson(incomingResource.timeCommitment)
	incomingResource.submittedBy = createCounterJson(incomingResource.submittedBy)

	db.Resource.findOne({"url": req.body.url})
		.then(function(resource){
		    console.log(resource)
		    // if the resource does not exist, make a new one
		    // else, update the existing one
		    if(resource === null){
		    	// create a new document
		    	db.Resource.create(incomingResource)
		    		.then(newResource => {
		    			res.status(201).json(newResource);
		    		})
		    		.catch(err => {
		    			res.send(err);
		    		})
		    } else {
		    	// add any unique items
		    	db.Resource.update(
			    		{"url": req.body.url},
			    		{ 
			    		 	$addToSet: { 
			    		 		tags: { 
			    		 			$each: incomingResource.tags,
			    		 		},
			    		 		checkedTypes: { 
			    		 			$each: incomingResource.checkedTypes,
			    		 		},
			    		 		levelRating: { 
			    		 			$each: incomingResource.levelRating,
			    		 		},
			    		 		timeCommitment: { 
			    		 			$each: incomingResource.timeCommitment,
			    		 		},
			    		 		submittedBy: { 
			    		 			$each: incomingResource.submittedBy,
			    		 		}
			    		 	}
			    		}, {new:true}
	    		)
		    	.then(updatedResource => {
		    		console.log(updatedResource)
	    			res.status(201).json(updatedResource);
	    		})
	    		.catch(err => {
	    			res.send(err);
	    		})

	    		

		    }
		})
		.catch(function(err){
		    res.send(err);
		    // console.log("no item found")
		})

});







app.listen(port , () => {
  console.log('App listening on port ' + port) 
});