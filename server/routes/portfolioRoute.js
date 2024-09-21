const express = require('express');
const router = express.Router(); 
const {Intro,About, Skill,Education, Profile} = require('../models/portfolioModel');
const {Users} = require('../models/userModel');
const upload = require('../middleware/upload');
const path = require('path');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const bcrypt = require('bcrypt');

//get All Portfolio data
router.get('/get-portfolio-data', async(req,res)=>{
    try{
        const profiles = await Profile.find();
        const intros = await Intro.find();
        const abouts = await About.find();
        const skills = await Skill.find();
        const educations = await Education.find();

        console.log(abouts)
        res.status(200).send({
            basicData:profiles[0],
            intro:intros[0],
            about:abouts[0],
            skills:skills,
            education:educations,
        })
    }catch(error){
        res.status(500).send(error);
    }
})

//admin login
router.post('/admin-login', async (req, res) => {
    try {
        const user = await Users.findOne({ username: req.body.username });

        if (user && await bcrypt.compare(req.body.password, user.password)) {
            // Set token expiration to 5 minutes
            const token = jwt.sign(
                { id: user._id, username: user.username }, 
                SECRET_KEY, 
                { expiresIn: '5m' } // Expires in 5 minutes
            );

            return res.status(200).send({
                success: true,
                message: "Login Successful",
                token: token
            });
        } else {
            return res.status(400).send({
                success: false,
                message: "Login Failed - Invalid username or password"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});



// Guest login
router.post('/guest-login', async (req, res) => {
    try {
        const guestUser = {
            username: 'guest',
            password: 'guest'
        };

        const user = await Users.findOne({
            username: guestUser.username,
            password: guestUser.password
        });

        if (user) {
            return res.status(200).send({
                success: true,
                data: user,
                message: "Guest Login Successful"
            });
        } else {
            return res.status(400).send({
                success: false,
                message: "Guest Login Failed - Invalid guest credentials"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
});

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

// ABOUT update API
router.post('/update-about', async(req, res) => {
    try {
      const about = await About.findByIdAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true },
      );
      res.status(200).send({
        data: about,
        success: true,
        message: 'About updated successfully',
      });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

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

// UPDATE PROFILE API
router.post('/update-profile', upload.single('profileImg'), async (req, res) => {
    try {
      const { firstName, lastName, dob, location, _id } = req.body;
      let profileImgUrl = req.body.profileImg; 
  
      if (req.file && req.file.location) {
        profileImgUrl = req.file.location;
      }
  
      const profile = await Profile.findById(_id);
      if (!profile) {
        return res.status(404).send({
          success: false,
          message: 'Profile not found',
        });
      }
  
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.dob = dob;
      profile.location = location;
      profile.profileImg = profileImgUrl;
  
      await profile.save();
  
      res.status(200).send({
        success: true,
        message: 'Profile updated successfully',
        data: profile,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        success: false,
        message: error.message,
      });
    }
  });

module.exports = router;