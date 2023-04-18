import express from 'express'
const router = express.Router();
import Workspace from '../schemas/workspaces';

// Create a workspace
router.post('/workspaces', async (req, res) => {
/*
 *  POST: Creates a Workspace
 *  Body: { "title": "Example Title", "lists": ["Example List 1", "Example List 2"], "members": [ userObjectId1, userObjectId2 ] }
 *  Required: Title, Members (at least one user object id in array)
 */

    try {
        let { title, lists, members } = req.body;

        if (!lists || lists.length === 0) {
            lists = ['To-Do", "In Progess, "Completed']
        }

        // Create a new workspace object
        const workspace = new Workspace({ title, lists, members });

        // Save the workspace to the database
        await workspace.save();

        // Send a response with the new workspace object
        res.status(201).json({ workspace });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all workspaces
router.get('/workspaces', async (req, res) => {
/*
 *  GET: Retrieves ALL Workspaces.
 *  Note: Not particularly useful from a user perspective. See /auth/workspaces for a route
 *        that will show all the workspaces a user has access to.
 */

    try {
        const workspaces = await Workspace.find();

        res.status(200).json({ workspaces });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single workspace by ID
router.get('/workspaces/:id', async (req, res) => {
/*
 *  GET: Retrieves a workspace with the ID provided.
 *  Required: ID Argument, where ID is the workspace's object id. (workspace.id)
 *  Note: ID IS NOT AN INTEGER. IT'S A STRING.
 */

    try {
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        res.status(200).json({ workspace });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a workspace by ID
router.put('/workspaces/:id', async (req, res) => {
/*
 *  PUT: Updates a workspace with the ID provided.
 *  Body: { "title": "Example Title", "lists": ["Example List 1", "Example List 2"], "members": [ userObjectId1, userObjectId2 ] }
 *  Required: ID Argument, where ID is the workspace's object id. (workspace.id)
 *  Note: ID IS NOT AN INTEGER. IT'S A STRING.
 */

    try {
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        const { title, lists, members } = req.body;

        // Update the workspace object
        workspace.title = title || workspace.title;
        workspace.lists = lists || workspace.lists;
        workspace.members = members || workspace.members;

        // Save the updated workspace to the database
        await workspace.save();

        res.status(200).json({ workspace });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a workspace by ID
router.delete('/workspaces/:id', async (req, res) => {
/*
 *  DELETE: Deletes a workspace with the ID provided.
 *  Required: ID Argument, where ID is the workspace's object id. (workspace.id)
 *  Note: ID IS NOT AN INTEGER. IT'S A STRING.
 */

    try {
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ message: 'Workspace not found' });
        }

        // Delete the workspace from the database
        await workspace.remove();

        res.status(200).json({ message: 'Workspace deleted' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
