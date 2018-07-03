import Link from 'next/link'

const PostLink = (props) => (
	<li>
		<Link key={props.id} as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
			<a>{props.title}</a>
		</Link>
	</li>

)

function getPosts() {
	return [
	{id:"hello-world", title: "hello world"},
	{id:"bonjour-le-monde", title: "bonjour le monde"},
	{id:"hallo-Welt", title: "hallo Welt"}
	]
}

const PostLinks = () => (
	<ul>
		{
			getPosts().map( post => (
			<PostLink {...post} />
			)
		)
		}
	</ul>
)
