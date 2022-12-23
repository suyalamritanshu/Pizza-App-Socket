"use strict";

var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

var bcrypt = require('bcrypt');

function init(passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function _callee(email, password, done) {
    var user;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(User.findOne({
              email: email
            }));

          case 2:
            user = _context.sent;

            if (user) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", done(null, false, {
              message: 'No user with this email'
            }));

          case 5:
            bcrypt.compare(password, user.password).then(function (match) {
              if (match) {
                return done(null, user, {
                  message: 'Logged in succesfully'
                });
              }

              return done(null, false, {
                message: 'Wrong username or password'
              });
            })["catch"](function (err) {
              return done(null, false, {
                message: 'Something went wrong'
              });
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  }));
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}

module.exports = init;
//# sourceMappingURL=passport.dev.js.map
