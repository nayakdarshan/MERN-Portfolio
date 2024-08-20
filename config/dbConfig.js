const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('error', ()=>{
    console.log('ERROR CONNECTING DB');
});

connection.on('connected', ()=>{
    console.log('CONNECTED DB');
});

module.exports = connection;