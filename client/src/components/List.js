import React, { useState } from "react";
import Task from "./Task";
import { Card, Button, Form } from "react-bootstrap";
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
            key={Math.random()}
            id={task.id}
            title={task.title}
            description={task.description}
            author={task.author}
            dueDate={task.dueDate}
            assignees={task.assignees}
            updateTask={updateTask}
            deleteTask={deleteTask}
        />
    ));

    return (
        <Card style={{ width: "20rem", border: "3px solid gray" }}>
            <Card.Body>
                <Card.Title>{listName}</Card.Title>
                <Form>
                    <Form.Control
                        type="text"
                        placeholder="Enter Title"
                        value={listName}
                        onChange={handleNameChange}
                    />
                    <buttonDel onClick={handleDelete}>Delete List</buttonDel>
                </Form>
                {tasksItems}
                <buttonAdd onClick={addTask}>Add Task</buttonAdd>
            </Card.Body>
        </Card>
    );
}

export default List;
