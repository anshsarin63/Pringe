const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
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
    app.post("/order",orderController().store)
}

module.exports=initRoutes