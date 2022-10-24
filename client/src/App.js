// Import dependencies
import React from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// Import material UI dependencies
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Set up the main theme colours
const theme = createTheme({
  palette: {
    primary: {
      main: '#d27547',
    },
    secondary: {
      main: '#47a4d2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* Import Navbar Component */}
        <Navbar></Navbar>

        {/* Set up application routes */}
        <Routes>
          {/* Landing Page at home path */}
          <Route
            path="/"
            element={<Landing />}
          />

          {/* Login Page */}
          <Route
            path="/login"
            element={<Login />}
          />

        {/* Register Page */}
        <Route
            path="/register"
            element={<Register />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
