// src/js/ProductDetails.mjs 
export default class ProductDetails { 
constructor(productId, dataSource) {
     this.productId = productId;
     this.dataSource = dataSource; 
     this.product = {}; 
} 
async init() { 
    // Get all products and find the one matching our ID 
    const products = await this.dataSource.getData();
    this.product = products.find(item => item.Id === this.productId); 
    
    if (!this.product){
     console.error('Product not found:', this.productId);
     document.querySelector('.product-details').innerHTML = '<p>Product not found</p>';
     return;
    }
    

    // Render the product details
    this.renderProductDetails();

     // Add event listener for "Add to Cart" button
    document.getElementById('addToCart')
     .addEventListener('click', this.addToCart.bind(this));
} 
addToCart() { 
    // Add to cart functionality (you'll implement this later) 
    console.log('Adding to cart:', this.product); 
    alert(`${this.product.Name} added to cart!`);
 } 
  renderProductDetails() {
     const price = this.product.ListPrice ?? this.product.SuggestedRetailPrice ?? 0;
     const discount = this.product.Discount ?? 0;
     const finalPrice = price * (1 - discount);

    const detailsHTML = `
  <h3>${this.product.Brand?.Name || ""}</h3>
  <h2 class="divider">${this.product.NameWithoutBrand || this.product.Name}</h2>
  <img class="divider" src="/images/${this.product.Image}" alt="${this.product.Name}" />
 
  <div class="product-pricing">
    <p><strong>Original Price:</strong> $${price.toFixed(2)}</p>
    ${discount > 0 
      ? `<p><strong>Discount:</strong> ${(discount * 100).toFixed(0)}% off</p>
         <p><strong>Final Price:</strong> 
            <span class="text-green-600 font-bold">$${finalPrice.toFixed(2)}</span>
         </p>`
      : `<p><strong>Final Price:</strong> $${price.toFixed(2)}</p>`
    }
  </div>
 
  <p class="product__color">${this.product.Colors?.[0]?.ColorName || ""}</p>
  <p class="product__description">${this.product.DescriptionHtmlSimple || this.product.Description}</p>
  
  <div class="product-detail__add">
    <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
  </div>
`;
 
 document.querySelector('.product-detail').innerHTML = detailsHTML; 
}
 }
 