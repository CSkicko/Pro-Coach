// Import dependencies
import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Link, Navigate } from 'react-router-dom';

// Import queries & mutations
import { QUERY_SINGLE_PROFILE } from '../utils/queries';

// Import authorisation middleware and utility functions
import Auth from '../utils/auth';

// Import MUI components
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

// Import Components
import SearchResults from '../components/SearchResults';

const SessionReq = () => {

    // Get the profile ID from the url parameters
    const { profileId } = useParams();

    // Set up state variable for active search item
    const [searchItem, setSearchItem] = useState('');

    // Query the database for the profile data to fetch user's skills
    const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
        variables: { profileId: profileId },
    });

    // If there is no user logged in then navigate to the login page
    if (!Auth.loggedIn()) {
        return <Navigate to="/login" />;
    }

    // Set up function to configure the search parameter
    const configureSearch = (event, skillId) => {
        setSearchItem(skillId);
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
                    {/* Link back to profile page */}
                    <Link to={`/profile`} style={{ textDecoration: 'none' }}>
                        <Button variant='contained' sx={{ mt: '4%', ml: '3%', textAlign: 'center' }}>Back to Profile</Button>
                    </Link>
                    {/* Set up grid for spacing */}
                    <Grid container spacing={4} justifyContent="center">

                        {/* Grid item for landing page message and get started button */}
                        <Grid item sx={{ mt: '2%', textAlign: 'center' }} xs={12}>
                            <h2>My Skills</h2>
                        </Grid>

                        {/* Provide a list of chips with the user's acquired skills */}
                        <Grid item xs={8} sx={{ textAlign: 'center' }}>
                            {data.profile.skills.map((skill, index) => {
                                return (
                                    <span key={skill._id}>
                                        <Chip label={skill.title} data-remove='Test' sx={{ mx: '2%', mb:'2%', px:'1%', color:'white', bgcolor: skill._id === searchItem ? 'primary.main' : 'secondary.main' }} onClick={event => configureSearch(event, skill._id)} />
                                    </span>
                                )
                            })}
                        </Grid>
                    </Grid>
                </main>
            )}
            {/* If a search item has been selected, load the search results, otherwise display a message */}
            { searchItem ? (
                <SearchResults skillId={searchItem} />
            ) : (
                <Grid item sx={{ mt: '10%', textAlign: 'center' }} xs={12}>
                    <h2>Select a skill to view coaches</h2>
                </Grid>
            )}
            
        </>
    )
}

export default SessionReq;