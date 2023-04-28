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

router.post("/invite", authenticateJWT, async(req,res) =>{
    const receiverId = req.body.receiverId;
    const workspaceId = req.body.workspaceId;

    const receiver = await User.findById(receiverId);
    if (!receiver) {
        return res.status(404).send('User not found');
    }

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ error: "The requested workspace does not exist." });

    const sender = req.user;

    const workspaceExists = sender.workspaces.some((workspace) => {
        return workspace._id == workspaceId;
    })

    if (!workspaceExists) {
        return res.status(406).send('The sender is not in this workspace');
    }

    const invitation = {
        sender: sender._id,
        workspace: workspaceId
    };

    const hasNotification = receiver.notifications.some((notification) => {
        return notification.workspace == workspaceId;
    })

    if (hasNotification) {
        return res.status(405).send('This user already has an invitation to this workspace');
    }
    receiver.notifications.push(invitation);

    await receiver.save();
    return res.status(200).json({ success: `Successfully sent ${receiver.email} a notification to join ${workspace.title}.`, receiver, workspace });
});

router.patch("/inviteResponse", authenticateJWT, async(req,res) =>{
    const workspaceId = req.body.workspace;
    const accepted = req.body.inviteResult;

    const user = await User.findById(req.user._id);

    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) return res.status(404).json({ error: "The requested workspace does not exist." });

    user.notifications = user.notifications.filter((notification) => { notification.workspace._id !== workspace._id })

    if (accepted) {
        user.workspaces.push(workspaceId);
        workspace.members.push(user._id);
    }

    await user.save();
    await workspace.save();
    return res.status(200).json({ workspace, user });
})


async function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.userId).populate('notifications.workspace');

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
