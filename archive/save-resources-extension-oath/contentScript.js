(function(){
	console.log("Hello from contentScript.js!");

	// get the selection on a page
	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		// Get Selected Text
	  if (request.method == "getSelection") {
	  	var mySelection = window.getSelection().toString();
	  	console.log("getSelection says: ", mySelection);
	    sendResponse({data: mySelection });
	  }
	  

	  // TODO: Get Images
	  // if( request.method == "getImages"){
	  // 	let imgs = document.querySelectorAll("img");
	  // }

	  // TODO: Get Links & Refs
	  // if( request.method == "getRefs"){
	  // 	let imgs = document.querySelectorAll("a");
	  // }


	});



})();