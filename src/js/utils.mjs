// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
 
// retrieve data from localstorage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}
 
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
 
// set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) return;
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}
 
// return parameters from a URL query
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}
 
// render list safely with template
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  if (!Array.isArray(list)) {
    console.warn("Expected an array for renderListWithTemplate but got:", list);
    list = [];
  }
  if (!parentElement) {
    console.error("Parent element is undefined in renderListWithTemplate");
    return;
  }
 
  const htmlString = list.map(template);
  if (clear) parentElement.innerHTML = "";
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}
 
// simple render with optional callback
export function rendertWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) return;
  parentElement.innerHTML = template;
  if (callback) callback(data);
}
 
// load template file
export async function loadTemplate(path) {
  const response = await fetch(path);
  return await response.text();
}

// --- New function in utils.mjs ---

export function handleNewsletterSignup() {
    const form = qs("#newsletterForm"); // Assuming the form has ID 'newsletterForm'
    if (!form) {
        console.warn("Newsletter form not found.");
        return;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop the default form submission

        const emailInput = qs('#newsletterEmail');
        const email = emailInput ? emailInput.value : '';

        if (email) {
            console.log(`Newsletter signup: Email received for ${email}`);
            alert(`Thank you for signing up with ${email}!`);
            emailInput.value = ''; // Clear the input field
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

export function packageItems(items) {
  return items.map(item => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1
  }));
}
 
// --- New function in utils.mjs ---
export function loadAlerts(message, isError = false) {
    console.error("ALERT TRIGGERED:", message);
    const alertList = document.querySelector("#alert-list") || document.createElement('ul');
    alertList.id = "alert-list";
    
    // Simple way to display the message to the user
    const className = isError ? "alert-error" : "alert-success";
    alertList.innerHTML = `<li class="${className}">${message}</li>`;
 
    // Ensure it's visible (you may need to append this to your body or header in real code)
    if (!document.body.contains(alertList)) {
        document.body.prepend(alertList);
    }
}


// load header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partial/header.html");
  const headerElement = document.querySelector("#main-header");
  rendertWithTemplate(headerTemplate, headerElement);
 
  const footerTemplate = await loadTemplate("../partial/footer.html");
  const footerElement = document.querySelector("#main-footer");
  rendertWithTemplate(footerTemplate, footerElement);
}
 