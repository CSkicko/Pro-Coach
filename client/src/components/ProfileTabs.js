// Starter code extracted from MUI documentation
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useMutation } from '@apollo/client';

// Import link to be used for button clicks
import { Link } from 'react-router-dom';

// Import mutations
import { UPDATE_SESSION } from '../utils/mutations';
import { DELETE_SESSION } from '../utils/mutations';

// Import additional MUI components
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// Import formatted date string component
import FormattedDate from './FormattedDate';

export default function ProfileTabs(data) {
    // Set up navigation value
  const [value, setValue] = React.useState(0);

  // Get the user object
  const userInfo = data.user.user;

  // Set up page content state
  const [pageContent, setPageContent] = React.useState(
    <>
      <Grid item xs={4}>
        {/* Create an avatar with the first letter of the display name */}
        <Avatar sx={{ bgcolor:'secondary.main', height:'100px', width:'100px', mx:'auto' }}>{userInfo.profile.displayName.split('').shift()}</Avatar>
        <Box sx={{ textAlign: 'center' }}>
          <h2 >{userInfo.profile.displayName}</h2>
          <h4>{userInfo.profile.jobTitle}</h4>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ px:'2%', py: '1%'}} style={{borderLeft: 'solid  5px #d27547', borderRadius: '5%' }}>
        <h3>Profile</h3>
        <p >{userInfo.profile.about}</p>
      </Grid>
      <Grid item xs={12} sx={{ mt: '10%', textAlign: 'center' }}>
        <Link to={`/editProfile/${userInfo.profile._id}`} style={{ textDecoration: 'none' }}>
          <Button variant='contained'>Edit Profile</Button>
        </Link>
      </Grid>
    </>
  );

  // Set up mutations
  const [updateSession, { uError, uData }] = useMutation(UPDATE_SESSION);
  const [deleteSession, { dError, dData }] = useMutation(DELETE_SESSION);

  // Function to handle confirmation of a session
  const confirmSession = async (event, sessionId) => {
    try {
      await updateSession({
        variables: { sessionId, confirmed: true },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    };
  };

  // Function to handle rejection of a session
  const rejectSession = async (event, sessionId) => {
    try {
      await deleteSession({
        variables: { sessionId },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    };
  }

  // Function to handle tab changes and display new content
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Set up switch to conditionally load page content
    switch(newValue) {
        // If it's the second step, set the page content to the session information
        case 1:
            return setPageContent(
              <>
                {/* If the user doesn't have any sessions, display a message */}
                {userInfo.profile.sessions.length < 1 ? (
                  <>
                    <h3>You currently don't have any sessions scheduled</h3>
                  </>
                ) : (
                  // If a user does have sessions, display them
                  <>
                    <Grid item xs={12} sx={{ mb: '2%', textAlign: 'center' }}>
                      <h2>My Sessions</h2>
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: 'center' }}>
                      <Grid container justifyContent='center' spacing={3}>
                        {userInfo.profile.sessions.map((session, index) => {
                          // If the session is confirmed, return the card under the my sessions title
                          if (session.confirmed) {
                            return (
                              // Card starter code extracted from MUI documentation
                              <Grid item xs={4}>
                                <Card style={{backgroundColor: '#F4FDFF'}}>
                                  <CardContent>
                                    
                                    {/* Display session date */}
                                    <Typography sx={{ fontSize: 16 }} color="primary.main" gutterBottom>
                                      <FormattedDate timestamp={session.date} />
                                    </Typography>

                                    {/* Display session message */}
                                    <Typography variant="body2">
                                      {session.message}
                                    </Typography>
                                  </CardContent>
                                  <CardActions>
                                    <Link to={`/session/${session._id}`} style={{ textDecoration: 'none' }}>
                                      <Button size="small">View Session</Button>
                                    </Link>
                                  </CardActions>
                                </Card>
                              </Grid>
                            )
                          }
                        })}
                      </Grid>
                    </Grid>
                  </>
                )}
                {/* Display a create new session button if the user is a learner and conditionally render title */}
                {/* Render unconfirmed sessions */}
                {!userInfo.profile.isCoach ? (
                  <>
                    <Grid item xs={12} sx={{ mt: '3%', textAlign: 'center' }}>
                      <Link to={`/session-request/${userInfo.profile._id}`} style={{ textDecoration: 'none' }}>
                        <Button variant='contained'>New Session Request</Button>
                      </Link>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: '3%', textAlign: 'center' }}>
                      <h3 variant='contained'>Pending Sessions</h3>
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: 'center' }}>
                      <Grid container justifyContent='center' spacing={3} sx={{ mb: '5%'}}>
                          {userInfo.profile.sessions.map((session, index) => {
                            // If the session is confirmed, return the card under the my sessions title
                            if (!session.confirmed) {
                              return (
                                // Card starter code extracted from MUI documentation
                                <Grid item xs={4}>
                                  <Card style={{backgroundColor: '#F4FDFF'}}>
                                    <CardContent>
                                      
                                      {/* Display session date */}
                                      <Typography sx={{ fontSize: 16 }} color="primary.main" gutterBottom>
                                        <FormattedDate timestamp={session.date} />
                                      </Typography>

                                      {/* Display session message */}
                                      <Typography variant="body2">
                                        {session.message}
                                      </Typography>
                                    </CardContent>
                                    <CardActions>
                                      <Link to={`/session/${session._id}`} style={{ textDecoration: 'none' }}>
                                        <Button size="small">View Session</Button>
                                      </Link>
                                    </CardActions>
                                  </Card>
                                </Grid>
                              )
                            }
                          })}
                        </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} sx={{ mt: '3%', textAlign: 'center' }}>
                      <h3>Session Requests</h3>
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: 'center' }}>
                      <Grid container justifyContent='center' spacing={3}>
                          {userInfo.profile.sessions.map((session, index) => {
                            // If the session is confirmed, return the card under the my sessions title
                            if (!session.confirmed) {
                              return (
                                // Card starter code extracted from MUI documentation
                                <Grid item xs={4} sx={{ mb: '5%' }}>
                                  <Card style={{backgroundColor: '#F4FDFF'}}>
                                    <CardContent>
                                      
                                      {/* Display session date */}
                                      <Typography sx={{ fontSize: 16 }} color="primary.main" gutterBottom>
                                        <FormattedDate timestamp={session.date} />
                                      </Typography>

                                      {/* Display session message */}
                                      <Typography variant="body2">
                                        {session.message}
                                      </Typography>
                                    </CardContent>
                                    <CardActions>
                                      <Button size="small" onClick={event => confirmSession(event, session._id)}>Confirm</Button>
                                      <Button size="small" onClick={event => rejectSession(event, session._id)}>Reject</Button>
                                    </CardActions>
                                  </Card>
                                </Grid>
                              )
                            }
                          })}
                      </Grid>
                    </Grid>
                  </>
                )}
                
              </>
            )
        // If it's the third step, set the page content to the skills information
        case 2:
            return setPageContent(
              <>
                {/* If the user doesn't have any skills saved, display a message */}
                {userInfo.profile.skills.length < 1 ? (
                  <Grid container justifyContent='center'>
                    <Grid item xs={12} sx={{ textAlign: 'center'}}>
                      <h3>You currently don't have any saved skills.</h3>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center'}}>
                      <h4>Add skills using the button below!</h4>
                    </Grid>
                  </Grid>
                ) : (
                  // If a user does have skills, display them
                  <>
                    <Grid item xs={12} sx={{ mb: '2%', textAlign: 'center' }}>
                      <h2>My Skills</h2>
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: 'center' }}>
                      {userInfo.profile.skills.map((skill, index) => {
                        return <Chip label={skill.title} sx={{ m:'2%', px:'1%', bgcolor:'secondary.main', color:'white' }} />
                      })}
                    </Grid>
                  </>
                )}
                {/* Edit skills button */}
                <Grid item xs={12} sx={{ mt: '3%', textAlign: 'center' }}>
                  <Link to={`/skills/${userInfo.profile._id}`} style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>Edit Skills</Button>
                  </Link>
                </Grid>
              </>
            )
        // Default to display the user profile information
        default:
            return setPageContent(
              <>
                <Grid item xs={4}>
                  {/* Create an avatar with the first letter of the display name */}
                  <Avatar sx={{ bgcolor:'secondary.main', height:'100px', width:'100px', mx:'auto' }}>{userInfo.profile.displayName.split('').shift()}</Avatar>
                  <Box sx={{ textAlign: 'center' }}>
                    <h2 >{userInfo.profile.displayName}</h2>
                    <h4>{userInfo.profile.jobTitle}</h4>
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ px:'2%', py: '1%'}} style={{borderLeft: 'solid  5px #d27547', borderRadius: '5%' }}>
                  <h3>Profile</h3>
                  <p >{userInfo.profile.about}</p>
                </Grid>
                <Grid item xs={12} sx={{ mt: '10%', textAlign: 'center' }}>
                  <Link to={`/editProfile/${userInfo.profile._id}`} style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>Edit Profile</Button>
                  </Link>
                </Grid>
              </>
            )
    };
  };

  return (
    <>
        <Tabs value={value} sx={{ mb: '5%' }} onChange={handleChange} aria-label="Navigation Tabs">
            <Tab label="Profile" />
            <Tab label="Sessions" />
            <Tab label="Skills" />
        </Tabs>
        <Grid container justifyContent="center">
            {pageContent}
        </Grid>
    </>
    
  );
}