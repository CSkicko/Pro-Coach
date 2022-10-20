// Import mongoose
const mongoose = require('mongoose');

// Connect to the mongodb database either at the deployed application URI or local host
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pro-coach',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

module.exports = mongoose.connection;