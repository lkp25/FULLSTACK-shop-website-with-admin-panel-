const path = require('path');
const express = require('express');
const User = require('../../models/User-model')
const router = express.Router()

const rootDir = require('../../util/path')
const mongoDB = require('../../util/mongoDBconnect').getDB
const bcrypt = require('bcrypt')

require('dotenv').config()
const sendEmail = require('../../util/nodemailer')

//validation:
const {check, validationResult, body} = require('express-validator');



router.post('/register', 
[
    check(['email','confirm-email']).isEmail().withMessage('invalid email')
    .custom((value, {req})=>{
        if(value === "lll@o2.pl"){
            throw new Error('this email is forbidden')
        }
        //wazne ze musi zwrocic tru po przejsciu testow
        return true
    }),
    body('password', "the password is must be 5-40alphanumeric chars").isLength({min: 5, max: 40}).isAlphanumeric(),
    body('confirm-email').custom((value,{req})=>{
        if(value !== req.body.email){
            throw new Error('emails must match!')
        }
        return true
    })
],
    async (req, res, next) =>{
        const email = req.body.email
        const password = req.body.password
        const confirmEmail = req.body.confirmEmail
        //express validation errors
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            console.log(errors.array())
            return res.status(422).render(path.join(rootDir, 'views', 'register-new-acc.ejs'),{
                validationError: errors.array()[0].msg,
                errorMessage: '',
                //for storing data user enetered iven if are invalid - display them back.
                oldInput:{email: email, password: password, confirmEmail: confirmEmail},
                //for extracting the param containing name of the error field to be used for conditional class addition in view.
                validationErrorsArray: errors.array()
            })
        }

        const getMongoDB = mongoDB()

        
        const user = await getMongoDB.collection('users').findOne({email: email}).
        then((user)=>{
            //user already exists?
            if(user){
                //flash error message:
                req.flash('errorMail', "user with this email exists already.")
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
                req.flash('successRegister', "your account was successfully created")
                res.redirect('/login')
                sendEmail(email, `Shop account registered ${email}`, "welcome to store")
            })
            
        }).catch(err => {
            const error = new Error (err)
            error.htppStatusCode = 500
            return next(error)
        })      
    
 
})

router.get('/register', (req, res, next) =>{
  console.log('current logged user:' + req.session.user);
  res.render(path.join(rootDir, 'views', 'register-new-acc.ejs'),{
      errorMessage: req.flash('errorMail'),
      //for first load there is no old user input - pass empty strings
      oldInput:{email: 'email', password:'dfdsfdsfdsf', confirmEmail: 'confirm-email'},
      validationErrorsArray: [],
      validationError: ''
  })
})
module.exports = router