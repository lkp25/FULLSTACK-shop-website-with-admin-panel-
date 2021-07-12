const path = require('path');
const express = require('express');

const router = express.Router()

const rootDir = require('../../util/path')
require('dotenv').config()

router.get('/login', (req, res, next) =>{
  res.sendFile(path.join(rootDir, 'views', 'login.html'))
  console.log(req.session.isLoggedIn);
})

router.post('/login', (req, res, next) =>{
  req.session.isLoggedIn = true
  req.session.save(()=>{

    res.redirect('/index')
  })
 
})


module.exports = router