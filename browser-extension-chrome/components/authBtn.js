var Component = require('choo/component')
var html = require('choo/html')


class AuthBtn extends Component {
  constructor(name, state, emit) {
    super(name);

    this.state = state;
    this.emit = emit;

    this.launchAuth = this.launchAuth.bind(this)
  }

  update() {
    return true
  }

  launchAuth(e){
    console.log("launching auth!")
    if(this.state.authenticated === false || this.state.authenticated === undefined){
      console.log("not auth'd")
      chrome.extension.sendMessage({
  	    action: 'launchOauth'
  	  });
    } else {
      console.log("yes auth'd")
      this.emit("pushState", "selectImage");
    }

  }

  createElement() {
    return html `
    <div class="w-100 flex flex-column items-center">
      <button class="br-100 h4 w4 bg-light-purple b--black bw2 grow f3" onclick=${this.launchAuth}>choo choo!</button>
    </div>
    `
  }
}



module.exports = AuthBtn;
