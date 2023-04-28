import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { BsSaveFill, BsPencilFill, BsTrashFill, BsFillXSquareFill } from "react-icons/bs";
import './workspaceHeader.css';

const ListTitle = ({ title, onTitleChange, titleSave, handleDelete }) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

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

    return (
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
            <div id="titleButtons">
                <div className="buttonsBelow">
                    <Button className="title" variant="success" onClick={handleSaveButtonClick}>
                        {editMode ? "Submit" : "Edit Name" }
                    </Button>
                    <Button className="title" variant="danger" onClick={handleDeleteButtonClick}>
                        {editMode ? "Cancel" : "Delete Workspace" }
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ListTitle;
