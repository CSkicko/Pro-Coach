const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Create Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Not a valid email address!'],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    profile: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Profile',
        }
    ],
});

// Add bcrypt password hashing to improve security
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    };
    next();
});

// Create schema method to check whether the correct password has been inserted
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = model('User', userSchema);

module.exports = User;