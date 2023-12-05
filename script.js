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
        allProducts = data.products;
        displayProducts(allProducts,"all");
        console.log(allProducts)
    });
};

const displayProducts = function(products,id) {
    productsContainer.innerHTML = '';
    function getPrdcts (){
        for (let i = 0; i < products.length; i++) {
            let main = `<article class="products">
                <img class="products-image" src="${products[i].thumbnail}" alt="">
                <div class="products-details">
                    <h3 class="products-name">${products[i].title}</h3>
                    <h4 class="products-description">${products[i].description}</h4>
                    <p class="products-brand">Brand: <span>${products[i].brand}</span></p>
                    <p class="products-price">Price: <span>${products[i].price}</span>$</p>
                    <p class="products-rating">Rating: <span>${products[i].rating}</span></p>
                    <button class="show-modal" id="${products[i].id}">More Info...</button>
                </div>
            </article>`;
            productsContainer.insertAdjacentHTML('beforeend', main);
        }
    }
    if(id=="all" || id=="house" || id=="care" || id=="tech"){
        getPrdcts()
    }
    document.querySelectorAll('.show-modal').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('id');
            openModal(allProducts.find(product => product.id == productId));
        });
    });
};


let ourProducts;
let filteredProducts2;
let catid;
fetch('https://dummyjson.com/products').then(response => response.json().then(data => {
    ourProducts = data.products;
    document.querySelectorAll(".links").forEach(item => {
        item.addEventListener("click", function () {
            catid = this.getAttribute("id");
            document.querySelector('.input-bar').value=""
            filteredProducts2 = ourProducts.filter(products => {
                if(catid=="all"){
                    return ourProducts
                }
                else if (catid == "tech") {
                    return products.category == "smartphones" || products.category == "laptops";
                }
                else if (catid == "care") {
                    return products.category == "skincare" || products.category == "fragrances";
                }
                else if (catid == "house") {
                    return products.category == "groceries" || products.category == "home-decoration";
                }
            });
        displayProducts(filteredProducts2,catid);
        
    });
});
}));


const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function() {
    const inputValue = document.querySelector('.input-bar').value.toLowerCase();
    const filteredProducts = filteredProducts2.filter(product => product.title.toLowerCase().includes(inputValue));
    
    displayProducts(filteredProducts,catid);
});
document.addEventListener('DOMContentLoaded', fetchData);
 

/* ------------------------------------------------------------------ */

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const closeModal = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const openModal = function(product) {
    modal.innerHTML=" "
    modal.innerHTML = `
        <h1>${product.title}</h1>
        <h2>Brand: ${product.brand}</h2>
        <h3>Original Price (${product.price}$) with ${Math.round(product.discountPercentage)}% DISCOUNT</h3>
        <h3>Rating: ${product.rating}</h3>
        <h4>There are ${product.stock} ${product.category} available in the stock</h4>
        <p>${product.description}</p>
        <div id="image-container">
            ${product.images.map((imageUrl) => `<img src="${imageUrl}" alt="">`).join('')}
        </div>

        <button class="close-modal" onclick="closeModal()"><i class="fa-solid fa-x"></i></button>
       
    `;

    // Show modal and overlay
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

