var Component = require('choo/component')
var html = require('choo/html')
  // your store comes from index :)

class NavBar extends Component {
  constructor(name, state, emit) {
    super(name);

    this.state = state;
    this.emit = emit;

    this.style = `
      *{
        box-sizing: border-box;
      }
      nav{
          width:100%;
          height:60px;
          display:flex;
          flex-direction:column;
          padding:10px;
      }
      ul{
        list-style:none;
        margin:0px;
        display:flex;
        flex-direction:row;
        align-items:center;
        border: 2px solid black;
      }
      li{
        list-style:none;
        margin-right: 10px;
      }
    `

  }

  update() {
    return false
  }


  createElement() {
    return html `
      <nav class="w-100 pa2 outline">
        <ul class="flex flex-row list ul items-center justify-between ma0 pa0">
          <li class="mr2"><a href="/">Select Image</a></li>
          <li class="mr2">${">"}</li>
          <li class="mr2"><a href="/tag">Edit Info</a></li>
          <li class="mr2">${">"}</li>
          <li class="list"><a href="/organize">Organize</a></li>
        </ul>
      </nav>
    `
  }
}



module.exports = NavBar;
