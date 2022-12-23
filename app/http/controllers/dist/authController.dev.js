"use strict";

var _require = require("express"),
    request = _require.request;

var passport = require('passport');

var User = require('../../models/user');

var bcrypt = require('bcrypt');

function authController() {
  var _getRedirectUrl = function _getRedirectUrl(req) {
    return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders';
  };

  return {
    login: function login(req, res) {
      res.render('auth/login');
    },
    postLogin: function postLogin(req, res, next) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password; //Validate request

      if (!email || !password) {
        req.flash('error', 'All fields are required');
        return res.redirect('/login');
      }

      passport.authenticate('local', function (err, user, info) {
        if (err) {
          req.flash('error', info.message);
          return next(err);
        }

        if (!user) {
          req.flash('error', info.message);
          return res.redirect('/login');
        }

        req.logIn(user, function (err) {
          if (err) {
            req.flash('error', info.message);
            return next(err);
          }

          return res.redirect(_getRedirectUrl(req));
        });
      })(req, res, next);
    },
    register: function register(req, res) {
      res.render('auth/register');
    },
    postRegister: function postRegister(req, res) {
      var _req$body2, name, email, password, hashedPassword, user;

      return regeneratorRuntime.async(function postRegister$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password; //Validate request

              if (!(!name || !email || !password)) {
                _context.next = 6;
                break;
              }

              req.flash('error', 'All fields are required');
              req.flash('name', name);
              req.flash('email', email);
              return _context.abrupt("return", res.redirect('/register'));

            case 6:
              // Check if email exists 
              User.exists({
                email: email
              }, function (err, result) {
                if (result) {
                  req.flash('error', 'Email already taken');
                  req.flash('name', name);
                  req.flash('email', email);
                  return res.redirect('/register');
                }
              }); //Hash Password

              _context.next = 9;
              return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

            case 9:
              hashedPassword = _context.sent;
              // Create a user
              user = new User({
                name: name,
                email: email,
                password: hashedPassword
              });
              user.save().then(function (user) {
                //Login
                return res.redirect('/');
              })["catch"](function (err) {
                req.flash('error', 'Something went wrong');
                return res.redirect('/register');
              });

            case 12:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    logout: function logout(req, res) {
      req.logout();
      return res.redirect('/login');
    }
  };
}

module.exports = authController;
//# sourceMappingURL=authController.dev.js.map
