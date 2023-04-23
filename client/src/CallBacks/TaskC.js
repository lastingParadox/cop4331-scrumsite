import React, { useState } from "react";
import { Button, Modal, Card } from "react-bootstrap";

function Task(props) {
    const { task, updateTask, deleteTask } = props;
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [updatedDescription, setUpdatedDescription] = useState(task.description);
    const [updatedAuthor, setUpdatedAuthor] = useState(task.author);
    const [updatedTitle, setUpdatedTitle] = useState(task.title);
    const [updatedDueDate, setUpdatedDueDate] = useState(task.dueDate);
    const [updatedAssignees, setUpdatedAssignees] = useState(task.assignees);

    const handleModalClose = () => {
        setShowModal(false);
        setShowEditModal(false);
        setShowDeleteModal(false);
    };

    /* "title": "",
    "author": "",
    "description": "",
    "dueDate": "",
    "assignees": [""]
    */

    const handleModalOpen = () => setShowModal(true);

    const handleEditModalOpen = () => setShowEditModal(true);

    const handleDeleteModalOpen = () => setShowDeleteModal(true);

    const handleEditSubmit = () => {
        const updatedTask = {
            ...task,
            title: updatedTitle,
            description: updatedDescription,
            author: updatedAuthor,
            dueDate: updatedDueDate,
            assignees: updatedAssignees,
        };

        updateTask(updatedTask, task.title); // Call the updateTask callback function

        handleModalClose();
    };

    const handleDeleteSubmit = () => {
        deleteTask(task);
        handleModalClose();
    };

    return (
        <>
            <Card style={{ width: "15rem", height: "3rem" }} onClick={handleModalOpen}>
                <Card.Body>
                    <Card.Title style={{ fontSize: "1rem" }}>{task.title}</Card.Title>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{updatedTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <strong>Description:</strong> {updatedDescription}
                    </p>
                    <p>
                        <strong>Author:</strong> {updatedAuthor}
                    </p>
                    <p>
                        <strong>Due Date:</strong> {updatedDueDate}
                    </p>
                    <p>
                        <strong>Assignees:</strong> {updatedAssignees}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditModalOpen}>
                        Edit
                    </Button>
                    <Button variant="secondary" onClick={handleDeleteModalOpen}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEditModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <strong>Title:</strong>{" "}
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                    </p>
                    <p>
                        <strong>Description:</strong>{" "}
                        <input
                            type="text"
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                        />
                    </p>
                    <p>
                        <strong>Author:</strong>{" "}
                        <input
                            type="text"
                            value={updatedAuthor}
                            onChange={(e) => setUpdatedAuthor(e.target.value)}
                        />
                    </p>
                    <p>
                        <strong>Due Date:</strong>{" "}
                        <input
                            type="text"
                            value={updatedDueDate}
                            onChange={(e) => setUpdatedDueDate(e.target.value)}
                        />
                    </p>
                    <p>
                        <strong>Assignees:</strong>{" "}
                        <input
                            type="text"
                            value={updatedAssignees}
                            onChange={(e) => setUpdatedAssignees(e.target.value)}
                        />
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete thisTask?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Task;
