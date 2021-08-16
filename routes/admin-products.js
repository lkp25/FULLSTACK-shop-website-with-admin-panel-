const path = require('path');
const fs = require('fs');
const db = require('../util/mySQLdb')

//multer file upload
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, "public/img/img-large")
  },
  filename: (req, file, cb)=> {
    const {originalname} = file
    cb(null, originalname + '-' + new Date().toISOString())
  },
  fileFilter: (req, file, cb) => {
    if(file.mimetype === 'image.png' || file.mimetype === 'image.jpeg'){
      cb(null, true)
    }else{
      cb(null, false)
    }
  }
})
const upload = multer({ storage });


const express = require('express');
const router = express.Router()

const rootDir = require('../util/path');
const { writeFile } = require('fs');

////////ROUTES FROM PRODUCTS TAB////////
router.post('/update-products-in-offer', (req, res, next)=>{
    writeFile(`public/products-json/products.json`, JSON.stringify(req.body), err =>  console.log(err))
    res.status(201).send(req.body)
})

router.post('/upload-images', upload.any(), (req, res, next)=>{
    console.log(req.files);
    res.status(201).send('files received')
})

//send the list of all img-file names
router.get('/list-of-image-files', (req, res, next)=>{
  
  fs.readdir('public/img/img-large', (err, files)=>{
    if(err){
      console.log(err.message);
    }
    
    res.status(201).send(files)
  })
})
  module.exports = router

  