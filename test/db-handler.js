/**
 * Basic operations to handle the test database
 */

const mongoose = require("mongoose");
require("dotenv").config();
const sequelize = require("../config/db");

/**
 * Connect to the test database
 */
module.exports.connect = async () => {
  await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
}

/**
 * Remove all the data for all db collections
 */
module.exports.clearDatabase = async () => {
  sequelize.query('show tables').then(function(rows) {
    for (let i = 0; i < rows[0].length; i++) {
      sequelize.query(`DELETE FROM ${rows[0][i]["Tables_in_"+process.env.DB_NAME]}`);
    }
  });
}
