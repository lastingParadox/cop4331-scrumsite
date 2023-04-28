import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/SideBar.js";
import "./dashboard.css";
import Workspace from "../components/dashboard/Workspace.js";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"
import { Helmet } from "react-helmet";

function Dashboard() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [userFirstName, setUserFirstName] = useState("user");
    const [workspaceList, setWorkspaceList] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [workspace, setWorkspace] = useState(null);

    function logout() {
        sessionStorage.removeItem("token");
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
        console.log(newWorkspace)
        const dataWorkspace = { id: newWorkspace._id, title: newWorkspace.title };
        setWorkspaceList([...workspaceList, dataWorkspace]);
    }

    function setNotificationsSideBar(updatedNotifications) {
        setNotifications(updatedNotifications);
    }

    useEffect(() => {
        if (!sessionStorage.getItem('token')) {
            navigate('/');
            return;
        }

        fetch(`/api/auth/users/workspaces`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: sessionStorage.getItem('token'),
            },
        })
        .then((response) => {
            if (response.status === 401) throw new Error('Invalid');
            return response.json();
        })
        .then((data) => {
            setUserId(data.user._id);
            setUserFirstName(data.user.firstName);
            const workspaces = data.workspaces.map((element) => {
                return { id: element._id, title: element.title };
            });
            setWorkspaceList(workspaces);
            if (data.user.notifications) setNotifications(data.user.notifications)
        })
        .catch((error) => {
            console.log(error.message);
            return;
        })
    }, []);

    return (
        <>
            <Helmet>
                <title>Scrum Site - Dashboard</title>
            </Helmet>
            <div className="dashpage">
                <div className="dashnav">
                    <div className="logoBox">
                        <img id="logo" src={ logo } alt="Scrum Site Logo"/>
                        <h1 id="logoText">Scrum Site</h1>
                    </div>
                    
                    <div className="logoutBox">
                        <p>Hello, {userFirstName}!</p>
                        <Button className="logout" variant="warning" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </div>
                <div className="dash">
                    <div className="worklist">
                    {workspaceList.length >= 0 ? (
                        <Sidebar
                            workspaces={workspaceList}
                            setNotifications={setNotificationsSideBar}
                            notifications={notifications}
                            userId={userId}
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
                            userId={userId}
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
            </div>
        </>
    );
}

export default Dashboard;
