// Import dependencies
import * as React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

// Import link to be used for button clicks
import { Link, Navigate } from 'react-router-dom';

// Import authorisation middleware and utility functions
import Auth from '../utils/auth';

// Import Components
import AllSkills from '../components/AllSkills';

// Import MUI components
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

// Import queries & mutations
import { QUERY_SINGLE_PROFILE } from '../utils/queries';
import { REMOVE_SKILL } from '../utils/mutations';

// Set up page to display user's skills and other skills not yet selected
const Skills = () => {

    // Get the profile ID from the url parameters
    const { profileId } = useParams();

    // Set up query for profile data to fetch user's skills
    const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
        variables: { profileId: profileId },
    });

    // Set up the remove skill mutation
    const [removeSkill, { error }] = useMutation(REMOVE_SKILL);

    // If there is no user logged in then navigate to the login page
    if (!Auth.loggedIn()) {
        return <Navigate to="/login" />;
    }

    // Function for handling the removal of skills
    const handleDelete = async (event, skillId) => {
        try {
            const { data } = await removeSkill({
                variables: { profileId: profileId, newSkillId: skillId },
            });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            { loading ? (
                <Grid container spacing={4} justifyContent="center">
                    <Grid item sx={{ mt: '7%', textAlign: 'center' }} xs={12}>
                        <CircularProgress />
                    </Grid>
                </Grid>
            ) : (
                <main>
                    <Link to={`/profile`} style={{ textDecoration: 'none' }}>
                        <Button variant='contained' sx={{ mt: '4%', ml: '3%', textAlign: 'center' }}>Back to Profile</Button>
                    </Link>
                {/* Set up grid for spacing */}
                    <Grid container spacing={4} justifyContent="center">

                        {/* Grid item for landing page message and get started button */}
                        <Grid item sx={{ mb: '3%', textAlign: 'center' }} xs={12}>
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

                        {/* Provide an instructional message on how to use the functionality */}
                        <Grid item sx={{ textAlign: 'center' }} xs={12}>
                            <h6>Click to remove skills from your profile.</h6>
                        </Grid>

                        {/* Provide user with list of all other skills that can be added */}
                        <Grid item sx={{ mt: '1%', mb: '3%', textAlign: 'center' }} xs={12}>
                            <h2>Add Skills</h2>
                        </Grid>
                        {/* Component for rendering the remaining skills - pass user skills to component to allow for conditional rendering */}
                        <Grid item xs={8} sx={{ textAlign: 'center' }}>
                            <AllSkills userSkills={data.profile.skills} profileId={data.profile._id}/>
                        </Grid>

                        {/* Provide an instructional message on how to use the functionality */}
                        <Grid item sx={{ textAlign: 'center' }} xs={12}>
                            <h6>Click to add skills to your profile.</h6>
                        </Grid>
                    </Grid>
                </main>
            )}
        </>
    )
}

export default Skills;