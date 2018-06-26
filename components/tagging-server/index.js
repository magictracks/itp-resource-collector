const express = require('express'),
			app = express(),
			port = process.env.PORT || 5000,
			bodyParser = require('body-parser'),
			mongoose = require("mongoose");

// App settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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






// TODO: API GET, POST, PUT, Delete endpoints here






app.listen(port , () => {
  console.log('App listening on port ' + port) 
});