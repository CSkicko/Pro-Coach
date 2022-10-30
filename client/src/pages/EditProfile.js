// Import dependencies
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

// Import queries and mutations
import { QUERY_SINGLE_PROFILE } from '../utils/queries'
import { UPDATE_PROFILE } from '../utils/mutations';

// Import authorisation middleware and utility functions
import Auth from '../utils/auth';

// Import material UI components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

const styles = {
    form: {
        textAlign: 'center',
    },
};

const EditProfile = () => {
    // Get the profile ID from the url parameters
    const { profileId } = useParams();

    // Set up query for profile data to fetch user's skills
    const { loading, data } = useQuery(QUERY_SINGLE_PROFILE, {
        variables: { profileId: profileId },
        // When the query has retried data, set the form state to the appropriate data values
        onCompleted: (data) => {
            setFormState({
                displayName: data.profile.displayName,
                about: data.profile.about,
                jobTitle: data.profile.jobTitle,
            });
        }
    });
    
    // Set up form state variable and login mutation
    const [formState, setFormState] = useState({ displayName: '', about: '', jobTitle: '' });
    const [updateProfile, { error }] = useMutation(UPDATE_PROFILE);

    // If there is no user logged in then navigate to the login page
    if (!Auth.loggedIn()) {
        return <Navigate to="/login" />;
    }

    // Set up function to handle form changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Set up function to handle form submit
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await updateProfile({
                variables: { profileId: profileId, ...formState },
            });
            window.location.replace('/profile')
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <main>
            {/* If there's data, navigate to the profile page */}
            {loading ? (
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
                    <Grid container justifyContent='space-around' spacing={4} sx={{ my: "2%" }}>
                        <Grid item xs={4} sx={{ mt: '5%'}}>
                            {/* Create an avatar with the first letter of the display name */}
                            <Avatar sx={{ bgcolor:'secondary.main', height:'100px', width:'100px', mx:'auto' }}>{data.profile.displayName.split('').shift()}</Avatar>
                        </Grid>

                        {/* Provide the form for updating the user */}
                        <Grid item xs={7} sx={{ mr: '8%'}}>
                            <form style={styles.form} onSubmit={handleFormSubmit}>

                                {/* Form title */}
                                <FormLabel>
                                    <h2>Edit Profile</h2>
                                </FormLabel>
                                
                                {/* Display Name Input */}
                                <FormGroup sx={{ mb: '6%' }}>
                                    <FormControl>
                                        <InputLabel htmlFor="display-name">Display Name</InputLabel>
                                        <Input id="display-name" name="displayName" value={formState.displayName} aria-describedby="Display Name" onChange={handleChange} />
                                    </FormControl>
                                </FormGroup>

                                {/* Job Title Input */}
                                <FormGroup sx={{ mb: '6%' }}>
                                    <FormControl>
                                        <InputLabel htmlFor="job-title">Job Title</InputLabel>
                                        <Input id="job-title" name="jobTitle" value={formState.jobTitle} aria-describedby="Job Title" onChange={handleChange} />
                                    </FormControl>
                                </FormGroup>

                                {/* About Input */}
                                <FormGroup sx={{ mb: '20%' }}>
                                    <FormControl>
                                        <InputLabel htmlFor="about">About Me</InputLabel>
                                        <Input id="about" name="about" multiline rows={4} value={formState.about} aria-describedby="About Me" onChange={handleChange} />
                                    </FormControl>
                                </FormGroup>


                                {/* Submit button */}
                                <Button type="submit" variant="contained" sx={{ mx: 'auto' }}>
                                    Save Profile
                                </Button>
                            </form>

                        </Grid>
                    </Grid>
                </main>
            )}
            
            
        </main>
    )
}

export default EditProfile;