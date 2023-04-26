import React, { useState } from "react";
import Task from "./Task";
import { Card, Button, Form, Accordion} from "react-bootstrap";
import "./list.css";
import ListTitle from "./ListTitle";

function List(props) {
    const { id, title, updateList, deleteList, workspaceId } = props;
    const [tasks, setTasks] = useState(props.tasks);
    const [listName, setListName] = useState(title);
    const [taskName, setTaskName] = useState("");

    // Callback function to handle changes to the task name
    async function handleNameChange(title) {
        try {
            setListName(title);
            // Make a PATCH request to update the list on the server
            if (!title || typeof title !== "string") {
                throw new Error("Invalid or missing title property in updatedList object");
            }
            const response = await fetch(`api/lists/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title }),
            });

            // If the server returns a success status code, update the local state
            if (response.ok) {
                const json = await response.json();
                const updatedList = { id: json._id, title: json.title, tasks: json.tasks }
                updateList(updatedList);
            } else {
                console.error("Failed to update list");
            }
        } catch (err) {
            console.error(err);
        }
    }

    function addTask(event) {
        event.preventDefault();
        const newTask = {
            title: taskName? taskName: "New Task",
            list: id,
            workspace: workspaceId,
            author: "643f6115abbf1b5d55acae11",
        };

        fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })
            .then((response) => response.json())
            .then((data) => {
                const updatedTasks = [...tasks, data];
                setTasks(updatedTasks);
                const updatedList = { id, title, tasks: updatedTasks };
                updateList(updatedList);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    // Callback function to update a task
    function updateTask(updatedTask, oldTask) {
        fetch(`/api/tasks/${oldTask}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        })
            .then((response) => response.json())
            .then((data) => {
                const updatedTasks = tasks.map((task) => {
                    if (task._id === oldTask) {
                        return data;
                    }
                    return task;
                });
                setTasks(updatedTasks);
                const updatedList = { id, title, tasks: updatedTasks };
                updateList(updatedList);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    // Callback function to delete a task
    function deleteTask(taskToDelete) {
        fetch(`/api/tasks/${taskToDelete}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                const updatedTasks = tasks.filter((task) => task._id !== taskToDelete);
                setTasks(updatedTasks);
                const updatedList = { id, title, tasks: updatedTasks };
                updateList(updatedList);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    // Callback function to delete a list
    function handleDelete() {
        deleteList(id);
    }

    const tasksItems = tasks
        ? tasks.map((task) => (
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
            />
        )) : null;

    return (
        <Card id="listCard">
            <Card.Body>
                <ListTitle title={listName} onTitleChange={(title => setListName(title))} titleSave={handleNameChange} handleDelete={handleDelete} />
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Tasks</Accordion.Header>
                        <Accordion.Body>
                            <div id="taskList">
                                {tasksItems}
                            </div>
                            <Form onSubmit={addTask}>
                                <Form.Control
                                    id="addTaskField"
                                    type="text"
                                    placeholder="Add Task"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                />
                                <div className="center">
                                    <Button variant="success" className="me-3" type="submit">Add Task</Button>
                                </div>
                            </Form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
    );
}

export default List;
