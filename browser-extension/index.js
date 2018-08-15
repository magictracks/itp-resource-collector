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
var authStore = require('./stores/authStore')
app.use(countStore)
app.use(pageStore)
app.use(authStore)


/* views */
var tagView = require('./views/tag')
var selectImageView = require('./views/selectImage')
var organizeView = require('./views/organize')
var authView = require('./views/auth')

/* Set Routes */
app.route('/*', authView)
app.route('/selectImage', selectImageView)
app.route('/tag', tagView)
app.route('/organize', organizeView)

app.use((state, emitter) => {                  // 1.
  emitter.on('navigate', () => {               // 2.
    console.log(`Navigated to ${state.route}`) // 3.
  })
})

/* get the dom tree and add */
let tree = app.start();
document.querySelector("#App").appendChild(tree);
