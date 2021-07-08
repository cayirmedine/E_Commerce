var multer = require('multer');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');

var s3 = new aws.S3({ 
    accessKeyId: "AKIAVNGYKTJOCON32HMF",
    secretAccessKey: "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"
   })
  
var uploadS3 = multer({
    storage: multerS3({
      acl: "public-read-write",
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