'use strict'
// list pruducts' names insid an arry
var product = [
    "bag",
    "banana",
    "bathroom",
    "boots",
    "breakfast",
    "bubblegum",
    "chair",
    "cthulhu",
    "dog-duck",
    "dragon",
    "pen",
    "pet-sweep",
    "scissors",
    "shark",
    "sweep",
    "tauntaun",
    "unicorn",
    "usb",
    "water-can",
    "wine-glass"
];
var sectionImg = document.getElementById('img'); // declare a variable to get an HTML element by its id
var left = document.getElementById('left'); // declare a variable to get an HTML element by its id
var middle = document.getElementById('middle'); // declare a variable to get an HTML element by its id
var right = document.getElementById('right'); // declare a variable to get an HTML element by its id
var click = 0; // declare a variable for counting the number of votes
var clickArr = []; // declare an empty arry to set the number of votes in it
var unClick = 0; // declare a variable for counting the number of views
var unClickArr = []; // declare an empty arry to set the number of views in it
Product.all = []; // an emty array for pushing the properties of the constractor
// constractor for the common products' properties
function Product(product, format) {
    this.productName = product;
    this.imgPath = format;
    this.clicks = 0;
    this.unClicks = 0;
}
Product.all.push(
    new Product('bag', 'img/bag.jpg'),
    new Product('banana', 'img/banana.jpg'),
    new Product('bathroom', 'img/bathroom.jpg'),
    new Product('boots', 'img/boots.jpg'),
    new Product('breakfast', 'img/breakfast.jpg'),
    new Product('bubblegum', 'img/bubblegum.jpg'),
    new Product('chair', 'img/chair.jpg'),
    new Product('cthulhu', 'img/cthulhu.jpg'),
    new Product('dog-duck', 'img/dog-duck.jpg'),
    new Product('dragon', 'img/dragon.jpg'),
    new Product('pen', 'img/pen.jpg'),
    new Product('pet-sweep', 'img/pet-sweep.jpg'),
    new Product('scissors', 'img/scissors.jpg'),
    new Product('shark', 'img/shark.jpg'),
    new Product('sweep', 'img/sweep.png'),
    new Product('tauntaun', 'img/tauntaun.jpg'),
    new Product('unicorn', 'img/unicorn.jpg'),
    new Product('usb', 'img/usb.gif'),
    new Product('water-can', 'img/water-can.jpg'),
    new Product('wine-glass', 'img/wine-glass.jpg')
);
// for loop for geting products
for (var i = 0; i < product.length; i++) {
    new Product(product[i]);
}
console.log(Product.all);
// declare a set of variables to get unique 3 imgs in each time the user will clicked on a product 
// and to do two sub sequence for products
var leftProduct, middleProduct, rightProduct, previous3Imgs = [];
function renderProducts() {
    leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
    middleProduct = Product.all[randomNumber(0, Product.all.length - 1)];
    rightProduct = Product.all[randomNumber(0, Product.all.length - 1)];
    if (leftProduct === middleProduct || middleProduct === rightProduct || rightProduct === leftProduct) {
        renderProducts();
    }
    if(previous3Imgs.includes(leftProduct)){
        leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
        while(leftProduct === middleProduct || leftProduct === rightProduct){
            leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
        }
    }
    if(previous3Imgs.includes(middleProduct)){
        middleProduct = Product.all[randomNumber(0, Product.all.length - 1)];
        while(middleProduct === leftProduct || middleProduct === rightProduct){
            middleProduct = Product.all[randomNumber(0, Product.all.length - 1)];
        }
    }
    if(previous3Imgs.includes(rightProduct)){
        rightProduct = Product.all[randomNumber(0, Product.all.length - 1)];
        while(rightProduct === middleProduct || rightProduct === leftProduct){
            rightProduct = Product.all[randomNumber(0, Product.all.length - 1)];
        }
    }
    previous3Imgs.push(leftProduct);
    previous3Imgs.push(middleProduct);
    previous3Imgs.push(rightProduct);
    while(previous3Imgs.length > 3){
        previous3Imgs.shift();
    }
    left.src = leftProduct.imgPath;
    left.alt = leftProduct.productName;
    middle.src = middleProduct.imgPath;
    middle.alt = middleProduct.productName;
    right.src = rightProduct.imgPath;
    right.alt = rightProduct.productName;
}
renderProducts();
// function for even listner to count the number of votes and views
left.addEventListener('click', onClick);
middle.addEventListener('click', onClick);
right.addEventListener('click', onClick);
function onClick(event) {
    if (click < 25) {
            click++;
            if (event.target.id === 'left') {
                leftProduct.clicks++;
            }
         if (event.target.id === 'middle') {
            middleProduct.clicks++;
        } if (event.target.id === 'right') {
            rightProduct.clicks++;
        }
        leftProduct.unClicks++;
        middleProduct.unClicks++;
        rightProduct.unClicks++;
        renderProducts();
    } else if (click === 25) {
        click++;
        dataOnChart();
        renderSummary();
    }
}
// function to do a list on HTML for the result of the votes and views number for each project
function renderSummary() {
    storeProducts();
    // img.removeEventListener('click', onClick)
    var h2El = document.getElementById('h2');
    var h2 = document.createElement('h2');
    h2.textContent = `Here is your vote:`;
    h2El.append(h2);
    renderChart();
    var ulEl = document.getElementById('summary');
    for (var i = 0; i < Product.all.length; i++) {
        var li = document.createElement('li');
        li.textContent = `${Product.all[i].productName} had ${Product.all[i].clicks} votes, and was shown ${Product.all[i].unClicks} times`;
        ulEl.append(li);
    }
}
// function for getting the number of votes and views and pushing them to its arry
var dataOnChart = function () { 
    for (var i = 0; i < Product.all.length; i++){ 
      clickArr.push(Product.all[i].clicks);
      unClickArr.push(Product.all[i].unClicks); 
    } 
  }
//   function for the chart
function renderChart() {
    var chart = document.getElementById('voteChart').getContext('2d');
    chart.canvas.height = '250';
    chart.canvas.width = '800';
    var voteChart = new Chart(chart, {
        type: 'bar',
        data: {
            labels: product,
            datasets: [{
                label: "Shown Times",
                backgroundColor: 'rgba(149, 147, 147, .5)',
                borderColor: '#959393',
                data: unClickArr,
            },
            {
                label: "Votes",
                backgroundColor: 'rgba(15, 15, 10, .5)',
                borderColor: '#0f0f0a',
                data: clickArr,
            }]
        },
        // options: {
        //     scales: {
        //         xAxes: [{
        //             stacked: true
        //         }],
        //         yAxes: [{
        //             stacked: true
        //         }]
        //     }
        // }
    });
}
// renderChart();
// function for storing the data of votes and views in local storage
function storeProducts(){
    var products = JSON.stringify(Product.all);
    localStorage.setItem('Products', products);
}
// storeProducts();
// function for getting the data of votes and views in local storage
function getProducts(){
    var products = localStorage.getItem('Products');
        Product.all = JSON.parse(products);
    
}
// helper function
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
