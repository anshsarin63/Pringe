let addToCart = document.querySelectorAll(".add-to-cart");
// console.log(addToCart);
addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
    })
})