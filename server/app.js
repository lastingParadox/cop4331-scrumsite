import express from "express";
import cors from "cors";
import index from "./routes/index.js";
import mongoose from "mongoose";
import setEnv from "./bin/setEnv.js";
import populateUser from "./bin/populateUsers.js";
import deleteBatch from "./bin/deleteBatch.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", index);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});

setEnv();

await mongoose.connect(process.env.MONGO_URL);

// Uncomment the line below to generate a test user and workspace upon connecting to the database.
// You will need to change the email as the email field is unique per user.
// Do note this is just a test script and will not be used in production.
// await populateUser("example@example.com", "password", "First", "Last");

// Uncomment the line below to delete all workspaces titled "New Workspace".
// Yeah, I managed to create over 800 workspaces due to a React bug.
// Cool, isn't it?
// deleteBatch();
