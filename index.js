require('dotenv').config()
const express = require('express');
const app = express();
const rp = require('request-promise');
const bodyParser = require('body-parser')
const passport = require('passport');
const port = process.env.PORT || 5000;
const GitHubStrategy = require('passport-github').Strategy;
const GITHUB_CLIENT_ID = process.env.gh_client;
const GITHUB_CLIENT_SECRET = process.env.gh_client_secret;

/* App Settings */
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 




/* Routes */
app.get('/', (req, res) => res.sendFile('auth.html', { root : __dirname}));
app.get('/success', (req, res) => res.sendFile('test.html', { root : __dirname}));
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

      return cb(null, profile);
  }
));

app.get(
	'/auth/github', 
	passport.authenticate('github', {scope:"public_repo"})
);

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/error', scope:"public_repo" }),
  function(req, res) {
    res.redirect('/success');
  });


app.post('/test',
	function(req, res){

			// let url = 'https://api.github.com/repos/joeyklee/itp-tagged-resources/issues'
			
			// TODO: make a post request to the github API using the accessToken 

			console.log(req.body)			
			res.send("done!")
		}
	)


app.listen(port , () => console.log('App listening on port ' + port));