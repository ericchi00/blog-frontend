import React, { useEffect, useState } from 'react';
import { Form as BootstrapForm } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Formik, Form } from 'formik';
import InputField from '../InputField';

const Login = () => {
	useEffect(() => {
		document.title = 'Login Form';
	});

	const login = () => {};

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
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 400);
					}}
				>
					<Form className="border p-5 rounded border-3">
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
