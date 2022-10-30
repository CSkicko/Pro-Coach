// Import dependencies
import React from 'react';
import Button from '@mui/material/Button';
import Graphic from '../images/graphic.jpg';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Import authorisation middleware and utility functions
import Auth from '../utils/auth';

// Set style for the image
const styles = {
    image: {
        width: "90%"
    }
}

const Landing = () => {

    // If a user is logged in then navigate to the profile page
    if (Auth.loggedIn()) {
        console.log('Logged in')
        window.location.replace('/profile');
    }

    return (
        <main>
            {/* Set up grid for spacing */}
            <Grid container spacing={4} sx={{ my: 'auto' }} justifyContent="flex-end">

                {/* Grid item for landing page message and get started button */}
                <Grid item sx={{ mt: '7%' }} xs={4}>
                    <h1>Pro Coach</h1>
                    <p>The number 1 tool for connecting early career professionals with industry mentors</p>

                    {/* Create a linked get started button to the Register/Login page */}
                    <Link
                        to={`/register`}
                        style={{ textDecoration: 'none' }}
                    >
                        <Button variant="contained" sx={{ my: '10%' }}>Get Started</Button>
                    </Link>
                </Grid>

                {/* Grid item for graphic */}
                <Grid item xs={7}>
                    <img src={Graphic} alt='Coaching' style={styles.image}></img>
                </Grid>
            </Grid>
            {/* Attribution required to use free image */}
            <Grid container sx={{ my: 'auto' }} justifyContent="center">
                <em>
                    Images by <a href="https://www.freepik.com/free-vector/internship-job-training-illustration_11107581.htm#query=coach&position=1&from_view=search&track=sph#position=1&query=coach">Freepik</a>
                </em>
            </Grid>
        </main>
    )
}

export default Landing;