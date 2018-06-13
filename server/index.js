require('dotenv').config()
const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    bodyParser = require('body-parser'),
    rp = require('request-promise');

const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const GITHUB_CLIENT_ID = process.env.gh_client;
const GITHUB_CLIENT_SECRET = process.env.gh_client_secret;
var db = require("./models");


/* App settings */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +'/public'));
app.use(express.static(__dirname + '/views'));
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



/* Routes */
const authRoutes = require("./routes/auth");
const issuesRoutes = require("./routes/issues");
app.use('/auth/github', authRoutes); 
app.use('/issues', issuesRoutes); 

// 
app.get('/', (req, res) => res.sendFile('auth.html', {root:__dirname + "/views/"} ));
app.get('/app', (req, res) => res.sendFile('app.html', {root:__dirname + "/views/"}));
app.get('/error', (req, res) => res.send("error logging in"));




/* Passport Auth */
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*  GITHUB AUTH  */
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
  		
  		// TODO: need to store the accessToken in a DB to make api calls with
      // find if the userprofile exists
      // if so, then 
      db.User.findOne({username: profile.username})
        .then(function(user){

          if(user !== null){
            if(user.accessToken !== accessToken){
              console.log("user exists and is being updated! ", user);
              db.User.findOneAndUpdate(
                {username: profile.username}, // find
                { accessToken: accessToken }, // set
                {returnOriginal: false}, // return the new
                function(err, doc){
                  console.log("updated user accessToken to:", doc);
                })
            } else {
              console.log("user exists and does not need to be updated! ", user);
            }
          } else {
            console.log("new user! ", user);

            db.User.create({
              username: profile.username, 
              accessToken: accessToken
            })
            // .then(function(user){
            //   res.status(200).json({
            //     user: profile.username, 
            //     accessToken: accessToken, 
            //     refreshToken: refreshToken
            //   });
            // }).catch(function(err) {
            //   res.status(400).json(err);
            // });
          }
        })

        return cb(null, profile);
  }
));



app.listen(port , () => {
  console.log('App listening on port ' + port) 
});