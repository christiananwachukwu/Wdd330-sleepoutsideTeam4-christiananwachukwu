import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./ProductDetails.mjs";


const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get existing items in the cart, or start with an empty array
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];

  // Add the new product to the array
  cart.push(product);

  // Save the updated array back to localStorage
  localStorage.setItem("so-cart", JSON.stringify(cart));
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
