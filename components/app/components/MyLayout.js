import Header from './Header'

const Layout = (props) => (

	<div>
		<Header />
		{props.children}

		<style jsx>{`
			*{
				box-sizing: border-box;
				font-family: Helvetica, sans serif;
			}
		`}</style>
	</div>
)

export default Layout