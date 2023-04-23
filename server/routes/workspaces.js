import express from 'express'
const router = express.Router();
import Workspace from '../schemas/workspaces.js';

// Get all workspaces
router.get('/', async (req, res) => {
/*
 *  GET: Retrieves ALL Workspaces.
 *  Note: Not particularly useful from a user perspective. See /auth/workspaces for a route
 *        that will show all the workspaces a user has access to.
 */
    try {
        const workspaces = await Workspace.find();
        res.status(200).json(workspaces);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new workspace
router.post('/', async (req, res) => {
/*
 *  POST: Creates a Workspace
 *  Body: {
 *          "title": "Example Title",
 *          "lists": [listId1, listId2],
 *          "members": [ userObjectId1, userObjectId2 ]
 *  }
 *  Required: Title, Members (at least one user object id in array)
 */
    const workspace = new Workspace({
        title: req.body.title,
        lists: req.body.lists,
        members: req.body.members
    });

    try {
        const newWorkspace = await workspace.save();
        res.status(201).json(newWorkspace);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a single workspace
router.get('/:id', getWorkspace, (req, res) => {
/*
 *  GET: Retrieves a workspace with the ID provided.
 *  Required: ID Argument, where ID is the workspace's object id. (workspace.id)
 *  Note: ID IS NOT AN INTEGER. IT'S A STRING.
 */
    res.json(req.workspace);
});

// Update a workspace
router.patch('/:id', getWorkspace, async (req, res) => {
/*
 *  PATCH: Updates a workspace with the ID provided.
 *  Body: {
 *          "title": "Example Title",
 *          "lists": [listId1, listId2],
 *          "members": [ userObjectId1, userObjectId2 ]
 *  }
 *  Required: ID Argument, where ID is the workspace's object id. (workspace.id)
 *  Note: ID IS NOT AN INTEGER. IT'S A STRING.
 */
    if (req.body.title != null) {
        req.workspace.title = req.body.title;
    }

    if (req.body.lists != null) {
        req.workspace.lists = req.body.lists;
    }

    if (req.body.members != null) {
        req.workspace.members = req.body.members;
    }

    try {
        const updatedWorkspace = await req.workspace.save();
        res.json(updatedWorkspace);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a workspace
router.delete('/:id', getWorkspace, async (req, res) => {
/*
 *  DELETE: Deletes a workspace with the ID provided.
 *  Required: ID Argument, where ID is the workspace's object id. (workspace.id)
 *  Note: ID IS NOT AN INTEGER. IT'S A STRING.
 */
    try {
        const deleteWorkspace = await Workspace.findByIdAndDelete(req.workspace.id);
        res.json({ message: 'Workspace deleted', workspace: deleteWorkspace });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a single workspace by ID
async function getWorkspace(req, res, next) {
    let workspace;

    try {
        workspace = await Workspace.findById(req.params.id).populate({ path: 'lists', populate: { path: 'tasks', populate: { path: 'author assignees' } } });

        if (workspace == null) {
        return res.status(404).json({ message: 'Cannot find workspace' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    req.workspace = workspace;
    next();
}

export default router;
