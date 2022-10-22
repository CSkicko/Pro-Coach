const { Schema, model } = require('mongoose');

const skillsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    coaches: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
});

const Skills = model('Skills', skillsSchema);

module.exports = Skills;