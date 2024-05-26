document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const header = document.querySelector('.header');
    let currentIndex = 0;
    let lastScrollTop = 0;

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - header.offsetHeight,
                behavior: 'smooth'
            });
        });
    });

    function updateCarousel() {
        carouselItems.forEach((item, index) => {
            item.classList.remove('active', 'left', 'right');
            if (index === currentIndex) {
                item.classList.add('active');
                item.play();
            } else if (index === (currentIndex - 1 + carouselItems.length) % carouselItems.length) {
                item.classList.add('left');
            } else if (index === (currentIndex + 1) % carouselItems.length) {
                item.classList.add('right');
            }
        });
    }

    function showNextVideo() {
        carouselItems[currentIndex].pause();
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
    }

    carouselItems.forEach((item, index) => {
        item.addEventListener('ended', showNextVideo);
        if (index === 0) {
            item.classList.add('active');
            item.play();
        }
    });

    carouselItems[currentIndex].addEventListener('ended', () => {
        setTimeout(showNextVideo, 3000);
    });

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop;
    });

    document.addEventListener('mousemove', (event) => {
        if (event.clientY < 50) {
            header.classList.remove('header-hidden');
        }
    });

    updateCarousel(); // Оновити карусель при завантаженні сторінки
});
