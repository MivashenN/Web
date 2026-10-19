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

// 2. RENDERING FALLBACK MATRIX FOR BROWSERS LACKING CSS TIMELINES (e.g., iOS Safari)
const zoomCards = document.querySelectorAll('.zoom-card');

// Check if browser natively supports CSS Scroll-Driven Timelines
if (!CSS.supports('animation-timeline', 'view()')) {
    
    // Config fallback classes to bypass layout engine bottlenecks
    zoomCards.forEach(card => card.classList.add('js-fallback'));

    const zoomCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('zoom-active');
            } else {
                // Remove class when it scrolls out to allow beautiful continuous zoom-in behaviors
                entry.target.classList.remove('zoom-active');
            }
        });
    };

    const zoomObserver = new IntersectionObserver(zoomCallback, {
        root: null,
        rootMargin: '-10% 0px -10% 0px', // Triggers cleanly within standard viewport view boundaries
        threshold: 0.15
    });

    // Delay observation target registration until the page layout fully settles
    window.addEventListener('load', () => {
        zoomCards.forEach(card => zoomObserver.observe(card));
    });
}

// 3. ENHANCED PERFORMANCE INTERSECTION OBSERVER ANIMATION FOR BASIC SECTIONS
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

// Delay basic section animations until page initialization is complete
window.addEventListener('load', () => {
    revealElements.forEach(el => revealObserver.observe(el));
});

// 4. SAFARI MOBILE SCROLL RESET PATCH
// Forces the viewport engine back to the header once asset painting completes
window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 10);
});