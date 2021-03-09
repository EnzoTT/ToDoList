const mysql = require('mysql2')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'22052000',
    database:'todolistmanager'
}) 

module.exports = connection;