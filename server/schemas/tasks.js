import mongoose from 'mongoose';
const { Schema } = mongoose;

let taskSchema = new Schema( {
    title: { type: String, required: true },
    list: { type: String, required: true },
    workspace: { type: Schema.Types.ObjectId, ref: 'Workspace', required: true },
    author: { type: SchemaType.Types.ObjectId, ref: 'User', required: true },
    description: String,
    dueDate: Date,
    assignees: [
        { type: Schema.Types.ObjectId, ref: 'User' },
    ],
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
