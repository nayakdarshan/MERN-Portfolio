const express = require('express');
const cors = require('cors');
const app = express();

// Use dotenv only in development (Vercel uses its own environment variable management)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config(); // Load .env file in development
}

const dbconfig = require('./config/dbConfig'); // Ensure MongoDB connection is established

// CORS setup
app.use(cors({
    origin: ["http://localhost:3000", "https://darshannayak-api.vercel.app"], // Local and deployed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Body parser middleware
app.use(express.json());

// Routes setup
const portfolioRoute = require('./routes/portfolioRoute');
app.use("/api/v1/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;

const path = require('path');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


app.listen(port, () => {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});
