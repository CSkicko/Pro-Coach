// Import models
const { Sessions, Skills, User } = require('../models');

// Set up resolvers
const resolvers = {
    Query: {
        // Query for single learner
        learner: async () => {
            return User.findOne({ userId }).populate('desiredSkills').populate('sessions').populate('savedCoaches');
        },
        // Query for single coach
        coach: async () => {
            return User.findOne({ userId }).populate('attainedSkills').populate('sessions');
        }
    }
}