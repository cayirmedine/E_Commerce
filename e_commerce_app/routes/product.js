var express = require('express');
var router = express.Router();
var dotenv = require('dotenv')
dotenv.config();
var multer = require('multer');
var cloudinary = require('cloudinary').v2;
const { catModel } = require('../db');
const cloudinaryStorage = require("cloudinary-multer");
const del = require('del');
const fs = require('fs');

var dir = '/home/baku/Belgeler/Project/e_commerce_app/public/images/';

// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME, 
//   api_key: process.env.API_KEY, 
//   api_secret: process.env.API_SECRET,
//   secure: true
// });

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
})

// const storage = cloudinaryStorage({
//   cloudinary: cloudinary,
// });

// const uploadImg = multer({ storage: storage }).single('imgPath');

const upload = multer({
  storage: storage,
});

router.post("/uploadFile", upload.single('imgPath'), (req, res, next) => {
  // cloudinary.uploader.upload(req.file.path, (error, result) => {
  //   if(error) {
  //     res.send(error);
  //   } else {
  //     res.send(result);
  //   }
  // });

  res.send(req.file);
})

//var dir = __dirname+"/public/images/";

router.post("/addCategory", upload.single('imgPath'), (req, res, next) => {
  catModel.create({
    title: req.body.title,
    imgPath: req.file.url
  }).then((result) => {res.json({data: result})}, (err) => res.send(err));
    
  // (async () => {
  //   try {
  //       await del(dir);
  
  //       console.log(`${dir} is deleted!`);
  //   } catch (err) {
  //       console.error(`Error while deleting ${dir}.`);
  //   }
  // })();

  try {
  fs.rmdirSync(dir, { recursive: true });

  console.log(`${dir} is deleted!`);
} catch (err) {
  console.error(`Error while deleting ${dir}.`);
}
  
})

module.exports = router;