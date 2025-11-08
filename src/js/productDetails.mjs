import { getLocalStorage, setLocalStorage} from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId; // To get product we are looking at
        this.product = {}; // which datasource to fetch from
        this.dataSource = dataSource; // empty object to store product details later
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId); // use datasource to get details for the current product. findproductbyId returns a promise so we used await to process it
        this.renderProductDetails(); // to get product details before rendering HTML
        
        //add a listener to the add to cart button
        //callback will not work if bind(this) is not used because "this" in the callback will refer to the button not the class instance
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addToCartHandler.bind(this));
    }

    addProductToCart(product) {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(product);
        setLocalStorage("so-cart", cartItems);
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

    document.getElementById("productPrice").textContent = product.FinalPrice;
    document.getElementById("productDescription").textContent =
        product.Description;
    
    document.getElementById("addToCart").dataset.id = product.Id;
}