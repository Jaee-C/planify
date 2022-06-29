const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();

const api = require("./routes/");

const app = express();

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Initialise passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passportConfig")(passport);

// Routes
app.use("/api", api);

const port = process.env.PORT || 4321;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = server;
