// Import dependencies
import React from 'react';
import Landing from './pages/Landing';
// Import material UI dependencies
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Set up the main theme colours
const theme = createTheme({
  palette: {
    primary: {
      main: '#08dc98',
    },
    secondary: {
      main: '#dc084b',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Landing></Landing>
      </div>
    </ThemeProvider>
  );
}

export default App;
