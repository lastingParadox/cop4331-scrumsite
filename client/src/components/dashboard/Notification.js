import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import './notification.css'

function Notification(props) {
    const { id, title, accept, decline } = props;

    const respond = async (isAccepted) => {
        const response = await fetch(`/api/auth/users/inviteResponse`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: sessionStorage.getItem('token'),
            },
            body: JSON.stringify({
                workspace: id,
                inviteResult: isAccepted
            })
        });

        try {
            if (response.status === 401) throw new Error('Invalid');
            const json = await response.json();
            console.log(json)
            return json.workspace;
        } catch (error) {
            console.log(error.message);
            return;
        }
    }

    const handleAcceptClick = () => {
        const workspace = respond(true);
        accept(workspace);
    }


    function handleDeclineClick() {
        const workspace = respond(false);
        decline(workspace);
    }

    return (
        <Card id="notificationCard">
        <Card.Body>
            <Card.Title id="notificationTitle">{title}</Card.Title>
            <div className="center">
                <Button variant="success" onClick={handleAcceptClick}>Accept</Button>
                <Button variant="danger" onClick={handleDeclineClick}>Decline</Button>
            </div>
        </Card.Body>
        </Card>
    );
}

export default Notification;
