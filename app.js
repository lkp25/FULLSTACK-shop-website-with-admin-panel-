const express = require('express');
const path = require('path');

require('dotenv').config()

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())

const rootDir = require('./util/path')


  


const publicRoutes = require('./routes/public')
app.use(publicRoutes)

const newOrderRoutes = require('./routes/new-order-data')
app.use(newOrderRoutes)

const adminRoutes = require('./routes/admin')
app.use(adminRoutes)

const customerQuestionRoutes = require('./routes/customer-question')
app.use(customerQuestionRoutes)


app.use('/', (req, res, next) =>{
    console.log('no such address');
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})


app.listen(5000)