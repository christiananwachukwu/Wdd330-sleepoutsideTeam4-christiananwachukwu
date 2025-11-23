import CheckoutProcess from "./CheckoutProcess.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// The key "so-cart" is where your cart items are stored.
const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
checkout.init();