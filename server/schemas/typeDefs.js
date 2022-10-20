// Require graph ql
const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        displayName: String
        learner: Boolean
        coach: Boolean
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
        time: String!
        confirmed: Boolean!
        message: Text!
        skills: [Skills]!
    }

    type Skills {
        title: String
    }
`