// Starter code extracted from MUI documentation
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const steps = ['Select Profile Type', 'Tell Us About Yourself', 'Add Your Skills'];

export default function ProfileSetup() {
    // Create state variable for active step
    const [activeStep, setActiveStep] = React.useState(0);

    // Set form html variable
    const [formHtml, setFormHtml] = React.useState(
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center" 
            width="80%" 
            sx={{ mx:'auto' }}>

            <Grid item xs={6}>
                <Button variant="contained" sx={{ mb: '30%' }}>I Am A Coach</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" sx={{ mb: '30%' }}>I Am A Learner</Button>
            </Grid>
        </Grid>
    );

    // Function for changing active step when next button is clicked
    const handleNext = async () => {
        gatherInput(activeStep + 1);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        console.log(activeStep);
    };

    // Function for changing active step when back button is clicked
    const handleBack = async () => {
        gatherInput(activeStep - 1);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        console.log(activeStep);
    };

    // Create function to gather input from the user based on the current step number
    const gatherInput = (stepNo) => {
        // If it's the first step, return buttons to select coach or user
        if (stepNo === 0) {
            setFormHtml (
                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center" 
                    width="80%" 
                    sx={{ mx:'auto' }}>
                        
                    <Grid item xs={6}>
                        <Button variant="contained" sx={{ mb: '30%' }}>I Am A Coach</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" sx={{ mb: '30%' }}>I Am A Learner</Button>
                    </Grid>
                </Grid>
            );
        } else if (stepNo === 1) {
            setFormHtml (
                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center" 
                    width="50%" 
                    sx={{ mx:'auto', mb: '10%' }}>
                        <h4>Enter your details below</h4>
                        <TextField id="display-name" label="Display Name" variant="standard" fullWidth />
                        <TextField id="job-title" label="Job Title" variant="standard" fullWidth />
                        <TextField id="about-me" label="About Me" variant="standard" multiline rows={4} fullWidth />
                </Grid>
                
            );
        } else if (stepNo === 2) {
            setFormHtml (
                <h2>Step 3</h2>
            );
        }
    }

    // Return the html
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                {formHtml}
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
