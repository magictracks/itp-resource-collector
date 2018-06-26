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

    const $pageChanger = $("#pageChanger");


    let outputData = {
      previewTitle:'',
      previewUrl:'',
      previewDesc:'',
      tags:[],
      checkedTypes:[],
      levelRating:'',
      timeCommitment:'',
      previewImageUrl:'',
      user:'',
      keywordExtraction:[]
    }

    /**
    @ when a new page is selected in the dropdown...
    @*/
    $pageChanger.on("change", function(e){
      // console.log(e.target.value )
      make(e.target.value);
    });
    make($("#pageChanger option:selected").val())

    /**
    @ tagging selector
    @ */
    $multiSelect.selectize({
        plugins: ['remove_button'],
        options: [
            { value: 'javascript', text: 'javascript' },
            { value: 'coding train', text: 'coding train' },
            { value: 'machine learning', text: 'machine learning' },
            { value: 'creative coding', text: 'creative coding' }
        ],
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

    /**
    @ level selector
    @ */
    $levelSelect.selectize({
        onChange: function(value) {
            console.log(value);

            outputData.levelRating = value; // save to output
            $previewLevel.html(value);
        }
    });

    $timeSelect.selectize({
        onChange: function(value) {
            console.log(value);

            outputData.timeCommitment = value; // save to output
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
    });


    /**
    @ get initial state
    @ */
    (function getInitialState() {
        $previewLevel.html($levelSelect.find(':selected').val())
        $previewTime.html($timeSelect.find(':selected').val())
    })();
    

    function make(tempUrl){
      // DEMO: get html page from somewhere e.g. youtube and pull meta tags
      // https://medium.com/@punitweb/pantone-colors-for-designers-515871175cb
      // https://github.com/joeyklee/itp-diy-syllabus
      // https://vimeo.com/144704359
      // TODO: youtube doesn't have meta tags! But it does have keywords
      // https://www.youtube.com/watch?v=0QjgnEBp__U&t=8s
      // const tempUrl = 'https://vimeo.com/144704359'
      $.ajax({
          url: `https://cors-anywhere.herokuapp.com/${tempUrl}`,
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
                outputData.previewTitle = metaTags.find(isMetaTitle).content
                outputData.previewUrl = metaTags.find(isMetaUrl).content
                outputData.previewDesc = metaTags.find(isMetaDesc).content
                outputData.previewImageUrl = metaTags.find(isMetaImage).content
                
              } else{
                console.log("no meta tags to pull from!")
                // default everything to the requested page url
                outputData.previewTitle = tempUrl;
                outputData.previewDesc = tempUrl;
                outputData.previewImageUrl = 'http://via.placeholder.com/350x350';
                outputData.previewUrl = tempUrl;
              }
              // title
              $previewTitle.html(outputData.previewTitle)
              // image
              $resourcePreviewImage.css("background-image", `url(${outputData.previewImageUrl})`)
              // description
              $previewDesc.html(outputData.previewDesc) 
              // url
              $previewUrl.attr("href", outputData.previewUrl)
              $previewUrl.html(outputData.previewUrl)
              
          }

      });
    } // end make()

});