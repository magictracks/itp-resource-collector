var html = require('choo/html')
var choo = require('choo')

var ImageSelection = require("../components/ImageSelection")
let NavBar = require("../components/NavBar");

function selectImageView(state, emit) {

  return html `
    <div class="w-100 flex flex-column items-center mt2 mb2">
      ${this.state.cache(NavBar, "NavBar").render()}
      <div class="w-100">
      ${this.state.cache(ImageSelection, "ImageSelection").render()}
      </div>
    </div>
  `
}

module.exports = selectImageView;
