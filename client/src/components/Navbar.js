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

function Navbar() {
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

          {/* Buttons with links to login/register page */}
            <Link
                to={`/login`}
                style={{ textDecoration: 'none', color: "white" }}
            >
                <Button color="inherit">Login</Button>
            </Link>
            <Link
                to={`/login`}
                style={{ textDecoration: 'none', color: "white" }}
            >
                <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Navbar;
