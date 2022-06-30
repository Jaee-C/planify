const passport = require("passport");
const bcrypt = require("bcryptjs");
const ROLE_USER = require("../utils/constants").ROLE_USER;
const constants = require("../utils/constants");
const User = require("../models/user");

exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(constants.HTTP_UNAUTHORIZED).json({
        message: "Invalid credentials"
      });
    }
    req.logIn(user, err => {
      if (err) { return next(err); }
      return res.redirect(constants.HTTP_OK, "/");
    });
  })(req, res, next);
}

exports.signup = async (req, res, next) => {
  const { email, password } = req.body;
  const user = new User({ email, password, ROLE_USER });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  User.findOne({ email }, async (err, existingUser) => {
    if (err) {
      return res.status(constants.HTTP_INTERNAL_SERVER_ERROR).send("Error finding user in database.")
    }

    if (existingUser) {
      return res.status(constants.HTTP_BAD_REQUEST).send("User already exists.")
    }
    await user.save();
  
    return res.redirect(constants.HTTP_OK, "/login");
  });
}
