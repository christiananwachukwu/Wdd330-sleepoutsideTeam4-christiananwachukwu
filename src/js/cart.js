let cart = [];

// Function to add item to cart
function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartUI();
}

// Function to update cart UI
function updateCartUI() {
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";
  cart.forEach((product) => {
    const productHTML = `
      <li>
        <span>${product.name}</span>
        <span>Quantity: ${product.quantity}</span>
        <span>Price: ${product.price}</span>
      </li>
    `;
    productList.insertAdjacentHTML("beforeend", productHTML);
  });
}

// Example usage:
const products = [
  { id: 1, name: "Product 1", price: 10.99 },
  { id: 2, name: "Product 2", price: 5.99 },
];
products.forEach((product) => {
  addToCart(product);
});
