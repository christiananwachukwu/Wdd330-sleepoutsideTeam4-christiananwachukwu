import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

// SEARCH FUNCTION
document
  .getElementById("productSearchForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const query = document.getElementById("searchInput").value.trim();

    if (query === "") return;

    // store query
    localStorage.setItem("searchQuery", query);

    // redirect to product listing page
    window.location.href = "/src/product_listing/index.html";
  });

const dataSource = new ProductData("tents");

const element = document.querySelector(".product-list");

const list = new ProductList("Tents", dataSource, element);

list.init();
