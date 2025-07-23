const productDetails = document.getElementById("product-detail");

const loading = document.getElementById("loading");


//Creating Function To Get The ProductId From URL
function getProductIdFromURL(){
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// A function To truncate text 
function truncateText(string, maxlength){
   return  string?.length > maxlength ? `${string?.slice(0, maxlength)}`: string    
}

//Setting Up a function To Load Product Details

async function loadProductDetails(){
    const productId = getProductIdFromURL();
    if(!productId){
        productDetails.innerHTML = `<p class = "error"> Invalid Product Id </p>`;
        loading.classList.add("hidden");
        return;
    }

    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if(!response.ok){
            console.log("Error happend here",error)
            throw new error ("Failed To Fetch Product")
        }
        const product = await response.json();
        renderProduct(product);
        
    } catch (error) {
        productDetails.innerHTML = `<p class = "error"> Failed To Load Products...</p>`
    }

    finally {
        loading.classList.add("hidden");
        productDetails.classList.remove("hidden");
    }

}

function renderProduct(product) {
  productDetails.innerHTML = `
    <div class="product-card-detail">
    <div class = "card-image">
      <img src="${product.image}" alt="${product.title}" />
      </div>
      <div class="product-info">
        <h2>${product.title}</h2>
        <p class="category"><strong>Category:</strong> ${product.category}</p>
        <p class="price"><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p class="description"><strong>Description:</strong>${product.description}</p>
        <div class="quantity-controls product-quantity-controls">
        <label for = "qty-input"> <strong>Quantity: </strong></label>
        <button class="qty-btn decrease" data-id="${product.id}">-</button>
        <input type="number" class="qty-value" id="qty-input" min="1" value="1" />
        <button class="qty-btn increase" data-id="${product.id}">+</button>
        </div>
        <button class="btn add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  `;

  //Attaching eventlistener to the ADD To Cart button 

  const addToCartBtn = document.querySelector(".add-to-cart-btn");
  addToCartBtn.addEventListener("click", ()=>
    {
    const quantityInput = document.getElementById("qty-input");
    const selectedQty = Number(quantityInput?.value) || 1
    return addToCart(product, selectedQty)
  })

  //Attaching event listener to plus minus buttons

  const increaseBtn = document.querySelector(".increase");
  const decreaseBtn = document.querySelector(".decrease");
  const quantityInput = document.querySelector("#qty-input");

  decreaseBtn.addEventListener("click", () =>{
    const currentVal = parseInt(quantityInput.value);
    if(currentVal > 1){
      quantityInput.value = currentVal - 1
    }
  })

  increaseBtn.addEventListener("click", ()=>{
    const currentVal = parseInt(quantityInput.value)
    quantityInput.value = currentVal + 1;
  })
  
}

function addToCart(product,selectedQty){
    
    //Reading existing cart from the Local Storage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    //Checking whether the product already exists in the cart

    const existingItem = cart.find((item) => {
        return item.id === product.id
    })

    if(existingItem){
        existingItem.quantity += selectedQty;
    }
    else{
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity:selectedQty
        })
    }

    //Saving updated Cart

    localStorage.setItem("cart", JSON.stringify(cart));

    //Providing Alert When added to the cart
    updateCartCount();
    succesfullToast();

}

function succesfullToast(){
   Swal.fire({
  position: "center",
  icon: "success",
  title: "Item Added To Cart Sucessfully",
  showConfirmButton: false,
  timer: 1500,
});
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length; // showing unique items
  }
}

window.addEventListener("DOMContentLoaded", loadProductDetails)




