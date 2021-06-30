var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');

var s3 = new aws.S3({ 
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
   })
  
var uploadS3 = multer({
    storage: multerS3({
      acl: "public-read",
      s3: s3,
      bucket: 'e-commerce-storage',
      metadata: (req, file, cb) => {
        cb(null, {fieldName: file.fieldname});
      },
      key: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
  })

  module.exports = uploadS3;