import {withRouter} from 'next/router'
import Layout from '../components/MyLayout.js'


// const Content = withRouter((props) => (
// 	<div>
// 		{console.log(props)}
// 		<h1>{props.router.query.title}</h1>
// 		<p>This is the blog post content.</p>
// 	</div>
// ))

const Post = (props) => (
    <Layout>
       {/*<Content />*/}
       <h1>{props.resource.title}</h1>
       <img src={props.resource.imageUrl}/>
       <h2>Go To Resource: <a href={props.resource.url}>{props.resource.url}</a></h2>
       <h4>{props.resource.desc}</h4>
       <h4><span>Marked as: </span>{props.resource.levelRating.map(rating => {
	       		return(<li>{rating.property}</li>)
	       	})}
       </h4>
	      <h4><span>Estimated Time Commitment between : </span>
        {
          props.resource.timeCommitment.map(time => {
		       		return(<li>{time.property}</li>)
		       	})
        }
	      </h4>
       <p>
       	<label>tags:</label>
	      <ul>
	       	{props.resource.tags.map(tag => {
	       		return(<li>{tag.property}</li>)
	       	})}
	      </ul>
       </p>
       <style jsx>{`
       		img{
       			width:200px;
       			height:auto;
       		}
       	`}</style>
    </Layout>
)

Post.getInitialProps = async function(context){
	const {id} = context.query

	const res = await fetch(`http://127.0.0.1:5000/api/resources/${id}`)
	const resource = await res.json()

	console.log(`Fetched show: ${resource.id}`)

  return { resource }
}

export default Post