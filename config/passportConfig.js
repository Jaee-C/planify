const LocalStrategy = require("passport-local").Strategy;
const { models } = require("../config/db");
const bcrypt = require("bcryptjs");
const {
  ERROR_USER_NOT_FOUND,
  ERROR_INVALID_PASSWORD,
  RUNTIME_ERROR,
} = require("../utils/constants");

/**
 * Validate password
 * @param {*} password user entered password
 * @param {*} correct password from database
 * @returns
 */
const validPassword = async (password, correct) => {
  return await bcrypt.compare(password, correct);
};

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      function (email, password, done) {
        models.User.findOne({ where: { email } })
          .then(async (user) => {

            // User not found in database
            if (!user) {
              return done(null, false, {
                response: ERROR_USER_NOT_FOUND,
              });
            }

            // Invalid password
            if (!(await validPassword(password, user.password))) {
              return done(null, false, { response: ERROR_INVALID_PASSWORD });
            }
            return done(null, user.get());
          })
          .catch((e) => {
            return done(null, false, {
              response: RUNTIME_ERROR,
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findOne({ where: { id } }).then((user) => {
      if (user) {
        delete user.dataValues.password;
      }
      console.log(user.dataValues)
      done(null, user.dataValues);
    });
  });
};
