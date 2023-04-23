import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar.js";
import "./dashboard.css";
import Workspace from "../components/Workspace.js";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [workspaceList, setWorkspaceList] = useState([]);
    const [workspace, setWorkspace] = useState(null);

    function logout() {
        localStorage.removeItem('token');
        navigate("/login");
    }

    function onWorkspaceSelect(ws) {
        console.log(ws);
        setWorkspace(ws);
    }

    function removeWorkspace(oldWorkspace) {
        const updatedList = workspaceList.filter((workspace) => workspace.id !== oldWorkspace._id);
        console.log(updatedList);
        setWorkspaceList(updatedList);
        setWorkspace(null);
    }

    function updateWorkspaceTitle(newName) {
        setWorkspace((prevState) => ({ ...prevState, title: newName }));
    }

    function onWorkspaceCreate(newWorkspace) {
        const dataWorkspace = { id: newWorkspace._id, title: newWorkspace.title };
        setWorkspaceList([...workspaceList, dataWorkspace]);
    }

    useEffect(() => {
        fetch(`/api/workspaces/`)
            .then((res) => res.json())
            .then((data) => {
                data = data.map((element) => {
                    return { id: element._id, title: element.title };
                });
                setWorkspaceList(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="dashpage">
            <div className="dashnav">
                <div className="logoutBox">
                    <p>Hello, user!</p>
                    <Button className="logout" variant="warning" onClick={logout}>Logout</Button>
                </div>
            </div>
            <div className="dash">
                {workspaceList.length > 0 ? (
                    <Sidebar
                        workspaces={workspaceList}
                        onWorkspaceSelect={onWorkspaceSelect}
                        onWorkspaceCreate={onWorkspaceCreate}
                    />
                ) : (
                    <p>Loading...</p>
                )}
                {workspace ? (
                    <Workspace
                        className="workspace"
                        key={Math.random()}
                        id={workspace._id}
                        title={workspace.title}
                        lists={workspace.lists}
                        updateWorkspaceTitle={updateWorkspaceTitle}
                        deleteWorkspace={removeWorkspace}
                    />
                ) : (
                    <p className="workspace">Loading...</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
