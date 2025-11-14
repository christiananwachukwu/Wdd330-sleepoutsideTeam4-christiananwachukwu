import { renderListWithTemplate} from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.NameWithoutBrand}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category; // category of products to display
        this.dataSource = dataSource; // datasource to fetch products from
        this.listElement = listElement;// HTML element to render product list into
    }

    async init() {
        const list = await this.dataSource.getData();
        // console.log("Raw list data:", list);  // <-- Add this line
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

}

