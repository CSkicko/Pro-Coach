// Starter code extracted from MUI documentation
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Import additional MUI components
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function ProfileTabs(data) {
    // Set up navigation value
  const [value, setValue] = React.useState(0);

  // Get the user object *TODO: Update to profile object**
  const userInfo = data.user.user;
  console.log(userInfo)

//   Set up page content state
  const [pageContent, setPageContent] = React.useState(
    <>
      <Grid item xs={4} sx={{ mt: '10%' }}>
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
        case 1:
            return setPageContent(<h1>Sessiosn</h1>)
        case 2:
            return setPageContent(<h1>Search Coaches</h1>)
        default:
            return setPageContent(<h1>{userInfo.profile.displayName}</h1>)
    };
  };

  return (
    <>
        <Tabs value={value} onChange={handleChange} aria-label="Navigation Tabs">
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