
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Initialize ProductData with tents.json from public/json
const dataSource = new ProductData("tents.json");

// Grab the UL element
const listElement = document.querySelector(".product-list");

// Create and render the product list
const productList = new ProductList("Tents", dataSource, listElement);
productList.init();
