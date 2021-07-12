const path = require('path');
const express = require('express');

const router = express.Router()

const rootDir = require('../../util/path')
require('dotenv').config()

router.post('/logout', (req, res, next) =>{
  req.session.isLoggedIn = false
  console.log('user logged out');
  res.redirect('/index')
})



module.exports = router