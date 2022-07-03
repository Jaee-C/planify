const mysql = require("mysql2");

// Load environment variables
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// Connect to db
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "issue-tracker",
});

module.exports = connection;
