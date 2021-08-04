const path = require('path');
const express = require('express');

const router = express.Router()

const rootDir = require('../../util/path')
require('dotenv').config()

const User = require('../../models/User-model')
const mongoDB = require('../../util/mongoDBconnect').getDB
const bcrypt = require('bcrypt')


router.get('/login', (req, res, next) =>{
  //flash error handling - if no errors - it will be empty array (truthy so we need to set it to null)
  let message = req.flash('error')
  if(message.length > 0){
    message = message[0]
  }else{
    message = null
  }

  res.render(path.join(rootDir, 'views', 'login.ejs'),{
    //render options for EJS:
    errorMessage: message,
  })
  console.log(req.flash('error'))
  console.log(req.session.isLoggedIn);
  // console.log(req.get("Cookie").split(';')[1].trim.split('=')[1])
})

router.post('/login', async (req, res, next) =>{
  const email = req.body.email
  const password = req.body.password
  const getMongoDB = mongoDB()

  const user = await getMongoDB.collection('users').findOne({email: email})
  .then((user)=>{
    if(!user){
      //display flash error message if no such user exist
      req.flash('error', "invalid email or password")
      console.log('user doesnt exist!')
      return res.redirect('/login')
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
      //invalid pass
      res.redirect('/login')
      console.log('wrong password')
      
    })
    .catch(err => {
      console.log(err)
      res.redirect('/login')

    })
  })  
 
})


module.exports = router