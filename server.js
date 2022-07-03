const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

// Load environment variables
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const api = require("./routes/");

const app = express();


app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport on every route
app.use(passport.initialize());

// Allow passport to use express-session
app.use(passport.session());

// Passport config
require("./config/passportConfig")(passport);

// Routes
app.use("/", api);

const port = process.env.PORT || 8000;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = server;
