const express = require('express');
const path = require('path');
require('dotenv').config()
const rootDir = require('./util/path')
const app = express()


//setup for managing sessions and storing them in mongoDB
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const store = new MongoDBStore({
    uri: 'mongodb+srv://123:NabugsJzLbHcZJqI@cluster0.cc96k.mongodb.net/data?retryWrites=true&w=majority?authSource=admin',
    collection: 'sessions'

})
app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store
}))



//main middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded())



//MONGO & MONGOOSE
const {mongoConnect} = require('./util/mongoDBconnect')  
mongoConnect( ()=>{
    console.log('con');
})
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://123:NabugsJzLbHcZJqI@cluster0.cc96k.mongodb.net/data?retryWrites=true&w=majority?authSource=admin')


//all routes
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

const registerRoutes = require('./routes/auth/register')
app.use(registerRoutes)

const loginUserRoutes = require('./routes/auth/login')
app.use(loginUserRoutes)

const logoutRoutes = require('./routes/auth/logout')
app.use(logoutRoutes)


//404 page
app.use('/', (req, res, next) =>{
    console.log('no such address');
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})

//start server
app.listen(5000)