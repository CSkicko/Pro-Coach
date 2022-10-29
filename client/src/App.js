// Import dependencies
import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import EditProfile from './pages/EditProfile';
import Session from './pages/Session';
import SessionReq from './pages/SessionReq';

// Import components
import Navbar from './components/Navbar';

// Import material UI dependencies
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Set the graphql endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Set up the authorisation middleware
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Set up the apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

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
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>

          {/* Set up application routes */}
          <Routes>
            {/* Landing Page at home path */}
            <Route
              path="/"
              element={<><Navbar /><Landing /></>}
            />

            {/* Login Page */}
            <Route
              path="/login"
              element={<><Navbar /><Login /></>}
            />

            {/* Register Page */}
            <Route
                path="/register"
                element={<><Navbar /><Register /></>}
              />

            {/* Profile Page */}
            <Route
                path="/profile"
                element={<><Navbar /><Profile /></>}
              />

            {/* Edit skills page */}
            <Route
              path="/skills/:profileId"
              element={<><Navbar /><Skills /></>}
            />

            {/* Edit profile page */}
            <Route
              path="/editProfile/:profileId"
              element={<><Navbar /><EditProfile /></>}
            />

            {/* Edit session page */}
            <Route
              path="/session/:sessionId"
              element={<><Navbar /><Session /></>}
            />

            {/* Create session request page */}
            <Route
              path="/session-request"
              element={<><Navbar /><SessionReq /></>}
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
