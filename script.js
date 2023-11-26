function openNav() {
    document.getElementById("sideNavbar").style.width = "400px";
}
  
function closeNav() {
    document.getElementById("sideNavbar").style.width = "0";
}


const fetchData = function () {
    const request = new XMLHttpRequest();
    request.open('GET', `https://dummyjson.com/products`);
    request.send();

    request.addEventListener('load', function() {
        const data = JSON.parse(this.responseText);
        console.log(data);
    })
}
fetchData();