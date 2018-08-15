function pageStore(state, emitter) {
  state.page = {
    markup: "",
    imageLinks: [],
    metas: []
  }

  state.newResource = {
    headerImageUrl:"",
    title:"",
    description:"",
    url:"",
    tags:""
  }

  state.newTutorial = {
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
      el.innerHTML = markup.data


      // TODO: images with relative paths need to be addressed
      let images = Array.from(el.getElementsByTagName("img"))
      state.page.metas = Array.from(el.getElementsByTagName("meta"))

      images.forEach(img => {
        if(img.src.startsWith("https") || img.src.startsWith("http") ){
            state.page.imageLinks.push(img.src)
        }
      })

      // set the defaults to the url, then update
      state.newResource.title =  markup.url;
      state.newResource.description =  markup.url;
      state.newResource.url = markup.url;

      state.page.metas.forEach(info => {
        // image links
        if (info.getAttribute("property") == "og:image") {
          state.page.imageLinks.push(info.getAttribute("content"))
        }
        // title
        if (info.getAttribute("property") == "og:title"){
          state.newResource.title = info.getAttribute("content")
        }
        // url
        if(info.getAttribute("property") == "og:url"){
          state.newResource.url = info.getAttribute("content")
        }
        // desc
        if (info.getAttribute("property") == "og:description"){
          state.newResource.description = info.getAttribute("content")
        }
      })


      emitter.emit(state.events.RENDER)
    })



    emitter.on('newResource:addImage', function(imageUrl) {
      // state.test.count += count
      state.newResource.headerImageUrl = imageUrl
      emitter.emit(state.events.RENDER)
    })

    emitter.on('newResource:update', function(k,v) {
      // state.test.count += count
      state.newResource[k] = v;
      emitter.emit(state.events.RENDER)
    })

    emitter.on('newTutorial:update', function(k,v) {
      // state.test.count += count
      state.newResource[k] = v;
      emitter.emit(state.events.RENDER)
    })
  });
}

module.exports = pageStore;
