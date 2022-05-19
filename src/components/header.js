import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useSignOut, useIsAuthenticated, useAuthUser } from 'react-auth-kit';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
	const isAuthenticated = useIsAuthenticated();
	const auth = useAuthUser();
	const signOut = useSignOut();
	const navigate = useNavigate();
	const signOutPost = async () => {
		try {
			const logoutPost = await fetch('/users/logout', {
				method: 'POST',
			});
			if (logoutPost.status === 500) {
				throw new Error('An error has occured.');
			}
			navigate('/');
		} catch (error) {
			console.error(error);
		}
		navigate('/');
	};

	return (
		<Navbar bg="dark" variant="dark">
			<Container fluid className="">
				<Navbar.Brand as={Link} to="/">
					Message Board
				</Navbar.Brand>
				<Nav className="me-auto"></Nav>
				{isAuthenticated() ? (
					<>
						<Navbar.Text className="me-3">
							Signed in as: {auth().username}{' '}
						</Navbar.Text>
						<Button variant="light" className="me-2" as={Link} to="/createpost">
							Create a Post
						</Button>
						<Button
							onClick={() => {
								signOutPost();
								signOut();
							}}
							variant="light"
						>
							Logout
						</Button>
					</>
				) : (
					<>
						<Button variant="light" className="me-2" as={Link} to="/register">
							Register
						</Button>
						<Button variant="light" as={Link} to="/login">
							Login
						</Button>
					</>
				)}
			</Container>
		</Navbar>
	);
};

export default Header;
