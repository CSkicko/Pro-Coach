// Import models
const { Sessions, Skills, User, Profile } = require('../models');

// Set up resolvers
const resolvers = {
    Query: {
        // Query a single user
        user: async (parent, args) => {
            return User.findOne({ _id: args.UserId }).populate('profile');
        },
        // Query for single profile
        profile: async (parent, args) => {
            return Profile.findOne({ _id: args.profileId }).populate('skills').populate('sessions').populate('savedCoaches');
        },
        // Get all users that have a selected skill
        coachesBySkill: async (parent, args) => {
            const allCoaches = Profile.find({ isCoach: true });
            return allCoaches.filter(coach => coach.skills.includes(args.skillId));
        },
        // Get all skills
        getSkills: async () => {
            return Skills.find();
        },
        // Get a user's sessions
        userSessions: async (parent, args) => {
            // Find the relevant profile and determine if they are a coach or learner
            const profile = Profile.findOne({ _id: profileId });
            const profileType = profile.isCoach;

            // Find the sessions based on the profile type
            if (profileType){
                return Sessions.find({ coach: args.profileId });
            } else {
                return Sessions.find({ learner: args.profileId });
            }
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            const newUser = await User.create(args);
            return newUser;
        },
        createProfile: async (parent, args) => {
            return;
        },
        updateProfile: async (parent, args) => {
            return;
        },
        updateSkills: async (parent, args) => {
            return;
        },
        saveCoach: async (parent, args) => {
            return;
        },
        addSession: async (parent, args) => {
            return;
        },
        updateSession: async (parent, args) => {
            return;
        },
        deleteSession: async (parent, args) => {
            return;
        }
    }
}