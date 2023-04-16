import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../schemas/users.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) return res.status(409),json({ error: 'User with this email already exists' });

    const newUser = new User({
        email,
        password,
        firstName,
        lastName,
        workspaces: [],
    });

    try {
        await newUser.save();
        return res(200).json({ success: `User with email ${email} successfully created.`, newUser });
    } catch (err) {
        return res(500).json({ error: err });
    }
});

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    if (user.comparePassword(password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.cookie('token', token, { httpOnly: true });

        return res.status(200).json({ success: `User with email ${email} successfully logged in.`, token });
    }
    else return res.status(401).json({ error: 'Invalid password' });
});

export default router;
