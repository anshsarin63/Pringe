const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const adminOrderController = require("../app/http/controllers/admin/orderController");
const statusController = require("../app/http/controllers/admin/statusController");


//middleWares
const guest = require('../app/http/middlewares/guest');
const admin = require('../app/http/middlewares/admin');
const auth = require('../app/http/middlewares/auth');

function initRoutes(app) {
    app.get("/", homeController().index);
    app.get("/login", guest, authController().login);
    app.post("/login", authController().postLogin)
    app.get("/register", guest, authController().register);
    app.post("/register", authController().cartRegister);
    app.get("/cart", cartController().cart);
    app.post("/update-cart", cartController().update);
    app.post("/logout", authController().logout);
    app.post("/order", auth, orderController().store);
    app.get("/orders", auth, orderController().index);
    app.get("/orders/:id",auth,orderController().show)
    //admin route
    app.get("/admin", admin, adminOrderController().index);
    app.post("/admin/status", admin, statusController().index);
}

module.exports=initRoutes