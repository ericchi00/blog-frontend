import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Editor } from '@tinymce/tinymce-react';

const MessageForm = () => {
	const editorRef = useRef(null);
	const [title, setTitle] = useState('');
	const [text, setText] = useState('');

	const handleTitle = (e) => {
		const { value } = e.target;
		setTitle(value);
	};

	const handleText = () => {
		if (editorRef.current) {
			setText(editorRef.current.getContent());
		}
	};

	const handleSubmit = async () => {
		alert(JSON.stringify({ title, text }));
	};

	return (
		<>
			<Container fluid="lg" className="mt-5">
				<Form
					className="border p-5 rounded border-3"
					action="/createpost"
					method="post"
					onSubmit={() => handleSubmit()}
				>
					<div className="card-body p-0 text-center">
						<h3>Submit a Post</h3>
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
							onChange={() => handleText()}
							apiKey={process.env.REACT_APP_TINY_MCE}
							onInit={(evt, editor) => (editorRef.current = editor)}
							initialValue="<p>Enter your text here...</p>"
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
				</Form>
			</Container>
		</>
	);
};
export default MessageForm;
