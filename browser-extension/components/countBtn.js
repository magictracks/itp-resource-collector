var Component = require('choo/component')
var html = require('choo/html')
  // your store comes from index :)

class CountBtn extends Component {
  constructor(name, state, emit) {
    super(name);

    this.state = state;
    this.emit = emit;

    this.increment = this.increment.bind(this);
  }

  update() {
    return true
  }

  increment() {
    this.emit('countStore:increment', 1);
  }

  createElement() {
    return html `
    <div>
      <h1>count is ${this.state.test.count}</h1>
      <button onclick=${this.increment}>increment!</button>
    </div>
    `
  }
}

module.exports = CountBtn;
