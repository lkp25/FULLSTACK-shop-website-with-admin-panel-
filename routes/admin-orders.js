const path = require('path');
const fs = require('fs');
const db = require('../util/mySQLdb')

const express = require('express');

const router = express.Router()

const rootDir = require('../util/path');
const { writeFile } = require('fs');

require('dotenv').config()
const sendEmail = require('../util/nodemailer')
////////ROUTES FROM ORDERS TAB////////
//admin route for getting all orders
router.get('/getorders', (req, res, next) =>{
  db.execute("SELECT * FROM orders")
  .then(([recordsArray] )=>{
    
    res.send(recordsArray)
  })
  .catch((error)=>{console.log(error);})   
    
})
  
  //update single order
  router.post('/update-order-status',  (req, res, next) =>{    
    
    const requestBody =  req.body    
    //send email to client with shipping confirmation
    if(requestBody.orderData.sent){
      sendEmail(requestBody.orderData.email, 
        `Order ${requestBody.orderData.orderId} was shipped`, 
        "order shipped",
        `
        <h1>${requestBody.orderData.orderId} was shipped!</h1>
        <p>Thank you for your trust. We hope you'll love our products!</p>
        `)

    }
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