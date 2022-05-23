import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Form as BootstrapForm } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../InputField';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import SuccessModal from '../SuccessModal';

const Register = () => {
	const [showError, setShowError] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [errors, setErrors] = useState(null);

	document.title = 'Register Form';
	return (
		<>
			<style type="text/css">
				{`.container-lg {
                        max-width: 600px;
                    }
                    .btn {
                        float: right;
                    }
                    .alert {

                    }`}
			</style>
			<Container fluid="lg" className="mt-5" style={{ overflow: 'hidden' }}>
				{showModal ? (
					<SuccessModal
						show={showModal}
						onHide={() => setShowModal(false)}
					></SuccessModal>
				) : null}
				<Formik
					initialValues={{
						username: '',
						password: '',
						confirmPassword: '',
					}}
					validationSchema={Yup.object({
						username: Yup.string()
							.min(3, 'Must be at least 3 characters.')
							.required('Username is required'),
						password: Yup.string()
							.min(5, 'Must be at least 5 characters')
							.required('Password is required'),
						confirmPassword: Yup.string()
							.oneOf([Yup.ref('password'), null], 'Passwords must match')
							.required('Please confirm your password'),
					})}
					onSubmit={async (values, { setSubmitting }) => {
						const registerPost = await fetch(
							'https://infinite-ridge-47874.herokuapp.com/https://api-only-backend-blog-react.herokuapp.com/users',
							{
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify(values),
							}
						);
						const message = await registerPost.json();
						if (message.message === 'User successfully created.') {
							setShowModal(true);
							setErrors(null);
							setTimeout(() => {
								window.location.href = '/login';
							}, 1500);
						} else if (message.errors.length > 0) {
							setShowError(true);
							setErrors(message.errors);
						}
						setSubmitting(false);
					}}
				>
					<Form
						className="border p-5 rounded border-3"
						method="POST"
						action="/register"
					>
						<div className="card-body p-2 text-center">
							<h3 className="mb-1">Register Form</h3>
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
						<BootstrapForm.Group className="mb-3">
							<InputField
								label="Confirm Password"
								name="confirmPassword"
								type="password"
								className="form-control"
							/>
						</BootstrapForm.Group>
						{showError ? (
							<ListGroup>
								{errors.map((error, i) => {
									return (
										<Alert variant="danger" key={i} className="p-2">
											{error.msg}
										</Alert>
									);
								})}
							</ListGroup>
						) : null}
						<Button variant="primary" type="submit" className="mt-1">
							Register
						</Button>
					</Form>
				</Formik>
			</Container>
		</>
	);
};

export default Register;
