import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand?.Name || "Unknown Brand"}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData(this.category);
      console.log("Fetched list:", list);

      if (!Array.isArray(list)) {
        console.error("Expected array but got:", list);
        return;
      }

      if (list.length === 0) {
        this.listElement.innerHTML = "<li>No products found.</li>";
        return;
      }

      this.renderList(list);
      document.querySelector(".title").textContent = this.category;
    } catch (err) {
      console.error("Error initializing ProductList:", err);
      this.listElement.innerHTML = "<li>Error loading products.</li>";
    }
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "beforeend", true);
  }
}