import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import MessageCard from './MessageCard';

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
		<Container fluid className="p-5 d-flex flex-wrap">
			{messages.map((message, i) => {
				return <MessageCard message={message} key={message._id} />;
			})}
		</Container>
	);
};

export default Home;
