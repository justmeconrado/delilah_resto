var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "delilahrestoConrado",
});

module.exports = connection;
