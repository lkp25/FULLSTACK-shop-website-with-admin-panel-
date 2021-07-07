const path = require('path');
const fs = require('fs');

const express = require('express');

const router = express.Router()

const rootDir = require('../util/path');
const { writeFile } = require('fs');

require('dotenv').config()


//serve HTML:
router.get('/admin-products', (req, res, next) =>{
  console.log('welcome to admin page - products');
  res.sendFile(path.join(rootDir, 'views', 'admin-panel-products.html'))
})
router.get('/admin-orders', (req, res, next) =>{
  console.log('welcome to admin page - orders');
  res.sendFile(path.join(rootDir, 'views', 'admin-panel-orders.html'))
})
router.get('/admin-questions', (req, res, next) =>{
  console.log('welcome to admin page - questions');
  res.sendFile(path.join(rootDir, 'views', 'admin-panel-questions.html'))


  
})

module.exports = router