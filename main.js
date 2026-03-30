lucide.createIcons();

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    menu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            menu.classList.add('hidden');
        }
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-slate-950/95');
            navbar.classList.remove('bg-slate-950/90');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-slate-950/95');
            navbar.classList.add('bg-slate-950/90');
        }
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    const elementsToReveal = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    elementsToReveal.forEach(el => observer.observe(el));
});
