import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
// import { formDataToJSON } from "./utils.mjs";

function formDataToJSON(formElement) {
    // convert the form data to a JSON object
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.cartItems = getLocalStorage(this.key) || [];
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
    }

    // STEP A — Calculate subtotal
    calculateSubtotal() {
        this.subtotal = this.cartItems.reduce(
            (sum, item) => sum + item.finalPrice * item.quantity,
            0
        );
        document.querySelector("#subtotal").textContent = this.subtotal.toFixed(2);
    }

    // STEP B — Calculate tax, shipping & total
    calculateOrderTotal(zip) {
        // tax = 6%
        this.tax = this.subtotal * 0.06;

        // shipping = $10 + $2 each additional item
        const itemCount = this.cartItems.length;
        this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

        this.orderTotal = this.subtotal + this.tax + this.shipping;

        document.querySelector("#tax").textContent = this.tax.toFixed(2);
        document.querySelector("#shipping").textContent = this.shipping.toFixed(2);
        document.querySelector("#orderTotal").textContent =
            this.orderTotal.toFixed(2);
    }

    // STEP C — Convert cart items into simplified server-friendly format
    packageItems(items) {
        return items.map((item) => ({
            id: item.Id,
            name: item.Name,
            price: item.finalPrice,
            quantity: item.quantity
        }));
    }

    // STEP D — Main checkout function
    async checkout(form) {
        const formData = new FormData(form);
        let order = formDataToJSON(formData);

        order.orderDate = new Date();
        order.items = this.packageItems(this.cartItems);
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping;

        const service = new ExternalServices();

        const response = await service.checkout(order);
        return response;
    }
}
