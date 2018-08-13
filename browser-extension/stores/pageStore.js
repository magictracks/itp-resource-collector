function pageStore(state, emitter) {
  state.page = {
    markup: "",
    imageLinks: []
  }

  state.newResource = {
    headerImageUrl:"",
    title:"",
    description:"",
    url:"",
    tags:""
  }

  emitter.on('DOMContentLoaded', function() {

    emitter.on('pageStore:getDOM', function(markup) {
      console.log("get dom!")
        // let parser = new DOMParser();
        // let doc = parser.parseFromString(markup, "text/xml");
        // state.page.markup = doc;
      var el = document.createElement('html');
      el.innerHTML = markup
      let images = Array.from(el.getElementsByTagName("img"))
      let metas = Array.from(el.getElementsByTagName("meta"))

      images.forEach(img => {
        state.page.imageLinks.push(img.src)
      })

      // get images
      // get title
      // get description
      // get url
      metas.forEach(info => {
        if (info.getAttribute("property") == "og:image") {
          state.page.imageLinks.push(info.getAttribute("content"))
        } else if (info.getAttribute("property") == "og:title"){
          state.newResource.title = info.getAttribute("content")
        } else if (info.getAttribute("property") == "og:url"){
          state.newResource.url = info.getAttribute("content")
        }else if (info.getAttribute("property") == "og:description"){
          state.newResource.description = info.getAttribute("content")
        }
      })

      emitter.emit(state.events.RENDER)
    })



    emitter.on('pageStore:addImage', function(imageUrl) {
      // state.test.count += count
      state.newResource.headerImageUrl = imageUrl
      emitter.emit(state.events.RENDER)
    })
  });
}

module.exports = pageStore;
