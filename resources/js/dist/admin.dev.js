"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initAdmin = initAdmin;

var _axios = _interopRequireDefault(require("axios"));

var _moment = _interopRequireDefault(require("moment"));

var _noty = _interopRequireDefault(require("noty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function initAdmin(socket) {
  var orderTableBody = document.querySelector('#orderTableBody');
  var orders = [];
  var markup;

  _axios["default"].get('/admin/orders', {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  }).then(function (res) {
    orders = res.data;
    markup = generateMarkup(orders);
    orderTableBody.innerHTML = markup;
  })["catch"](function (err) {
    console.log(err);
  });

  function renderItems(items) {
    var parsedItems = Object.values(items);
    return parsedItems.map(function (menuItem) {
      return "\n                <p>".concat(menuItem.item.name, " - ").concat(menuItem.qty, " pcs </p>\n            ");
    }).join('');
  }

  function generateMarkup(orders) {
    return orders.map(function (order) {
      return "\n                <tr>\n                <td class=\"border px-4 py-2 text-green-900\">\n                    <p>".concat(order._id, "</p>\n                    <div>").concat(renderItems(order.items), "</div>\n                </td>\n                <td class=\"border px-4 py-2\">").concat(order.customerId.name, "</td>\n                <td class=\"border px-4 py-2\">").concat(order.address, "</td>\n                <td class=\"border px-4 py-2\">\n                    <div class=\"inline-block relative w-64\">\n                        <form action=\"/admin/order/status\" method=\"POST\">\n                            <input type=\"hidden\" name=\"orderId\" value=\"").concat(order._id, "\">\n                            <select name=\"status\" onchange=\"this.form.submit()\"\n                                class=\"block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline\">\n                                <option value=\"order_placed\"\n                                    ").concat(order.status === 'order_placed' ? 'selected' : '', ">\n                                    Placed</option>\n                                <option value=\"confirmed\" ").concat(order.status === 'confirmed' ? 'selected' : '', ">\n                                    Confirmed</option>\n                                <option value=\"prepared\" ").concat(order.status === 'prepared' ? 'selected' : '', ">\n                                    Prepared</option>\n                                <option value=\"delivered\" ").concat(order.status === 'delivered' ? 'selected' : '', ">\n                                    Delivered\n                                </option>\n                                <option value=\"completed\" ").concat(order.status === 'completed' ? 'selected' : '', ">\n                                    Completed\n                                </option>\n                            </select>\n                        </form>\n                        <div\n                            class=\"pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700\">\n                            <svg class=\"fill-current h-4 w-4\" xmlns=\"http://www.w3.org/2000/svg\"\n                                viewBox=\"0 0 20 20\">\n                                <path\n                                    d=\"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z\" />\n                            </svg>\n                        </div>\n                    </div>\n                </td>\n                <td class=\"border px-4 py-2\">\n                    ").concat((0, _moment["default"])(order.createdAt).format('hh:mm A'), "\n                </td>\n                <td class=\"border px-4 py-2\">\n                    ").concat(order.paymentStatus ? 'paid' : 'Not paid', "\n                </td>\n            </tr>\n        ");
    }).join('');
  } //Socket 


  socket.on('orderPlaced', function (order) {
    new _noty["default"]({
      type: 'success',
      timeout: 1000,
      text: 'New Order',
      progressBar: false
    }).show();
    orders.unshift(order);
    orderTableBody.innerHTML = '';
    orderTableBody.innerHTML = generateMarkup(orders);
  });
}
//# sourceMappingURL=admin.dev.js.map
