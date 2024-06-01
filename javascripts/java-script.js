//write here your js

window.addEventListener ('load', function(){
    const preload = document.querySelector('.preload');
    preload.classList.add("preload-finish");
});

document.addEventListener("DOMContentLoaded", function() {
    var modal = document.querySelector(".modal");
    var vk = document.querySelector(".vk");

    vk.onclick = function() {
        modal.style.display = "flex";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    let currentImageIndex = 0;
    const images = [
        "./img/book_cover.png",
        "./img/page1.jpg",
        "./img/page2.jpg",
        "./img/page3.jpg",
        "./img/page4.jpg",
        "./img/page5.jpg",
        "./img/page6.jpg",
        "./img/page7.jpg",
        "./img/page8.jpg",
        "./img/page9.jpg",
        "./img/page10.jpg",
        "./img/page11.jpg",
        "./img/page12.jpg",
        "./img/page13.jpg",
        "./img/page14.jpg",
        "./img/page15.jpg",
        "./img/page16.jpg",
        "./img/page17.jpg",
        "./img/page18.jpg",
        "./img/page19.jpg",
        "./img/page20.jpg",
        "./img/page21.jpg",
        "./img/page22.jpg"
    ];

    function changeImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        } else if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        }
        document.getElementById('bookimage').src = images[currentImageIndex];
    }
    
});


