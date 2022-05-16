import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import MessageForm from './MessageForm';
import Form from 'react-bootstrap/Form';
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
				timestamp: '5/14/2022',
				useranme: 'date',
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
			<style type="text/css">
				{`.container-lg {
                        max-width: 600px;
                    }
					div[role=textbox] {
						border: 3px rgb(174,179,184) solid;
						margin-bottom: 1rem;
					}`}
			</style>
			<Container fluid="lg" className="justify-content-center mt-3">
				<Form className="border rounded border-3 border-dark p-4">
					<MessageForm></MessageForm>
					<Button variant="primary" className="pull-right">
						Submit Message
					</Button>
				</Form>
				{posts.map((post, i) => {
					return (
						<Card key={post._id} style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>
									<Card.Link href="">{post.title}</Card.Link>
								</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									Card Subtitle
								</Card.Subtitle>
								<Card.Text>{post.text}</Card.Text>
							</Card.Body>
						</Card>
					);
				})}
			</Container>
		</>
	);
};

export default Home;
