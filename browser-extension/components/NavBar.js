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
      <nav>
        <style>
          ${this.style}
        </style>
        <ul>
          <li><a href="/">Select Image</a></li>
          <li>${">"}</li>
          <li><a href="/tag">Add Info</a></li>
          <li>${">"}</li>
          <li><a href="/organize">Organize</a></li>
        </ul>
      </nav>
    `
  }
}



module.exports = NavBar;
