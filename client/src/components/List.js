import React, { useState } from "react";
import Task from "./Task";
import { Card, Button, Form } from "react-bootstrap";
import "./list.css";
import { useEffect } from 'react';

function List(props) {
    const { list, updateList, deleteList, workspaceId, lists} = props;
    const { title } = list;
    const [tasks,setTasks]=useState(list.tasks);
    const [listName, setListName] = useState(title);
    const [taskName,setTaskName] = useState('');

    // Callback function to add a new task
    
    function addTask(event) {
        event.preventDefault();
        const newTask = { 
            title: taskName,
            list: list._id, 
            workspace: workspaceId, 
            author:"643f6115abbf1b5d55acae11",
        };
    
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
        .then(response => response.json())
        .then(data => {
            const updatedTasks = [...tasks, data];
            setTasks(updatedTasks);
            const updatedList = { ...list, tasks: updatedTasks };
            updateList(updatedList);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        
    }, [tasks]);

     // Callback function to update a task
    function updateTask(updatedTask, oldTask) {
        console.log(updatedTask);
        console.log(oldTask);
        
        fetch(`/api/tasks/${oldTask}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask),
        })
        .then(response => response.json())
        .then(data => {
            const updatedTasks = tasks.map(task => {
                if (task._id === oldTask) {
                    return data;
                }
                return task;
            });
            setTasks(updatedTasks);
            const updatedList = { ...list, tasks: updatedTasks };
            updateList(updatedList);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Callback function to delete a task
function deleteTask(taskToDelete) {
    console.log(taskToDelete);
    fetch(`/api/tasks/${taskToDelete}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        const updatedTasks = tasks.filter(task => task._id !== taskToDelete);
        setTasks(updatedTasks);
        const updatedList = { ...list, tasks: updatedTasks };
        updateList(updatedList);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

    // Callback function to handle changes to the list name
    function handleNameChange(event) {
        event.preventDefault();
        const updatedList = { ...list, title: listName };
        console.log(updatedList);
        updateList(updatedList);
    }

    // Callback function to delete a list
    function handleDelete() {
        deleteList(list);
    }

    const tasksItems = tasks ? tasks.map(task => (
        <Task
            key={Math.random()}
            id={task._id}
            title={task.title}
            description={task.description}
            author={task.author}
            dueDate={task.dueDate}
            assignees={task.assignees}
            updateTask={updateTask} 
            deleteTask={deleteTask}
            lists={lists}
        />
    )) : null;

    return (
        <Card style={{ width: "20rem", border: "3px solid gray" }}>
            <Card.Body>
                <Card.Title>{listName}</Card.Title>
                <Form onSubmit={handleNameChange}>
                <Form.Control type="text" placeholder="Enter Title" value={listName} onChange={e => setListName(e.target.value)} />

                <Button type="submit">Update List Name</Button>
                </Form>

                {tasksItems}
                <Form onSubmit={addTask}>
                <Form.Control type="text" placeholder="Add Task" value={taskName} onChange={e => setTaskName(e.target.value)}/>
                    <Button type="submit">Add Task</Button>
                </Form>
                <Button onClick={handleDelete}>Delete List</Button>
            </Card.Body>
        </Card>    
    );
}

export default List;
