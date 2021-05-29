const path = require('path');

const express = require('express');

const router = express.Router()



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

router.post('/save-order', async (req, res, next) =>{
       
    //headers first!!
    res.header({"Content-Type": "application/json"})
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