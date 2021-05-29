const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost:5000',
  user: 'root',
  password: 'pass',
  database: 'fakedata'
})





module.exports = connection