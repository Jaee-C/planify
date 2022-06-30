/**
 * Basic operations to handle the test database
 */

const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Connect to the test database
 */
module.exports.connect = async () => {
  await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
}

/**
 * Drop database, close the connection
 */
module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
}

/**
 * Remove all the data for all db collections
 */
module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}
