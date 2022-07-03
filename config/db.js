const mysql = require("mysql2");
const { Sequelize } = require("sequelize");

// Load environment variables
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// Connect to db
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: process.env.NODE_ENV === "test" ? false : console.log,
  }
);

module.exports = sequelize;
