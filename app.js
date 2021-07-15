const express = require('express');
const path = require('path');
require('dotenv').config()
const rootDir = require('./util/path')
const app = express()

const flash = require('connect-flash')
const helmet = require('helmet')
const nodemailer = require('nodemailer')
const handlebars = require('express-handlebars')



//setup for managing sessions and storing them in mongoDB
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
    
})
app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store
}))
const csurf = require('csurf')
const csrfProtection = csurf({})

//protection for the session
app.use(csrfProtection)

//main middlewares
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded())
app.use(helmet())
app.use(flash())



//MONGO & MONGOOSE
const {mongoConnect} = require('./util/mongoDBconnect')  
mongoConnect( ()=>{
    console.log('con');
})
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)


//all routes
const publicRoutes = require('./routes/public')
app.use(publicRoutes)

const newOrderRoutes = require('./routes/new-order-data')
app.use(newOrderRoutes)

const registerRoutes = require('./routes/auth/register')
app.use(registerRoutes)

const loginUserRoutes = require('./routes/auth/login')
app.use(loginUserRoutes)

const logoutRoutes = require('./routes/auth/logout')
app.use(logoutRoutes)

const adminMainRoutes = require('./routes/admin-main')
app.use(adminMainRoutes)

const adminQuestionsRoutes = require('./routes/admin-questions')
app.use(adminQuestionsRoutes)

const adminProductsRoutes = require('./routes/admin-products')
app.use(adminProductsRoutes)

const adminOrdersRoutes = require('./routes/admin-orders')
app.use(adminOrdersRoutes)



//404 page
app.use('/', (req, res, next) =>{
    console.log('no such address');
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})
async function main() {
 

let transporter = nodemailer.createTransport({
    host: "poczta.o2.pl",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MYMAIL_LOGIN, 
      pass: process.env.MYMAIL_PASS
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"LKPSHOP" <lkp25@o2.pl>', // sender address
    to: "lkp25@o2.pl", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);

//start server
app.listen(5000)