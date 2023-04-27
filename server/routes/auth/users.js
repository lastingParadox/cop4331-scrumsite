import jwt from "jsonwebtoken";
import express from "express";
import User from "../../schemas/users.js";
import Workspace from "../../schemas/workspaces.js";

const router = express.Router();

router.get("/workspaces", authenticateJWT, async (req, res) => {
    try {
        const workspaces = await Workspace.find({ members: req.user._id });
        return res.json({ user: req.user, workspaces });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

async function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId);

            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).json({ error: "Invalid token: user not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({ error: "Invalid token" });
        }
    } else {
        res.status(401).json({ error: "Authorization header required" });
    }
}

export default router;
