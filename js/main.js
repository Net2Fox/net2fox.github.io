const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 12);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (menuButton && navLinks) {
    const closeMenu = () => {
        menuButton.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-open');
    };

    menuButton.addEventListener('click', () => {
        const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
        menuButton.setAttribute('aria-expanded', String(willOpen));
        navLinks.classList.toggle('open', willOpen);
        document.body.classList.toggle('menu-open', willOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMenu();
    });
}

document.querySelectorAll('[data-delay]').forEach(element => {
    element.style.setProperty('--delay', `${element.dataset.delay}ms`);
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const reveals = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(element => element.classList.add('visible'));
} else {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    reveals.forEach(element => observer.observe(element));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();