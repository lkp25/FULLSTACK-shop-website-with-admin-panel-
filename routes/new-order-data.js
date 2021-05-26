const path = require('path');
const express = require('express');

const router = express.Router()

const rootDir = require('../util/path')

router.post('/save-order', (req, res, next) =>{
    
    console.log(req.body);
    //headers first!!
    res.header({"Content-Type": "application/json"})
    //echo the request
    res.json({requestBody: req.body})
})

module.exports = router