import express from 'express';
import List from '../schemas/lists.js';

const router = express.Router();

// Get all lists
router.get('/', async (req, res) => {
    try {
        const lists = await List.find().populate({ path: tasks, populate: { path: 'author assignees' } });
        res.json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one list
router.get('/:id', getList, (req, res) => {
    res.json(req.list);
});

// Create one list
router.post('/', async (req, res) => {
    const list = new List({
        title: req.body.title,
        tasks: [],
    });

    try {
        const newList = await list.save();
        await newList.populate({ path: tasks, populate: { path: 'author assignees' } })
        res.status(201).json(newList);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one list
router.patch('/:id', getList, async (req, res) => {
    if (req.body.title != null) {
        req.list.title = req.body.title;
    }

    try {
        const updatedList = await req.list.save();
        await updatedList.populate({ path: tasks, populate: { path: 'author assignees' } });
        res.json(updatedList);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one list
router.delete('/:id', getList, async (req, res) => {
    try {
        const deleteList = await List.findByIdAndDelete(req.list.id).populate({ path: 'tasks', populate: { path: 'author assignees' }});
        res.json({ message: 'Deleted List', list: deleteList });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get list by ID
async function getList(req, res, next) {
    try {
        const list = await List.findById(req.params.id).populate({ path: 'tasks', populate: { path: 'author assignees' }});
        if (list == null) {
            return res.status(404).json({ message: 'Cannot find list' });
        }
        req.list = list;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export default router;
