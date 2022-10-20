const { Schema, model } = require('mongoose');

const skillsSchema = new Schema({
    title: {
        type: String,
        required: true,
    }
});

const Skills = model('Skills', skillsSchema);

module.exports = Skills;