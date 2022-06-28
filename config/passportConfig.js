const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports = passport => {
  passport.use(
    new LocalStrategy({
        usernameField: "email"
      },
      function(email, password, done) {
        User.findOne({ email }, function (err, user) {
          if (err) { return done(err); }
          if (!user) { return done(null, false); }
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }
            return done(null, user);
          });
        });
      }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
