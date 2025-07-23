//Selecting elements fromt the html
const productContainer = document.querySelector(".product-container");
const hamburgerMenu = document.querySelector(".hamburger-menu");

// A function To truncate text 
function truncateText(string, maxlength){
   return  string?.length > maxlength ? `${string?.slice(0, maxlength)}`: string    
}
//Fetching data from the API 

async function loadProducts(){
    try {
        const response = await fetch("https://fakestoreapi.com/products?limit=4")
        
        if(!response.ok){
            throw new Error("Failed To Fetch Products")
        }

        const products = await response.json();
        renderProducts(products)

        
    } catch (error) {
        console.error(error);
    } 
}
//Function To Render Products
function renderProducts(products){
    productContainer.innerHTML = "";
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product")
        productCard.innerHTML = ` <img src = "${product.image}" alt = ${product.title}"/>
                          <h4>${truncateText((product.title),11)}</h4>
                           <p> $${product.price.toFixed(2)} </p>
                           <a href="product.html?id=${product.id}" class="btn view-btn" >View Details</a>
        `
        productContainer.appendChild(productCard);

    })
}








window.addEventListener("DOMContentLoaded", loadProducts)

