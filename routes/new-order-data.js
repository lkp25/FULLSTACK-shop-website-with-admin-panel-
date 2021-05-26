const path = require('path');

const express = require('express');

const router = express.Router()

const rootDir = require('../util/path');
const { writeFile } = require('fs');

router.post('/save-order', (req, res, next) =>{
       
    //headers first!!
    res.header({"Content-Type": "application/json"})
    //echo back the request + send response message
    res.json({
        requestBody: req.body,
        responseMessage: 'your order was successfuly created'
    })
    //write new file for order to JSONdatabase 
    writeFile(`jsonDatabase/${req.body.surname}-${req.body.orderId}.json`, JSON.stringify(req.body), err =>  console.log(err))
})

module.exports = router