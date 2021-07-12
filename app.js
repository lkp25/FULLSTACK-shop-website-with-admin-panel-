const express = require('express');
const path = require('path');
require('dotenv').config()

const app = express()

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

const registerRoutes = require('./routes/auth/register')
app.use(registerRoutes)

const loginUserRoutes = require('./routes/auth/login')
app.use(loginUserRoutes)

const logoutRoutes = require('./routes/auth/logout')
app.use(logoutRoutes)



app.use('/', (req, res, next) =>{
    console.log('no such address');
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})


app.listen(5000)