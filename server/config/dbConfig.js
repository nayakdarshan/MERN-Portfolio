const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
app.use(cors(
    {
        origin:["https://darshannayak-api.vercel.app/"],
        methods:['GET','POST','PUT','DELETE'],
        credentials:true,
    }
))
app.get('/',(req,res)=>{
    res.json('SERVER RUNNING');
})
mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on('error', ()=>{
    console.log('ERROR CONNECTING DB');
});

connection.on('connected', ()=>{
    console.log('CONNECTED DB');
});

module.exports = connection;