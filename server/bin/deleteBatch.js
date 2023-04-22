import Workspace from '../schemas/workspaces.js'

async function deleteBatch() {
    await Workspace.deleteMany({ title: "New Workspace" });

    // Used for testing removal of workspace element from User
    // await new Promise(r => setTimeout(r, 5000));
    // await Workspace.findByIdAndDelete({ _id: user1.workspaces[0] });
    // console.log("Deleted workspace!");
}

export default deleteBatch;
