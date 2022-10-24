// Import dependencies
import React from 'react';
import Landing from './pages/Landing';
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
      <div className="App">
        <Landing></Landing>
      </div>
    </ThemeProvider>
  );
}

export default App;
