import React, { useState, useEffect } from "react";
import { Button, Modal, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "./task.css"
import Drop from './Dropdown';


function Task(props) {
    const { id, workspaceId, title, description, author, dueDate, assignees, updateTask, deleteTask, listNames, updateTaskList } = props;
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [updatedDescription, setUpdatedDescription] = useState(description || "");
    const [updatedAuthor, setUpdatedAuthor] = useState(author._id);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDueDate, setUpdatedDueDate] = useState(dueDate || "");
    const [updatedAssignees, setUpdatedAssignees] = useState(assignees || []);
    const [selectedList, setSelectedList] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSelect = (lists) => {
    
        updateTaskList(lists._id, id);
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

    const handleDeleteModalOpen = () => {
        setShowModal(false);
        setShowDeleteModal(true);
    }

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
        setShowModal(true);
    }

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
                console.log(res)
                res = res.filter((user) => user.workspaces.includes(workspaceId))
                setOptions(res);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetch(`/api/users`)
        .then((res) => res.json())
        .then((res) => {
            res = res.filter((user) => user.workspaces.includes(workspaceId))
            setOptions(res);
        });
    }, []);

    const filterBy = () => true;

    const date = new Date(updatedDueDate);
    date.setHours(date.getHours() + 4)

    const dateApproaching = () => {
        const today = new Date();
        const twoDays = new Date();
        twoDays.setDate(today.getDate() + 2)

        if (today.getMonth() > date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() > date.getDate()))
            return <div className="small late">{date.toLocaleDateString("en-US")}</div>
        else if ((today.toDateString() === date.toDateString()) || (today <= date && twoDays > date))
            return <div className="small soon">{date.toLocaleDateString("en-US")}</div>
        else
            return <div className="small future">{date.toLocaleDateString("en-US")}</div>
    }

    const dateValue = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)

    const handleCardClick = (event) => {
        const clickedElement = event.target;
        const dropdownWrapper = clickedElement.closest('.dropdownWrapper');
      
        if (!dropdownWrapper) {
            // Perform actions when the card (excluding the dropdown) is clicked
            handleModalOpen();
        }
    };

    const assigneesList = updatedAssignees.map((assignee) => {
        return <li key={Math.random()}>{assignee.firstName} {assignee.lastName}</li>
    })

    return (
        <>
            <Card className="taskCard">
                <Card.Body className="taskBody" onClick={handleCardClick}>
                    <div className="taskContent">
                        <div>
                        <div className="taskTitle">{title}</div>
                        {dueDate ? dateApproaching() : null}
                        </div>
                        <div className="dropdownWrapper">
                            <Drop lists={listNames} onSelect={handleSelect} title="" />
                        </div>
                    </div>
                    
                </Card.Body>
            </Card>


            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{updatedTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {updatedDescription ?
                        <p>
                            <strong>Description:</strong> {updatedDescription}
                        </p>
                    : null}
                    {updatedAuthor ?
                        <p>
                            <strong>Author:</strong> {`${author.firstName} ${author.lastName}`}
                        </p>
                    : null}
                    {updatedDueDate ?
                        <p>
                            <strong>Due Date:</strong> {updatedDueDate ? date.toLocaleDateString('en-us') : null}
                        </p>
                    : null}
                    {updatedAssignees.length > 0 ?
                        <>
                            <p id="assigneeTitle">
                                <strong>Assignees:</strong>
                            </p>
                            {updatedAssignees.length > 0 ? <ul>{assigneesList}</ul> : null}
                        </>
                    : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleEditModalOpen}>
                        Edit
                    </Button>
                    <Button variant="danger" onClick={handleDeleteModalOpen}>
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
                            value={dateValue}
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
                    <Button variant="secondary" onClick={handleDeleteModalClose}>
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
