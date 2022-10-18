const mysql = require('mysql');
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "iwjlx4bn",
    database: "todos",
});

conn.connect();

module.exports = conn;