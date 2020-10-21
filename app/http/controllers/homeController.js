const Menu = require('../../models/menu');

function homeController() {
    return {
        index(req, res) {
            
            Menu.find().then(function (pizza) {
                // console.log(pizza);
                res.render("home",{pizzas:pizza});
            })
        }
    }
}

module.exports = homeController;