import React, { useState, useEffect } from "react";
import { Button, Modal, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "./task.css"
import Drop from './Dropdown';


function Task(props) {
    const { id, title, description, author, dueDate, assignees, updateTask, deleteTask, listNames, updateTaskList } = props;
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

    const handleSelect = (lists) => {
        const updatedTask = {
            _id:id,
            title: updatedTitle,
            list:lists._id,
            description: updatedDescription,
            author: updatedAuthor,
            dueDate: updatedDueDate,
            assignees: updatedAssignees,
        };
        updateTaskList(lists._id, id,updatedTask);
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

    useEffect(() => {
        fetch(`/api/users`)
        .then((res) => res.json())
        .then((res) => {
            setOptions(res);
        });
    }, []);

    const filterBy = () => true;

    const dateApproaching = () => {
        const date = new Date(dueDate);
        const today = new Date();
        if (date.getDate() < today.getDate())
            return <div className="small late">{new Date(dueDate).toLocaleDateString("en-US")}</div>
        else if (date.getDate() >= today.getDate() && date.getDate() <= (today.getDate() + 2) )
            return <div className="small soon">{new Date(dueDate).toLocaleDateString("en-US")}</div>
        else
            return <div className="small future">{new Date(dueDate).toLocaleDateString("en-US")}</div>
    }

    const handleCardClick = (event) => {
        const clickedElement = event.target;
        const dropdownWrapper = clickedElement.closest('.dropdownWrapper');
      
        if (!dropdownWrapper) {
          // Perform actions when the card (excluding the dropdown) is clicked
          handleModalOpen();
        }
      };


    return (
        <>
            <Card className="taskCard">
                <Card.Body className="taskBody" onClick={handleCardClick}>
                    <div className="taskContent">
                        <div className="taskTitle">{title}</div>
                        <div className="dropdownWrapper">
                            <Drop lists={listNames} onSelect={handleSelect} title="" />
                        </div>
                    </div>
                    {dueDate ? dateApproaching() : null}
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
                        <strong>Due Date:</strong> {updatedDueDate ? new Date(updatedDueDate).toLocaleDateString("en-US") : null}
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
                            defaultInputValue={`${author.firstName} ${author.lastName}`}
                            minLength={1}
                            onSearch={handleSearch}
                            options={options}
                            placeholder="Search for a user..."
                            onChange={(e) => {
                                if (e[0] && e[0]._id) setUpdatedAuthor(e[0]._id);
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
                    <p>Are you sure you want to delete this Task?</p>
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
