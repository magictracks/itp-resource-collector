$(document).ready(function() {
    let $previewLevel = $(".previewLevel"),
        $previewTime = $(".previewTime"),
        $previewTagCount = $(".previewTagCount"),
        $multiSelect = $('#multiSelect'),
        $levelSelect = $("#levelSelect"),
        $timeSelect = $("#timeSelect"),
        $typeSelect = $("#typeSelect"),
        checkedTypes = [],
        $previewTitle = $(".previewTitle"),
        $resourcePreviewImage = $(".resourcePreviewImage"),
        $previewDesc = $(".previewDesc"),
        $previewUrl = $(".previewUrl"),
        $submitResourceBtn = $("#submitResourceBtn");


    let outputData = {
      title:'',
      url:'',
      desc:'',
      tags:[],
      checkedTypes:[],
      levelRating:[],
      timeCommitment:[],
      imageUrl:'',
      submittedBy:[],
      keywordExtraction:[]
    }

   

    /**
    @ tagging selector
    @ */
    let taggingSuggestions = [];
    $.get( "http://127.0.0.1:5000/api/resources/tags", function(data) {
        console.log(data)
        taggingSuggestions = data.map(item => {
          return {"value": item, "text": item}
        })
      })
      .fail(function() {
        taggingSuggestions = [
            { value: 'javascript', text: 'javascript' },
            { value: 'coding train', text: 'coding train' },
            { value: 'machine learning', text: 'machine learning' },
            { value: 'creative coding', text: 'creative coding' }
        ];
      }).always(function() {
        console.log(taggingSuggestions)
        $multiSelect.selectize({
            plugins: ['remove_button'],
            options: taggingSuggestions,
            placeholder: "add tags e.g. javascript, concept",
            delimiter: ',',
            persist: false,
            create: function(input) {
                return {
                    value: input,
                    text: input
                }
            },
            onChange: function(value) {
                console.log(value)

                let count;
                if (value) count = value.split(",").length;
                if (!value) count = 0;

                outputData.tags = value.split(","); // save to output
                $previewTagCount.html(count)
            }
        });
      });

    /**
    @ level selector
    @ */
    $levelSelect.selectize({
        onChange: function(value) {
            console.log(value);

            outputData.levelRating = [];
            outputData.levelRating.push(value); // save to output
            $previewLevel.html(value);
        }
    });

    $timeSelect.selectize({
        onChange: function(value) {
            console.log(value);

            outputData.timeCommitment = [];
            outputData.timeCommitment.push(value); // save to output
            $previewTime.html(value);
        }
    });


    /**
    @ type selector
    @ */
    $typeSelect.on("change", function(e) {
        checkedTypes = [];
        $(this).find('input:checked').each( (index, option) => {
          checkedTypes.push( option.value)
        })

        outputData.checkedTypes = checkedTypes; // save to output
    });

    /**
    @ submit button
    @ */
    $submitResourceBtn.click(function(e){
      e.preventDefault();
      console.log(outputData);
        $.ajax({
          type: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          url: "http://127.0.0.1:5000/api/resources",
          data: JSON.stringify(outputData),
          success: function(data){
            console.log(data)
          },
          dataType: 'json'
        });

        // $.get("http://127.0.0.1:5000/")
    });


    /**
    @ get initial state
    @ */
    (function getInitialState() {
        $previewLevel.html($levelSelect.find(':selected').val())
        $previewTime.html($timeSelect.find(':selected').val())
    })();
    

    function make(tempUrl){
      $.ajax({
          url: tempUrl,
          success: function(data) {
              let body = $(data)
              let metaTags = [];
              // run through all the meta tags and pick out our features
              body.each(d => {
                  let obj = $(body[d]);
                  if (obj.is("meta") == true && obj.attr("property") !== undefined) {
                      metaTags.push({
                        "property":obj.attr("property"), 
                        "content":obj.attr("content")
                      });
                  }
              })

              function isMetaImage(meta){
                return meta.property === "og:image";
              }
              function isMetaDesc(meta){
                return meta.property === "og:description";
              }
              function isMetaTitle(meta){
                return meta.property === "og:title";
              }
              function isMetaUrl(meta){
                return meta.property === "og:url";
              }
              function isMetaSiteName(meta){
                return meta.property === "og:site_name";
              }

              if(metaTags.length > 0){
                // save to output
                outputData.title = metaTags.find(isMetaTitle).content
                outputData.url = metaTags.find(isMetaUrl).content
                outputData.desc = metaTags.find(isMetaDesc).content
                outputData.imageUrl = metaTags.find(isMetaImage).content
                
              } else{
                console.log("no meta tags to pull from!")
                // default everything to the requested page url
                outputData.title = tempUrl;
                outputData.desc = tempUrl;
                outputData.imageUrl = 'http://via.placeholder.com/350x350';
                outputData.url = tempUrl;
              }
              // title
              $previewTitle.html(outputData.title)
              // image
              $resourcePreviewImage.css("background-image", `url(${outputData.imageUrl})`)
              // description
              $previewDesc.html(outputData.desc) 
              // url
              $previewUrl.attr("href", outputData.url)
              $previewUrl.html(outputData.url)
              
          }

      });
    } // end make()


    // get the windowLocation
    function getWindowLocation() {
      chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT},
      function(tab) {
        chrome.tabs.sendMessage(tab[0].id, {method: "getWindowLocation"},
        function(response){
          console.log(response.data);
          make(response.data);
        });
      });
    }
    // call when popup opens:
    getWindowLocation();

});