import React, { useState } from "react";
import { Button, Modal, Offcanvas} from "react-bootstrap";
import { BsChevronRight} from "react-icons/bs";

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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div class="wrapper">
            <Button variant="secondary" onClick={handleShow}>
                <BsChevronRight/>
            </Button>
            
            <Offcanvas className="sidebar"  show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><oddCHeader>Workspaces</oddCHeader></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {workspaceComponents}
                    <button onClick={handleModalOpen}>Create Workspace</button>
                </Offcanvas.Body>
            </Offcanvas>

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
