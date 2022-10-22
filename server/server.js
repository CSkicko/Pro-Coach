// Import Dependencies
const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas');

// Set up the port, application and server
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Set up application middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Check if the application is in production mode and if so use the static files stored in the compiled build folder
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
};

// Establish entry point for the application - i.e. the file to send on the home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Create a new instance of apollo server
const startServer = async (typeDefs, resolvers) => {
    // Start the apollo server
    await server.start();

    // Add the express application to the server
    server.applyMiddleware({ app });

    // Start listening at the deployed application port or local host
    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`Server: ${PORT}`);
            console.log(`GraphQL: http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
};

// Start the server
startServer(typeDefs, resolvers);