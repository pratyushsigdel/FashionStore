// //Selection Of Several Elements From HTMl

// const checkoutForm = document.querySelector(".checkout-form");
// const orderItemList = document.querySelector("#order-items");
// const orderTotal = document.querySelector("#order-total");
// const confirmation = document.getElementById("confirmation");
// const empty = document.querySelector(".empty");
// const form = document.querySelector(".form");
// const nameError = document.querySelector("#name-error");
// const emailError = document.querySelector("#email-error");
// const addressError = document.querySelector("#address-error");

// let cartItems = JSON.parse(localStorage.getItem("cart")) || []

// // Function To Render Cart Items To Order Summary

// function renderOrderSummary(){
//     orderItemList.innerHTML = "";
//     let total = 0;

//     if(cartItems.length === 0){
//         orderItemList.innerHTML = `<li> Your Cart Is Empty </li>`;
//         orderTotal.textContent = "0.00"
//         return;
//     }

//     cartItems.forEach((item) => {
//         const li = document.createElement("li");
//         li.textContent = `${item.title} : $${item.price.toFixed(2)}`;
//         orderItemList.appendChild(li);
//         total += item.price;
//     })

//     orderTotal.textContent = total.toFixed(2);
// }

// //Form Handling and event listener

// checkoutForm.addEventListener("submit", (e)=>{
//     e.preventDefault();

//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();
//     const address = document.getElementById("address").value.trim();

//     let valid = true;

//     if(!name){
//         nameError.classList.remove("hidden");
//         name.classList.add("invalid");
//         valid = false;
//     }

//     else{
//          nameError.classList.add("hidden");
//          name.classList.remove("invalid");
//   }


//    if(cartItems.length > 0){
//         confirmation.classList.remove("hidden");
//         localStorage.removeItem("cart");
//         form.classList.add("hidden");
//         const cartCount = document.querySelector(".cart-count");
//         if(cartCount){
//         cartCount.textContent = "0";
//     }
        
//    }

//    if(cartItems.length === 0){
//     form.classList.add("hidden")
//     empty.classList.remove("hidden")
//    }


// });

// window.addEventListener("DOMContentLoaded", renderOrderSummary)

// //Selection Of Several Elements From HTMl
const checkoutForm = document.querySelector(".checkout-form");
const orderItemList = document.querySelector("#order-items");
const orderTotal = document.querySelector("#order-total");
const confirmation = document.getElementById("confirmation");
const empty = document.querySelector(".empty");
const form = document.querySelector(".form");
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const addressError = document.querySelector("#address-error");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

 // Function To Render Cart Items To Order Summary

function renderOrderSummary() {
  orderItemList.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    orderItemList.innerHTML = `<li> Your Cart Is Empty </li>`;
    orderTotal.textContent = "0.00";
    return;
  }

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.title} : $${item.price.toFixed(2)}`;
    orderItemList.appendChild(li);
    total += item.price;
  });

  orderTotal.textContent = total.toFixed(2);
}

//Form Handling and event listener

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const address = addressInput.value.trim();

  let valid = true;

  // Validate Name
  if (!name) {
    nameError.classList.remove("hidden");
    nameInput.classList.add("invalid");
    valid = false;
  } 

  // Validate Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    emailError.textContent = "Email should be provided";
    emailError.classList.remove("hidden");
    emailInput.classList.add("invalid");
    valid = false;
  } else if(!emailPattern.test(email)){
    emailError.textContent = "Enter a valid email address"
    emailError.classList.remove("hidden");
    emailInput.classList.add("invalid");
    valid = false;
  }
  else {
    emailError.classList.add("hidden");
    emailInput.classList.remove("invalid");
  }

  // Validate Address
  if (!address) {
    addressError.classList.remove("hidden");
    addressInput.classList.add("invalid");
    valid = false;
  } else {
    addressError.classList.add("hidden");
    addressInput.classList.remove("invalid");
  }

  if (!valid) return;

  // Proceed if form is valid
  if (cartItems.length > 0) {
    confirmation.classList.remove("hidden");
    localStorage.removeItem("cart");
    form.classList.add("hidden");
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent = "0";
    }
  }

  if (cartItems.length === 0) {
    form.classList.add("hidden");
    empty.classList.remove("hidden");
  }
});

window.addEventListener("DOMContentLoaded", renderOrderSummary);

