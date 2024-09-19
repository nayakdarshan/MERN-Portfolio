const router = require('express').Router();
const {Intro,About, Skill,Education} = require('../models/portfolioModel');
const {Users} = require('../models/userModel');

//get All Portfolio data
router.get('/get-portfolio-data', async(req,res)=>{
    try{
        const intros = await Intro.find();
        const abouts = await About.find();
        const skills = await Skill.find();
        const educations = await Education.find();

        console.log(abouts)
        res.status(200).send({
            intro:intros[0],
            about:abouts[0],
            skills:skills,
            education:educations,
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

// Add Skill API
router.post('/add-skill', async (req, res) => {
    try {
      const newSkill = new Skill(req.body);
      await newSkill.save();
      const skills = await Skill.find();
      res.status(200).send({
        success: true,
        message: "Skill added successfully",
        data: skills,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Update Skill API
  router.post('/update-skill', async (req, res) => {
    try {
      const updatedSkill = await Skill.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true },
      );
      const skills = await Skill.find();
      res.status(200).send({
        success: true,
        message: "Skill updated successfully",
        data: skills,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Delete Skill API
  router.post('/delete-skill', async (req, res) => {
    try {
      await Skill.findByIdAndDelete(req.body._id);
      const skills = await Skill.find();
      res.status(200).send({
        success: true,
        message: "Skill deleted successfully",
        data: skills,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });

  // Add Education API
router.post('/add-education', async (req, res) => {
    try {
        const newEducation = new Education(req.body);
        await newEducation.save();
        const educationList = await Education.find();
        res.status(200).send({
            success: true,
            message: 'Education added successfully',
            data: educationList,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update Education API
router.post('/update-education', async (req, res) => {
    try {
        const education = await Education.findByIdAndUpdate(req.body._id, req.body, { new: true });
        const educationList = await Education.find();
        res.status(200).send({
            success: true,
            message: 'Education updated successfully',
            data: educationList,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete Education API
router.post('/delete-education', async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.body._id);
        const educationList = await Education.find();
        res.status(200).send({
            success: true,
            message: 'Education deleted successfully',
            data: educationList,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;