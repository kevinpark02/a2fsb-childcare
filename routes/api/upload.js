const keys = require("../../config/keys");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const Photo = require('../../models/Photo');
var AWS = require('aws-sdk');
var storage = multer.memoryStorage();


// var upload = multer({storage: storage});
const upload = multer({ dest: 'uploads/'})

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFileStream } = require('../../s3')



// Get all photos 
router.get("/", (req, res, next) => {
  Photo.find()
    .then(photos => {
      if (photos) {
        return res.json(photos)
      } else {
        return res.status(404).json({noPhotosFound: 'No Photos Found'})
      }
    })
})

//Get single Photo data 

router.get("/:id", (req,res, next) => {
  Photo.findById(req.params.id, (err, go) => {
    if (err) {
      return next(err)
    }
    res.json(go)
  })
})

router.get("/images/:key", (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})


// Route to upload file
router.post("/upload", upload.single("file"), async function(req, res) {
  const file = req.file
  const result = await uploadFile(file)
  await unlinkFile(file.path)

  let newFileUploaded = {
    photoUrl: result.Key
  }

  var photo = new Photo(newFileUploaded);
  photo.save(function(error, newFile) {
        if (error) {
          throw error
        }
      })

      
  let newData = Object.assign({}, {photoId: photo._id}, ({imagePath: `/images/${result.Key}`}))
  res.send(newData)
})

// Route to delete a photo file
router.delete("/delete/:id", (req, res, next) => {
  Photo.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) {
      return next(err);
    }

    // Deleting file from s3
    let s3bucket = new AWS.S3({
      accessKeyId: keys.AWS_ACCESS_KEY_ID,
      secretAccessKey: keys.AWS_SECRET_ACCESS_KEY,
      region: keys.AWS_REGION,
    });

    let params = {
      Bucket: keys.AWS_BUCKET_NAME,
      Key: result.s3_key,
    };

    s3bucket.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: "200",
          responseType: "string",
          response: "success"
        })
      }
    })
  })
})

module.exports = router;