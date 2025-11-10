
export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData();
      this.renderList(list);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  prepareTemplate(product) {
    console.log("Rendering image:", product.Image);
    return `
      <li class="product-card">
        <a href="product_pages/index.html?product=${product.Id}">
          <img src="${product.Image}" alt="${product.Name}" />
          <h3 class="card__brand">${product.Brand?.Name ?? ""}</h3>
          <h2 class="card__name">${product.Name}</h2>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>`;
  }

  renderList(list) {
    if (!Array.isArray(list) || list.length === 0) {
      this.listElement.innerHTML = "<li>No products found</li>";
      return;
    }
    const htmlStrings = list.map(this.prepareTemplate.bind(this));
    this.listElement.innerHTML = htmlStrings.join("");
  }
}
