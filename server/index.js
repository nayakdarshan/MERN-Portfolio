const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.get('/', (req, res) => {
    res.send('Welcome to the backend!');
    console.log('BACKEND SERVER RUNNING');
  });
// Define Routes
app.use('/api/v1', require('./routes/portfolioRoute'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
