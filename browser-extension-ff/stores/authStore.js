function authStore(state, emitter) {
  state.authenticated = true;

  state.currentUser ="Not Logged In"

  // get authenticated
  browser.storage.local.get(['authenticated'], (status) => {
    console.log("from authStore 1", status.authenticated)
    // TODO: set status authenticated just for demo-ing
    // state.authenticated = status.authenticated;
    state.authenticated = true;

    if(state.authenticated == true){
      emitter.emit("pushState", "selectImage")
    } else{
      emitter.emit("pushState", "*")
    }

  })

  // get user name
  // browser.storage.local.get(['ghUsername'], (user) => {
  //   state.currentUser = user.ghUsername;
  // })



  emitter.on('DOMContentLoaded', function() {

    emitter.on('auth:isAuthenticated', function() {
      // check the chrome storage to find if user is auth'd
      browser.storage.local.get(['authenticated'], (status) => {
        console.log("from authStore 2", status.authenticated)
        // TODO: set status authenticated just for demo-ing
        // state.authenticated = status.authenticated;
        state.authenticated = true;

        emitter.emit(state.events.RENDER)
      })
    })

  });
}

module.exports = authStore;
