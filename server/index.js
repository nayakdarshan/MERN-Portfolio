const express = require('express');
const app = express();
require('dotenv').config;
const dbconfig = require('./config/dbConfig');

const portfolioRoute = require('./routes/portfolioRoute');
app.use(express.json());
app.use("/api/v1/portfolio",portfolioRoute);

const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors(
    {
        origin:["https://darshannayak-api.vercel.app/"],
        methods:['GET','POST','PUT','DELETE'],
        credentials:true,
    }
))
app.get('/',(req,res)=>{
    res.json('SERVER RUNNING')
})
// const path = require('path');
// if(process.env.NODE_ENV==='production'){
//     app.use(express.static('client/build'));
//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'));
//     })
// }

app.listen(port,()=>{
    console.log(`SERVER RUNNING ON PORT ${port}`);
})