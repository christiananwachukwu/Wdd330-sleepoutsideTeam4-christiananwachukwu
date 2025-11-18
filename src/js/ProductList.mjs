import { renderListWithTemplate } from "./utils.mjs";
 
function productCardTemplate(product) { 
    const discount = product.ListPrice - product.FinalPrice;
    let discountBadge = "";

    if (discount > 0) {
        const discountPercent = Math.round((discount / product.ListPrice) * 100);
        discountBadge = `<span class="discount-badge">${discountPercent}% OFF</span>`;
    }

    return `<li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
          <div class="product-image-wrapper">
            <img src="${product.Images.PrimaryMedium}" alt="Image of ${product.Name} ">
            ${discountBadge} <!-- Add discount flag here -->
          </div>
          <h2 class="card__brand">${product.Brand.Name}</h2>
          <h3 class="card__name">${product.NameWithoutBrand}</h3>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
    </li>`
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}



