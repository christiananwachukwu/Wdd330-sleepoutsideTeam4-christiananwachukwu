import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
    const cart = new ShoppingCart("so-cart", "#checkout-items");
    cart.renderList();

    const subtotal = cart.getTotal();
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const summary = document.querySelector("#order-summary");
    summary.innerHTML = `
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>Tax (10%): $${tax.toFixed(2)}</p>
    <h3>Total: $${total.toFixed(2)}</h3>
  `;

    const form = document.querySelector("#checkout-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for your purchase! Your order has been placed successfully.");
            cart.clearCart();
            window.location.href = "../../index.html";
        });
    }
});
