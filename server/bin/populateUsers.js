import User from "../schemas/users.js";
import Workspace from "../schemas/workspaces.js";

async function populateUser(email, password, firstName, lastName) {
    let user1 = new User({
        email,
        password,
        firstName,
        lastName,
        workspaces: [],
    });

    try {
        await user1.save();
        console.log("Created new user and workspace!");
    } catch (err) {
        console.log("User already exists!");
        user1 = await User.findOne({ email: user1.email });
    }

    // Used for testing removal of workspace element from User
    // await new Promise(r => setTimeout(r, 5000));
    // await Workspace.findByIdAndDelete({ _id: user1.workspaces[0] });
    // console.log("Deleted workspace!");
}

export default populateUser;
