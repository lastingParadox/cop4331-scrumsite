import mongoose from "mongoose";
const { Schema } = mongoose;
import Task from "./tasks.js";

const listSchema = new Schema({
    title: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

listSchema.pre("findOneAndDelete", async function (next) {
    const doc = await this.model.findOne(this.getQuery());
    await Task.deleteMany({ _id: { $in: doc.tasks } });
    next();
});

const List = mongoose.model("List", listSchema);

export default List;
