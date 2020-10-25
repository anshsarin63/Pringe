const Order = require('../../../models/order');

function orderController() {
    return {
        store(req, res) {
            const { phone, address } = req.body;
            // console.log(req.body);
            if (!phone || !address) {
                req.flash('error', 'All fields are required');
                return res.redirect("/cart");
            }
            const order = new Order({
                customerId: req.user.id,
                items: req.session.cartItem.item,
                phone: phone,
                address:address
            })
            order.save().then(result => {
                req.flash('success', 'Order Placed Successfully');
                res.redirect('/');
            }).catch(err => {
                req.flash("error", "Something went wrong");
                res.redirect("/cart");
            })
        }
    }
}

module.exports = orderController;