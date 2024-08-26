const mongoose = require('mongoose');

// Use dotenv only in development (Vercel uses its own environment variable management)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // Load .env file in development
}

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, { // Ensure MONGO_URL is set in Vercel's environment settings
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Add other route definitions here

// Catch-all route for undefined routes
app.use((req, res, next) => {
    res.status(404).send('NOT FOUND');
});

connection.on('error', () => {
    console.log('ERROR CONNECTING DB');
});

connection.on('connected', () => {
    console.log('CONNECTED DB');
});

module.exports = connection;
