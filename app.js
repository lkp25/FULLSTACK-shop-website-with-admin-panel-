const express = require('express');
const path = require('path');

const app = express()

app.use(express.static(path.join(__dirname, 'public')))

const rootDir = require('./util/path')
const adminRoutes = require('./routes/admin')
app.use(adminRoutes)

app.use('/', (req, res, next) =>{
    console.log('hey');
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})


app.listen(5000)