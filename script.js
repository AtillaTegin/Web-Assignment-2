document.querySelector('.navbar').style.width = "0px";

function openNav() {
    document.getElementById("sideNavbar").style.width = "400px";
}
  
function closeNav() {
    document.getElementById("sideNavbar").style.width = "0";
}

const productsContainer = document.querySelector('.products-container');
let allProducts = [];

const fetchData = function () {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://dummyjson.com/products');
    request.send();

    request.addEventListener('load', function() {
        const data = JSON.parse(this.responseText);
        console.log(data);
        allProducts = data.products;
        displayProducts(allProducts);
    });
};

const displayProducts = function(products) {
    productsContainer.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        let main = `<article class="products">
            <img class="products-image" src="${products[i].thumbnail}" alt="">
            <div class="products-details">
                <h3 class="products-name">${products[i].title}</h3>
                <h4 class="products-description">${products[i].description}</h4>
                <p class="products-brand">Brand: <span>${products[i].brand}</span></p>
                <p class="products-price">Price: <span>${products[i].price}</span>$</p>
                <p class="products-rating">Rating: <span>${products[i].rating}</span></p>
            </div>
        </article>`;
        productsContainer.insertAdjacentHTML('beforeend', main);
    }
};

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function() {
    const inputValue = document.querySelector('.input-bar').value.toLowerCase();
    const filteredProducts = allProducts.filter(product => product.title.toLowerCase().includes(inputValue));

    displayProducts(filteredProducts);
});

document.addEventListener('DOMContentLoaded', fetchData);

// const fetchData = function () {
//     const request = new XMLHttpRequest();
//     request.open('GET', 'https://dummyjson.com/products');
//     request.send();

//     request.addEventListener('load', function() {
//         const data = JSON.parse(this.responseText);
//         console.log(data);
//         let allProducts = data.products;
//         for (let i = 0; i < allProducts.length; i++){
//             let main = `<article class="products">
//                 <img class="products-image" src="${allProducts[i].thumbnail}" alt="">
//                 <div class="products-details">
//                     <h3 class="products-name">${allProducts[i].title}</h3>
//                     <h4 class="products-description">${allProducts[i].description}</h4>
//                     <p class="products-brand">Brand: <span>${allProducts[i].brand}</span></p>
//                     <p class="products-price">Price: <span>${allProducts[i].price}</span>$</p>
//                     <p class="products-rating">Rating: <span>${allProducts[i].rating}</span></p>
//                 </div>
//             </article>`;
//             productsContainer.insertAdjacentHTML('beforeend', main);
//         }
//     })
// }
// fetchData();



