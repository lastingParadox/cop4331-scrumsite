import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { BsSaveFill, BsPencilFill, BsTrashFill, BsFillXSquareFill } from "react-icons/bs";
import './listTitle.css';

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
        <Card.Title>
            <div id="listTitle">
                {editMode ? (
                    <Form.Control
                    type="text"
                    value={newTitle}
                    onChange={handleTitleChange}
                    autoFocus
                    />
                ) : (
                    <span>{title}</span>
                )}
                <div id="titleButtons">
                    <Button className="title" variant="success" onClick={handleSaveButtonClick}>
                        {editMode ? <BsSaveFill/> : <BsPencilFill/> }
                    </Button>
                    <Button className="title" variant="danger" onClick={handleDeleteButtonClick}>
                        {editMode ? <BsFillXSquareFill/> : <BsTrashFill/>}
                    </Button>
                </div>
            </div>
        </Card.Title>
    );
};

export default ListTitle;
