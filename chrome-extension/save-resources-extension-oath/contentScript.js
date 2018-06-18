(function(){
	console.log("Hello from contentScript.js!");

	// get the selection on a page
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	  if (request.method == "getSelection") {
	  	var mySelection = window.getSelection().toString();
	  	console.log("getSelection says: ", mySelection);
	    sendResponse({data: mySelection });
	  }
	  // else {
	  //   sendResponse({data: ''}); 
	  // }
	});

})();