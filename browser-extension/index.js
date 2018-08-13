var html = require('choo/html')
var devtools = require('choo-devtools')
var choo = require('choo')

/* stores */
var countStore = require('./stores/countStore')
var pageStore = require('./stores/pageStore')

var mainView = require('./views/main')

var app = choo()
app.use(devtools())
app.use(countStore)
app.use(pageStore)

app.route('/*', mainView)
let tree = app.start();

console.log(tree)
document.querySelector("#App").appendChild(tree);
