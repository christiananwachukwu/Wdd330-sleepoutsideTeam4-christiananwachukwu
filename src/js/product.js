import { getParam } from './utils.mjs'; //Import the new getParam function
import ProductData from './ProductData.mjs'; //Import the data cource class
import ProductDetails from './ProductDetails.mjs'; // Import the logic class
 
// 1. Get the product ID from the URL parameter 'product'
const productId = getParam('product');

// 2. Create an instance of the data source class for 'tents'
const dataSource = new ProductData('tents');

// 3. Create an instance of the ProductDetails class, passing the ID and the data source
const product = new ProductDetails(productId, dataSource);

// 4. Initialize the product detail page process
product.init();
 