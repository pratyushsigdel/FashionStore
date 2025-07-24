//Updating Cart Count On Each and every pages

function updateCartCountFromStorage() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.length;

  const cartCount = document.querySelector(".cart-count");

  if (cartCount) {
    cartCount.textContent = total;
  }
}

window.addEventListener("DOMContentLoaded", updateCartCountFromStorage);
