var express = require('express');
var router = express.Router();

// const {validateUser, result} = require('../validators/userValidator')
// const {checkPhone, checkResult} = require('../validators/checkPhone')

const { usersModel } = require('../db');
//old phone format: ^\+?([0-9]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{2})[-. ]?([0-9]{2})$
router.post('/sign-up', (req, res, next) => {
  usersModel.create(req.body).then((result) => {res.json({data: result})}, (err) => console.log(err));
});

router.post('/sign-in', (req, res, next) => {

  usersModel.findOne({
    where: {
      phone: req.body.phone
    } 
  }).then((user) => {
    if(user) {
      if(user.password == req.body.password) {
        //res.send("Sign in successfull");
        res.json({data: user});
      } else {
        res.send("Wrong password");
      }
    } else {
      res.send("No matched account")
    }
  });
})

module.exports = router;
