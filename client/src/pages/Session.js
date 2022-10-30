// Import dependencies
import React from 'react';
import Grid from '@mui/material/Grid';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

// Import link to be used for button clicks
import { Link } from 'react-router-dom';

// Import queries & mutations
import { QUERY_SINGLE_SESSION } from '../utils/queries';
import { DELETE_SESSION } from '../utils/mutations';

// Import MUI components
import Button from '@mui/material/Button';

const Session = () => {

    // Get the session ID from the URL parameters
    const { sessionId } = useParams();

    return (
        <main>
            {/* Provide link back to profile page */}
            <Link to={`/profile`} style={{ textDecoration: 'none' }}>
                <Button variant='contained' sx={{ mt: '4%', ml: '3%', textAlign: 'center' }}>Back to Profile</Button>
            </Link>
            {/* Set up grid for spacing */}
            <Grid container spacing={4} sx={{ my: 'auto' }} justifyContent="flex-end">

                {/* Grid item for landing page message and get started button */}
                <Grid item sx={{ mt: '7%' }} xs={12}>
                    <h1>Session editing page</h1>
                </Grid>
            </Grid>
        </main>
    )
}

export default Session;