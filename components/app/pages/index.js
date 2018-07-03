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
    	{props.resources.map( resource => { 
    			let pageId = resource.title.replace(/[^a-zA-Z0-9-_]/g, '');
    			return(
    				<ResourceLink {...resource} pageId={pageId}/>
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

	console.log(`resources fetched. count: ${data.length}`)

	return {
		resources: data
	}
}



export default Index