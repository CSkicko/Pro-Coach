// Starter code extracted from MUI documentation https://mui.com/material-ui/react-app-bar/
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


// Import authorisation utility function
import Auth from '../utils/auth';

// Function to log out user and redirect to the landing page
const logoutUser = () => {
  Auth.logout();
  <Navigate to="/login" />
}

function Navbar() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  const checklogin = () => {
    Auth.loggedIn() ? setLoggedIn(true) : setLoggedIn(false);
  }

  React.useEffect(() => {
    checklogin();
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            {/* Logo with link to homepage */}
            <Link
                to={`/`}
                style={{ textDecoration: "none", color: "white" }}
            >
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="Pro Coach Logo"
                    sx={{ mr: 2 }}
                >
                    <LightbulbIcon />
                </IconButton>
            </Link>
          
          {/* Application Title */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Pro Coach
            </Typography>

          {/* Buttons with links to login/register page or logout button depending on logged in status */}
            {loggedIn ? (
              <Button color="inherit" onClick={logoutUser}>Logout</Button>
            ) : (
              <Box>
                <Link
                    to={`/login`}
                    style={{ textDecoration: 'none', color: "white" }}
                >
                    <Button color="inherit">Login</Button>
                </Link>
                <Link
                    to={`/register`}
                    style={{ textDecoration: 'none', color: "white" }}
                >
                    <Button color="inherit">Register</Button>
                </Link>
              </Box>
            )}
            
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;
