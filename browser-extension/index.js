var html = require('choo/html')
var devtools = require('choo-devtools')
var choo = require('choo')
var css = require("sheetify");

css("tachyons")
var app = choo()
app.use(devtools())



/* stores */
var countStore = require('./stores/countStore')
var pageStore = require('./stores/pageStore')
app.use(countStore)
app.use(pageStore)


/* views */
var tagView = require('./views/tag')
var selectImageView = require('./views/selectImage')
var organizeView = require('./views/organize')

/* Set Routes */
app.route('/*', selectImageView)
app.route('/tag', tagView)
app.route('/organize', organizeView)

/* get the dom tree and add */
let tree = app.start();
document.querySelector("#App").appendChild(tree);
