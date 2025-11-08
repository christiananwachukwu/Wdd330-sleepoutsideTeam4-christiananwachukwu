import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productListContainer = document.getElementById("productList");

const dataSource = new ProductData("tents");

const productList = new ProductList("tents", dataSource, productListContainer);

productList.init();

