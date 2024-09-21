const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,       
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  region: process.env.AWS_REGION,                  
});

// Create an S3 instance
const s3 = new AWS.S3();

// Configure multer-s3 storage
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,       
    acl: 'public-read',                            
    key: function (req, file, cb) {
      const fileName = `${Date.now()}_${path.basename(file.originalname)}`;
      cb(null, `profile-pictures/${fileName}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },            
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  },
});

module.exports = upload;
