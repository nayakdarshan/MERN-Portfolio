const router = require('express').Router();
const {Intro,About, Skill} = require('../models/portfolioModel');
const {Users} = require('../models/userModel');

//get All Portfolio data
router.get('/get-portfolio-data', async(req,res)=>{
    try{
        const intros = await Intro.find();
        const abouts = await About.find();
        const skills = await Skill.find();

        console.log(abouts)
        res.status(200).send({
            intro:intros[0],
            about:abouts[0],
            skills:skills[0],
        })
    }catch(error){
        res.status(500).send(error);
    }
})

// admin login
router.post('/admin-login', async(req,res)=>{
    try{
        const user = await Users.findOne({
            username:req.body.username,
            password:req.body.password
        });
        if(user){
            res.status(200).send({
                success:true,
                data:user,
                message:"Login Succesfull"
            });
        }else{
            res.status(400).send({
                success:false,
                data:user,
                message:"Login Failed - Invalid username and password"
            });
        }
        
    }catch(error){
        console.log(error)
        res.status(500).send(error);
    }
})

//INTRO update API
router.post('/update-intro', async(req,res)=>{
    try{
        const intro = await Intro.findByIdAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true},
        );
        res.status(200).send({
            data:intro,
            success:true,
            message:"Intro updated successfully"
        })
    }catch(error){
        res.status(500).send(error);
    }
})

//ABOUT update API
router.post('/update-about', async(req,res)=>{
    try{
        const about = await about.findByIdAndUpdate(
            {_id:req.body._id},
            req.body,
            {new:true},
        );
        res.status(200).send({
            data:about,
            success:true,
            message:"About updated successfully"
        })
    }catch(error){
        res.status(500).send(error);
    }
})

// Update Skills API
router.post('/update-skills', async (req, res) => {
    try {
      const portfolio = await Portfolio.findOne();
      if (portfolio) {
        portfolio.skills = req.body.skills;
        await portfolio.save();
      } else {
        await Portfolio.create({ skills: req.body.skills });
      }
      res.status(200).send({
        success: true,
        message: 'Skills updated successfully',
        data: portfolio ? portfolio.skills : req.body.skills,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
module.exports = router;