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

        // Create skills, users and profiles
        await Skills.create(skillsSeeds);
        await User.create(userSeeds);
        await Profile.create(profileSeeds);

        // Create variables to store all users, skills and profiles
        const allProfiles = await Profile.find();
        const allUsers = await User.find();
        const allSkills = await Skills.find();

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

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    // Flag to the developer that seeding has been completed then exit process
    console.log('Database has been seeded!')
    process.exit(0);
})