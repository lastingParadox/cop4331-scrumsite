import React, { useState } from "react";
import { Button } from "react-bootstrap";
import List from "./List";
import "./Workspace.css";
import ListNameCard from './ListNameCard';
import { useEffect } from 'react';

function Workspace(props) {
    const { updateWorkspaceTitle, deleteWorkspace } = props;
    const id = props.id;
    const [title, setTitle] = useState(props.title);
    const [lists, setLists] = useState(props.lists ?? []);
    const [showAddListCard, setShowAddListCard] = useState(false); // add state for showing/hiding the card

    // Callback function to add a new list
    const addList = async (listName) => {
      try {
        const res = await fetch('/api/lists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: listName }),
        });
        const data = await res.json();
    
        // Update the lists state variable
        setLists(prevLists => [...prevLists, data]);
        
        // Create a new variable using the updated value of lists
        const updatedLists = [...lists, data._id];
    
        // Make a PATCH request to update the lists array in the database
        await fetch(`/api/workspaces/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ lists: updatedLists }),
        });
      } catch (error) {
        console.log(error);
      }
    };

    // Callback function to delete a list
    async function deleteList(listToDelete) {
      try {
          const response = await fetch(`/api/lists/${listToDelete._id}`, {
              method: 'DELETE'
          });
          if (!response.ok) {
              throw new Error(`error status: ${response.status}`);
          }
          const updatedLists = lists.filter(list => list._id !== listToDelete._id);
          setLists(updatedLists);
      } catch (error) {
          console.error('Error deleting list:', error);
      }
  }

    // Callback function to handle changes to the workspace name
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    async function handleTitleSubmit(event) {
      event.preventDefault();
      const updatedTitle = title;
      
      const newTitle = await updateWorkspaceTitle(updatedTitle, id);
      setTitle(newTitle);
  }

    // Callback function to handle changes to a list name
    const handleListUpdate = async (updatedList) => {
      console.log(updatedList._id);
      console.log(updatedList.title);
      try {
        // Make a PATCH request to update the list on the server
        if (!updatedList.title || typeof updatedList.title !== 'string') {
          throw new Error('Invalid or missing title property in updatedList object');
        }
        const response = await fetch(`api/lists/${updatedList._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: updatedList.title }),
        });
    
        // If the server returns a success status code, update the local state
        if (response.ok) {
          const updatedListFromServer = await response.json();
          const updatedLists = lists.map(list => {
            if (list._id === updatedListFromServer._id) {
              return updatedListFromServer;
            }
            return list;
          });
          setLists(updatedLists);
        } else {
          console.error('Failed to update list');
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    useEffect(() => {
      console.log(lists);
    }, [lists]);

    function handleDeleteWorkspace() {
      // send a DELETE request to the server to delete the workspace with the current workspace id
      fetch(`/api/workspaces/${id}`, { method: 'DELETE' })
      .then(async response => {
          if (!response.ok) {
              throw new Error('Failed to delete workspace');
          }
          // invoke the callback function passed in through props to update the parent page
          const json = await response.json();
          console.log(json.workspace)
          deleteWorkspace(json.workspace);
      })
      .catch(error => {
          console.error(error);
          // display an error message to the user if the delete request fails
      });
  }

    // Render the lists
    const listItems = lists ? lists.map(list => (
      <List key={Math.random()} list={list} updateList={handleListUpdate} deleteList={deleteList} workspaceId={id} lists={lists}/>
    )) : <p>No lists yet.</p>;

    return (
        <div>
            <input type="text" value={title} onChange={handleTitleChange} />
            <button1 onClick={handleTitleSubmit}>Submit</button1>
            {showAddListCard ? (
              <ListNameCard onSubmit={addList} onCancel={() => setShowAddListCard(false)} />
              ) : (
              <Button onClick={() => setShowAddListCard(true)}>Add List</Button>
              )}
            <button3 onClick={handleDeleteWorkspace}>Delete Workspace</button3>
            {listItems}
        </div>
    );
}

export default Workspace;
