import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dropdown.css"; // Import the custom CSS file

import { DropdownButton, Dropdown } from "react-bootstrap";

function Drop(props) {
    return (
        <DropdownButton id="dropdown-basic-button" title={props.title} className="custom-dropdown">
            {props.lists.map((list) => (
                <Dropdown.Item key={list._id} onClick={() => props.onSelect(list)}>
                    {list.title}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
}

export default Drop;

