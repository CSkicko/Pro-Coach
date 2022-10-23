const { Schema, model } = require('mongoose');

const sessionsSchema = new Schema({
    coach: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    },
    learner: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
    },
    date: {
        type: Date,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    message: {
        type: String,
    },
    skill: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Skills',
        },
    ],
});

const Sessions = model('Sessions', sessionsSchema);

module.exports = Sessions;