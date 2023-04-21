import { React, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Task(props) {
	const [showModal, setShowModal] = useState(false);

	const handleModalClose = () => setShowModal(false);
	const handleModalOpen = () => setShowModal(true);

	return (
		<>
			<div
				className='task-item'
				onClick={handleModalOpen}
			>
				<h3>{props.title}</h3>
			</div>

			<Modal
				show={showModal}
				onHide={handleModalClose}
			>
				<Modal.Header closeButton>
					<Modal.Title>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>
						<strong>Description:</strong> {props.description}
					</p>
					<p>
						<strong>Author:</strong> {props.author}
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant='secondary'
						onClick={handleModalClose}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Task;
