const path = require('path');
const db = require('../util/mySQLdb')

const express = require('express');
const router = express.Router()
require('dotenv').config()

// const mysql = require('mysql')
// const sqlConnection = mysql.createConnection({
//   host: process.env.PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// })
// sqlConnection.connect(function(err) {
//     if (err) throw err;
   
// });


//save new customer question 
router.post('/new-customer-question', async (req, res, next) =>{
  db.execute(`INSERT INTO questions(value) VALUES('${JSON.stringify(req.body)}')`)
  .then(([recordsArray, fieldsDataArray] )=>{
    
    res.send(recordsArray)
  })
  .catch((error)=>{console.log(error);})
    
    // sqlConnection.query(`INSERT INTO questions(value) VALUES('${JSON.stringify(req.body)}')`, function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    //     res.send(result)
    //   });

    
})
//admin panel delete question
router.get('/delete-question', async (req, res, next) =>{
  console.log(req.query);

  sqlConnection.query(`DELETE FROM questions WHERE id=${req.query.id}`, function (err, result, fields) {
    if (err) throw err;
    console.log('HERE ARE ALL ORDERS FROM DB:' , result);
    res.send(req.query)
  });

})

//for admin panel display all questions:
// router.get('/get-all-questions', (req, res, next) =>{
    
//   sqlConnection.query("SELECT * FROM questions", function (err, result, fields) {
//     if (err) throw err;
//     console.log('HERE ARE ALL ORDERS FROM DB:' , result);
//     res.send(result)
//   });
// })



//for admin panel display all questions:
router.get('/get-all-questions', (req, res, next) =>{
  db.execute('SELECT * FROM questions')
    .then(([recordsArray, fieldsDataArray] )=>{
      
      res.send(recordsArray)
    })
    .catch((error)=>{console.log(error);})
})


module.exports = router

