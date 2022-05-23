import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Footer = () => {
	return (
		<Navbar bg="dark" variant="dark" style={{ height: 'auto' }}>
			<Container fluid className="justify-content-center">
				<Navbar.Text>Built by Eric Chi.</Navbar.Text>
				<Nav.Link href="https://api-only-backend-blog-react.herokuapp.com/">
					Backend API
				</Nav.Link>
			</Container>
		</Navbar>
	);
};

export default Footer;
