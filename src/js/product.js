
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product"); // gets ?product=880RR
const dataSource = new ProductData("tents"); // load data from tents.json

const product = new ProductDetails(productId, dataSource);
product.init();
