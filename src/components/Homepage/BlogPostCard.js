import React from 'react';
import Card from 'react-bootstrap/Card';
import { format } from 'date-fns';

const createMarkup = (html) => {
	return { __html: html };
};

const BlogPostCard = ({ blogPost }) => {
	return (
		<Card key={blogPost._id} style={{ width: '350px', margin: '1rem' }}>
			<Card.Body>
				<Card.Title>
					<Card.Link href={`/messages/${blogPost._id}`}>
						{blogPost.title}
					</Card.Link>
				</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					<span>Published by: {blogPost.username.username}</span>
					<p> {format(new Date(blogPost.date), 'Pp')}</p>
				</Card.Subtitle>
				<Card.Text
					dangerouslySetInnerHTML={createMarkup(blogPost.text)}
				></Card.Text>
				<Card.Link
					href={`/messages/${blogPost._id}`}
					className="position-absolute bottom-0 end-0 p-2"
				>
					Comments
				</Card.Link>
			</Card.Body>
		</Card>
	);
};

export default BlogPostCard;
