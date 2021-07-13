const path = require('path');
const express = require('express');
const User = require('../../models/User-model')
const router = express.Router()

const rootDir = require('../../util/path')
require('dotenv').config()
const mongoDB = require('../../util/mongoDBconnect').getDB

    



router.post('/register', async (req, res, next) =>{
    const email = req.body.email
    const password = req.body.password
    const getMongoDB = mongoDB()

    const user = await getMongoDB.collection('users').findOne({email: email}).
    then((user)=>{
        //user already exists?
        if(user){
           return res.redirect('/contact')
        }

         const newUser =  new User({
             email: email,
             password: password
         })
         console.log(newUser)
         console.log('newUser created')
         
         const db = mongoDB();
         db.collection('users').insertOne(newUser);
         res.redirect('/index')
         
    })      
    
 
})

router.get('/register', (req, res, next) =>{
  console.log('hey');
  res.sendFile(path.join(rootDir, 'views', 'register-new-acc.html'))
})
module.exports = router