const path = require('path');
const fs = require('fs');

const express = require('express');

const router = express.Router()

const rootDir = require('../util/path');
const { writeFile } = require('fs');

require('dotenv').config()

const mysql = require('mysql')
const sqlConnection = mysql.createConnection({
  host: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})
sqlConnection.connect(function(err) {
  if (err) throw err;
  
});


////////ROUTES FROM ORDERS TAB////////
//admin route for getting all orders
router.get('/getorders', (req, res, next) =>{
    sqlConnection.query("SELECT * FROM orders", function (err, result, fields) {
      if (err) throw err;
      console.log('HERE ARE ALL ORDERS FROM DB:' , result);
      res.send(result)
    });
    
  })
  
  //update single order
  router.post('/update-order-status',  (req, res, next) =>{
    
    //headers first!!
    // res.header({"Content-Type": "application/json"})
    const requestBody =  req.body
    
    //echo back the request + send response messages
    res.json({
      requestBody: req.body,
      responseMessage: 'order status updated!'
    })
    //save order in the database
    console.log(requestBody);
    sqlConnection.query(`UPDATE orders SET orderData='${JSON.stringify(requestBody.orderData) }' WHERE id=${requestBody.id}`, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      // res.send(result)
    });
    
    //write new file for order to JSONdatabase 
  })

  module.exports = router