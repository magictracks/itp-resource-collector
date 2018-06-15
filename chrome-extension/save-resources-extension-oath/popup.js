$(document).ready(function(){
	// $("body").css("background-color", "violet");
	console.log("body ready!")
	

	/**
	@ LoginProcess
	@ Handles the login prcess auth
	*/
	let LoginProcess = (function(){

		let $loginContainer, $taggingContainer, $authBtn;

		let init = function(){
			loadElements();
			addListeners();
		}

		let loadElements = function(){
			$loginContainer = $('#login-container');
			$taggingContainer = $('#tagging-container');
			$authBtn = $('#authBtn');
		}

		let addListeners = function(){
			// Check the Log in status
			chrome.storage.local.get(['status'], checkLoginStatus)
			$authBtn.click(requestAuth);
		}

		/**
		@ requestAuth
		@ requests oAuth and switches viewstate from login-container to tagging-container
		*/
		function requestAuth(){
			console.log("hello from requestAuth");
			// send a message to trigger action using chrome.extension.sendMessage
			// to launchOauth
			chrome.extension.sendMessage({
			    action: 'launchOauth'
			  });

			// TODO: not sure if we need to set an alarm to re-Auth
			// chrome.alarms.create('enableButton', {delayInMinutes: .1})

			// Change the status to 1 and check the status 
			chrome.storage.local.set({status: 1}, function(){
				chrome.storage.local.get(['status'], checkLoginStatus)
			});

		}

		/**
		@ TODO: reAuthorize()
		@ if we need to reAuth using a timer...
		@ CURRENTLY NOT USED
		*/
		function reAuthorize(){
			chrome.alarms.onAlarm.addListener(function(){
			  console.log('running the alarm')
			  chrome.storage.local.set({status: 0}, function(){
			    chrome.storage.local.get(['status'], checkLoginStatus)
			  })
			  console.log('onAlarm storage status is ', localStorage)
			})
		}

		/**
		@ checkLoginStatus()
		@ recieves 'storageObj' from 'status' object from chrome.storage.local.get()
		*/
		function checkLoginStatus(storageObj){
			console.log('storageObj is: ', storageObj);
			// if the user is auth'd, don't show the login button
			// otherwise, prompt the login
			if(storageObj.status === 1){
				$loginContainer.addClass('disabled');
				$taggingContainer.removeClass('disabled');
			} else {
				$loginContainer.removeClass('disabled');
				$taggingContainer.addClass('disabled');
			}
		}


		return {
			init: init
		}


	})(); // end LoginProcess


	// call functions
	LoginProcess.init();

}) 


