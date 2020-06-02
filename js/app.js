'use strict'
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
var sectionImg = document.getElementById('img');
var left = document.getElementById('left');
var middle = document.getElementById('middle');
var right = document.getElementById('right');
var click = 0;
var clickArr = [];
var unClick = 0;
var unClickArr = [];
Product.all = [];
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
for (var i = 0; i < product.length; i++) {
    new Product(product[i]);
}
console.log(Product.all);
var leftProduct, middleProduct, rightProduct;
function renderProducts() {
    leftProduct = Product.all[randomNumber(0, Product.all.length - 1)];
    middleProduct = Product.all[randomNumber(0, Product.all.length - 1)];
    rightProduct = Product.all[randomNumber(0, Product.all.length - 1)];
    if (leftProduct === middleProduct || middleProduct === rightProduct || rightProduct === leftProduct) {
        renderProducts();
    }
    left.src = leftProduct.imgPath;
    left.alt = leftProduct.productName;
    middle.src = middleProduct.imgPath;
    middle.alt = middleProduct.productName;
    right.src = rightProduct.imgPath;
    right.alt = rightProduct.productName;
}
renderProducts();
img.addEventListener('click', onClick);
// left.addEventListener('click', onClick);
// middle.addEventListener('click',onClick);
// right.addEventListener('click',onClick);
function onClick(event) {
    if (click < 25) {
        if (event.target.id !== 'img') {
            click++;
            if (event.target.id === 'left') {
                leftProduct.clicks++;
            }
        } if (event.target.id === 'middle') {
            middleProduct.clicks++;
        } if (event.target.id === 'right') {
            rightProduct.clicks++;
        }
        leftProduct.unClicks++;
        middleProduct.unClicks++;
        rightProduct.unClicks++;
        renderProducts();
    } else if (click === 25) {
        img.removeEventListener('click', onClick);
        dataOnChart();
        renderSummary();
    }
    // clickArr.push(click);
    // unClickArr.push(click);
    // console.log(clickArr);
}
function renderSummary() {
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
var dataOnChart = function () { 
    for (var i = 0; i < Product.all.length; i++){ 
      clickArr.push(Product.all[i].clicks);
      unClickArr.push(Product.all[i].unClicks); 
    } 
  }
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
        options: {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        }
    });
}
// renderChart();
function storeProducts(){
    var products = JSON.stringify(Product.all);
    var shown = JSON.stringify(click);
    var vote = JSON.stringify(unClick);
    localStorage.setItem('Products', products);
    localStorage.setItem('Shown', shown);
    localStorage.setItem('Vote', vote);
}
storeProducts();
function getProducts(){
    var products = localStorage.getItem('Products');
    var shown = localStorage.getItem('Shown');
    var vote = localStorage.getItem('vote');
    if(products || shown || vote){
        Product.all = JSON.parse(products);
        click = JSON.parse(shown);
        unClick = JSON.parse(vote);
        renderProducts();
        onClick(event);
        dataOnChart();
    }
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
