import mongoose from 'mongoose';
const { Schema } = mongoose;

const notEmpty = (array) => {
    if (array.length === 0) return false;
    return true;
}

let workspaceSchema = new Schema( {
    title: { type: String, required: true },
    lists: [ String ],
    members: {
        type: [
            { type: Schema.Types.ObjectId, ref: 'User', required: true },
        ],
        validate: [ notEmpty, 'At least one member is required.' ],
    },
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

export default Workspace;
