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
        displayProducts(allProducts,"all");
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
                </div>
            </article>`;
            productsContainer.insertAdjacentHTML('beforeend', main);
        }
    }
    if(id=="all"){
        getPrdcts()
    }
    else if(id=="tech"){
        getPrdcts()
    }
    else if(id=="care"){
        getPrdcts()
    }
    else if(id=="house"){
        getPrdcts()
    }
};

let ourprdcts;
let filteredProducts2
let catid
fetch('https://dummyjson.com/products').then(response => response.json().then(data => {
    ourprdcts = data.products;

    document.querySelectorAll(".links").forEach(item => {
        item.addEventListener("click", function () {
            catid = this.getAttribute("id");
            document.querySelector('.input-bar').value=""
            filteredProducts2 = ourprdcts.filter(prdtc => {
                if(catid=="all"){
                    return ourprdcts
                }
                else if (catid == "tech") {
                    return prdtc.category == "smartphones" || prdtc.category == "laptops";
                }
                else if (catid == "care") {
                    return prdtc.category == "skincare" || prdtc.category == "fragrances";
                }
                else if (catid == "house") {
                    return prdtc.category == "groceries" || prdtc.category == "home-decoration";
                }
            });

        displayProducts(filteredProducts2,catid);
        
    });
});
}));

const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', function() {
    // console.log(filteredProducts2);
    const inputValue = document.querySelector('.input-bar').value.toLowerCase();
    const filteredProducts = filteredProducts2.filter(product => product.title.toLowerCase().includes(inputValue));
    
    displayProducts(filteredProducts,catid);
});

document.addEventListener('DOMContentLoaded', fetchData);