import { Router } from "express";

import user from "./users.js";

const router = Router();

router.use("/users", user);

export default router;
