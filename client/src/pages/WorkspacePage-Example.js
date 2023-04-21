import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Workspace from '../components/Workspace.js';

function WorkspacePage(props) {
    const [workspace, setWorkspace] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`/api/workspaces/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setWorkspace(data);
            })
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div>
        {workspace ? (
            <Workspace key={id} id={id} title={workspace.title} lists={workspace.lists} />
        ) : (
            <p>Loading...</p>
        )}
        </div>
    );
    }

export default WorkspacePage;
