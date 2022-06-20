import React, { useState, useRef, useEffect } from 'react';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate, useLocation } from 'react-router-dom';

const BlogPostForm = () => {
	const location = useLocation();
	const [error, setError] = useState(false);
	const editorRef = useRef(null);
	const [dirty, setDirty] = useState(false);
	const [title, setTitle] = useState('');
	const [initialValue, setInitialValue] = useState(
		'<p>Enter your text here...</p>'
	);
	const [postID, setPostID] = useState(null);

	const auth = useAuthUser();
	const authHeader = useAuthHeader();

	const navigate = useNavigate();

	useEffect(() => {
		if (location.state) {
			setTitle(location.state.blogPostInfo.title);
			setInitialValue(location.state.blogPostInfo.text);
			setPostID(location.state.blogPostInfo._id);
		}
	}, []);

	const handleTitle = (e) => {
		const { value } = e.target;
		setTitle(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (editorRef.current) {
			const text = editorRef.current.getContent();
			if (text.length < 2) {
				setError(true);
				return;
			}
			setDirty(false);
			editorRef.current.setDirty(false);
			const id = auth().id;
			const postMessage = await fetch(
				'https://infinite-ridge-47874.herokuapp.com/https://api-only-backend-blog-react.herokuapp.com/api/blogposts',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: authHeader(),
					},
					body: JSON.stringify({ id, title, text, postID }),
				}
			);
			const blogPostID = await postMessage.json();
			navigate(`/blogposts/${blogPostID}`);
		}
	};

	return (
		<>
			<Container fluid="lg" className="mt-5">
				<Form
					className="border p-5 rounded border-3"
					onSubmit={(e) => handleSubmit(e)}
				>
					<div className="card-body p-0 text-center">
						<h3>Submit a Message</h3>
					</div>
					<Form.Group className="mb-3" controlId="title">
						<Form.Label>
							Title
							<span className="text-danger">*</span>
						</Form.Label>
						<Form.Control
							type="text"
							value={title}
							onChange={(e) => handleTitle(e)}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="message">
						<Form.Label>
							Message<span className="text-danger">*</span>
						</Form.Label>
						<Editor
							textareaName="text"
							apiKey={process.env.REACT_APP_TINY_MCE}
							onInit={(evt, editor) => (editorRef.current = editor)}
							onDirty={() => setDirty(true)}
							initialValue={initialValue}
							init={{
								height: 250,
								menubar: false,
								plugins: [
									'advlist',
									'autolink',
									'lists',
									'link',
									'image',
									'charmap',
									'anchor',
									'searchreplace',
									'visualblocks',
									'code',
									'fullscreen',
									'insertdatetime',
									'media',
									'table',
									'preview',
									'help',
									'wordcount',
								],
								toolbar:
									'undo redo | blocks | ' +
									'bold italic forecolor | alignleft aligncenter ' +
									'alignright alignjustify | bullist numlist outdent indent | ' +
									'removeformat | help',
								content_style:
									'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
							}}
						/>
					</Form.Group>
					{error ? <Alert variant="danger">Text cannot be empty.</Alert> : null}
					<Button variant="primary" type="submit" className="m-1 float-end">
						Submit
					</Button>
				</Form>
			</Container>
		</>
	);
};
export default BlogPostForm;
