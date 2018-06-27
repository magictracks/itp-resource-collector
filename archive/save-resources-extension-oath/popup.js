$(document).ready(function(){

	console.log("popup ready!")
	let $loginContainer, 
			$taggingContainer, 
			$authBtn,
			$resourceForm,
			$selectedItems,
			$topLevelUrl;

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
			$resourceForm = $("#resourceForm")
			
			// get the top level url
			chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, function (tabs) {
			 	  $topLevelUrl = tabs[0].url;
			});
		}

		let addListeners = function(){
			// paste selection to form
			pasteSelection();

			// on button click submit resource
			$resourceForm.submit(postIssue);
		}

		/**
		@ Paste selection
		@ get the selection and paste to form
		*/
		function pasteSelection() {
		  chrome.tabs.query({
		  	active:true, 
		  	windowId: chrome.windows.WINDOW_ID_CURRENT
		  },
		  function(tab) {
		    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"},
		    function(response){
		      	console.log("paste selection: ", response);
		      	$('#textp').val(response.data);
		      	$selectedItems = response.data;	
		    });
		  });
		}


		function postIssue(e){
			e.preventDefault();
			// get accessToken from storage and Post to GH Issues
			chrome.storage.local.get(['accessToken'], function(storageObj){

				let issuesUrl = `https://api.github.com/repos/joeyklee/itp-tagged-resources/issues?access_token=${storageObj.accessToken}`

				// TODO: refactor according to structure ... loadElements, addListeners, etc
				let $title = $("input[name=title]").val();
				let $formLevel = $("#level").val();
				let $completionTime = $("#completionTime").val();
				let $formUrl = $("input[name=description]").val();
				let $formTags = $("input[name=tags]").val();

				let $resourceType = [];

				let $resourceTypeSelected = $("input[type=checkbox]:checked");
				for(let i = 0; i < $resourceTypeSelected.length; i++){
					$resourceType.push(`'${$($resourceTypeSelected[i]).val()}'`)
				} 
				
				
				$formTags = $formTags.split(",");
				$formTags = $formTags.map( tag => { return `'${tag}'`})


				let bodyOutput = `
	---
	title: ${$title}
	level: ${$formLevel}
	time: ${$completionTime}
	type: [${$resourceType.toString()}]
	tags: [${$formTags.toString()}]
	mainUrl: '${$topLevelUrl}'
	description: '${$selectedItems.trim()}'
	---
`;
				
				let output = {"title": `${$title}`, "body":bodyOutput}
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

				$("#resourceForm").trigger('reset');
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


