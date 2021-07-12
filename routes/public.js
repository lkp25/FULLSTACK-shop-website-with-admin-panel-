const path = require('path');
const express = require('express');

const router = express.Router()

const rootDir = require('../util/path')
const Template = require('../util/individual-product-template')

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
router.get('/login', (req, res, next) =>{
    console.log('hey');
    res.sendFile(path.join(rootDir, 'views', 'login.html'))
})



//display products from JSON DB
router.get('/display-products', (req, res, next) =>{
    console.log('hey');
    res.sendFile(path.join(rootDir, 'public/products-json', 'products.json'))
})


//display individual product page
router.get('/display-products/:id', (req, res, next) =>{       
    const prodId = req.params.id    
    const templateToSend = new Template(prodId)
    templateToSend.getIndividualProductData()
    res.setHeader('content-type', 'text/html')
    res.send(templateToSend.render())    
})

module.exports = router