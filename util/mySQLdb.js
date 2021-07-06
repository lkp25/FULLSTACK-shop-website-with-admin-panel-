const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

module.exports = pool.promise()