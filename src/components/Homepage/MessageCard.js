import React from 'react';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns';

const createMarkup = (html) => {
	return { __html: html };
};

const MessageCard = ({ message }) => {
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
};

export default MessageCard;
