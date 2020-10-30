const Order = require('../../../models/order');
const User = require('../../../models/user');
const moment=require('moment')

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
                delete req.session.cartItem;
                //Emit
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('orderPlaced', result);
                res.redirect('/orders');
            }).catch(err => {
                req.flash("error", "Something went wrong");
                res.redirect("/cart");
            })
        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id }, null, { sort:{ createdAt: -1 }});
            // console.log(orders);
            res.render("customer/orders", {
              order: orders,
              moment: moment,
            });
            // console.log(moment(orders.createdAt).format("h:mm A"));
        },
        async show(req, res) {
            const order = await Order.findById(req.params.id);
            if (req.user._id.toString() === order.customerId.toString()) {
                res.render("customer/singleOrder", { order: order });
            }
            else res.redirect('/');
        }
    }
}

module.exports = orderController;