const mongoose = require('mongoose');
const express = require('express'); // Import Express

const app = express(); // Initialize Express app

// Use dotenv only in development (Vercel uses its own environment variable management)
if (process.env.MONGO_URL !== 'production') {
    require('dotenv').config(); // Load .env file in development
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const connection = mongoose.connection;

// Define routes
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Add other route definitions here

// Catch-all route for undefined routes
app.use((req, res, next) => {
    res.status(404).send('NOT FOUND');
});

// Export the app and connection
module.exports = { app, connection };
