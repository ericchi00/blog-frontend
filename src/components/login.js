import React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const Login = () => {
	return (
		<>
			<Container fluid className="mt-3 w-50">
				<Form>
					<Form.Group className="mb-3" controlId="formBasicUsername">
						<Form.Label>Username</Form.Label>
						<Form.Control type="text" />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" />
					</Form.Group>
					<Button variant="primary" type="submit">
						Login
					</Button>
				</Form>
			</Container>
		</>
	);
};

export default Login;
