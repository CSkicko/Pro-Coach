import { gql } from '@apollo/client';

// Create a user
export const CREATE_USER = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// Login
export const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

// Create Profile
export const CREATE_PROFILE = gql`
    mutation CreateProfile($user: ID!, $isCoach: Boolean!, $displayName: String, $about: String, $jobTitle: String) {
        createProfile(user: $user, isCoach: $isCoach, displayName: $displayName, about: $about, jobTitle: $jobTitle) {
            _id
            user {
                username
            }
            displayName
            isCoach
            about
            jobTitle
        }
    }
`;

// Update Profile
export const UPDATE_PROFILE = gql`
    mutation UpdateProfile($profileId: ID!, $displayName: String, $about: String, $jobTitle: String) {
        updateProfile(profileId: $profileId, displayName: $displayName, about: $about, jobTitle: $jobTitle) {
            _id
        }
    }
`;

// Add Skill
export const ADD_SKILL = gql`
    mutation AddSkill($profileId: ID!, $newSkillId: ID) {
        addSkill(profileId: $profileId, newSkillId: $newSkillId) {
            _id
        }
    }
`;

// Remove Skill
export const REMOVE_SKILL = gql`
    mutation RemoveSkill($profileId: ID!, $newSkillId: ID) {
        removeSkill(profileId: $profileId, newSkillId: $newSkillId) {
            _id
        }
    }
`;

// Save Coach
export const SAVE_COACH = gql`
    mutation SaveCoach($profileId: ID!, $coachId: ID!) {
        saveCoach(profileId: $profileId, coachId: $coachId) {
            _id
            displayName
            isCoach
            about
            jobTitle
            skills {
                _id
                title
            }
            sessions {
                _id
            }
            savedCoaches {
                displayName
            }
        }
    }
`;

// Add Session
export const ADD_SESSION = gql`
    mutation AddSession($coach: ID!, $learner: ID!, $date: String!, $confirmed: Boolean!, $message: String!, $skill: ID!) {
        addSession(coach: $coach, learner: $learner, date: $date, confirmed: $confirmed, message: $message, skill: $skill) {
            _id
            coach {
                displayName
            }
            learner {
                displayName
            }
            date
            confirmed
            message
            skill {
                title
            }
        }
    }
`;

// Update Session
export const UPDATE_SESSION = gql`
    mutation UpdateSession($sessionId: ID!, $confirmed: Boolean!) {
        updateSession(sessionId: $sessionId, confirmed: $confirmed) {
            _id
        }
    }
`;

export const DELETE_SESSION = gql`
    mutation DeleteSession($sessionId: ID!) {
        deleteSession(sessionId: $sessionId) {
            _id
            coach {
                _id
            }
            learner {
                _id
            }
        }
    }
`;