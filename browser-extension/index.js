var html = require('choo/html')
var devtools = require('choo-devtools')
var choo = require('choo')

/* stores */
var countStore = require('./stores/countStore')

var mainView = require('./views/main')


var app = choo()
app.use(devtools())
app.use(countStore)
app.route('/*', mainView)
let tree = app.start();

console.log(tree)
document.querySelector("#App").appendChild(tree);


// // get the windowLocation
// function getWindowLocation() {
//   chrome.tabs.query({
//       active: true,
//       windowId: chrome.windows.WINDOW_ID_CURRENT
//     },
//     function(tab) {
//       chrome.tabs.sendMessage(tab[0].id, {
//           method: "getWindowLocation"
//         },
//         function(response) {
//           console.log(response);
//           // make(response.data);
//         });
//     });
// }
