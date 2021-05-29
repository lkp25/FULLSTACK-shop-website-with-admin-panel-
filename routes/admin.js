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
    console.log('hey');
    res.sendFile(path.join(rootDir, 'views', 'admin-panel-products.html'))
})
router.get('/admin-orders', (req, res, next) =>{
    console.log('hey');
    res.sendFile(path.join(rootDir, 'views', 'admin-panel-orders.html'))
})


//admin route for getting all orders
router.get('/getorders', (req, res, next) =>{
    sqlConnection.query("SELECT * FROM orders", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.send(result)
    });
    
})



module.exports = router