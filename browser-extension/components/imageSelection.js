var Component = require('choo/component')
var html = require('choo/html')
  // your store comes from index :)

class ImageSelection extends Component {
  constructor(name, state, emit) {
    super(name);

    this.state = state;
    this.emit = emit;

    this.test = this.test.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.local = this.state.components[name] = {}

    this.getImages();
  }

  getImages(){
    chrome.tabs.query({
      active: true,
      windowId: chrome.windows.WINDOW_ID_CURRENT
    }, (tab) => {
      chrome.tabs.sendMessage(tab[0].id, {
          method: "getDOM"
        },
        (response) => {
          // console.log(response);
          // console.log("hello!!")
          this.emit("pageStore:getDOM", response.data)
        });
    });
  }

  update() {
    return true
  }

  test() {
    // this.emit('countStore:increment', 1);
    console.log("hello")
  }


  selectImage(e){
    e.preventDefault();

    let sel = e.target.src;
    console.log("select image",sel)

    this.emit("newResourceStore:addImage", sel)
  }

  createElement() {
    return html `
    <div>
      <h2>Select a cover image</h2>
      ${this.state.page.imageLinks.map( (imgLink) => html`
        <div>
          <img alt="" src=${imgLink} onclick=${this.selectImage} />
      </div>`) }
    </div>
    `
  }
}



module.exports = ImageSelection;
