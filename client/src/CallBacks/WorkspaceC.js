
import React, { useState } from 'react';
import List from './List';

function Workspace(props) {
    const { workspace, updateWorkspace, deleteWorkspace, updateNameWorkspace, updateListName } = props;
    const { title, lists } = workspace;
    const [name, setName] = useState(title);
    const [listName,setListName]=useState('');

    // Callback function to add a new list
    function addList() {
        <input type="text" onChange={e => setListName(e.target.value)} />  
        const newList = { title: listName, tasks: [] };
        const updatedLists = [...lists, newList];
        const updatedWorkspace = { ...workspace, lists: updatedLists };
        updateWorkspace(updatedWorkspace);
    }

    // Callback function to update a list
    function updateList(updatedList) {
        const updatedLists = lists.map(list => {
        if (list.title === updatedList.title) {
            return updatedList;
        }
        return list;
        });
        const updatedWorkspace = { ...workspace, lists: updatedLists };
        updateWorkspace(updatedWorkspace);
    }

    // Callback function to delete a list
    function deleteList(listToDelete) {
        const updatedLists = lists.filter(list => list.title !== listToDelete.title);
        const updatedWorkspace = { ...workspace, lists: updatedLists };
        updateWorkspace(updatedWorkspace);
    }

    // Callback function to handle changes to the workspace name
    function handleNameChange(event) {
        const newName = event.target.value;
        setName(newName);
        const updatedWorkspace = { ...workspace, title: newName };
        updateNameWorkspace(updatedWorkspace, title);
    }

    // Callback function to handle changes to a list name
    function updateListName(updatedList, oldListName) {
        const updatedLists = lists.map(list => {
            if (list.title === oldListName) {
            return updatedList;
            }
            return list;
        });
        const updatedWorkspace = { ...workspace, lists: updatedLists };
        updateWorkspace(updatedWorkspace);
    }

    
    

    // Render the lists
    const listItems = lists.map(list => (
        <List key={list.title} list={list} updateList={updateList} deleteList={deleteList} updateListName={updateListName} />
    ));

    return (
        <div>
            <input type="text" value={name} onChange={handleNameChange} />
            <button onClick={() => addList()}>Add List</button>
            <button onClick={() => deleteWorkspace(workspace)}>Delete Workspace</button>
            {listItems}
        </div>
  );
}

export default Workspace;
