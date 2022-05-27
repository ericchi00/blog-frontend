import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import BlogPostCard from './BlogPostCard';

const Home = () => {
	document.title = "Eric's Blog";
	const [loading, setLoading] = useState(true);
	const [blogPost, setBlogPosts] = useState([]);

	useEffect(() => {
		getBlogPosts();
	}, []);

	const getBlogPosts = async () => {
		try {
			const response = await fetch(
				'https://infinite-ridge-47874.herokuapp.com/https://api-only-backend-blog-react.herokuapp.com/api/blogposts'
			);
			const blogPosts = await response.json();
			setBlogPosts(blogPosts);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container
			fluid="xl"
			className="p-5 d-flex flex-wrap justify-content-center"
		>
			{loading ? (
				<Spinner
					animation="border"
					role="status"
					variant="primary"
					style={{
						width: '4rem',
						height: '4rem',
						marginTop: '8rem',
					}}
				>
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			) : (
				<>
					{blogPost.map((blogPost, i) => {
						return <BlogPostCard blogPost={blogPost} key={blogPost._id} />;
					})}
				</>
			)}
		</Container>
	);
};

export default Home;
