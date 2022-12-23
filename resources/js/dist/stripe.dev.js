"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initStripe = initStripe;

var _stripeJs = require("@stripe/stripe-js");

var _apiService = require("./apiService");

var _CardWidget = require("./CardWidget");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function initStripe() {
  var stripe, card, paymentType, paymentForm;
  return regeneratorRuntime.async(function initStripe$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap((0, _stripeJs.loadStripe)('pk_test_51JNVh5SJGltiuqPoEEDjwoLb8Ny80cM6WB4noaHLtgXwlK5PjAQxKcGFYXM1JKALTezYPnxlSDOJ4A4EcwQaQ8ne0088XmW96T'));

        case 2:
          stripe = _context2.sent;
          card = null; // function mountWidget() {
          //         const elements = stripe.elements()
          //     let style = {
          //         base: {
          //         color: '#32325d',
          //         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          //         fontSmoothing: 'antialiased',
          //         fontSize: '16px',
          //         '::placeholder': {
          //             color: '#aab7c4'
          //         }
          //         },
          //         invalid: {
          //         color: '#fa755a',
          //         iconColor: '#fa755a'
          //         }
          //     };
          //     card = elements.create('card', { style, hidePostalCode: true })
          //     card.mount('#card-element')
          // }

          paymentType = document.querySelector('#paymentType');

          if (paymentType) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return");

        case 7:
          paymentType.addEventListener('change', function (e) {
            if (e.target.value === 'card') {
              // Display Widget
              card = new _CardWidget.CardWidget(stripe);
              card.mount();
            } else {
              card.destroy();
            }
          }); // Ajax call

          paymentForm = document.querySelector('#payment-form');

          if (paymentForm) {
            paymentForm.addEventListener('submit', function _callee(e) {
              var formData, formObject, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, value, token;

              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      e.preventDefault();
                      formData = new FormData(paymentForm);
                      formObject = {};
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      _context.prev = 6;

                      for (_iterator = formData.entries()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        _step$value = _slicedToArray(_step.value, 2), key = _step$value[0], value = _step$value[1];
                        formObject[key] = value;
                      }

                      _context.next = 14;
                      break;

                    case 10:
                      _context.prev = 10;
                      _context.t0 = _context["catch"](6);
                      _didIteratorError = true;
                      _iteratorError = _context.t0;

                    case 14:
                      _context.prev = 14;
                      _context.prev = 15;

                      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                        _iterator["return"]();
                      }

                    case 17:
                      _context.prev = 17;

                      if (!_didIteratorError) {
                        _context.next = 20;
                        break;
                      }

                      throw _iteratorError;

                    case 20:
                      return _context.finish(17);

                    case 21:
                      return _context.finish(14);

                    case 22:
                      if (card) {
                        _context.next = 25;
                        break;
                      }

                      // Ajax
                      (0, _apiService.placeOrder)(formObject);
                      return _context.abrupt("return");

                    case 25:
                      _context.next = 27;
                      return regeneratorRuntime.awrap(card.createToken());

                    case 27:
                      token = _context.sent;
                      formObject.stripeToken = token.id;
                      (0, _apiService.placeOrder)(formObject); // // Verify card
                      // stripe.createToken(card).then((result) => {
                      //     formObject.stripeToken = result.token.id;
                      //     placeOrder(formObject);
                      // }).catch((err) => {
                      //     console.log(err)
                      // })

                    case 30:
                    case "end":
                      return _context.stop();
                  }
                }
              }, null, null, [[6, 10, 14, 22], [15,, 17, 21]]);
            });
          }

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  });
}
//# sourceMappingURL=stripe.dev.js.map
