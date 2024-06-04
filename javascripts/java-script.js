//write here your js

window.addEventListener ('load', function(){
    const preload = document.querySelector('.preload');
    preload.classList.add("preload-finish");
});

document.addEventListener("DOMContentLoaded", function() {
    let modal = document.querySelector(".modal");
    let vk = document.querySelector(".vk");

    vk.onclick = function() {
        modal.style.display = "flex";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };



    document.addEventListener('DOMContentLoaded', () => {
        console.log('JavaScript loaded and DOM fully parsed'); // Debugging line
        const images = document.querySelectorAll('.poster img');
        const descriptions = document.querySelectorAll('.book_description p');
        let currentIndex = 0;
    
        const updateContent = () => {
            console.log('Updating content to index:', currentIndex); // Debugging line
            images.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });
            descriptions.forEach((desc, index) => {
                desc.classList.toggle('active', index === currentIndex);
            });
        };
    
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');
    
        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                console.log('Next button clicked'); // Debugging line
                currentIndex = (currentIndex + 1) % images.length;
                updateContent();
            });
    
            prevButton.addEventListener('click', () => {
                console.log('Prev button clicked'); // Debugging line
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                updateContent();
            });
    
            // Initialize the first item
            updateContent();
        } else {
            console.error('Next or Prev button not found'); // Debugging line
        }
    });
       

});
