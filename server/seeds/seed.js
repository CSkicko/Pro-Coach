// Require dependencies
const db = require('../config/connection');
const { User, Skills, Sessions, Profile } = require('../models');
const userSeeds = require('./userSeeds.json');
const skillsSeeds = require('./skillsSeeds.json');
const sessionsSeeds = require('./sessionsSeeds.json');
const profileSeeds = require('./profileSeeds.json');

db.once('open', async () => {
    try {
        // Delete everything currently in the database
        await User.deleteMany({});
        await Skills.deleteMany({});
        await Sessions.deleteMany({});
        await Profile.deleteMany({});

        // Create skills, users, profiles and sessions
        await Skills.create(skillsSeeds);
        await User.create(userSeeds);
        await Profile.create(profileSeeds);
        await Sessions.create(sessionsSeeds);

        // Create variables to store all users, skills, sessions and profiles
        const allProfiles = await Profile.find();
        const allUsers = await User.find();
        const allSkills = await Skills.find();
        const allSessions = await Sessions.find();

        // Update profiles and users to link to one another and add skills to each profile
        // Note that all skills are the same to ensure the coach search functionality can be tested
        for(let i = 0; i < allProfiles.length; i++){
            // Update profile
            await Profile.findOneAndUpdate(
                { _id: allProfiles[i]._id },
                { 
                    user: allUsers[i]._id,
                    skills: [
                        allSkills[0],
                        allSkills[1],
                        allSkills[2],
                    ]
                },
            );
            // Update Coaches for each skill
            if(allProfiles[i].isCoach){
                for(let j = 0; j < 3; j++){
                    await Skills.findOneAndUpdate(
                        { _id: allSkills[j]._id },
                        {
                            $addToSet: { coaches: allProfiles[i]._id },
                        },
                    );
                };
            };
            // Update user
            await User.findOneAndUpdate(
                { _id: allUsers[i]._id },
                { profile: allProfiles[i]._id },
            );
        };

        // Link sessions with skills and coach & learner profiles
        for (let i = 0; i < allSessions.length; i++) {
            await Sessions.findOneAndUpdate(
                { _id: allSessions[i]._id },
                {
                    coach: allProfiles[0]._id,
                    learner: allProfiles[1]._id,
                    skills: allSkills[i]._id,
                },
            );
        };

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    // Flag to the developer that seeding has been completed then exit process
    console.log('Database has been seeded!')
    process.exit(0);
})