import User from '../schemas/users.js';

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
    } catch (err) {
        console.log("User already exists!");
        user1 = await User.findOne({ email: user1.email });
    }
}

export default populateUser;
