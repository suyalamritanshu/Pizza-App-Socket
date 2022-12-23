"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _noty = _interopRequireDefault(require("noty"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function initStripe() {
  var paymentType = document.querySelector('#paymentType'); // Ajax call

  var paymentForm = document.querySelector('#payment-form');

  if (paymentForm) {
    paymentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(paymentForm);
      var formObject = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = formData.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          formObject[key] = value;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      _axios["default"].post('/orders', formObject).then(function (res) {
        new _noty["default"]({
          type: 'success',
          timeout: 1000,
          text: res.data.message,
          progressBar: false
        }).show();
        setTimeout(function () {
          window.location.href = '/customer/orders';
        }, 1000);
      })["catch"](function (err) {
        new _noty["default"]({
          type: 'success',
          timeout: 1000,
          text: err.res.data.message,
          progressBar: false
        }).show();
      });
    });
  }
}
//# sourceMappingURL=stripe.dev.js.map
