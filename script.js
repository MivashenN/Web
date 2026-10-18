// 1. MOBILE RESPONSIVE NAV BAR INTERACTION
const hamburger = document.getElementById('hamburgerMenu');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// 2. SMOOTH INTERACTIVE SCROLL CAROUSEL
const track = document.getElementById('carouselTrack');
const container = document.querySelector('.carousel-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Manual Click Button Navigation
const getScrollAmount = () => {
    const card = document.querySelector('.service-card');
    const cardWidth = card.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 32;
    return cardWidth + gap;
};

nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
});

prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
});

// Infinite Auto-Rotation Loop
let autoPlayTimer;
const startAutoPlay = () => {
    autoPlayTimer = setInterval(() => {
        const isEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        if (isEnd) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            container.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
    }, 4000); // Rotates shifts every 4 seconds
};

const stopAutoPlay = () => clearInterval(autoPlayTimer);

// Pause auto-rotation when user interacts with elements
container.addEventListener('mouseenter', stopAutoPlay);
container.addEventListener('mouseleave', startAutoPlay);
container.addEventListener('touchstart', stopAutoPlay, { passive: true });
container.addEventListener('touchend', startAutoPlay);

// Initialize Carousel Loop
startAutoPlay();

// 3. ENHANCED PERFORMANCE INTERSECTION OBSERVER ANIMATION
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));