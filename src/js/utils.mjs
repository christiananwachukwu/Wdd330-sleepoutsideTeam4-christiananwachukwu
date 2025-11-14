

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return;
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlString = list.map(template);
  if (clear) parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export function renderWithTemplate(template, parentElement, data = null, callback = null) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Error loading ${path}: ${response.statusText}`);
  return await response.text();
}

export async function loadHeaderFooter() {
  try {
    const headerHTML = await loadTemplate("/public/partials/header.html");
    const footerHTML = await loadTemplate("/public/partials/footer.html");

    const headerElement = document.getElementById("main-header");
    const footerElement = document.getElementById("main-footer");

    if (headerElement) renderWithTemplate(headerHTML, headerElement);
    if (footerElement) renderWithTemplate(footerHTML, footerElement);
  } catch (err) {
    console.error("Error loading header/footer:", err);
  }
}

