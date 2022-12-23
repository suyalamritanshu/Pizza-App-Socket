"use strict";

var Order = require('../../../models/order');

function statusController() {
  return {
    update: function update(req, res) {
      Order.updateOne({
        _id: req.body.orderId
      }, {
        status: req.body.status
      }, function (err, data) {
        if (err) {
          return res.redirect('/admin/orders');
        } // Emit event 


        var eventEmitter = req.app.get('eventEmitter');
        eventEmitter.emit('orderUpdated', {
          id: req.body.orderId,
          status: req.body.status
        });
        return res.redirect('/admin/orders');
      });
    }
  };
}

module.exports = statusController;
//# sourceMappingURL=statusController.dev.js.map
