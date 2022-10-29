// Import dependencies
import * as React from 'react';
import { useQuery } from '@apollo/client';

// Import MUI components
import Chip from '@mui/material/Chip';

// Import queries
import { QUERY_ALL_SKILLS } from '../utils/queries';

const AllSkills = ({ userSkills }) => {
    // Get all skills from the database
    const { loading, data } = useQuery(QUERY_ALL_SKILLS);

    return (
        <>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <>
                    {data.getSkills.map((skill, index) => {
                        return <Chip key={skill.id} label={skill.title} sx={{ mx: '2%', mb:'2%', px:'1%', bgcolor:'primary.main', color:'white' }} />
                    })}
                </>
            )}
        </>
    )
}

export default AllSkills;