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

if (!CSS.supports('animation-timeline', 'view()')) {
    zoomCards.forEach(card => card.classList.add('js-fallback'));

    const zoomCallback = (entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('zoom-active', entry.isIntersecting);
        });
    };

    const zoomObserver = new IntersectionObserver(zoomCallback, {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.25 // slightly higher threshold reduces jitter
    });

    zoomCards.forEach(card => zoomObserver.observe(card));
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
    threshold: 0.25
});

revealElements.forEach(el => revealObserver.observe(el));

// 4. SAFARI MOBILE SCROLL RESET PATCH (conditional)
window.addEventListener('load', () => {
    const ua = navigator.userAgent;
    const isSafari = ua.includes('Safari') && !ua.includes('Chrome') && !ua.includes('Edg');
    if (isSafari) {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
    }
});
