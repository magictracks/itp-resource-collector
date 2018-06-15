$(document).ready(function(){
	// $("body").css("background-color", "violet");
	console.log("body ready!")
	let $loginContainer, 
			$taggingContainer, 
			$authBtn,
			$submitResourceBtn;

	/**
	@ LoginProcess
	@ Handles the login prcess auth
	*/
	let LoginProcess = (function(){

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


	/**
	@
	@
	*/
	let ResourceTagging = (function(){

		let init = function(){
			loadElements();
			addListeners();
		}

		let loadElements = function(){
			$submitResourceBtn = $("#postIssue")
		}

		let addListeners = function(){
			// paste selection to form
			pasteSelection();

			// on button click submit resource
			$submitResourceBtn.click(postIssue);
		}

		/**
		@ Paste selection
		@ get the selection and paste to form
		*/
		function pasteSelection() {
		  chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT},
		  function(tab) {
		  	// console.log(tab)
		    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},
		    function(response){
		      var text = document.getElementById('textp');
		      text.innerHTML = response.data;
		      console.log(response.data);
		    });
		  });
		}


		function postIssue(e){
			e.preventDefault();
			// get accessToken from storage and Post to GH Issues
			chrome.storage.local.get(['accessToken'], function(storageObj){
				console.log(storageObj);
				let issuesUrl = `https://api.github.com/repos/joeyklee/itp-tagged-resources/issues?access_token=${storageObj.accessToken}`
				let output = {"title":"hello from chrome-extension-with-auth", "body": "hello pebble"}
				$.ajax({
					type: "POST",
					headers: {
		        'Content-Type': 'application/json',
		      },
				  url: issuesUrl,
				  data:JSON.stringify(output),
				  success: function(data){
				  	console.log(data)
				  },
				  dataType: 'json'
				});
			})
			
		}

		return {
			init: init
		}

	})();


	// call functions
	LoginProcess.init();
	ResourceTagging.init();

}) 


