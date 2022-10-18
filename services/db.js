require('dotenv').config()

const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
    database: "todos",
});

conn.connect();

module.exports = conn;