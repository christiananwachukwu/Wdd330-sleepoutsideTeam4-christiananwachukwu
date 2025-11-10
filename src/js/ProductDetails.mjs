<<<<<<< HEAD
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
    alert(`${this.product.Name} added to cart!`);
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
=======
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails{
    
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails();

        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart(product) {
    // Get existing items in the cart, or start with an empty array
    const cart = getLocalStorage("so-cart") || [];

    // Add the new product to the array
    cart.push(this.product);

    // Save the updated array back to localStorage
    setLocalStorage("so-cart", cart);
    }
    
    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector('h2').textContent = product.Brand.Name;
    document.querySelector('h3').textContent = product.NameWithoutBrand;

    const productImage = document.getElementById('productImage');
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById('productPrice').textContent = product.FinalPrice;
    document.getElementById('productColor').textContent = product.Colors[0].ColorName;
    document.getElementById('productDesc').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;
>>>>>>> b1acb0f09002352a1206e4aaf5e167fc8fc67877
}
