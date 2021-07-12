const path = require('path');
const express = require('express');

const router = express.Router()

const rootDir = require('../../util/path')
require('dotenv').config()

router.post('/logout', (req, res, next) =>{
  req.session.destroy(()=>{
      
      res.redirect('/index')
      console.log('user logged out');
  })
})



module.exports = router