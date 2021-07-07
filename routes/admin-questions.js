const path = require('path');
const db = require('../util/mySQLdb')
const mongoDB = require('../util/mongoDBconnect').getDB

const express = require('express');
const router = express.Router()
require('dotenv').config()


//save new customer question 
router.post('/new-customer-question', async (req, res, next) =>{
  db.execute(`INSERT INTO questions(value) VALUES('${JSON.stringify(req.body)}')`)
  .then(([recordsArray, fieldsDataArray] )=>{
    
    res.send(recordsArray)
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
router.get('/get-all-questions', (req, res, next) =>{
  db.execute('SELECT * FROM questions')
    .then(([recordsArray, fieldsDataArray] )=>{
      
      res.send(recordsArray)
    })
    .catch((error)=>{console.log(error);})
})


module.exports = router

