
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
  }

  renderProductDetails() {
    const product = this.product;
    const container = document.querySelector(".product-detail");
    if (!product) {
      container.innerHTML = "<p>Product not found.</p>";
      return;
    }
    container.innerHTML = `
      <img src="${product.Images.PrimaryLarge}" alt="${product.Name}">
      <div class="info">
        <h2>${product.Name}</h2>
        <p class="price">$${product.FinalPrice}</p>
        <p>${product.Description}</p>
      </div>
    `;
  }
}
