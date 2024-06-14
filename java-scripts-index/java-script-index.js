document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".rock");

    elements.forEach(element => {
        element.dataset.originalLeft = element.style.left;
        element.dataset.originalTop = element.style.top;

        let isDragging = false;
        let hasMoved = false;
        let offsetX, offsetY;

        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            hasMoved = false;
            offsetX = e.clientX - element.getBoundingClientRect().left;
            offsetY = e.clientY - element.getBoundingClientRect().top;
            element.style.zIndex = 10;
            element.classList.remove('transition');

            const onMouseMove = (e) => {
                if (isDragging) {
                    element.style.left = `${e.clientX - offsetX}px`;
                    element.style.top = `${e.clientY - offsetY}px`;
                    hasMoved = true;
                }
            };

            const onMouseUp = () => {
                if (isDragging) {
                    isDragging = false;
                    element.style.zIndex = 5;
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);

                    if (!hasMoved) {
                        elements.forEach(el => {
                            el.classList.add('transition');
                            el.style.left = el.dataset.originalLeft;
                            el.style.top = el.dataset.originalTop;
                        });

                        setTimeout(() => {
                            window.location.href = element.parentElement.href;
                        }, 500);
                    }
                }
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        element.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        element.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });
});
