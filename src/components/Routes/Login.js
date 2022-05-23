import React, { useState } from 'react';
import { Form as BootstrapForm } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Formik, Form } from 'formik';
import InputField from '../InputField';
import Alert from 'react-bootstrap/Alert';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	document.title = 'Login Form';

	const signIn = useSignIn();

	return (
		<>
			<style type="text/css">
				{`.container-lg {
                        max-width: 600px;
                    }
                    .btn {
                        float: right;
                    }`}
			</style>
			<Container fluid="lg" className="mt-5">
				<Formik
					initialValues={{
						username: '',
						password: '',
					}}
					onSubmit={async (values, { setSubmitting }) => {
						const loginPost = await fetch('/users/login', {
							method: 'POST',
							headers: {
								Accept: 'application/json',
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(values),
						});
						if (loginPost.status === 500 || loginPost.status === 401)
							return setError(true);
						const message = await loginPost.json();
						if (
							signIn({
								token: message.token,
								expiresIn: message.expiresIn,
								tokenType: 'Bearer',
								authState: message.authState,
							})
						) {
							navigate('/');
						}
						setSubmitting(false);
					}}
				>
					<Form
						className="border p-5 rounded border-3"
						action="/login"
						method="POST"
					>
						<div className="card-body p-2 text-center">
							<h3 className="mb-1">Login Form</h3>
						</div>
						<BootstrapForm.Group className="mb-3 w-auto">
							<InputField
								label="Username"
								name="username"
								type="text"
								className="form-control"
							/>
						</BootstrapForm.Group>
						<BootstrapForm.Group className="mb-3">
							<InputField
								label="Password"
								name="password"
								type="password"
								className="form-control"
							/>
						</BootstrapForm.Group>
						{error ? (
							<Alert variant="danger" className="p-2">
								Incorrect username or password.
							</Alert>
						) : null}
						<Button variant="primary" type="submit">
							Login
						</Button>
					</Form>
				</Formik>
			</Container>
		</>
	);
};

export default Login;
