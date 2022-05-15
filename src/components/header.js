import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Header = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container fluid className="">
				<Navbar.Brand href="/">Generic Blog</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="/">Home</Nav.Link>
				</Nav>
				<Button href="/register" variant="light" className="me-2">
					Register
				</Button>
				<Button href="/login" variant="light">
					Login
				</Button>
			</Container>
		</Navbar>
	);
};

export default Header;
