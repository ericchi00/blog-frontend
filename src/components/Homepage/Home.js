import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns';

const createMarkup = (html) => {
	return { __html: html };
};

const Home = () => {
	document.title = 'Message Board';
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		getMessages();
	}, []);

	const getMessages = async () => {
		try {
			const response = await fetch('/api/messages', { mode: 'cors' });
			const messages = await response.json();
			setMessages(messages);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Container fluid className="p-5 d-flex flex-wrap">
				{messages.map((message, i) => {
					return (
						<Card key={message._id} style={{ width: '350px', margin: '1rem' }}>
							<Card.Body>
								<Card.Title>
									<Card.Link href={`/messages/${message._id}`}>
										{message.title}
									</Card.Link>
								</Card.Title>
								<Card.Subtitle className="mb-2 text-muted">
									<span>Published by: {message.username.username}</span>
									<p> {format(new Date(message.date), 'Pp')}</p>
								</Card.Subtitle>
								<Card.Text
									dangerouslySetInnerHTML={createMarkup(message.text)}
								></Card.Text>
								<Card.Link
									href={`/messages/${message._id}`}
									className="position-absolute bottom-0 end-0 p-2"
								>
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
