const { Schema, model } = require('mongoose');

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

const User = model('User', userSchema);

module.exports = User;