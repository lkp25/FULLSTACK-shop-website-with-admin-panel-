const path = require('path');
const express = require('express');
const User = require('../../models/User-model')
const router = express.Router()

const rootDir = require('../../util/path')
const mongoDB = require('../../util/mongoDBconnect').getDB
const bcrypt = require('bcrypt')

require('dotenv').config()
const sendEmail = require('../../util/nodemailer')

const {check, validationResult} = require('express-validator/check')


router.post('/register', check('email').isEmail(), async (req, res, next) =>{
    const email = req.body.email
    const password = req.body.password
    const getMongoDB = mongoDB()

    const user = await getMongoDB.collection('users').findOne({email: email}).
    then((user)=>{
        //user already exists?
        if(user){
            
           return res.redirect('/register')
        }
        return bcrypt
        .hash(password, 12)
        .then((hashedPassword)=>{
            const newUser =  new User({
                email: email,
                password: hashedPassword
            })
            console.log(newUser)
            console.log('newUser created')
            
            const db = mongoDB();
            db.collection('users').insertOne(newUser)

            
        })         
        .then(()=>{
             res.redirect('/login')
             sendEmail(email, `Shop account registered ${email}`, "welcome to store")
        })
         
    }).catch(err => console.log(err))      
    
 
})

router.get('/register', (req, res, next) =>{
  console.log('current logged user:' + req.session.user);
  res.sendFile(path.join(rootDir, 'views', 'register-new-acc.html'))
})
module.exports = router