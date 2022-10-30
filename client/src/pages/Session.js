// Import dependencies
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

// Import link to be used for button clicks
import { Link } from 'react-router-dom';

// Import queries & mutations
import { QUERY_SINGLE_SESSION } from '../utils/queries';
import { DELETE_SESSION } from '../utils/mutations';

// Import MUI components
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const Session = () => {

    // Get the session ID from the URL parameters
    const { sessionId } = useParams();

    // Set up query for session data to fetch session information
    const { loading, data } = useQuery(QUERY_SINGLE_SESSION, {
        variables: { sessionId: sessionId },
    });

    if(data){
        console.log(data)
    }

    // Set up the delete session mutation
    const [deleteSession, { error }] = useMutation(DELETE_SESSION);

    // Function for handling the session cancellation
    const handleDelete = async (event) => {
        try {
            const { data } = await deleteSession({
                variables: { sessionId: sessionId },
            });
            window.location.replace('/profile');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main>
            {/* Provide link back to profile page */}
            <Link to={`/profile`} style={{ textDecoration: 'none' }}>
                <Button variant='contained' sx={{ mt: '4%', ml: '3%', textAlign: 'center' }}>Back to Profile</Button>
            </Link>
            {/* If the data is loading, provide the loading animation */}
            {loading ? (
                <Grid container spacing={4} justifyContent="center">
                    <Grid item sx={{ mt: '7%', textAlign: 'center' }} xs={12}>
                        <CircularProgress />
                    </Grid>
                </Grid>
            ) : (
                // Set up grid for spacing
                <Grid container spacing={1} sx={{ my: 'auto' }} justifyContent="center">
                    {/* Provide page title */}
                    <Grid item sx={{ mt: '1%', textAlign: 'center' }} xs={12}>
                        <h2>Session Information</h2>
                    </Grid>

                    {/* Provide session date */}
                    <Grid item sx={{ textAlign: 'center' }} xs={12}>
                        <h5>Date</h5>
                        <p>{data.singleSession.date}</p>
                    </Grid>

                    {/* List Session Coach with avatar */}
                    <Grid item sx={{ textAlign: 'center' }} xs={4}>
                        <h3>Coach</h3>
                        <Grid container justifyContent="center" alignItems='center'>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                <Avatar sx={{ bgcolor:'secondary.main', height:'40px', width:'40px', ml:'auto' }}>{data.singleSession.coach.displayName.split('').shift()}</Avatar>
                            </Grid>
                            <Grid item xs={6} sx={{ textAlign: 'left', pl:'3%' }}>
                                <h4>{data.singleSession.coach.displayName}</h4>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* List Session Learner with avatar */}
                    <Grid item sx={{ textAlign: 'center' }} xs={4}>
                        <h3>Learner</h3>
                        <Grid container justifyContent="center" alignItems='center'>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                <Avatar sx={{ bgcolor:'secondary.main', height:'40px', width:'40px', ml:'auto' }}>{data.singleSession.learner.displayName.split('').shift()}</Avatar>
                            </Grid>
                            <Grid item xs={6} sx={{ textAlign: 'left', pl:'3%' }}>
                                <h4>{data.singleSession.learner.displayName}</h4>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Provide Session Skill */}
                    <Grid item sx={{ textAlign: 'center' }} xs={12}>
                        <h4>Skill</h4>
                        <Chip label={data.singleSession.skill.title} data-remove='Test' sx={{ mx: '2%', mb:'2%', px:'1%', bgcolor:'secondary.main', color:'white' }}/>
                    </Grid>

                    {/* Provide Session message */}
                    <Grid item sx={{ textAlign: 'left', ml: '20%' }} xs={12}>
                        <h4>Message</h4>
                        <p>{data.singleSession.message}</p>
                    </Grid>

                    {/* Provide Cancel Session button */}
                    <Grid item sx={{ textAlign: 'center', mt: '2%', mb: '10%' }} xs={12}>
                        <Button sx={{ color: 'error.main' }} onClick={handleDelete} >Cancel Session</Button>
                    </Grid>
                </Grid>
            )}
            
        </main>
    )
}

export default Session;