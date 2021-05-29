const path = require('path');
const express = require('express');

const router = express.Router()

const rootDir = require('../util/path')

router.get('/index', (req, res, next) =>{
    console.log('hey');
    res.sendFile(path.join(rootDir, 'views', 'index.html'))
})

router.get('/shop', (req, res, next) =>{
    console.log('hey');
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})
router.get('/contact', (req, res, next) =>{
    console.log('hey');
    res.sendFile(path.join(rootDir, 'views', 'contact.html'))
})

//display products from JSON DB
router.get('/display-products', (req, res, next) =>{
    console.log('hey');
    res.sendFile(path.join(rootDir, 'public/products-json', 'products.json'))
})

module.exports = router