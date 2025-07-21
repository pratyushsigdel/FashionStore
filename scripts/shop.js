// Selection of different elements
const productList = document.getElementById("product-list");
const loading = document.getElementById("loading");
const sortSelect = document.getElementById("sort-select");
const categoryFilters = document.querySelectorAll(
  ".filter-group input[type='checkbox']"
);
const searchForm = document.querySelector(".searchbar form");
const searchInput = document.querySelector(".searchBox")
const searchBtn = document.querySelector(".searchBtn");


let allProducts = [];

// A function To truncate text
function truncateText(string, maxlength) {
  return string?.length > maxlength ? `${string?.slice(0, maxlength)}` : string;
}

//A function to read url parameters

function getURLCategory(){
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

// Fetching Products using API

async function loadProducts() {
  loading.classList.remove("hidden");
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response?.ok) {
      throw new Error("Failed To Fetch Products");
    }

    allProducts = await response.json();
    loading.classList.add("hidden");
    
    const urlCategory = getURLCategory();

    //If Category from navbar exists, check it in sidebar

   if(urlCategory){
    categoryFilters.forEach((checkbox) => {
      checkbox.checked = checkbox.value === urlCategory
    })
   }

    applyFiltersAndSorting();
  } catch (error) {
    loading.classList.add("hidden");
    productList.innerHTML = `<p class = "error"> Failed To Load Products. Please Try Again </p>`;
    console.error(error);
  }
}

//Rendering Products In The Page

function renderProducts(products) {
  productList.innerHTML = "";
  if(products.length ===0){
    productList.innerHTML = `<p class="error">No products match your filter.</p>`
    return;
  }
  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = ` <img src = "${product.image}" alt = ${product.title}"/>
                           <h4>${truncateText(product.title, 15)}</h4>
                           <p> $${product.price.toFixed(2)} </p>
                           <a href="product.html?id=${product.id}" class="btn view-btn">View Details</a>
        
        `;
    productList.appendChild(card);
  });
}

function applyFiltersAndSorting() {
  //Filtering Through The Category

  const selectedCategories = Array.from(categoryFilters)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  let filtered = [...allProducts];

  if (selectedCategories.length > 0) {
    filtered = filtered.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }

  // Sorting The Items According To Price

  const sortValue = sortSelect.value;

  if(sortValue === "price-low"){
    filtered.sort((a,b) => a.price - b.price)
  }
  else if (sortValue === "price-high"){
    filtered.sort((a,b) => b.price - a.price)
  }
     renderProducts(filtered);
  }

  //Function For Searching Inside The Shop.html

  function searchKeyword(){
    const keyword = searchInput.value.trim().toLowerCase();
    let filtered = [...allProducts];

    if(keyword !== ""){
      filtered = filtered.filter((product) => {
       return product.title.toLowerCase().includes(keyword)
      })
    }
    renderProducts(filtered);
  }


//Event Listeners 

window.addEventListener("DOMContentLoaded", loadProducts);

sortSelect.addEventListener("change", applyFiltersAndSorting);

categoryFilters.forEach((checkbox) => checkbox.addEventListener("change", applyFiltersAndSorting))

searchForm.addEventListener("submit", function(e){
  e.preventDefault();
  searchKeyword()
})
