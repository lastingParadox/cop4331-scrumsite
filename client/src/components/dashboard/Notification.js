import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import './notification.css'

function Notification(props) {
  const { id, title, accept, decline } = props;

  function handleAcceptClick() {
    accept(id);
  }

  function handleDeclineClick() {
    decline(id);
  }

  return (
    <Card id="notificationCard">
      <Card.Body>
        <Card.Title id="notificationTitle">{title}</Card.Title>
        <div className="center">
          <Button variant="success" onClick={handleAcceptClick}>
            Accept
          </Button>{" "}
          <Button variant="danger" onClick={handleDeclineClick}>
            Decline
          </Button>
        </div>
        
      </Card.Body>
    </Card>
  );
}

export default Notification;
