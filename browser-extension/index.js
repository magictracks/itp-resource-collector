var html = require('choo/html')
var devtools = require('choo-devtools')
var choo = require('choo')

/* stores */
var countStore = require('./stores/countStore')
var pageStore = require('./stores/pageStore')
// var newResourceStore = require('./stores/newResourceStore')

var tagView = require('./views/tag')
var selectImageView = require('./views/selectImage')


var app = choo()
app.use(devtools())
app.use(countStore)
app.use(pageStore)
// app.use(newResourceStore)

app.route('/*', selectImageView)
app.route('/tag', tagView)
let tree = app.start();

console.log(tree)
document.querySelector("#App").appendChild(tree);
