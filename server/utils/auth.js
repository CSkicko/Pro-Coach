// Import JWT
const jwt = require('jsonwebtoken');

// Set the secret and expiration for the token
const secret = 'scau9222cssk';
const expiration = '3h';

// Export the function to sign a token
module.exports = {
    signToken: function ({ email, username, _id }){
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};