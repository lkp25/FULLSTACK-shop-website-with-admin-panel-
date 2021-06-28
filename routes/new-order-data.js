const path = require('path');

const express = require('express');

const router = express.Router()

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

router.post('/save-order', async (req, res, next) =>{
       
    //headers first!!
    // res.header({"Content-Type": "application/json"})
    const requestBody = await req.body
    
    //echo back the request + send response message
    res.json({
        requestBody: req.body,
        responseMessage: 'your order was successfuly created'
    })
    //save order in the database
    sqlConnection.query(`INSERT INTO orders(orderData) VALUES('${JSON.stringify(requestBody)}')`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
    
    //write new file for order to JSONdatabase 
    // writeFile(`jsonDatabase/${req.body.surname}-${req.body.orderId}.json`, JSON.stringify(req.body), err =>  console.log(err))
})


module.exports = router