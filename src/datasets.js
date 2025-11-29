
// select all items 
const element= document.querySelectorAll(items);
// loop through items and log values
// const items = document.querySelectorAll('#items li');
// items.forEach(item => {
//     console.log('Name:', item.dataset.name);
//     console.log('Category:', item.dataset.category);
//     console.log('Color:', item.dataset.color);
// });

// Add an event listener when user clicks on a product
const items = document.querySelectorAll('#items li');
const details = document.createElement('div');
document.body.appendChild(details);
items.forEach(item => {
    item.addEventListener('click', () => {
        details.innerHTML = `
        <h2>Item Details</h2>
        <p>Name: ${item.dataset.name}</p>
        <p>Category: ${item.dataset.category}</p>
        <p>Color: ${item.dataset.color}</p>
    `;
    })
})


// element.dataset.name = 'data-name';
// element.dataset.category = 'data-category';
// element.dataset.color = 'data-color'; 


