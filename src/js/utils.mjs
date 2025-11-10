// utils.mjs
// Utility functions used throughout Sleep Outside project

// Query selector shortcut
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Add click and touchend listeners
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return;
  element.addEventListener("click", callback);
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
}

// Extract a parameter value from the URL
export function getParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Render a list of items with a template
export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) parentElement.innerHTML = "";
  const htmlString = list.map(template).join("");
  parentElement.insertAdjacentHTML(position, htmlString);
}
