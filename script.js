document.querySelector('.navbar').style.width = "0px";

function openNav() {
    document.getElementById("sideNavbar").style.width = "400px";
}
  
function closeNav() {
    document.getElementById("sideNavbar").style.width = "0";
}

const productsContainer = document.querySelector('.products-container');

const fetchData = function () {
    const request = new XMLHttpRequest();
    request.open('GET', `https://dummyjson.com/products`);
    request.send();

    request.addEventListener('load', function() {
        const data = JSON.parse(this.responseText);
        console.log(data);
        let allProducts = data.products;
        for (let i = 0; i < allProducts.length; i++){
            let main = `<article class="products">
            <img class="products-image" src="${allProducts[i].thumbnail}" alt="">
            <div class="products-details">
                <h3 class="products-name">${allProducts[i].title}</h3>
                <h4 class="products-description">${allProducts[i].description}</h4>
                <p class="products-brand">Brand: <span>${allProducts[i].brand}</span></p>
                <p class="products-price">Price: <span>${allProducts[i].price}</span>$</p>
                <p class="products-rating">Rating: <span>${allProducts[i].rating}</span></p>
            </div>
            </article>`;
            console.log(allProducts[i]);
            productsContainer.insertAdjacentHTML('beforeend', main);
        }
    })
}
fetchData();