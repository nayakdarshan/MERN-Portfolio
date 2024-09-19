const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
const corsOptions = {
  origin: (origin, callback) => {
    const whitelist = ['http://localhost:3000', 'http://www.darshannayak.in', 'https://darshannayak.in', 'http://staging.darshannayak.in'];
    if (whitelist.indexOf(origin) !== -1 || !origin) { 
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200, 
};


app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.options('*', cors(corsOptions), (req, res) => {
  console.log('Handling preflight request');
  res.sendStatus(200);
})
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
    // console.log('BACKEND SERVER RUNNING');
  });
// Define Routes
app.use('/api/v1', require('./routes/portfolioRoute'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
