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
        // Create a new user
        createUser: async (parent, args) => {
            const newUser = await User.create(args);
            return newUser;
        },

        // Create a new profile for a user
        createProfile: async (parent, args) => {
            const newProfile = await Profile.create(args);
            // Find the associated user and update the profile field
            User.findOneAndUpdate(
                { _id: args.userId },
                { profile: newProfile._id },
            );
            return newProfile;
        },

        // Update a current profile
        updateProfile: async (parent, args) => {
            return Profile.findOneAndUpdate(
                { _id: args.profileId },
                { args },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },

        // Add a skill to a profile
        addSkill: async (parent, args) => {
            return Profile.findOneAndUpdate(
                { _id: args.profileId },
                { 
                    $addToSet: {
                        skills: args.newSkill,
                    },
                },
                {
                    new: true,
                    runValidators: true,
                },
            );
        },

        // Save a coach to a learner profile
        saveCoach: async (parent, args) => {
            const userProfile = Profile.findOne({ _id: args.profileId });

            // Check if the user profile is a learner and if not return a message
            if (!userProfile.isCoach) {
                return 'You must be a learner to save a coach to your profile!'
            }

            // Add the coach to the profile and return the updated profile
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
            );
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