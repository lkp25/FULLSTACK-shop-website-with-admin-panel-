const path = require('path');
const express = require('express');

const router = express.Router()

const rootDir = require('../../util/path')
require('dotenv').config()

const User = require('../../models/User-model')
const mongoDB = require('../../util/mongoDBconnect').getDB
const bcrypt = require('bcrypt')


router.get('/login', (req, res, next) =>{
  res.sendFile(path.join(rootDir, 'views', 'login.html'))
  console.log(req.session.isLoggedIn);
})

router.post('/login', async (req, res, next) =>{
  const email = req.body.email
  const password = req.body.password
  const getMongoDB = mongoDB()

  const user = await getMongoDB.collection('users').findOne({email: email})
  .then((user)=>{
    if(!user){
      res.redirect('/login')
    }
    bcrypt.compare(password, user.password) //makes it to then block EVEN if passwords dont match!!
    .then((doMatch)=>{
      if(doMatch){
        req.session.isLoggedIn = true
        req.session.user = user
        //passwords match - return with saving session object
        return req.session.save(()=>{
          res.redirect('/index')

        })
      }
      res.redirect('/login')
      
    })
    .catch(err => {
      console.log(err)
      res.redirect('/login')

    })
  })  
 
})


module.exports = router