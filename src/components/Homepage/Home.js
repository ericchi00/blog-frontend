import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Home = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// getPosts();
		tempPosts();
	}, []);

	const tempPosts = () => {
		setPosts([
			{
				_id: Math.random() * 3,
				title: 'test message',
				text: 'test text, very big very cool, much wow',
				date: '5/14/2022',
				username: 'ericchi',
				comments: [
					{
						name: 'test comment',
						comment: 'test comment',
					},
				],
			},
		]);
	};

	const getPosts = async () => {
		try {
			const response = await fetch('/api/posts', { mode: 'cors' });
			const posts = await response.json();
			setPosts(posts);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Container fluid className="m-5">
				{posts.map((post, i) => {
					return (
						<Card key={post._id} style={{ width: '350px' }}>
							<Card.Body>
								<Card.Title>
									<Card.Link href="">{post.title}</Card.Link>
								</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									Published by: {post.username} on {post.date}
								</Card.Subtitle>
								<Card.Text>{post.text}</Card.Text>
								<Card.Link href="" className="float-end">
									Comments
								</Card.Link>
							</Card.Body>
						</Card>
					);
				})}
			</Container>
		</>
	);
};

export default Home;
