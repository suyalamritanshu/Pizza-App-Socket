"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var orderSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {
    type: Object,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  paymentType: {
    type: String,
    "default": 'COD'
  },
  paymentStatus: {
    type: Boolean,
    "default": false
  },
  status: {
    type: String,
    "default": 'order_placed'
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Order', orderSchema);
//# sourceMappingURL=order.dev.js.map
