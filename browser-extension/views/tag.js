var html = require('choo/html')
var choo = require('choo')

var countBtn = require("../components/countBtn")
let NavBar = require("../components/NavBar");

// ${this.state.cache(countBtn, "countBtn").render()}
function tagView(state, emit) {

  return html `
    <div>
      ${this.state.cache(NavBar, "NavBar").render()}
      <div>
        <h1>${this.state.newResource.title}</h1>
        <img src=${this.state.newResource.headerImageUrl} style="width:100%; max-width:500px"/>
        <h2>${this.state.newResource.description}</h2>
        <small>via <a href="${this.state.newResource.url}">${this.state.newResource.url}</a> </small>
      </div>
      <button style="width:100%; height:60px; border-radius:0px; background-color:#D8D8D8; position: absolute; bottom:0px;left:0px; color:#BDFFE9; font-size:2em">Looks good!</button>
    </div>
  `
}

module.exports = tagView;
