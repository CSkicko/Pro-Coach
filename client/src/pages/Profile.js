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
import CircularProgress from '@mui/material/CircularProgress';

// Import Components
import ProfileTabs from '../components/ProfileTabs';

const Profile = () => {

    // Find the profile information based on the logged in user
    const { loading, data } = useQuery(QUERY_SINGLE_USER);

    // If there is no user logged in then navigate to the login page
    if (!Auth.loggedIn()) {
        return <Navigate to="/login" />;
    }

    // When loading, display the loading animation
    if (loading) {
        return (
            <Grid container spacing={4} justifyContent="center">
                <Grid item sx={{ mt: '7%', textAlign: 'center' }} xs={12}>
                    <CircularProgress />
                </Grid>
            </Grid>
        )
    }
    
    // If data exists, provide the user profile
    if (data) {
        return (
            <main>
                <Grid container justifyContent="center">
                    <ProfileTabs user={data}></ProfileTabs>
                </Grid>
            </main>
        );
    };

    // Otherwise inform the user that an error occurred
    return (
        <main>
            <Grid container spacing={4} sx={{ my: 'auto' }} justifyContent="flex-end">

                {/* Grid item for landing page message and get started button */}
                <Grid item sx={{ mt: '7%' }} xs={4}>
                    <h1>An Unknown Error Occurred</h1>
                </Grid>

            </Grid>
        </main>
    )
}

export default Profile;