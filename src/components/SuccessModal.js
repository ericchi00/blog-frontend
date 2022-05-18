import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const SuccessModal = (props) => {
	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Body>
				<h4>Register Sucess!</h4>
				Page will redirect in a couple seconds. Click home if it does not.
			</Modal.Body>
			<Modal.Footer>
				<Button href="/" variant="success">
					Home
				</Button>
				<Button onClick={props.onHide}>Close</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default SuccessModal;
