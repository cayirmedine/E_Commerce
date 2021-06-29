var express = require('express');
const { usersModel } = require('../db');
var router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Test")
})

router.post('/signUp', (req, res, next) => {
  usersModel.create(req.body).then((result) => {res.json({data: result})}, (err) => console.log(err));
});

router.post('/signIn', (req, res, next) => {
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
