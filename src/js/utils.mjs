
// wrapper for querySelector
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// click listener
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// return parameters from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

// render list with template
export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlString = list.map(template);

  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

// basic template renderer
export function rendertWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// load template file
export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}

// load header + footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partial/header.html");
  const headerElement = document.querySelector("#main-header");
  rendertWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("../partial/footer.html");
  const footerElement = document.querySelector("#main-footer");
  rendertWithTemplate(footerTemplate, footerElement);
}

// alert message
export function alertMessage(message, scroll = true) {
  const alertElement = document.createElement("div");
  alertElement.classList.add("alert");
  alertElement.textContent = message;
  document.body.appendChild(alertElement);

  if (scroll) {
    window.scrollTo(0, 0);
  }
}

