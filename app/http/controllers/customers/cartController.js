function cartController() {
    return {
        cart(req, res) {
            res.render("customer/cart");
        },
        update(req, res) {

            if (!req.session.cartItem) {
                req.session.cartItem = {
                    item: {},
                    totalQty: 0,
                    totalPrice:0
                }
            }
            let cartItem = req.session.cartItem;
            // console.log(req);

            if (!cartItem.item[req.body._id]) {
                cartItem.item[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cartItem.totalQty += 1;
                cartItem.totalPrice += req.body.price;
            } else {
                cartItem.item[req.body._id].qty += 1;
                cartItem.totalQty += 1;
                cartItem.totalPrice += req.body.price;
            }
            console.log(req.body);

            res.json({ totalQty: req.session.cartItem.totalQty });
        }
    }
}

module.exports = cartController;