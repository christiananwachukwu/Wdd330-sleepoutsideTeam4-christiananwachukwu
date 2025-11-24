// checkoutprocess.mjs
import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function formDataToJSON(formElement) {
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

    calculateSubtotal() {
        // Use FinalPrice and fallback quantity
        this.subtotal = this.cartItems.reduce(
            (sum, item) => sum + Number(item.FinalPrice || 0) * (item.quantity || 1),
            0
        );
        const subtotalEl = document.querySelector("#subtotal");
        if (subtotalEl) subtotalEl.textContent = this.subtotal.toFixed(2);
    }

    calculateOrderTotal(/* zip optional */) {
        this.tax = this.subtotal * 0.06;
        const itemCount = this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
        this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
        this.orderTotal = this.subtotal + this.tax + this.shipping;

        const taxEl = document.querySelector("#tax");
        const shipEl = document.querySelector("#shipping");
        const totalEl = document.querySelector("#orderTotal");
        if (taxEl) taxEl.textContent = this.tax.toFixed(2);
        if (shipEl) shipEl.textContent = this.shipping.toFixed(2);
        if (totalEl) totalEl.textContent = this.orderTotal.toFixed(2);
    }

    packageItems(items) {
        return items.map((item) => ({
            id: item.Id,
            name: item.Name,
            price: Number(item.FinalPrice || 0),
            quantity: item.quantity || 1
        }));
    }

    async checkout(form) {
        const order = formDataToJSON(form);
        order.orderDate = new Date().toISOString();
        order.items = this.packageItems(this.cartItems);
        order.orderTotal = this.orderTotal.toFixed(2);
        order.tax = this.tax.toFixed(2);
        order.shipping = this.shipping;

        const service = new ExternalServices();
        const response = await service.checkout(order);
        return response;
    }
}