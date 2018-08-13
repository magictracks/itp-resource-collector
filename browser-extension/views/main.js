var html = require('choo/html')
var choo = require('choo')

var countBtn = require("../components/countBtn")
var ImageSelection = require("../components/ImageSelection")


function mainView(state, emit) {

  return html `
    <div>
      ${this.state.cache(countBtn, "countBtn").render()}
      ${this.state.cache(ImageSelection, "ImageSelection").render()}
    </div>
  `
}

module.exports = mainView;
