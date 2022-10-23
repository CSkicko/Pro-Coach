// Import models
const { Sessions, Skills, User, Profile } = require('../models');

// Set up resolvers
const resolvers = {
    Query: {
        // Query a single user
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId }).populate('profile');
        },
        // Query for single profile
        profile: async (parent, args) => {
            return Profile.findOne({ _id: args.profileId }).populate('user').populate('skills').populate('sessions').populate('savedCoaches');
        },
        // Get all users that have a selected skill
        coachesBySkill: async (parent, { skillId }) => {
            return Skills.findOne({ _id: skillId }).populate('coaches');
        },
        // Get all skills
        getSkills: async () => {
            return Skills.find();
        },
        // Get a user's sessions
        userSessions: async (parent, args) => {
            // Find the relevant profile and determine if they are a coach or learner
            const profile = await Profile.findOne({ _id: args.profileId });
            const profileType = profile.isCoach;

            // Find the sessions based on the profile type
            // If the profile type is a coach, search the coach field
            if (profileType){
                return Sessions.find({ coach: args.profileId }).populate('coach').populate('learner').populate('skills');
            }
            // If the profile type isn't a coach, search the learner field
            return Sessions.find({ learner: args.profileId }).populate('coach').populate('learner').populate('skills');
        },
    },

    Mutation: {
        // Create a new user
        createUser: async (parent, { username, email, password }) => {
            const newUser = await User.create({ username, email, password });
            return newUser;
        },

        // Create a new profile for a user
        createProfile: async (parent, args) => {
            const newProfile = await Profile.create(args);
            // Find the associated user and update the profile field
            User.findOneAndUpdate(
                { _id: args.user },
                { profile: newProfile._id },
            );
            return Profile.findOne({ _id: newProfile._id }).populate('user').populate('skills').populate('sessions').populate('savedCoaches');
        },

        // Update a current profile and return it with the new values, including all linked data
        updateProfile: async (parent, args) => {
            return Profile.findOneAndUpdate(
                { _id: args.profileId },
                { ...args },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('skills').populate('user').populate('sessions').populate('savedCoaches');
        },

        // Add a skill to a profile and return it with the new values, including all linked data
        addSkill: async (parent, args) => {
            return Profile.findOneAndUpdate(
                { _id: args.profileId },
                { 
                    $addToSet: {
                        skills: args.newSkillId,
                    },
                },
                {
                    new: true,
                    runValidators: true,
                },
            ).populate('skills').populate('user').populate('sessions').populate('savedCoaches');
        },

        // Save a coach to a learner profile
        saveCoach: async (parent, args) => {
            const userProfile = await Profile.findOne({ _id: args.profileId }).populate('skills').populate('user').populate('sessions').populate('savedCoaches');
            const coachProfile = await Profile.findOne({ _id: args.coachId }).populate('skills').populate('user').populate('sessions').populate('savedCoaches');

            // If the user profile is not a learner or if the coach profile is not a coach, just return the profile
            if (userProfile.isCoach || !coachProfile.isCoach) {
                return userProfile;
            }

            // If the user is a learner, add the coach to the profile and return the updated profile
            return Profile.findOneAndUpdate(
                { _id: args.profileId },
                {
                    $addToSet: {
                        savedCoaches: args.coachId,
                    },
                },
                {
                    new: true,
                    runValidators: true,
                },
            ).populate('skills').populate('user').populate('sessions').populate('savedCoaches');
        },

        // Add a new session
        addSession: async (parent, args) => {
            const newSession = await Sessions.create(args);
            // Add the session to the learner profile
            const updatedLearner = await Profile.findOneAndUpdate(
                { _id: args.learner },
                {
                    $addToSet: { sessions: newSession._id },
                },
                {
                    new: true,
                    runValidators: true,
                },
            );
            // Add the session to the coach profile
            const updatedCoach = await Profile.findOneAndUpdate(
                { _id: args.coach },
                {
                    $addToSet: { sessions: newSession._id },
                },
                {
                    new: true,
                    runValidators: true,
                },
            );
            // Return the new session
            return await Sessions.findOne({ _id: newSession._id }).populate('coach').populate('learner').populate('skill');
        },

        // Update a current session
        updateSession: async (parent, args) => {
            return Sessions.findOneAndUpdate(
                { _id: args.sessionId },
                { args },
                {
                    new: true,
                    runValidators: true,
                },
            );
        },

        // Delete a session
        deleteSession: async (parent, args) => {
            // Find the session to be deleted
            const sessionToDelete = Sessions.findOne({ _id: args.sessionId })
            // Remove session from learner sessions array
            const updatedLearner = Profile.findOneAndUpdate(
                { _id: sessionToDelete.learner },
                {
                    $pull: { sessions: args.sessionId },
                },
                {
                    new: true,
                    runValidators: true,
                },
            );
            // Remove session from coach sessions array
            const updatedCoach = Profile.findOneAndUpdate(
                { _id: sessionToDelete.coach },
                {
                    $pull: { sessions: args.sessionId },
                },
                {
                    new: true,
                    runValidators: true,
                },
            );
            // Delete the session
            return Sessions.findOneAndDelete({ _id: args.sessionId });
        }
    }
};

module.exports = resolvers;