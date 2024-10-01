const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sathishsql',  
    database: 'smoketrees_db',
});

module.exports = db;
