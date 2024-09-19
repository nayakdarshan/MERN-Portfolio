const mongoose = require('mongoose');
const { default: Skill } = require('../../client/src/pages/Home/Skill');

const introSchema = new mongoose.Schema({
    welcomeText:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
});

const aboutSchema = new mongoose.Schema({
    header:{
        type:String,
        required:true,
    },
    desciption1:{
        type:String,
        required:true,
    },
    desciption2:{
        type:String,
        required:true,
    },
});

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    level: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
});

module.exports = {
    Intro:mongoose.model('intros',introSchema),
    About:mongoose.model('abouts',aboutSchema),
    Skill:mongoose.model('skills',skillSchema),
}