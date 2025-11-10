// product.js
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Get product ID from URL
const productId = new URLSearchParams(window.location.search).get("product");

// Data source: "tents.json"
const dataSource = new ProductData("tents");

// Initialize product details page
const productPage = new ProductDetails(productId, dataSource);
productPage.init();
