const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bhanu@0208",
  database: "fdb_13_main",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }

  console.log("Connected to database");
});
module.exports = connection;
