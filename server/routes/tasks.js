import express from "express";
const router = express.Router();
import Task from "../schemas/tasks.js";

// Get all tasks
router.get("/", async (req, res) => {
    /*
     *  GET: Retrieves all tasks
     *  Note: Not particularly useful from a user perspective. See /auth/tasks for a route
     *        that will show all the tasks a user has access to.
     */

    try {
        const tasks = await Task.find().populate("author assignees");
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one task
router.get("/:id", getTask, (req, res) => {
    /*
     *  GET: Retrieves a task with the ID provided.
     *  Required: ID Argument, where ID is the task's object id. (task.id)
     *  Note: ID IS NOT AN INTEGER. IT'S A STRING.
     */

    res.json(req.task);
});

// Create one task
router.post("/", async (req, res) => {
    /*
     *  POST: Creates a task
     *  Body: {
     *          "title": "Example Title",
     *          "list": "Example List 1",
     *          "workspace": "643c55f531534439b6b8700b",
     *          "author": cookie.id,
     *          "description": "Example description",
     *          "dueDate": new Date("12-10-23"),
     *          "assignees": [ cookie.id ]
     *  }
     *  Required: Title, List, Workspace, Author
     */
    const task = new Task({
        title: req.body.title,
        list: req.body.list,
        workspace: req.body.workspace,
        author: req.body.author,
        description: req.body.description,
        dueDate: req.body.dueDate,
        assignees: req.body.assignees,
    });

    try {
        const newTask = await task.save();
        await newTask.populate("author assignees");
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one task
router.patch("/:id", getTask, async (req, res) => {
    /*
     *  POST: Creates a task
     *  Body: {
     *          "title": "Example Title",
     *          "list": "Example List 1",
     *          "workspace": "643c55f531534439b6b8700b",
     *          "author": cookie.id,
     *          "description": "Example description",
     *          "dueDate": new Date("12-10-23"),
     *          "assignees": [ cookie.id ]
     *  }
     *  Required: ID Argument, where ID is the task's object id. (task.id)
     *  Note: ID IS NOT AN INTEGER. IT'S A STRING.
     */
    if (req.body.title != null) {
        req.task.title = req.body.title;
    }

    if (req.body.list != null) {
        req.task.list = req.body.list;
    }

    if (req.body.workspace != null) {
        req.task.workspace = req.body.workspace;
    }

    if (req.body.author != null) {
        req.task.author = req.body.author;
    }

    if (req.body.description != null) {
        req.task.description = req.body.description;
    }

    if (req.body.dueDate != null) {
        req.task.dueDate = req.body.dueDate;
    }

    if (req.body.assignees != null) {
        req.task.assignees = req.body.assignees;
    }

    try {
        const updatedTask = await req.task.save();
        await updatedTask.populate("author assignees");
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one task
router.delete("/:id", getTask, async (req, res) => {
    /*
     *  DELETE: Deletes a task with the ID provided.
     *  Required: ID Argument, where ID is the task's object id. (task.id)
     *  Note: ID IS NOT AN INTEGER. IT'S A STRING.
     */
    try {
        const deleteTask = await Task.findByIdAndDelete(req.task.id).populate("author assignees");
        res.json({ message: "Task deleted", task: deleteTask });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a single task by ID
async function getTask(req, res, next) {
    try {
        const task = await Task.findById(req.params.id).populate("author assignees");
        if (task == null) {
            return res.status(404).json({ message: "Cannot find task" });
        }
        req.task = task;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export default router;
