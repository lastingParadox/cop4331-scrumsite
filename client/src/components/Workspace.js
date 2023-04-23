import React, { useState } from "react";
import { Button } from "react-bootstrap";
import List from "./List";
import "./Workspace.css";

function Workspace(props) {
    const { updateWorkspaceTitle, deleteWorkspace } = props;
    const id = props.id;
    const [title, setTitle] = useState(props.title);
    const [lists, setLists] = useState(props.lists);

    // Callback function to add a new list
    async function addList() {
        fetch("/api/lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "New List" }),
        })
            .then((res) => res.json())
            .then((data) => {
                setLists([...lists, data]);
                fetch(`/api/workspaces/${props.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ lists: [...lists, data.id] }),
                }).catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
    }

    // Callback function to delete a list
    function deleteList(listToDelete) {
        const updatedLists = lists.filter((list) => list.title !== listToDelete.title);
        setLists(updatedLists);
    }

    // Callback function to handle changes to the workspace name
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    function handleTitleSubmit(event) {
        event.preventDefault();
        updateWorkspaceTitle(title);
    }

    // Callback function to handle changes to a list name
    const handleListUpdate = (updatedList) => {
        const updatedLists = lists.map((list) => {
            if (list.id === updatedList.id) {
                return updatedList;
            }
            return list;
        });
        setLists(updatedLists);
    };

    function handleDeleteWorkspace() {
        // send a DELETE request to the server to delete the workspace with the current workspace id
        fetch(`/api/workspaces/${id}`, { method: "DELETE" })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete workspace");
                }
                // invoke the callback function passed in through props to update the parent page
                const json = await response.json();
                console.log(json.workspace);
                deleteWorkspace(json.workspace);
            })
            .catch((error) => {
                console.error(error);
                // display an error message to the user if the delete request fails
            });
    }

    // Render the lists
    const listItems = lists.map((list) => (
        <List key={list.title} list={list} updateList={handleListUpdate} />
    ));

    return (
        <div>
            <input type="text" value={title} onChange={handleTitleChange} />
            <button1 onClick={handleTitleSubmit}>Submit</button1>
            <button2 onClick={addList}>Add List</button2>
            <button3 onClick={handleDeleteWorkspace}>Delete Workspace</button3>
            <div className="workspace-lists">
            {listItems}
            </div>
        </div>
    );
}

export default Workspace;
