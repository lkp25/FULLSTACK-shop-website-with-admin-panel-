const path = require('path');

const express = require('express');

const router = express.Router()
const db = require('../util/mySQLdb')

require('dotenv').config()
const sendEmail = require('../util/nodemailer')


router.post('/save-order', async (req, res, next) =>{
           
    const requestBody = await req.body
    db.execute(`INSERT INTO orders(orderData) VALUES('${JSON.stringify(requestBody)}')`)
    .then(([recordsArray, fieldsDataArray] )=>{
      res.send({
        requestBody: req.body,
        responseMessage: 'your order was successfuly created'
      })
      //order confirm email
      sendEmail(
        requestBody.email, 
        `Order successfully created ${requestBody.email}`, 
        `mail content:`,
        `<h1>Order ID: ${requestBody.orderId}</h1>
        <p>total to pay: $${requestBody.totalToPay / 100}</p>
        <div>
        <ul>
        ${requestBody.orderedItems.reduce((output, item) => {
          output += `<li>${item.name}, quantity: ${item.quantity}, price: $${item.price / 100}</li>`
          return output
        })}
          
        </ul>
        <p>Thank you for your order. You will be notified as soon as it is shipped.</p>
        
        </div>
        `)

    })
    .catch((error)=>{console.log(error);}) 
    
})


module.exports = router