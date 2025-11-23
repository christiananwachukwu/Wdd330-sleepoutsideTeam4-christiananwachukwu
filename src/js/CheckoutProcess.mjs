import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, loadAlerts } from "./utils.mjs";
import { packageItems } from "./utils.mjs"; // Assuming you put this helper function in utils
 
const services = new ExternalServices();
const TAX_RATE = 0.06;
const SHIPPING_BASE = 10.0;
const SHIPPING_PER_ITEM = 2.0;
 
export default class CheckoutProcess {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
 
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.calculateOrderTotal();
 
    // Event listener for form submission
    document.querySelector('#checkoutForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.checkout(e.target);
    });
  }
 
  calculateItemSummary() {
    // 1. Calculate Subtotal
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + Number(item.FinalPrice), 
      0
    );
    // 2. Display Subtotal
    document.querySelector('#subtotal').textContent = `$${this.itemTotal.toFixed(2)}`;
  }
 
  calculateOrderTotal() {
    // Tax: 6% sales tax on the subtotal amount
    this.tax = this.itemTotal * TAX_RATE;
 
    // Shipping: $10 for the first item plus $2 for each additional item
    const numItems = this.list.length;
    this.shipping = numItems > 0 ? SHIPPING_BASE + (numItems - 1) * SHIPPING_PER_ITEM : 0;
 
    // Order Total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
 
    // 3. Display calculated totals
    document.querySelector('#tax').textContent = `$${this.tax.toFixed(2)}`;
    document.querySelector('#shipping').textContent = `$${this.shipping.toFixed(2)}`;
    document.querySelector('#orderTotal').textContent = `$${this.orderTotal.toFixed(2)}`;
  }
 
  // --- SUBMIT ORDER LOGIC ---
  async checkout(form) {
    const formData = new FormData(form);
    const order = formDataToJSON(formData);
 
    // Add calculated fields and items
    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);
    order.items = packageItems(this.list);
 
    try {
      // Call the external service to POST the order
      const res = await services.checkout(order);
      // Log response for now (Next activity handles success/failure)
      console.log('Order Submitted Successfully:', res);
      // Clear cart storage on success
      localStorage.removeItem(this.key); 
    } catch (err) {
      console.error('Checkout Error:', err);
      // This is where you would display the user-friendly error message
      loadAlerts(err.message, true);
    }
  }
}
 
// Helper function to convert form data to a simple JSON object
function formDataToJSON(formData) {
  const json = {};
  formData.forEach((value, key) => {
    // The keys MUST match the server's expected fields: fname, lname, street, etc.
    json[key] = value;
  });
  return json;
}
 
// Helper function (REQUIRED for the activity)
export function packageItems(items) {
    return items.map(item => ({
        id: item.Id,
        name: item.Name,
        price: item.FinalPrice,
        quantity: 1 // Assuming 1 since you haven't implemented quantity control yet
    }));
}
 
// --- INITIALIZATION ---
// In checkout.mjs, instantiate the class and call init()
// const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
// checkout.init();
 