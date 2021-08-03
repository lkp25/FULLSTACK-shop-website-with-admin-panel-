const path = require('path');
const express = require('express');

const router = express.Router()

const rootDir = require('../util/path')
const Template = require('../util/individual-product-template')





router.get('/index', (req, res, next) =>{
    console.log('main page hit!');
    
    res.render(path.join(rootDir, 'views', 'index.ejs'), {
        isAuthenticated: req.session.isLoggedIn
    })
})

router.get('/shop', (req, res, next) =>{
    console.log('shop page hit!');
    res.render(path.join(rootDir, 'views', 'shop.ejs'), {
        isAuthenticated: req.session.isLoggedIn
    })
})
router.get('/contact', (req, res, next) =>{
    console.log('contact page hit!');
    res.render(path.join(rootDir, 'views', 'contact.ejs'), {
        isAuthenticated: req.session.isLoggedIn
    })
})





//display products from JSON DB
router.get('/display-products', (req, res, next) =>{
    console.log('displaying products...');
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


