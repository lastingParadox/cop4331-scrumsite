import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './sidebar.css'

function Sidebar(props) {
    const [showModal, setShowModal] = useState(false);
    const [workspaces, setWorkspaces] = useState(props.workspaces);

    const handleModalClose = () => setShowModal(false);
    const handleModalOpen = () => setShowModal(true);

    const handleWorkspaceClick = async (id) => {
        const response = await fetch(`/api/workspaces/${id}`);
        const workspace = await response.json();
        props.onWorkspaceSelect(workspace);
    };

    const handleWorkspaceCreate = async () => {
        const response = await fetch(`/api/workspaces/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "New Workspace", lists: [], members: [ "643f6115abbf1b5d55acae11" ] })
        });

        const newWorkspace = response.json();
        setWorkspaces([...workspaces, newWorkspace]);
    };

    const workspaceComponents = workspaces.map(workspace => (
        <div key={workspace.id} onClick={() => handleWorkspaceClick(workspace.id)}>
        <h4>{workspace.title}</h4>
        </div>
    ));

    return (
        <div className="sidebar">
            <h3>Workspaces</h3>
            {workspaceComponents}
            <Button variant="primary" onClick={handleModalOpen}>Create Workspace</Button>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Workspace</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" placeholder="Enter workspace title" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleWorkspaceCreate}>Create</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Sidebar;
