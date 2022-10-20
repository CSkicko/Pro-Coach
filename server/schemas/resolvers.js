// Import models
const { Sessions, Skills, User } = require('../models');

// Set up resolvers
const resolvers = {
    Query: {
        // Query for single learner
        learner: async (parent, args) => {
            return User.findOne({ _id: args.userId }).populate('desiredSkills').populate('sessions').populate('savedCoaches');
        },
        // Query for single coach
        coach: async (parent, args) => {
            return User.findOne({ _id: args.userId }).populate('attainedSkills').populate('sessions');
        },
        // Get all users that have a selected skill
        usersBySkill: async (parent, args) => {
            const allUsers = User.find();
            return allUsers.filter(coach => coach.sessions.includes(args.skillId));
        },
        userSessions: async (parent, args) => {
            const sessionsAsCoach = Sessions.find({coach: args.userId});
            const sessionsAsLearner = Sessions.find({learner: args.userId});

            // Combine the arrays of sessions as a coach and sessions as a learner
            const allSessions = sessionsAsCoach.concat(sessionsAsLearner);
            return allSessions;
        },
    },
}