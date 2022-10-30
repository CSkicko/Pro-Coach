// Import dependencies
import React from 'react';
import { useQuery } from '@apollo/client';

// Import queries & mutations
import { QUERY_COACHES_BY_SKILL } from '../utils/queries';

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

const SearchResults = ({skillId}) => {

    // Query the database for the coaches that have the selected skill
    const { loading, data } = useQuery(QUERY_COACHES_BY_SKILL, {
        variables: { skillId: skillId },
    });

    // Create state variable for the modal status
    const [open, setOpen] = React.useState(false);

    // Create state variable for the selected coach
    const [selectedCoach, setselectedCoach] = React.useState('');

    // Function for opening modal window
    const handleClickOpen = (event, {name}) => {
        setOpen(true);
        setselectedCoach(name);
    };

    // Function for closing the modal window
    const handleClose = () => {
        setOpen(false);
    };

    return (
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
                                                    <Button size="small" onClick={(event) => handleClickOpen(event, {name: coach.displayName})}>Schedule Session</Button>
                                                </CardActions>
                                                </Card>
                                            </Grid>
                                            <Dialog open={open} onClose={handleClose}>
                                            <DialogTitle>Session Request</DialogTitle>
                                            <DialogContent>
                                            <DialogContentText>
                                                Fill in the form below to request a session with {selectedCoach} to discuss {data.coachesBySkill.title}
                                            </DialogContentText>
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="name"
                                                label="Email Address"
                                                type="email"
                                                fullWidth
                                                variant="standard"
                                            />
                                            </DialogContent>
                                            <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button onClick={handleClose}>Send Request</Button>
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
    )
}

export default SearchResults;