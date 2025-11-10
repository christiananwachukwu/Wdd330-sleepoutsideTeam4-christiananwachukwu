import ProductData from "./productdata.mjs";
import ProductDetails from "./productdetails.mjs";

// Extract product ID from URL (?product=880RT)
const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

// Load data from tents.json (change if category differs)
const dataSource = new ProductData("tents");

// Initialize Product Details page
const productPage = new ProductDetails(productId, dataSource);
productPage.init();
