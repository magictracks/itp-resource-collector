function pageStore(state, emitter) {
  state.page = {
    markup: "",
    imageLinks: [],
    metas: []
  }

  // TODO: Get the existing tutorials from a db
  state.existingTutorials = {
    selectedId: "uid1",
    selectedPosition:0,
    selectedSectionId:"",
    selectedSectionPosition:"",
    data: [
    {
      title: "tutorial 1",
      description: "I'm a description",
      headerImageUrl: "https://user-images.githubusercontent.com/3622055/42908563-4778bd04-8aaf-11e8-95c1-47e18c0643a4.png",
      id: "uid1",
      sections:[
        {
          position: 0,
          id: "",
          tutorialId: "uid1",
          properties: {
            title:"I'm a section title 1",
            description:"I'm a section description",
            headerImageUrl:""
          }
        },
        {
          position: 1,
          id: "",
          tutorialId: "uid1",
          properties: {
            title:"I'm a section title 2",
            description:"I'm a section description",
            headerImageUrl:""
          }
        }
      ]
    },{
      title: "tutorial 2",
      description: "I'm a description",
      headerImageUrl: "https://user-images.githubusercontent.com/3622055/42908563-4778bd04-8aaf-11e8-95c1-47e18c0643a4.png",
      id: "uid2",
      sections:[
        {
          position: 0,
          id: "",
          tutorialId: "uid2",
          properties: {
            title:"I'm a section title b",
            description:"I'm a section description",
            headerImageUrl:""
          }
        },
        {
          position: 1,
          id: "",
          tutorialId: "uid2",
          properties: {
            title:"I'm a section title c",
            description:"I'm a section description",
            headerImageUrl:""
          }
        }
      ]
    }
    ]
  };

  state.newResource = {
    headerImageUrl:"",
    title:"",
    description:"",
    url:"",
    tags:""
  }

  state.newTutorial = {
    menuToggled: false,
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
      state.newTutorial[k] = v;
      emitter.emit(state.events.RENDER)
    })

    emitter.on('newTutorial:menuToggled', function() {
      // state.test.count += count
      state.newTutorial.menuToggled = !state.newTutorial.menuToggled;
      emitter.emit(state.events.RENDER)
    })


    emitter.on('existingTutorial:selected', function(uid) {
      // state.test.count += count
      // state.newTutorial.menuToggled = !state.newTutorial.menuToggled;
      state.existingTutorials.selectedId = uid;
      state.existingTutorials.data.forEach( (tutorial, idx) => {
        if (tutorial.id == uid) state.existingTutorials.selectedPosition = idx }
      );

      emitter.emit(state.events.RENDER)
    })



  });
}

module.exports = pageStore;
