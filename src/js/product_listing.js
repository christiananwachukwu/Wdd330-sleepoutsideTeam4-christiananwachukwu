import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ExternalServices();

const element = document.querySelector(".product-list");
if (element) {
  const list = new ProductList(category, dataSource, element);
  list.init();
} else {
  /* intentionally empty */
}
