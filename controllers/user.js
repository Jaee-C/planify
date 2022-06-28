const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }
    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({
        message: "Login successful"
      });
    });
  })(req, res, next);
}