"use strict";

var _axios = _interopRequireDefault(require("axios"));

var _noty = _interopRequireDefault(require("noty"));

var _admin = require("./admin");

var _moment = _interopRequireDefault(require("moment"));

var _stripe = require("./stripe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var addToCart = document.querySelectorAll('.add-to-cart');
var cartCounter = document.querySelector('#cartCounter');

function updateCart(pizza) {
  _axios["default"].post('/update-cart', pizza).then(function (res) {
    cartCounter.innerText = res.data.totalQty;
    new _noty["default"]({
      type: 'success',
      timeout: 1000,
      text: 'Item added to cart',
      progressBar: false,
      layout: 'topLeft'
    }).show();
  })["catch"](function (err) {
    new _noty["default"]({
      type: 'error',
      timeout: 1000,
      text: 'Something went wrong',
      progressBar: false
    }).show();
  });
}

addToCart.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    var pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
}); // Remove alert message after X seconds

var alertMsg = document.querySelector('#success-alert');

if (alertMsg) {
  setTimeout(function () {
    alertMsg.remove();
  }, 2000);
} // Change order status


var statuses = document.querySelectorAll('.status_line');
var hiddenInput = document.querySelector('#hiddenInput');
var order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);
var time = document.createElement('small');

function updateStatus(order) {
  statuses.forEach(function (status) {
    status.classList.remove('step-completed');
    status.classList.remove('current');
  });
  var stepCompleted = true;
  statuses.forEach(function (status) {
    var dataProp = status.dataset.status;

    if (stepCompleted) {
      status.classList.add('step-completed');
    }

    if (dataProp == order.status) {
      stepCompleted = false;
      time.innerText = (0, _moment["default"])(order.updatedAt).format('hh:mm A');
      status.appendChild(time);

      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add('C');
      }
    }
  });
}

updateStatus(order);
(0, _stripe.initStripe)(); //Socket

var socket = io();
(0, _admin.initAdmin)(socket); //join

if (order) {
  socket.emit('join', "order_".concat(order._id));
}

var adminAreaPath = window.location.pathname;

if (adminAreaPath.includes('admin')) {
  (0, _admin.initAdmin)(socket);
  socket.emit('join', 'adminRoom');
}

socket.on('orderUpdated', function (data) {
  var updatedOrder = _objectSpread({}, order);

  updatedOrder.updatedAt = (0, _moment["default"])().format();
  updatedOrder.status = data.status;
  updateStatus(updatedOrder);
  new _noty["default"]({
    type: 'success',
    timeout: 1000,
    text: 'Order updated',
    progressBar: false
  }).show();
});
//# sourceMappingURL=app.dev.js.map
