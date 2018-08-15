var html = require('choo/html')
var choo = require('choo')

var countBtn = require("../components/countBtn")
let NavBar = require("../components/NavBar");
let OrganizeResource = require("../components/organizeResource");

// ${this.state.cache(countBtn, "countBtn").render()}
function tagView(state, emit) {

  return html `
    <div>
      ${this.state.cache(NavBar, "NavBar").render()}
      <div class="mt2 mb2">
        ${this.state.cache(OrganizeResource, "OrganizeResource").render()}
      </div>
    </div>
  `
}

module.exports = tagView;
