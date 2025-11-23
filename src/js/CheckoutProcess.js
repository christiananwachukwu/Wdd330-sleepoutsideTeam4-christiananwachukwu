import { alertMessage } from "./utils.mjs";

async function checkout() {
  try {
    // your checkout logic here...
    window.location.href = "../checkout/success.html";
  } catch (err) {
    alertMessage(err.message || "Checkout failed");
  }
}

export { checkout };
