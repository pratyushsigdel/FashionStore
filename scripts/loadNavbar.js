// /scripts/loadNavbar.js

async function loadNavbar() {
  try {
    const response = await fetch('/components/navbar.html');
    const navbarHTML = await response.text();

    // Inject the navbar into the placeholder div
    document.querySelector('.navbar-placeholder').innerHTML = navbarHTML;

    // After DOM injection, initialize the hamburger menu logic
    initHamburgerMenu();
    updateCartCountFromStorage();

  } catch (error) {
    console.error("Failed to load navbar:", error);
  }
}

function initHamburgerMenu() {
  let isHamburgerOpen = false;
  let hamburgermainDiv = null;

  const hamburgerMenu = document.querySelector(".hamburger-menu");

  if (!hamburgerMenu) {
    console.warn("Hamburger menu not found after navbar injection.");
    return;
  }

  hamburgerMenu.addEventListener("click", () => {
    if (!isHamburgerOpen) {
      hamburgermainDiv = document.createElement("div");
      hamburgermainDiv.classList.add("hamburger");

      hamburgermainDiv.innerHTML = `
        <div class="hamburger-header">
          <i class="fa-solid fa-xmark close-icon"></i>
        </div>
        <div class=" mobile-nav">
          <a href="shop.html?category=men's clothing">Men</a>
          <a href="shop.html?category=women's clothing">Women</a>
          <a href="shop.html?category=jewelery">Jewelry</a>
          <a href="shop.html?category=electronics">Electronics</a>
          <a href="shop.html">All</a>
        </div>
      `;

      document.body.appendChild(hamburgermainDiv);
      document.body.style.overflow = "hidden"; // Disable scroll

      const closeIcon = hamburgermainDiv.querySelector(".close-icon");
      closeIcon.addEventListener("click", () => {
        hamburgermainDiv.remove();
        hamburgermainDiv = null;
        isHamburgerOpen = false;
        document.body.style.overflow = ""; // Restore scroll
      });

      isHamburgerOpen = true;
    }
  });
}

window.addEventListener("DOMContentLoaded", loadNavbar);
