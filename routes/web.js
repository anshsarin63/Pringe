const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const adminOrderController = require("../app/http/controllers/admin/orderController");

//middleWares
const guest = require('../app/http/middlewares/guest');

function initRoutes(app) {
    app.get("/", homeController().index);
    app.get("/login", guest, authController().login);
    app.post("/login", authController().postLogin)
    app.get("/register", guest, authController().register);
    app.post("/register", authController().cartRegister);
    app.get("/cart", cartController().cart);
    app.post("/update-cart", cartController().update);
    app.post("/logout", authController().logout);
    app.post("/order", guest, orderController().store);
    app.get("/orders", guest, orderController().index);

    //admin route
    app.get("/admin", adminOrderController().index);
}

module.exports=initRoutes