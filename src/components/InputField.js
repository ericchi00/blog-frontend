import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useField } from 'formik';
import Feedback from 'react-bootstrap/Feedback';
import { Form } from 'react-bootstrap';

const InputField = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<>
			<label htmlFor={props.id || props.name}>{label}</label>
			<input className="text-input" {...field} {...props} />
			{meta.touched && meta.error ? (
				<div className="text-danger form-text">{meta.error}</div>
			) : null}
		</>
	);
};

export default InputField;
