// Import dependencies
import * as React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

// Import Components
import AllSkills from '../components/AllSkills';

// Import MUI components
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';

// Import queries
import { QUERY_SINGLE_PROFILE } from '../utils/queries';

// Set up page to display user's skills and other skills not yet selected
const Skills = () => {

    // Get the profile ID from the url parameters
    const { profileId } = useParams();

    // Set up query for profile data to fetch user's skills
    const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
        variables: { profileId: profileId },
    });

    // Function for handling the removal of skills
    const handleDelete = (event, skillId) => {
        console.log(skillId);
    }

    return (
        <>
            { loading ? (
                <h1>Loading...</h1>
            ) : (
                <main>
                {/* Set up grid for spacing */}
                    <Grid container spacing={4} justifyContent="center">

                        {/* Grid item for landing page message and get started button */}
                        <Grid item sx={{ mt: '7%', mb: '3%', textAlign: 'center' }} xs={12}>
                            <h2>My Skills</h2>
                        </Grid>

                        {/* Provide a list of chips with the user's acquired skills */}
                        <Grid item xs={8} sx={{ textAlign: 'center' }}>
                            {data.profile.skills.map((skill, index) => {
                                return (
                                    <span key={skill._id}>
                                        <Chip key={skill.id} label={skill.title} data-remove='Test' sx={{ mx: '2%', mb:'2%', px:'1%', bgcolor:'secondary.main', color:'white' }} onClick={event => handleDelete(event, skill._id)}/>
                                    </span>
                                )
                            })}
                        </Grid>

                        {/* Provide user with list of all other skills that can be added */}
                        <Grid item sx={{ mt: '7%', mb: '3%', textAlign: 'center' }} xs={12}>
                            <h2>Add Skills</h2>
                        </Grid>
                        {/* Component for rendering the remaining skills - pass user skills to component to allow for conditional rendering */}
                        <Grid item xs={8} sx={{ textAlign: 'center' }}>
                            <AllSkills userSkills={data.profile.skills} profileId={data.profile._id}/>
                        </Grid>
                    </Grid>
                </main>
            )}
        </>
    )
}

export default Skills;