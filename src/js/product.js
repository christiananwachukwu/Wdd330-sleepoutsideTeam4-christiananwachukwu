// src/js/product.js
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';
 
const dataSource = new ProductData('tents');
 
// Get the product ID from the URL query string
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('product');
 
// Get the element where product details will be displayed
const productElement = document.querySelector('.product-detail');
 
// Create and initialize the ProductDetails instance
const productDetails = new ProductDetails(productId, dataSource);
productDetails.init();
 