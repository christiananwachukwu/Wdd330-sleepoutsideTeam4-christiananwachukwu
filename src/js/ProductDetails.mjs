// ProductDetails.mjs
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
    this.discountPercentage = 0.2; // 20% discount
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();

    const addBtn = document.getElementById("addToCart");
    if (addBtn) {
      addBtn.addEventListener("click", this.addProductToCart.bind(this));
    }
  }

  addProductToCart() {
    const cart = getLocalStorage("so-cart");
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
    alert(`${this.product.NameWithoutBrand} added to cart!`);
  }

  calculateDiscountedPrice(price) {
    return price - price * this.discountPercentage;
  }

  renderProductDetails() {
    const product = this.product;
    const discounted = this.calculateDiscountedPrice(product.FinalPrice);

    document.getElementById("productBrand").textContent = product.Brand.Name;
    document.getElementById("productName").textContent = product.NameWithoutBrand;

    const img = document.getElementById("productImage");
    img.src = product.Image;
    img.alt = product.NameWithoutBrand;

    const original = document.getElementById("originalPrice");
    original.textContent = `$${product.FinalPrice.toFixed(2)}`;
    original.style.textDecoration = "line-through";

    const discountedEl = document.getElementById("discountedPrice");
    discountedEl.textContent = `$${discounted.toFixed(2)}`;

    const badge = document.getElementById("discountBadge");
    badge.textContent = `${this.discountPercentage * 100}% OFF`;

    document.getElementById("productColor").textContent =
      product.Colors?.[0]?.ColorName || "N/A";

    document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id;
  }
}
