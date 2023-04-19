import mongoose from 'mongoose';
const { Schema } = mongoose;
import List from './lists.js'

let taskSchema = new Schema( {
    title: { type: String, required: true },
    list: { type: Schema.Types.ObjectId, ref: 'List', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: String,
    dueDate: Date,
    assignees: [
        { type: Schema.Types.ObjectId, ref: 'User' },
    ],
});

taskSchema.pre('findOneAndDelete', async function(next) {
    const doc = await this.model.findOne(this.getQuery());
    await List.updateMany({ _id: doc.list }, {
        $pull: {
            tasks: {
                $in: doc._id,
            },
        }
    });
    next();
});

taskSchema.pre('save', async function (next) {
    if (!isNew) next();
    try {
        const list = await List.findById(this.list);
        if (!list) {
            throw new Error('List not found');
        }
        list.tasks.push(this._id);
        await list.save();
        next();
    } catch (error) {
        next(error);
    }
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
