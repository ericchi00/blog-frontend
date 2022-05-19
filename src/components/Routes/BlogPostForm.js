import React, { useState, useRef } from 'react';
import { useAuthUser, useAuthHeader } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';

const BlogPostForm = () => {
	const [error, setError] = useState(false);
	const editorRef = useRef(null);
	const [dirty, setDirty] = useState(false);
	const [title, setTitle] = useState('');

	const auth = useAuthUser();
	const id = auth().id;
	const authHeader = useAuthHeader();

	const navigate = useNavigate();

	const handleTitle = (e) => {
		const { value } = e.target;
		setTitle(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (editorRef.current) {
			const text = editorRef.current.getContent();
			setDirty(false);
			editorRef.current.setDirty(false);

			const postMessage = await fetch('/api/blogposts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authHeader(),
				},
				body: JSON.stringify({ id, title, text }),
			});
			if (postMessage.status === 200) {
				navigate('/');
			} else {
				setError(true);
			}
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
							onChange={(e) => handleTitle(e)}
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="message">
						<Form.Label>
							Message<span className="text-danger">*</span>
						</Form.Label>
						<Editor
							apiKey={process.env.REACT_APP_TINY_MCE}
							onInit={(evt, editor) => (editorRef.current = editor)}
							onDirty={() => setDirty(true)}
							initialValue={'<p>Enter your text here...</p>'}
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
					<Button variant="primary" type="submit" className="m-1 float-end">
						Submit
					</Button>
					{error ? (
						<Alert variant="danger">
							An error has occurred. Please try again.
						</Alert>
					) : null}
				</Form>
			</Container>
		</>
	);
};
export default BlogPostForm;