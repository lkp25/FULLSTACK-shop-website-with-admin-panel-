const path = require('path');
const express = require('express');
const fs = require('fs');
const router = express.Router()

const rootDir = require('../util/path')
const Template = require('../util/individual-product-template')

const isLoggedIn = require('../middleware/is-logged-in')
const PDFDocument = require('pdfkit')


router.get('/index', (req, res, next) => {
    console.log('main page hit!');

    res.render(path.join(rootDir, 'views', 'index.ejs'), {
        isAuthenticated: req.session.isLoggedIn,
        loggedUser: req.session.user
    })
})

router.get('/shop', (req, res, next) => {
    console.log('shop page hit!');
    res.render(path.join(rootDir, 'views', 'shop.ejs'), {
        isAuthenticated: req.session.isLoggedIn,

    })
})
router.get('/contact', (req, res, next) => {
    console.log('contact page hit!');
    res.render(path.join(rootDir, 'views', 'contact.ejs'), {
        isAuthenticated: req.session.isLoggedIn,

    })
})





//display products from JSON DB
router.get('/display-products', (req, res, next) => {
    console.log('displaying products...');
    res.sendFile(path.join(rootDir, 'public/products-json', 'products.json'))
})


//display individual product page
router.get('/display-products/:id', (req, res, next) => {
    const prodId = req.params.id
    const templateToSend = new Template(prodId)
    templateToSend.getIndividualProductData()
    res.setHeader('content-type', 'text/html')
    res.send(templateToSend.render())
})

//test route for checking downloading files
router.get('/download/:orderId',  (req, res, next) => {

    const orderId = req.params.orderId
    const invoiceName = 'invoice' + orderId + '.pdf'
    const invoicePath = path.join(rootDir, 'public', 'dummyInvoices', invoiceName)
    //    //DATA PRELOAD APPROACH
    //    fs.readFile(invoicePath, (err, data)=>{
    //     if(err){
    //        return next(err)
    //     }
    //     res.setHeader(
    //         "Content-Type","application/pdf"        
    //     )
    //     res.setHeader(
    //         'Content-Disposition', 'attachment; filename=" '+ invoiceName +'"'    
    //     )
    //     res.send(data)
    //    })
    //STREAMING DATA APPROACH
    const pdfDoc = new PDFDocument()
    //pipe it to server - save new pdf file but also at the same time send it in response to client
    res.setHeader(
        "Content-Type", "application/pdf"
    )
    res.setHeader(
        'Content-Disposition', 'attachment; filename=" ' + invoiceName + '"'
    )
    pdfDoc.pipe(fs.createWriteStream(invoicePath))
    pdfDoc.pipe(res)
        //ITAK SOBIE MOZNA PISAC CALY PDF, DYNAMICZNIE DODAJAC WARTOSCI KTORE CHCEMY
    pdfDoc.fontSize(26).text('INVOICE')
    pdfDoc.fontSize(26).text('=============================')

    pdfDoc.end()

    // const file = fs.createReadStream(invoicePath)
    //pipe the filestream into response:
    // file.pipe(res)
})

module.exports = router


