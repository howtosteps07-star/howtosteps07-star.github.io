document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
            navbar.classList.remove('bg-white/80');
        } else {
            navbar.classList.remove('nav-scrolled');
            navbar.classList.add('bg-white/80');
        }
    });

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            document.body.classList.add('mobile-menu-open');
        } else {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('mobile-menu-open');
        }
    };

    mobileBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i data-lucide="check-circle" class="w-5 h-5"></i> Skickat!';
            submitBtn.classList.remove('bg-brand-blue');
            submitBtn.classList.add('bg-green-600');
            lucide.createIcons();
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.classList.remove('bg-green-600');
                submitBtn.classList.add('bg-brand-blue');
                lucide.createIcons();
            }, 3000);
        });
    }
});
