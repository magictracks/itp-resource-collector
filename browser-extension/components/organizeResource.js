var Component = require('choo/component')
var html = require('choo/html')
var css = require('sheetify');
  // your store comes from index :)

  css`
  fieldset{
    border:1px solid black;
  }

  `

class OrganizeResource extends Component {
  constructor(name, state, emit) {
    super(name);

    this.state = state;
    this.emit = emit;
    this.handleChange = this.handleChange.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.expandNewTutorialMenu = this.expandNewTutorialMenu.bind(this)
  }

  update() {
    return false
  }

  closePopup(e){
    window.close();
  }

  expandNewTutorialMenu(e){
    e.preventDefault();

    document.querySelector("#newTutorialMenu").classList.toggle("dn")

  }

  handleChange(e){
    e.preventDefault();
    console.log(e.target)
    let k  = e.target.name;
    let val = e.target.value;
    this.emit("newTutorial:update", k, val)
  }

  createElement() {

    return html `
    <div>
      <div class="flex flex-column w-100">
        <div class="flex flex-row w-100 outline h4">
            <div class="w-60 flex flex-column overflow-y-scroll pa1 h-100">
              <h3 class="ma0 mb1">${this.state.newResource.title}</h3>
              <small class="mb1">via <a href="${this.state.newResource.url}">${this.state.newResource.url}</a> </small>
              <small class="mb1">${this.state.newResource.description}  </small>
            </div>
            <div class="w-40 cover bg-center h-100 bl" style="background-image:url('${this.state.newResource.headerImageUrl}')"></div>
        </div>

        <div class="w-100 flex flex-column mt2">
          <p>Add to exiting tutorial...</p>
          <select>
            <option>tutorial 1</option>
            <option>tutorial 2</option>
            <option>tutorial 3</option>
          </select>
          <select class="mt2">
            <option>section 1</option>
            <option>section 2</option>
            <option>section 3</option>
          </select>
          <div class="w-100 flex flex-row items-center mt1">
            <label class="mr1">+</label>
            <input type="text" placeholder= "new section title" />
          </div>

          <p onclick=${this.expandNewTutorialMenu}>...or create/add to new tutorial</p>
          <fieldset id="newTutorialMenu" class="mt2 br1 dn">
            <legend>New Tutorial</legend>
            <form class="mt2" onkeypress="return event.keyCode != 13;">
            <fieldset class="mt2 br1">
              <legend>Title</legend>
              <input class="w-100 pa2 bn bg-near-white" type="text" placeholder="I'm a title" name="title" onkeyup=${this.handleChange} value=${this.state.newTutorial.title}/>
            </fieldset>
            <fieldset class="mt1 br1">
              <legend>Description</legend>
              <textarea class="w-100 pa2 bn bg-near-white" style="height:80px" name="description" onkeyup=${this.handleChange} value=${this.state.newTutorial.description}>${this.state.newTutorial.description}</textarea>
            </fieldset>
            <fieldset class="mt1 br1">
              <legend>Tags</legend>
              <input class="w-100 pa2 bn bg-near-white" type="text" placeholder="tags" value=""/>
            </fieldset>
          </form>
          </fieldset>
        </div>

        <div class="w-100 h3 flex flex-row mt2 justify-center items">
          <a class="w-50 pa1">
            <button class="w-100 h-100 pa1 br1">Save & Close</button>
          </a>
          <a class="w-50 pa1">
          <button class="w-100 h-100 pa1 br1">Open in Magic Tracks</button>
          </a>
        </div>

    </div>
    `
  }
}



module.exports = OrganizeResource;
