var Component = require('choo/component')
var html = require('choo/html')


class AuthBtn extends Component {
  constructor(name, state, emit) {
    super(name);

    this.state = state;
    this.emit = emit;

    this.launchAuth = this.launchAuth.bind(this)
    this.setState();
  }

  setState(){
    if(this.state.authenticated === false){
      console.log(this.state.authenticated)
    } else{
      console.log(this.state.authenticated)
    }
  }

  update() {
    return true
  }

  launchAuth(e){
    console.log("launching auth!")

    chrome.extension.sendMessage({
	    action: 'launchOauth'
	  });

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
