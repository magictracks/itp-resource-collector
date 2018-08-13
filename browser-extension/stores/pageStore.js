function pageStore(state, emitter) {
  state.page = {
    markup: "",
    imageLinks: []
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

      metas.forEach(info => {
        if (info.getAttribute("property") == "og:image") {
          state.page.imageLinks.push(info.getAttribute("content"))
          console.log(state.page.imageLinks.length)
        }
      })

      emitter.emit(state.events.RENDER)
    })
  });
}

module.exports = pageStore;
