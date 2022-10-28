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
        <Avatar sx={{ bgcolor:'#47a4d2', height:'100px', width:'100px', mx:'auto' }}>{userInfo.profile.displayName.split('').shift()}</Avatar>
        <Box sx={{ textAlign: 'center' }}>
          <h2 >{userInfo.profile.displayName}</h2>
          <h4>{userInfo.profile.jobTitle}</h4>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ mt: '10%' }}>
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
            return setPageContent(<h1>Sessions</h1>)
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
                        return <Chip label={skill.title} sx={{ m:'2%' }} />
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
                  <Avatar sx={{ bgcolor:'#47a4d2', height:'100px', width:'100px', mx:'auto' }}>{userInfo.profile.displayName.split('').shift()}</Avatar>
                  <Box sx={{ textAlign: 'center' }}>
                    <h2 >{userInfo.profile.displayName}</h2>
                    <h4>{userInfo.profile.jobTitle}</h4>
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{ mt: '10%' }}>
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