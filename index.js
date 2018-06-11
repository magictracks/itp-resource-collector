require('dotenv').config()
const express = require('express');
const app = express();
const passport = require('passport');
const port = process.env.PORT || 5000;
const GitHubStrategy = require('passport-github').Strategy;
const GITHUB_CLIENT_ID = process.env.gh_client;
const GITHUB_CLIENT_SECRET = process.env.gh_client_secret;

/* App Settings */
app.use(passport.initialize());
app.use(passport.session());


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
      return cb(null, profile);
  }
));

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success');
  });



app.listen(port , () => console.log('App listening on port ' + port));