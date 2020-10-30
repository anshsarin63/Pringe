const Orders = require("../../../models/order");

function statusCotroller() {
    return {
        index(req, res) {
            Orders.updateOne(
                { _id: req.body.orderId }, { status: req.body.status }, (err, data) => {
                    const eventEmitter = req.app.get('eventEmitter');
                    eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status });
                    res.redirect("/admin");
              }
            );
        }
    }
}



module.exports = statusCotroller;