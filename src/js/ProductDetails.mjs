 export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    // 1. Fetch product data
    this.product = await this.dataSource.findProductById(this.productId);

    // 2. Render the product info
    this.renderProductDetails();

    // 3. Set up Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
    cart.push(this.product);
    localStorage.setItem("so-cart", JSON.stringify(cart));
    alert`(${this.product.Name} added to cart!)`;
  }

  renderProductDetails() {
    const detailsElement = document.querySelector(".product-detail");

    detailsElement.innerHTML = `
      <h2 class="product-name">${this.product.Name}</h2>
      <img src="${this.product.Image}" alt="${this.product.Name}" class="product-image">
      <p class="product-description">${this.product.Description}</p>
      <p class="product-price">$${this.product.FinalPrice}</p>
      <button id="addToCart">Add to Cart</button>
    `;
  }
}
