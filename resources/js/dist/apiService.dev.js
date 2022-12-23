"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.placeOrder = placeOrder;

var _axios = _interopRequireDefault(require("axios"));

var _noty = _interopRequireDefault(require("noty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function placeOrder(formObject) {
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
}
//# sourceMappingURL=apiService.dev.js.map
