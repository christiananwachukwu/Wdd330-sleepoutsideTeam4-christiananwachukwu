// src/js/utils.mjs
export function getLocalStorage(key)  {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
    // 1. If 'clear' is true, empty the parent element
    if (clear) {
        parentElement.innerHTML = "";
    }
 
    // 2. Use map to convert the list of objects into an array of HTML strings
    const htmlStrings = list.map(templateFn);
 
    // 3. Insert the joined HTML string into the parent element
    parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}
 