const mongoose = require("mongoose");

const User = mongoose.model("users", {
  email: String,
  password: String,
  role: String,
});

module.exports = User;