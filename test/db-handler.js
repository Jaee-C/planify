/**
 * Basic operations to handle the test database
 */

require("dotenv").config();
const { models } = require("../config/db");

/**
 * Remove all the data for all db collections
 */
module.exports.clearDatabase = async () => {
  await models.User.destroy({ where: {} });
  
}
