(function(){

  class AuthProcess {
    constructor(CALLBACK_URL, CLIENT_ID, CLIENT_SECRET){
      this.authenticated = false;
      this.CALLBACK_URL = `https://${chrome.runtime.id}.chromiumapp.org/itp-resource-collector-extension`;
      this.CLIENT_ID = CLIENT_ID;
      this.CLIENT_SECRET = CLIENT_SECRET;
      this.AUTH_URL = `https://github.com/login/oauth/authorize/?client_id=${this.CLIENT_ID}&redirect_uri=${this.CALLBACK_URL}&scope=public_repo`;;

      this.checkStatus = this.checkStatus.bind(this);
      this.handleAuth = this.handleAuth.bind(this);
    }


    function setAuthStatus(status){
      chrome.storage.local.set({authenticated:status}, getAuthStatus)
    }

    function getAuthStatus(){
      chrome.storage.local.get(['authenticated'], (storageObj) =>{
        console.log("authenticated", storageObj)
      })
    }

    checkStatus(){
      chrome.runtime.onInstalled.addListener( () => {
        chrome.storage.local.get(['authenticated'], (storageObj) => {
          if(storageObj === undefined){
            setAuthStatus(false);
          }
        });
      });
    }

    handleAuth(){
      // add an event listener that triggers the auth flow
      chrome.extension.onMessage.addListener( (request, sender, sendResponse) => {
        // if the action is launchOAuth, call the web auth flow on identity
        if(request.action === 'launchOAuth'){
          chrome.identity.launchWebAuthFlow( {
            url: this.AUTH_URL,
            interactive: true
          }, (redirectURL) => {
            //get the github redirect value
            let redirectCode = redirectURL.split('=')[1];

            // send a POST to get a token
            let oAuthEndPoint = `https://github.com/login/oauth/access_token?client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&code=${redirectCode}`;
            // say hello to our oAuth0 using axios request
            axios({
              method: 'post',
              url: oAuthEndPoint
            }).then((response) => {
              // the response will be a magical access token
              let accessToken = response.data.split('&')[0].split('=')[1];
              // set the accesstoken in chrome storage
              chrome.storage.local.set({accessToken}, () => {console.log("Auth Complete!")});
            }).catch( (err) => {
              console.log(err);
            })

          }) // end launchWebAuthFlow
        } // end if

      }) // end listender
    } // end handleAuth

  } // end class

  let authProcess = new AuthProcess()


})();
