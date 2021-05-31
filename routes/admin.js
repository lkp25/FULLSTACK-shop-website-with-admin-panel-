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
//serve HTML:
router.get('/admin-products', (req, res, next) =>{
    console.log('welcome to admin page - products');
    res.sendFile(path.join(rootDir, 'views', 'admin-panel-products.html'))
})
router.get('/admin-orders', (req, res, next) =>{
    console.log('welcome to admin page - orders');
    res.sendFile(path.join(rootDir, 'views', 'admin-panel-orders.html'))
})


//admin route for getting all orders
router.get('/getorders', (req, res, next) =>{
    sqlConnection.query("SELECT * FROM orders", function (err, result, fields) {
      if (err) throw err;
      console.log('HERE ARE ALL ORDERS FROM DB:' , result);
      res.send(result)
    });
    
})

//update single order
router.post('/update-order-status', async (req, res, next) =>{
       
  //headers first!!
  // res.header({"Content-Type": "application/json"})
  const requestBody = await req.body
  
  //echo back the request + send response message
  res.json({
      requestBody: req.body,
      responseMessage: 'order status updated!'
  })
  //save order in the database
  console.log(requestBody);
  sqlConnection.query(`UPDATE orders SET orderData='${JSON.stringify(requestBody.orderData) }' WHERE id=${requestBody.id}`, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result)
    });
  
  //write new file for order to JSONdatabase 
  // writeFile(`jsonDatabase/${req.body.surname}-${req.body.orderId}.json`, JSON.stringify(req.body), err =>  console.log(err))
})




module.exports = router