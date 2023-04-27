import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Workspace from "./workspaces.js";
import List from "./lists.js";
const { Schema } = mongoose;

let validateEmail = function (email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

let userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, "Please fill a valid email address"],
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    workspaces: [{ type: Schema.Types.ObjectId, ref: "Workspace", required: true }],
    notifications: [{
        sender: { type: Schema.Types.ObjectId, ref: "User" },
        workspace: { type: Schema.Types.ObjectId, ref: "Workspace" }
    }]
});

userSchema.pre("save", async function (next) {
    this.wasNew = this.isNew;
    const user = this;

    // Password hash
    if (!user.isModified("password")) {
        return next();
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
});

userSchema.post("save", async function () {
    // Workspace addition on new User
    const user = this;
    if (user.wasNew && user.workspaces.length === 0) {
        const list1 = new List({ title: "To-Do" });
        const list2 = new List({ title: "In Progress" });
        const list3 = new List({ title: "Completed" });

        await list1.save();
        await list2.save();
        await list3.save();

        const privateWorkspace = new Workspace({
            title: `${user.firstName}'s Workspace`,
            lists: [list1._id, list2._id, list3._id],
            members: [user._id],
        });

        await privateWorkspace.save();

        user.workspaces.push(privateWorkspace._id);
    }
});

userSchema.pre("findOneAndDelete", async function (next) {
    const doc = await this.model.findOne(this.getQuery());
    await Workspace.updateMany(
        { members: doc._id },
        {
            $pull: {
                members: {
                    $in: doc._id,
                },
            },
        }
    );

    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
