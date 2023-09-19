const mysql = require("mysql");

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "TechTutorials",
//   connectionLimit: 10,
// });

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  user: "sql12647442",
  password: "MukLQtCGmD",
  database: "sql12647442",
});

db.connect((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Connected to the database");
  }
});

// Close the connection when done
db.end();

module.exports = db;
