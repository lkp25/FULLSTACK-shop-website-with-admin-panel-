const path = require('path');
const db = require('../util/mySQLdb')
const mongoDB = require('../util/mongoDBconnect').getDB

const express = require('express');
const router = express.Router()
require('dotenv').config()
const sendEmail = require('../util/nodemailer')



//save new customer question 
router.post('/new-customer-question', async (req, res, next) =>{
  const requestBody = req.body
 const getMongoDB = mongoDB()        
  getMongoDB.collection('questions').insertOne(req.body)
  .then(result => console.log(result))
  .catch(err => console.log(err))
    

  db.execute(`INSERT INTO questions(value) VALUES('${JSON.stringify(req.body)}')`)
  .then(([recordsArray, fieldsDataArray] )=>{
    
    res.send(recordsArray)
    //send confirmation email
    const text = requestBody.text.replace(/xxxxx/g, `<br>`, )
    sendEmail(requestBody.email, 
      `Thank you for interest in our offer!`, 
      "order shipped",
      `
      <h1>We will reply as soon as possible to your email:</h1>
      <p>${text}</p>
      `)


  })
  .catch((error)=>{console.log(error);})   
    
})
//admin panel delete question
router.get('/delete-question', async (req, res, next) =>{
  console.log(req.query);

  db.execute(`DELETE FROM questions WHERE id=${req.query.id}`)
    .then(([recordsArray, fieldsDataArray] )=>{
      
      res.send(`${req.query} deleted`)
    })
    .catch((error)=>{console.log(error);})

  

})


//for admin panel display all questions:
router.get('/get-all-questions', async (req, res, next) =>{
  const getMongoDB = mongoDB()        
  const data = await getMongoDB.collection('questions').find().toArray().then()      
  res.send(data)
  
  // db.execute('SELECT * FROM questions')
  //   .then(([recordsArray, fieldsDataArray] )=>{
      

  //     res.send(recordsArray)
  //   })
  //   .catch((error)=>{console.log(error);})
})


module.exports = router

