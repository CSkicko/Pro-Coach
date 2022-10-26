// Import dependencies
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// Import gql Queries
import { QUERY_SINGLE_USER } from '../utils/queries';

// Import authorisation middleware and utility functions
import Auth from '../utils/auth';

// Import MUI components
import Grid from '@mui/material/Grid';

const Profile = () => {

    // Find the profile information based on the logged in user
    const { loading, data } = useQuery(QUERY_SINGLE_USER);

    // If there is no user logged in then navigate to the login page
    if (!Auth.loggedIn()) {
        return <Navigate to="/login" />;
    }

    // When loading, display the loading animation
    if (loading) {
        return <h1>Loading...</h1>;
    }
    
    // If the user has not set up their profile, display the setup screen
    if (data) {
        return <h1>Data received</h1>;
    };

    // If the user has a profile set up, display it
    return (
        <main>
            {/* Set up grid for spacing */}
            <Grid container spacing={4} sx={{ my: 'auto' }} justifyContent="flex-end">

                {/* Grid item for landing page message and get started button */}
                <Grid item sx={{ mt: '7%' }} xs={4}>
                    <h1>Profile Page</h1>
                </Grid>

            </Grid>
        </main>
    )
}

export default Profile;