
export default class ProductList {
  constructor(category, dataSource, element) {
    this.category = category;
    this.dataSource = dataSource;
    this.element = element;
  }

  async init() {
    const products = await this.dataSource.getProducts();
    this.renderProductList(products);
  }

  renderProductList(products) {
    const productListHtml = products.map(product => `
      <li class="product-card">
        <a href="#">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.price}</p>
        </a>
        <button class="quick-view-btn" data-product-id="${product.id}">Quick View</button>
      </li>
    `).join("");
    this.element.innerHTML = productListHtml;

    // Add event listener to quick view buttons
    const quickViewBtns = document.querySelectorAll(".quick-view-btn");
    quickViewBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const productId = e.target.dataset.productId;
        this.showQuickView(productId);
      });
    });
  }

  async showQuickView(productId) {
    const product = await this.dataSource.getProduct(productId);
    const modal = document.getElementById("quick-view-modal");
    const productDetails = modal.querySelector(".product-details");
    productDetails.innerHTML = `
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>Price: ${product.price}</p>
    `;
    modal.style.display = "block";

    // Add event listener to close button
    const closeBtn = modal.querySelector(".close");
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
}
