import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./sidebar.css";

function Sidebar(props) {
    const { workspaces, userId } = props;
    const [showModal, setShowModal] = useState(false);
    const [newWorkspaceTitle, setNewWorkspaceTitle] = useState("New Workspace");

    const handleModalClose = () => setShowModal(false);
    const handleModalOpen = () => setShowModal(true);

    const handleWorkspaceClick = async (id) => {
        const response = await fetch(`/api/workspaces/${id}`);
        const workspace = await response.json();
        console.log(workspace);
        props.onWorkspaceSelect(workspace);
    };

    const handleWorkspaceCreate = async () => {
        const response = await fetch(`/api/workspaces/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: newWorkspaceTitle,
                lists: [],
                members: [userId],
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
            <center>
                <h3>Workspaces</h3>
            </center>
            {workspaceComponents}
            <center>
                <button onClick={handleModalOpen}>Create Workspace</button>
            </center>
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
