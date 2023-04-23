import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';

function ListNameCard(props) {
  const { onSubmit, onCancel } = props;
  const [listName, setListName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the onSubmit callback with the list name
    onSubmit(listName);
    // Clear the input field
    setListName('');
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // Call the onCancel callback to hide the card
    onCancel();
    // Clear the input field
    setListName('');
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Add a new list</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="listNameInput">
            <Form.Label>List Name</Form.Label>
            <Form.Control type="text" placeholder="Enter list name" value={listName} onChange={(event) => setListName(event.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add List
          </Button>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ListNameCard;
