let addToCart = document.querySelectorAll(".add-to-cart");
let axios = require('axios').default;
// const session = require('express-session');
const Noty = require("noty");
let cartController = document.querySelector("#cart-controller");
const moment = require('moment');
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

//success message 
const successMessage = document.querySelector("#success-alert");
if (successMessage) {
    setTimeout(()=>{
        successMessage.remove();
  },2000);
}

//admin config
const initAdmin = require('./admin');


//dynamic update of single order
let order = document.querySelector("#hiddenInput");
order = (order)?JSON.parse(order.value):null;
const statuses = document.querySelectorAll(".status-line");
let time = document.createElement("small");

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove("current");
        status.classList.remove("step-completed");
    })
    let statusCompleted = true;
    statuses.forEach((status) => {
        let dataProp=status.dataset.status;
        if(statusCompleted) {
            status.classList.add("step-completed");
        }
        if (dataProp === order.status) {
            time.innerHTML = moment(order.updatedAt).format("hh:mm A");
            status.appendChild(time);
            status.nextElementSibling.classList.add("current");
            statusCompleted = false;
        }
    })
}

updateStatus(order);


//socket connection
const socket = io();

if (order) {
    socket.emit('join', `order_${order._id}`);
}

let adminAreaPath = window.location.pathname;
// console.log(adminAreaPath);
if (adminAreaPath.includes('admin')) {
    initAdmin(socket);
    socket.emit('join', 'adminRoom');
}

socket.on('orderUpdated', (data) => {
    let updatedOrder = { ...order };
    updatedOrder.updatedAt = moment().format();
    updatedOrder.status = data.status;
    console.log(data);
    updateStatus(updatedOrder);
    new Noty({
      // theme: "relax",
      type: "success",
      text: "Status Updated",
      timeout: 1000,
      progressBar: false,
    }).show();
})