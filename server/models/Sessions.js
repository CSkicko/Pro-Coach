const { Schema, model } = require('mongoose');

const sessionsSchema = new Schema({
    coach: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    learner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false,
    },
    message: {
        type: String,
        required: true,
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