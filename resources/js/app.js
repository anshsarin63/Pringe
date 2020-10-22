let addToCart = document.querySelectorAll(".add-to-cart");
let axios = require('axios').default;
// const session = require('express-session');
const Noty = require("noty");
let cartController = document.querySelector("#cart-controller");
// console.log(addToCart);


function updateCart(pizza) {
    axios.post("/update-cart", pizza).then((res) => {
        // console.log(session);
        cartController.innerText = res.data.totalQty;
        new Noty({
            // theme: "relax",
          type: "success",
          text: "Item is added to cart",
          timeout: 1000,
          progressBar: false,
        }).show();
    }).catch((err) => {
        new Noty({
          // theme: "relax",
          type: "error",
          text: "Something went wrong",
          timeout: 1000,
          progressBar: false,
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    })
})