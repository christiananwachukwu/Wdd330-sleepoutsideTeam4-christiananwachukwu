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
    // implementation to render product list
  }
}

