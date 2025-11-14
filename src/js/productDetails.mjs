import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";
//import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId; // To get product we are looking at
        this.product = {}; // which datasource to fetch from
        this.dataSource = dataSource; // empty object to store product details later
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();

        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
        // // Wait until the DOM updates before attaching listener
        // requestAnimationFrame(() => {
        //     const addButton = document.getElementById("addToCart");
        //     if (addButton) {
        //         addButton.addEventListener("click", this.addToCartHandler.bind(this));
        //     } else {
        //         console.error("Add to Cart button not found");

            
        
    }


    addProductToCart(product) {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(product);
        setLocalStorage("so-cart", cartItems);
    }

    // // Add missing handler
    // addToCartHandler(event) {
    //     this.addProductToCart(this.product);
    // }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById("productPrice").textContent = Number(product.FinalPrice).toFixed(2);
    document.getElementById("productColor").textContent = product.Colors[0].ColorName;
    document.getElementById("productDescription").innerHTML = product.DescriptionHtmlSimple;
    

    document.getElementById("addToCart").dataset.id = product.Id;
}
