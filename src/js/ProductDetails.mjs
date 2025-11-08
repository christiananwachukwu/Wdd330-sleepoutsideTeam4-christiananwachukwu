// src/js/ProductDetails.mjs
 
import { setLocalStorage } from './utils.mjs'; 
 
export default class ProductDetails { 
    constructor(productId, dataSource) { 
        this.productId = productId; 
        this.product = {}; 
        this.dataSource = dataSource; 
    } 
 
    async init() { 
        // 1. Fetch the product details
        this.product = await this.dataSource.findProductById(this.productId); 
        
        // 2. Render the product on the page
        this.renderProductDetails(); 
        
        // 3. Attach the event listener to the "Add to Cart" button
        const button = document.getElementById('addToCart'); 
        if (button) { 
            // Using .bind(this) ensures 'this' inside addToCart refers to the ProductDetails instance
            button.addEventListener('click', this.addToCart.bind(this));
        } else { 
            console.error('ERROR: addToCart button not found'); 
        } 
    } 
 
    // Robust addToCart method (already verified as working)
    addToCart() {
        console.log('Add to Cart clicked!');
        
        let cartData = localStorage.getItem('so-cart');
        let cart;
        
        // Make sure we have an array (robust error handling)
        if (cartData) {
            try {
                cart = JSON.parse(cartData);
                if (!Array.isArray(cart)) {
                    console.warn('Cart was not an array, converting...');
                    cart = [];
                }
            } catch (e) {
                console.error('Error parsing cart, starting fresh:', e);
                cart = [];
            }
        } else {
            cart = [];
        }
        
        // Add this product to cart
        cart.push(this.product);
        
        // Save back to localStorage
        localStorage.setItem('so-cart', JSON.stringify(cart));
        
        // Show confirmation
        alert('Product added to cart!');
    }
 
    renderProductDetails() { 
        // This logic populates the elements in product_pages/index.html
        
        // Determine Brand Name: The instructions suggest complex logic, but often the Brand property is used
        // If your JSON has Brand.Name, use that:
        const brandName = this.product.Brand.Name;
        
        // If your JSON only uses the Name property, use your previous split logic:
        // const brandName = this.product.Name.split(' ')[0] + ' ' + this.product.Name.split(' ')[1];
        
        document.querySelector("#productName").innerText = brandName; 
        document.querySelector("#productNameWithoutBrand").innerText = this.product.NameWithoutBrand; 
        document.querySelector("#productImage").src = this.product.Image; 
        document.querySelector("#productImage").alt = this.product.Name; 
        document.querySelector("#productFinalPrice").innerText = `$${this.product.FinalPrice}`; 
        
        // Check for colors before accessing the array
        if (this.product.Colors && this.product.Colors.length > 0) {
            document.querySelector("#productColorName").innerText = this.product.Colors[0].ColorName;
        }
        
        document.querySelector("#productDescriptionHtmlSimple").innerHTML = this.product.DescriptionHtmlSimple; 
        document.querySelector("#addToCart").dataset.id = this.product.Id; 
    } 
}
 