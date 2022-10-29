// Import dependencies
import * as React from 'react';
import { useQuery, useMutation } from '@apollo/client';

// Import MUI components
import Chip from '@mui/material/Chip';

// Import queries & Mutations
import { QUERY_ALL_SKILLS } from '../utils/queries';
import { ADD_SKILL } from '../utils/mutations';

const AllSkills = ({ userSkills, profileId }) => {
    // Get all skills from the database
    const { loading, data } = useQuery(QUERY_ALL_SKILLS);

    // Set up the add skill mutation
    const [addSkill, { error }] = useMutation(ADD_SKILL);

    // Function for handling the adding of skills
    const handleAdd = async (event, skillId, profileId) => {
        console.log(skillId)
        console.log(profileId)
        try {
            const { data } = await addSkill({
                variables: { profileId: profileId, newSkillId: skillId },
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {data.getSkills.map((skill, index) => {
                        return (
                            <span key={skill._id}>
                                <Chip key={skill.id} label={skill.title} sx={{ mx: '2%', mb:'2%', px:'1%', bgcolor:'primary.main', color:'white' }} onClick={event => handleAdd(event, skill._id, profileId)} />
                            </span>
                        )
                    })}
                </>
            )}
        </>
    )
}

export default AllSkills;