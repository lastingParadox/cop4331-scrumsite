import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import './workspaceHeader.css';

const WorkspaceHeader = ({ title, userId, workspaceId, onTitleChange, titleSave, handleDelete }) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [showModal, setShowModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [inviteUserId, setInviteUserId] = useState("");

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleSaveButtonClick = () => {
        if (editMode) {
            titleSave(newTitle);
        }
        setEditMode(!editMode);
    };

    const handleDeleteButtonClick = () => {
        if (editMode) {
            setEditMode(!editMode);
            setNewTitle(title);
            onTitleChange(title);
        }
        else {
            handleDelete();
        }
    }

    const handleModalOpen = () => {
        if (editMode) {
            setEditMode(!editMode);
            setNewTitle(title);
            onTitleChange(title);
        }
        setShowModal(true)
    };
    const handleModalClose = () => setShowModal(false);

    const handleSearch = (query) => {
        setIsLoading(true);

        fetch(`/api/users?search=${query}`)
            .then((res) => res.json())
            .then((res) => {
                res = res.filter((user) => user._id !== userId && !user.workspaces.includes(workspaceId) && !user.notifications.includes(workspaceId))
                setOptions(res);
                setIsLoading(false);
            });
    };

    const filterBy = () => true;

    const inviteUser = async () => {
        fetch(`/api/auth/users/invite`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
                receiverId: inviteUserId,
                workspaceId: workspaceId
            })
        })
        .then((response) => {
            if (response.status === 401) throw new Error('Invalid');
            return response.json();
        })
        .then((data) => {
            handleModalClose();
        })
        .catch((error) => {
            console.log(error.message);
            return;
        })
    }

    return (
        <>
            <div id="workspaceTitle">
                {editMode ? (
                    <Form.Control
                    id="titleField"
                    type="text"
                    value={newTitle}
                    onChange={handleTitleChange}
                    autoFocus
                    />
                ) : (
                    <h2>{title}</h2>
                )}
                <div id="workspaceTitleButtons">
                    <Button className="title" variant="success" onClick={handleSaveButtonClick}>
                        {editMode ? "Submit" : "Edit Name" }
                    </Button>
                    <Button className="invite" variant="primary" onClick={handleModalOpen}>Invite</Button>
                    <Button className="title" variant="danger" onClick={handleDeleteButtonClick}>
                        {editMode ? "Cancel" : "Delete Workspace" }
                    </Button>
                </div>
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Invite User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group>
                        <Form.Label>User</Form.Label>
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
                                if (e[0] && e[0]._id) setInviteUserId(e[0]._id);
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
                        Close
                    </Button>
                    <Button variant="primary" onClick={inviteUser}>
                        Invite
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default WorkspaceHeader;
