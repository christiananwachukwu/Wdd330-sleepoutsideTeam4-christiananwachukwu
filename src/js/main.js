import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import {loadHeaderFooter} from "./utils.mjs";

loadHeaderFooter();

// const productListContainer = document.getElementById("productList");

const dataSource = new ProductData("tents");
const element = document.querySelector(".productList");
const productList = new ProductList("tents", dataSource, element);


productList.init();

