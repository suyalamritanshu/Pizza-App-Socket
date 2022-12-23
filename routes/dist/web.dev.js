"use strict";

var authController = require('../app/http/controllers/authController');

var cartController = require('../app/http/controllers/customers/cartController');

var orderController = require('../app/http/controllers/customers/orderController');

var homeController = require('../app/http/controllers/homeController');

var guest = require('../app/http/middlewares/guest');

var auth1 = require('../app/http/middlewares/auth');

var admin = require('../app/http/middlewares/admin');

var adminOrderController = require('../app/http/controllers/admin/orderController');

var statusController = require('../app/http/controllers/admin/statusController');

function initRoutes(app) {
  var auth = authController();
  var home = homeController();
  app.get('/', home.index);
  app.get('/login', guest, auth.login);
  app.post('/login', auth.postLogin);
  app.get('/register', guest, auth.register);
  app.post('/register', auth.postRegister);
  app.post('/logout', auth.logout);
  app.get('/cart', cartController().index);
  app.post('/update-cart', cartController().update); //Customer Routes

  app.post('/orders', orderController().store);
  app.get('/customer/orders', auth1, orderController().index);
  app.get('/customer/orders/:id', auth1, orderController().show); // Admin routes

  app.get('/admin/orders', admin, adminOrderController().index);
  app.post('/admin/order/status', admin, statusController().update);
}

module.exports = initRoutes;
//# sourceMappingURL=web.dev.js.map
