const path = require('path');

const express = require('express');

const router = express.Router()
const db = require('../util/mySQLdb')

require('dotenv').config()


router.post('/save-order', async (req, res, next) =>{
           
    const requestBody = await req.body
    db.execute(`INSERT INTO orders(orderData) VALUES('${JSON.stringify(requestBody)}')`)
    .then(([recordsArray, fieldsDataArray] )=>{
      res.send({
        requestBody: req.body,
        responseMessage: 'your order was successfuly created'
    })
    })
    .catch((error)=>{console.log(error);}) 
    
})


module.exports = router