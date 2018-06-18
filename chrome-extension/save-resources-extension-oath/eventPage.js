(function(){
	console.log("hello from eventPage.js")

	/**
	@ Setup
	@ set the initial state of auth here
	*/
	const Setup = (function(){
		// chrome.runtime.onInstalled.addListener(function(){
		//   chrome.storage.local.set({status: 0}, function(innerObj){
		//     chrome.storage.local.get(['status'], function(storageObj){
		//       console.log('intial status is ', storageObj)
		//     })
		//   })
		// })

		let init = function(){
			chrome.runtime.onInstalled.addListener(function(){
				// setStatus(0);

				// if the status does not exist, set it to 0;
				chrome.storage.local.get(['status'], function(storageObj){
					if(storageObj === undefined){
						setStatus(0);
					} 
				})

			})
		}

		/**
		@ setStatus
		@ sets the status of the storage
		@ receives object from parent function
		*/
		function setStatus(state){
			chrome.storage.local.set({status: state}, getStatus)
		}

		/**
		@ getStatus
		@ retreives the status of the storage
		@ receives object from parent function
		*/
		function getStatus(){
			chrome.storage.local.get(['status'], function(storageObj){
				console.log('intial status is ', storageObj)
			})
		}

		return {
			init: init
		}
	})();

	/**
	@ HandleAuth()
	@ when a user is not logged in, this sends them to github to get auth'd.
	*/
	const HandleAuth = (function(){
		// https://github.com/sindresorhus/notifier-for-github/issues/57
		// see: https://developer.chrome.com/apps/app_identity#non
		const CALLBACK_URL = `https://${chrome.runtime.id}.chromiumapp.org/itp-resource-collector-extension`;
		// should be the client_ID of the app on github
		// MAKE SURE TO NOT CHECK THIS IN!!!
		const CLIENT_ID = 'ba17caba2815784d32a3';
		const CLIENT_SECRET = 'bb547b970f86d13e1aad82960d47426353bd1594';
		const AUTH_URL = `https://github.com/login/oauth/authorize/?client_id=${CLIENT_ID}&redirect_uri=${CALLBACK_URL}&scope=public_repo`;

		let init = function(){
			addListeners();
		}

		let addListeners = function(){
				launchOauth();
		}

		function launchOauth(){
			chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
				if(request.action === 'launchOauth'){
					chrome.identity.launchWebAuthFlow({
						url: AUTH_URL,
						interactive: true
					}, function(redirectURL) {
					  let redirectCode = redirectURL.split('=')[1];

						  // Send a POST request
						  let oauthEndPoint = `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${redirectCode}`
						  axios({
						    method: 'post',
						    url: oauthEndPoint  
						  }).then(function (response) {

						    let accessToken = response.data.split('&')[0].split('=')[1];
						    chrome.storage.local.set({accessToken: accessToken}, function(){
						    	console.log('auth done!')
						    	// not really needed except for debugging
						    	// chrome.storage.local.get(['accessToken'], function(storageObj){
						    	// 	console.log(storageObj)
						    	// })
						    });
						  })
						  .catch(function (error) {
						    console.log(error);
						  });
						}
					) // end .launchWebAuthFlow
				}
			}) // end .addListener
		}


		return {
			init: init
		}

	})();
	


	// call in order
	Setup.init();
	HandleAuth.init();

})();


