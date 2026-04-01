require("dotenv").config(); // load env variables
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "todo_list_db"
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to MySQL database successfully");
});

module.exports = connection;