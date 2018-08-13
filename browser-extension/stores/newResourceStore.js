function newResourceStore(state, emitter) {
  state.newResource = {
    headerImageUrl:"",
    title:"",
    description:"",
    url:"",
    tags:""
  }

  emitter.on('DOMContentLoaded', function() {
    emitter.on('newResourceStore:addImage', function(imageUrl) {
      // state.test.count += count
      state.newResource.headerImageUrl = imageUrl
      emitter.emit(state.events.RENDER)
    })
  });
}

module.exports = newResourceStore;
