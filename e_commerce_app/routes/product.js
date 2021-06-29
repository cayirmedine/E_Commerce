var express = require('express');
var router = express.Router();
var multer = require('multer');
var cloudinary = require('cloudinary').v2;
const { catModel } = require('../db');
const cloudinaryStorage = require("cloudinary-multer");

cloudinary.config({ 
  cloud_name: 'dlkalgbrw', 
  api_key: '738177435124317', 
  api_secret: '9n6lkgwQnPQ5TxcNqINBINZL3ro',
  secure: true
});

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, '/home/baku/Belgeler/Project/e_commerce_app/public/images/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname)
//     }
// })

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
});

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

router.post("/addCategory", upload.single('imgPath'), (req, res, next) => {
  catModel.create({
    title: req.body.title,
    imgPath: req.file.url
  }).then((result) => {res.json({data: result})}, (err) => res.send(err));
    
})

module.exports = router;