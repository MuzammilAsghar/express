var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
const {register,signin} = require('../../controllers/userController')


const registervalidations = [
    body('firstName').not().isEmpty().withMessage('First name should not be empty'),
    body('lastName').not().isEmpty().withMessage('last name should not be empty'),
    body('email').isEmail().not().isEmpty().withMessage('Email is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
    body('contactNumber').not().isEmpty().withMessage('Phone number is required'),
    body('fatherName').not().isEmpty().withMessage('fatherName is required'),
    body('className').not().isEmpty().withMessage('class is required'),
    body('rollNumber').not().isEmpty().withMessage('Roll number is required'),
  ];
  

const loginValidations = [
  body('email').isEmail().not().isEmpty().withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required')
]


router.post('/register',registervalidations,register);
router.post('/signin',loginValidations,signin);
router.get('/signin',(req,res) =>{
  res.send('running')
});

module.exports = router;