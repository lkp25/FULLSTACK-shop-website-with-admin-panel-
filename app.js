const express = require('express');
const path = require('path');
const session = require('express-session')
require('dotenv').config()

const app = express()

app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
}))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())

const rootDir = require('./util/path')

const {mongoConnect} = require('./util/mongoDBconnect')
  
mongoConnect( ()=>{
    console.log('con');
})

const publicRoutes = require('./routes/public')
app.use(publicRoutes)

const newOrderRoutes = require('./routes/new-order-data')
app.use(newOrderRoutes)

const adminMainRoutes = require('./routes/admin-main')
app.use(adminMainRoutes)

const adminQuestionsRoutes = require('./routes/admin-questions')
app.use(adminQuestionsRoutes)

const adminProductsRoutes = require('./routes/admin-products')
app.use(adminProductsRoutes)

const adminOrdersRoutes = require('./routes/admin-orders')
app.use(adminOrdersRoutes)

const loginUserRoutes = require('./routes/auth/login')
app.use(loginUserRoutes)

// app.use(  (req, res, next) =>{
//     req.user = 'admin'
//     next()
// })

app.use('/', (req, res, next) =>{
    console.log('no such address');
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})


app.listen(5000)