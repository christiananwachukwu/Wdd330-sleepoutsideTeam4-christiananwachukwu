// product.js
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

// Initialize product details page
const productPage = new ProductDetails(productId, dataSource);
productPage.init();
