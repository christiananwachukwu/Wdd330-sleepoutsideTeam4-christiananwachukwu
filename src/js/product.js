import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
 
const dataSource = new ProductData('tents');
const productId = getParam('product');
 
console.log('Product ID from URL:', productId);
console.log('Fetching product details...');
dataSource.findProductById(productId).then(product => {
  console.log('Product details:', product);
});
 