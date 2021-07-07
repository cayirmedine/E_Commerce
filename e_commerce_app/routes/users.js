var express = require('express');
var router = express.Router();

const {check, validationResult} = require("express-validator");

const { usersModel } = require('../db');
//old phone format: ^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$
router.post('/sign-up', 
  check('phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Please enter a valid phone number')
    .custom((value) => {
      return usersModel.findOne({
        where: {
          phone: value
        }
      }).then((user) => {
        if(user) {
          return Promise.reject('Phone already in use');
        }
      })
    }),
  check('birthdate')
    .matches(/^\d{1,2}\ \d{1,2}\ \d{4}$/)
    .withMessage('Please enter date in true format(True Format: DD MM YYYY)'),
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value) => {
      return usersModel.findOne({
        where: {
          email: value
        }
      }).then((user) => {
        if(user) {
          return Promise.reject('E-mail already in use');
        }
      })
    }),
  check('password')
    .isLength({min: 6})
    .withMessage('Password must be longer than 6 characters')
,(req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({
      //success: false,
      //errors: errors.array().forEach((error) => res.send(error.msg))
      errors: 'error',
      data: error
    });
  }

  usersModel.create(req.body).then((result) => {res.json({data: result})}, (err) => console.log(err));
});

router.post('/sign-in',
  check('phone')
  .matches(/^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$/)
  .withMessage('Please enter a valid phone number')
,(req, res, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  usersModel.findOne({
    where: {
      phone: req.body.phone
    } 
  }).then((user) => {
    if(user) {
      if(user.password == req.body.password) {
        res.send("Sign in successfull");
      } else {
        res.send("Wrong password");
      }
    } else {
      res.send("No matched account")
    }
  });
})

module.exports = router;
