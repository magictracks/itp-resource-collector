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
        $resourcePreviewImage = $(".resourcePreviewImage img"),
        $previewDesc = $(".previewDesc");
        $previewUrl = $(".previewUrl");


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

            $previewTagCount.html(count)
        }
    });

    $levelSelect.selectize({
        onChange: function(value) {
            console.log(value);
            $previewLevel.html(value);
        }
    });

    $timeSelect.selectize({
        onChange: function(value) {
            console.log(value);
            $previewTime.html(value);
        }
    });


    $typeSelect.on("change", function(e) {
        checkedTypes = [];
        $(this).find('input:checked').each( (index, option) => {
          checkedTypes.push( option.value)
        })

        console.log(checkedTypes);
    });


    (function getInitialState() {
        $previewLevel.html($levelSelect.find(':selected').val())
        $previewTime.html($timeSelect.find(':selected').val())
    })();


    // DEMO: get html page from somewhere e.g. youtube and pull meta tags
    // https://medium.com/@punitweb/pantone-colors-for-designers-515871175cb
    // https://github.com/joeyklee/itp-diy-syllabus
    // https://vimeo.com/144704359

    // TODO: youtube doesn't have meta tags! But it does have keywords
    // https://www.youtube.com/watch?v=0QjgnEBp__U&t=8s
    const tempUrl = 'https://vimeo.com/144704359'
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
              $previewTitle.html(metaTags.find(isMetaTitle).content)
              $resourcePreviewImage.attr("src", metaTags.find(isMetaImage).content)
              $previewDesc.html(metaTags.find(isMetaDesc).content) 
              $previewUrl.attr("href", metaTags.find(isMetaUrl).content)
              $previewUrl.html(metaTags.find(isMetaUrl).content)
            } else{
              console.log("not meta tags to pull from!")
            }
            
        }
    });




});