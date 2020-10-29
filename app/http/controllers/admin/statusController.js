const Orders = require("../../../models/order");

function statusCotroller() {
    return {
        index(req, res) {
            Orders.updateOne(
              { _id: req.body.orderId },{ status: req.body.status }, (err, data) => {
                    res.redirect("/admin");
              }
            );
        }
    }
}



module.exports = statusCotroller;