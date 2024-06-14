//write here your js

window.addEventListener('load', function(){
    const preload = document.querySelector('.preload');
    preload.classList.add("preload-finish");
});


document.addEventListener("DOMContentLoaded", function() {

    //функция перелистывания постеров и их описания
    let images = document.querySelectorAll('.poster img');
    let descriptions = document.querySelectorAll('.book_description p');
    let currentIndex = 0;

    function updateContent() {
        images.forEach(function(img, index) {
            img.classList.toggle('active', index === currentIndex);
        });
        descriptions.forEach(function(desc, index) {
            desc.classList.toggle('active' , index === currentIndex);
        });
    }

    let nextButton = document.querySelector('.next');
    let prevButton = document.querySelector('.prev');

    if (nextButton && prevButton) {
        nextButton.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % images.length;
            updateContent();
        });
        prevButton.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateContent();
        });
        updateContent();
    }

    //функция перелистывания страниц
    let pages = document.querySelectorAll('.pages img');
    let currentIndexpage = 0;

    function updateContentpage() {
        pages.forEach(function(img, index) {
            img.classList.toggle('activep', index === currentIndexpage);
        });
    }

    let nextButtonp = document.querySelector('.forwards');
    let prevButtonp = document.querySelector('.backwards');

    if (nextButtonp && prevButtonp) {
        nextButtonp.addEventListener('click', function() {
            currentIndexpage = (currentIndexpage + 1) % pages.length;
            updateContentpage();
        });
        prevButtonp.addEventListener('click', function() {
            currentIndexpage = (currentIndexpage - 1 + pages.length) % pages.length;
            updateContentpage();
        });
        updateContentpage();
}



//СЧЁТЧИК КОРЗИНЫ
let cart = document.querySelector('.cart u');
let clickCount = 0;

let addButtons=document.querySelectorAll('.add');

addButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        clickCount++;
        cart.textContent = 'корзина(' + clickCount + ')';
    });
});



//ДОБАВЛЕНИЕ ТОВАРОВ В КОРЗИНУ
function updateCart() {
    let cart_table = document.querySelector('.cart_table');
    if (cart_table) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let total = 0;

            //удалить строки, но оставить заголовки
        while (cart_table.rows.length > 1) {
            cart_table.deleteRow(1);
    }

    cart.forEach(function(product) {
        let row = cart_table.insertRow();
        let cell_name = row.insertCell(0);
        let cell_quantity = row.insertCell(1);
        let cell_price = row.insertCell(2);

        cell_name.textContent = product.name;
        cell_quantity.textContent = product.quantity;
        cell_price.textContent = product.price + 'р';

        //расчет общей стоимости для всех товаров
        total += product.price * product.quantity;
    });

    //добавить строку с общей стоимостью корзины
        let total_row = cart_table.insertRow();
        let total_cell = total_row.insertCell(0);
        total_cell.colSpan = 2;
        total_cell.textContent = 'итог';
        let totalValueCell = total_row.insertCell(1);
        totalValueCell.textContent = total + 'р';
        }
}

//функция для обработки плюсиков
function handleAddButtonClick() {
    let addButtons = document.querySelectorAll('.add');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    addButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            let parentDiv = this.parentNode;
            //берем имя продукта находится между тегами
            let productName = parentDiv.querySelector('p').innerHTML.split('<br>')[0];
            let productPrice = parseFloat(parentDiv.querySelector('p').innerHTML.split('<br>')[1].replace('р', ''));
            let productId = this.id;
                
            let product = cart.find(item => item.id === productId);
                if (product) {
                    product.quantity += 1;
                } else {
                    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
                }

            localStorage.setItem('cart', JSON.stringify(cart));
        });
        });
    }

    if (document.querySelector('.cart_table')) {
        updateCart();
    } else if (document.querySelectorAll('.add').length > 0) {
        handleAddButtonClick();
};




//АНИМАЦИЯ ПАДЕНИЯ УГОЛЬКОВ
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

let engine = Engine.create();

// присваиваем ширине и высоте ширину и высоту окна браузера для создания рамок
let width = window.innerWidth;
let height = window.innerHeight;

let render = Render.create({
element: document.querySelector(".falling_rocks"), //база – это готовый див в html
engine: engine,
options: {
    width: width,
    height: height,
    wireframes: false, 
    background: 'transparent'
},
});

// основы для картинок – кружочки
function createRock(x, y, radius, texture, scale) {
return Bodies.circle(x, y, radius, {
    isStatic: true,
    friction: 0.9,
    restitution: 0.1,
    density: 0.05,
    render: {
        sprite: {
            texture: texture,
            xScale: scale,
            yScale: scale
        }
    }
});
}

// (x,y,размер,картинка, масштаб), первоначальное положение – за пределами окна браузера
let rocks = [
createRock(60, -300, 150, "./img/falling1.png", 0.7), 
createRock(360, -200, 150, "./img/falling2.png", 0.7),
createRock(450, -500, 150, "./img/falling3.png", 0.7),
createRock(600, -300, 150, "./img/falling4.png", 0.7),
createRock(960, -260, 150, "./img/falling5.png", 0.7),
createRock(1100, -400, 150, "./img/falling6.png", 0.85),
createRock(1200, -200, 150, "./img/falling7.png", 0.7),
createRock(60, -500, 150, "./img/falling1.png", 0.7), 
createRock(360, -400, 150, "./img/falling2.png", 0.7),
createRock(450, -800, 150, "./img/falling3.png", 0.7),
createRock(600, -500, 150, "./img/falling4.png", 0.7),
createRock(960, -560, 150, "./img/falling5.png", 0.7),
createRock(1100, -700, 150, "./img/falling6.png", 0.85),
createRock(1200, -400, 150, "./img/falling7.png", 0.7),
];


// невидимый пол по границе с окном браузера
let ground = Bodies.rectangle(width/2, height, width, 60, { 
isStatic: true,
render: {
    visible: false
}
});

// невидимая левая грань по границе с окном браузера
let leftWall = Bodies.rectangle(0, height/2, 60, height, { 
    isStatic: true,
    render: {
        visible: false
    }
});

// невидимая правая грань по границе с окном браузера
let rightWall = Bodies.rectangle(width, height/2, 60, height, { 
    isStatic: true,
    render: {
        visible: false
    }
});

// создали и добавляем в мир
World.add(engine.world, rocks);
World.add(engine.world, ground);
World.add(engine.world, leftWall);
World.add(engine.world, rightWall);

Engine.run(engine);
Render.run(render);

//настройки мышки, чтобы взаимодействовать с объектами
let mouse = Mouse.create(render.canvas);
let mouseConstraint = MouseConstraint.create(engine, {
mouse: mouse,
constraint: {
    stiffness: 0.2,
    render: {
        visible: false
    }
}
});

World.add(engine.world, mouseConstraint);

// запуск действия по клику на ссылку на соцсети и настройка кликанья
document.querySelector('.vk').addEventListener('click', () => {
    document.querySelector('.falling_rocks').style.pointerEvents = 'all';
    rocks.forEach((rock) => {
    Matter.Body.setStatic(rock, false);
});
});

// запуск действия по клику на ссылку на соцсети 
// document.querySelector('.vk').addEventListener('click', () => {
// document.querySelector('.falling_rocks').style.pointerEvents = 'all';
// });



});

