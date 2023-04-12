import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const { Schema } = mongoose;

let validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

let userSchema = new Schema( {
    email: { 
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [ validateEmail, "Please fille a valid email address" ],
    },
    password: { type: String, required: true },

});

userSchema.pre('save', (next) => {
    let user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = async (candidatePassword) => {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
