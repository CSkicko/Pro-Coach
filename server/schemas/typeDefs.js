// Require graph ql
const { gql } = require('apollo-server-express');

// _____________________________________________________
// 1. Set up schemas for user, sessions and skills,
// 2. Set up queries to 
//      a. Get a user by an id
//      b. Get a profile by id
//      c. Get coaches by attained skills
//      d. Get all skills
//      e. Get all sessions that a user is involved in
// 3. Set up mutations to
//      a. Create a user
//      b. Create a profile
//      c. Update a profile by id
//      d. Add a skill to a profile
//      e. Save a coach
//      f. Add a session
//      g. Update a session by id
//      h. Delete a session by id
// _____________________________________________________

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        profile: Profile
    }

    type Profile {
        _id: ID!
        user: User
        displayName: String
        isCoach: Boolean!
        about: String
        jobTitle: String
        skills: [Skills]
        sessions: [Sessions]
        savedCoaches: [Profile]
    }

    type Sessions {
        _id: ID
        coach: Profile
        learner: Profile
        date: String
        confirmed: Boolean
        message: String
        skill: [Skills]
    }

    type Skills {
        _id: ID
        title: String
        coaches: [Profile]
    }

    type Query {
        user(userId: ID!): User
        profile(profileId: ID!): Profile
        coachesBySkill(skillId: ID!): Skills
        getSkills: [Skills]
        userSessions(profileId: ID!): [Sessions]
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        createProfile(user: ID!, displayName: String, isCoach: Boolean!, about: String, jobTitle: String, skills: [ID], sessions: [ID], savedCoaches: [ID]): Profile
        updateProfile(profileId: ID!, displayName: String, isCoach: Boolean, about: String, jobTitle: String, skills: [ID], sessions: [ID], savedCoaches: [ID]): Profile
        addSkill(profileId: ID!, newSkillId: ID): Profile
        saveCoach(profileId: ID!, coachId: ID!): Profile
        addSession(coach: ID!, learner: ID!, date: String!, confirmed: Boolean!, message: String!, skill: ID!): Sessions
        updateSession(sessionId: ID!, date: String!, message: String!): Sessions
        deleteSession(sessionId: ID!): Sessions
    }
`

module.exports = typeDefs;