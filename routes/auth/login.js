const path = require('path');
const express = require('express');

const router = express.Router()

const rootDir = require('../../util/path')
require('dotenv').config()

router.get('/login', (req, res, next) =>{
  console.log(req.get('Cookie').split(';')[1]);
  res.sendFile(path.join(rootDir, 'views', 'login.html'))
})

router.post('/login', (req, res, next) =>{
 res.setHeader('Set-Cookie', 'loggedIn=true')
  res.redirect('/index')
})


router.get('/register', (req, res, next) =>{
  console.log('hey');
  res.sendFile(path.join(rootDir, 'views', 'register-new-acc.html'))
})
module.exports = router