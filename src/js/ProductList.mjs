// src/js/ProductList.mjs
 
import { renderListWithTemplate } from './utils.mjs';
 
function productCardTemplate(product) {
    console.log('Image path:', `/images/${product.Image}`);
    // Correct image path: /images/ is relative to the public folder root
    return `<li class="product-card">
        <a href="/product_pages/index.html?product=${product.Id}">
            <img src="/images/${product.Image}" alt="Image of ${product.Name}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`;
}
 
export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
 
    async init() {
        const list = await this.dataSource.getData();
        console.log('First product:', list[0]);
        this.renderList(list); 
    }
    
    renderList(list) {
        // Uses the utility function imported from utils.mjs
        renderListWithTemplate(
            productCardTemplate,
            this.listElement,
            list
        );
    }
}
 