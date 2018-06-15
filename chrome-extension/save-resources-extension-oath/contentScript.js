(function(){
	console.log("Hello from contentScript.js!");

	// get the selection on a page
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	  if (request.method == "getSelection")
	    sendResponse({data: window.getSelection().toString()});
	  else
	    sendResponse({}); 
	});

})();