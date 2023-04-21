import React from 'react';
import { useState } from 'react';
import './HomePage-Example.css'
import Workspace from '../components/Workspace.js'

function HomePage() {
    const [workspaces, setWorkspaces] = useState([]);
    const [addAWorkspace,setAddW]=useState('');
    
    // Callback function to add a new workspace
    function addWorkspace() {
        <input type="text" onChange={e => setAddW(e.target.value)} /> 
        const newWorkspace = { title: addAWorkspace, lists: [] };
        setWorkspaces([...workspaces, newWorkspace]);
    }
  
    // Callback function to update a workspace
    function updateWorkspace(updatedWorkspace) {
      const updatedWorkspaces = workspaces.map(workspace => {
        if (workspace.title === updatedWorkspace.title) {
            return updatedWorkspace;
        }
        return workspace;
      });
      setWorkspaces(updatedWorkspaces);
    }
  
    // Callback function to delete a workspace
    function deleteWorkspace(workspaceToDelete) {
      const updatedWorkspaces = workspaces.filter(workspace => workspace.title !== workspaceToDelete.title);
      setWorkspaces(updatedWorkspaces);
    }

  function updateNameWorkspace(updatedWorkspace, oldWorkspaceName) {
    const updatedWorkspaces = workspaces.map(workspace => {
      if (workspace.title === oldWorkspaceName) {
        return updatedWorkspace;
      }
      return workspace;
    });
    setWorkspaces(updatedWorkspaces);
  }

  const workspaceList = workspaces.map(workspace => (
    <Workspace
      key={workspace.title}
      workspace={workspace}
      updateWorkspace={updateWorkspace}
      deleteWorkspace={deleteWorkspace}
      updateNameWorkspace={updateNameWorkspace}
    />
  ));

    return (
        <div>
        <button onClick={() => addWorkspace()}>Add Workspace</button>
        {workspaceList}
        </div>
    );
}

export default HomePage;
