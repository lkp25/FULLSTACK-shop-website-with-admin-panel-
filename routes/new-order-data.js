const path = require('path');

const express = require('express');

const router = express.Router()

const rootDir = require('../util/path');
const { writeFile } = require('fs');

const mysql = require('mysql')
const sqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'fakedata'
})
sqlConnection.connect(function(err) {
    if (err) throw err;
   
  });

router.post('/save-order', (req, res, next) =>{
       
    //headers first!!
    res.header({"Content-Type": "application/json"})
    //echo back the request + send response message
    res.json({
        requestBody: req.body,
        responseMessage: 'your order was successfuly created'
    })

    

    // sqlConnection.query('SELECT * FROM student', function (err, result, fields) {
    // if (err){
    //     console.log(err);
    // } 
    // console.log(result , fields)
    // })

    
    //write new file for order to JSONdatabase 
    // writeFile(`jsonDatabase/${req.body.surname}-${req.body.orderId}.json`, JSON.stringify(req.body), err =>  console.log(err))
})
router.get('/student', (req, res, next) =>{
    sqlConnection.query("SELECT * FROM student", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result)
    });
    console.log('hey');
    // res.sendFile(path.join(rootDir, 'views', 'index.html'))
})


module.exports = router
