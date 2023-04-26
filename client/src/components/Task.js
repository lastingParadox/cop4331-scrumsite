import React, { useState } from "react";
import { Button, Modal, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

function Task(props) {
    const { id, title, description, author, dueDate, assignees, updateTask, deleteTask } = props;
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedAuthor, setUpdatedAuthor] = useState(author._id);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDueDate, setUpdatedDueDate] = useState(dueDate);
    const [updatedAssignees, setUpdatedAssignees] = useState(assignees);
    const [selectedList, setSelectedList] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSelect = (list) => {
        setSelectedList(list);
        const updatedTask = {
            title: updatedTitle,
            list: selectedList._id,
            description: updatedDescription,
            author: updatedAuthor,
            dueDate: updatedDueDate,
            assignees: updatedAssignees,
        };
        updateTask(updatedTask, id);
    };

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
            title: updatedTitle,
            description: updatedDescription,
            author: updatedAuthor,
            dueDate: updatedDueDate,
            assignees: updatedAssignees,
        };

        updateTask(updatedTask, id); // Call the updateTask callback function

        handleModalClose();
    };

    const handleDeleteSubmit = () => {
        deleteTask(id);
        handleModalClose();
    };

    const handleSearch = (query) => {
        setIsLoading(true);

        fetch(`/api/users?search=${query}`)
            .then((res) => res.json())
            .then((res) => {
                setOptions(res);
                setIsLoading(false);
            });
    };

    const filterBy = () => true;

    return (
        <>
            <Card style={{ width: "15rem", height: "3rem" }} onClick={handleModalOpen}>
                <Card.Body>
                    <Card.Title style={{ fontSize: "1rem" }}>{title}</Card.Title>
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
                        <strong>Author:</strong> {`${author.firstName} ${author.lastName}`}
                    </p>
                    <p>
                        <strong>Due Date:</strong> {updatedDueDate ? new Date(updatedDueDate).toString() : null}
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
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={updatedDescription}
                            onChange={(e) => setUpdatedDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <AsyncTypeahead
                            filterBy={filterBy}
                            id="async-users"
                            isLoading={isLoading}
                            labelKey={(option) => `${option.firstName} ${option.lastName}`}
                            minLength={1}
                            onSearch={handleSearch}
                            options={options}
                            placeholder="Search for a user..."
                            onChange={(e) => {
                                setUpdatedAuthor(e[0]._id);
                            }}
                            renderMenuItemChildren={(option) => (
                                <div>
                                    {option.firstName} {option.lastName}
                                    <div>
                                        <small>{option.email}</small>
                                    </div>
                                </div>
                            )}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Due Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={updatedDueDate}
                            onChange={(e) => setUpdatedDueDate(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Assignees</Form.Label>
                        <AsyncTypeahead
                            filterBy={filterBy}
                            id="async-users"
                            multiple
                            isLoading={isLoading}
                            labelKey={(option) => `${option.firstName} ${option.lastName}`}
                            minLength={1}
                            onSearch={handleSearch}
                            options={options}
                            placeholder="Search for a user..."
                            onChange={(e) => {
                                setUpdatedAssignees(e.map((user) => user._id));
                            }}
                            renderMenuItemChildren={(option) => (
                                <div>
                                    {option.firstName} {option.lastName}
                                    <div>
                                        <small>{option.email}</small>
                                    </div>
                                </div>
                            )}
                        />
                    </Form.Group>
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
