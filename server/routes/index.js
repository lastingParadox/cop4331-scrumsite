import { Router } from "express";

import authentication from "./authentication.js";
import list from "./lists.js";
import task from "./tasks.js";
import workspace from "./workspaces.js";
import user from "./users.js";
import auth from "./auth/index.js";

const router = Router();

/* GET home page. */
router.get("/", (req, res) => {
    //Line 9
    res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
});

router.use("/auth", auth); // JWT stuff eventually
router.use("/authentication", authentication); // Login and Register
router.use("/users", user);
router.use("/workspaces", workspace);
router.use("/lists", list);
router.use("/tasks", task);

export default router;
