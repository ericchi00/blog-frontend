import React, { useEffect, useState } from 'react';
import { useAuthUser } from 'react-auth-kit';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useSignOut } from 'react-auth-kit';
import { useIsAuthenticated } from 'react-auth-kit';

const Header = () => {
	const [username, setUsername] = useState();
	const isAuthenticated = useIsAuthenticated();
	const auth = useAuthUser();
	const signOut = useSignOut();

	useEffect(() => {
		if (isAuthenticated()) {
			setUsername(auth().username);
		}
	});

	return (
		<Navbar bg="dark" variant="dark">
			<Container fluid className="">
				<Navbar.Brand href="/">Message Board</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="/">Home</Nav.Link>
				</Nav>
				{isAuthenticated() ? (
					<>
						<Navbar.Text className="me-3">
							Signed in as: {username}{' '}
						</Navbar.Text>
						<Button href="/createpost" variant="light" className="me-2">
							Create a Post
						</Button>
						<Button href="/" onClick={() => signOut()} variant="light">
							Logout
						</Button>
					</>
				) : (
					<>
						<Button href="/register" variant="light" className="me-2">
							Register
						</Button>
						<Button href="/login" variant="light">
							Login
						</Button>
					</>
				)}
			</Container>
		</Navbar>
	);
};

export default Header;
