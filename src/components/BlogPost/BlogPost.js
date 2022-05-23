import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useAuthUser, useIsAuthenticated, useAuthHeader } from 'react-auth-kit';
import Comment from './Comment';

const createMarkup = (html) => {
	return { __html: html };
};

const BlogPost = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [blogPostInfo, setBlogPostInfo] = useState('');
	const [comment, setComment] = useState('');
	const [newComment, setNewComment] = useState(null);

	const { id } = useParams();
	const navigate = useNavigate();
	const isAuthenticated = useIsAuthenticated();
	const auth = useAuthUser();
	const authHeader = useAuthHeader();

	useEffect(() => {
		getBlogPostFromID();
		setNewComment(false);
	}, [newComment]);

	const getBlogPostFromID = async () => {
		const getBlogPost = await fetch(
			`https://infinite-ridge-47874.herokuapp.com/https://api-only-backend-blog-react.herokuapp.com/api/blogposts/${id}`
		);
		if (getBlogPost.status === 500) {
			return navigate('*');
		}
		const response = await getBlogPost.json();
		document.title = response.title;
		setBlogPostInfo(response);
		setLoading(false);
	};

	const handleComment = (e) => {
		const { value } = e.target;
		setComment(value);
	};

	const handleSubmit = async (e) => {
		setNewComment(true);
		const postComment = await fetch(
			`https://infinite-ridge-47874.herokuapp.com/https://api-only-backend-blog-react.herokuapp.com/api/blogposts/${id}/comments`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authHeader(),
				},
				body: JSON.stringify({ username: auth().id, comment, id }),
			}
		);
		if (postComment.status !== 200) {
			return setError(true);
		}
	};

	return (
		<Container fluid>
			{loading ? null : (
				<Container style={{ maxWidth: '800px', marginTop: '3rem' }}>
					<h1 className="text-center">{blogPostInfo.title}</h1>
					<span>Published by: {blogPostInfo.username.username}</span>
					<p> {format(new Date(blogPostInfo.date), 'Pp')}</p>
					<p
						className="mb-5"
						dangerouslySetInnerHTML={createMarkup(blogPostInfo.text)}
					></p>

					{isAuthenticated() ? (
						<Form className="mb-5">
							<Form.Group className="mt-5 mb-3" controlId="comment">
								<Form.Label className="invisible">Comment</Form.Label>
								<p>commenting as: {auth().username}</p>
								{error ? (
									<Alert variant="danger">
										Error occurred while submitting. Try again.
									</Alert>
								) : null}
								<Form.Control
									as="textarea"
									name="comment"
									rows={3}
									minLength="3"
									maxLength="150"
									onChange={(e) => handleComment(e)}
									required
								/>
							</Form.Group>
							<Button
								variant="secondary"
								type="button"
								className="float-end"
								onClick={() => handleSubmit()}
							>
								Submit Comment
							</Button>
						</Form>
					) : null}
					<h4 className="mt-3 border-bottom">Comments</h4>
					{blogPostInfo.comments.length === 0 ? (
						<p>No comments. Make the first one!</p>
					) : (
						<>
							{blogPostInfo.comments.map((comment, i) => {
								return <Comment key={comment._id} comment={comment} />;
							})}
						</>
					)}
				</Container>
			)}
		</Container>
	);
};

export default BlogPost;
