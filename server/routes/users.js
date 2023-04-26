import express from "express";
import User from "../schemas/users.js";
import Workspace from "../schemas/workspaces.js";

const router = express.Router();

// Route to retrieve all users. If a query is passed, return ten closest users.
router.get("/", async (req, res) => {
    const { search } = req.query;

    if (search) {
        const users = await User.find({
            $or: [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ],
        }).limit(10);
        res.json(users);
    } else {
        const users = await User.find();
        res.json(users);
    }
});

// Route to retrieve all workspaces that a user is in
router.get("/:id/workspaces", getUser, async (req, res) => {
    try {
        const workspaces = await Workspace.find({ members: req.user._id });
        return res.json(workspaces);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});


//Send an invite
router.post("/invite", async(req,res) =>{
    const receiverId = req.body.receiverId;
    const senderId = req.body.senderId;
    const workspaceId = req.body.workspaceId;

    if (!senderId || !receiverId)
    {
        return res.status(404).send('User not found');
    }

    const receiver = await User.findById(receiverId);
    console.log(receiverId);

    console.log(receiver)
    

    const invitation = {
        sender: senderId,
        workspace: workspaceId
      };

    receiver.notifications.push(invitation);

    await receiver.save();
    return res.json(receiver);
});

router.patch("/inviteResponse", async(req,res) =>{
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;
    const workspaceId = req.body.workspace;
    const accepted = req.body.inviteResult;

    const user = await User.findById(receiverId);

    const index = user.notifications.findIndex((notification) => {
        return notification.sender == senderId && notification.workspace == workspaceId;
    })

    console.log(index);


    user.notifications.splice(index,index);
    console.log(user.notifications)

    if (accepted) 
        user.workspaces.push(workspaceId);

    await user.save();
    return res.json(user);
})

// Middleware to retrieve a user from the id parameter
async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

export default router;
