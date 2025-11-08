import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const discount =  product.ListPrice - product.FinalPrice;
    
    return `
    <li class="product-card">
      <a href="product_pages/?products=${product.Id}">
        <img src="${product.Image}" alt="${product.Name}">
        <h2>${product.Brand.Name}</h2>
        <h3>${product.Name}</h3>
        <p class="product-card_price">$${product.FinalPrice}</p>
        <p class="product-card_discount">You save $${discount}</p>
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
        this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }

}

