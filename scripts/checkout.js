// Selection Of Several Elements From HTML
const checkoutForm = document.querySelector(".checkout-form");
const orderItemList = document.querySelector("#order-items");
const orderTotal = document.querySelector("#order-total");
const confirmation = document.getElementById("confirmation");
const empty = document.querySelector(".empty");
const form = document.querySelector(".form");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Function To Render Cart Items To Order Summary
function renderOrderSummary() {
  orderItemList.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    orderItemList.innerHTML = `<li>Your Cart Is Empty</li>`;
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

// Form Handling and Validation
checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Input Fields
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const cityInput = document.getElementById("city");
  const addressInput = document.getElementById("address");
  const zipcodeInput = document.getElementById("zipcode");

  // Error Fields
  const firstNameError = document.getElementById("firstName-error");
  const lastNameError = document.getElementById("lastName-error");
  const emailError = document.getElementById("email-error");
  const phoneError = document.getElementById("phone-error");
  const cityError = document.getElementById("city-error");
  const addressError = document.getElementById("address-error");
  const zipcodeError = document.getElementById("zipcode-error");

  // Values
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const city = cityInput.value.trim();
  const address = addressInput.value.trim();
  const zipcode = zipcodeInput.value.trim();

  let valid = true;

  // First Name
  if (!firstName) {
    firstNameError.classList.remove("hidden");
    firstNameInput.classList.add("invalid");
    valid = false;
  } else {
    firstNameError.classList.add("hidden");
    firstNameInput.classList.remove("invalid");
  }

  // Last Name
  if (!lastName) {
    lastNameError.classList.remove("hidden");
    lastNameInput.classList.add("invalid");
    valid = false;
  } else {
    lastNameError.classList.add("hidden");
    lastNameInput.classList.remove("invalid");
  }

  // Email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    emailError.textContent = "Email should be provided";
    emailError.classList.remove("hidden");
    emailInput.classList.add("invalid");
    valid = false;
  } else if (!emailPattern.test(email)) {
    emailError.textContent = "Enter a valid email address";
    emailError.classList.remove("hidden");
    emailInput.classList.add("invalid");
    valid = false;
  } else {
    emailError.classList.add("hidden");
    emailInput.classList.remove("invalid");
  }

  // Phone
  const phonePattern = /^\d{10}$/;
  if (!phone) {
    phoneError.textContent = "Phone number is required";
    phoneError.classList.remove("hidden");
    phoneInput.classList.add("invalid");
    valid = false;
  } else if (!phonePattern.test(phone)) {
    phoneError.textContent = "Enter valid 10-digit phone number";
    phoneError.classList.remove("hidden");
    phoneInput.classList.add("invalid");
    valid = false;
  } else {
    phoneError.classList.add("hidden");
    phoneInput.classList.remove("invalid");
  }

  // City
  if (!city) {
    cityError.classList.remove("hidden");
    cityInput.classList.add("invalid");
    valid = false;
  } else {
    cityError.classList.add("hidden");
    cityInput.classList.remove("invalid");
  }

  // Address
  if (!address) {
    addressError.classList.remove("hidden");
    addressInput.classList.add("invalid");
    valid = false;
  } else {
    addressError.classList.add("hidden");
    addressInput.classList.remove("invalid");
  }

  // Zipcode
  const zipPattern = /^\d{5}$/;
  if (!zipcode) {
    zipcodeError.textContent = "Zip code is required";
    zipcodeError.classList.remove("hidden");
    zipcodeInput.classList.add("invalid");
    valid = false;
  } else if (!zipPattern.test(zipcode)) {
    zipcodeError.textContent = "Enter valid 5-digit zip code";
    zipcodeError.classList.remove("hidden");
    zipcodeInput.classList.add("invalid");
    valid = false;
  } else {
    zipcodeError.classList.add("hidden");
    zipcodeInput.classList.remove("invalid");
  }

  // Proceed if form is valid
  if (!valid) return;

  if (cartItems.length > 0) {
    confirmation.classList.remove("hidden");
    localStorage.removeItem("cart");
    form.classList.add("hidden");
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
      cartCount.textContent = "0";
    }
  } else {
    form.classList.add("hidden");
    empty.classList.remove("hidden");
  }
});

window.addEventListener("DOMContentLoaded", renderOrderSummary);
