const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize Express app
const app = express();

// CORS setup
app.use(cors({
    origin: ["http://localhost:3000", "https://darshannayak-portfolio-api.vercel.app"], // Adjusted URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Body parser middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));

    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

// Routes setup
const portfolioRoute = require('./routes/portfolioRoute');
app.use("/api/v1/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});
