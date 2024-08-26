const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const connection = mongoose.connection;

connection.on('error', () => {
    console.log('ERROR CONNECTING DB');
});

connection.on('connected', () => {
    console.log('CONNECTED DB');
});

module.exports = connection;
