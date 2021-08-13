const express = require('express');
const path = require('path');
require('dotenv').config()
const rootDir = require('./util/path')
const app = express()

const flash = require('connect-flash')
const helmet = require('helmet')

//setup EJS as view engine
app.set('view engine', 'ejs');

//setup for managing sessions and storing them in mongoDB
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
    
})
//main middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded())
app.use(helmet())


app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store
}))
const csurf = require('csurf')
const csrfProtection = csurf({})
app.use(flash())

//MONGO & MONGOOSE
const {mongoConnect} = require('./util/mongoDBconnect')  
mongoConnect( ()=>{
    console.log('con');
})
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

//CORS middleware
// app.use((req,res,next)=>{
//     // res.setHeader("Access-Control-Allow-Origin", '*')
//     // res.setHeader("Access-Control-Allow-Methods", 'POST, GET, OPTIONS')
//     // res.setHeader("Access-Control-Allow-Headers", "Content-Type")
// })

////////ROUTES!!!
//all routes
const adminProductsRoutes = require('./routes/admin-products')
app.use(adminProductsRoutes)

//protection for the session
app.use(csrfProtection)
app.use((req, res, next)=>{
    res.locals.isAuthenticated = req.session.isLoggedIn,
    res.locals.csrfToken = req.csrfToken()
    next()
})

const publicRoutes = require('./routes/public')
app.use(publicRoutes)

const newOrderRoutes = require('./routes/new-order-data')
app.use(newOrderRoutes)

const registerRoutes = require('./routes/auth/register')
app.use(registerRoutes)

const passwordResetRoutes = require('./routes/auth/reset-password')
app.use(passwordResetRoutes)

const loginUserRoutes = require('./routes/auth/login')
app.use(loginUserRoutes)

const logoutRoutes = require('./routes/auth/logout')
app.use(logoutRoutes)

const adminMainRoutes = require('./routes/admin-main')
app.use(adminMainRoutes)

const adminQuestionsRoutes = require('./routes/admin-questions')
app.use(adminQuestionsRoutes)



const adminOrdersRoutes = require('./routes/admin-orders')
app.use(adminOrdersRoutes)



//404 page
app.use('/', (req, res, next) =>{
    console.log('no such address');
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})

//SPECIAL error handling middleware:::
app.use((error, req,res, next=>{
    res.status(error.httpStatusCode).render(path.join(rootDir, 'views', 'register-new-acc.ejs'),{
        errorMessage: 'internal server error'
    })
}))

//start server
app.listen(5000)
    
