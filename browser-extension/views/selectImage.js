var html = require('choo/html')
var choo = require('choo')

var ImageSelection = require("../components/ImageSelection")
let NavBar = require("../components/NavBar");

function selectImageView(state, emit) {

  return html `
    <div>
      ${this.state.cache(NavBar, "NavBar").render()}
      ${this.state.cache(ImageSelection, "ImageSelection").render()}
    </div>
  `
}

module.exports = selectImageView;
