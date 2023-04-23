import React, { useState } from "react";
import Task from "./Task";
import { Card, Button } from "react-bootstrap";
import "./list.css";

function List(props) {
    const { list, updateList, deleteList, updateListName } = props;
    const { title, tasks } = list;
    const [listName, setListName] = useState(title);
    const [taskName, setTaskName] = useState("");

    // Callback function to add a new task
    function addTask() {
        <input type="text" onChange={(e) => setTaskName(e.target.value)} />;
        const newTask = { Title: taskName };
        const updatedTasks = [...tasks, newTask];
        const updatedList = { ...list, tasks: updatedTasks };
        updateList(updatedList);
    }

    // Callback function to update a task
    function updateTask(updatedTask, oldTaskName) {
        const updatedTasks = tasks.map((task) => {
            if (task.title === oldTaskName) {
                return updatedTask;
            }
            return task;
        });
        const updatedList = { ...list, tasks: updatedTasks };
        updateList(updatedList);
    }

    // Callback function to delete a task
    function deleteTask(taskToDelete) {
        const updatedTasks = tasks.filter((task) => task.title !== taskToDelete.title);
        const updatedList = { ...list, tasks: updatedTasks };
        updateList(updatedList);
    }

    // Callback function to handle changes to the list name
    function handleNameChange(event) {
        const newName = event.target.value;
        setListName(newName);
        const updatedList = { ...list, title: newName };
        updateListName(updatedList, title); // Call the updateListName callback function
    }

    // Callback function to delete a list
    function handleDelete() {
        deleteList(list);
    }

    const tasksItems = tasks.map((task) => (
        <Task
            key={task.id}
            id={task.id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
        />
    ));

    return (
        <Card style={{ width: "18rem", border: "3px solid green" }}>
            <Card.Body>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Card.Title>{listName}</Card.Title>
                    <div>
                        <input type="text" value={listName} onChange={handleNameChange} />
                        <button onClick={() => addTask()}>Add Task</button>
                        <button onClick={handleDelete}>Delete List</button>
                    </div>
                </div>
                <Card.Text>{tasksItems}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default List;
