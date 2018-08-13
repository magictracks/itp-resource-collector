var html = require('choo/html')
var choo = require('choo')

function mainView(state, emit) {
  return html `
    <div>
      <h1>count is ${state.count}</h1>
      <button onclick=${onclick}>Increment</button>
    </div>
  `

  function onclick() {
    // call when popup opens:
    emit('increment', 1)
  }
}

module.exports = mainView;
