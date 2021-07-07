const path = require('path');
const fs = require('fs');
const db = require('../util/mySQLdb')

const express = require('express');

const router = express.Router()

const rootDir = require('../util/path');
const { writeFile } = require('fs');

require('dotenv').config()

////////ROUTES FROM ORDERS TAB////////
//admin route for getting all orders
router.get('/getorders', (req, res, next) =>{
  db.execute("SELECT * FROM orders")
  .then(([recordsArray, fieldsDataArray] )=>{
    
    res.send(recordsArray)
  })
  .catch((error)=>{console.log(error);})   
    
})
  
  //update single order
  router.post('/update-order-status',  (req, res, next) =>{    
    
    const requestBody =  req.body    
    //echo back the request + send response messages
    
    //save order in the database
    db.execute(`UPDATE orders SET orderData='${JSON.stringify(requestBody.orderData) }' WHERE id=${requestBody.id}`)
    .then(([recordsArray, fieldsDataArray] )=>{
      res.json({
        requestBody: requestBody,
        responseMessage: 'order status updated!'
      })
      
    })
    .catch((error)=>{console.log(error);}) 
    
  })

  module.exports = router