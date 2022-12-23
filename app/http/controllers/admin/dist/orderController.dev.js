"use strict";

var order = require("../../../models/order");

var Order = require('../../../models/order');

function orderController() {
  return {
    index: function index(req, res) {
      order.find({
        status: {
          $ne: 'completed'
        }
      }, null, {
        sort: {
          'createdAt': -1
        }
      }).populate('customerId', '-password').exec(function (err, orders) {
        if (req.xhr) {
          return res.json(orders);
        } else {
          return res.render('admin/orders');
        }
      });
    }
  };
}

module.exports = orderController;
//# sourceMappingURL=orderController.dev.js.map
