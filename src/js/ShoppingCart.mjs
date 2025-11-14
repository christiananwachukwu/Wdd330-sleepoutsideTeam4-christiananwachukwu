import { getLocalStorage, setLocalStorage, renderWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
    constructor(key, listElementSelector) {
        this.key = key;
        this.listElement = document.querySelector(listElementSelector);
        this.items = getLocalStorage(this.key) || [];
    }

    renderList() {
        if (this.items.length === 0) {
            this.listElement.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        const template = document.querySelector("#checkout-item-template");
        this.listElement.innerHTML = "";

        this.items.forEach((item) => {
            renderWithTemplate(template, this.listElement, item, this.prepareTemplate);
        });
    }

    prepareTemplate(template, item) {
        template.querySelector(".item-name").textContent = item.Name;
        template.querySelector(".item-price").textContent = `$${Number(item.FinalPrice).toFixed(2)}`;
        template.querySelector(".item-img").src = item.Image;
        template.querySelector(".item-img").alt = item.Name;
        return template;
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + Number(item.FinalPrice), 0);
    }

    clearCart() {
        this.items = [];
        setLocalStorage(this.key, []);
    }
}
