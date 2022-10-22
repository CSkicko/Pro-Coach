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

        await Skills.create(skillsSeeds);
        await User.create(userSeeds);

        // Loop through each user and add profiles to the db
        const allUsers = User.find();
        await allUsers.map(async (currentUser, index) => {
            // Create the profile using the current user ID
            const createdProfile = await Profile.create({...profileSeeds[index], user: currentUser._id});
            // Update the user object with the profile id
            await User.findOneAndUpdate(
                { _id: currentUser._id },
                { profile: createdProfile._id },
            );
        }); 
        
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    // Flag to the developer that seeding has been completed then exit process
    console.log('Database has been seeded!')
    process.exit(0);
})