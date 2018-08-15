function authStore(state, emitter) {
  state.authenticated = false;

  emitter.on('DOMContentLoaded', function() {

    emitter.on('auth:isAuthenticated', function(count) {
      state.authenticated = true;
      emitter.emit(state.events.RENDER)
    })


  });
}

module.exports = authStore;
