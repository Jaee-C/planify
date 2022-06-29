const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

// Load environment variables
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const api = require("./routes/");

const app = express();

// Connect to db
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to MongoDB at " + process.env.DB_URI))
  .catch(err => console.log(err));

// Initialise passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passportConfig")(passport);

// Routes
app.use("/api", api);

const port = process.env.PORT || 8000;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = server;
