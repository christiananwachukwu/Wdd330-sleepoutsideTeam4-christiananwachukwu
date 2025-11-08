import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".productList").innerHTML = htmlItems.join("");

  //attach event listeners to remove buttons
  const removeButtons = document.querySelectorAll(".remove");
  removeButtons.forEach(btn => btn.addEventListener("click", removeItem));
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <span class="remove" data-id="${item.Id}" style="cursor:pointer; float:right;">X</span>
    <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
    </a>
    <a href="#">
    <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>`;

  return newItem;
}

function removeItem(e) {
  const id = e.target.dataset.id;
  let cartItems = getLocalStorage("so-cart") || [];

  // remove this product
  cartItems = cartItems.filter(product => product.Id != id);

  // save updated cart
  setLocalStorage("so-cart", cartItems);

  // re-render
  renderCartContents();
}

renderCartContents();
