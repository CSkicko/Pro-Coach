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

        // Create skills and users
        await Skills.create(skillsSeeds);
        await User.create(userSeeds);

        // Create profiles then update profiles and users to link to one another
        await Profile.create(profileSeeds);
        const allProfiles = await Profile.find();
        const allUsers = await User.find();
        for(let i = 0; i < allProfiles.length; i++){
            // Update profile
            await Profile.findOneAndUpdate(
                { _id: allProfiles[i]._id },
                { user: allUsers[i]._id },
            );
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