
import ProductData from "./ProductData.mjs";

const productContainer = document.querySelector("#product-details");

// Get product ID from URL query string
const params = new URLSearchParams(window.location.search);
const productId = params.get("product");

const dataSource = new ProductData("tents.json");

async function renderProduct() {
  if (!productId) {
    productContainer.innerHTML = "<p>Product not found.</p>";
    return;
  }

  const product = await dataSource.findProductById(productId);

  if (!product) {
    productContainer.innerHTML = "<p>Product not found in data.</p>";
    return;
  }

  productContainer.innerHTML = `
    <div class="product-detail">
      <img src="${product.Image}" alt="${product.Name}" class="product-detail__image" />
      <div class="product-detail__info">
        <h2>${product.Name}</h2>
        <h3>${product.Brand?.Name ?? ""}</h3>
        <p class="product-detail__price">$${product.FinalPrice}</p>
        <p>${product.DescriptionHtmlSimple}</p>
        <button id="addToCartBtn">Add to Cart</button>
      </div>
    </div>
  `;
// console.log('Product loaded successfully!');
  console.log("Displayed product:", product.Name);
}

renderProduct();
