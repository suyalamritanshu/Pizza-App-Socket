"use strict";

require('dotenv').config();

var express = require('express');

var app = express();

var ejs = require('ejs');

var path = require('path');

var expressLayout = require('express-ejs-layouts');

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');

var session = require('express-session');

var flash = require('express-flash');

var MongoDbStore = require('connect-mongo');

var passport = require('passport');

var Emitter = require('events'); // Database connection


mongoose.connect(process.env.MONGO_CONNECTION_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});
var connection = mongoose.connection;
connection.once('open', function () {
  console.log('Database connected...');
})["catch"](function (err) {
  console.log('Connection failed...');
}); //Event emiiter

var eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter); // Session config

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: MongoDbStore.create({
    mongoUrl: process.env.MONGO_CONNECTION_URL
  }),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24
  } // 24 hour

})); //Passport config

var passportInit = require('./app/config/passport');

passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); //Assets

app.use(express["static"]('public'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json()); //Global middlewares

app.use(function (req, res, next) {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
}); //set template engine

app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

require('./routes/web')(app);

app.use(function (req, res) {
  res.status(404).render('errors/404');
}); // const server = app.listen(process.env.PORT || 3000, () => {
//     console.log(`Listening on port ${PORT1}`)
// })

var server = app.listen(port);
console.log("Server listening on port " + port); //Socket

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  socket.on('join', function (orderId) {
    socket.join(orderId);
  });
});
eventEmitter.on('orderUpdated', function (data) {
  io.to("order_".concat(data.id)).emit('orderUpdated', data);
});
eventEmitter.on('orderPlaced', function (data) {
  io.to('adminRoom').emit('orderPlaced', data);
});
//# sourceMappingURL=server.dev.js.map
