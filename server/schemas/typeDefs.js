// Require graph ql
const { gql } = require('apollo-server-express');

// _____________________________________________________
// 1. Set up schemas for user, sessions and skills,
// 2. Set up queries to 
//      a. Get a learner by id
//      b. Get a coach by id
//      c. Get users by attained skills
//      d. Get all skills
//      e. Get all sessions that a user is involved in
// 3. Set up mutations to
//      a. Create a user
//      b. Update a user by id
//      c. Update skills
//      d. Save a coach
//      c. Add a session
//      d. Update a session by id
//      e. Delete a session by id
// _____________________________________________________

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        displayName: String
        learner: Boolean!
        coach: Boolean!
        learnerProfile: String
        coachProfile: String
        jobTitle: String
        desiredSkills: [Skills]
        attainedSkills: [Skills]
        sessions: [Sessions]
        savedCoaches: [User]
    }

    type Sessions {
        _id: ID!
        coach: User!
        learner: User!
        date: String!
        confirmed: Boolean!
        message: String!
        skills: [Skills]!
    }

    type Skills {
        _id: ID
        title: String
    }

    type Query {
        learner(userId: ID!): User
        coach(userId: ID!): User
        usersBySkill(skillId: ID!): [User]
        userSessions(userId: ID!): Sessions
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): User
        updateUser(displayName: String, learner: Boolean, coach: Boolean, learnerProfile: String, coachProfile: String, jobTitle: String): User
        updateSkills(learnerId: ID!, newSkills: [Skills], type: String!): User
        saveCoach(learnerId: ID!, coachId: ID!): User
        addSession(coachId: ID!, learnerId: ID!, date: String!, confirmed: Boolean!, message: String!, skillIds: [ID]!): Sessions
        updateSession(sessionId: ID!, date: String!, message: String!): Sessions
        deleteSession: (sessionId: ID): Sessions
    }
`