import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar.js";
import "./dashboard.css";
import Workspace from "../components/Workspace.js";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [workspaceList, setWorkspaceList] = useState([]);
    const [workspace, setWorkspace] = useState(null);

    function logout() {
        localStorage.removeItem("token");
        navigate("/home");
    }

    function onWorkspaceSelect(ws) {
        setWorkspace(ws);
    }

    async function removeWorkspace(oldWorkspace) {
        const updatedList = workspaceList.filter((workspace) => workspace.id !== oldWorkspace._id);
        setWorkspaceList(updatedList);
    }

    function updateWorkspaceTitle(updatedWorkspace) {
        const updatedList = workspaceList.map((workspace) => {
            if (workspace.id === updatedWorkspace.id) return { id: updatedWorkspace.id, title: updatedWorkspace.title }
            else return workspace;
        });

        setWorkspace({ ...workspace, title: updatedWorkspace.title, lists: updatedWorkspace.lists});
        setWorkspaceList(updatedList);
    }

    function onWorkspaceCreate(newWorkspace) {
        const dataWorkspace = { id: newWorkspace._id, title: newWorkspace.title };
        setWorkspaceList([...workspaceList, dataWorkspace]);
    }

    useEffect(() => {
        if (!token) {
            navigate('/');
            return;
        }

        fetch(`/api/auth/users/workspaces`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        })
        .then((response) => {
            if (response.status === 401) throw new Error('Invalid');
            return response.json();
        })
        .then((data) => {
            data = data.map((element) => {
                return { id: element._id, title: element.title };
            });
            setWorkspaceList(data);
        })
        .catch((error) => {
            console.log(error.message);
            return;
        })
    }, [navigate, token]);

    return (
        <div className="dashpage">
            <div className="dashnav">
                <div className="logoutBox">
                    <p>Hello, user!</p>
                    <Button className="logout" variant="warning" onClick={logout}>
                        Logout
                    </Button>
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
