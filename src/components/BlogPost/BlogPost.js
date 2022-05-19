import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
import Comment from './Comment';

const createMarkup = (html) => {
	return { __html: html };
};

const BlogPost = () => {
	const [loading, setLoading] = useState(true);
	const [blogPostInfo, setBlogPostInfo] = useState('');
	const [comments, setComments] = useState('');
	const navigate = useNavigate();
	const { id } = useParams();

	document.title = blogPostInfo.title;

	const isAuthenticated = useIsAuthenticated();
	const auth = useAuthUser();

	useEffect(() => {
		getBlogPostFromID();
	}, []);

	const getBlogPostFromID = async () => {
		const getBlogPost = await fetch(`/api/blogposts/${id}`);
		if (getBlogPost.status === 500) {
			return navigate('*');
		}
		const response = await getBlogPost.json();
		setBlogPostInfo(response);
		setLoading(false);
	};

	return (
		<Container fluid>
			{loading ? null : (
				<Container style={{ maxWidth: '800px', marginTop: '3rem' }}>
					<h1 className="text-center">{blogPostInfo.title}</h1>
					<span>Published by: {blogPostInfo.username.username}</span>
					<p> {format(new Date(blogPostInfo.date), 'Pp')}</p>
					<p className='mb-5' dangerouslySetInnerHTML={createMarkup(blogPostInfo.text)}></p>

					{isAuthenticated() ? (
						<Form className="mb-5">
							<Form.Group className="mt-5 mb-3" controlId="comment">
								<Form.Label className="invisible">Comment</Form.Label>
								<p>commenting as: {auth().username}</p>
								<Form.Control
									as="textarea"
									name="comment"
									rows={3}
									minLength={3}
									maxLength={500}
									required
								/>
							</Form.Group>
							<Button variant="secondary" type="submit" className="float-end">
								Submit Comment
							</Button>
						</Form>
					) : null}
					<h4 className="mt-3 border-bottom">Comments</h4>
				</Container>
			)}
		</Container>
	);
};

export default BlogPost;
