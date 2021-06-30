var express = require('express');
var router = express.Router();

var dotenv = require('dotenv');
dotenv.config();

const { catModel } = require('../db');
const uploadS3 = require('../fileUpload');

router.get("/Categories", (req, res, next) => {
  catModel.findAll().then((result) => res.json({data: result}), (err) => res.send("An error occoured"));
});

router.post("/addCategory", uploadS3.single('imgPath'), (req, res, next) => {
  catModel.create({
    title: req.body.title,
    imgPath: req.file.location
  }).then((result) => {res.json({data: result})}, (err) => res.send(err));
  
})

module.exports = router;