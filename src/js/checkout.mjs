import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutprocess.mjs";
loadHeaderFooter();

const checkoutForm = document.querySelector("#checkoutForm");
const checkout = new CheckoutProcess("so-cart", "#order-summary");

// Initial calculations
checkout.calculateSubtotal();
checkout.calculateOrderTotal();

// Form submission handler
checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await checkout.checkout(checkoutForm);
    alert("Order placed successfully!");
    // To clear the cart and redirect the user
    localStorage.removeItem(checkout.key);
    window.location.href = "/thank-you.html";
});
console.log("Checkout page JS loaded!");
