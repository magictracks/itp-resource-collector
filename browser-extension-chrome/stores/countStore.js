function countStore(state, emitter) {
  state.test = {
    count: 0
  }

  emitter.on('DOMContentLoaded', function() {
    emitter.on('countStore:increment', function(count) {
      state.test.count += count
      emitter.emit(state.events.RENDER)
        // emitter.emit('render')
    })
  });
}

module.exports = countStore;
