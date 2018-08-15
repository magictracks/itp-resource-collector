var Component = require('choo/component')
var html = require('choo/html')
var css = require('sheetify');
  // your store comes from index :)

css`
fieldset{
  border:1px solid black;
}

`

class EditResource extends Component {
  constructor(name, state, emit) {
    super(name);

    this.state = state;
    this.emit = emit;
    this.handleChange = this.handleChange.bind(this)
  }

  update() {
    return true
  }

  handleChange(e){
    e.preventDefault();
    console.log(e.target)
    let k  = e.target.name;
    let val = e.target.value;
    this.emit("newResource:update", k, val)
  }

  createElement() {

    return html `
    <div>
      <div class="flex flex-column w-100">
        <div class="w-100 h4 flex flex-column items-center">
        <img class="h4" src=${this.state.newResource.headerImageUrl}/>
        </div>
        <form class="mt2" onkeypress="return event.keyCode != 13;">
          <small>via <a href="${this.state.newResource.url}" target=_blank rel="noopener noreferrer">${this.state.newResource.url}</a> </small>
          <fieldset class="mt2 br1">
            <legend>Title</legend>
            <input class="w-100 pa2 bn bg-near-white" type="text" placeholder="I'm a title" name="title" onkeyup=${this.handleChange} value=${this.state.newResource.title}/>
          </fieldset>
          <fieldset class="mt1 br1">
            <legend>Description</legend>
            <textarea class="w-100 pa2 bn bg-near-white" style="height:80px" name="description" onkeyup=${this.handleChange} value=${this.state.newResource.description}>${this.state.newResource.description}</textarea>
          </fieldset>
          <fieldset class="mt1 br1">
            <legend>Tags</legend>
            <input class="w-100 pa2 bn bg-near-white" type="text" placeholder="tags" value=""/>
          </fieldset>
        </form>
        <a href="/organize">
          <button style="height:60px" class="w-100 br1 mt2 ba b--silver">Looks good!</button>
        </a>

    </div>
    `
  }
}



module.exports = EditResource;
