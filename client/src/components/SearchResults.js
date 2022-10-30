// Import dependencies
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Import queries & mutations
import { QUERY_COACHES_BY_SKILL } from '../utils/queries';
import { ADD_SESSION } from '../utils/mutations';

// Import MUI components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormLabel from '@mui/material/FormLabel'

const SearchResults = ({skillId}) => {

    // Get the profile ID from the url parameters
    const { profileId } = useParams();

    // Query the database for the coaches that have the selected skill
    const { loading, data } = useQuery(QUERY_COACHES_BY_SKILL, {
        variables: { skillId: skillId },
    });

    // Initiate the mutation
    const [addSession, { error, sData }] = useMutation(ADD_SESSION);

    // Create state variable for the modal status
    const [open, setOpen] = React.useState(false);

    // Create a state variable for the selected coach
    const [selectedCoach, setSelectedCoach] = React.useState('')

    // Create state variable for the schedule request
    const [scheduleRequest, setScheduleRequest] = React.useState({
        coach: '',
        learner: profileId,
        date: '',
        confirmed: false,
        message: '',
        skill: '',
    });

    // Create a state variable for the completion status
    const [processComplete, setProcessComplete] = React.useState(false)

    // Function for opening modal window
    const handleClickOpen = (event, {name, coach, skill}) => {
        setOpen(true);
        setSelectedCoach(name);
        setScheduleRequest({
            ...scheduleRequest,
            coach,
            skill
        });
        console.log(scheduleRequest)
    };

    // Function for closing the modal window. Include logic to clear the form fields
    const handleClose = () => {
        setOpen(false);
        setScheduleRequest({
            ...scheduleRequest,
            date: '',
            message: '',
        })
    };

    // Function for handling changes to the modal form
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setScheduleRequest({
            ...scheduleRequest,
            [name]: value,
        })
    }

    // Function to send the session request
    const sendRequest = async () => {
        try {
            const { sData } = await addSession({
                variables: { ...scheduleRequest },
            });
            setProcessComplete(true);
        } catch (err) {
            console.log(err)
        }
        
    }

    return (
        <>
            {processComplete ? (
                <Navigate to='/' />            
            ) : (
                <>
                    { loading ? (
                        <Grid container spacing={4} justifyContent="center">
                            <Grid item sx={{ mt: '7%', textAlign: 'center' }} xs={12}>
                                <CircularProgress />
                            </Grid>
                        </Grid>
                    ) : (
                        <main>
                            {/* Set up grid for spacing */}
                            <Grid container spacing={4} sx={{ my: 'auto' }} justifyContent="center">
                                {/* If there are coaches for the selected skill, display them */}
                                {data.coachesBySkill.coaches.length > 0 ? (
                                    <>
                                        {data.coachesBySkill.coaches.map((coach) => {
                                            return (
                                                <>
                                                    <Grid item xs={4}>
                                                        <Card style={{backgroundColor: '#F4FDFF'}}>
                                                        <CardContent>
                                                            
                                                            {/* Display coach name */}
                                                            <Typography sx={{ fontSize: 18 }} color="primary.main" gutterBottom>
                                                                {coach.displayName}
                                                            </Typography>
        
                                                            {/* Display coach job title */}
                                                            <Typography variant="body2" sx={{ mb: '2%' }}>
                                                                {coach.jobTitle}
                                                            </Typography>
        
                                                            {/* Display coach about me */}
                                                            <Typography variant="body2">
                                                                {coach.about}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button size="small" onClick={(event) => handleClickOpen(event, {name: coach.displayName, coach: coach._id, skill: data.coachesBySkill._id})}>Schedule Session</Button>
                                                        </CardActions>
                                                        </Card>
                                                    </Grid>
        
                                                    {/* Dialog component to display the session request form */}
                                                    <Dialog open={open} onClose={handleClose}>
                                                        <DialogTitle>Session Request</DialogTitle>
                                                        <DialogContent>
                                                            {/* Provide a summary message to the user confirming what they are requesting */}
                                                            <DialogContentText sx={{ mb: '5%' }}>
                                                                Fill in the form below to request a session with {selectedCoach} to discuss {data.coachesBySkill.title}
                                                            </DialogContentText>
                                                                <FormLabel sx={{ fontSize: '12px', color: 'primary.main'}}>Date</FormLabel>
                                                                <TextField
                                                                    margin="dense"
                                                                    id="date"
                                                                    label=""
                                                                    name="date"
                                                                    type="date"
                                                                    fullWidth
                                                                    variant="standard"
                                                                    value={scheduleRequest.date}
                                                                    onChange={handleFormChange}
                                                                />
                                                                <TextField
                                                                    margin="dense"
                                                                    id="message"
                                                                    label="Message"
                                                                    name="message"
                                                                    type="text"
                                                                    fullWidth
                                                                    multiline 
                                                                    rows={4}
                                                                    variant="standard"
                                                                    value={scheduleRequest.message}
                                                                    onChange={handleFormChange}
                                                                />
                                                                </DialogContent>
                                                                <DialogActions>
                                                                    <Button onClick={handleClose}>Cancel</Button>
                                                                    <Button onClick={sendRequest}>Send Request</Button>
                                                                </DialogActions>                                                    
                                                    </Dialog>
                                            </>
                                            )
                                        })}
                                    </>
                                ) : (
                                    // Otherwise provide a message
                                    <h2>Sorry, there's currently no coaches with this skill</h2>
                                )}
                            </Grid>
                        </main>
                    )}
                </>
            )}
        </>
    )
}

export default SearchResults;