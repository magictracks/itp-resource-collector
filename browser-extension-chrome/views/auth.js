var html = require('choo/html')
var choo = require('choo')
var AuthBtn = require("../components/authBtn.js")

function authView(state, emit) {

  // ${this.state.cache(NavBar, "NavBar").render()}
  return html `
    <div>
      <div class="mt2 mb2 flex flex-column justify-center items-center center">
        <small>Welcome to</small>
        <h2>The Magic Track Maker</h2>
        <h3>Log in to start documenting!</h3>
        ${this.state.cache(AuthBtn, "AuthBtn").render()}
      </div>
    </div>
  `
}

module.exports = authView;
