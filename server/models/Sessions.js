const { Schema, model } = require('mongoose');

const sessionsSchema = new Schema({
    coach: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    learner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
    skills: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Skills',
        },
    ],
});

const Sessions = model('Sessions', sessionsSchema);

module.exports = Sessions;