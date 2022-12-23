const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const homeController = require('../app/http/controllers/homeController')
const  guest = require('../app/http/middlewares/guest')
const  auth1 = require('../app/http/middlewares/auth')
const  admin = require('../app/http/middlewares/admin')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')

function initRoutes(app){

    let auth = authController()
    let home = homeController()

    app.get('/', home.index)
    
    app.get('/login', guest, auth.login)
    app.post('/login', auth.postLogin)
    
    app.get('/register', guest, auth.register);


    app.post('/register', auth.postRegister)

    app.post('/logout', auth.logout)



    app.get ('/cart', cartController().index)
    app.post('/update-cart', cartController().update)

    

    //Customer Routes

    app.post('/orders', orderController().store)
    app.get('/customer/orders', auth1, orderController().index)
    app.get('/customer/orders/:id', auth1, orderController().show)


    

    // Admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)



}


module.exports =  initRoutes