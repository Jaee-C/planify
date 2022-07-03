const express = require("express");
const cookieParser = require('cookie-parser')
const session = require("express-session");
const FileStore = require('session-file-store')(session);
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
  store: new FileStore,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
}));
app.use(cookieParser(process.env.USER_SECRET));

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
