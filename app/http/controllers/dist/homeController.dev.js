"use strict";

function homeController() {
  return {
    index: function index(req, res) {
      res.render('home');
    }
  };
}

module.exports = homeController;
//# sourceMappingURL=homeController.dev.js.map
