import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId; // To get product we are looking at
        this.product = {}; // which datasource to fetch from
        this.dataSource = dataSource; // empty object to store product details later
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId); // use datasource to get details for the current product. findProductById returns a promise so we use await
        this.renderProductDetails(); // render HTML with product details

        // add a listener to the add to cart button
        // bind(this) ensures "this" inside the handler refers to the class
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCartHandler.bind(this));
    }

    addProductToCart(product) {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(product);
        setLocalStorage("so-cart", cartItems);
    }

    // Add missing handler
    addToCartHandler(event) {
        this.addProductToCart(this.product);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    productImage.src = product.Image;
    productImage.alt = product.Name;

    document.getElementById("productPrice").textContent = Number(product.FinalPrice).toFixed(2);
    document.getElementById("productDescription").textContent = product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id;
}
