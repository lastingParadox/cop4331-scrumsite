import express from 'express';
import User from '../schemas/users.js';
import Workspace from '../schemas/workspaces.js';

const router = express.Router();

// Route to retrieve all workspaces that a user is in
router.get('/:id/workspaces', getUser, async (req, res) => {
    try {
        const workspaces = await Workspace.find({ members: req.user._id });
        return res.json(workspaces);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Middleware to retrieve a user from the id parameter
async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export default router;
