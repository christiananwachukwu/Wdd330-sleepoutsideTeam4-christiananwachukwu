import { loadHeaderFooter, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';

// Load header and footer
loadHeaderFooter();

//Get the category from the URL
const category = getParam('category');

// Create an instance of ProductDate to fetch data
const dataSource = new ProductData();

// Get element where products will be displayed
const listElement = document.querySelector('.product-list');

// Create an instance of ProductList with the category, data source, and element
const myList = new ProductList(category, dataSource, listElement);

// Initialize and display the products
myList.init();