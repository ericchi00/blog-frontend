import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import BlogPostCard from './BlogPostCard';

const Home = () => {
	document.title = "Eric's Blog";
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
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container
			fluid="xl"
			className="p-5 d-flex flex-wrap justify-content-center"
		>
			{blogPost.map((blogPost, i) => {
				return <BlogPostCard blogPost={blogPost} key={blogPost._id} />;
			})}
		</Container>
	);
};

export default Home;
