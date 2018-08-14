(function() {
	console.log("Hello from contentScript.js!");

	// get the selection on a page
	// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	// 	// Get Selected Text
	//   if (request.method == "getSelection") {
	//   	var mySelection = window.getSelection().toString();
	//   	console.log("getSelection says: ", mySelection);
	//     sendResponse({data: mySelection });
	//   }
	// });

	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		// Get Selected Text
		if (request.method == "getWindowLocation") {
			let url = window.location.href;
			console.log("get location says: ", url);
			sendResponse({
				data: url
			});
		}
	});

	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		// Get Selected Text
		if (request.method == "getDOM") {
			// let url = window.location.href;
			// console.log("get location says: ", url);
			let markup = document.documentElement.innerHTML;
			let url = window.location.href;
			sendResponse({
				data: markup,
				url: url
			});
		}
	});

	console.log("window location: ", window.location);

})();
