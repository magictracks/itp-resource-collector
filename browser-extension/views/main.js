var html = require('choo/html')
var choo = require('choo')

var countBtn = require("../components/countBtn")


function mainView(state, emit) {

  return html `
    <div>
      ${this.state.cache(countBtn, "countBtn").render()}
    </div>
  `
}

module.exports = mainView;
