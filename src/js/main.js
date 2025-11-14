
// Import utility functions and product modules
import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Dynamically load header and footer
loadHeaderFooter();

// Initialize product list
const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const list = new ProductList("Tents", dataSource, element);
list.init();
