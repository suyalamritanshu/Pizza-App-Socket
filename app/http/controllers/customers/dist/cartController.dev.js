"use strict";

var _require = require("express"),
    json = _require.json;

function cartController() {
  return {
    index: function index(req, res) {
      res.render('customers/cart');
    },
    update: function update(req, res) {
      // let cart = {
      //     items: {
      //         pizzaId: { item: pizzaObject, qty:0 },
      //         pizzaId: { item: pizzaObject, qty:0 },
      //         pizzaId: { item: pizzaObject, qty:0 },
      //     },
      //     totalQty: 0,
      //     totalPrice: 0
      // }
      // for the first time creating cart and adding basic object structure
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0
        };
      }

      var cart = req.session.cart; // Check if item does not exist in cart 

      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1
        };
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }

      return res.json({
        totalQty: req.session.cart.totalQty
      });
    }
  };
}

module.exports = cartController;
//# sourceMappingURL=cartController.dev.js.map
