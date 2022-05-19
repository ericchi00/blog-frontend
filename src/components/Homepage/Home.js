import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import BlogPostCard from './BlogPostCard';

const Home = () => {
	document.title = 'Blogging';
	const [blogPost, setBlogPosts] = useState([]);

	useEffect(() => {
		getBlogPosts();
	}, []);

	const getBlogPosts = async () => {
		try {
			const response = await fetch('/api/blogposts', { mode: 'cors' });
			const blogPosts = await response.json();
			setBlogPosts(blogPosts);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container
			fluid="xxl"
			className="p-5 d-flex flex-wrap justify-content-center"
		>
			{blogPost.map((blogPost, i) => {
				return <BlogPostCard blogPost={blogPost} key={blogPost._id} />;
			})}
		</Container>
	);
};

export default Home;
