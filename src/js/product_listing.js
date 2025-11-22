import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

// const query = localStorage.getItem("searchQuery");

// if (query) {
//     const listContainer = document.querySelector(".product-list");

//     const searchProducts = async () => {
//         const categories = ["tents", "sleepingbags", "backpacks", "accessories"]; // all your categories
//         let allProducts = [];

//         const searchDataSource = new ProductData();

//         // Fetch all categories
//         for (const cat of categories) {
//             const data = await searchDataSource.getData(cat);
//             allProducts = allProducts.concat(data);
//         }

//         // Filter by search query
//         const results = allProducts.filter((item) =>
//             item.Name.toLowerCase().includes(query.toLowerCase()),
//         );

//         // Display results
//         listContainer.innerHTML = `<h2>Search results for "${query}"</h2>`;

//         if (results.length === 0) {
//             listContainer.innerHTML += `<p>No products found.</p>`;
//             return;
//         }

//         listContainer.innerHTML += results
//             .map(
//                 (product) => `
//       <li class="product-card">
//         <a href="/product_pages/?product=${product.Id}">
//           <img src="${product.Images.PrimarySmall}" alt="${product.Name}">
//           <h3>${product.Brand}</h3>
//           <h2>${product.Name}</h2>
//           <p class="product-card__price">$${product.FinalPrice}</p>
//         </a>
//       </li>
//     `
//             )
//             .join("");

//         localStorage.removeItem("searchQuery");
//     };

//     searchProducts();
// }

const category = getParam("category");

const dataSource = new ProductData();

const element = document.querySelector(".product-list");

const list = new ProductList(category, dataSource, element);

list.init();
