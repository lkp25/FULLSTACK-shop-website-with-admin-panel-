const path = require('path');
const fs = require('fs');

const express = require('express');

const router = express.Router()

const rootDir = require('../util/path');
const { writeFile } = require('fs');

require('dotenv').config()

const mysql = require('mysql')
const sqlConnection = mysql.createConnection({
  host: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})
sqlConnection.connect(function(err) {
  if (err) throw err;
  
});


////////ROUTES FROM PRODUCTS TAB////////
router.post('/update-products-in-offer', (req, res, next)=>{
    writeFile(`public/products-json/products.json`, JSON.stringify(req.body), err =>  console.log(err))
    res.status(201).send(req.body)
})
  router.post('/upload-images', (req, res, next)=>{
    console.log(req.body);
    // writeFile(`public/products-json/products.json`, JSON.stringify(req.body), err =>  console.log(err))
    res.status(201).send('files received')
  
    
})
router.get('/list-of-image-files', (req, res, next)=>{
  
  fs.readdir('public/img/img-large', (err, files)=>{
    if(err){
      console.log(err.message);
    }
    console.log(files);
    res.status(201).send(files)
  })
})
  module.exports = router

  