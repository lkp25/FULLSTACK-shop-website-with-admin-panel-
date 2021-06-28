const path = require('path');

const express = require('express');

const router = express.Router()

require('dotenv').config()

const mysql = require('mysql')
const sqlConnection = mysql.createConnection({
  host: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})
sqlConnection.connect(function(err) {
    if (err) throw err;
   
});


//save new customer question 
router.post('/new-customer-question', async (req, res, next) =>{
    console.log(req.body);

    
    sqlConnection.query(`INSERT INTO questions VALUES('${JSON.stringify(req.body)}')`, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });

    
})

module.exports = router