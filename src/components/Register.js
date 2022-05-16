import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Form as BootstrapForm } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from './InputField';

const Register = () => {
	useEffect(() => {
		document.title = 'Register Form';
	});

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
			<Container fluid="lg" className="mt-5">
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
						confirmPassword: Yup.string().oneOf(
							[Yup.ref('password'), null],
							'Passwords must match'
						),
					})}
					onSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));
							setSubmitting(false);
						}, 400);
					}}
				>
					<Form className="border p-5 rounded border-3">
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
						<Button variant="primary" type="submit">
							Register
						</Button>
					</Form>
				</Formik>
			</Container>
		</>
	);
};

export default Register;
