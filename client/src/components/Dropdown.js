import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, Dropdown } from "react-bootstrap";

function Drop(props) {
    return (
        <DropdownButton id="dropdown-basic-button" title={props.title}>
            {props.lists.map((list) => (
                <Dropdown.Item key={list._id} onClick={() => props.onSelect(list)}>
                    {list.title}
                </Dropdown.Item>
            ))}
        </DropdownButton>
    );
}

export default Drop;
