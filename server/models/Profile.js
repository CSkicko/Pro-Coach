const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    displayName: {
        type: String,
        trim: true,
    },
    isCoach: {
        type: Boolean,
        default: false,
    },
    about: {
        type: String,
        trim: true,
    },
    jobTitle: {
        type: String,
        trim: true,
    },
    skills: [
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
            ref: 'Profile',
        }
    ]
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;