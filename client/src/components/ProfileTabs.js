// Starter code extracted from MUI documentation
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
  console.log(userInfo)

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
        <Button variant='contained'>Edit Profile</Button>
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
                          return (
                            // Card starter code extracted from MUI documentation
                            <Grid item xs={4}>
                              <Card>
                                <CardContent>
                                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    {session.date}
                                  </Typography>
                                  <Typography variant="h5" component="div">
                                    
                                  </Typography>
                                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Session {index + 1}
                                  </Typography>
                                  <Typography variant="body2">
                                    {session.message}
                                  </Typography>
                                </CardContent>
                                <CardActions>
                                  <Button size="small">View Session</Button>
                                </CardActions>
                              </Card>
                            </Grid>
                          )
                        })}
                      </Grid>
                    </Grid>
                  </>
                )}
                {/* Add skills button */}
                <Grid item xs={12} sx={{ mt: '10%', textAlign: 'center' }}>
                    <Button variant='contained'>Add Skills</Button>
                </Grid>
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
                {/* Add skills button */}
                <Grid item xs={12} sx={{ mt: '10%', textAlign: 'center' }}>
                    <Button variant='contained'>Add Skills</Button>
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
                  <Button variant='contained'>Edit Profile</Button>
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