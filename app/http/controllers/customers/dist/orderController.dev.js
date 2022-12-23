"use strict";

var Order = require('../../../models/order');

var moment = require('moment');

var stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

function orderController() {
  return {
    store: function store(req, res) {
      //Validate request
      var _req$body = req.body,
          phone = _req$body.phone,
          address = _req$body.address,
          stripeToken = _req$body.stripeToken,
          paymentType = _req$body.paymentType;

      if (!phone || !address) {
        return res.status(422).json({
          message: 'Please fill all the fields.'
        });
      }

      var order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone: phone,
        address: address
      });
      order.save().then(function (result) {
        Order.populate(result, {
          path: 'customerId'
        }, function (err, placedOrder) {
          // req.flash('success', 'Order placed Successfully')
          //Stripe payment
          if (paymentType === 'card') {
            stripe.charges.create({
              amount: req.session.cart.totalPrice * 100,
              source: stripeToken,
              currency: 'inr',
              description: "Pizza order: ".concat(placedOrder._id)
            }).then(function () {
              placedOrder.paymentStatus = true;
              placedOrder.paymentType = paymentType;
              placedOrder.save().then(function (ord) {
                // Emit event 
                var eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('orderPlaced', ord);
                delete req.session.cart;
                return res.json({
                  message: 'Yay 😀😀 Payment successful, Order placed Successfully'
                });
              })["catch"](function (err) {
                console.log(err);
              });
            })["catch"](function (err) {
              delete req.session.cart;
              return res.json({
                message: 'Order placed but Payment failed, Dont worry you can also pay at delivery time'
              });
            });
          } else {
            delete req.session.cart;
            return res.json({
              message: 'Order placed, Pay at delivery time'
            });
          }
        });
      })["catch"](function (err) {
        return res.status(500).json({
          message: 'Something went wrong.'
        });
      });
    },
    index: function index(req, res) {
      var orders;
      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(Order.find({
                customerId: req.user._id
              }, null, {
                sort: {
                  'createdAt': -1
                }
              }));

            case 2:
              orders = _context.sent;
              res.header('Cache-Control', 'no-store');
              res.render('customers/orders', {
                orders: orders,
                moment: moment
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    show: function show(req, res) {
      var order;
      return regeneratorRuntime.async(function show$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(Order.findById(req.params.id));

            case 2:
              order = _context2.sent;

              if (!(req.user._id.toString() === order.customerId.toString())) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", res.render('customers/singleOrder', {
                order: order
              }));

            case 7:
              return _context2.abrupt("return", res.redirect('/'));

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  };
}

module.exports = orderController;
//# sourceMappingURL=orderController.dev.js.map
