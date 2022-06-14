
const { hash } = require('bcrypt');
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
 
exports.register = async (req, res) => {
  const errors = validationResult(req);
    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()});
    }
    let emailExists = await User.findOne({email:req.body.email});
    // Validate request
    if (emailExists) {
      return res.status(400).send({ message: "user already exists!" });
    }

    let {firstName,lastName,email,password,contactNumber,fatherName,className,rollNumber} = req.body;
    let hashedPassword = await bcrypt.hashSync(password,10);;
    // Create a Tutorial
    const user = new User({
      firstName,lastName,email,hash_password:hashedPassword,contactNumber,fatherName,className,rollNumber
    });


    // Save user in the database
    user
      .save(user)
      .then(data => {
        return res.status(200).json({message:"user register Succesfully",user});
      })
      .catch(err => {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };



  exports.signin = async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
         return res.status(400).json({errors:errors.array()});
      }
      let {email,password} = req.body;
      let emailExists = await User.findOne({email:req.body.email});
      // Validate request
      if (!emailExists) {
        return res.status(400).send({ message: "User does not exists!" });
      }
      console.log(emailExists.hash_password)
      let checkPass = await bcrypt.compareSync(password,emailExists.hash_password);
      if(!checkPass){
        return res.status(400).send({ message: "Invalid password" });
      }
      else
      {
      let { firstName,lastName,contactNumber,fatherName,className,rollNumber } = emailExists;  
      let tokenData = {
          firstName,lastName,email,contactNumber,fatherName,className,rollNumber
        }
        var token = jwt.sign(tokenData, process.env.JWT_SECRET);
        res.status(200).json({token});
      }   
    };