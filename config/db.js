const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");

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

const models = initModels(sequelize);

module.exports = { sequelize, models };
