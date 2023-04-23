import mongoose from "mongoose";
import User from "./users.js";
const { Schema } = mongoose;

const notEmpty = (array) => {
    if (array.length === 0) return false;
    return true;
};

let workspaceSchema = new Schema({
    title: { type: String, required: true },
    lists: [{ type: Schema.Types.ObjectId, ref: "List", required: true }],
    members: {
        type: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
        validate: [notEmpty, "At least one member is required."],
    },
});

workspaceSchema.pre("save", async function (next) {
    const newWorkspace = this;
    if (!this.isNew) next();
    try {
        this.members.forEach(async (member) => {
            const user = await User.findById(member);
            if (!user) {
                throw new Error("User not found");
            }
            user.workspaces.push(newWorkspace._id);
            await user.save();
        });
        next();
    } catch (error) {
        next(error);
    }
});

workspaceSchema.pre("findOneAndDelete", async function (next) {
    const doc = await this.model.findOne(this.getQuery());
    await User.updateMany(
        { workspaces: doc._id },
        {
            $pull: {
                workspaces: {
                    $in: doc._id,
                },
            },
        }
    );

    next();
});

const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;
