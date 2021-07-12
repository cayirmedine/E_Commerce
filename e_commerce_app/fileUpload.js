var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');

var s3 = new aws.S3({ 
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
   })

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error(), false);
    }
  };
  
var uploadS3 = multer({
    fileFilter,
    storage: multerS3({
      acl: "public-read-write",
      s3: s3,
      bucket: process.env.BUCKET_NAME,
      metadata: (req, file, cb) => {
        cb(null, {fieldName: file.fieldname});
      },
      key: (req, file, cb) => {
        cb(null, file.originalname);
      }
    })
  })

  module.exports = uploadS3;