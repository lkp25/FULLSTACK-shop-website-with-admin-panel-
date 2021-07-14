const path = require('path');
const fs = require('fs');

const express = require('express');

const router = express.Router()

const rootDir = require('../util/path');
const { writeFile } = require('fs');

require('dotenv').config()

const isLoggedInCheck = require('../middleware/is-logged-in')


//serve HTML:
router.get('/admin-products', isLoggedInCheck, (req, res, next) =>{
  console.log('welcome to admin page - products');
  console.log(req.admin)
  res.sendFile(path.join(rootDir, 'views', 'admin-panel-products.html'))
})
router.get('/admin-orders', isLoggedInCheck, (req, res, next) =>{
  console.log('welcome to admin page - orders');
  res.sendFile(path.join(rootDir, 'views', 'admin-panel-orders.html'))
})
router.get('/admin-questions', isLoggedInCheck, (req, res, next) =>{
  console.log('welcome to admin page - questions');
  
  res.sendFile(path.join(rootDir, 'views', 'admin-panel-questions.html'))


  
})

module.exports = router

function isAdmin(req, res, next){
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
  if (req.query.admin === 'true') {
    req.admin = true
    next()
  } else {
    res.send('ERROR: You must be an admin')
  }

}
