// Import dependencies
import React from 'react';
import Grid from '@mui/material/Grid';

const Profile = () => {
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