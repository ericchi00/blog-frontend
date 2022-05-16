import React, { useState } from 'react';
import { useField } from 'formik';

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
