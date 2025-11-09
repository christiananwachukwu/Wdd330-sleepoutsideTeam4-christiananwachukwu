// src/js/main.js
 
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
 
// 1. Create a ProductData instance for the 'tents' category
const dataSource = new ProductData('tents');
 
// 2. Identify the element where the list will be rendered
// This selector assumes you have a <ul> or <section> with the class "product-list" in index.html
const listElement = document.querySelector('.product-list'); 
 
// 3. Create an instance of ProductList
const productList = new ProductList('tents', dataSource, listElement);
 
// 4. Initialize the list loading, which fetches data and renders the list
productList.init();
 