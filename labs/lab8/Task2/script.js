const sliderConfig = {
    images: [
        'img/1.png',
        'img/2.png',
        'img/3.png',
        'img/4.png',
        'img/5.png'
    ],
    autoplay: true,
    autoplayInterval: 3000,
    showArrows: true,
    showDots: true,
    animationDuration: 500
};


const sliderContainer = document.getElementById('sliderContainer');
const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const sliderDots = document.getElementById('sliderDots');
const autoplayCheckbox = document.getElementById('autoplayCheckbox');
const autoplayIntervalInput = document.getElementById('autoplayInterval');


let currentSlide = 0;
let autoplayInterval;
let isMouseOverSlider = false;


function initSlider(config) {

    slider.innerHTML = '';
    sliderDots.innerHTML = '';


    config.images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<img src="${image}" alt="Slide ${index + 1}">`;
        slider.appendChild(slide);
    });


    if (config.showDots) {
        config.images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
    } else {
        sliderDots.style.display = 'none';
    }


    if (config.autoplay) {
        startAutoplay(config.autoplayInterval);
    }


    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);


    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });


    sliderContainer.addEventListener('mouseenter', () => {
        isMouseOverSlider = true;
        if (config.autoplay) stopAutoplay();
    });

    sliderContainer.addEventListener('mouseleave', () => {
        isMouseOverSlider = false;
        if (config.autoplay && !isMouseOverSlider) startAutoplay(config.autoplayInterval);
    });


    autoplayCheckbox.addEventListener('change', () => {
        config.autoplay = autoplayCheckbox.checked;
        if (config.autoplay && !isMouseOverSlider) {
            startAutoplay(config.autoplayInterval);
        } else {
            stopAutoplay();
        }
    });

    autoplayIntervalInput.addEventListener('change', () => {
        config.autoplayInterval = parseInt(autoplayIntervalInput.value);
        if (config.autoplay && !isMouseOverSlider) {
            stopAutoplay();
            startAutoplay(config.autoplayInterval);
        }
    });
}


function goToSlide(slideIndex) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');

    currentSlide = slideIndex;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;


    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
}


function startAutoplay(interval) {
    stopAutoplay();
    autoplayInterval = setInterval(nextSlide, interval);
}

function stopAutoplay() {
    if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
    }
}


initSlider(sliderConfig);