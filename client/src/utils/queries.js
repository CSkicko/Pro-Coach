import { gql } from '@apollo/client';

export const QUERY_SINGLE_USER = gql`
    query User($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            profile {
                _id
                displayName
                isCoach
                about
                jobTitle
            }
        }
    }
`;

export const QUERY_SINGLE_PROFILE = gql`
    query Profile($profileId: ID!) {
        profile(profileId: $profileId) {
            _id
            user
            displayName
            isCoach
            about
            jobTitle
            skills {
                title
            }
            sessions {
                coach
                learner
                date
                confirmed
                message
                skill {
                    title
                }
            }
            savedCoaches {
                displayName
                skills
            }
        }
    }
`;

export const QUERY_COACHES_BY_SKILL = gql`
    query CoachesBySkill($skillId: ID!) {
        coachesBySkill(skillId: $skillId) {
            _id
            title
            coaches {
                displayName
                jobTitle
                skills
                sessions
            }
        }
    }
`;

export const QUERY_ALL_SKILLS = gql`
    query GetSkills {
        getSkills {
            _id
            title
        }
    }
`

export const QUERY_USER_SESSIONS = gql`
    query UserSessions($profileId: ID!) {
        userSessions(profileId: $profileId) {
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
`