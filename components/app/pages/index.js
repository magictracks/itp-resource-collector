// This is the Link API
import Header from '../components/Header'
import Layout from '../components/MyLayout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'


const ResourceLink = (props, pageId) => (

	<li key={props._id}>
		<Link as={`/p/${props._id}`} href={`/post?id=${props._id}`}>
			<a>{props.title}</a>
		</Link>
	</li>
)

const Index = (props) => (
  <Layout>
    <h1> Current Submissions </h1>
    {/*<PostLinks/>*/}
    <ul>

    	{

        props.resources.map( resource => { 

          let links = resource.videos.map(link => {
            let pageId = link.title.replace(/[^a-zA-Z0-9-_]/g, '');
            return(
              <ResourceLink {...link} pageId={pageId}/>
            )
          })

          return (
            <div>
            <h2> {resource.playlist} </h2>
            {links}
            </div>
          )
    			
    	 })
    	}
    </ul>

    <style jsx>{`
          h1{
          	color: tomato
          }
        `}</style>
  </Layout>

)

Index.getInitialProps  = async function(){
	const res = await fetch('http://127.0.0.1:5000/api/resources')
	const data = await res.json();
  let output

	console.log(`resources fetched. count: ${data.length}`)

  output = sortCodingTrain(data);

	return {
		resources: output
	}
}

function sortCodingTrain(data){
  let playlists = [
    {playlist:"p5.js Tutorial", videos:[]},
    {playlist:"Twitter Bot Tutorial", videos:[]},
    {playlist:"p5.js Sound Tutorial", videos:[]},
    {playlist:"Processing Tutorial", videos:[]},
    {playlist:"The Nature of Code", videos:[]},
    {playlist:"Coding Challenge", videos:[]},
    {playlist:"Programming with Text", videos:[]},
    {playlist:"WebGL and p5.js Tutorial", videos:[]},
    {playlist:"Topics of JavaScript/ES6", videos:[]},
    {playlist:"Guest Tutorial", videos:[]},
    {playlist:"Q&A", videos:[]},
    {playlist:"Misc", videos:[]}
  ]

  playlists.forEach(playlist => {
    data.forEach(video => {

    if(video.title.search(playlist.playlist) > -1){
      playlist.videos.push(video)
    } 

    })

    // sort alphabetical
    playlist.videos.sort( function(a, b) {
      var nameA = a.title.toUpperCase(); // ignore upper and lowercase
      var nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    } )
  })



  return playlists;
}






export default Index