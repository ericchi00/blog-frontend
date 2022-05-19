import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';

const createMarkup = (html) => {
	return { __html: html };
};

const Message = () => {
	const [loading, setLoading] = useState(true);
	const [messageInfo, setMessageInfo] = useState('');
	const [comments, setComments] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();

	const isAuthenticated = useIsAuthenticated();
	const auth = useAuthUser();

	useEffect(() => {
		getMessageFromID();
	}, []);

	const getMessageFromID = async () => {
		const getMessage = await fetch(`/api/messages/${id}`);
		if (getMessage.status === 500) {
			return navigate('*');
		}
		const response = await getMessage.json();
		setMessageInfo(response);
		setLoading(false);
	};

	return (
		<Container fluid>
			{loading ? null : (
				<Container style={{ maxWidth: '800px', marginTop: '3rem' }}>
					<h1 className="text-center">{messageInfo.title}</h1>
					<span>Published by: {messageInfo.username.username}</span>
					<p> {format(new Date(messageInfo.date), 'Pp')}</p>
					<p dangerouslySetInnerHTML={createMarkup(messageInfo.text)}></p>

					{isAuthenticated() ? (
						<>
							<Form>
								<Form.Group className="mt-5 mb-3" controlId="comment">
									<Form.Label className="invisible">Comment</Form.Label>
									<p>username: auth data </p>
									<Form.Control as="textarea" rows={3} />
								</Form.Group>
								<Button variant="primary">Submit Comment</Button>
							</Form>
							<h4 className="mt-3 border-bottom">Comments</h4>
						</>
					) : null}
				</Container>
			)}
		</Container>
	);
};

export default Message;
