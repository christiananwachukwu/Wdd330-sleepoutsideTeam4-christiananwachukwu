import { getParam} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const product = new ProductDetails(productID, dataSource);

product.init();

const ListPrice = Number(product.ListPrice);
const FinalPrice = Number(product.FinalPrice);
const discount = ListPrice - FinalPrice;
document.querySelector(".product-card_discount").textContent =
  `You save $${discount.toFixed(2)}`;

