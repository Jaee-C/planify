const passport = require("passport");
const constants = require("../utils/constants");
const { models } = require("../config/db");

// Login user
exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    // Error message
    if (!user) {
      if (info.response === constants.ERROR_USER_NOT_FOUND) {
        return res
          .status(constants.HTTP_BAD_REQUEST)
          .json({ message: "User not found" });
      } else if (info.response === constants.ERROR_INVALID_PASSWORD) {
        return res
          .status(constants.HTTP_UNAUTHORIZED)
          .json({ message: "Invalid password" });
      } else {
        return res
          .status(constants.HTTP_INTERNAL_SERVER_ERROR)
          .json({ message: "Something went wrong" });
      }
    }

    // Login success
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log(user);
      delete user.password;
      return res.status(constants.HTTP_OK).send(user);
    });
  })(req, res, next);
};

// User create new account
exports.signup = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  // Create new user
  try {
    await models.user.create({ email, password, firstName, lastName });
  } catch (e) {
    if (e.name === "SequelizeUniqueConstraintError") {
      // Email already used
      return res
        .status(constants.HTTP_BAD_REQUEST)
        .json({ message: "User already exists" });
    } else {
      // Something went wrong
      return res
        .status(constants.HTTP_INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  }
  return res.redirect(constants.HTTP_OK, "/login");
};

// Delete user account
exports.delete = async (req, res, next) => {
  const { email } = req.body;

  try {
    await models.user.destroy({ where: { email } });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  return res.redirect(constants.HTTP_OK, "/");
};
