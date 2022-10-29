// Starter code extracted from MUI documentation
// Import dependencies
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_PROFILE } from '../utils/mutations';

// Import MUI components
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

// Import authorisation utility function
import Auth from '../utils/auth';

const steps = ['Select Profile Type', 'Tell Us About Yourself', 'Review Your Info'];

export default function ProfileSetup() {

    // Set up create profile mutation
    const [createProfile, { error, data }] = useMutation(CREATE_PROFILE);

    // Function for changing active step when next button is clicked
    const handleNext = async () => {
        if (activeStep === (steps.length - 1)) {
            // Get the user info from the token
            const userInfo = Auth.getUser();
            try {
                // Create the profile using the user ID and form state!
                await createProfile({
                    variables: { ...formState, user: userInfo.data._id },
                });
            } catch (err) {
                console.log(err)
            }
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log(activeStep);
    };

    // Function for changing active step when back button is clicked
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        console.log(activeStep);
    };

    // Function for handling coach button selection
    const makeCoach = () => {
        setFormState({
            ...formState,
            isCoach: true,
        });
    }

    // Function for handling Learner button selection
    const makeLearner = () => {
        setFormState({
            ...formState,
            isCoach: false,
        });
    }

    // Function for handling text input
    const handleInput = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // Create function to gather input from the user based on the current step number
    const renderForm = (stepNo) => {
        switch(stepNo.activeStep) {
            // Set the second step HTML
            case 1 :
                return (
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center" 
                        width="50%" 
                        sx={{ mx:'auto', mb: '10%' }}>
                            <h4>Enter your details below</h4>
                            <TextField id="display-name" label="Display Name" name="displayName" variant="standard" fullWidth value={formState.displayName} onChange={handleInput} />
                            <TextField id="job-title" label="Job Title" name="jobTitle" variant="standard" fullWidth value={formState.jobTitle} onChange={handleInput} />
                            <TextField id="about-me" label="About Me" name="about" variant="standard" multiline rows={4} fullWidth value={formState.about} onChange={handleInput} />
                    </Grid>
                );
            // Set the third step HTML
            case 2 : 
                return (
                    <Grid container justifyContent='center' sx={{ mb: '10%' }}>
                        <Grid item xs={12} sx={{ textAlign: 'center', mb: '5%' }}>
                            <h2>Profile Summary</h2>
                        </Grid>
                        <Grid item xs={4}>
                            {/* Create an avatar with the first letter of the display name */}
                            <Avatar sx={{ bgcolor:'secondary.main', height:'100px', width:'100px', mx:'auto' }}>{formState.displayName.split('').shift()}</Avatar>
                            <Box sx={{ textAlign: 'center' }}>
                                <h3>{formState.displayName}</h3>
                                <h5>{formState.jobTitle}</h5>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <h3>Profile</h3>
                            <p>{formState.about}</p>
                        </Grid>
                    </Grid>
                );
            // Set the default to the first step HTML
            default :
                return (
                    <Grid container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center" 
                        width="80%" 
                        sx={{ mx:'auto' }}>
                            
                        <Grid item sx={12}>
                            <h4>{formState.isCoach ? 'Coach' : 'Learner'}</h4>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" sx={{ mb: '30%' }} onClick={makeCoach}>I Am A Coach</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="contained" sx={{ mb: '30%' }} onClick={makeLearner}>I Am A Learner</Button>
                        </Grid>
                    </Grid>
                );
        };
    };

    // Create state variable for active step
    const [activeStep, setActiveStep] = React.useState(0);

    // Set the form state for creating the new profile
    const [formState, setFormState] = React.useState({
        displayName: '',
        isCoach: false,
        about: '',
        jobTitle: '',
    })    

    // Return the html
    return (
        <Grid container justifyContent="center">
            {/* Render the form data based on the current active step position */}
            <Grid item xs={12}>
                {renderForm({activeStep})}
            </Grid>
            
            <Box sx={{ width: '80%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {/* If the setup process if finished, navigate to the user profile */}
                {activeStep === steps.length ? (
                    <Navigate to="/profile" />
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            >
                            Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Grid>
        
    );
}
