var express = require('express');
var router = express.Router();

var dotenv = require('dotenv');
dotenv.config();

var multer = require('multer');
var cloudinary = require('cloudinary').v2;
const cloudinaryStorage = require("cloudinary-multer");

const { catModel } = require('../db');

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
});

const upload = multer({
  storage: storage,
});

router.get("/Categories", (req, res, next) => {
  catModel.findAll().then((result) => res.json({data: result}), (err) => res.send("An error occoured"));
});

router.post("/addCategory", upload.single('imgPath'), (req, res, next) => {
  catModel.create({
    title: req.body.title,
    imgPath: req.file.url
  }).then((result) => {res.json({data: result})}, (err) => res.send(err));
  
})

module.exports = router;