var Component = require('choo/component')
var html = require('choo/html')
var css = require("sheetify")
  // your store comes from index :)

class NavBar extends Component {
  constructor(name, state, emit) {
    super(name);

    this.state = state;
    this.emit = emit;

    this.setActive = this.setActive.bind(this);
  }

  setActive(routeName){
      if(this.state.route == routeName){
        return "bg-washed-red"
      } else{
        return "white"
      }
  }

  update() {
    return true
  }


  createElement() {
    return html `
      <nav class="w-100 pa2 outline">
        <ul class="flex flex-row list ul items-center justify-between ma0 pa0">
          <li class="mr2 ${this.setActive('*')}"><a href="/">Select Image</a></li>
          <li class="mr2">${">"}</li>
          <li class="mr2 ${this.setActive('tag')}"><a href="/tag">Edit Info</a></li>
          <li class="mr2">${">"}</li>
          <li class="${this.setActive('organize')}"><a href="/organize">Organize</a></li>
        </ul>
      </nav>
    `
  }
}



module.exports = NavBar;
