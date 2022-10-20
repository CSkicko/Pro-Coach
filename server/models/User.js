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
    displayName: {
        type: String,
        trim: true,
    },
    learner: {
        type: Boolean,
        default: false,
    },
    coach: {
        type: Boolean,
        default: false,
    },
    learnerProfile: {
        type: String,
        trim: true,
    },
    coachProfile: {
        type: String,
        trim: true,
    },
    jobTitle: {
        type: String,
        trim: true,
    },
    desiredSkills: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Skills',
        }
    ],
    attainedSkills: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Skills',
        }
    ],
    sessions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Sessions',
        }
    ],
    savedCoaches: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
});

const User = model('User', userSchema);

module.exports = User;