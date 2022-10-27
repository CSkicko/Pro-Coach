// Starter code extracted from MUI documentation
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Import MUI components
import Grid from '@mui/material/Grid';

export default function NavTabs() {
    // Set up navigation value
  const [value, setValue] = React.useState(0);

//   Set up page content state
  const [pageContent, setPageContent] = React.useState(<h1>Profile</h1>)

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setValue(newValue);
    // Set up switch to conditionally load page content
    switch(newValue) {
        case 1:
            return setPageContent(<h1>Sessions</h1>)
        case 2:
            return setPageContent(<h1>Skills</h1>)
        default:
            return setPageContent(<h1>Profile</h1>)
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