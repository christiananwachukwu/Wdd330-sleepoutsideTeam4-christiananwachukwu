import { getParam} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);

product.init();

dataSource.findProductById(productID).then(item => {
  const listPrice = Number(item.ListPrice);

  // Apply an 8% discount
  const discountAmount = listPrice * 0.08;
  const finalPrice = listPrice - discountAmount;

  // Display the discount and final price
  document.querySelector(".product-card_discount").textContent =
    `You save $${discountAmount.toFixed(2)} (8% off)`;
  
  const priceElement = document.querySelector(".product-card_price");
  if (priceElement) {
    priceElement.textContent = `$${finalPrice.toFixed(2)}`;
  }
});


