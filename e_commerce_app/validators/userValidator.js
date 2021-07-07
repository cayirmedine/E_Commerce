const {check, validationResult} = require("express-validator");

const {usersModel} = require('../db');

const validateUser = [
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
    .withMessage('Password must be longer than 6 characters')]

const result = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: error.array().forEach((error) => res.send(error.msg))
            //   errors: 'error',
            //   data: error
        });
    }

    next();
}

module.exports = {
    validateUser,
    result
}