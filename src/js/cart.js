import { getLocalStorage } from "./utils.mjs";
 
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
 
  // Handle empty cart
  if (cartItems.length === 0) {
    productList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
 
  // Create the HTML for each cart item
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");
 
  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  const totalElement = document.querySelector("#cart-total");
  if (totalElement) {
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }
}

// Get cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// Template for each item
function cartItemTemplate(item) {
  const color =
    item.Colors && item.Colors.length > 0
      ? item.Colors[0].ColorName
      : "N/A";
 
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${color}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}
 
renderCartContents();
