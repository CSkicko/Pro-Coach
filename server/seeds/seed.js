// Require dependencies
const db = require('../config/connection');
const { User, Skills, Sessions, Profile } = require('../models');
const userSeeds = require('./userSeeds.json');
const skillsSeeds = require('./skillsSeeds.json');
const sessionsSeeds = require('./sessionsSeeds.json');

db.once('open', async () => {
    try {
        // Delete everything currently in the database
        await User.deleteMany({});
        await Skills.deleteMany({});
        await Sessions.deleteMany({});
        await Profile.deleteMany({});

        // Create the skills and users
        // await Skills.create(skillsSeeds);
        await User.create(userSeeds);

        // Loop through each session and add the relevant data to the db
        // for (let i = 0; i < sessionsSeeds.length; i++) {
        //     const { _id, coach, learner } = await Sessions.create(sessionsSeeds[i]);
            
        //     // Add the session to the coach's profile
        //     const updatedCoach = await User.findOneAndUpdate(
        //         { _id: coach },
        //         {
        //             $addToSet: {
        //                 sessions: _id
        //             },
        //         },
        //     );
        //     // Add the session to the learner's profile
        //     const updatedLearner = await User.findOneAndUpdate(
        //         { _id: learner },
        //         {
        //             $addToSet: {
        //                 sessions: _id
        //             },
        //         },
        //     );
        // };
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    // Flag to the developer that seeding has been completed then exit process
    console.log('Database has been seeded!')
    process.exit(0);
})