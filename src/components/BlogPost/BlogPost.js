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
import Modal from 'react-bootstrap/Modal';

const createMarkup = (html) => {
	return { __html: html };
};

const ConfirmDelete = ({ show, onHide }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const authHeader = useAuthHeader();
	const handleDelete = async () => {
		navigate('/');
		const deleteBlogPost = await fetch(
			`https://infinite-ridge-47874.herokuapp.com/https://api-only-backend-blog-react.herokuapp.com/api/blogposts/${id}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: authHeader(),
				},
			}
		);
	};
	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<h4>Are you sure you want to delete?</h4>
			</Modal.Header>
			<Modal.Body
				className="d-flex justify-content-center"
				style={{ gap: '.5rem' }}
			>
				<Button variant="outline-danger" onClick={() => handleDelete()}>
					Yes
				</Button>
				<Button variant="outline-secondary" onClick={() => onHide()}>
					No
				</Button>
			</Modal.Body>
		</Modal>
	);
};

const BlogPost = () => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [blogPostInfo, setBlogPostInfo] = useState('');
	const [comment, setComment] = useState('');
	const [newComment, setNewComment] = useState(null);

	const [modalShow, setModalShow] = useState(false);

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

	const handleEdit = async () => {
		try {
			navigate('/createpost', {
				state: {
					blogPostInfo,
				},
			});
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = async () => {
		try {
			document.getElementsByTagName('textarea')[0].value = '';
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
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Container fluid>
			<ConfirmDelete show={modalShow} onHide={() => setModalShow(false)} />
			{loading ? null : (
				<Container style={{ maxWidth: '800px', marginTop: '3rem' }}>
					{isAuthenticated() &&
						auth().username === blogPostInfo.username.username && (
							<>
								<Button
									className="me-1"
									variant="outline-danger"
									onClick={() => setModalShow(true)}
								>
									Delete
								</Button>
								<Button
									variant="outline-secondary"
									onClick={() => handleEdit()}
								>
									Edit
								</Button>
							</>
						)}
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
