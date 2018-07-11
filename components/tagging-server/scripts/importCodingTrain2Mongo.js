const fs = require('fs');
const rp = require('request-promise');
const Q = require('q')
const { exec } = require('child_process');

let data = JSON.parse(fs.readFileSync('data/videoDetails.json'));

let output = [];

// throw the videos into 
data.forEach( video => {
	output.push( formatData(video) )
})


function formatData(video){
	let d = {
		title:'',
		url:'',
		desc:'',
		tags:[],
		checkedTypes:[],
		levelRating:[],
		timeCommitment:[],
		imageUrl:'',
		submittedBy:[],
		keywordExtraction: []
	}

	d.title = video.items[0].snippet.title
	d.desc = video.items[0].snippet.description
	d.url = `https://www.youtube.com/watch?v=${video.items[0].id}`
	d.tags = video.items[0].snippet.tags
	d.checkedTypes.push("video")
	// d.levelRating.push()
	d.timeCommitment.push(parseDuration(video.items[0].contentDetails.duration) )
	d.imageUrl = video.items[0].snippet.thumbnails['default'].url

	return d;
}



function parseDuration(time){
	let output;

	output = time.split(/[PTHMS]+/)
  output = output.filter(d => d !== "" )

  if(output.length == 3){
  	let timeVal = output[0];
  	if(timeVal == 1 ) {
  		return '1 hr - 2 hr'
  	} else if(timeVal > 1 ){
  		return '> 2 hr'
  	}
  } else if (output.length == 2){
  	if(output[0] < 30 ){
  		return '< 30 min'
  	} else{
  		return '30 min - 1 hr'
  	}
  }
}

function post2Mongo(video){
  let options = {
  	method: 'POST',
  	uri: "http://127.0.0.1:5000/api/resources",
  	body: video,
  	json: true
  }

  return rp(options)
    .then( results => {
      return results
    }).catch( err => {
      return err
    })

}


Q.all(output.map(video => post2Mongo(video))).then( results => {
  return results
}).catch( err =>{
  console.log(err)
})


fs.writeFile("data/videoDetailsFormatted.json", JSON.stringify(output), (err, data) => {
	if(err) return err
	console.log("written to file!")
});

})


// fs.writeFile("data/videoDetailsFormatted.json", JSON.stringify(output), (err, data) => {

// 	exec('mongoimport --drop --db itp-tagged-resources --collection resources data/videoDetailsFormatted.json --jsonArray',(err, stdout, stderr) => {
//   if (err) {
//     console.error(`exec error: ${err}`);
//     return;
//   }

//   console.log(`Number of files ${stdout}`);
// });

// })





/*@@ sample

{
  "kind": "youtube#videoListResponse",
  "etag": "\"DuHzAJ-eQIiCIp7p4ldoVcVAOeY/1ogjv1MdrjOgiTnxKXJde33ITK4\"",
  "pageInfo": {
    "totalResults": 1,
    "resultsPerPage": 1
  },
  "items": [
    {
      "kind": "youtube#video",
      "etag": "\"DuHzAJ-eQIiCIp7p4ldoVcVAOeY/BgUgDPao9rlJsD2JO9nWQFhtFQo\"",
      "id": "s70-Vsud9Vk",
      "snippet": {
        "publishedAt": "2015-11-13T02:54:57.000Z",
        "channelId": "UCvjgXvBlbQiydffZU7m1_aw",
        "title": "15.2: What is NPM? - Twitter Bot Tutorial",
        "description": "This video covers the basics of npm (node package manager).  What is node package manager?  What are some basic commands like \"init\" and \"install\"?  How do you use a Twitter package.\n\nIf you run into an issue with \"access denied\" you can try \"sudo\", i.e.  \"sudo npm install twit --save\"\n\nAll examples: https://github.com/shiffman/Video-Lesson-Materials\n\nContact: https://twitter.com/shiffman\n\nNext video:\nhttps://youtu.be/GQC2lJIAyzM\n\nLearn JavaScript basics: \nhttps://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA\n\nLearn Processing basics:\nhttps://www.youtube.com/user/shiffman/playlists?sort=dd&shelf_id=2&view=50\n\nMore about data and APIs:\nhttps://www.youtube.com/playlist?list=PLRqwX-V7Uu6a-SQiI4RtIwuOrLJGnel0r\n\nHelp us caption & translate this video!\n\nhttp://amara.org/v/Qbtr/",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/s70-Vsud9Vk/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/s70-Vsud9Vk/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/s70-Vsud9Vk/hqdefault.jpg",
            "width": 480,
            "height": 360
          },
          "standard": {
            "url": "https://i.ytimg.com/vi/s70-Vsud9Vk/sddefault.jpg",
            "width": 640,
            "height": 480
          }
        },
        "channelTitle": "The Coding Train",
        "tags": [
          "Twitterbot",
          "Tutorial (Media Genre)",
          "Twitter (Award-Winning Work)",
          "Npm",
          "Node.js (Software)",
          "JavaScript (Programming Language)",
          "bot",
          "botALLY",
          "twitter bot",
          "node package manager"
        ],
        "categoryId": "27",
        "liveBroadcastContent": "none",
        "localized": {
          "title": "15.2: What is NPM? - Twitter Bot Tutorial",
          "description": "This video covers the basics of npm (node package manager).  What is node package manager?  What are some basic commands like \"init\" and \"install\"?  How do you use a Twitter package.\n\nIf you run into an issue with \"access denied\" you can try \"sudo\", i.e.  \"sudo npm install twit --save\"\n\nAll examples: https://github.com/shiffman/Video-Lesson-Materials\n\nContact: https://twitter.com/shiffman\n\nNext video:\nhttps://youtu.be/GQC2lJIAyzM\n\nLearn JavaScript basics: \nhttps://www.youtube.com/playlist?list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA\n\nLearn Processing basics:\nhttps://www.youtube.com/user/shiffman/playlists?sort=dd&shelf_id=2&view=50\n\nMore about data and APIs:\nhttps://www.youtube.com/playlist?list=PLRqwX-V7Uu6a-SQiI4RtIwuOrLJGnel0r\n\nHelp us caption & translate this video!\n\nhttp://amara.org/v/Qbtr/"
        },
        "defaultAudioLanguage": "en"
      },
      "contentDetails": {
        "duration": "PT13M27S",
        "dimension": "2d",
        "definition": "hd",
        "caption": "true",
        "licensedContent": true,
        "projection": "rectangular"
      },
      "statistics": {
        "viewCount": "107583",
        "likeCount": "1514",
        "dislikeCount": "31",
        "favoriteCount": "0",
        "commentCount": "136"
      }
    }
  ]
},
*/
