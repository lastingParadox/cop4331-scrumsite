import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./sidebar.css";

function Sidebar(props) {
    const { workspaces } = props;
    const [showModal, setShowModal] = useState(false);
    const [newWorkspaceTitle, setNewWorkspaceTitle] = useState("New Workspace");

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
            body: JSON.stringify({
                title: newWorkspaceTitle,
                lists: [],
                members: ["643f6115abbf1b5d55acae11"],
            }),
        });

        const newWorkspace = await response.json();
        setNewWorkspaceTitle("New Workspace");
        props.onWorkspaceCreate(newWorkspace);
        handleModalClose();
    };

    const workspaceComponents = workspaces.map((workspace) => (
        <div key={workspace.id} onClick={() => handleWorkspaceClick(workspace.id)}>
            <h4>{workspace.title}</h4>
        </div>
    ));

    return (
        <div className="sidebar">
            <h3>Workspaces</h3>
            {workspaceComponents}
            <button onClick={handleModalOpen}>Create Workspace</button>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Workspace</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        placeholder="Enter workspace title"
                        value={newWorkspaceTitle}
                        onChange={(e) => setNewWorkspaceTitle(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleWorkspaceCreate}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Sidebar;
