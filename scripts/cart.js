const cartItemsContainer = document.getElementById("cart-items");
const grandTotalELement = document.getElementById("grand-total");
const checkoutBtn = document.querySelector(".checkout-btn");
const cartSummary= document.querySelector(".cart-summary");


// A function To truncate text 
function truncateText(string, maxlength){
   return  string?.length > maxlength ? `${string?.slice(0, maxlength)}`: string    
}


// A Function to load items into the cart
function loadCart(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length === 0){
        cartItemsContainer.style.display= "none";
        cartSummary.innerHTML = `<div class="empty-cart">
          <img class="empty-cart-image" src="/assets/empty-card.jpg" alt="Empty- Cart-Image">
        </div>`
        cartItemsContainer.innerHTML = ``;
        updateCartCount(0);
        checkoutBtn.classList.add("hidden");
        return;
    }

    cartItemsContainer.innerHTML = "";
    let grandTotal = 0;

    cart.forEach((item) => {
        const subtotal = item.price * item.quantity;
        grandTotal += subtotal;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
      <div class = "cart-image"> 
      <img src="${item.image}" alt="${item.title}" />
      </div>
      <div class="cart-info">
       <h4>${truncateText((item.title),20)}</h4>
        <p>Price: $${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
          <button class="qty-btn decrease" data-id="${item.id}">-</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn increase" data-id="${item.id}">+</button>
        </div>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItem);

    });

    grandTotalELement.textContent = grandTotal.toFixed(2);
    updateCartCount()
    attachCartEvents()

}

// Adding Event listener to DifferentCart Events

function attachCartEvents(){
    //Event listener For Deleting the Cart Item
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((btn)=>{
        btn.addEventListener("click", function(){
            const id = parseInt(btn.dataset.id);
            removeFromCart(id);
            succesfullToast();

        })
    })

    //Event listener For Incereasing Cart Item

    const increaseBtn = document.querySelectorAll(".increase");
    increaseBtn.forEach((btn)=>{
        btn.addEventListener("click", function(){
            const id = parseInt(btn.dataset.id);
            updateQuantity(id, 1)
        })
    })

    //Event listener For Decreasing The Cart Item

    const decreaseBtn = document.querySelectorAll(".decrease");
    decreaseBtn.forEach((btn)=>{
        btn.addEventListener("click", function(){
            const id = parseInt(btn.dataset.id);
            updateQuantity(id, -1);
        })
    })
}
    // Removing the Cart through the help of id 

function removeFromCart(id){
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item)=>{
        return item.id !== id;
    })

    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}



function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const item = cart.find((item) => item.id === id);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter((i) => i.id !== id); // remove if zero
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function updateCartCount(count=null){
const cartCount = document.querySelector(".cart-count");
if(!cartCount) return;
if(count !== null){
cartCount.textContent = count;
return;
}

// Counting Unique Items Only

const cart = JSON.parse(localStorage.getItem("cart")) || []
cartCount.textContent = cart.length;

}


function succesfullToast(){
   Swal.fire({
  position: "center",
  icon: "success",
  title: "Item Deleted Sucessfully",
  showConfirmButton: false,
  timer: 1500,
});
}


window.addEventListener("DOMContentLoaded", loadCart);



