// Starter code extracted from MUI documentation
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Import link to be used for button clicks
import { Link } from 'react-router-dom';

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

export default function ProfileTabs(data) {
    // Set up navigation value
  const [value, setValue] = React.useState(0);

  // Get the user object *TODO: Update to profile object**
  const userInfo = data.user.user;

//   Set up page content state
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
      <Grid item xs={6}>
        <h3>Profile</h3>
        <p>{userInfo.profile.about}</p>
      </Grid>
      <Grid item xs={12} sx={{ mt: '10%', textAlign: 'center' }}>
        <Link to='/editProfile' style={{ textDecoration: 'none' }}>
          <Button variant='contained'>Edit Profile</Button>
        </Link>
      </Grid>
    </>
  )

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
                    <Grid item xs={12} sx={{ mb: '5%', textAlign: 'center' }}>
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
                                <Card>
                                  <CardContent>
                                    
                                    {/* Display session date */}
                                    <Typography sx={{ fontSize: 14 }} color="primary.main" gutterBottom>
                                      {session.date}
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
                    <Grid item xs={12} sx={{ mt: '10%', textAlign: 'center' }}>
                      <Link to='/session-request' style={{ textDecoration: 'none' }}>
                        <Button variant='contained'>New Session Request</Button>
                      </Link>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: '10%', textAlign: 'center' }}>
                      <h3 variant='contained'>Pending Sessions</h3>
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: 'center' }}>
                      <Grid container justifyContent='center' spacing={3}>
                          {userInfo.profile.sessions.map((session, index) => {
                            // If the session is confirmed, return the card under the my sessions title
                            if (!session.confirmed) {
                              return (
                                // Card starter code extracted from MUI documentation
                                <Grid item xs={4}>
                                  <Card>
                                    <CardContent>
                                      
                                      {/* Display session date */}
                                      <Typography sx={{ fontSize: 14 }} color="primary.main" gutterBottom>
                                        {session.date}
                                      </Typography>

                                      {/* Session title */}
                                      <Typography sx={{ mb: 1.5 }}>
                                        Session {index + 1}
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
                    <Grid item xs={12} sx={{ mt: '10%', textAlign: 'center' }}>
                      <h3>Session Requests</h3>
                    </Grid>
                    <Grid item xs={8} sx={{ textAlign: 'center' }}>
                      <Grid container justifyContent='center' spacing={3}>
                          {userInfo.profile.sessions.map((session, index) => {
                            // If the session is confirmed, return the card under the my sessions title
                            if (!session.confirmed) {
                              return (
                                // Card starter code extracted from MUI documentation
                                <Grid item xs={4}>
                                  <Card>
                                    <CardContent>
                                      
                                      {/* Display session date */}
                                      <Typography sx={{ fontSize: 14 }} color="primary.main" gutterBottom>
                                        {session.date}
                                      </Typography>

                                      {/* Display session message */}
                                      <Typography variant="body2">
                                        {session.message}
                                      </Typography>
                                    </CardContent>
                                    <CardActions>
                                      <Link to={`/session/${session._id}`} style={{ textDecoration: 'none' }}>
                                        <Button size="small">View Request</Button>
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
                
              </>
            )
        // If it's the third step, set the page content to the skills information
        case 2:
            return setPageContent(
              <>
                {/* If the user doesn't have any skills saved, display a message */}
                {userInfo.profile.skills.length < 1 ? (
                  <>
                    <h3>You currently don't have any saved skills.</h3>
                    <h4>Add skills using the button below!</h4>
                  </>
                ) : (
                  // If a user does have skills, display them
                  <>
                    <Grid item xs={12} sx={{ mb: '5%', textAlign: 'center' }}>
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
                <Grid item xs={12} sx={{ mt: '10%', textAlign: 'center' }}>
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
                  <Avatar sx={{ bgcolor:'secondary.main', text:'white', height:'100px', width:'100px', mx:'auto' }}>{userInfo.profile.displayName.split('').shift()}</Avatar>
                  <Box sx={{ textAlign: 'center' }}>
                    <h2 >{userInfo.profile.displayName}</h2>
                    <h4>{userInfo.profile.jobTitle}</h4>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <h3>Profile</h3>
                  <p>{userInfo.profile.about}</p>
                </Grid>
                <Grid item xs={12} sx={{ mt: '10%', textAlign: 'center' }}>
                  <Link to='/editProfile' style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>Edit Profile</Button>
                  </Link>
                </Grid>
              </>
            )
    };
  };

  return (
    <>
        <Tabs value={value} sx={{ mb: '10%' }} onChange={handleChange} aria-label="Navigation Tabs">
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