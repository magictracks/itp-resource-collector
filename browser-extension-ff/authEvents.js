(function(){

  class AuthProcess {
    constructor(CLIENT_ID, CLIENT_SECRET){
      // this.authenticated = false;
      this.CALLBACK_URL = `https://28f66367956b9efb2ac59c0785fece9d10827904.extensions.allizom.org`;
      // this.CALLBACK_URL = browser.identity.getRedirectURL();
      // https://28f66367956b9efb2ac59c0785fece9d10827904.extensions.allizom.org/
      console.log(this.CALLBACK_URL)
      this.CLIENT_ID = CLIENT_ID;
      this.CLIENT_SECRET = CLIENT_SECRET;
      this.AUTH_URL = `https://github.com/login/oauth/authorize/?client_id=${this.CLIENT_ID}&redirect_uri=${this.CALLBACK_URL}&scope=public_repo`;

      this.checkStatus = this.checkStatus.bind(this);
      this.handleAuth = this.handleAuth.bind(this);

      this.setAuthStatus = this.setAuthStatus.bind(this)
      this.getAuthStatus = this.getAuthStatus.bind(this)
    }

    setAuthStatus(status){
      browser.storage.local.set({"authenticated":status}, this.getAuthStatus)
    }

    getAuthStatus(){
      browser.storage.local.get(['authenticated'], (storageObj) =>{
        console.log("authenticated", storageObj)
      })
    }

    checkStatus(){
      browser.runtime.onInstalled.addListener( () => {
        browser.storage.local.get(['authenticated'], (storageObj) => {
          if(storageObj === undefined ){
            this.setAuthStatus(false);
          }
        });
      });
    }

    handleAuth(){
      // add an event listener that triggers the auth flow
      browser.runtime.onMessage.addListener( (request, sender, sendResponse) => {
        // if the action is launchOAuth, call the web auth flow on identity
        console.log("oauth launching!")

        if(request.action === 'launchOauth'){

          browser.identity.launchWebAuthFlow( {
            url: this.AUTH_URL,
            interactive: true
          }, (redirectURL) => {
            console.log("i'm still redirecting")
            if(redirectURL){
              //get the github redirect value
              let redirectCode = redirectURL.split('=')[1];
              // send a POST to get a token
              let oAuthEndPoint = `https://github.com/login/oauth/access_token?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&code=${redirectCode}`;
              // say hello to our oAuth0 using axios request
              axios({
                method: 'post',
                url: oAuthEndPoint
              }).then( (response) => {

                console.log(response)
                // the response will be a magical access token
                let accessToken = response.data.split('&')[0].split('=')[1];

                /**
                 * get the user and set to storage
                 */
                axios({
                  method:"get",
                  url:`https://api.github.com/user?access_token=${accessToken}`
                }).then( (ghUser) => {

                  browser.storage.local.set({"ghUsername": ghUser.data.login}, () => {
                    console.log("set user!")
                  })
                  browser.storage.local.set({"ghUserId": ghUser.data.id}, () => {
                    console.log("set user id!")
                  })

                })
                // set the accesstoken in storage
                browser.storage.local.set({"accessToken": accessToken}, () => {
                  console.log("Auth Complete!")
                  this.setAuthStatus(true);

                  // UNCHECK TO DEBUG
                  // storage.local.get(['accessToken'], function(storageObj){
  						    // 		console.log(storageObj)
  						    // 	})
                });
              }).catch( (err) => {
                console.log(err);
              })
            }
          }) // end launchWebAuthFlow
        } // end if

      }) // end listender
    } // end handleAuth

  } // end class

  // MAKE SURE TO ADD THESE
  let client_id = ''
  let client_secret = ''
  // let authProcess = new AuthProcess(client_id, client_secret)
  // authProcess.checkStatus();
  // authProcess.handleAuth();



})();
