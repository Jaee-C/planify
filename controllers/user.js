const passport = require("passport");
const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const User = require("../models/user");

exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(constants.HTTP_UNAUTHORIZED).json({
        message: "Invalid credentials",
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect(constants.HTTP_OK, "/");
    });
  })(req, res, next);
};

exports.signup = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  let user;
  try {
    user = await User.create({ email, password, firstName, lastName });
  } catch (e) {
    if (e.name === 'SequelizeUniqueConstraintError') {
      return res.status(403).json({message: "User already exists"});
    } else {
      return res.status(500).json({message: "Something went wrong"});
    }
  }
  return res.redirect(constants.HTTP_OK, "/login");
};

exports.delete = async (req, res, next) => {
  const { email } = req.body;
  try {
    await User.destroy({where: {email}});
  } catch (e) {
    return res.status(500).json({message: "Something went wrong"});
  }
  return res.redirect(constants.HTTP_OK, "/login");
}
