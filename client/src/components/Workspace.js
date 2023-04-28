import React, { useState } from "react";
import { Button, Form, Row, Col,} from "react-bootstrap";
import List from "./List";
import "./Workspace.css";
import "./sidebar.css";
import ListNameCard from "./ListNameCard.js";
import WorkspaceHeader from "./WorkspaceHeader.js";
import { BsPlusCircle } from "react-icons/bs";
import { useEffect } from "react";

function Workspace(props) {
    const { updateWorkspaceTitle, deleteWorkspace } = props;
    const id = props.id;
    const [title, setTitle] = useState(props.title);
    const [lists, setLists] = useState(props.lists ?? []);
    const [showAddListCard, setShowAddListCard] = useState(false); // add state for showing/hiding the card

    // Callback function to add a new list
    const addList = async (listName) => {
        try {
            const res = await fetch("/api/lists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: listName }),
            });
            const data = await res.json();

            // Update the lists state variable
            setLists((prevLists) => [...prevLists, data]);

            // Create a new variable using the updated value of lists
            const updatedLists = [...lists, data._id];

            // Make a PATCH request to update the lists array in the database
            await fetch(`/api/workspaces/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lists: updatedLists }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    // Callback function to delete a list
    async function deleteList(listId) {
        try {
            const response = await fetch(`/api/lists/${listId}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`error status: ${response.status}`);
            }
            const updatedLists = lists.filter((list) => list._id !== listId);
            setLists(updatedLists);
        } catch (error) {
            console.error("Error deleting list:", error);
        }
    }

    // Callback function to handle changes to the workspace name
    function handleTitleChange(title) {
        setTitle(title);
    }

    async function handleTitleSubmit(event) {

        await fetch(`/api/workspaces/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
        });

        setTitle(title);

        const workspace = { id, title, lists };
        updateWorkspaceTitle(workspace);
    }

    // Callback function to handle changes to a list name
    const handleListUpdate = (updatedList) => {
       
        const updatedLists = lists.map((list) => {
            if (list._id === updatedList.id) {
                return { _id: updatedList.id, title: updatedList.title, tasks: updatedList.tasks };
            }
            return list;
        });
        
        setLists(updatedLists);
        
    };
    const handleListChange = (updatedList,otherUpdatedList,newTask) => {
        
        const updatedLists = lists.map((list) => {
            if (list._id === updatedList.id) {
                
                return { _id: updatedList.id, title: updatedList.title, tasks: updatedList.tasks };
            }
            if (list._id === otherUpdatedList) {
                const updatedTasks = [...list.tasks, newTask];
                
                return { _id: list._id, title: list.title, tasks: updatedTasks };
            }
            return list;
        });
        setLists(updatedLists);
    };

    useEffect(() => {
        
    }, [lists]);

    function handleDeleteWorkspace() {
        // send a DELETE request to the server to delete the workspace with the current workspace id
        fetch(`/api/workspaces/${id}`, { method: "DELETE" })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to delete workspace");
                }
                // invoke the callback function passed in through props to update the parent page
                const json = await response.json();
                deleteWorkspace(json.workspace);
            })
            .catch((error) => {
                console.error(error);
                // display an error message to the user if the delete request fails
            });
    }

    // Render the lists
    const listItems = lists ? (
        lists.map((list) => (
            <List
                key={Math.random()}
                id={list._id}
                title={list.title}
                tasks={list.tasks}
                updateList={handleListUpdate}
                deleteList={deleteList}
                workspaceId={id}
                listNames={lists}
                updateListChange={handleListChange}
            />
        ))
    ) : (
        <p>No lists yet.</p>
    );


    return (
        <div className="workspace">
            <WorkspaceHeader title={title} onTitleChange={handleTitleChange} titleSave={handleTitleSubmit} handleDelete={handleDeleteWorkspace}/>
            <div className="workspace-lists">
                {listItems}
                {showAddListCard ? (
                    <ListNameCard onSubmit={addList} onCancel={() => setShowAddListCard(false)} />
                ) : (
                    <Button id="addListButton" className="ms-1" onClick={() => setShowAddListCard(true)}>Add List <BsPlusCircle/></Button>
                )}
            </div>
        </div>
    );
}

export default Workspace;
