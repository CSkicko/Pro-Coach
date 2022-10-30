import { gql } from '@apollo/client';

// Get a single user
export const QUERY_SINGLE_USER = gql`
    query User {
        user {
            _id
            username
            profile {
                _id
                displayName
                isCoach
                about
                jobTitle
                skills {
                    title
                }
                sessions {
                    _id
                    date
                    confirmed
                    message
                }
                savedCoaches {
                    _id
                    displayName
                }
            }
        }
    }
`;

// Get a single profile for profile page
export const QUERY_SINGLE_PROFILE = gql`
    query Profile($profileId: ID!) {
        profile(profileId: $profileId) {
            _id
            displayName
            about
            jobTitle
            skills {
                _id
                title
            }
        }
    }
`;

// Get coaches by skill for the search coaches page
export const QUERY_COACHES_BY_SKILL = gql`
    query CoachesBySkill($skillId: ID!) {
        coachesBySkill(skillId: $skillId) {
            _id
            title
            coaches {
                displayName
                jobTitle
                about
            }
        }
    }
`;

// Get all skills for adding new skills to profile
export const QUERY_ALL_SKILLS = gql`
    query GetSkills {
        getSkills {
            _id
            title
        }
    }
`

// Get user sessions for viewing your own sessions
export const QUERY_USER_SESSIONS = gql`
    query UserSessions($profileId: ID!) {
        userSessions(profileId: $profileId) {
            _id
            date
            confirmed
            message
        }
    }
`

export const QUERY_SINGLE_SESSION = gql`
query SingleSession($sessionId: ID!) {
    singleSession(sessionId: $sessionId) {
        coach {
            displayName
          }
          learner {
            displayName
          }
          date
          iconfirmed
          message
          skill {
            title
          }
    }
  }
`