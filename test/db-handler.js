/**
 * Basic operations to handle the test database
 */

require("dotenv").config();
const User = require("../models/user");

/**
 * Remove all the data for all db collections
 */
module.exports.clearDatabase = async () => {
  await User.destroy({ where: {} });
}
